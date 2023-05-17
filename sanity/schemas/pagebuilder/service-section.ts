import { defineType } from "sanity";

export default defineType({
    title: 'Services Display',
    name: 'servicesDisplay',
    type: 'object',
    groups: [
        {name: 'content', title: 'Content'},
        {name: 'settings', title: 'Settings'},
      ],
    fields: [
        {
            title: 'Content',
            name: 'content',
            type: 'contentEditor',
            group: 'content',
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
            title: 'Primary Button',
            name: 'button',
            type: 'buttonSettings',
            group: 'content'
        },
        {
            title: 'Secondary Button',
            name: 'secondaryButton',
            type: 'secondaryButton',
            group: 'content'
        },
        {
            title: 'Background Options',
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