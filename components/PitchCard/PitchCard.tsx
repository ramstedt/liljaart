'use client';
import Image from 'next/image';
import styles from './PitchCard.module.css';
import bg from '@/public/bg.jpeg';
import cheers from '@/public/cheers.jpg';
import { motion } from 'framer-motion';

export default function PitchCard() {
  return (
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
                Ge gästerna något oväntat - en upplevelse som fångar stunden och
                väcker samtal.
              </span>
              <ul className={styles.checkList}>
                <li className={styles.checkmark}>
                  Anlita en livekonstnär som förvandlar ögonblicket till konst.
                </li>
                <li className={styles.checkmark}>
                  Upplev hur ett realistiskt måleri växer fram inför allas ögon
                  - klart på bara några timmar.
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
  );
}
