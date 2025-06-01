import { Progress } from "@/components/ui/progress";

interface ProjectProgressProps {
  progress: number;
}

export function ProjectProgress({ progress }: ProjectProgressProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">Progress</span>
        <span>{progress}%</span>
      </div>
      <Progress value={progress} className="h-2" />
    </div>
  );
}