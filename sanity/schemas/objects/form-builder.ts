import { defineType } from "sanity";

export default defineType({
    title: 'Form Builder',
    name: 'formBuilder',
    type: 'object',
    fields: [
        {
            name: 'title',
            type: 'string',
            title: 'Title',
            description: 'The title of the form',
        },
        {
            name: 'fields',
            type: 'array',
            title: 'Form Fields',
            of: [
                {
                    type: 'object',
                    name: 'formField',
                    title: 'Form Field',
                    fields: [
                        {
                            name: 'label',
                            type: 'string',
                            title: 'Label',
                            description: 'The label for the form field',
                        },
                        {
                            name: 'type',
                            type: 'string',
                            title: 'Type',
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
                    ],
                },
            ],
        },
    ],
})