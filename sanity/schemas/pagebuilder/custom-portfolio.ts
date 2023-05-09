import { defineType } from "sanity";

export default defineType({
    title: 'Custom Portfolio',
    name: 'customPortfolio',
    type: 'object',
    fields: [
        {
            title: 'Image',
            name: 'images',
            type: 'array',
            of: [
                {type: 'image'}
            ]
        },
    ]
})