'use client';
import styles from './Footer.module.css';
import { FaInstagram } from 'react-icons/fa';
import Link from 'next/link';
import { useState } from 'react';

export default function Footer() {
  const [isOpen, setIsOpen] = useState(false);

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
        <Link href='#om' onClick={() => setIsOpen(false)}>
          Om
        </Link>
        <Link href='#event' onClick={() => setIsOpen(false)}>
          Event
        </Link>
        <Link href='#kurser' onClick={() => setIsOpen(false)}>
          Kurser
        </Link>
        <Link href='#kontakt' onClick={() => setIsOpen(false)}>
          Kontakt
        </Link>
      </div>
      <small className={styles.attributions}>
        © 2025 Karin Lilja
        <br />
        Sidan är designad och byggd av emma.ramstedt(at)gmail.com
      </small>
    </footer>
  );
}
