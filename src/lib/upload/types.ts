import { UploadFile } from '@/types/upload';

export interface UploadState {
  files: UploadFile[];
  addFiles: (newFiles: File[]) => void;
  removeFile: (id: string) => void;
  updateFileProgress: (id: string, progress: number) => void;
  updateFileStatus: (id: string, status: UploadFile['status'], errorMessage?: string) => void;
  clearFiles: () => void;
}