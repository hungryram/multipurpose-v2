import { defineType } from "sanity";

export default defineType({
    title: 'Hero',
    name: 'hero',
    type: 'object',
    groups: [
        {name: 'content', title: 'Content'},
        {name: 'settings', title: 'Settings'},
    ],
    fields: [
        {
            title: "Layout Type",
            name: "layoutType",
            type: "string",
            options: {
                list: [
                    { title: "Slider", value: "heroSwiper" },
                    { title: "Static Hero", value: "static" },
                ],
            },
        },
        {
            title: "Image Height",
            name: "imageHeight",
            type: "string",
            options: {
                list: [
                    { title: "Full Screen", value: "h-screen" },
                    { title: "Medium", value: "h-[70vh]" },
                    { title: "Small", value: "h-[50vh]" },
                ],
            },
        },
        {
            title: 'Content',
            name: 'content',
            type: 'contentEditor',
            hidden: ({ parent }) => parent?.layoutType === 'heroSwiper',
            group: 'content'
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
            }
        },
        {
            title: 'Images',
            name: 'images',
            type: 'array',
            hidden: ({ parent }) => parent?.layoutType === 'static',
            of: [
                {
                    title: 'Image',
                    type: 'image',
                    fields: [
                        {
                            title: 'Content',
                            name: 'content',
                            type: 'contentEditor'
                        },
                        {
                            title: 'Primary Button',
                            name: 'button',
                            type: 'buttonSettings',
                        },
                        {
                            title: 'Secondary Button',
                            name: 'secondaryButton',
                            type: 'secondaryButton',
                        },
                    ]
                },
            ],
            options: {
              layout: 'grid',
            },
          },
        //   {
        //     title: 'Animation',
        //     name: 'animation',
        //     hidden: ({ parent }) => parent?.layoutType === 'static',
        //     type: 'string',
        //     options: {
        //       list: [
        //         { title: 'Fade', value: 'fade' },
        //         { title: 'Slide', value: 'slide' },
        //       ]
        //     },
        //     group: 'settings',
        //   },
        {
            title: 'Image',
            name: 'image',
            type: 'image',
            group: 'content',
            hidden: ({ parent }) => parent?.layoutType === 'heroSwiper'
        },
        {
            title: 'Image Overlay Color',
            name: 'imageOverlayColor',
            type: 'color',
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
            title: 'Disable Navigation Arrows',
            name: 'disableNavigation',
            type: 'boolean',
            hidden: ({ parent }) => parent?.layoutType === 'static',
            group: 'settings',
          },
        {
            title: 'Text Color',
            name: 'textColor',
            type: 'color',
            group: 'settings'
        },
    ],
    preview: {
        select: {
            title: 'content',
            media: 'image'
        }
    }
})