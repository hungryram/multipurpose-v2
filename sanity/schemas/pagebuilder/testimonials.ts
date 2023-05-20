import { defineType } from "sanity";

export default defineType({
    title: 'Testimonials',
    name: 'testimonialBuilder',
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
                    { title: "Grid View", value: "gridView" },
                    { title: "Slider", value: "slider" },
                ],
            },
            initialValue: "gridView"
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
            title: 'Number of Slides',
            name: 'slideNumber',
            validation: Rule => Rule.error().min(1).max(3),
            hidden: ({ parent }) => parent?.layoutType === 'gridView',
            type: 'number',
            group: 'settings'
        },
        {
            title: 'Navigation Arrow Colors',
            name: 'navigationColors',
            hidden: ({ parent }) => parent?.layoutType === 'gridView',
            type: 'color',
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
                title: hasContent ? content[0].children[0].text : 'Testimonials Section',
            };
        },
    },
})