import { useState, useEffect } from "react";
import { Track } from "@/types/track";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface TagsTabProps {
  track: Track;
}

// Tag category colors inspired by marketplace
const TAG_COLORS = {
  key: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  emotionalArc: "bg-purple-500/10 text-purple-500 border-purple-500/20",
  mood: "bg-pink-600/10 text-pink-600 border-pink-600/20",
  genre: "bg-amber-500/10 text-amber-500 border-amber-500/20",
  instruments: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
  vocalStyle: "bg-indigo-500/10 text-indigo-500 border-indigo-500/20",
  language: "bg-cyan-500/10 text-cyan-500 border-cyan-500/20",
  harmony: "bg-violet-500/10 text-violet-500 border-violet-500/20",
  chordProgression: "bg-green-500/10 text-green-500 border-green-500/20",
  harmonicRhythm: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
  form: "bg-orange-500/10 text-orange-500 border-orange-500/20",
  lyricalTheme: "bg-rose-500/10 text-rose-500 border-rose-500/20",
  culturalFusion: "bg-teal-500/10 text-teal-500 border-teal-500/20",
  historicalPeriod: "bg-blue-600/10 text-blue-600 border-blue-600/20"
};

// Generate mock tags based on track properties
function generateMockTags(track: Track) {
  const tags = [...track.tags]; // Start with existing tags
  
  // Add key tag
  tags.push(track.key);
  
  // Add BPM-based tags
  if (track.bpm < 90) tags.push("Slow");
  else if (track.bpm < 120) tags.push("Medium");
  else tags.push("Fast");
  
  // Add genre-based tags
  if (track.genre === "Rock") {
    tags.push("Guitar-driven", "Energetic");
  } else if (track.genre === "Electronic") {
    tags.push("Synthesizer", "Digital", "Dance");
  } else if (track.genre === "Pop") {
    tags.push("Catchy", "Vocal-focused");
  } else if (track.genre === "Ambient") {
    tags.push("Atmospheric", "Relaxing", "Ethereal");
  } else if (track.genre === "Hip Hop") {
    tags.push("Rhythmic", "Urban", "Beats");
  }
  
  // Add random mood tags
  const moods = ["Happy", "Sad", "Energetic", "Calm", "Aggressive", "Romantic", "Mysterious"];
  tags.push(moods[Math.floor(Math.random() * moods.length)]);
  
  // Add random instrument tags
  const instruments = ["Piano", "Guitar", "Drums", "Bass", "Strings", "Synthesizer"];
  tags.push(instruments[Math.floor(Math.random() * instruments.length)]);
  
  // Add random theme tags
  const themes = ["Love", "Loss", "Journey", "Growth", "Conflict", "Celebration"];
  tags.push(themes[Math.floor(Math.random() * themes.length)]);
  
  // Return unique tags
  return [...new Set(tags)];
}

// Categorize tags
function categorizeTag(tag: string): keyof typeof TAG_COLORS {
  if (tag.includes("Major") || tag.includes("Minor") || tag.includes("m") || /^[A-G][#b]?$/.test(tag)) return "key";
  if (["Happy", "Sad", "Energetic", "Calm", "Aggressive", "Romantic", "Mysterious", "Uplifting", "Melancholic"].includes(tag)) return "mood";
  if (["Rock", "Pop", "Electronic", "Hip Hop", "R&B", "Jazz", "Classical", "Folk", "Country", "Blues", "Ambient"].includes(tag)) return "genre";
  if (["Piano", "Guitar", "Drums", "Bass", "Strings", "Synthesizer", "Percussion"].includes(tag)) return "instruments";
  if (["Male Vocals", "Female Vocals", "Vocal-focused", "Instrumental"].includes(tag)) return "vocalStyle";
  if (["English", "Spanish", "French", "Japanese", "Korean", "Chinese"].includes(tag)) return "language";
  if (["Simple", "Complex", "Experimental", "Traditional"].includes(tag)) return "harmony";
  if (["Verse-Chorus", "AABA", "Through-composed"].includes(tag)) return "form";
  if (["Love", "Loss", "Journey", "Growth", "Conflict", "Celebration"].includes(tag)) return "lyricalTheme";
  if (["Western", "Asian", "African", "Latin"].includes(tag)) return "culturalFusion";
  if (["Modern", "Retro", "Classical", "Contemporary"].includes(tag)) return "historicalPeriod";
  if (["Building Intensity", "Gradual Calm", "Emotional Rollercoaster"].includes(tag)) return "emotionalArc";
  if (["I-IV-V", "ii-V-I", "i-iv-v"].includes(tag)) return "chordProgression";
  if (["Regular", "Syncopated", "Complex", "Rubato"].includes(tag)) return "harmonicRhythm";
  
  // Default
  return "genre";
}

export function TagsTab({ track }: TagsTabProps) {
  const [tags, setTags] = useState<string[]>([]);
  
  useEffect(() => {
    // Generate tags when component mounts
    setTags(generateMockTags(track));
  }, [track]);

  return (
    <div className="p-6">
      <div className="space-y-6">
        <div className="space-y-1">
          <h2 className="text-lg font-semibold">Tags</h2>
          <p className="text-sm text-muted-foreground">
            Tags help categorize and make your track discoverable
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => {
            const category = categorizeTag(tag);
            return (
              <Badge 
                key={index} 
                variant="outline"
                className={cn(
                  "px-3 py-1.5 text-sm font-medium",
                  TAG_COLORS[category]
                )}
              >
                {tag}
              </Badge>
            );
          })}
        </div>

        <div className="space-y-4 mt-8">
          <h3 className="text-base font-medium">Tag Categories</h3>
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(TAG_COLORS).map(([category, className]) => (
              <div key={category} className="flex items-center gap-2">
                <div className={cn(
                  "w-3 h-3 rounded-full",
                  className.split(' ')[0] // Extract background color class
                )} />
                <span className="text-sm capitalize">{category.replace(/([A-Z])/g, ' $1').trim()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}