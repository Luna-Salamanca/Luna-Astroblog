// keystatic.config.ts
import { config, fields, collection } from '@keystatic/core';

export default config({
  storage: {
    kind: 'github',
    repo: {
      owner: 'Luna-Salamanca',
      name: 'Luna-Astroblog',
    },
  },
  
  collections: {
    // Blog posts for starlight-blog
    posts: collection({
      label: 'Blog Posts',
      slugField: 'title',
      path: 'src/content/blog/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        date: fields.date({ label: 'Publication Date' }),
        description: fields.text({ 
          label: 'Description',
          multiline: true,
        }),
        authors: fields.array(
          fields.text({ label: 'Author' }),
          {
            label: 'Authors',
            itemLabel: props => props.value,
          }
        ),
        tags: fields.array(
          fields.text({ label: 'Tag' }),
          {
            label: 'Tags',
            itemLabel: props => props.value,
          }
        ),
        content: fields.document({
          label: 'Content',
          formatting: true,
          dividers: true,
          links: true,
          images: {
            directory: 'src/assets/images',
            publicPath: '../../assets/images/',
          },
        }),
      },
    }),
    
    // Documentation pages
    docs: collection({
      label: 'Documentation',
      slugField: 'title',
      path: 'src/content/docs/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        description: fields.text({ 
          label: 'Description',
          multiline: true,
        }),
        sidebar: fields.object({
          order: fields.number({ 
            label: 'Order',
            description: 'Order in sidebar',
          }),
          badge: fields.text({ 
            label: 'Badge',
            description: 'Optional badge text',
          }),
        }),
        content: fields.document({
          label: 'Content',
          formatting: true,
          dividers: true,
          links: true,
          images: {
            directory: 'src/assets/images',
            publicPath: '../../assets/images/',
          },
        }),
      },
    }),
  },
});