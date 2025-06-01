import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface UploadItemProps {
  file: {
    id: string;
    name: string;
    size: number;
    progress: number;
    status: "pending" | "uploading" | "complete" | "error";
    errorMessage?: string;
  };
  onRemove: () => void;
}

export function UploadItem({ file, onRemove }: UploadItemProps) {
  return (
    <div className="flex items-center gap-4 p-3 rounded-md bg-card-gradient">
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1">
          <div className="font-medium truncate">{file.name}</div>
          <Button 
            variant="ghost" 
            size="icon"
            className="h-8 w-8"
            onClick={onRemove}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        <div className="space-y-1">
          <div className="text-sm text-muted-foreground">
            {(file.size / 1024 / 1024).toFixed(2)} MB
          </div>
          <Progress value={file.progress} />
        </div>
      </div>
    </div>
  );
}