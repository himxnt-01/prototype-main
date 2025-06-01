import { cn } from "@/lib/utils";

interface StepHeaderProps {
  title: string;
  description: string;
  steps: Array<{ id: string; label: string }>;
  currentStep: string;
}

export function StepHeader({ title, description, steps, currentStep }: StepHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h2 className="text-lg font-semibold">{title}</h2>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>

      <div className="flex items-center gap-2">
        {steps.map((step, index) => (
          <div 
            key={step.id}
            className="flex items-center gap-2"
          >
            <div className={cn(
              "flex items-center justify-center w-8 h-8 rounded-full",
              "text-sm font-medium transition-colors",
              currentStep === step.id ? [
                "bg-primary text-primary-foreground",
                "ring-2 ring-primary/20"
              ] : "bg-muted"
            )}>
              {index + 1}
            </div>
            {index < steps.length - 1 && (
              <div className="w-8 h-px bg-border" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}