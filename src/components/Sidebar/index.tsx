import { cn } from "@/lib/utils";
import { useSidebarCollapse } from "@/hooks/useSidebarCollapse";
import { CollapseButton } from "./CollapseButton";
import { Logo } from "./Logo";
import { SidebarSection } from "./sections/SidebarSection";
import { DraftsSection } from "./sections/DraftsSection";
import { LibrarySection } from "./sections/LibrarySection";
import { CollaborateSection } from "./sections/CollaborateSection";
import { SettingsSection } from "./sections/SettingsSection";

export function Sidebar() {
  const { isCollapsed, toggle } = useSidebarCollapse();

  return (
    <div className={cn(
      "fixed top-0 left-0 h-screen border-r border-border bg-card transition-all duration-300",
      isCollapsed ? "w-[4.5rem]" : "w-64"
    )}>
      <CollapseButton isCollapsed={isCollapsed} onClick={toggle} />
      
      <div className="flex h-full flex-col">
        <Logo isCollapsed={isCollapsed} />

        <nav className="flex-1 px-2 py-2 space-y-1">
          <DraftsSection isCollapsed={isCollapsed} />
          <LibrarySection isCollapsed={isCollapsed} />
          <CollaborateSection isCollapsed={isCollapsed} />
          <SettingsSection isCollapsed={isCollapsed} />
        </nav>
      </div>
    </div>
  );
}