import { defineType } from "sanity";

export default defineType({
    title: 'Form Builder',
    name: 'formBuilder',
    type: 'object',
    fields: [
        {
            title: 'Subject',
            name: 'subject',
            type: 'string',
            description: 'The subject of the form',
        },
        {
            title: 'Form Fields',
            name: 'fields',
            type: 'array',
            of: [
                {
                    title: 'Form Field',
                    type: 'object',
                    name: 'formField',
                    fields: [
                        {
                            title: 'Label',
                            name: 'label',
                            type: 'string',
                            description: 'The label for the form field',
                        },
                        {
                            title: 'Type',
                            name: 'type',
                            type: 'string',
                            description: 'The type of form field (e.g., text, email, checkbox, etc.)',
                            options: {
                                list: [
                                    { title: 'Text', value: 'text' },
                                    { title: 'Email', value: 'email' },
                                    { title: 'Checkbox', value: 'checkbox' },
                                    { title: 'Select', value: 'select' },
                                    { title: 'Radio Buttons', value: 'radio' },
                                    { title: 'Textarea', value: 'textarea' }
                                    // Add more field types as needed
                                ],
                            },
                        },
                        {
                            title: 'Checkbox Values',
                            name: 'checkBoxValue',
                            type: 'array',
                            hidden: ({ parent }) => parent?.type !== "checkbox",
                            of: [
                                {type: 'string'}
                            ]
                        },
                        {
                            title: 'Radio Values',
                            name: 'radioValue',
                            type: 'array',
                            hidden: ({ parent }) => parent?.type !== "radio",
                            of: [
                                {type: 'string'}
                            ]
                        },
                        {
                            title: 'Select Dropdown Values',
                            name: 'selectValue',
                            type: 'array',
                            hidden: ({ parent }) => parent?.type !== "select",
                            of: [
                                {type: 'string'}
                            ]
                        },
                    ],
                },
            ],
        },
    ],
})