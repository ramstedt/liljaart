import styles from './page.module.css';
import Image from 'next/image';
import client from '@/lib/sanityClient';
import Form from '@/components/Form/Form';

async function getShopItem(slug: string) {
  const query = `*[_type == "shop" && slug.current == $slug][0]{
    _id,
    title,
    price,
    isSold,
    description,
    "imageUrl": mainImage.asset->url
  }`;
  return await client.fetch(query, { slug });
}

export default async function Product({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = await getShopItem(slug);
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        {item ? (
          <div className={styles.product}>
            {item.imageUrl && (
              <Image
                src={item.imageUrl}
                alt={item.title}
                width={600}
                height={600}
              />
            )}
            <h1>{item.title}</h1>
            <p>{item.price} kr</p>
            <p>{item.description}</p>
            {item.isSold && <p className={styles.soldTag}>Såld</p>}
          </div>
        ) : (
          <p>Produkten hittades inte.</p>
        )}
        {item && !item.isSold && (
          <div>
            <Form
              heading='Intresserad av att köpa?'
              description='Fyll i kontaktformuläret nedan så återkommer jag till dig!'
              contextField='product'
              productTitle={`Gällande ${item?.title}`}
            />
          </div>
        )}
      </main>
    </div>
  );
}
