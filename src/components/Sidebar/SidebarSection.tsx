import { cn } from "@/lib/utils";

interface SidebarSectionProps {
  title: string;
  children: React.ReactNode;
  isCollapsed?: boolean;
}

export function SidebarSection({ title, children, isCollapsed }: SidebarSectionProps) {
  return (
    <div>
      {!isCollapsed && (
        <h2 className="text-xl font-semibold mb-6">{title}</h2>
      )}
      <nav className="space-y-2">
        {children}
      </nav>
    </div>
  );
}