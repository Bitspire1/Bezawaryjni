const suffix = process.env.NODE_ENV === "production" ? ".html" : "";

export const metadata = {
    title: "Polityka plików cookies – Bezawaryjni AutoSerwis",
    description:
        "Polityka cookies Bezawaryjni AutoSerwis: rodzaje plików cookies (niezbędne, analityczne, funkcjonalne), okresy przechowywania i zarządzanie zgodami.",
    keywords: [
        "polityka cookies",
        "ciasteczka",
        "zgoda cookies",
        "analityczne",
        "funkcjonalne",
        "niezbędne",
    ],
    alternates: { canonical: `/polityka-cookies${suffix}` },
    robots: { index: true, follow: true },
    openGraph: {
        title: "Polityka plików cookies – Bezawaryjni AutoSerwis",
        description:
            "Dowiedz się, jakie pliki cookies wykorzystuje Bezawaryjni AutoSerwis i jak zmienić swoje zgody.",
        url: `/polityka-cookies${suffix}`,
        type: "article",
    },
    twitter: {
        card: "summary",
        title: "Polityka plików cookies – Bezawaryjni AutoSerwis",
        description:
            "Rodzaje cookies i zarządzanie zgodą na stronie Bezawaryjni AutoSerwis.",
    },
} as const;

import SectionCard from "@/components/ui/SectionCard";

