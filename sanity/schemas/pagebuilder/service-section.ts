import { defineType } from "sanity";

export default defineType({
    title: 'Services Display',
    name: 'servicesDisplay',
    type: 'object',
    groups: [
        { name: 'content', title: 'Content' },
        { name: 'settings', title: 'Settings' },
    ],
    fields: [
        {
            title: "Layout Type",
            name: "layoutType",
            type: "string",
            options: {
                list: [
                    { title: "No Featured Image", value: "noImage" },
                    { title: "Grid with Image", value: "gridWithImage" },
                ],
            },
        },
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
                    { title: 'Left', value: 'text-left' },
                    { title: 'Center', value: 'text-center mx-auto justify-center' },
                    { title: 'Right', value: 'mx-auto mr-0 text-right' },
                ]
            },
            initialValue: "text-center mx-auto justify-center"
        },
        {
            title: "Number of Columns",
            name: "columnNumber",
            type: "string",
            options: {
                list: [
                    { title: "1", value: "grid-cols-1 max-w-3xl" },
                    { title: "2", value: "grid-cols-2" },
                    { title: "3", value: "grid-cols-3" },
                    { title: "4", value: "grid-cols-4" },
                ],
            },
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
        prepare({ content }) {
            const hasContent = content && content[0]?.children?.length > 0;

            return {
                title: hasContent ? content[0].children[0].text : 'Services Section',
            };
        },
    },

})
