import { defineType } from "sanity";

export default defineType({
    title: 'Content Field',
    name: 'contentField',
    type: 'object',
    fields: [
        {
            title: "Layout Type",
            name: "layoutType",
            type: "string",
            options: {
                list: [
                    { title: "Simple Full Width", value: "simpleFullWidth" },
                    { title: "Narrow Container", value: "narrowContainer" },
                    { title: "Two Column", value: "twoColumn" },
                ],
            },
        },
        {
            title: 'Heading',
            name: 'heading',
            type: 'string',
            hidden: ({ parent }) => parent?.layoutType === 'simpleFullWidth' || parent?.layoutType === 'narrowContainer' || parent?.layoutType === undefined
        },
        {
            title: 'Content',
            name: 'content',
            type: 'contentEditor'
        },
        {
            title: 'Background Options',
            name: 'background',
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