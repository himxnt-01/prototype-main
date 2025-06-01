import { create } from 'zustand';
import { UploadFile } from '@/types/upload';

interface UploadState {
  files: UploadFile[];
  addFiles: (newFiles: File[]) => void;
  removeFile: (id: string) => void;
  updateFileProgress: (id: string, progress: number) => void;
  updateFileStatus: (id: string, status: UploadFile['status'], errorMessage?: string) => void;
  clearFiles: () => void;
}

export const useUploadStore = create<UploadState>((set, get) => ({
  files: [],

  addFiles: (newFiles) => {
    const uploadFiles = newFiles.map(file => ({
      ...file,
      id: crypto.randomUUID(),
      progress: 0,
      status: 'pending' as const
    }));

    set((state) => ({ 
      files: [...state.files, ...uploadFiles] 
    }));

    // Simulate file upload for each file
    uploadFiles.forEach(file => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.random() * 20;

        if (progress >= 100) {
          clearInterval(interval);
          progress = 100;
          get().updateFileStatus(file.id, 'complete');
        } else {
          get().updateFileProgress(file.id, Math.min(progress, 99));
        }
      }, 500);

      // Simulate random errors (10% chance)
      if (Math.random() < 0.1) {
        clearInterval(interval);
        get().updateFileStatus(file.id, 'error', 'Upload failed. Please try again.');
      }
    });
  },

  removeFile: (id) => set((state) => ({
    files: state.files.filter(file => file.id !== id)
  })),

  updateFileProgress: (id, progress) => set((state) => ({
    files: state.files.map(file =>
      file.id === id 
        ? { ...file, progress, status: 'uploading' }
        : file
    )
  })),

  updateFileStatus: (id, status, errorMessage) => set((state) => ({
    files: state.files.map(file =>
      file.id === id
        ? { 
            ...file, 
            status,
            errorMessage,
            progress: status === 'complete' ? 100 : file.progress
          }
        : file
    )
  })),

  clearFiles: () => set({ files: [] })
}));