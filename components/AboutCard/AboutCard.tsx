'use client';
import Image from 'next/image';
import styles from './AboutCard.module.css';
import headshot from '@/public/headshot.webp';
import woman from '@/public/woman.webp';
import ludwig from '@/public/ludwig.webp';
import { motion } from 'framer-motion';

export default function AboutCard() {
  return (
    <>
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
            levande ljus där klassiskt hantverk möter ett modernt uttryck. Även
            om porträttmåleri ligger mig varmast om hjärtat är jag nyfiken och
            öppen för att utforska nya motiv och tekniker. Jag är en snabb och
            intuitiv målare, och målar gärna live på event; en uppskattad
            upplevelse där gästerna får se ett realistiskt konstverk växa fram
            på bara några timmar.
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
    </>
  );
}
