import { MetadataTab } from "@/components/tracks/details/tabs/MetadataTab";
import { RightsTab } from "@/components/tracks/details/tabs/RightsTab";
import { LyricsTab } from "@/components/tracks/details/tabs/LyricsTab";
import { TagsTab } from "@/components/tracks/details/tabs/TagsTab";
import { StatusTab } from "@/components/tracks/details/tabs/StatusTab";
import { Track } from "@/types/track";

export const getTrackViews = (track: Track, parentTrackTitle?: string) => [
  { 
    id: "metadata", 
    label: "Metadata", 
    component: <MetadataTab track={track} /> 
  },
  { 
    id: "rights", 
    label: "Rights", 
    component: <RightsTab track={track} /> 
  },
  { 
    id: "lyrics", 
    label: "Lyrics", 
    component: <LyricsTab track={track} /> 
  },
  { 
    id: "tags", 
    label: "Tags", 
    component: <TagsTab track={track} /> 
  },
  { 
    id: "status", 
    label: "Status", 
    component: <StatusTab track={track} /> 
  }
];