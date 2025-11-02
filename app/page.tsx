import styles from './page.module.css';
import Hero from '@/components/Hero/Hero';
import AboutCard from '@/components/AboutCard/AboutCard';
import PitchCard from '@/components/PitchCard/PitchCard';
import TextButtonCard from '@/components/TextButtonCard/TextButtonCard';
import Form from '@/components/Form/Form';
import client from '@/lib/sanityClient';
import { groq } from 'next-sanity';
import type { ComponentType } from 'react';

export const dynamic = 'force-dynamic';

type BlockComponents = {
  heroSection: ComponentType<React.ComponentProps<typeof Hero>>;
};

const blockComponents: BlockComponents = {
  heroSection: Hero,
};

type PageSection = { _type: 'heroSection' } & React.ComponentProps<typeof Hero>;

export default async function Home() {
  const page = await client.fetch(
    groq`*[_type == "landingPage" && _id == "25f7f7f1-57b9-426d-a06d-ceac03fb37fb"][0]{
      title,
      sections[]{
        _type,
        ...
      }
    }`
  );

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        {page?.sections?.map((block: PageSection, i: number) => {
          switch (block._type) {
            case 'heroSection': {
              const { _type, ...props } = block;
              return <Hero key={i} {...props} />;
            }
            default:
              return null;
          }
        })}
        <AboutCard />
        <PitchCard />
        <TextButtonCard />
        <Form />
      </main>
    </div>
  );
}
