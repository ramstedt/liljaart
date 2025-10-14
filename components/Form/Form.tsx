'use client';

import { useRef, useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import styles from './Form.module.css';
import { IoIosArrowRoundForward } from 'react-icons/io';

export default function Form() {
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setStatus(null);

    try {
      const token = recaptchaRef.current?.getValue();
      if (!token) throw new Error('Please complete the reCAPTCHA.');
      const verify = await fetch('/api/recaptcha', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      }).then((r) => r.json());

      if (!verify.ok) {
        recaptchaRef.current?.reset();
        throw new Error('reCAPTCHA failed. Please try again.');
      }

      setStatus('Success! Your message was verified and sent.');
      e.currentTarget.reset();
      recaptchaRef.current?.reset();
    } catch (err: any) {
      setStatus(err.message || 'Something went wrong.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className={styles.formSection} id='kontakt'>
      <h2>Allt börjar med ett penseldrag - och ett hej</h2>
      <p>
        Fyll i formuläret nedan - jag ser fram emot att höra mer om ert event
        och skapa något vackert tillsammans.
      </p>
      <form onSubmit={handleSubmit} className={styles.contactForm}>
        <div className={styles.inputFields}>
          <input type='text' name='name' placeholder='Ditt Namn' required />
          <input type='email' name='email' placeholder='Din Email' required />
          <input
            type='text'
            name='referrer'
            placeholder='Hur hittade du mig?'
            required
          />
        </div>
        <textarea name='message' placeholder='Ditt meddelande' required />
        <div className={styles.recaptchaWrapper}>
          <ReCAPTCHA ref={recaptchaRef} sitekey={siteKey} />
        </div>
        <button type='submit' disabled={submitting}>
          {submitting ? (
            'Skickar...'
          ) : (
            <>
              Skicka <IoIosArrowRoundForward />
            </>
          )}
        </button>
        {status && <p className='text-sm'>{status}</p>}
      </form>
    </section>
  );
}
