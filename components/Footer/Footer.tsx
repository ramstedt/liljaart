'use client';
import styles from './Footer.module.css';
import { FaInstagram } from 'react-icons/fa';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerName}>KARIN</div>
      <div className={styles.footerLastName}>lilja</div>
      <div className={styles.footerTitle}>
        Konstnär, instruktör i måleri och tatuerare i Göteborg
      </div>
      <div className={styles.socialMedia}>
        <Link href='/' target='_blank'>
          <FaInstagram />
          <small>Instagram</small>
        </Link>
      </div>
      <div className={styles.footerLinks}>
        <Link href='#om'>Om</Link>
        <Link href='#event'>Event</Link>
        <Link href='#kurser'>Kurser</Link>
        <Link href='/butik'>Butik</Link>
        <Link href='#kontakt'>Kontakt</Link>
      </div>
      <small className={styles.attributions}>
        © 2025 Karin Lilja
        <br />
        Sidan är designad och byggd av emma.ramstedt(at)gmail.com
      </small>
    </footer>
  );
}
