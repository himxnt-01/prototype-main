'use client';

import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useLocation } from "@/hooks/useLocation";
import { BulletproofProfile } from "./BulletproofProfile";

export function ProfilePage() {
  const { navigate } = useLocation();

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center gap-4 mb-6">
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => navigate("/tracks")}
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-semibold">Edit Profile</h1>
      </div>
      
      <div className="flex-1 overflow-auto">
        <BulletproofProfile />
      </div>
    </div>
  );
} 