import { defineType } from "sanity";

export default defineType({
    title: 'Disclosure Section',
    name: 'disclosureSection',
    type: 'object',
    groups: [
        {title: 'Content', name: 'content'},
        {title: 'Settings', name: 'settings'},
    ],
    fields: [
        {
            title: "Layout Type",
            name: "layoutType",
            type: "string",
            options: {
                list: [
                    { title: "Two Column", value: "twoColumn" },
                ],
            },
        },
        {
            title: 'Content',
            name: 'content',
            group: 'content',
            type: 'contentEditor',
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
            },
            initialValue: "text-center mx-auto justify-center"

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
            title: 'Disclosures',
            name: 'disclosures',
            group: 'content',
            type: 'array',
            description: 'This section works best for drop downs like FAQ',
            of: [
                {
                    title: 'Disclosure Block',
                    name: 'disclosureBlock',
                    type: 'object',
                    fields: [
                        {
                            title: 'Heading',
                            name: 'heading',
                            type: 'string'
                        },
                        {
                            title: 'Content',
                            name: 'content',
                            type: 'contentEditor'
                        }
                    ]
                }
            ]
        },
        {
            title: 'Disclosure Background Color',
            name: 'disclosureBackgroundColor',
            type: 'color',
            options: {
                disableAlpha: true
            },
            group: 'settings'
        },
        {
            title: 'Disclosure Header Color',
            name: 'disclosureTextColor',
            type: 'color',
            options: {
                disableAlpha: true
            },
            group: 'settings'
        },
        {
            title: 'Disclosure Content Color',
            name: 'disclosureContentColor',
            type: 'color',
            options: {
                disableAlpha: true
            },
            group: 'settings'
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
        prepare({ content }) {
          const hasContent = content && content[0]?.children?.length > 0;
      
          return {
            title: hasContent ? content[0].children[0].text : 'Disclosure Section',
          };
        },
      },
})