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
  const isSpecialPage = pathname === "/register" || pathname === "/login"; // 新規登録ページやログインページをチェック

  return (
    <>
      {!isSpecialPage && <Header />}
      {children}
      {!isSpecialPage && <Footer />}
    </>
  );
}
