import { defineType } from "sanity";

export default defineType({
    title: 'Call to Action',
    name: 'ctaSection',
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
                    { title: "Banner", value: "banner" },
                    { title: "Text and Image", value: "textAndImage" },
                    { title: "Left Text with Right Buttons", value: "ButtonRightTextLeft" },
                    { title: "Full Width Text & Image", value: "fullWidthTextImage" },
                ],
            },
        },
        {
            title: 'Text',
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
                    {title: 'Center', value: 'text-center mx- justify-center'},
                    {title: 'Right', value: 'mx-auto mr-0 text-right'},
                ]
            }
        },
        {
            title: 'Image',
            name: 'image',
            type: 'image',
            hidden: ({ parent }) => parent?.layoutType === "banner" || parent?.layoutType === "ButtonRightTextLeft"
        },
        {
            title: 'Reverse Column',
            name: 'reverseColumn',
            type: 'boolean',
            hidden: ({ parent }) => parent?.layoutType === "banner" || parent?.layoutType === "ButtonRightTextLeft"
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
            title: 'Color Options',
            name: 'background',
            group: 'settings',
            type: 'backgroundOptions',
        },
    ],
    preview: {
        select: {
            content: 'content',
            image: 'image'
        },
        prepare({content, image}) {
            const text = content[0]?.children[0]?.text; // Extract the first block's text
            const thumbNail = image
            return {
                title: text ? text : 'No content',
                media: thumbNail
            };
        }
    }
})