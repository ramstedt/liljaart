'use client';
import { useRef, useState, useEffect, FormEvent } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import styles from './Form.module.css';
import CtaButton from '../CtaButton/CtaButton';
import { motion } from 'framer-motion';

interface FormProps {
  heading?: string;
  description?: string;
  contextField?: 'referrer' | 'product';
  productTitle?: string;
}

export default function Form({
  heading = 'Allt börjar med ett penseldrag - och ett hej',
  description = 'Fyll i formuläret nedan - jag ser fram emot att höra från dig!',
  contextField = 'referrer',
  productTitle: productTitleProp = '',
}: FormProps) {
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [referrer, setReferrer] = useState('');
  const [productTitle, setProductTitle] = useState(productTitleProp);
  useEffect(() => {
    setProductTitle(productTitleProp || '');
  }, [productTitleProp]);
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
        body: JSON.stringify({
          name,
          email,
          referrer: contextField === 'referrer' ? referrer : '',
          productTitle: contextField === 'product' ? productTitle : '',
          message,
          token,
        }),
      });

      if (!response.ok) {
        resetCaptcha();
        throw new Error('Meddelandet misslyckades');
      }

      setSuccess(true);
      setName('');
      setEmail('');
      setReferrer('');
      setProductTitle('');
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
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-20% 0px -20% 0px' }}
      transition={{ duration: 0.8 }}
    >
      <section className={styles.formSection} id='kontakt'>
        <h2 id='contactHeading'>{heading}</h2>
        <p>
          {description}
          <br />
          <br />
        </p>
        <form
          onSubmit={handleSubmit}
          className={styles.contactForm}
          aria-labelledby='contactHeading'
        >
          <div className={styles.inputFields}>
            <div>
              <label htmlFor='nameInput' className={styles.srOnly}>
                Namn <span aria-hidden='true'>*</span>
              </label>
              <input
                id='nameInput'
                type='text'
                placeholder='Namn'
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                aria-required='true'
                autoComplete='name'
              />
            </div>

            <div>
              <label htmlFor='emailInput' className={styles.srOnly}>
                Email <span aria-hidden='true'>*</span>
              </label>
              <input
                id='emailInput'
                type='email'
                placeholder='Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                aria-required='true'
                autoComplete='email'
                inputMode='email'
              />
            </div>

            {contextField === 'referrer' ? (
              <div>
                <label htmlFor='referrerInput' className={styles.srOnly}>
                  Hur hittade du mig?
                </label>
                <input
                  id='referrerInput'
                  type='text'
                  placeholder='Hur hittade du mig?'
                  value={referrer}
                  onChange={(e) => setReferrer(e.target.value)}
                  autoComplete='off'
                />
              </div>
            ) : (
              <div>
                <label htmlFor='productTitleInput' className={styles.srOnly}>
                  Produkt
                </label>
                <input
                  id='productTitleInput'
                  type='text'
                  value={productTitle}
                  onChange={(e) => setProductTitle(e.target.value)}
                  autoComplete='off'
                  className={styles.disabled}
                />
              </div>
            )}
          </div>
          <div>
            <label htmlFor='messageInput' className={styles.srOnly}>
              Meddelande <span aria-hidden='true'>*</span>
            </label>
            <textarea
              id='messageInput'
              name='message'
              placeholder='Meddelande'
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              aria-required='true'
              rows={5}
            />
          </div>

          <fieldset className={styles.recaptcha} aria-required='true'>
            <legend className={styles.srOnly}>
              Spam-skydd (reCAPTCHA) <span aria-hidden='true'>*</span>
            </legend>
            <ReCAPTCHA
              ref={recaptchaRef}
              sitekey={siteKey}
              onChange={(val: string | null) => setCaptchaToken(val)}
              aria-label='Spam-skydd (reCAPTCHA)'
            />
          </fieldset>

          <CtaButton
            type='submit'
            aria-busy={submitting}
            disabled={
              success ||
              !!error ||
              !captchaToken ||
              message.trim() === '' ||
              name.trim() === '' ||
              (contextField === 'referrer'
                ? referrer.trim() === ''
                : productTitle.trim() === '')
            }
            loading={false}
            color={submitting ? 'light' : 'dark'}
          >
            {submitting ? 'Skickar...' : 'Skicka'}
          </CtaButton>
          <div aria-live='polite' aria-atomic='true'>
            {error && (
              <p className={styles.error} role='alert'>
                {error}
              </p>
            )}
            {success && (
              <p className={styles.success} role='status'>
                Meddelandet skickades! Jag hör av mig till er så snart som
                möjligt.
              </p>
            )}
          </div>
        </form>
      </section>
    </motion.section>
  );
}
