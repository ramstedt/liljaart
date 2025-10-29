import styles from './page.module.css';
import Hero from '@/components/Hero/Hero';
import AboutCard from '@/components/AboutCard/AboutCard';
import PitchCard from '@/components/PitchCard/PitchCard';
import TextButtonCard from '@/components/TextButtonCard/TextButtonCard';
import Form from '@/components/Form/Form';

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Hero />
        <AboutCard />
        <PitchCard />
        <TextButtonCard />
        <Form />
      </main>
    </div>
  );
}
