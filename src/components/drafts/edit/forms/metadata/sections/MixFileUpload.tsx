import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Upload, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface MixFileUploadProps {
  file: File | null;
  onChange: (file: File | null) => void;
}

export function MixFileUpload({ file, onChange }: MixFileUploadProps) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles[0]) {
      onChange(acceptedFiles[0]);
    }
  }, [onChange]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'audio/*': ['.mp3', '.wav', '.aiff', '.m4a', '.flac']
    },
    maxFiles: 1
  });

  return (
    <div className="space-y-2">
      <Label>Audio File</Label>
      
      {file ? (
        <div className="flex items-center gap-2 p-2 rounded-md border bg-muted/50">
          <div className="flex-1 truncate text-sm">
            {file.name} ({(file.size / (1024 * 1024)).toFixed(2)} MB)
          </div>
          <Button 
            type="button"
            variant="ghost" 
            size="icon"
            className="h-8 w-8"
            onClick={() => onChange(null)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <div
          {...getRootProps()}
          className={cn(
            "border-2 border-dashed rounded-md p-6",
            "flex flex-col items-center justify-center gap-2",
            "transition-colors cursor-pointer",
            isDragActive ? "border-primary/50 bg-primary/5" : "border-border"
          )}
        >
          <input {...getInputProps()} />
          <Upload className="h-8 w-8 text-muted-foreground" />
          <div className="text-center">
            <p className="font-medium">
              {isDragActive ? "Drop the file here" : "Drag and drop your audio file"}
            </p>
            <p className="text-sm text-muted-foreground">
              or click to browse
            </p>
          </div>
        </div>
      )}
    </div>
  );
}