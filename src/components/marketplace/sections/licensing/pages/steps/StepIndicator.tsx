import { cn } from "@/lib/utils";

interface StepIndicatorProps {
  steps: Array<{ id: string; label: string }>;
  currentStep: string;
}

export function StepIndicator({ steps, currentStep }: StepIndicatorProps) {
  return (
    <div className="flex items-center justify-between mb-8">
      {steps.map((step, index) => (
        <div 
          key={step.id}
          className="flex items-center"
        >
          <div className="flex flex-col items-center">
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
            <div className={cn(
              "mt-2 text-xs font-medium",
              currentStep === step.id ? "text-primary" : "text-muted-foreground"
            )}>
              {step.label}
            </div>
          </div>
          {index < steps.length - 1 && (
            <div className={cn(
              "w-full h-px mx-2",
              "bg-gradient-to-r from-border/50 via-border to-border/50"
            )} />
          )}
        </div>
      ))}
    </div>
  );
}