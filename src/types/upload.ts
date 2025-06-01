export interface UploadFile extends File {
  id: string;
  progress: number;
  status: "pending" | "uploading" | "complete" | "error";
  errorMessage?: string;
}