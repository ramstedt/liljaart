'use client';
import styles from './Navbar.module.css';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { navbarConfig as navbarRouteConfig } from '@/lib/navbarConfig';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [atTop, setAtTop] = useState(true);
  const lastY = useRef(0);
  const initialized = useRef(false);
  const pathname = usePathname() || '/';
  const matchKey =
    Object.keys(navbarRouteConfig)
      .sort((a, b) => b.length - a.length)
      .find((key) => pathname.startsWith(key)) || '/';
  const { color, showBorder } = navbarRouteConfig[matchKey];

  useEffect(() => {
    const update = () => {
      const y = window.scrollY || window.pageYOffset || 0;
      const viewportH =
        window.visualViewport?.height ??
        Math.max(window.innerHeight, document.documentElement.clientHeight);

      setAtTop(y < viewportH);

      if (!initialized.current) {
        initialized.current = true;
        lastY.current = y;
        setHidden(false);
        return;
      }

      const diff = y - lastY.current;
      if (isOpen) {
        setHidden(false);
        lastY.current = y;
        return;
      }

      const threshold = 6;

      if (diff < 0) {
        setHidden(false);
      }

      if (diff > threshold && y > 20) {
        setHidden(true);
      }

      lastY.current = y;
    };

    const reinitAndUpdate = () => {
      initialized.current = false;
      requestAnimationFrame(update);
    };

    update();
    const raf = requestAnimationFrame(update);
    const timeout = setTimeout(update, 0);

    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('hashchange', reinitAndUpdate, {
      passive: true,
    } as any);
    window.addEventListener('pageshow', reinitAndUpdate, {
      passive: true,
    } as any);
    window.addEventListener('resize', update, { passive: true });

    const vv = window.visualViewport;
    if (vv) {
      vv.addEventListener('resize', update, { passive: true });
    }

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timeout);
      window.removeEventListener('scroll', update as any);
      window.removeEventListener('hashchange', reinitAndUpdate as any);
      window.removeEventListener('pageshow', reinitAndUpdate as any);
      window.removeEventListener('resize', update as any);
      if (vv) {
        vv.removeEventListener('resize', update as any);
      }
    };
  }, [isOpen]);

  return (
    <>
      <nav
        className={`${styles.navbar} ${hidden ? styles.navbarHidden : ''} ${atTop && color === 'dark' ? styles.transparent : color === 'dark' ? styles.dark : styles.light} ${color === 'light' ? styles.darkText : styles.lightText} ${isOpen ? styles.menuOpen : ''}`}
      >
        <div className={styles.logo}>
          <Link href='/'>
            <span className={styles.logoFirstName}>Karin</span>{' '}
            <span className={styles.logoLastName}>lilja</span>
          </Link>
        </div>
        <div className={styles.navLinks}>
          <Link href='/#om' onClick={() => setIsOpen(false)}>
            Om
          </Link>
          <Link href='/#event' onClick={() => setIsOpen(false)}>
            Event
          </Link>
          <Link href='/#kurser' onClick={() => setIsOpen(false)}>
            Kurser
          </Link>
          <Link href='/butik' onClick={() => setIsOpen(false)}>
            Butik
          </Link>
          <Link href='/#kontakt' onClick={() => setIsOpen(false)}>
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
          <span style={{ marginTop: '1rem' }} />
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
          className={`${styles.menuPanel} ${color === 'dark' ? styles.dark : styles.light}`}
          id='primaryNav'
          aria-hidden={!isOpen}
          style={{ pointerEvents: isOpen ? 'auto' : 'none' }}
        >
          <div className={styles.navLinks}>
            <Link href='/#om' onClick={() => setIsOpen(false)}>
              Om
            </Link>
            <Link href='/#event' onClick={() => setIsOpen(false)}>
              Event
            </Link>
            <Link href='/#kurser' onClick={() => setIsOpen(false)}>
              Kurser
            </Link>
            <Link href='/butik' onClick={() => setIsOpen(false)}>
              Butik
            </Link>
            <Link href='/#kontakt' onClick={() => setIsOpen(false)}>
              Kontakt
            </Link>
          </div>
        </div>
        <div className={showBorder ? styles.border : styles.noBorder}></div>
      </nav>
    </>
  );
}
