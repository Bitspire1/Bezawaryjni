# TinaCMS Visual Editing - Kompletny Przewodnik

## Spis Treści
1. [Przegląd Architektury](#przegląd-architektury)
2. [Wymagane Zależności](#wymagane-zależności)
3. [Struktura Plików](#struktura-plików)
4. [Konfiguracja TinaCMS](#konfiguracja-tinacms)
5. [Routing i Strony](#routing-i-strony)
6. [Komponenty z Visual Editing](#komponenty-z-visual-editing)
7. [Stylowanie](#stylowanie)
8. [Komunikacja iframe](#komunikacja-iframe)
9. [Metadata i _content_source](#metadata-i-_content_source)
10. [Debugowanie](#debugowanie)

---

## 1. Przegląd Architektury

Visual Editing w TinaCMS działa na zasadzie **iframe + postMessage**:
- **Admin Panel** (lewy): Formularz do edycji (`/admin/index.html`)
- **Preview iframe** (prawy): Twoja strona renderowana w trybie edycji (`/admin/[slug]`)
- **Komunikacja**: postMessage API między admin a preview

### Kluczowe Koncepty:
- `useTina` hook dodaje metadata `_content_source` do danych w trybie edycji
- `tinaField` helper czyta metadata i tworzy atrybuty `data-tina-field`
- CSS podświetla elementy z `data-tina-field` gdy najedziemy myszką
- Kliknięcie elementu otwiera odpowiednie pole w formularzu

---

## 2. Wymagane Zależności

### package.json
```json
{
  "dependencies": {
    "tinacms": "^3.0.2",
    "@tinacms/cli": "^2.0.2",
    "next": "^16.0.7",
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  }
}
```

### Dlaczego te wersje?
- **tinacms 3.0.2**: Najnowsza wersja z useTina i tinaField
- **Next.js 16**: Wspiera App Router i React 19
- **React 18.3.1**: Stabilna wersja z hooks

---

## 3. Struktura Plików

```
projekt/
├── public/
│   └── admin/
│       └── index.html          # Admin interface TinaCMS
├── content/
│   └── pages/
│       └── home.mdx            # Content files
├── tina/
│   ├── config.ts               # TinaCMS configuration
│   └── __generated__/
│       ├── client.ts           # Generated GraphQL client
│       └── types.ts            # Generated TypeScript types
├── src/
│   ├── app/
│   │   ├── globals.css         # Visual editing styles
│   │   ├── admin/
│   │   │   ├── page.tsx        # Redirect /admin → /admin/index.html
│   │   │   └── [...slug]/
│   │   │       └── page.tsx    # Visual editing preview page
│   │   └── page.tsx            # Public homepage
│   ├── components/
│   │   ├── sections/
│   │   │   └── Hero.tsx        # Component with visual editing
│   │   └── pages/
│   │       └── HomePageWrapper.tsx  # Page wrapper
│   └── lib/
│       └── pageRegistry.ts     # Maps slugs to components
└── TINACMS_VISUAL_EDITING_GUIDE.md  # This file
```

### Dlaczego ta struktura?
- `/admin/index.html`: TinaCMS wymaga tego pliku w publicFolder
- `/admin/[...slug]`: Dynamiczny routing dla preview wszystkich stron
- `content/pages/`: Oddzielenie contentu od kodu
- `tina/__generated__/`: Auto-generowane przez @tinacms/cli

---

## 4. Konfiguracja TinaCMS

### tina/config.ts

```typescript
import { defineConfig, LocalAuthProvider } from 'tinacms';

export default defineConfig({
    // 1. BRANCH - branch Git dla contentu
    branch: 'Nowy',
    
    // 2. CLIENT ID - dla TinaCloud (opcjonalne local)
    clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID || "",
    
    // 3. TOKEN - dla TinaCloud (opcjonalne local)
    token: process.env.TINA_TOKEN || "",
    
    // 4. AUTH PROVIDER - Local mode bez logowania
    authProvider: new LocalAuthProvider(),
    
    // 5. BUILD - gdzie generować admin
    build: {
        outputFolder: 'admin',    // Wygeneruje do public/admin
        publicFolder: 'public',   // Folder publiczny Next.js
    },
    
    // 6. MEDIA - zarządzanie obrazkami
    media: {
        tina: {
            mediaRoot: '',           // Root folder dla media
            publicFolder: 'public',  // Public folder Next.js
        },
    },
    
    // 7. SCHEMA - definicja collections i pól
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
                            // ... więcej pól
                        ],
                    },
                ],
            },
        ],
    },
});
```

### Kluczowe Punkty:
1. **LocalAuthProvider**: Wyłącza autentykację w local mode
2. **outputFolder: 'admin'**: Generuje do `public/admin/`
3. **Schema collections**: Musi odpowiadać strukturze plików w `content/`
4. **Field types**: string, number, boolean, object, reference, image, rich-text
5. **UI components**: textarea, toggle, color, date, select

---

## 5. Routing i Strony

### A. Admin Redirect Page

**src/app/admin/page.tsx**
```typescript
"use client";

import { useEffect } from "react";

export default function AdminRedirectPage() {
    useEffect(() => {
        // Redirect to TinaCMS admin with hash routing
        window.location.href = '/admin/index.html#/~/admin/home';
    }, []);

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400" />
        </div>
    );
}
```

**Dlaczego to potrzebne?**
- TinaCMS używa hash routing: `#/~/admin/home`
- `/admin` przekierowuje do `/admin/index.html#/~/admin/home`
- Spinner pokazuje się podczas przekierowania

---

### B. Visual Editing Preview Page

**src/app/admin/[...slug]/page.tsx**
```typescript
"use client";

import { use, useEffect, useState } from "react";
import { useTina } from "tinacms/dist/react";
import { pageRegistry } from "@/lib/pageRegistry";
import client from "../../../../tina/__generated__/client";

interface AdminPageProps {
    params: Promise<{
        slug: string[];
    }>;
}

export default function AdminPage(props: AdminPageProps) {
    // 1. RESOLVE PARAMS - Next.js 15+ async params
    const params = use(props.params);
    const slug = params.slug?.[0] || "home";
    
    // 2. STATE dla async data loading
    const [pageData, setPageData] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isMounted, setIsMounted] = useState(false);

    // 3. CLIENT-ONLY RENDERING - unikaj hydration errors
    useEffect(() => {
        setIsMounted(true);
    }, []);

    // 4. FETCH DATA - async w useEffect
    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await client.queries.pages({
                    relativePath: `${slug}.mdx`,
                });
                setPageData(result);
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching page data:", error);
                setIsLoading(false);
            }
        };
        fetchData();
    }, [slug]);

    // 5. GET WRAPPER from registry
    const Wrapper = pageRegistry[slug];
    
    if (!Wrapper) {
        return <div>Nieznany slug: {slug}</div>;
    }

    // 6. LOADING STATE - suppressHydrationWarning dla consistency
    if (!isMounted || isLoading || !pageData) {
        return <div suppressHydrationWarning>Ładowanie...</div>;
    }

    // 7. RENDER with useTina
    return <AdminPageContent pageData={pageData} Wrapper={Wrapper} />;
}

// SEPARATE COMPONENT dla useTina (musi być w komponencie)
function AdminPageContent({ pageData, Wrapper }: { pageData: any; Wrapper: any }) {
    // 8. useTina HOOK - dodaje _content_source metadata
    const { data } = useTina({
        query: pageData.query,
        variables: pageData.variables,
        data: pageData.data,
    });

    // 9. DEBUG LOGGING
    useEffect(() => {
        console.log('🔍 TinaCMS Visual Edit Debug:', {
            dataKeys: Object.keys(data),
            pagesKeys: data.pages ? Object.keys(data.pages) : [],
            heroKeys: data.pages?.hero ? Object.keys(data.pages.hero) : [],
            hasContentSource: '_content_source' in (data.pages || {}),
            hasHeroContentSource: '_content_source' in (data.pages?.hero || {}),
            sampleData: {
                tagline: data.pages?.hero?.tagline,
                heading: data.pages?.hero?.heading,
            }
        });
    }, [data]);

    // 10. RENDER wrapper z enhanced data
    return <Wrapper data={data.pages} />;
}
```

**Kluczowe Punkty:**
1. **"use client"**: Musi być client component
2. **use(props.params)**: React 19 async params resolution
3. **useState + useEffect**: Async data loading
4. **isMounted**: Zapobiega hydration mismatch
5. **suppressHydrationWarning**: Na loading state
6. **useTina**: MUSI być w osobnym komponencie
7. **data.pages**: Przekazujemy do wrapper
8. **Debug log**: Sprawdza czy _content_source istnieje

---

### C. Page Registry

**src/lib/pageRegistry.ts**
```typescript
import HomePageWrapper from "@/components/pages/HomePageWrapper";

export const pageRegistry: Record<string, React.ComponentType<any>> = {
    home: HomePageWrapper,
    // blog: BlogPageWrapper,
    // about: AboutPageWrapper,
};
```

**Dlaczego to potrzebne?**
- Mapuje slug (np. "home") na komponent (HomePageWrapper)
- Pozwala na dynamiczny routing `/admin/[slug]`
- Łatwe dodawanie nowych stron

---

## 6. Komponenty z Visual Editing

### A. Hero Component (z visual editing)

**src/components/sections/Hero.tsx**
```typescript
// 1. IMPORT tinaField helper
import { tinaField } from "tinacms/dist/react";

interface HeroProps {
    data: {
        hero: {
            tagline: string;
            heading: string;
            description: string;
            ctaPrimary: {
                text: string;
                url: string;
            };
            ctaSecondary: {
                text: string;
                url: string;
            };
        };
        [key: string]: unknown;
    };
}

export default function Hero({ data }: HeroProps) {
    return (
        // 2. data-tina-field na SEKCJI (całość hero)
        <section 
            id="home" 
            className="relative isolate" 
            data-tina-field={tinaField(data, 'hero')}
        >
            <picture>
                <source srcSet="/yellow-car.avif" type="image/avif" />
                <img 
                    src="/hero-garage.jpg" 
                    alt="" 
                    aria-hidden 
                    decoding="async" 
                    loading="eager" 
                    fetchPriority="high"
                    className="absolute inset-0 -z-10 h-full w-full object-cover" 
                />
            </picture>
            <div className="pointer-events-none absolute inset-0 -z-10 bg-black/65" />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 md:py-36 min-h-[60vh] sm:min-h-[70vh] flex flex-col justify-center text-white text-center md:text-left" data-animate>
                
                {/* 3. data-tina-field na TAGLINE */}
                <p 
                    className="text-yellow-400 font-semibold tracking-widest uppercase text-sm mb-4"
                    data-tina-field={tinaField(data.hero, 'tagline')}
                >
                    {data.hero.tagline}
                </p>
                
                {/* 4. data-tina-field na HEADING */}
                <h1 
                    className="text-3xl sm:text-5xl md:text-6xl font-extrabold mb-4 wrap-balance"
                    data-tina-field={tinaField(data.hero, 'heading')}
                >
                    {data.hero.heading}
                </h1>
                
                {/* 5. data-tina-field na DESCRIPTION */}
                <p 
                    className="text-base sm:text-lg text-white/90 max-w-2xl mb-8 mx-auto md:mx-0"
                    data-tina-field={tinaField(data.hero, 'description')}
                >
                    {data.hero.description}
                </p>
                
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                    {/* 6. data-tina-field na NESTED OBJECT FIELD */}
                    <a 
                        href={data.hero.ctaPrimary.url}
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 rounded-md bg-yellow-400 text-black font-semibold px-5 py-3 hover:bg-yellow-300 transition w-full sm:w-auto"
                        data-tina-field={tinaField(data.hero.ctaPrimary, 'text')}
                    >
                        {data.hero.ctaPrimary.text}
                    </a>
                    
                    {/* 7. data-tina-field na DRUGIM NESTED FIELD */}
                    <a 
                        href={data.hero.ctaSecondary.url}
                        className="inline-flex items-center justify-center gap-2 rounded-md ring-1 ring-white/40 px-5 py-3 hover:bg-white/10 transition w-full sm:w-auto"
                        data-tina-field={tinaField(data.hero.ctaSecondary, 'text')}
                    >
                        {data.hero.ctaSecondary.text}
                    </a>
                </div>
            </div>
        </section>
    );
}
```

**Kluczowe Punkty:**
1. **Import tinaField**: Z `tinacms/dist/react`
2. **Sekcja**: `tinaField(data, 'hero')` - cała sekcja
3. **Proste pola**: `tinaField(data.hero, 'tagline')` - pojedyncze pole
4. **Nested fields**: `tinaField(data.hero.ctaPrimary, 'text')` - zagnieżdżone
5. **Tylko HTML elementy**: data-tina-field działa tylko na HTML, nie React components
6. **Każde edytowalne pole**: Musi mieć swój data-tina-field

---

### B. tinaField - Jak działa?

```typescript
// Sygnatura funkcji
tinaField<T>(
    object: T,           // Obiekt z danymi (musi mieć _content_source)
    property?: string,   // Nazwa pola (opcjonalne)
    index?: number       // Index dla array items (opcjonalne)
): object

// Przykłady użycia:

// 1. Całe object
tinaField(data, 'hero')
// Zwraca: { 'data-tina-field': 'query_id---hero' }

// 2. Pole w object
tinaField(data.hero, 'tagline')
// Zwraca: { 'data-tina-field': 'query_id---hero.tagline' }

// 3. Nested object field
tinaField(data.hero.ctaPrimary, 'text')
// Zwraca: { 'data-tina-field': 'query_id---hero.ctaPrimary.text' }

// 4. Array item
tinaField(data.services.items[0], 'title')
// Zwraca: { 'data-tina-field': 'query_id---services.items.0.title' }

// 5. Bez property (cały object)
tinaField(data.hero.ctaPrimary)
// Zwraca: { 'data-tina-field': 'query_id---hero.ctaPrimary' }
```

**Co robi tinaField?**
1. Czyta `_content_source` z obiektu
2. Buduje path: `queryId---path.to.field`
3. Zwraca obiekt: `{ 'data-tina-field': 'path' }`
4. Spread na element: `<div {...tinaField()} />`
5. Lub bezpośrednio: `<div data-tina-field={tinaField()} />`

---

## 7. Stylowanie

### src/app/globals.css

```css
@import "tailwindcss";

/* 1. VISUAL EDITING STYLES - klasa dodawana przez TinaCMS */
.__tina-quick-editing-enabled [data-tina-field] {
  outline: 2px dashed rgba(34, 150, 254, 0.5);
  transition: outline 150ms ease-out, box-shadow 150ms ease-out;
  cursor: pointer;
}

/* 2. HOVER STATE - podświetlenie przy najechaniu */
.__tina-quick-editing-enabled [data-tina-field]:hover {
  outline: 2px dashed rgba(34, 150, 254, 1);
  box-shadow: 0 0 0 4px rgba(34, 150, 254, 0.1);
}

/* Reszta stylów... */
```

**Kluczowe Punkty:**
1. **.__tina-quick-editing-enabled**: Klasa dodawana przez TinaCMS w edit mode
2. **[data-tina-field]**: Selektor dla wszystkich edytowalnych elementów
3. **outline**: Niebieska przerywana linia (TinaCMS blue)
4. **cursor: pointer**: Pokazuje że element jest klikalny
5. **hover**: Podświetlenie przy najechaniu
6. **box-shadow**: Soft glow effect
7. **transition**: Smooth animation

**Możliwe Customizacje:**
```css
/* Żółte outline zamiast niebieskiego */
.__tina-quick-editing-enabled [data-tina-field] {
  outline-color: rgba(250, 204, 21, 0.5);
}

/* Solid line zamiast dashed */
.__tina-quick-editing-enabled [data-tina-field] {
  outline-style: solid;
}

/* Grubszy outline */
.__tina-quick-editing-enabled [data-tina-field] {
  outline-width: 3px;
}

/* Background highlight zamiast outline */
.__tina-quick-editing-enabled [data-tina-field]:hover {
  background-color: rgba(34, 150, 254, 0.05);
  outline: none;
}
```

---

## 8. Komunikacja iframe

### Jak działa komunikacja?

```
┌─────────────────────────────────────────────────────────┐
│  ADMIN PANEL (/admin/index.html)                       │
│  ┌───────────────────────────────────────────────────┐ │
│  │ Formularz TinaCMS                                  │ │
│  │ - Hero Tagline: [_____________]                    │ │
│  │ - Hero Heading: [_____________]                    │ │
│  │ - Hero Description: [_____________]                │ │
│  └───────────────────────────────────────────────────┘ │
│                       ↓ postMessage                     │
│                  { type: 'update', field: ..., value: ...} │
│                       ↓                                  │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│  PREVIEW IFRAME (/admin/home)                           │
│  ┌───────────────────────────────────────────────────┐ │
│  │ useTina HOOK                                       │ │
│  │ 1. Nasłuchuje postMessage                          │ │
│  │ 2. Aktualizuje data                                │ │
│  │ 3. Re-renderuje komponenty                         │ │
│  └───────────────────────────────────────────────────┘ │
│                       ↓                                  │
│  ┌───────────────────────────────────────────────────┐ │
│  │ RENDERED PAGE                                      │ │
│  │ [data-tina-field] elements                         │ │
│  │ - Click → postMessage → open field                 │ │
│  └───────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────┘
```

### Co się dzieje krok po kroku:

1. **Strona ładuje się w iframe**
   - `/admin/home` renderuje się jako preview
   - useTina hook startuje i nasłuchuje

2. **User klika pole w formularzu**
   - Admin panel wysyła: `postMessage({ type: 'update', ... })`

3. **useTina otrzymuje message**
   - Hook aktualizuje internal state
   - Data zmienia się

4. **React re-renderuje**
   - Komponenty dostają nowe data
   - UI aktualizuje się live

5. **User klika element na stronie**
   - Click na [data-tina-field]
   - Preview wysyła: `postMessage({ type: 'focus', field: ... })`
   - Admin panel otwiera to pole

### useTina - Co robi internally?

```typescript
// Uproszczona wersja useTina (wewnętrznie)
function useTina({ query, variables, data }) {
    const [editableData, setEditableData] = useState(data);
    
    useEffect(() => {
        // 1. Dodaj _content_source metadata
        const enhanced = addMetadata(queryId, data, []);
        setEditableData(enhanced);
        
        // 2. Nasłuchuj na zmiany z admin panel
        window.addEventListener('message', (event) => {
            if (event.data.type === 'updateContent') {
                // Aktualizuj data z formularza
                setEditableData(event.data.newData);
            }
        });
        
        // 3. Powiadom admin że strona gotowa
        parent.postMessage({ 
            type: 'ready', 
            query, 
            variables 
        }, '*');
    }, []);
    
    return { data: editableData };
}
```

---

## 9. Metadata i _content_source

### Co to jest _content_source?

```typescript
// PRZED useTina:
const data = {
    pages: {
        hero: {
            tagline: "Warsztat samochodowy",
            heading: "Twój samochód w dobrych rękach",
        }
    }
};

// PO useTina (w edit mode):
const data = {
    pages: {
        _content_source: {
            queryId: "abc123",
            path: ["pages"]
        },
        hero: {
            _content_source: {
                queryId: "abc123",
                path: ["pages", "hero"]
            },
            tagline: "Warsztat samochodowy",
            heading: "Twój samochód w dobrych rękach",
            _content_source: {
                queryId: "abc123",
                path: ["pages", "hero", "tagline"]
            }
        }
    }
};
```

### Dlaczego _content_source jest kluczowe?

1. **tinaField czyta _content_source**
   ```typescript
   tinaField(data.hero, 'tagline')
   // ↓
   // Czyta: data.hero._content_source
   // Buduje path: queryId---pages.hero.tagline
   ```

2. **Admin panel wie gdzie zapisać zmiany**
   ```typescript
   // User edytuje tagline
   // data-tina-field="abc123---pages.hero.tagline"
   // ↓
   // Admin wie: update pages.hero.tagline
   ```

3. **Click-to-edit działa**
   ```typescript
   // User klika element
   // data-tina-field="abc123---pages.hero.tagline"
   // ↓
   // Admin otwiera pole tagline
   ```

### Kiedy _content_source NIE jest dodawany?

1. **Production mode** - useTina passthrough
2. **Poza iframe** - tylko w admin preview
3. **Błąd w query** - useTina nie może działać
4. **Brak useTina** - trzeba użyć hooka

---

## 10. Debugowanie

### A. Console Logs

**W src/app/admin/[...slug]/page.tsx:**
```typescript
useEffect(() => {
    console.log('🔍 TinaCMS Visual Edit Debug:', {
        dataKeys: Object.keys(data),
        pagesKeys: data.pages ? Object.keys(data.pages) : [],
        heroKeys: data.pages?.hero ? Object.keys(data.pages.hero) : [],
        hasContentSource: '_content_source' in (data.pages || {}),
        hasHeroContentSource: '_content_source' in (data.pages?.hero || {}),
        sampleData: {
            tagline: data.pages?.hero?.tagline,
            heading: data.pages?.hero?.heading,
        }
    });
}, [data]);
```

**Co sprawdzamy?**
1. **dataKeys**: Jakie top-level keys są w data
2. **pagesKeys**: Czy pages ma _content_source
3. **heroKeys**: Czy hero ma _content_source
4. **hasContentSource**: Boolean check
5. **sampleData**: Przykładowe wartości

### B. Browser DevTools

**Chrome DevTools → Console:**
```
🔍 TinaCMS Visual Edit Debug:
{
  dataKeys: ["pages", "query", "variables"],
  pagesKeys: ["__typename", "id", "title", "_sys", "hero", "_content_source"],
  heroKeys: ["__typename", "tagline", "heading", "description", "ctaPrimary", "ctaSecondary", "_content_source"],
  hasContentSource: true,
  hasHeroContentSource: true,
  sampleData: {
    tagline: "Warsztat samochodowy",
    heading: "Twój samochód w dobrych rękach"
  }
}
```

**✅ GOOD**: hasContentSource i hasHeroContentSource są true  
**❌ BAD**: Jeśli false, useTina nie działa

### C. Inspect data-tina-field

**Chrome DevTools → Elements:**
```html
<p class="text-yellow-400 ..." 
   data-tina-field="abc123---pages.hero.tagline">
    Warsztat samochodowy
</p>
```

**Co sprawdzamy?**
1. **Czy atrybut istnieje**: `data-tina-field`
2. **Format**: `queryId---path.to.field`
3. **Path**: Czy odpowiada strukturze schema

### D. Check CSS

**Chrome DevTools → Elements → Computed:**
```css
/* Sprawdź czy klasa jest dodana */
html.__tina-quick-editing-enabled {}

/* Sprawdź czy outline jest aplikowany */
[data-tina-field] {
  outline: 2px dashed rgba(34, 150, 254, 0.5);
}
```

### E. Network Tab

**Chrome DevTools → Network:**
- Sprawdź czy `/admin/index.html` ładuje się
- Sprawdź czy `http://localhost:4001/@vite/client` działa
- Sprawdź czy GraphQL queries są ok

### F. Common Issues

**Problem**: Nic się nie podświetla  
**Solution**: 
- Sprawdź czy `.__tina-quick-editing-enabled` jest w CSS
- Sprawdź czy `data-tina-field` jest na elementach
- Sprawdź console czy są błędy

**Problem**: "Looks like there's nothing to edit"  
**Solution**:
- Sprawdź czy useTina jest użyty
- Sprawdź czy data zawiera _content_source
- Sprawdź console logs

**Problem**: Hydration error  
**Solution**:
- Dodaj `suppressHydrationWarning` na loading state
- Użyj `isMounted` state
- Upewnij się że SSR i client renderują to samo

**Problem**: tinaField is not a function  
**Solution**:
- Import z `tinacms/dist/react`
- Nie z `tinacms`

---

## 11. Checklist - Co potrzebujemy?

### ✅ Pliki i Struktura

- [ ] `public/admin/index.html` - TinaCMS admin interface
- [ ] `tina/config.ts` - Konfiguracja z LocalAuthProvider
- [ ] `tina/__generated__/client.ts` - Generated by CLI
- [ ] `tina/__generated__/types.ts` - Generated by CLI
- [ ] `content/pages/home.mdx` - Content file
- [ ] `src/app/admin/page.tsx` - Redirect page
- [ ] `src/app/admin/[...slug]/page.tsx` - Preview page
- [ ] `src/lib/pageRegistry.ts` - Slug → Component mapping
- [ ] `src/components/pages/HomePageWrapper.tsx` - Page wrapper
- [ ] `src/components/sections/Hero.tsx` - Component with visual editing

### ✅ Dependencies

- [ ] `tinacms: ^3.0.2`
- [ ] `@tinacms/cli: ^2.0.2`
- [ ] `next: ^16.0.7`
- [ ] `react: ^18.3.1`

### ✅ TinaCMS Config (tina/config.ts)

- [ ] `defineConfig` imported
- [ ] `LocalAuthProvider` imported i używany
- [ ] `branch` ustawiony
- [ ] `clientId` i `token` (opcjonalne dla local)
- [ ] `build.outputFolder: 'admin'`
- [ ] `build.publicFolder: 'public'`
- [ ] `media.tina` konfiguracja
- [ ] `schema.collections` zdefiniowane
- [ ] Fields dla hero: tagline, heading, description, ctaPrimary, ctaSecondary

### ✅ Admin Page (src/app/admin/[...slug]/page.tsx)

- [ ] `"use client"` directive
- [ ] Import `useTina` z `tinacms/dist/react`
- [ ] Import `client` z generated
- [ ] `use(props.params)` dla async params
- [ ] `useState` dla pageData, isLoading, isMounted
- [ ] `useEffect` dla mounting check
- [ ] `useEffect` dla data fetching
- [ ] `client.queries.pages({ relativePath })` call
- [ ] Osobny `AdminPageContent` component
- [ ] `useTina({ query, variables, data })` call
- [ ] `suppressHydrationWarning` na loading div
- [ ] Debug console.log
- [ ] Return `<Wrapper data={data.pages} />`

### ✅ Hero Component (src/components/sections/Hero.tsx)

- [ ] Import `tinaField` z `tinacms/dist/react`
- [ ] `data-tina-field={tinaField(data, 'hero')}` na section
- [ ] `data-tina-field={tinaField(data.hero, 'tagline')}` na p
- [ ] `data-tina-field={tinaField(data.hero, 'heading')}` na h1
- [ ] `data-tina-field={tinaField(data.hero, 'description')}` na p
- [ ] `data-tina-field={tinaField(data.hero.ctaPrimary, 'text')}` na a
- [ ] `data-tina-field={tinaField(data.hero.ctaSecondary, 'text')}` na a

### ✅ CSS (src/app/globals.css)

- [ ] `.__tina-quick-editing-enabled [data-tina-field]` style
- [ ] `outline: 2px dashed rgba(34, 150, 254, 0.5)`
- [ ] `cursor: pointer`
- [ ] `transition` dla smooth effect
- [ ] `:hover` state z `outline` i `box-shadow`

### ✅ Runtime

- [ ] `npm run dev` uruchomiony
- [ ] TinaCMS server na `http://localhost:4001`
- [ ] Next.js na `http://localhost:3000`
- [ ] `/admin` redirectuje do `/admin/index.html#/~/admin/home`
- [ ] Preview iframe ładuje `/admin/home`
- [ ] Console log pokazuje debug info
- [ ] `hasContentSource: true` w console
- [ ] `hasHeroContentSource: true` w console
- [ ] Elementy mają `data-tina-field` attributy
- [ ] Hover na elementach pokazuje outline
- [ ] Click na elementach otwiera pole w formularzu

---

## 12. Podsumowanie - Kluczowe Koncepty

### 1. useTina Hook
- **Co robi**: Dodaje `_content_source` metadata do danych w edit mode
- **Gdzie**: W preview page (`/admin/[slug]`)
- **Kiedy**: Tylko w iframe, nie w production
- **Input**: `{ query, variables, data }`
- **Output**: `{ data }` z _content_source

### 2. tinaField Helper
- **Co robi**: Generuje `data-tina-field` atrybut z path
- **Gdzie**: W każdym komponencie z edytowalnymi polami
- **Kiedy**: Na każdym HTML elemencie (nie React component)
- **Input**: `(object, property?, index?)`
- **Output**: `{ 'data-tina-field': 'queryId---path' }`

### 3. LocalAuthProvider
- **Co robi**: Wyłącza autentykację w local mode
- **Gdzie**: W `tina/config.ts`
- **Kiedy**: Local development bez TinaCloud
- **Dlaczego**: Nie potrzebujemy logowania local

### 4. .__tina-quick-editing-enabled
- **Co robi**: Klasa dodawana przez TinaCMS w edit mode
- **Gdzie**: Na `<html>` lub root element
- **Kiedy**: Automatycznie gdy jest edit mode
- **CSS**: Styluje `[data-tina-field]` elementy

### 5. _content_source
- **Co to**: Metadata z queryId i path
- **Gdzie**: Dodawany przez useTina do każdego pola
- **Kiedy**: Tylko w edit mode
- **Format**: `{ queryId: string, path: string[] }`

### 6. postMessage Communication
- **Admin → Preview**: Update field values
- **Preview → Admin**: Focus field
- **Preview → Admin**: Ready signal
- **Admin → Preview**: Enable quick editing

### 7. Preview Page Flow
```
1. User opens /admin → redirect /admin/index.html#/~/admin/home
2. Admin loads TinaCMS UI
3. Admin opens iframe: /admin/home
4. Preview page fetches data
5. useTina enhances data with _content_source
6. Components render with data-tina-field
7. CSS applies outline styles
8. User clicks element → Admin focuses field
9. User edits in form → Preview updates live
```

---

## 13. Rozszerzenia dla Innych Sekcji

### Template dla nowej sekcji z visual editing:

```typescript
import { tinaField } from "tinacms/dist/react";

interface MySectionProps {
    data: {
        mySection: {
            heading: string;
            items: Array<{
                title: string;
                description: string;
            }>;
        };
        [key: string]: unknown;
    };
}

export default function MySection({ data }: MySectionProps) {
    return (
        // 1. Sekcja
        <section data-tina-field={tinaField(data, 'mySection')}>
            {/* 2. Heading */}
            <h2 data-tina-field={tinaField(data.mySection, 'heading')}>
                {data.mySection.heading}
            </h2>
            
            {/* 3. Array items */}
            {data.mySection.items.map((item, index) => (
                <div 
                    key={index}
                    data-tina-field={tinaField(data.mySection.items, 'items', index)}
                >
                    {/* 4. Item fields */}
                    <h3 data-tina-field={tinaField(item, 'title')}>
                        {item.title}
                    </h3>
                    <p data-tina-field={tinaField(item, 'description')}>
                        {item.description}
                    </p>
                </div>
            ))}
        </section>
    );
}
```

### Dodawanie nowej sekcji do schema:

```typescript
// tina/config.ts
{
    name: 'mySection',
    label: 'My Section',
    type: 'object',
    fields: [
        {
            name: 'heading',
            label: 'Heading',
            type: 'string',
        },
        {
            name: 'items',
            label: 'Items',
            type: 'object',
            list: true,
            fields: [
                {
                    name: 'title',
                    label: 'Title',
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
}
```

---

## 14. FAQ

**Q: Czy visual editing działa w production?**  
A: Nie, `useTina` jest passthrough w production. Visual editing tylko local.

**Q: Czy muszę mieć TinaCloud?**  
A: Nie, `LocalAuthProvider` pozwala pracować offline.

**Q: Dlaczego nie używamy {...tinaField()}?**  
A: Spread rozpakuje obiekt, a potrzebujemy całego obiektu jako wartość atrybutu.

**Q: Czy mogę używać tinaField na React component?**  
A: Nie, tylko na HTML elementach (div, p, h1, etc).

**Q: Co jeśli chcę edytować array items?**  
A: Użyj `tinaField(array, 'fieldName', index)` z trzecim parametrem.

**Q: Dlaczego hydration error?**  
A: SSR renderuje loading, client renderuje content. Użyj `suppressHydrationWarning`.

**Q: Jak sprawdzić czy edit mode jest aktywny?**  
A: Sprawdź console log czy `hasContentSource` jest true.

**Q: Czy mogę customizować kolory outline?**  
A: Tak, edytuj `.__tina-quick-editing-enabled [data-tina-field]` w CSS.

---

## 15. Zasoby

- **TinaCMS Docs**: https://tina.io/docs
- **Visual Editing**: https://tina.io/docs/contextual-editing/react
- **tinaField API**: https://tina.io/docs/contextual-editing/tinafield
- **GitHub**: https://github.com/tinacms/tinacms
- **Discord**: https://discord.com/invite/zumN63Ybpf

---

**Dokument stworzony:** 2025-12-13  
**TinaCMS Version:** 3.0.2  
**Next.js Version:** 16.0.7  
**React Version:** 18.3.1
