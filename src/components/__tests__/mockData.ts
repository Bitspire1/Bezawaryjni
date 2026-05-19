export const mockHomeData = {
    title: "Strona główna",
    hero: {
        tagline: "CAR SERVICE",
        heading: "bezawaryjni.com",
        description: "Skorzystaj z usług naszego serwisu.",
        ctaPrimary: { text: "Umów wizytę", url: "https://example.com" },
        ctaSecondary: { text: "Nasza firma", url: "#nasza-firma" },
    },
    services: {
        heading: "Nasze usługi",
        items: [
            {
                title: "Diagnostyka",
                image: "/offer/diagnostyka.svg",
                alt: "Diagnostyka",
                description: "Opis diagnostyki",
            },
        ],
    },
    lifts: {
        badge: "NOWOŚĆ",
        heading: "Dwa nowe podnośniki",
        description: "Opis podnośników",
    },
    aboutUs: {
        heading: "Nasza firma",
        description: "Opis firmy",
        descriptionSecondary: "Dodatkowy opis",
        stats: [
            { value: 2020, label: "rok założenia" },
            { value: 390, label: "napraw rocznie" },
        ],
        benefits: [{ text: "Darmowa wycena" }, { text: "Szybkie terminy" }],
    },
    suppliers: {
        heading: "Dostawcy",
        description: "Opis dostawców",
        logos: [{ name: "Inter Cars", image: "/logo/logo-intercars.svg", alt: "Inter Cars" }],
    },
    contact: {
        heading: "Skontaktuj się",
        description: "Opis kontaktu",
        phone: "+48 784 669 601",
        email: "kontakt@bezawaryjni.pl",
    },
    faq: {
        heading: "FAQ",
        items: [
            {
                question: "Czy mogę wynająć stanowisko?",
                answer: "Tak.",
                icon: "clock" as const,
            },
        ],
    },
};

export const mockPrivacyData = {
    title: "Polityka prywatności",
    metaTitle: "Polityka – Bezawaryjni",
    metaDescription: "Opis meta",
    lastUpdate: "07.10.2025",
    heading: "Polityka prywatności (RODO)",
    tableOfContents: [{ label: "Informacje ogólne", href: "#wstep" }],
    policySections: [
        {
            id: "wstep",
            n: 1,
            title: "Informacje ogólne",
            content: "Treść sekcji",
        },
    ],
};
