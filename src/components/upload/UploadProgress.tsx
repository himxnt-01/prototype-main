import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { X, AlertCircle, CheckCircle2, Loader2, Upload, ExternalLink } from "lucide-react";
import { useUploadStore } from "@/lib/upload";
import { useLocation } from "@/hooks/useLocation";
import { cn } from "@/lib/utils";
import { formatFileSize } from "@/lib/upload/utils/file";

export function UploadProgress() {
  const { files, removeFile, clearFiles } = useUploadStore();
  const { navigate } = useLocation();
  
  if (files.length === 0) return null;

  const totalProgress = files.reduce((acc, file) => acc + file.progress, 0) / files.length;
  const completedFiles = files.filter(f => f.status === 'complete').length;
  const failedFiles = files.filter(f => f.status === 'error').length;
  const allComplete = completedFiles === files.length;

  return (
    <div className="flex-1 border rounded-lg overflow-hidden">
      <div className="border-b p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Upload className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h2 className="font-medium">Uploading {files.length} files</h2>
              <p className="text-sm text-muted-foreground">
                {completedFiles} complete
                {failedFiles > 0 && `, ${failedFiles} failed`}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {allComplete && (
              <Button 
                size="sm"
                onClick={() => navigate("/drafts")}
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                View in Drafts
              </Button>
            )}
            <Button 
              variant="ghost" 
              size="sm"
              onClick={clearFiles}
            >
              <X className="h-4 w-4 mr-2" />
              Clear All
            </Button>
          </div>
        </div>
        <Progress 
          value={totalProgress} 
          className={cn(
            "mt-4 h-2",
            allComplete && "bg-green-500/20"
          )}
        />
      </div>

      <ScrollArea className="h-[calc(100%-5rem)]">
        <div className="p-4 space-y-2">
          {files.map(file => (
            <div 
              key={file.id}
              className={cn(
                "flex items-center gap-4 p-3 rounded-lg border",
                "hover:bg-card/50"
              )}
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="font-medium truncate">{file.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {formatFileSize(file.size)}
                    </div>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="h-8 w-8 shrink-0"
                    onClick={() => removeFile(file.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex-1">
                    <Progress 
                      value={file.progress} 
                      className={cn(
                        "h-1.5",
                        file.status === 'error' && "bg-destructive/20",
                        file.status === 'complete' && "bg-green-500/20"
                      )}
                    />
                  </div>
                  
                  <div className="flex items-center gap-2 shrink-0">
                    {file.status === 'uploading' && (
                      <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                        <span>{Math.round(file.progress)}%</span>
                      </div>
                    )}
                    {file.status === 'complete' && (
                      <div className="flex items-center gap-1.5 text-sm text-green-500">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        <span>Complete</span>
                      </div>
                    )}
                    {file.status === 'error' && (
                      <div className="flex items-center gap-1.5 text-sm text-destructive">
                        <AlertCircle className="h-3.5 w-3.5" />
                        <span>{file.errorMessage}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}