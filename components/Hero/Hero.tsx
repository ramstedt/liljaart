'use client';
import styles from './Hero.module.css';
import { motion } from 'framer-motion';

export type HeroProps = {
  title: string;
  ingress: string;
};

export default function Hero({ title, ingress }: HeroProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-20% 0px -20% 0px' }}
      transition={{ duration: 0.8 }}
      className={styles.hero}
    >
      <div className={styles.heroIngressWrapper}>
        <h1 className={styles.heroIngressOne}>{title}</h1>
        <div className={styles.heroIngressTwo}>{ingress}</div>
      </div>
    </motion.section>
  );
}
