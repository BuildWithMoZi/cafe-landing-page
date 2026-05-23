import { type ReactNode } from "react";
import { Navbar } from "@/sections/Navbar";
import { CustomCursor } from "@/components/CustomCursor";
import { ScrollProgress } from "@/components/ScrollProgress";
import { BackToTop } from "@/components/BackToTop";

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <>
      <CustomCursor />
      <ScrollProgress />
      <Navbar />
      <main>{children}</main>
      <BackToTop />
    </>
  );
}
