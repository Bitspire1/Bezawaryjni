# TinaCMS Best Practices - Implementacja

## Zaimplementowane wzorce z TinaCMS Demo

### ✅ 1. Error Handling w getStaticProps/Fetch Functions
**Problem**: Build crashuje gdy dokument nie istnieje  
**Rozwiązanie**: Zawsze owijamy w try/catch

```typescript
// src/lib/tinaClient.ts
export async function fetchPageData(slug: string) {
    try {
        const response = await client.queries.pages({
            relativePath: `${slug}.mdx`,
        });
        return { query, data, variables };
    } catch (error) {
        console.error(`Error fetching page ${slug}:`, error);
        return null; // Graceful degradation
    }
}
```

### ✅ 2. Prawidłowy Przepływ Danych z useTina
**Problem**: Live editing nie działa poprawnie  
**Rozwiązanie**: Przekazujemy query, data, variables do useTina

```typescript
// src/app/admin/[[slug]]/page.tsx (gdy odkomentujemy Tina)
const response = await client.queries.pages({ relativePath: `${slug}.mdx` });

const { data } = useTina({
    query: response.query,      // ✅ GraphQL query
    variables: response.variables, // ✅ Query variables
    data: response.data,         // ✅ Initial data
});
```

### ✅ 3. Separacja Logiki Renderowania
**Problem**: Komponenty są trudne do testowania i reużycia  
**Rozwiązanie**: Wydzielamy reużywalne komponenty

```typescript
// src/components/ui/ContentSection.tsx
export function ContentSection({ heading, description, children }) {
    return (
        <div>
            {heading && <h2>{heading}</h2>}
            {description && <p>{description}</p>}
            {children}
        </div>
    );
}
```

### ✅ 4. Centralized Tina Client Utilities
**Problem**: Duplikacja logiki fetchowania  
**Rozwiązanie**: Scentralizowane utility functions

```typescript
// src/lib/tinaClient.ts
export async function fetchPageData(slug: string)
export async function getAllPagePaths()
```

### ✅ 5. Static Generation z fallback: false
**Problem**: Niespodziewane strony generowane w runtime  
**Rozwiązanie**: Strict SSG - tylko pre-renderowane strony

```typescript
// src/app/[[slug]]/page.tsx
export async function generateStaticParams() {
    const paths = await getAllPagePaths();
    return paths.map((slug) => ({ slug: [slug] }));
}
```

### ✅ 6. TypeScript Type Safety
**Problem**: Runtime errors z powodu złych typów  
**Rozwiązanie**: Explicit interfaces dla Tina data

```typescript
// src/lib/tinaClient.ts
export interface TinaQueryResult<T = any> {
    query: string;
    data: T;
    variables: Record<string, any>;
}
```

## Struktura Projektu

```
src/
├── app/
│   ├── [[slug]]/page.tsx        # Production SSG z error handling
│   └── admin/[[slug]]/page.tsx  # Admin z useTina hook
├── components/
│   ├── Found/                   # UI komponenty (Hero, FAQ, etc.)
│   ├── pages/
│   │   └── HomePageWrapper.tsx  # Page composition
│   └── ui/
│       └── ContentSection.tsx   # Reusable section wrapper
└── lib/
    ├── pageRegistry.ts          # Centralna mapa slugów
    └── tinaClient.ts           # Tina utilities z error handling
```

## Gotowe do Odkomentowania

Gdy `tina/__generated__/client` będzie wygenerowany:

1. **src/lib/tinaClient.ts** - Odkomentuj client.queries
2. **src/app/[[slug]]/page.tsx** - Już używa tinaClient
3. **src/app/admin/[[slug]]/page.tsx** - Odkomentuj useTina

## Następne Kroki

1. Uruchom `npm run dev` - Tina wygeneruje client
2. Odkomentuj import client w tinaClient.ts
3. Odkomentuj useTina w admin page
4. Test visual editing w `/admin`

## Kluczowe Różnice vs Stara Implementacja

| Aspekt | Przed | Po |
|--------|-------|-----|
| Error handling | ❌ Brak | ✅ try/catch wszędzie |
| Data flow | ❌ Bezpośredni props | ✅ query/data/variables |
| Reusability | ❌ Duplikacja | ✅ Utility functions |
| Type safety | ⚠️ `any` types | ✅ Explicit interfaces |
| SSG strategy | ⚠️ Niejasna | ✅ Strict fallback: false |
