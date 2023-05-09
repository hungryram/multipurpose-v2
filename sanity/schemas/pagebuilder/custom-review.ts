import { defineType } from "sanity";

export default defineType({
    title: 'Custom Review',
    name: 'customReview',
    type: 'object',
    options: {
        collapsible: true,
        collapsed: true,
    },
    fields: [
        {
            title: 'Content',
            name: 'content',
            type: 'contentEditor'
        },
        {
            title: 'Review',
            name: 'review',
            type: 'contentEditor'
        },
        {
            title: 'name',
            name: 'Name',
            type: 'string'
        },
        {
            title: 'Position',
            name: 'position',
            type: 'contentEditor'
        },
        {
            title: 'Avatar',
            name: 'avatar',
            type: 'image',
        },
        {
            title: 'Image',
            name: 'image',
            type: 'image',
            options: {
                hotspot: true,
            },
        },
    ]
})