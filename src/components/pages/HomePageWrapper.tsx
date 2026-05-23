import Hero from "@/components/sections/Hero";
import Offer from "@/components/sections/Offer";
import LiftsSection from "@/components/sections/LiftsSection";
import AboutUs from "@/components/sections/AboutUs";
import WhyUsSection from "@/components/sections/WhyUsSection";
import Suppliers from "@/components/sections/Suppliers";
import Contact from "@/components/sections/Contact";
import FAQ from "@/components/sections/FAQ";

interface HomePageData {
    [key: string]: unknown;
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
    services: {
        heading: string;
        items: Array<{
            title: string;
            image: string;
            alt: string;
            description: string;
        }>;
    };
    lifts: {
        badge: string;
        heading: string;
        description: string;
    };
    aboutUs: {
        heading: string;
        description: string;
        descriptionSecondary: string;
        stats: Array<{
            value: number;
            label: string;
        }>;
        benefits: Array<{
            text: string;
        }>;
    };
    suppliers: {
        heading: string;
        description: string;
        logos: Array<{
            name: string;
            image: string;
            alt: string;
        }>;
    };
    contact: {
        heading: string;
        description: string;
        phone: string;
        email: string;
    };
    faq: {
        heading: string;
        items: Array<{
            question: string;
            answer: string;
            icon:
                | "clock"
                | "wrench"
                | "cart"
                | "calendar"
                | "shield"
                | "payment"
                | "bag"
                | "support";
        }>;
    };
}

interface HomePageWrapperProps {
    data: HomePageData;
}

const localBusinessJsonLd = {
    "@context": "https://schema.org",
    "@type": "AutoRepair",
    name: "bezawaryjni.com – Serwis Samochodowy & Warsztat Mechaniczny Słupsk",
    url: "https://bezawaryjni.pl",
    logo: "https://bezawaryjni.pl/favicon.svg",
    image: "https://bezawaryjni.pl/images/og-image.png",
    description:
        "Serwis mechaniczny i warsztat samoobsługowy w Kobylnicy koło Słupska. Diagnostyka komputerowa, mechanika pojazdowa, serwis zawieszenia i układu hamulcowego.",
    telephone: "+48784669601",
    email: "kontakt@bezawaryjni.pl",
    address: {
        "@type": "PostalAddress",
        streetAddress: "Szczecińska 1A",
        addressLocality: "Kobylnica",
        postalCode: "76-251",
        addressCountry: "PL",
    },
    geo: {
        "@type": "GeoCoordinates",
        latitude: 54.453815228948436,
        longitude: 16.980683571041087,
    },
    hasMap: "https://maps.google.com/?q=54.453815228948436,16.980683571041087",
    openingHoursSpecification: [
        {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            opens: "09:00",
            closes: "17:00",
        },
    ],
    priceRange: "$$",
    currenciesAccepted: "PLN",
    paymentAccepted: "Cash, Credit Card",
    areaServed: [
        { "@type": "City", name: "Słupsk" },
        { "@type": "City", name: "Kobylnica" },
    ],
    sameAs: ["https://bezawaryjni.pl"],
};

export default function HomePageWrapper({ data }: HomePageWrapperProps) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
            />
            <Hero data={data} />
            <Offer data={data} />
            <LiftsSection data={data} />
            <AboutUs data={data} />
            <WhyUsSection data={data} />
            <Suppliers data={data} />
            <Contact data={data} />
            <FAQ data={data} />
        </>
    );
}
