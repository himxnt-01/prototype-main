import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import { Upload, FolderUp, Cloud } from "lucide-react";
import { cn } from "@/lib/utils";
import { useUploadStore } from "@/lib/upload";

interface UploadZoneProps {
  onCloudImport: () => void;
}

export function UploadZone({ onCloudImport }: UploadZoneProps) {
  const { files, addFiles } = useUploadStore();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    addFiles(acceptedFiles);
  }, [addFiles]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'audio/*': ['.mp3', '.wav', '.aiff', '.m4a', '.flac']
    }
  });

  return (
    <div 
      {...getRootProps()} 
      className={cn(
        "border rounded-lg p-8",
        "flex flex-col items-center justify-center gap-4",
        "transition-all duration-300 cursor-pointer",
        isDragActive ? [
          "border-primary border-2",
          "bg-primary/5",
          "scale-[1.02]"
        ] : [
          "border-dashed",
          "hover:border-primary/50 hover:bg-background/50"
        ],
        files.length > 0 && "h-48"
      )}
    >
      <input {...getInputProps()} />

      <div className="flex flex-col items-center gap-2 text-center">
        <div className={cn(
          "h-12 w-12 rounded-full",
          "flex items-center justify-center",
          "transition-colors",
          isDragActive ? "bg-primary/20" : "bg-primary/10"
        )}>
          <Upload className={cn(
            "h-6 w-6",
            isDragActive ? "text-primary" : "text-primary/80"
          )} />
        </div>
        <div>
          <p className="font-medium">
            {isDragActive ? "Drop files here" : "Drag and drop files here"}
          </p>
          <p className="text-sm text-muted-foreground">
            or use one of the options below
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <Button 
          variant="outline" 
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            (document.querySelector('input[type="file"]') as HTMLInputElement | null)?.click();
          }}
        >
          <Upload className="h-4 w-4 mr-2" />
          Choose Files
        </Button>
        <Button variant="outline" size="sm">
          <FolderUp className="h-4 w-4 mr-2" />
          Choose Folder
        </Button>
        <Button 
          variant="outline" 
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            onCloudImport();
          }}
        >
          <Cloud className="h-4 w-4 mr-2" />
          Import from Cloud
        </Button>
      </div>
    </div>
  );
}