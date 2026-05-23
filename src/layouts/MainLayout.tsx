import { type ReactNode } from "react";
import { Navbar } from "@/sections/Navbar";
import { CustomCursor } from "@/components/CustomCursor";
import { ScrollProgress } from "@/components/ScrollProgress";
import { BackToTop } from "@/components/BackToTop";
import { useTheme } from "@/hooks/useTheme";

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const { isDark, toggle } = useTheme();

  return (
    <>
      <CustomCursor />
      <ScrollProgress />
      <Navbar isDark={isDark} onToggleTheme={toggle} />
      <main>{children}</main>
      <BackToTop />
    </>
  );
}
