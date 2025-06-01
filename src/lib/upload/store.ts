import { create } from 'zustand';
import { UploadState } from './types';
import { createUploadFile, createDummyDraft, simulateUpload } from './utils';
import { useDraftsStore } from '@/lib/drafts';

export const useUploadStore = create<UploadState>((set, get) => ({
  files: [],

  addFiles: (newFiles) => {
    const uploadFiles = newFiles.map(createUploadFile);

    set((state) => ({ 
      files: [...state.files, ...uploadFiles] 
    }));

    // Start upload simulation for each file
    uploadFiles.forEach(file => {
      simulateUpload(
        (progress) => get().updateFileProgress(file.id, progress),
        () => {
          get().updateFileStatus(file.id, 'complete');
          
          // Create a dummy draft when upload completes
          const draft = createDummyDraft(file);
          useDraftsStore.getState().setDrafts([
            ...useDraftsStore.getState().drafts,
            draft
          ]);
        },
        (message) => get().updateFileStatus(file.id, 'error', message)
      );
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