import { defineConfig, RouteMappingPlugin } from 'tinacms';
export default defineConfig({
    branch: 'main',
    clientId: "",
    token: "",
    build: {
        outputFolder: 'admin',
        publicFolder: 'public',
    },
    cmsCallback: (cms) => {
        // Map Tina documents to site routes for Visual Editing
        cms.plugins.add(
            new RouteMappingPlugin((collection, document) => {
                if (collection.name === 'page') {
                    const filename = (document as any)._sys?.basename || (document as any)._sys?.relativePath?.replace(/\.md$/, '');
                    const slug = (document as any).slug || filename;
                    // Always route to homepage since that's the only editable page
                    return '/';
                }
                return undefined;
            })
        );
        return cms;
    },
    schema: {
        collections: [
            {
                name: 'page',
                label: 'Strona główna',
                path: 'content',
                format: 'json',
                ui: { allowedActions: { create: false, delete: false } },
                match: { include: 'home' },
                fields: [
                    {
                        name: 'hero',
                        label: 'Sekcja Hero',
                        type: 'object',
                        fields: [
                            { name: 'tagline', label: 'Tagline (mały tekst)', type: 'string' },
                            { name: 'heading', label: 'Główny nagłówek', type: 'string' },
                            { name: 'description', label: 'Opis', type: 'string', ui: { component: 'textarea' } },
                        ],
                    },
                    {
                        name: 'services',
                        label: 'Usługi',
                        type: 'object',
                        fields: [
                            { name: 'heading', label: 'Nagłówek sekcji', type: 'string' },
                            {
                                name: 'items',
                                label: 'Lista usług',
                                type: 'object',
                                list: true,
                                fields: [
                                    { name: 'title', label: 'Nazwa usługi', type: 'string' },
                                    { name: 'image', label: 'Obraz (plik w /public)', type: 'string' },
                                    { name: 'alt', label: 'Alt tekst', type: 'string' },
                                    { name: 'description', label: 'Opis usługi', type: 'string', ui: { component: 'textarea' } },
                                ],
                            },
                        ],
                    },
                    {
                        name: 'workshop',
                        label: 'Warsztat samoobsługowy',
                        type: 'object',
                        fields: [
                            { name: 'heading', label: 'Nagłówek', type: 'string' },
                            { name: 'description', label: 'Opis', type: 'string', ui: { component: 'textarea' } },
                            {
                                name: 'features',
                                label: 'Cechy',
                                type: 'object',
                                list: true,
                                fields: [{ name: 'text', label: 'Tekst', type: 'string' }],
                            },
                            {
                                name: 'steps',
                                label: 'Jak to działa (kroki)',
                                type: 'object',
                                list: true,
                                fields: [{ name: 'text', label: 'Tekst kroku', type: 'string' }],
                            },
                        ],
                    },
                    {
                        name: 'lifts',
                        label: 'Nowe podnośniki',
                        type: 'object',
                        fields: [
                            { name: 'badge', label: 'Znaczek (np. "Nowość")', type: 'string' },
                            { name: 'heading', label: 'Nagłówek', type: 'string' },
                            { name: 'description', label: 'Opis', type: 'string', ui: { component: 'textarea' } },
                        ],
                    },
                    {
                        name: 'about',
                        label: 'Nasza firma',
                        type: 'object',
                        fields: [
                            { name: 'heading', label: 'Nagłówek', type: 'string' },
                            { name: 'description1', label: 'Akapit 1', type: 'string', ui: { component: 'textarea' } },
                            { name: 'description2', label: 'Akapit 2', type: 'string', ui: { component: 'textarea' } },
                            {
                                name: 'stats',
                                label: 'Statystyki',
                                type: 'object',
                                list: true,
                                fields: [
                                    { name: 'value', label: 'Wartość (np. 2018)', type: 'string' },
                                    { name: 'label', label: 'Etykieta', type: 'string' },
                                ],
                            },
                            {
                                name: 'features',
                                label: 'Co nas wyróżnia',
                                type: 'object',
                                list: true,
                                fields: [{ name: 'text', label: 'Tekst', type: 'string' }],
                            },
                        ],
                    },
                    {
                        name: 'contact',
                        label: 'Kontakt',
                        type: 'object',
                        fields: [
                            { name: 'heading', label: 'Nagłówek', type: 'string' },
                            { name: 'description', label: 'Opis', type: 'string' },
                            { name: 'phone', label: 'Telefon', type: 'string' },
                            { name: 'email', label: 'Email', type: 'string' },
                        ],
                    },
                    {
                        name: 'faq',
                        label: 'FAQ',
                        type: 'object',
                        fields: [
                            { name: 'heading', label: 'Nagłówek', type: 'string' },
                            {
                                name: 'items',
                                label: 'Pytania i odpowiedzi',
                                type: 'object',
                                list: true,
                                fields: [
                                    { name: 'question', label: 'Pytanie', type: 'string' },
                                    { name: 'answer', label: 'Odpowiedź', type: 'string', ui: { component: 'textarea' } },
                                ],
                            },
                        ],
                    },
                    {
                        name: 'footer',
                        label: 'Stopka',
                        type: 'object',
                        fields: [
                            { name: 'description', label: 'Opis firmy', type: 'string', ui: { component: 'textarea' } },
                            { name: 'phone', label: 'Telefon', type: 'string' },
                            { name: 'email', label: 'Email', type: 'string' },
                            { name: 'hoursWeekday', label: 'Godziny (Pon-Pt)', type: 'string' },
                            { name: 'hoursWeekend', label: 'Godziny (Sob-Niedz)', type: 'string' },
                        ],
                    },
                ],
            },
        ],





    },

});