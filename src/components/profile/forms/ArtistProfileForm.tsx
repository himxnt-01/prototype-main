import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Loader2, Save, X } from "lucide-react";
import { useImageUpload } from "@/hooks/useImageUpload";
import { cn } from "@/lib/utils";
import { artistProfileSchema } from "@/types/profiles";
import type { ArtistProfile } from "@/types/profiles";
import { getProfile, saveProfile, subscribeToProfileChanges } from "@/lib/profiles";
import { supabase } from "@/lib/supabase";
import { Avatar } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  User, 
  Camera, 
  Instagram, 
  Music, 
  Apple, 
  ChevronLeft,
  MapPin,
  Globe,
  FileText,
  CheckCircle,
  Laptop,
  AlertCircle,
  BookOpen,
  FileCheck
} from "lucide-react";

// Import tab components
import { BasicInfoTab } from "./tabs/BasicInfoTab";
import { ProfessionalTab } from "./tabs/ProfessionalTab";
import { SocialLinksTab } from "./tabs/SocialLinksTab";

// Debug helper
const debugLog = (step: string, data?: any) => {
  console.group(`🔍 ArtistProfileForm - ${step}`);
  console.log('Timestamp:', new Date().toISOString());
  if (data) console.log('Data:', data);
  console.groupEnd();
};

export function ArtistProfileForm() {
  // ... rest of the component code ...
  return (
    <div className="h-full flex flex-col">
      {/* ... rest of the JSX ... */}
    </div>
  );
}