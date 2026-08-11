export type NavItem = {
    label: string;
    href: string;
    children?: { label: string; href: string }[];
};

export const navItems: NavItem[] = [
    { label: "Strona Główna", href: "/" },
    { label: "Usługi", href: "/#uslugi" },
    { label: "Dlaczego my", href: "/#nasza-firma" },
    { label: "FAQ", href: "/#faq" },
    { label: "Kontakt", href: "/#kontakt" },
    { label: "Polityka prywatności", href: "/polityka-prywatnosci" },
];
