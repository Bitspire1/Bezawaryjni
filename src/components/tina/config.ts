import { defineConfig } from 'tinacms';
export default defineConfig({
    branch: 'main',
    clientId: "",
    token: "",
    build: {
        outputFolder: 'admin',
        publicFolder: 'public',
    },
    schema: {
        collections: [
            {
                name: 'pages',
                label: 'Pages',
                path: 'content/pages',
                format: 'md',
                fields: [
                    {
                        name: 'title',
                        type: 'string',
                    },
                ],
            },
        ],





    },

});