import { policyHref } from "@/lib/paths";
const suffix = process.env.NODE_ENV === "production" ? ".html" : "";

export const metadata = {
    title: "Polityka prywatności – Bezawaryjni AutoSerwis (RODO)",
    description:
        "Polityka prywatności RODO dla Bezawaryjni AutoSerwis: administrator danych, cele i podstawy przetwarzania, odbiorcy danych, okresy retencji oraz prawa użytkownika.",
    keywords: [
        "polityka prywatności",
        "RODO",
        "bezawaryjni",
        "autoserwis",
        "dane osobowe",
        "administrator danych",
        "prawa użytkownika",
    ],
    alternates: { canonical: `/polityka-prywatnosci${suffix}` },
    robots: { index: true, follow: true },
    openGraph: {
        title: "Polityka prywatności – Bezawaryjni AutoSerwis",
        description:
            "Poznaj zasady przetwarzania danych osobowych w Bezawaryjni AutoSerwis (RODO): cele, podstawy prawne, retencja i prawa użytkownika.",
        url: `/polityka-prywatnosci${suffix}`,
        type: "article",
    },
    twitter: {
        card: "summary",
        title: "Polityka prywatności – Bezawaryjni AutoSerwis",
        description:
            "RODO w Bezawaryjni AutoSerwis: administrator danych, zakres i cele przetwarzania, odbiorcy, retencja, prawa użytkownika.",
    },
} as const;

import SectionCard from "@/components/ui/SectionCard";

