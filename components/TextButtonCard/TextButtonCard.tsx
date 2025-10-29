'use client';
import styles from './TextButtonCard.module.css';
import CtaButton from '@/components/CtaButton/CtaButton';
import { motion } from 'framer-motion';

export default function TextButtonCard() {
  return (
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
            Jag erbjuder även kurser i akvarell och oljemåleri, både för events
            och för privatpersoner.
            <br />
            Läs mer och boka genom vår ateljés hemsida!
          </p>
          <CtaButton href='https://lafabrique.se' target='_blank' color='gold'>
            Lafabrique.se
          </CtaButton>
        </div>
      </motion.section>
    </div>
  );
}
