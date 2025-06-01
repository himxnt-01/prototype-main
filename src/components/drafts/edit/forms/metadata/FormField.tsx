import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface FormFieldProps {
  label: string;
  icon: LucideIcon;
  children: React.ReactNode;
  className?: string;
}

export function FormField({ label, icon: Icon, children, className }: FormFieldProps) {
  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex items-center gap-2">
        <Icon className="h-4 w-4 text-muted-foreground" />
        <Label>{label}</Label>
      </div>
      {children}
    </div>
  );
}