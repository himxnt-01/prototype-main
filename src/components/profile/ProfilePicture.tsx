import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Camera, X, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProfilePictureProps {
  currentImageUrl?: string;
  name?: string;
  email?: string;
  onImageChange?: (file: File | null) => void;
}

export function ProfilePicture({ 
  currentImageUrl, 
  name = 'User Name',
  email = 'user@example.com',
  onImageChange 
}: ProfilePictureProps) {
  useEffect(() => {
    console.log('ProfilePicture component mounted');
    console.log('Props:', { currentImageUrl, name, email });
  }, [currentImageUrl, name, email]);

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
  const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setError(null);

    if (!file) return;

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      setError('File size must be less than 5MB');
      return;
    }

    // Validate file type
    if (!ALLOWED_TYPES.includes(file.type)) {
      setError('Only JPG, PNG and WebP images are allowed');
      return;
    }

    // Create preview URL
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string);
      setIsEditing(true);
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    // Notify parent component
    const file = fileInputRef.current?.files?.[0];
    if (file) {
      onImageChange?.(file);
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setPreviewUrl(null);
    setIsEditing(false);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const getFileSize = () => {
    const file = fileInputRef.current?.files?.[0];
    if (!file) return null;
    
    const size = file.size / 1024 / 1024; // Convert to MB
    return size.toFixed(1) + ' MB';
  };

  return (
    <div className="flex flex-col items-center space-y-4 p-4 border-[3px] border-red-500 bg-yellow-100 rounded-lg">
      <div className="relative w-[120px] h-[120px]">
        <Avatar className="w-[120px] h-[120px] border-4 border-red-500">
          <AvatarImage
            src={previewUrl || currentImageUrl}
            alt="Profile picture"
            className="object-cover"
          />
          <AvatarFallback className="bg-yellow-200 text-4xl">
            {name.split(' ').map(n => n[0]).join('').toUpperCase()}
          </AvatarFallback>
        </Avatar>
        
        {/* Upload overlay button */}
        {!isEditing && (
          <button
            onClick={triggerFileInput}
            className={cn(
              "absolute bottom-0 right-0 p-2 rounded-full",
              "bg-primary hover:bg-primary/90 transition-colors",
              "text-primary-foreground shadow-sm"
            )}
          >
            <Camera className="w-5 h-5" />
          </button>
        )}

        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={handleFileSelect}
          className="hidden"
        />
      </div>

      {/* User info */}
      <div className="text-center">
        <h3 className="font-medium text-lg">{name}</h3>
        <p className="text-sm text-muted-foreground">{email}</p>
      </div>

      {/* Preview actions */}
      {isEditing && (
        <div className="flex gap-2">
          <Button
            size="sm"
            onClick={handleSave}
            className="gap-1"
          >
            <Check className="w-4 h-4" />
            Save
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={handleCancel}
          >
            Cancel
          </Button>
        </div>
      )}

      {/* File info and errors */}
      {previewUrl && !error && (
        <p className="text-sm text-muted-foreground">
          File size: {getFileSize()}
        </p>
      )}
      {error && (
        <p className="text-sm text-destructive text-center">{error}</p>
      )}
    </div>
  );
} 