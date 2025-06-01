import { cn } from "@/lib/utils";

interface TabContentProps {
  id: string;
  currentTab: string;
  children: React.ReactNode;
  className?: string;
}

export function TabContent({ id, currentTab, children, className }: TabContentProps) {
  if (currentTab !== id) return null;

  return (
    <div className={cn("animate-in fade-in-50 duration-300", className)}>
      {children}
    </div>
  );
}
