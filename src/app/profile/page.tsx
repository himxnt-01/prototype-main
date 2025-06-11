'use client';

import { useState, useEffect } from 'react';
import { ProfilePicture } from '@/components/profile/ProfilePicture';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export default function ProfilePage() {
  useEffect(() => {
    console.log('Profile page mounted');
  }, []);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleImageChange = (file: File | null) => {
    console.log('Image change triggered:', file);
    setSelectedFile(file);
  };

  // Mock user data - replace with real data later
  const userData = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    avatarUrl: null
  };

  return (
    <div className="container max-w-2xl py-10">
      <Card className="relative">
        {/* Profile Picture Section - Moved to top */}
        <div className="absolute -top-8 left-1/2 -translate-x-1/2 z-10 bg-background rounded-xl p-2">
          <ProfilePicture
            currentImageUrl={userData.avatarUrl || undefined}
            name={userData.name}
            email={userData.email}
            onImageChange={handleImageChange}
          />
        </div>

        {/* Add spacing to prevent overlap */}
        <div className="h-40" />

        <CardHeader className="pb-4">
          <h1 className="text-2xl font-bold">Profile & Settings</h1>
          <p className="text-sm text-muted-foreground">
            Manage your account settings and preferences
          </p>
        </CardHeader>

        <Separator className="my-6" />

        {/* Other Settings Sections */}
        <CardContent className="space-y-6">
          {/* Personal Information */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Personal Information</h2>
            {/* Add personal info form fields here */}
          </div>

          <Separator />

          {/* Account Settings */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Account Settings</h2>
            {/* Add account settings here */}
          </div>

          <Separator />

          {/* Preferences */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Preferences</h2>
            {/* Add preferences here */}
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 