export const textAlign = [
    { title: 'Left', value: 'text-left' },
    { title: 'Center', value: 'text-center mx-auto justify-center' },
    { title: 'Right', value: 'mx-auto mr-0 text-right justify-end' },
]

export const primaryButton = {
    title: 'Primary Button',
    name: 'button',
    type: 'buttonSettings',
    group: 'content'
}

export const secondaryButton = {
    title: 'Secondary Button',
    name: 'secondaryButton',
    type: 'secondaryButton',
    group: 'content'
}

export const colorOptions = {
    title: 'Color Options',
    name: 'background',
    group: 'settings',
    type: 'backgroundOptions'
}

export const paddingTop = {
    title: 'Padding Top',
    name: 'paddingTop',
    type: 'string',
    group: 'settings',
    description: 'Add top padding using px, em, rem, or percentages'
}

export const paddingBottom = {
    title: 'Padding Bottom',
    name: 'paddingBottom',
    type: 'string',
    group: 'settings',
    description: 'Add bottom padding using px, em, rem, or percentages'
}