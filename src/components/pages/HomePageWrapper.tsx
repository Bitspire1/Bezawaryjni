import Hero from "@/components/Found/Hero";
import Offer from "@/components/Found/Offer";
import Suppliers from "@/components/Found/Suppliers";
import Contact from "@/components/Found/Contact";
import FAQ from "@/components/Found/FAQ";

interface HomePageData {
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
            icon: "clock" | "wrench" | "cart" | "calendar" | "shield" | "payment" | "bag" | "support";
        }>;
    };
}

interface HomePageWrapperProps {
    data: HomePageData;
}

export default function HomePageWrapper({ data }: HomePageWrapperProps) {
    return (
        <>
            <Hero data={{ hero: data.hero }} />
            <Offer data={{ services: data.services }} />
            <Suppliers data={{ suppliers: data.suppliers }} />
            <Contact data={{ contact: data.contact }} />
            <FAQ data={{ faq: data.faq }} />
        </>
    );
}
