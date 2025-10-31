import styles from './page.module.css';
import Image from 'next/image';
import Link from 'next/link';
import client from '@/lib/sanityClient';

async function getShopItems() {
  const query = `*[_type == "shop"] | order(_createdAt desc){
    _id,
    title,
    price,
    isSold,
    slug,
    "imageUrl": mainImage.asset->url
  }`;
  return await client.fetch(query);
}

export default async function Gallery() {
  const items: {
    _id: string;
    title: string;
    price: number;
    isSold: boolean;
    slug: { current: string };
    imageUrl?: string;
  }[] = await getShopItems();
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.shopWrapper}>
          {items?.length ? (
            items.map((item) => (
              <div
                key={item._id}
                className={`${styles.itemCard} ${item.isSold ? styles.sold : ''}`}
              >
                {item.isSold ? (
                  <>
                    <div className={styles.imgWrapper} aria-disabled='true'>
                      <span className={styles.soldPill}>Såld</span>
                      <Image
                        src={item.imageUrl || '/placeholder.webp'}
                        alt={item.title}
                        width={300}
                        height={300}
                      />
                    </div>
                    <div className={styles.content}>
                      <h3>{item.title}</h3>
                      {item.price} sek
                    </div>
                  </>
                ) : (
                  <Link href={`/galleri/${item.slug.current}`}>
                    <div className={styles.imgWrapper}>
                      <Image
                        src={item.imageUrl || '/placeholder.webp'}
                        alt={item.title}
                        width={300}
                        height={300}
                      />
                    </div>
                    <div className={styles.content}>
                      <h3>{item.title}</h3>
                      {item.price} sek
                    </div>
                  </Link>
                )}
              </div>
            ))
          ) : (
            <p>Inga produkter hittades.</p>
          )}
        </div>
      </main>
    </div>
  );
}
