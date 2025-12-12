import { defineConfig } from 'tinacms';

export default defineConfig({
    branch: 'Nowy',
    clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID || "",
    token: process.env.TINA_TOKEN || "",
    build: {
        outputFolder: 'admin',
        publicFolder: 'public',
    },
    media: {
        tina: {
            mediaRoot: '',
            publicFolder: 'public',
        },
    },
    schema: {
        collections: [
            {
                name: 'pages',
                label: 'Pages',
                path: 'content/pages',
                format: 'mdx',
                fields: [
                    {
                        name: 'title',
                        label: 'Title',
                        type: 'string',
                        required: true,
                    },
                    {
                        name: 'hero',
                        label: 'Hero Section',
                        type: 'object',
                        fields: [
                            {
                                name: 'tagline',
                                label: 'Tagline',
                                type: 'string',
                            },
                            {
                                name: 'heading',
                                label: 'Heading',
                                type: 'string',
                            },
                            {
                                name: 'description',
                                label: 'Description',
                                type: 'string',
                                ui: {
                                    component: 'textarea',
                                },
                            },
                            {
                                name: 'ctaPrimary',
                                label: 'Primary CTA',
                                type: 'object',
                                fields: [
                                    {
                                        name: 'text',
                                        label: 'Text',
                                        type: 'string',
                                    },
                                    {
                                        name: 'url',
                                        label: 'URL',
                                        type: 'string',
                                    },
                                ],
                            },
                            {
                                name: 'ctaSecondary',
                                label: 'Secondary CTA',
                                type: 'object',
                                fields: [
                                    {
                                        name: 'text',
                                        label: 'Text',
                                        type: 'string',
                                    },
                                    {
                                        name: 'url',
                                        label: 'URL',
                                        type: 'string',
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        name: 'services',
                        label: 'Services Section',
                        type: 'object',
                        fields: [
                            {
                                name: 'heading',
                                label: 'Heading',
                                type: 'string',
                            },
                            {
                                name: 'items',
                                label: 'Service Items',
                                type: 'object',
                                list: true,
                                fields: [
                                    {
                                        name: 'title',
                                        label: 'Title',
                                        type: 'string',
                                        required: true,
                                    },
                                    {
                                        name: 'image',
                                        label: 'Image',
                                        type: 'image',
                                    },
                                    {
                                        name: 'alt',
                                        label: 'Alt Text',
                                        type: 'string',
                                    },
                                    {
                                        name: 'description',
                                        label: 'Description',
                                        type: 'string',
                                        ui: {
                                            component: 'textarea',
                                        },
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        name: 'suppliers',
                        label: 'Suppliers Section',
                        type: 'object',
                        fields: [
                            {
                                name: 'heading',
                                label: 'Heading',
                                type: 'string',
                            },
                            {
                                name: 'description',
                                label: 'Description',
                                type: 'string',
                                ui: {
                                    component: 'textarea',
                                },
                            },
                            {
                                name: 'logos',
                                label: 'Supplier Logos',
                                type: 'object',
                                list: true,
                                fields: [
                                    {
                                        name: 'name',
                                        label: 'Name',
                                        type: 'string',
                                    },
                                    {
                                        name: 'image',
                                        label: 'Image',
                                        type: 'image',
                                    },
                                    {
                                        name: 'alt',
                                        label: 'Alt Text',
                                        type: 'string',
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        name: 'contact',
                        label: 'Contact Section',
                        type: 'object',
                        fields: [
                            {
                                name: 'heading',
                                label: 'Heading',
                                type: 'string',
                            },
                            {
                                name: 'description',
                                label: 'Description',
                                type: 'string',
                                ui: {
                                    component: 'textarea',
                                },
                            },
                            {
                                name: 'phone',
                                label: 'Phone',
                                type: 'string',
                            },
                            {
                                name: 'email',
                                label: 'Email',
                                type: 'string',
                            },
                        ],
                    },
                    {
                        name: 'faq',
                        label: 'FAQ Section',
                        type: 'object',
                        fields: [
                            {
                                name: 'heading',
                                label: 'Heading',
                                type: 'string',
                            },
                            {
                                name: 'items',
                                label: 'FAQ Items',
                                type: 'object',
                                list: true,
                                fields: [
                                    {
                                        name: 'question',
                                        label: 'Question',
                                        type: 'string',
                                        required: true,
                                    },
                                    {
                                        name: 'answer',
                                        label: 'Answer',
                                        type: 'string',
                                        ui: {
                                            component: 'textarea',
                                        },
                                        required: true,
                                    },
                                    {
                                        name: 'icon',
                                        label: 'Icon',
                                        type: 'string',
                                        options: ['clock', 'wrench', 'cart', 'calendar', 'shield', 'payment', 'bag', 'support'],
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
        ],
    },
});
