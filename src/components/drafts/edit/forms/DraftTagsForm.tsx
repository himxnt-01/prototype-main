import { useState, useEffect } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, CheckCircle, Plus } from "lucide-react";
import { Draft } from "@/types/draft";
import { useDraftFormStore } from "@/lib/draftForm";
import { cn } from "@/lib/utils";

interface DraftTagsFormProps {
  draft: Draft;
  onChange: (changes: Partial<Draft>) => void;
}

const KEYS = [
  "C Major", "G Major", "D Major", "A Major", "E Major", "B Major", "F# Major",
  "A Minor", "E Minor", "B Minor", "F# Minor", "C# Minor", "G# Minor", "D# Minor"
];

const EMOTIONAL_ARCS = [
  "Building Intensity",
  "Gradual Calm",
  "Emotional Rollercoaster",
  "Steady State",
  "Rising Action",
  "Falling Action",
  "Peak and Valley",
  "Multiple Climaxes"
];

const MOODS = [
  "Building Intensity",
  "Gradual Calm",
  "Emotional Rollercoaster",
  "Euphoric Rise",
  "Melancholic Descent",
  "Tension and Release",
  "Atmospheric Journey",
  "Dynamic Contrast"
];

const GENRES = [
  "Pop",
  "Rock",
  "Electronic",
  "Hip Hop",
  "R&B",
  "Jazz",
  "Classical",
  "Folk",
  "Country",
  "Blues",
  "Metal",
  "Reggae",
  "World"
];

const INSTRUMENTS = [
  "Piano",
  "Guitar",
  "Drums",
  "Bass",
  "Strings",
  "Brass",
  "Woodwinds",
  "Synthesizer",
  "Percussion"
];

const VOCAL_STYLES = [
  "Male Lead",
  "Female Lead",
  "Duet",
  "Group Harmony",
  "Choir",
  "Background Vocals",
  "Aahs",
  "No Vocals"
];

const LANGUAGES = [
  "English",
  "Spanish",
  "French",
  "German",
  "Italian",
  "Japanese",
  "Korean",
  "Chinese",
  "Portuguese",
  "Russian"
];

const HARMONIES = [
  "Simple",
  "Complex",
  "Dense",
  "Sparse",
  "Traditional",
  "Modern",
  "Experimental",
  "Modal"
];

const CHORD_PROGRESSIONS = [
  "I-IV-V",
  "I-V-vi-IV",
  "ii-V-I",
  "i-iv-v",
  "I-vi-IV-V",
  "Custom Progression"
];

const HARMONIC_RHYTHMS = [
  "Regular",
  "Syncopated",
  "Complex",
  "Rubato",
  "Steady",
  "Variable"
];

const FORMS = [
  "Verse-Chorus",
  "AABA",
  "Through-composed",
  "Strophic",
  "Rondo",
  "Custom Form"
];

const LYRICAL_THEMES = [
  "Love",
  "Heartbreak",
  "Social Issues",
  "Nature",
  "Personal Growth",
  "Spirituality",
  "Politics",
  "Relationships"
];

const CULTURAL_FUSIONS = [
  "Afro-Latin",
  "Indo-Jazz",
  "Celtic-Electronic",
  "Asian-Western",
  "Arab-Pop",
  "Custom Fusion"
];

const HISTORICAL_PERIODS = [
  "Classical Era",
  "Romantic Period",
  "Baroque",
  "Renaissance",
  "Modern",
  "Contemporary",
  "Custom Period"
];

// Tag category colors inspired by marketplace
const TAG_COLORS = {
  key: "text-blue-500 border-blue-500/20",
  emotionalArc: "text-purple-500 border-purple-500/20",
  mood: "text-pink-600 border-pink-600/20",
  genre: "text-amber-500 border-amber-500/20",
  instruments: "text-emerald-500 border-emerald-500/20",
  vocalStyle: "text-indigo-500 border-indigo-500/20",
  language: "text-cyan-500 border-cyan-500/20",
  harmony: "text-violet-500 border-violet-500/20",
  chordProgression: "text-green-500 border-green-500/20",
  harmonicRhythm: "text-yellow-500 border-yellow-500/20",
  form: "text-orange-500 border-orange-500/20",
  lyricalTheme: "text-rose-500 border-rose-500/20",
  culturalFusion: "text-teal-500 border-teal-500/20",
  historicalPeriod: "text-blue-600 border-blue-600/20"
};

// Random tag generator for demo purposes
const generateRandomTags = () => {
  return {
    key: KEYS[Math.floor(Math.random() * KEYS.length)],
    emotionalArc: EMOTIONAL_ARCS[Math.floor(Math.random() * EMOTIONAL_ARCS.length)],
    mood: MOODS[Math.floor(Math.random() * MOODS.length)],
    genre: GENRES[Math.floor(Math.random() * GENRES.length)],
    instruments: [INSTRUMENTS[Math.floor(Math.random() * INSTRUMENTS.length)]],
    vocalStyle: VOCAL_STYLES[Math.floor(Math.random() * VOCAL_STYLES.length)],
    language: LANGUAGES[Math.floor(Math.random() * LANGUAGES.length)],
    harmony: HARMONIES[Math.floor(Math.random() * HARMONIES.length)],
    chordProgression: CHORD_PROGRESSIONS[Math.floor(Math.random() * CHORD_PROGRESSIONS.length)],
    harmonicRhythm: HARMONIC_RHYTHMS[Math.floor(Math.random() * HARMONIC_RHYTHMS.length)],
    form: FORMS[Math.floor(Math.random() * FORMS.length)],
    lyricalTheme: LYRICAL_THEMES[Math.floor(Math.random() * LYRICAL_THEMES.length)],
    culturalFusion: CULTURAL_FUSIONS[Math.floor(Math.random() * CULTURAL_FUSIONS.length)],
    historicalPeriod: HISTORICAL_PERIODS[Math.floor(Math.random() * HISTORICAL_PERIODS.length)]
  };
};

