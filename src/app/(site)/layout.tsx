import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppLazy from "@/components/widgets/WhatsAppLazy";
import Analytics from "@/components/analytics/Analytics";

export default function SiteLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <Header />
            <main>{children}</main>
            <Footer />
            <WhatsAppLazy />
            <Analytics />
        </>
    );
}
