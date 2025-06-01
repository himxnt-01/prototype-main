import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface SubSectionProps {
  title: string;
  icon: LucideIcon;
  children: React.ReactNode;
  isCollapsed: boolean;
}

export function SubSection({ title, icon: Icon, children, isCollapsed }: SubSectionProps) {
  return (
    <div className="py-2">
      {!isCollapsed && (
        <div className="px-3 mb-1 flex items-center gap-2">
          <Icon className="h-4 w-4 text-muted-foreground/70 shrink-0" />
          <h3 className="text-xs font-medium text-muted-foreground/70 uppercase tracking-wider truncate">
            {title}
          </h3>
        </div>
      )}
      <div className="space-y-1">
        {children}
      </div>
    </div>
  );
}