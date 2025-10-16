import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { name, email, referrer, message, token } = req.body;

  if (!token) {
    return res.status(400).json({ error: 'Missing reCAPTCHA token' });
  }

  try {
    const ipHeader =
      (req.headers['x-forwarded-for'] as string | undefined) || '';
    const clientIp =
      ipHeader.split(',')[0]?.trim() || req.socket.remoteAddress || undefined;
    const isHuman = await verifyRecaptchaToken(token, clientIp);

    if (!isHuman) {
      return res.status(400).json({ error: 'reCAPTCHA verification failed' });
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

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
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
