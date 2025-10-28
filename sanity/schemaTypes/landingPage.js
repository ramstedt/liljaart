export const landingPage = {
  name: 'landingPage',
  title: 'Förstasidan',
  type: 'document',
  __experimental_actions: ['update', 'publish'],
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required().min(2).max(25),
    },
  ],
};
