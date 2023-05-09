import { defineType } from "sanity";

export default defineType({
    title: 'Featured Grid',
    name: 'featuredGrid',
    type: 'object',
    groups: [
        { title: 'Content', name: 'content' },
        { title: 'Settings', name: 'settings' },
    ],
    fields: [
        {
            title: 'Heading',
            name: 'heading',
            type: 'string',
            group: 'content'
        },
        {
            title: 'Text',
            name: 'text',
            type: 'contentEditor',
            group: 'content'
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
            title: 'Blocks',
            name: 'blocks',
            type: 'array',
            group: 'content',
            of: [
                {
                    title: 'Blocks',
                    type: 'object',
                    fields: [
                        {
                            title: 'Heading',
                            name: 'value',
                            type: 'string'
                        },
                        {
                            title: 'Content',
                            name: 'content',
                            type: 'text',
                            validation: Rule => Rule.error('Keep it short and brief, under 150 characters').max(150)
                        },
                        {
                            title: 'Icon',
                            name: 'icon',
                            type: 'string',
                            options: {
                                list: [
                                    { title: 'Bell', value: 'BellIcon' },
                                    { title: 'Chat Bubble', value: 'ChatBubbleLeftRightIcon' },
                                    { title: 'Code', value: 'CodeBracketIcon' },
                                    { title: 'Cog', value: 'Cog6ToothIcon' },
                                    { title: 'Computer', value: 'ComputerDesktopIcon' },
                                    { title: 'Corporate Building', value: 'BuildingOfficeIcon' },
                                    { title: 'Credit Card', value: 'CreditCardIcon' },
                                    { title: 'Cube', value: 'CubeIcon' },
                                    { title: 'Document', value: 'DocumentIcon' },
                                    { title: 'Duplicate Document', value: 'DocumentDuplicateIcon' },
                                    { title: 'Envelope', value: 'EnvelopeIcon' },
                                    { title: 'Globe', value: 'GlobeAltIcon' },
                                    { title: 'Heart', value: 'HeartIcon' },
                                    { title: 'Home', value: 'HomeIcon' },
                                    { title: 'Key', value: 'KeyIcon' },
                                    { title: 'Map Pin', value: 'MapPinIcon' },
                                    { title: 'Mobile Phone', value: 'DevicePhoneMobileIcon' },
                                    { title: 'Photo', value: 'PhotoIcon' },
                                    { title: 'Question Mark', value: 'QuestionMarkCircleIcon' },
                                    { title: 'Shopping Bag', value: 'ShoppingBagIcon' },
                                    { title: 'Thunder', value: 'BoltIcon' },
                                    { title: 'Users', value: 'UsersIcon' },
                                    { title: 'Wallet', value: 'WalletIcon' },
                                ]
                            }
                        },
                        {
                            title: 'Button',
                            name: 'button',
                            type: 'links',
                        },
                        {
                            title: 'Heading Color',
                            name: 'headingColor',
                            type: 'color',
                        },
                        {
                            title: 'Content Color',
                            name: 'contentColor',
                            type: 'color',
                        },
                        {
                            title: 'Icon Color',
                            name: 'iconColor',
                            type: 'color',
                        },
                        {
                            title: 'Link Color',
                            name: 'linkColor',
                            type: 'color',
                        }
                    ]
                }
            ]
        },
        {
            title: 'Block Text Left',
            name: 'blockLeft',
            type: 'boolean',
            group: 'settings'
        },
        {
            title: 'Content Text Left',
            name: 'textLeft',
            type: 'boolean',
            group: 'settings',
        },
        {
            title: 'Number of Columns',
            name: 'columnNumber',
            type: 'number',
            validation: Rule => Rule.min(2).max(4),
            group: 'settings'
        },
        {
            title: 'Background Options',
            name: 'background',
            group: 'settings',
            type: 'backgroundOptions',
        }
    ]
})