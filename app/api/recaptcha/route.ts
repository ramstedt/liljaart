// app/api/recaptcha/route.ts
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { token } = await req.json();
    if (!token) {
      return NextResponse.json(
        { ok: false, error: 'Missing token' },
        { status: 400 }
      );
    }

    const secret = process.env.RECAPTCHA_SECRET_KEY!;
    const params = new URLSearchParams({ secret, response: token });

    const googleRes = await fetch(
      'https://www.google.com/recaptcha/api/siteverify',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: params.toString(),
      }
    );

    const data = await googleRes.json();

    if (!data.success) {
      return NextResponse.json(
        { ok: false, error: 'Recaptcha failed', details: data },
        { status: 400 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json(
      { ok: false, error: 'Server error' },
      { status: 500 }
    );
  }
}
