import Image from 'next/image';
import styles from './page.module.css';
import headshot from '../public/headshot.webp';
import woman from '../public/woman.webp';
import ludwig from '../public/ludwig.webp';
import bg from '../public/bg.jpeg';
import drink from '../public/drink.jpeg';
import { FaInstagram } from 'react-icons/fa';
import Link from 'next/link';

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <section className={styles.hero}>
          <nav className={styles.navbar}>
            <div className={styles.logo}>
              <span className={styles.logoFirstName}>Karin</span>{' '}
              <span className={styles.logoLastName}>lilja</span>
            </div>
            <div>Links</div>
          </nav>
          <div className={styles.heroIngressWrapper}>
            <div className={styles.heroIngressOne}>NÄR STUNDEN BLIR KONST</div>
            <div className={styles.heroIngressTwo}>
              Levande konst, skapad på plats
            </div>
          </div>
        </section>
        <section className={styles.introWrapper}>
          <div className={styles.introParent}>
            <Image className={styles.headshot} src={headshot} alt='' />

            <Image className={styles.imgOne} src={ludwig} alt='' />

            <Image className={styles.imgTwo} src={woman} alt='' />

            <div className={styles.introIngress}>
              Målare, tatuerare och entrepenör från Göteborg
            </div>
            <div className={styles.introHello}>
              Hej! Jag heter
              <br />
              Karin Lilja
            </div>
          </div>
        </section>
        <section className={styles.textImgWrapper}>
          <div className={styles.parent}>
            <div className={styles.div1}>
              <Image src={bg} alt='' />
            </div>
            <Image className={styles.div2} src={drink} alt='' />
            <div className={styles.div3}>
              <div className={styles.textImgIngress}>Låt mig gissa...</div>
              <div>
                <h2>Ni är trötta på event som känns likadana</h2>
              </div>
              <div>
                <span className={styles.textImgIngress2}>
                  Känner ni igen er i den här känslan?
                </span>
                <ul className={styles.checkList}>
                  <li>
                    Ni söker en upplevelse som speglar er energi och atmosfär.
                  </li>
                  <li>
                    Ni vill skapa något levande, något som händer här och nu.
                  </li>
                  <li>Ni vill att ert event ska kännas levande och äkta.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        <section>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. A fugit ea,
          ullam maiores veniam ad ipsa delectus reprehenderit pariatur sit
          voluptas fuga sint atque quibusdam possimus aperiam voluptatibus?
          Delectus maiores dolores a aperiam nisi unde sapiente placeat.
          Corporis neque obcaecati debitis quo. Esse obcaecati maiores
          reiciendis, tempora iusto magni autem mollitia, sequi, et asperiores
          voluptas. Sapiente porro necessitatibus molestias sit, unde natus
          optio eius quae deserunt perspiciatis delectus quasi fugiat quisquam,
          minima sed magnam neque iusto beatae! Nemo impedit itaque ipsam
          magnam? Adipisci maiores aliquam quaerat accusantium, quisquam vitae
          animi asperiores laborum? Accusantium sequi quisquam sapiente modi
          commodi doloremque eius.
        </section>
        <footer className={styles.footer}>
          <div className={styles.footerName}>KARIN</div>
          <div className={styles.footerLastName}>lilja</div>
          <div className={styles.footerTitle}>
            Målare, tatuerare och entrepenör i Göteborg
          </div>
          <div className={styles.socialMedia}>
            <Link href='/' target='_blank'>
              <FaInstagram />
            </Link>
          </div>
          <div>länkar</div>
        </footer>
      </main>
    </div>
  );
}
