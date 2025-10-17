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
  const [submitting, setSubmitting] = useState(false);

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
    setSubmitting(true);

    try {
      const token = captchaToken;
      if (!token) throw new Error('Vänligen slutför reCAPTCHA-testet.');

      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, referrer, message, token }),
      });

      if (!response.ok) {
        resetCaptcha();
        throw new Error('Meddelandet misslyckades');
      }

      setSuccess(true);
      setName('');
      setEmail('');
      setReferrer('');
      setMessage('');
      resetCaptcha();
      setSubmitting(false);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An error occurred.');
      }
      resetCaptcha();
      setSubmitting(false);
    }
  }

  return (
    <section className={styles.formSection} id='kontakt'>
      <h2>Allt börjar med ett penseldrag - och ett hej</h2>
      <p>
        Fyll i formuläret nedan - jag ser fram emot att höra mer om dig och
        skapa något tillsammans.
      </p>
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

        <div className={styles.recaptcha}>
          <ReCAPTCHA
            ref={recaptchaRef}
            sitekey={siteKey}
            onChange={(val: string | null) => setCaptchaToken(val)}
          />
        </div>

        <CtaButton
          type='submit'
          disabled={
            success ||
            !!error ||
            !captchaToken ||
            message.trim() === '' ||
            name.trim() === '' ||
            email.trim() === ''
          }
          loading={false}
          color={submitting ? 'light' : 'dark'}
        >
          {submitting ? 'Skickar...' : 'Skicka'}
        </CtaButton>
        <div></div>
        {error && <p className={styles.error}>{error}</p>}
        {success && (
          <div>
            {' '}
            <p className={styles.success}>
              Meddelandet skickades! Jag hör av mig till er så snart som
              möjligt.
            </p>
          </div>
        )}
      </form>
    </section>
  );
}
