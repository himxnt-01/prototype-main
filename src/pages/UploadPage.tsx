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
import { useNavigate } from "react-router-dom";
import { useDraftsStore } from "@/lib/drafts";
import { mapSupabaseTrackToDraft } from "@/lib/upload/utils/track-mapper";
import { v4 as uuidv4 } from 'uuid';

// Cloudinary configuration
const CLOUDINARY_UPLOAD_URL = `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/upload`;

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
  audioUrl?: string;
}

export function UploadPage() {
  const [files, setFiles] = useState<UploadFile[]>([]);
  const navigate = useNavigate();
  const addDraft = useDraftsStore((state) => state.addDraft);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles: UploadFile[] = acceptedFiles.map(file => ({
      id: crypto.randomUUID(),
      file,
      name: file.name,
      size: file.size,
      progress: 0,
      status: 'pending'
    }));

    setFiles(prev => [...prev, ...newFiles]);
    newFiles.forEach(file => {
      uploadTrack(file);
    });
  }, [addDraft]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'audio/*': ['.mp3', '.wav', '.aiff', '.m4a', '.flac']
    }
  });

  const uploadTrack = async (file: UploadFile) => {
    console.log(`[Upload] Starting upload for: ${file.name}`);
    
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    const userUid = session?.user?.id;

    if (sessionError || !userUid) {
      console.error('[Upload] Authentication error.');
      setFiles(prev =>
        prev.map(f =>
          f.id === file.id
            ? { ...f, status: 'error', errorMessage: 'Authentication required to upload.' }
            : f
        )
      );
      return;
    }

    setFiles(prev =>
      prev.map(f =>
        f.id === file.id ? { ...f, status: 'uploading' } : f
      )
    );

    try {
      const trackId = uuidv4();
      const publicId = `tracks/${userUid}/${trackId}`;

      // 1. Upload to Cloudinary
      console.log(`[Upload] Uploading to Cloudinary with public_id: ${publicId}`);
      const formData = new FormData();
      formData.append('file', file.file);
      formData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || 'unsigned_preset');
      formData.append('resource_type', 'auto');
      formData.append('public_id', publicId);

      const cloudinaryResponse = await fetch(CLOUDINARY_UPLOAD_URL, {
        method: 'POST',
        body: formData,
      });

      if (!cloudinaryResponse.ok) {
        const errorText = await cloudinaryResponse.text();
        throw new Error(`Cloudinary upload failed: ${errorText}`);
      }

      const cloudinaryData = await cloudinaryResponse.json();
      const audioUrl = cloudinaryData.secure_url;
      console.log(`[Upload] Cloudinary success. Audio URL: ${audioUrl}`);

      setFiles(prev =>
        prev.map(f => (f.id === file.id ? { ...f, progress: 50 } : f))
      );

      // 2. Insert into Supabase 'tracks' table
      console.log('[Upload] Inserting record into Supabase...');
      const trackData = {
        id: trackId,
        title: file.name.replace(/\.[^/.]+$/, ""), // Remove file extension
        user_id: userUid,
        audio_url: audioUrl,
        is_published: false,
      };

      const { data: trackInsertData, error: trackInsertError } = await supabase
        .from('tracks')
        .insert(trackData)
        .select()
        .single();

      if (trackInsertError) {
        throw new Error(`Database insert error: ${trackInsertError.message}`);
      }

      console.log('[Upload] Supabase insert successful.');

      // 3. Update local state
      if (trackInsertData) {
        const newDraft = mapSupabaseTrackToDraft(trackInsertData);
        addDraft(newDraft);
        
        setFiles(prev =>
          prev.map(f =>
            f.id === file.id
              ? {
                  ...f,
                  status: 'complete',
                  progress: 100,
                  trackId: trackInsertData.id,
                  audioUrl: audioUrl,
                }
              : f
          )
        );
        
        console.log(`[Upload] Process complete for ${file.name}`);
      } else {
        throw new Error('Database insert succeeded but no data was returned.');
      }

    } catch (error: any) {
      console.error(`[Upload] Failed for ${file.name}:`, error);
      setFiles(prev =>
        prev.map(f =>
          f.id === file.id
            ? {
                ...f,
                status: 'error',
                errorMessage: error.message || 'An unknown error occurred.',
              }
            : f
        )
      );
    }
  };

  const removeFile = (fileId: string) => {
    setFiles(prev => prev.filter(f => f.id !== fileId));
    // Note: This does not delete from storage or database.
  };

  const clearFiles = () => {
    setFiles([]);
    // Note: This does not delete from storage or database.
  };

  const handleNavigateToDrafts = () => {
    // Navigate to drafts page if at least one upload is complete
    if (files.some(f => f.status === 'complete')) {
      navigate('/drafts');
    }
  };
  
  const allDone = files.length > 0 && files.every(f => f.status === 'complete' || f.status === 'error');
  const totalProgress = files.length > 0 ? files.reduce((acc, f) => acc + f.progress, 0) / files.length : 0;

  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Upload Tracks</h1>
          <p className="text-muted-foreground">Drag and drop your audio files or click to select them.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => navigate('/drafts')}>Cancel</Button>
          <Button onClick={handleNavigateToDrafts} disabled={!allDone}>
            Go to Drafts
          </Button>
        </div>
      </div>

      <div
        {...getRootProps()}
        className={cn(
          "group relative border-2 border-dashed rounded-xl p-8 text-center transition-all",
          "hover:border-primary/50 hover:bg-muted/50 cursor-pointer",
          isDragActive && "border-primary bg-muted"
        )}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center justify-center space-y-4 text-muted-foreground">
          <FolderUp className="w-16 h-16" />
          <p className="text-lg">
            {isDragActive ? "Drop the files here ..." : "Drag 'n' drop some files here, or click to select files"}
          </p>
          <p className="text-sm">.MP3, .WAV, .AIFF, .M4A, .FLAC</p>
        </div>
      </div>

      {files.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Upload Queue</h2>
            {files.length > 1 && (
               <Button variant="ghost" size="sm" onClick={clearFiles}>Clear All</Button>
            )}
          </div>
          <div className="space-y-2">
            {!allDone && (
              <div className="flex items-center gap-4 p-4 rounded-lg bg-card border">
                <div className="relative">
                  <Loader2 className="w-8 h-8 animate-spin text-primary" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">Uploading {files.length} file(s)...</p>
                  <Progress value={totalProgress} className="mt-2" />
                </div>
              </div>
            )}
            {allDone && (
               <Alert variant="default" className="bg-green-50 border-green-200 text-green-800 dark:bg-green-900/20 dark:border-green-500/30 dark:text-green-200">
                  <CheckCircle2 className="h-4 w-4" />
                  <AlertDescription>
                    All files processed. You can now navigate to your drafts to add more details.
                  </AlertDescription>
              </Alert>
            )}
          </div>
          
          <ScrollArea className="h-64 border rounded-md">
            <div className="p-4 space-y-4">
              {files.map(file => (
                <FileProgressItem
                  key={file.id}
                  file={file}
                  onRemove={() => removeFile(file.id)}
                />
              ))}
            </div>
          </ScrollArea>
        </div>
      )}
    </div>
  );
}

