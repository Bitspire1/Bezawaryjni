import Hero from "@/components/sections/Hero";
import Offer from "@/components/sections/Offer";
import LiftsSection from "@/components/sections/LiftsSection";
import AboutUs from "@/components/sections/AboutUs";
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
            <Hero data={data} />
            <Offer data={data} />
            <LiftsSection data={data} />
            <AboutUs data={data} />
            <Suppliers data={data} />
            <Contact data={data} />
            <FAQ data={data} />
        </>
    );
}
