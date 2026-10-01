import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function PreviewLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <Header isPreview />
            <main>{children}</main>
            <Footer isPreview />
        </>
    );
}
