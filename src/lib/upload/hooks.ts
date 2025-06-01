import { useEffect } from 'react';
import { useUploadStore } from './store';

export function useUploadCleanup() {
  useEffect(() => {
    const handleBeforeUnload = () => {
      const { files } = useUploadStore.getState();
      files.forEach(file => {
        if (file.status === 'uploading') {
          // In a real app, you'd cancel the upload request here
          console.log(`Cleaning up upload for ${file.name}`);
        }
      });
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, []);
}