export default function CookiesPolicyPage() {
    return (
        <main className="min-h-screen bg-black text-white">
            <section className="py-12 sm:py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl sm:text-4xl font-bold text-yellow-400">Polityka plików cookies</h1>
                    <p className="mt-2 text-white/70 text-sm">Ostatnia aktualizacja: 07.10.2025</p>

                    {/* JSON-LD: WebPage + Breadcrumbs */}
                    <script
                        type="application/ld+json"
                        dangerouslySetInnerHTML={{
                            __html: JSON.stringify({
                                "@context": "https://schema.org",
                                "@type": "WebPage",
                                name: "Polityka plików cookies – Bezawaryjni AutoSerwis",
                                url: `/polityka-cookies${suffix}`,
                                breadcrumb: {
                                    "@type": "BreadcrumbList",
                                    itemListElement: [
                                        { "@type": "ListItem", position: 1, name: "Strona główna", item: "/" },
                                        { "@type": "ListItem", position: 2, name: "Polityka cookies", item: `/polityka-cookies${suffix}` },
                                    ],
                                },
                            }),
                        }}
                    />
                    <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-6">
                        {/* TOC */}
                        <aside className="lg:col-span-4">
                            <div className="rounded-xl bg-[#121212] ring-1 ring-white/10 p-4 lg:sticky lg:top-20">
                                <h2 className="text-sm font-semibold text-yellow-400">Spis treści</h2>
                                <nav aria-label="Spis treści" className="mt-3 text-sm">
                                    <ol className="space-y-2 text-white/80 list-decimal list-inside">
                                        <li><a className="hover:text-yellow-400" href="#wprowadzenie">Wprowadzenie</a></li>
                                        <li><a className="hover:text-yellow-400" href="#definicje">Definicje</a></li>
                                        <li><a className="hover:text-yellow-400" href="#rodzaje">Rodzaje stosowanych plików cookies</a></li>
                                        <li><a className="hover:text-yellow-400" href="#cele">Cele wykorzystania</a></li>
                                        <li><a className="hover:text-yellow-400" href="#podstawy">Podstawy prawne</a></li>
                                        <li><a className="hover:text-yellow-400" href="#zarzadzanie">Zarządzanie zgodą</a></li>
                                        <li><a className="hover:text-yellow-400" href="#wylaczenie">Jak wyłączyć cookies w przeglądarce</a></li>
                                        <li><a className="hover:text-yellow-400" href="#czas">Okres przechowywania</a></li>
                                        <li><a className="hover:text-yellow-400" href="#prawa">Prawa użytkownika</a></li>
                                        <li><a className="hover:text-yellow-400" href="#kontakt">Kontakt</a></li>
                                        <li><a className="hover:text-yellow-400" href="#zmiany">Zmiany dokumentu</a></li>
                                        <li><a className="hover:text-yellow-400" href="#data">Data obowiązywania</a></li>
                                    </ol>
                                </nav>
                            </div>
                        </aside>

                        {/* Content */}
                        <div className="lg:col-span-8 space-y-5">
                            <SectionCard id="wprowadzenie" n={1} title="Wprowadzenie">
                                <p>
                                    Niniejsza Polityka cookies wyjaśnia, w jaki sposób Bezawaryjni AutoSerwis wykorzystuje pliki cookies
                                    i pokrewne technologie (localStorage, tagi skryptowe). Dokument ma charakter informacyjny i nie
                                    zastępuje Polityki prywatności.
                                </p>
                            </SectionCard>

                            <SectionCard id="definicje" n={2} title="Definicje">
                                <ul>
                                    <li><strong>Cookies</strong> – niewielkie pliki tekstowe zapisywane w przeglądarce użytkownika.</li>
                                    <li><strong>Sesyjne</strong> – usuwane po zamknięciu przeglądarki.</li>
                                    <li><strong>Stałe</strong> – przechowywane przez określony czas lub do ręcznego usunięcia.</li>
                                    <li><strong>Technologie pokrewne</strong> – localStorage, piksel, tag, skrypt analityczny.</li>
                                    <li><strong>Zgoda</strong> – dobrowolne, świadome działanie użytkownika umożliwiające aktywację kategorii.</li>
                                </ul>
                            </SectionCard>

                            <SectionCard id="rodzaje" n={3} title="Rodzaje stosowanych plików cookies">
                                <ul>
                                    <li><strong>Niezbędne</strong> – obsługa podstawowych funkcji (nawigacja, bezpieczeństwo formularzy). Nie wymagają zgody.</li>
                                    <li><strong>Analityczne</strong> – zbieranie zanonimizowanych danych o ruchu i interakcjach w celu ulepszenia serwisu (opcjonalne).</li>
                                    <li><strong>Funkcjonalne</strong> – zapamiętywanie preferencji (np. język, interfejs) (opcjonalne).</li>
                                    <li><strong>Marketing / reklamowe</strong> – pomiar skuteczności kampanii, dopasowanie treści (stosowane wyłącznie po zgodzie).</li>
                                </ul>
                            </SectionCard>

                            <SectionCard id="cele" n={4} title="Cele wykorzystania">
                                <p>
                                    Cookies pomagają zapewnić bezpieczeństwo, mierzyć wydajność, poprawiać doświadczenie użytkownika
                                    oraz – w przypadku zgody – prowadzić podstawową analitykę i personalizację.
                                </p>
                            </SectionCard>

                            <SectionCard id="podstawy" n={5} title="Podstawy prawne">
                                <p>
                                    Art. 6 ust. 1 lit. f RODO (uzasadniony interes – utrzymanie serwisu, bezpieczeństwo) oraz – dla kategorii
                                    opcjonalnych – art. 6 ust. 1 lit. a RODO (zgoda użytkownika).
                                </p>
                            </SectionCard>

                            <SectionCard id="zarzadzanie" n={6} title="Zarządzanie zgodą">
                                <p>
                                    Zgody możesz zmienić w banerze cookies (dół strony) lub w ustawieniach przeglądarki. Wyłączenie cookies
                                    może ograniczyć niektóre funkcje.
                                </p>
                            </SectionCard>

                            <SectionCard id="wylaczenie" n={7} title="Jak wyłączyć cookies w przeglądarce">
                                <ul>
                                    <li>Chrome: Ustawienia → Prywatność i bezpieczeństwo → Pliki cookie.</li>
                                    <li>Firefox: Ustawienia → Prywatność i bezpieczeństwo → Ciasteczka i dane stron.</li>
                                    <li>Safari: Preferencje → Prywatność → Zarządzaj danymi witryn.</li>
                                    <li>Edge: Ustawienia → Pliki cookie i uprawnienia witryn → Zarządzaj plikami cookie.</li>
                                </ul>
                            </SectionCard>

                            <SectionCard id="czas" n={8} title="Okres przechowywania">
                                <p>Cookies sesyjne – do zamknięcia przeglądarki; cookies stałe – zgodnie z czasem określonym w ustawieniach pliku.</p>
                            </SectionCard>

                            <SectionCard id="prawa" n={9} title="Prawa użytkownika">
                                <ul>
                                    <li>dostęp do danych oraz informacji o kategoriach cookies,</li>
                                    <li>wycofanie zgody w dowolnym momencie bez wpływu na legalność wcześniejszego przetwarzania,</li>
                                    <li>prawo do skargi do PUODO.</li>
                                </ul>
                            </SectionCard>

                            <SectionCard id="kontakt" n={10} title="Kontakt">
                                <p>
                                    Pytania dotyczące cookies: <a href="mailto:kontakt@bezawaryjni.pl" className="link-visible text-yellow-400 hover:text-yellow-300">kontakt@bezawaryjni.pl</a>
                                    {" "}| tel.: <a href="tel:+48784669601" className="link-visible text-yellow-400 hover:text-yellow-300">+48 784 669 601</a>.
                                </p>
                            </SectionCard>

                            <SectionCard id="zmiany" n={11} title="Zmiany dokumentu">
                                <p>Polityka może być aktualizowana; zmiany publikujemy na tej stronie.</p>
                            </SectionCard>

                            <SectionCard id="data" n={12} title="Data obowiązywania">
                                <p>Niniejsza wersja obowiązuje od 07.10.2025 r.</p>
                            </SectionCard>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}

// SectionCard moved to shared component
