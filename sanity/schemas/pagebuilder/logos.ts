import { defineType } from "sanity";

export default defineType({
    title: 'Logos',
    name: 'logos',
    type: 'object',
    groups: [
        {title: 'Content', name: 'content'},
        {title: 'Settings', name: 'settings'},
    ],
    fields: [
        {
          title: 'Heading',
          name: 'heading',
          type: 'string',
          group: 'content'
        },
        {
            title: 'Content',
            name: 'content',
            type: 'contentEditor',
            group: 'content'
        },
        {
          title: 'Images',
          name: 'images',
          type: 'array',
          of: [
            {
            title: 'Image',
            name: 'image',
            type: 'image',
            }
          ],
          options: {
            layout: 'grid',
          },
        },
        {
            title: 'Animation',
            name: 'animation',
            type: 'string',
            options: {
                list: [
                    {title: 'Fade', value: 'fade'},
                    {title: 'Slide', value: 'slide'},
                ]
            },
            group: 'settings',
        },
        {
            title: 'Disable Navigation Arrows',
            name: 'disableNavigation',
            type: 'boolean',
            group: 'settings',
        },
        {
          title: 'Remove Padding',
          name: 'removePadding',
          type: 'boolean',
          group: 'settings',
      },
        {
          title: 'Background Options',
          name: 'background',
          group: 'settings',
          type: 'backgroundOptions',
      }
      ],
})