function FileProgressItem({ file, onRemove }: { file: UploadFile, onRemove: () => void }) {
  const getStatusIcon = () => {
    switch (file.status) {
      case 'uploading':
        return <Loader2 className="w-5 h-5 animate-spin text-blue-500" />;
      case 'complete':
        return <CheckCircle2 className="w-5 h-5 text-green-500" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-destructive" />;
      default:
        return <Cloud className="w-5 h-5 text-muted-foreground" />;
    }
  };

  return (
    <div className="flex items-center gap-4 p-3 rounded-lg bg-background hover:bg-muted/50 transition-colors">
      <div className="flex-shrink-0">
        {getStatusIcon()}
      </div>
      <div className="flex-1 min-w-0">
        <p className="truncate font-medium">{file.name}</p>
        <p className="text-sm text-muted-foreground">
          {formatFileSize(file.size)}
        </p>
      </div>
      <div className="w-1/3">
        {file.status === 'uploading' || file.status === 'complete' ? (
          <Progress value={file.progress} className="h-2" />
        ) : file.status === 'error' ? (
          <p className="text-xs text-destructive truncate" title={file.errorMessage}>
            {file.errorMessage}
          </p>
        ) : null}
      </div>
      <Button variant="ghost" size="icon" className="w-8 h-8" onClick={onRemove}>
        <X className="w-4 h-4" />
      </Button>
    </div>
  );
}

function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}