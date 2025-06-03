import { useCallback, useState } from "react";
import { useDropzone, DropzoneRootProps, DropzoneInputProps } from "react-dropzone";

interface UseImageUploadProps {
  onImageChange?: (image: { url: string; file?: File }) => void;
  maxSize?: number;
}

interface UseImageUploadReturn {
  getRootProps: <T extends DropzoneRootProps>(props?: T) => T;
  getInputProps: <T extends DropzoneInputProps>(props?: T) => T;
  isDragActive: boolean;
  preview: string | undefined;
  error: string | undefined;
  reset: () => void;
  setPreview: (url: string) => void;
  open: () => void;
}

export function useImageUpload({
  onImageChange,
  maxSize = 5 * 1024 * 1024, // 5MB default
}: UseImageUploadProps = {}): UseImageUploadReturn {
  const [preview, setPreview] = useState<string>();
  const [error, setError] = useState<string>();

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      setError(undefined);

      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        const imageUrl = URL.createObjectURL(file);
        setPreview(imageUrl);
        onImageChange?.({ url: imageUrl, file });
      }
    },
    [onImageChange]
  );

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".gif"],
    },
    maxSize,
    maxFiles: 1,
    onDropRejected: (fileRejections) => {
      const error = fileRejections[0]?.errors[0];
      if (error?.code === "file-too-large") {
        setError(`File is too large. Max size is ${maxSize / 1024 / 1024}MB`);
      } else if (error?.code === "file-invalid-type") {
        setError("Please upload an image file");
      } else {
        setError("Error uploading file");
      }
    },
  });

  const reset = useCallback(() => {
    setPreview(undefined);
    setError(undefined);
  }, []);

  const setPreviewUrl = useCallback((url: string) => {
    setPreview(url);
  }, []);

  return {
    getRootProps,
    getInputProps,
    isDragActive,
    preview,
    error,
    reset,
    setPreview: setPreviewUrl,
    open,
  };
} 