import { Button } from "@/components/ui/button";

interface StepNavigationProps {
  onBack?: () => void;
  onNext?: () => void;
  nextLabel?: string;
  backLabel?: string;
}

export function StepNavigation({ 
  onBack, 
  onNext, 
  nextLabel = "Continue",
  backLabel = "Back"
}: StepNavigationProps) {
  return (
    <div className="flex justify-end gap-2">
      {onBack && (
        <Button variant="outline" onClick={onBack}>
          {backLabel}
        </Button>
      )}
      {onNext && (
        <Button 
          onClick={onNext}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          {nextLabel}
        </Button>
      )}
    </div>
  );
}