import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2 } from "lucide-react";
import { Draft } from "@/types/draft";
import { BasicInfo } from "./sections/BasicInfo";
import { CommercialInfo } from "./sections/CommercialInfo";
import { TrackDetails } from "./sections/TrackDetails";
import { ContentInfo } from "./sections/ContentInfo";
import { useDraftFormStore } from "@/lib/draftForm";

interface MetadataFormProps {
  draft: Draft;
  onChange: (changes: Partial<Draft>) => void;
}

const SONG_TITLES = [
  "Midnight Echoes",
  "Electric Dreams",
  "Neon Sunset",
  "Ocean Waves",
  "Urban Symphony",
  "Desert Wind",
  "Crystal Rain",
  "Digital Pulse",
  "Starlight Journey",
  "Cosmic Dance"
];

const ARTISTS = [
  "Luna Ray",
  "The Neon Collective",
  "Sarah Chen",
  "Midnight Pulse",
  "Urban Echo",
  "Crystal Waters",
  "Digital Dreams",
  "Stellar Beat",
  "Nova Project",
  "Echo Valley"
];

const getRandomMockData = () => {
  const titleIndex = Math.floor(Math.random() * SONG_TITLES.length);
  const artistIndex = Math.floor(Math.random() * ARTISTS.length);

  return {
    title: SONG_TITLES[titleIndex],
    artist: ARTISTS[artistIndex],
    isrc: "USRC72400123",
    iswc: "T-123.456.789-0",
    genre: "Electronic",
    bpm: 128,
    key: "Am",
    duration: "3:45",
    language: "English",
    explicit: false,
    publisher: "Universal Music Publishing",
    masterRightsOwner: "Universal Music Group",
    territories: ["Worldwide"],
    producer: "Max Martin",
    mixer: "Serban Ghenea",
    masteringEngineer: "Randy Merrill",
    recordingLocation: "Westlake Recording Studios, LA",
    recordingDate: "2023-12-15",
    copyright: "© 2024 Universal Music Group",
    upc: "1234567890123",
    releaseDate: "2024-03-15"
  };
};

export function MetadataForm({ draft, onChange }: MetadataFormProps) {
  const { isReleased, isScanning, setIsReleased, setIsScanning } = useDraftFormStore();

  const handleReleaseStatusChange = (value: "yes" | "no") => {
    setIsReleased(value);
    if (value === "yes") {
      setIsScanning(true);
      // Simulate AI scanning and data population
      setTimeout(() => {
        onChange({ metadata: getRandomMockData() });
        setIsScanning(false);
      }, 3000);
    }
  };

  return (
    <div className="space-y-10 p-6">
      <div className="space-y-4">
        <div className="space-y-2.5">
          <Label>Is this song released?</Label>
          <Select 
            value={isReleased} 
            onValueChange={handleReleaseStatusChange}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="yes">Yes</SelectItem>
              <SelectItem value="no">No</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {isReleased === "yes" && isScanning && (
          <Alert className="bg-blue-500/10 text-blue-500 border-blue-500/20">
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            <AlertDescription>
              Our Prelude AI (powered by Chartmetric) is scanning the universe of music catalog to auto-fill these fields for you! Sit back and relax.
            </AlertDescription>
          </Alert>
        )}
      </div>

      <div className={isScanning ? "opacity-50 pointer-events-none" : ""}>
        <div className="space-y-10">
          <BasicInfo 
            draft={draft} 
            onChange={onChange}
          />
          
          <CommercialInfo 
            draft={draft}
            onChange={onChange}
          />
          
          <TrackDetails 
            draft={draft}
            onChange={onChange}
          />
          
          <ContentInfo 
            draft={draft}
            onChange={onChange}
          />
        </div>
      </div>
    </div>
  );
}