export function simulateUpload(
  onProgress: (progress: number) => void,
  onComplete: () => void,
  onError: (message: string) => void
) {
  let progress = 0;
  const interval = setInterval(() => {
    progress += Math.random() * 20;

    if (progress >= 100) {
      clearInterval(interval);
      progress = 100;
      onComplete();
    } else {
      onProgress(Math.min(progress, 99));
    }
  }, 500);

  // Simulate random errors (10% chance)
  if (Math.random() < 0.1) {
    clearInterval(interval);
    onError('Upload failed. Please try again.');
  }

  return () => clearInterval(interval);
}