import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  try {
    const { name, email, referrer, message, token } = await req.json();

    if (!token) {
      return NextResponse.json(
        { error: 'Missing reCAPTCHA token' },
        { status: 400 }
      );
    }

    const ipHeader = req.headers.get('x-forwarded-for') ?? '';
    const clientIp = ipHeader.split(',')[0]?.trim() || undefined;
    const isHuman = await verifyRecaptchaToken(token, clientIp);

    if (!isHuman) {
      return NextResponse.json(
        { error: 'reCAPTCHA verification failed' },
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: email,
      to: process.env.EMAIL_TO,
      subject: `Meddelande via formulär på liljaartstudio.se`,
      text: `
        Namn: ${name}
        Email: ${email}
        Hur hittade du mig?: ${referrer}
        
        Meddelande:
        ${message}
      `,
      replyTo: email,
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

async function verifyRecaptchaToken(
  token: string,
  remoteIp?: string
): Promise<boolean> {
  const secret = process.env.RECAPTCHA_SECRET_KEY;
  if (!secret) {
    console.error('Missing RECAPTCHA_SECRET_KEY');
    return false;
  }

  const params = new URLSearchParams();
  params.append('secret', secret);
  params.append('response', token);
  if (remoteIp) params.append('remoteip', remoteIp);

  const resp = await fetch('https://www.google.com/recaptcha/api/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params.toString(),
  });

  if (!resp.ok) {
    console.error(
      'reCAPTCHA siteverify HTTP error:',
      resp.status,
      await resp.text()
    );
    return false;
  }

  const data = (await resp.json()) as {
    success: boolean;
    ['error-codes']?: string[];
  };

  if (!data.success) {
    console.log('reCAPTCHA failed:', data['error-codes']);
  }

  return data.success === true;
}
