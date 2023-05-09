import { defineType } from "sanity";

export default defineType({
    title: 'Pages',
    name: 'pages',
    type: 'document',
    groups: [
        {name: 'content', title: 'Content'},
        {name: 'settings', title: 'Settings'},
      ],
    fields: [
        
        {
            title: 'Title',
            name: 'title',
            type: 'string',
            group: 'content'
        },
        {
            title: 'URL',
            name: 'slug',
            type: 'slug',
            description: 'We recommend clicking generate. Changing URL may cause broken pages',
            options: {
              source: "title",
            },
            group: 'settings',
            validation: (Rule) => Rule.required(),
        },
        {
            title: 'Header Image',
            name: 'headerImage',
            type: 'image',
            group: 'content',
            options: {
                hotspot: true
            },
            fields: [
                {
                    title: 'Hide Header',
                    name: 'hideHeader',
                    type: 'boolean'
                },
                {
                    title: 'Spacing',
                    name: 'spacing',
                    type: 'string',
                    description: 'The spacing between the header and main website body',
                    hidden: ({ parent }) => parent?.hideHeader !== true,
                    options: {
                        list: [
                            {title: 'None', value: 'none'},
                            {title: 'Small', value: 'small'},
                            {title: 'Medium', value: 'medium'},
                            {title: 'Large', value: 'large'},
                        ]
                    },
                    group: 'settings'
                },
            ]
        },
        {
            title: 'Page Builder',
            name: 'pageBuilder',
            type: 'array',
            group: 'content',
            of: [
                {type: 'hero'},
                {type: 'contentField'},
                {type: 'featuredGrid'},
                {type: 'ctaSection'},
                {type: 'disclosureSection'},
                {type: 'logos'},
                {type: 'gallery'},
                {type: 'pricing'},
                {type: 'codeBlock'},
                {type: 'contactPage'},
                {type: 'testimonialBuilder'},
                {type: 'teamDisplay'},
                {type: 'blogDisplay'},
                {type: 'servicesDisplay'},
            ]
        },
        {
            title: 'Search Engine Optimization',
            name: 'seo',
            type: 'seo',
            validation: Rule => Rule.required().error('Required for search engines'),
            group: 'settings'
        }
    ],
    preview: {
        select: {
            title: 'title',
            subtitle: 'slug.current',
            media: 'headerImage'
        },
        prepare(selection) {
            const { title, subtitle, media } = selection
            return {
                title: title,
                media: media
                
            }
        }
    }
})