export default function PrivacyPolicyPage() {
    return (
        <main className="min-h-screen bg-black text-white">
            <section className="py-12 sm:py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl sm:text-4xl font-bold wrap-balance text-yellow-400">Polityka prywatności (RODO)</h1>
                    <p className="mt-2 text-white/70 text-sm">Ostatnia aktualizacja: 07.10.2025</p>

                    {/* JSON-LD: WebPage + Breadcrumbs */}
                    <script
                        type="application/ld+json"
                        dangerouslySetInnerHTML={{
                            __html: JSON.stringify({
                                "@context": "https://schema.org",
                                "@type": "WebPage",
                                name: "Polityka prywatności – Bezawaryjni AutoSerwis",
                                url: `/polityka-prywatnosci${suffix}`,
                                breadcrumb: {
                                    "@type": "BreadcrumbList",
                                    itemListElement: [
                                        { "@type": "ListItem", position: 1, name: "Strona główna", item: "/" },
                                        { "@type": "ListItem", position: 2, name: "Polityka prywatności", item: `/polityka-prywatnosci${suffix}` },
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
                                        <li><a className="hover:text-yellow-400" href="#wstep">Informacje ogólne</a></li>
                                        <li><a className="hover:text-yellow-400" href="#administrator">Administrator danych</a></li>
                                        <li><a className="hover:text-yellow-400" href="#zakres">Zakres zbieranych danych</a></li>
                                        <li><a className="hover:text-yellow-400" href="#zrodla">Źródła danych</a></li>
                                        <li><a className="hover:text-yellow-400" href="#podstawy">Cele i podstawy prawne przetwarzania</a></li>
                                        <li><a className="hover:text-yellow-400" href="#cookies">Pliki cookies i technologie śledzące</a></li>
                                        <li><a className="hover:text-yellow-400" href="#narzedzia">Narzędzia zewnętrzne i marketing</a></li>
                                        <li><a className="hover:text-yellow-400" href="#retencja">Okres przechowywania danych</a></li>
                                        <li><a className="hover:text-yellow-400" href="#prawa">Prawa użytkownika</a></li>
                                        <li><a className="hover:text-yellow-400" href="#odbiorcy">Odbiorcy danych</a></li>
                                        <li><a className="hover:text-yellow-400" href="#transfer">Transfer poza EOG</a></li>
                                        <li><a className="hover:text-yellow-400" href="#zabezpieczenia">Zabezpieczenia</a></li>
                                        <li><a className="hover:text-yellow-400" href="#profilowanie">Zautomatyzowane decyzje / profilowanie</a></li>
                                        <li><a className="hover:text-yellow-400" href="#zmiany">Zmiany Polityki</a></li>
                                        <li><a className="hover:text-yellow-400" href="#kontakt">Kontakt</a></li>
                                        <li><a className="hover:text-yellow-400" href="#data">Data obowiązywania</a></li>
                                    </ol>
                                </nav>
                            </div>
                        </aside>

                        {/* Content */}
                        <div className="lg:col-span-8 space-y-5">
                            <SectionCard id="wstep" n={1} title="Informacje ogólne">
                                <p>
                                    Niniejsza Polityka prywatności wyjaśnia zasady przetwarzania danych osobowych i
                                    używania plików cookies w serwisie Bezawaryjni AutoSerwis. Celem dokumentu jest
                                    przejrzystość zgodna z RODO / GDPR oraz informacja o przysługujących prawach.
                                </p>
                            </SectionCard>

                            <SectionCard id="administrator" n={2} title="Administrator danych">
                                <p>
                                    Administratorem danych osobowych jest Bezawaryjni AutoSerwis (dalej: „My”).
                                    Dane kontaktowe znajdziesz w sekcji Kontakt na stronie głównej.
                                </p>
                            </SectionCard>

                            <SectionCard id="zakres" n={3} title="Zakres zbieranych danych">
                                <ul>
                                    <li>dane identyfikacyjne podane w formularzach (imię i nazwisko, e‑mail, telefon),</li>
                                    <li>dane dotyczące usług (np. marka/model pojazdu, opis usterki),</li>
                                    <li>dane techniczne i meta‑dane (adres IP, typ przeglądarki, przybliżona lokalizacja),</li>
                                    <li>dane analityczne agregowane (statystyki odwiedzin, źródła ruchu).</li>
                                </ul>
                            </SectionCard>

                            <SectionCard id="zrodla" n={4} title="Źródła danych">
                                <ul>
                                    <li>bezpośrednio od Ciebie (formularze, korespondencja, kontakt telefoniczny),</li>
                                    <li>z urządzenia i przeglądarki (logi serwera, dane techniczne),</li>
                                    <li>z narzędzi analitycznych (statystyki anonimowe).</li>
                                </ul>
                            </SectionCard>

                            <SectionCard id="podstawy" n={5} title="Cele i podstawy prawne przetwarzania">
                                <p>
                                    Przetwarzamy dane w oparciu o art. 6 ust. 1 lit. b, c i f RODO w następujących celach:
                                </p>
                                <ul>
                                    <li><strong>Obsługa zapytań i umawianie wizyt</strong> – niezbędne do podjęcia działań przed zawarciem umowy (lit. b),</li>
                                    <li><strong>Realizacja usług i rozliczenia</strong> – wykonanie umowy oraz obowiązki rachunkowe (lit. b i c),</li>
                                    <li><strong>Bezpieczeństwo i zapobieganie nadużyciom</strong> – nasz prawnie uzasadniony interes (lit. f),</li>
                                    <li><strong>Analiza i ulepszanie serwisu</strong> – uzasadniony interes, dane zanonimizowane (lit. f).</li>
                                </ul>
                            </SectionCard>

                            <SectionCard id="cookies" n={6} title="Pliki cookies i technologie śledzące">
                                <p>
                                    Szczegóły opisujemy w <a href={policyHref("cookies")} className="link-visible text-yellow-400 hover:text-yellow-300">Polityce cookies</a>.
                                    Cookies pozwalają m.in. utrzymać sesję i zapamiętać preferencje użytkownika.
                                </p>
                            </SectionCard>

                            <SectionCard id="narzedzia" n={7} title="Narzędzia zewnętrzne i marketing">
                                <p>
                                    Możemy korzystać z narzędzi analitycznych (np. statystyki odwiedzin) – wyłącznie po wyrażeniu zgody
                                    w banerze cookies. Dane są agregowane i służą do optymalizacji serwisu.
                                </p>
                            </SectionCard>

                            <SectionCard id="retencja" n={8} title="Okres przechowywania danych">
                                <p>Przechowujemy dane tak długo, jak wymagają tego przepisy lub cele przetwarzania.</p>
                            </SectionCard>

                            <SectionCard id="prawa" n={9} title="Prawa użytkownika">
                                <ul>
                                    <li>dostęp do danych,</li>
                                    <li>sprostowanie, usunięcie, ograniczenie przetwarzania,</li>
                                    <li>sprzeciw oraz przenoszenie danych,</li>
                                    <li>skarga do PUODO.</li>
                                </ul>
                            </SectionCard>

                            <SectionCard id="odbiorcy" n={10} title="Odbiorcy danych">
                                <p>Podmioty przetwarzające dane w naszym imieniu (np. dostawcy hostingu, poczty).</p>
                            </SectionCard>

                            <SectionCard id="transfer" n={11} title="Transfer poza EOG">
                                <p>
                                    Co do zasady dane nie są przekazywane poza Europejski Obszar Gospodarczy. Jeżeli byłoby to konieczne,
                                    stosujemy odpowiednie zabezpieczenia prawne (np. standardowe klauzule umowne UE).
                                </p>
                            </SectionCard>

                            <SectionCard id="zabezpieczenia" n={12} title="Zabezpieczenia">
                                <p>
                                    Stosujemy środki organizacyjne i techniczne adekwatne do ryzyk, m.in. kontrolę dostępu,
                                    szyfrowanie transmisji (HTTPS) oraz kopie zapasowe.
                                </p>
                            </SectionCard>

                            <SectionCard id="profilowanie" n={13} title="Zautomatyzowane decyzje / profilowanie">
                                <p>Nie prowadzimy zautomatyzowanego podejmowania decyzji ani profilowania skutkującego efektami prawnymi.</p>
                            </SectionCard>

                            <SectionCard id="zmiany" n={14} title="Zmiany Polityki">
                                <p>Polityka może być aktualizowana. Zmiany publikujemy na tej stronie wraz z datą aktualizacji.</p>
                            </SectionCard>

                            <SectionCard id="kontakt" n={15} title="Kontakt">
                                <p>
                                    W sprawach dotyczących prywatności napisz do nas: {" "}
                                    <a href="mailto:kontakt@bezawaryjni.pl" className="link-visible text-yellow-400 hover:text-yellow-300">kontakt@bezawaryjni.pl</a>
                                    {" "}lub zadzwoń: {" "}
                                    <a href="tel:+48784669601" className="link-visible text-yellow-400 hover:text-yellow-300">+48 784 669 601</a>.
                                </p>
                            </SectionCard>

                            <SectionCard id="data" n={16} title="Data obowiązywania">
                                <p>Niniejsza wersja Polityki obowiązuje od 07.10.2025 r.</p>
                            </SectionCard>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}

// SectionCard moved to shared component
