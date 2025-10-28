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
      name: 'mainImage',
      title: 'Bild',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'gallery',
      title: 'Extra bilder',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
        },
      ],
      options: {
        layout: 'grid',
      },
    },
  ],
};
