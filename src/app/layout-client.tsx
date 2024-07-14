"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function ClientLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const isSpecialPage = pathname.startsWith("/certification");
    
    return (
        <>
            {!isSpecialPage && <Header />}
            {children}
            {!isSpecialPage && <Footer />}
        </>
    );
}
