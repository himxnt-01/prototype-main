import { cn } from "@/lib/utils";

interface NavSectionProps {
  title: string;
  children: React.ReactNode;
  isCollapsed: boolean;
}

export function NavSection({ title, children, isCollapsed }: NavSectionProps) {
  return (
    <div className="space-y-2">
      {!isCollapsed && (
        <h2 className="px-6 text-sm font-semibold text-muted-foreground">
          {title}
        </h2>
      )}
      {children}
    </div>
  );
}