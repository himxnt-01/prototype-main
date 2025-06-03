// src/pages/UploadPage.tsx
import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { useDropzone } from "react-dropzone";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Upload,
  FolderUp,
  Cloud,
  X,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ExternalLink
} from "lucide-react";
import { cn } from "@/lib/utils";
import { supabase } from '@/lib/supabase';
import { useLocation } from "@/hooks/useLocation";
import { useDraftsStore } from "@/lib/drafts";
import { createDummyDraft } from "@/lib/upload/utils/draft";
import { mapSupabaseTrackToLocalTrack } from "@/lib/upload/utils/track-mapper";
import { v4 as uuidv4 } from 'uuid';

// Cloudinary configuration
const CLOUDINARY_UPLOAD_URL = `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/upload`;
import { ClientSideDummyDraft } from "@/types/track";

// Define the upload file type
interface UploadFile {
  id: string;
  trackId?: string;
  file: File;
  name: string;
  size: number;
  progress: number;
  status: 'pending' | 'uploading' | 'complete' | 'error';
  errorMessage?: string;
  storagePath?: string;
  audioUrl?: string;
  clientDummyData?: ClientSideDummyDraft;
}

export function UploadPage() {
  const [files, setFiles] = useState<UploadFile[]>([]);
  const [isCloudDialogOpen, setIsCloudDialogOpen] = useState(false);
  const { navigate } = useLocation();
  const { setDrafts, drafts } = useDraftsStore();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles: UploadFile[] = acceptedFiles.map(file => {
      return {
        id: crypto.randomUUID(),
        file,
        name: file.name,
        size: file.size,
        progress: 0,
        status: 'pending'
      };
    });

    setFiles(prev => [...prev, ...newFiles]);
    newFiles.forEach(file => {
      uploadToSupabase(file);
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'audio/*': ['.mp3', '.wav', '.aiff', '.m4a', '.flac']
    }
  });

  const uploadToSupabase = async (file: UploadFile) => {
    console.log('🚀 Starting Cloudinary upload for:', file.name);
    
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    const userUid = session?.user?.id;

    if (sessionError || !userUid) {
      console.error('❌ Authentication failed');
      setFiles(prev =>
        prev.map(f =>
          f.id === file.id
            ? { ...f, status: 'error', errorMessage: 'Authentication required' }
            : f
        )
      );
      return;
    }

    setFiles(prev =>
      prev.map(f =>
        f.id === file.id
          ? { ...f, status: 'uploading' }
          : f
      )
    );

    try {
      const trackId = uuidv4();

      // Upload to Cloudinary
      console.log('☁️ Uploading to Cloudinary...');
      
      const formData = new FormData();
      formData.append('file', file.file);
      formData.append('upload_preset', 'unsigned_preset');
      formData.append('resource_type', 'auto');
      formData.append('public_id', `tracks/${userUid}/${trackId}`);

      const cloudinaryResponse = await fetch(CLOUDINARY_UPLOAD_URL, {
        method: 'POST',
        body: formData,
      });

      if (!cloudinaryResponse.ok) {
        throw new Error(`Cloudinary upload failed: ${cloudinaryResponse.statusText}`);
      }

      const cloudinaryData = await cloudinaryResponse.json();
      console.log('☁️ Cloudinary upload result:', cloudinaryData);

      const audioUrl = cloudinaryData.secure_url;
      console.log('🌐 Audio URL:', audioUrl);

      // Update progress to 50% after successful upload
      setFiles(prev =>
        prev.map(f =>
          f.id === file.id
            ? { ...f, progress: 50 }
            : f
        )
      );

      // Insert into Supabase database with proper data structure
      console.log('💾 Starting database insert...');
      
      // Create a minimal track object with only essential fields
      const trackData = {
        id: trackId,
        title: file.name.replace(/\.[^/.]+$/, ""), // Remove file extension
        artist_id: userUid,
        audio_url: audioUrl,
        is_published: false
      };

      // Try a simpler insert approach
      const { data: trackInsertData, error: trackInsertError } = await supabase
        .from('tracks')
        .insert(trackData)
        .select()
        .single();

      if (trackInsertError) {
        console.error('Database insert error:', trackInsertError);
        throw new Error(`Database error: ${trackInsertError.message}`);
      }

      console.log('✅ Database insert successful!');

      // Update local state and drafts
      if (trackInsertData) {
        const newDraft = mapSupabaseTrackToLocalTrack(trackInsertData);
        setDrafts([newDraft, ...drafts]);
        
        setFiles(prev =>
          prev.map(f =>
            f.id === file.id
              ? {
                  ...f,
                  status: 'complete',
                  progress: 100,
                  trackId: trackInsertData.id,
                  audioUrl: audioUrl
                }
              : f
          )
        );
        
        console.log('🎉 Upload complete with successful database insert!');
      }

    } catch (error) {
      console.error('💥 Upload error:', error);
      setFiles(prev =>
        prev.map(f =>
          f.id === file.id
            ? {
                ...f,
                status: 'error',
                errorMessage: error instanceof Error ? error.message : 'Upload failed'
              }
            : f
        )
      );
    }
  };

  const removeFile = async (fileId: string) => {
    const fileToRemove = files.find(f => f.id === fileId);
    if (!fileToRemove) return;

    setFiles(prev => prev.filter(f => f.id !== fileId));

    if (fileToRemove.status === 'complete' && fileToRemove.storagePath && fileToRemove.trackId) {
      try {
        const { error: storageError } = await supabase.storage
          .from('tracks')
          .remove([fileToRemove.storagePath]);

        if (storageError) {
          console.error('Error deleting file from Supabase storage:', storageError);
        }

        const { error: dbError } = await supabase
          .from('tracks')
          .delete()
          .eq('id', fileToRemove.trackId);

        if (dbError) {
          console.error('Error deleting track from database:', dbError);
        }

        setDrafts(drafts.filter(d => d.id !== fileToRemove.trackId));
      } catch (error) {
        console.error('Unexpected error during file removal:', error);
      }
    }
  };

  const clearFiles = async () => {
    const completedFiles = files.filter(f => f.status === 'complete' && f.storagePath && f.trackId);

    if (completedFiles.length > 0) {
      try {
        const { error: storageError } = await supabase.storage
          .from('tracks')
          .remove(completedFiles.map(f => f.storagePath!));

        if (storageError) {
          console.error('Error deleting files from Supabase storage:', storageError);
        }

        const { error: dbError } = await supabase
          .from('tracks')
          .delete()
          .in('id', completedFiles.map(f => f.trackId!));

        if (dbError) {
          console.error('Error deleting tracks from database:', dbError);
        }

        setDrafts(drafts.filter(d => !completedFiles.some(cf => cf.trackId === d.id)));
      } catch (error) {
        console.error('Error clearing files:', error);
      }
    }
    setFiles([]);
  };

  const testDatabaseInsert = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    const userUid = session?.user?.id;
    
    console.log('🧪 User ID for test:', userUid);
    
    const testTrack = {
      id: uuidv4(),
      title: "Test Track",
      artist_id: userUid,
      audio_url: "https://example.com/test.mp3",
      is_published: false
    };

    console.log('🧪 Testing database insert with correct structure:', testTrack);
    const { data, error } = await supabase
      .from('tracks')
      .insert([testTrack])
      .select();
      
    console.log('🧪 Test insert result:', { data, error });
    
    if (error) {
      console.error('❌ FULL ERROR DETAILS:');
      console.error('- Error message:', error.message);
      console.error('- Full error object:', error);
    }
  };

  const totalProgress = files.length
    ? files.reduce((acc, file) => acc + file.progress, 0) / files.length
    : 0;

  const completedFiles = files.filter(f => f.status === 'complete').length;
  const failedFiles = files.filter(f => f.status === 'error').length;
  const allComplete = completedFiles === files.length && files.length > 0;

  return (
    <div className="h-full flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold mb-2">Upload Tracks</h1>
        <p className="text-muted-foreground">
          Add tracks to your library by uploading files or importing from cloud storage
        </p>
        {/* 🔥 TEST BUTTON - REMOVE THIS AFTER DEBUGGING */}
        <Button onClick={testDatabaseInsert} variant="outline" className="mt-2">
          🧪 Test Database Insert (Fixed)
        </Button>
      </div>

      <div className="flex-1 flex flex-col gap-6">
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
                (document.querySelector('input[type="file"]') as HTMLInputElement)?.click();
              }}
            >
              <Upload className="h-4 w-4 mr-2" />
              Choose Files
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                const input = document.createElement('input');
                input.type = 'file';
                // @ts-ignore
                input.webkitdirectory = true;
                // @ts-ignore
                input.directory = true;
                input.multiple = true;
                input.onchange = (e) => {
                  const target = e.target as HTMLInputElement;
                  if (target.files) {
                    onDrop(Array.from(target.files));
                  }
                };
                input.click();
              }}
            >
              <FolderUp className="h-4 w-4 mr-2" />
              Choose Folder
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                setIsCloudDialogOpen(true);
              }}
            >
              <Cloud className="h-4 w-4 mr-2" />
              Import from Cloud
            </Button>
          </div>
        </div>

        {files.length > 0 && (
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

            <ScrollArea className="h-[calc(100vh-24rem)]">
              <div className="divide-y">
                {files.map(file => (
                  <div
                    key={file.id}
                    className="flex items-center gap-3 p-4 hover:bg-muted/50"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <div className="font-medium truncate">
                          {file.name}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          ({(file.size / (1024 * 1024)).toFixed(2)} MB)
                        </div>
                      </div>
                      {file.status === 'error' && (
                        <div className="text-sm text-destructive mt-1">
                          {file.errorMessage}
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      {file.status === 'uploading' && (
                        <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                      )}
                      {file.status === 'complete' && (
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                      )}
                      {file.status === 'error' && (
                        <AlertCircle className="h-4 w-4 text-destructive" />
                      )}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => removeFile(file.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        )}
      </div>

      {isCloudDialogOpen && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-card border rounded-lg p-6 max-w-md w-full">
            <h2 className="text-xl font-semibold mb-4">Import from Cloud Storage</h2>
            <div className="flex flex-col items-center gap-4 py-8">
              <Cloud className="h-12 w-12 text-muted-foreground" />
              <p className="text-center text-muted-foreground">
                Cloud storage integration is not available in this demo.
              </p>
              <Button onClick={() => setIsCloudDialogOpen(false)}>Close</Button>
            </div>
          </div>
        </div>
      )}

      {allComplete && (
        <Alert className="bg-green-500/10 border-green-500/20 text-green-500">
          <CheckCircle2 className="h-4 w-4" />
          <AlertDescription>
            All files have been successfully uploaded to your Supabase storage.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}

function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}