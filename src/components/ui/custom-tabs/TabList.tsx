import { cn } from "@/lib/utils";

interface TabListProps {
  children: React.ReactNode;
  className?: string;
}

export function TabList({ children, className }: TabListProps) {
  return (
    <div className={cn(
      "flex items-center gap-1 px-4 border-b",
      className
    )}>
      {children}
    </div>
  );
}
