import styles from './Navbar.module.css';
import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className={`${styles.navbar} ${isOpen ? styles.menuOpen : ''}`}>
      <div className={styles.logo}>
        <span className={styles.logoFirstName}>Karin</span>{' '}
        <span className={styles.logoLastName}>lilja</span>
      </div>
      <div className={styles.navLinks}>
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

      <button
        className={styles.burger}
        aria-label='Toggle menu'
        aria-expanded={isOpen}
        aria-controls='primaryNav'
        onClick={() => setIsOpen(!isOpen)}
      >
        <span />
      </button>

      <div
        className={styles.overlay}
        aria-hidden={!isOpen}
        style={{
          pointerEvents: isOpen ? 'auto' : 'none',
          opacity: isOpen ? 1 : 0,
        }}
        onClick={() => isOpen && setIsOpen(false)}
      />

      <div
        className={styles.menuPanel}
        id='primaryNav'
        aria-hidden={!isOpen}
        style={{ pointerEvents: isOpen ? 'auto' : 'none' }}
      >
        <div className={styles.navLinks}>
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
      </div>
    </nav>
  );
}
