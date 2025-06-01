import { Mix, MixType } from "@/types/mix";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download, Play, Share2, FileEdit, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { MixCard } from "./MixCard";

interface MixesTabProps {
  mixes?: Mix[];
  isParentTrack: boolean;
  parentTrackTitle?: string;
}

const MIX_CATEGORIES: { label: string; types: MixType[] }[] = [
  {
    label: "Radio & TV",
    types: ["radio_edit", "tv_edit", "clean"],
  },
  {
    label: "Alternate Versions",
    types: ["instrumental", "acapella", "acoustic", "live"],
  },
  {
    label: "Remixes & Extended",
    types: ["remix", "extended"],
  },
  {
    label: "Sync & Licensing",
    types: ["film_score", "trailer"],
  },
];

export function MixesTab({ mixes, isParentTrack, parentTrackTitle }: MixesTabProps) {
  if (!isParentTrack) {
    return (
      <div className="p-4 text-sm text-muted-foreground">
        This is a mix of "{parentTrackTitle}". Mixes cannot have their own mixes.
      </div>
    );
  }

  if (!mixes?.length) {
    return (
      <div className="p-4 text-sm text-muted-foreground">
        No mixes available for this track.
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-border flex items-center justify-between">
        <div className="space-y-1">
          <h3 className="font-medium">Available Mixes</h3>
          <p className="text-sm text-muted-foreground">
            {mixes.length} mix{mixes.length !== 1 ? "es" : ""} available
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Play className="h-4 w-4 mr-2" />
            Play All
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Download All
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" className="flex-1">
        <div className="px-4 border-b border-border">
          <TabsList className="h-10">
            <TabsTrigger value="all">All Mixes</TabsTrigger>
            {MIX_CATEGORIES.map((category) => (
              <TabsTrigger key={category.label} value={category.label}>
                {category.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        <ScrollArea className="flex-1">
          <TabsContent value="all" className="m-0 p-4">
            <div className="space-y-4">
              {mixes.map((mix) => (
                <MixCard key={mix.id} mix={mix} />
              ))}
            </div>
          </TabsContent>

          {MIX_CATEGORIES.map((category) => (
            <TabsContent key={category.label} value={category.label} className="m-0 p-4">
              <div className="space-y-4">
                {mixes
                  .filter((mix) => category.types.includes(mix.type))
                  .map((mix) => (
                    <MixCard key={mix.id} mix={mix} />
                  ))}
              </div>
            </TabsContent>
          ))}
        </ScrollArea>
      </Tabs>
    </div>
  );
}