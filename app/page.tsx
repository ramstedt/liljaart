'use client';

import Image from 'next/image';
import styles from './page.module.css';
import headshot from '../public/headshot.webp';
import woman from '../public/woman.webp';
import ludwig from '../public/ludwig.webp';
import bg from '../public/bg.jpeg';
import cheers from '../public/cheers.jpg';
import { FaInstagram } from 'react-icons/fa';
import Link from 'next/link';
import Form from '@/components/Form/Form';
import { useState } from 'react';
import CtaButton from '@/components/CtaButton/CtaButton';
import { motion } from 'framer-motion';

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-20% 0px -20% 0px' }}
          transition={{ duration: 0.8 }}
          className={styles.hero}
        >
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
          <div className={styles.heroIngressWrapper}>
            <h1 className={styles.heroIngressOne}>
              NÄR ÖGONBLICKET BLIR TILL KONST
            </h1>
            <div className={styles.heroIngressTwo}>
              Upplev skapandet - i realtid
            </div>
          </div>
        </motion.section>
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-20% 0px -20% 0px' }}
          transition={{ duration: 0.8 }}
          className={styles.introWrapper}
        >
          <div className={styles.introParent}>
            <Image
              className={styles.headshot}
              src={headshot}
              alt='Foto på Karin Lilja sittandes vid ett stafli. Hon håller i en pensel och palett.'
            />

            <Image
              className={styles.imgOne}
              src={ludwig}
              alt='En oljemålning som föreställer ett porträtt på en ung pojke med blont hår och blå ögon'
            />

            <Image
              className={styles.imgTwo}
              src={woman}
              alt='En närbild på en oljemålning. Bilden visar en del av målningen som föreställer en kvinna med långt brunt hår som blundar och håller en annan kvinna i händerna.'
            />

            <div className={styles.introIngress}>
              Konstnär, instruktör i måleri och tatuerare i Göteborg
            </div>
            <div
              className={`${styles.introHello} ${styles.scrollTarget}`}
              id='om'
            >
              Hej! Jag heter
              <br />
              Karin Lilja
            </div>
          </div>
        </motion.section>
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-20% 0px -20% 0px' }}
          transition={{ duration: 0.8 }}
          className={styles.textBlock}
        >
          <div>
            <p>
              Jag är utbildad inom klassisk realism och arbetar heltid som
              konstnär och instruktör i måleri.
            </p>
            <p>
              Min stil kännetecknas av ljusa pastelltoner och porträtt med ett
              levande ljus där klassiskt hantverk möter ett modernt uttryck.
              Även om porträttmåleri ligger mig varmast om hjärtat är jag
              nyfiken och öppen för att utforska nya motiv och tekniker. Jag är
              en snabb och intuitiv målare, och målar gärna live på event; en
              uppskattad upplevelse där gästerna får se ett realistiskt
              konstverk växa fram på bara några timmar.
            </p>
            <p>
              Till vardags driver jag ateljé och keramikverkstaden La Fabrique,
              där jag arbetar med beställningsmåleri och håller kurser i
              oljemåleri och akvarell i min egen ateljé.
              <br />
              <br />
            </p>
            <h2 className={styles.header2}>Utbildning</h2>
            <div className={styles.utbildning}>
              <ul>
                <li>Florence Academy of Art (2019) - 3 år klassisk realism</li>
                <li>Dômen Konstskola (2011) - 2 år måleri</li>
              </ul>
            </div>
          </div>
        </motion.section>
        <div className={styles.whiteBg}>
          <motion.section
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-20% 0px -20% 0px' }}
            transition={{ duration: 0.8 }}
            className={`${styles.textImgWrapper} ${styles.scrollTarget}`}
            id='event'
          >
            <div className={styles.parent}>
              <div className={styles.div1}>
                <Image
                  src={bg}
                  alt='Ett svartvitt foto av en skugga från ett palmblad mot en vit vägg'
                />
              </div>
              <Image
                className={styles.div2}
                src={cheers}
                alt='Karin Lilja skålar framför sitt stafli'
              />
              <div className={styles.div3}>
                <div className={styles.textImgIngress}>Låt mig gissa...</div>
                <div>
                  <h2>Ni är trötta på event som känns som en repris</h2>
                </div>
                <div>
                  <span className={styles.textImgIngress2}>
                    Ge gästerna något oväntat - en upplevelse som fångar stunden
                    och väcker samtal.
                  </span>
                  <ul className={styles.checkList}>
                    <li className={styles.checkmark}>
                      Anlita en livekonstnär som förvandlar ögonblicket till
                      konst.
                    </li>
                    <li className={styles.checkmark}>
                      Upplev hur ett realistiskt måleri växer fram inför allas
                      ögon - klart på bara några timmar.
                    </li>
                    <li className={styles.checkmark}>
                      Skapa en levande, personlig och oförglömlig atmosfär som
                      gästerna minns långt efteråt.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.section>
        </div>
        <div className={styles.beigeBg}>
          <motion.section
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-20% 0px -20% 0px' }}
            transition={{ duration: 0.8 }}
            className={`${styles.glossier} ${styles.scrollTarget}`}
            id='kurser'
          >
            <div>
              <h2 className={styles.header2}>Kurser</h2>
              <p>
                Jag erbjuder även kurser i akvarell och oljemåleri, både för
                events och för privatpersoner.
                <br />
                Läs mer och boka genom vår ateljés hemsida!
              </p>
              <CtaButton
                href='https://lafabrique.se'
                target='_blank'
                color='gold'
              >
                Lafabrique.se
              </CtaButton>
            </div>
          </motion.section>
        </div>
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-20% 0px -20% 0px' }}
          transition={{ duration: 0.8 }}
        >
          <Form />
        </motion.section>
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
      </main>
    </div>
  );
}
