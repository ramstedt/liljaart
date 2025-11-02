export const heroSection = {
  name: 'heroSection',
  title: 'Hero',
  type: 'object',
  fields: [
    { name: 'title', type: 'string', title: 'Titel' },
    { name: 'ingress', type: 'string', title: 'Ingress' },
  ],
  preview: {
    select: { title: 'title', media: 'image' },
    prepare({ title, media }) {
      return { title: `Hero: ${title}`, media };
    },
  },
};
