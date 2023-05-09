import { defineType } from "sanity";
import { BsBriefcase } from "react-icons/bs"

export default defineType({
    title: 'Services',
    name: 'services',
    type: 'document',
    icon: BsBriefcase,
    groups: [
        {name: 'content', title: 'Content'},
        {name: 'settings', title: 'Settings'},
        {name: 'seo', title: 'SEO'},
      ],
    fields: [
        
        {
            title: 'Title',
            name: 'title',
            type: 'string',
            group: 'settings'
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
            group: 'settings',
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
            title: 'Hide on Services Page',
            name: 'hideService',
            type: 'boolean'
        },
        {
            title: 'Page Builder',
            name: 'pageBuilder',
            type: 'array',
            group: 'content',
            of: [
                {type: 'hero'},
                {type: 'textandImage'},
                {type: 'featuredGrid'},
                {type: 'iconSection'},
                {type: 'ctaSection'},
                {type: 'customReview'},
                {type: 'disclosureSection'},
                {type: 'teamDisplay'},
                {type: 'blogDisplay'},
                {type: 'servicesDisplay'},
                {type: 'gallery'},
                {type: 'fullWidthTextImage'},
                {type: 'leadForm'},
                {type: 'pricing'},
                {type: 'codeBlock'},
                {type: 'contactPage'},
            ]
        },
        {
            title: 'Search Engine Optimization',
            name: 'seo',
            type: 'seo',
            validation: Rule => Rule.required().error('Required for search engines'),
            group: 'seo'
        }
    ]
})