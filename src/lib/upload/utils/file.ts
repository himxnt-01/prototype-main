import { UploadFile } from '@/types/upload';

export function createUploadFile(file: File): UploadFile {
  return {
    ...file,
    id: crypto.randomUUID(),
    progress: 0,
    status: 'pending'
  };
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}