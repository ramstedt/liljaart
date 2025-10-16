import { useRef, useState, FormEvent } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import styles from './Form.module.css';
import CtaButton from '../CtaButton/CtaButton';

export default function Form() {
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [referrer, setReferrer] = useState('');
  const [message, setMessage] = useState('');
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

  if (!siteKey) {
    return (
      <section className={styles.formSection}>
        <p>reCAPTCHA nyckel saknas.</p>
      </section>
    );
  }

  function resetCaptcha() {
    try {
      recaptchaRef.current?.reset();
    } catch {}
    setCaptchaToken(null);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    try {
      const token = captchaToken;
      if (!token) throw new Error('Please complete the reCAPTCHA.');

      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, referrer, message, token }),
      });

      if (!response.ok) {
        resetCaptcha();
        throw new Error('Failed to send message.');
      }

      setSuccess(true);
      setName('');
      setEmail('');
      setReferrer('');
      setMessage('');
      resetCaptcha();
    } catch (err: any) {
      setError(err.message || 'An error occurred.');
      resetCaptcha();
    }
  }

  return (
    <section className={styles.formSection}>
      <form onSubmit={handleSubmit} className={styles.contactForm}>
        <div className={styles.inputFields}>
          <input
            type='text'
            placeholder='Namn'
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type='email'
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type='text'
            placeholder='Hur hittade du mig?'
            value={referrer}
            onChange={(e) => setReferrer(e.target.value)}
          />
        </div>
        <textarea
          name='message'
          placeholder='Meddelande'
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
        <ReCAPTCHA
          ref={recaptchaRef}
          sitekey={siteKey}
          onChange={(val) => setCaptchaToken(val)}
        />
        <CtaButton type='submit'>Skicka</CtaButton>
        {error && <p className={styles.error}>{error}</p>}
        {success && <p className={styles.success}>Meddelandet skickades!</p>}
      </form>
    </section>
  );
}
