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
            title: 'Content',
            name: 'content',
            type: 'contentEditor',
            group: 'content'
        },
        {
          title: 'Text Align',
          name: 'textAlign',
          type: 'string',
          options: {
              list: [
                  {title: 'Left', value: 'text-left'},
                  {title: 'Center', value: 'text-center mx-auto justify-center'},
                  {title: 'Right', value: 'mx-auto mr-0 text-right'},
              ]
          }
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
          title: 'Color Options',
          name: 'background',
          group: 'settings',
          type: 'backgroundOptions',
      }
      ],
      preview: {
        select: {
            content: 'content',
        },
        prepare({content}) {
            const text = content[0]?.children[0]?.text; // Extract the first block's text
            return {
                title: text ? text : 'No content',
            };
        }
    }
})