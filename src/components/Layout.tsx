// src/components/Layout.tsx
import { cn } from "@/lib/utils";
import { Sidebar } from "./Sidebar/index";
import { SearchBar } from "./SearchBar";
import { useSidebarCollapse } from "@/hooks/useSidebarCollapse";
import { useLocation } from "@/hooks/useLocation"; // <--- NEW: Import useLocation

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
}

export function Layout({ children, className }: LayoutProps) {
  const { isCollapsed } = useSidebarCollapse();
  const { currentPath } = useLocation(); // <--- NEW: Get the currentPath

  // <--- NEW: Determine if the current path is an authentication path
  const isAuthPage = currentPath.startsWith("/auth/");

  // If it's an auth page, render children directly without sidebar/searchbar
  if (isAuthPage) {
    return (
      <div className={cn("h-screen w-screen flex flex-col overflow-hidden bg-background", className)}>
        {children}
      </div>
    );
  }

  // For all other pages, render with sidebar and search bar
  return (
    <div className="h-screen w-screen flex overflow-hidden bg-background">
      <Sidebar /> {/* <--- Now conditionally rendered implicitly */}
      <main
        className={cn(
          "flex-1 flex flex-col min-w-0 transition-all duration-300",
          isCollapsed ? "pl-[4.5rem]" : "pl-64",
          className
        )}
      >
        <div className="h-16 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
          <div className="h-full flex items-center px-8">
            <SearchBar /> {/* <--- Now conditionally rendered implicitly */}
          </div>
        </div>
        <div className="flex-1 overflow-hidden">
          <div className="h-full px-8 py-6">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}