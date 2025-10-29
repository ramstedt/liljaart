export const shop = {
  name: 'shop',
  title: 'Butik',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Titel',
      type: 'string',
      validation: (Rule) => Rule.required().min(2).max(25),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) =>
        Rule.required().custom(async (slug, context) => {
          if (!slug || !slug.current) {
            return 'Slug krävs';
          }

          const { document, getClient } = context;
          const client = getClient({ apiVersion: '2023-01-01' });
          const existingItem = await client.fetch(
            `*[_type == "shop" && slug.current == $slug && !(_id in [$id, "drafts." + $id])][0]`,
            { slug: slug.current, id: document._id.replace(/^drafts\./, '') }
          );

          return existingItem ? 'Sluggen måste vara unik' : true;
        }),
    },
    {
      name: 'isSold',
      title: 'Såld?',
      type: 'boolean',
      initialValue: false,
    },
    {
      name: 'description',
      title: 'Beskrivning',
      type: 'text',
      validation: (Rule) => Rule.required().min(10),
    },
    {
      name: 'price',
      title: 'Pris',
      type: 'number',
      validation: (Rule) => Rule.required().min(10),
    },
    {
      name: 'mainImage',
      title: 'Bild',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) =>
        Rule.required().custom((image) => {
          if (!image || !image.asset || !image.asset._ref)
            return 'Image is required';

          const metadata = image.asset._ref.split('-')[2]; // e.g. 800x800
          if (!metadata) return 'Image metadata missing';

          const [w, h] = metadata.split('x').map(Number);
          if (w !== h) return 'Bilden måste vara kvadratisk';
          if (w > 800 || h > 800) return 'Bilden måste vara max 800x800px';

          return true;
        }),
    },
    //     {
    //       name: 'gallery',
    //       title: 'Extra bilder',
    //       type: 'array',
    //       of: [
    //         {
    //           type: 'image',
    //           options: {
    //             hotspot: true,
    //           },
    //         },
    //       ],
    //       options: {
    //         layout: 'grid',
    //       },
    //     },
  ],
};