export function DraftTagsForm({ draft, onChange }: DraftTagsFormProps) {
  const { isReleased } = useDraftFormStore();
  const [tags, setTags] = useState(generateRandomTags());
  const [customTags, setCustomTags] = useState<Record<string, string>>({});
  const [isLoadingTags, setIsLoadingTags] = useState(false);
  const [hasLoadedTags, setHasLoadedTags] = useState(false);

  useEffect(() => {
    if (isReleased === "yes" && !hasLoadedTags) {
      setIsLoadingTags(true);
      
      // Simulate AI loading tags
      setTimeout(() => {
        setIsLoadingTags(false);
        setHasLoadedTags(true);
      }, 2000);
    }
  }, [isReleased, hasLoadedTags]);

  const handleCustomTagChange = (category: string, value: string) => {
    setCustomTags(prev => ({ ...prev, [category]: value }));
  };

  const handleAddCustomTag = (category: string) => {
    if (customTags[category]) {
      setTags(prev => ({ ...prev, [category.toLowerCase()]: customTags[category] }));
      setCustomTags(prev => {
        const newTags = { ...prev };
        delete newTags[category];
        return newTags;
      });
    }
  };

  const handleTagChange = (category: string, value: string) => {
    setTags(prev => ({ ...prev, [category]: value }));
    
    // Update draft tags
    const updatedTags = draft.tags || [];
    if (!updatedTags.includes(value) && value !== "custom") {
      updatedTags.push(value);
      onChange({ tags: updatedTags });
    }
  };

  const renderDropdown = (
    label: string,
    options: string[],
    value: string,
    category: string,
    allowCustom = false
  ) => (
    <div className="space-y-2">
      <label className="text-sm font-medium">{label}</label>
      <div className="flex gap-2">
        <Select 
          value={value} 
          onValueChange={(val) => handleTagChange(category, val)}
        >
          <SelectTrigger className={cn(
            "transition-colors",
            value && value !== "custom" && TAG_COLORS[category as keyof typeof TAG_COLORS]
          )}>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {options.map(option => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
            {allowCustom && (
              <SelectItem value="custom">Add Custom {label}</SelectItem>
            )}
          </SelectContent>
        </Select>
        {allowCustom && value === "custom" && (
          <div className="flex gap-2">
            <Input
              value={customTags[category] || ""}
              onChange={(e) => handleCustomTagChange(category, e.target.value)}
              placeholder={`Custom ${label}`}
            />
            <Button 
              size="icon"
              onClick={() => handleAddCustomTag(category)}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="space-y-6 p-6">
      {isReleased === "yes" && isLoadingTags && (
        <Alert className="bg-blue-500/10 text-blue-500 border-blue-500/20">
          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          <AlertDescription>
            Our AI has detected this track and is analyzing its musical characteristics...
          </AlertDescription>
        </Alert>
      )}

      {isReleased === "yes" && !isLoadingTags && hasLoadedTags && (
        <Alert className="bg-green-500/10 text-green-500 border-green-500/20">
          <CheckCircle className="h-4 w-4 mr-2" />
          <AlertDescription>
            Our AI has auto-tagged this song for you, analyzing over 15,000 musical characteristics to provide accurate categorization:
          </AlertDescription>
        </Alert>
      )}

      <div className={cn(
        "grid grid-cols-2 gap-6",
        isLoadingTags && "opacity-50 pointer-events-none"
      )}>
        {renderDropdown("Key", KEYS, tags.key, "key")}
        {renderDropdown("Emotional Arc", EMOTIONAL_ARCS, tags.emotionalArc, "emotionalArc")}
        {renderDropdown("Mood", MOODS, tags.mood, "mood")}
        {renderDropdown("Genre", GENRES, tags.genre, "genre", true)}
        {renderDropdown("Vocal Style", VOCAL_STYLES, tags.vocalStyle, "vocalStyle")}
        {renderDropdown("Language", LANGUAGES, tags.language, "language", true)}
        {renderDropdown("Harmony", HARMONIES, tags.harmony, "harmony")}
        {renderDropdown("Chord Progression", CHORD_PROGRESSIONS, tags.chordProgression, "chordProgression", true)}
        {renderDropdown("Harmonic Rhythm", HARMONIC_RHYTHMS, tags.harmonicRhythm, "harmonicRhythm")}
        {renderDropdown("Form", FORMS, tags.form, "form", true)}
        {renderDropdown("Lyrical Theme", LYRICAL_THEMES, tags.lyricalTheme, "lyricalTheme", true)}
        {renderDropdown("Cultural Fusion", CULTURAL_FUSIONS, tags.culturalFusion, "culturalFusion", true)}
        {renderDropdown("Historical Period", HISTORICAL_PERIODS, tags.historicalPeriod, "historicalPeriod", true)}
      </div>
    </div>
  );
}