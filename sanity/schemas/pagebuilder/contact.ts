import { defineType } from "sanity";

export default defineType({
    title: 'Contact Page',
    name: 'contactPage',
    type: 'object',
    fields: [
        {
            title: 'Content',
            name: 'content',
            type: 'contentEditor'
        },
        {
            title: 'Form Builder',
            name: 'formBuilder',
            type: 'formBuilder'
        },
        {
            title: 'Color Options',
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