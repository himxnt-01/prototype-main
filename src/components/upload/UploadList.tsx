import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { UploadItem } from "./UploadItem";
import { UploadFile } from "@/types/upload";

interface UploadListProps {
  files: UploadFile[];
  onRemoveFile: (id: string) => void;
  onClearAll: () => void;
}

export function UploadList({ files, onRemoveFile, onClearAll }: UploadListProps) {
  return (
    <div className="flex-1 border rounded-lg">
      <div className="border-b p-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-medium">Uploads</h2>
            <p className="text-sm text-muted-foreground">
              {files.length} file{files.length !== 1 ? "s" : ""}
            </p>
          </div>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={onClearAll}
          >
            <X className="h-4 w-4 mr-2" />
            Clear All
          </Button>
        </div>
        <Progress 
          value={60} 
          className="mt-4"
        />
      </div>
      <ScrollArea className="h-[calc(100%-5rem)]">
        <div className="p-4 space-y-2">
          {files.map(file => (
            <UploadItem
              key={file.id}
              file={file}
              onRemove={() => onRemoveFile(file.id)}
            />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}