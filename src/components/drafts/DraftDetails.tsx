import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Draft } from "@/types/draft";
import { useDraftsStore } from "@/lib/drafts";
import { DraftDetailsHeader } from "./DraftDetailsHeader";
import { cn } from "@/lib/utils";

export function DraftDetails() {
  const { drafts, selectedDraftId, updateDraft, closeDetails } = useDraftsStore();
  const draft = drafts.find(d => d.id === selectedDraftId);

  if (!draft) return null;

  const handleSave = (field: keyof Draft, value: any) => {
    updateDraft(draft.id, { ...draft, [field]: value });
  };

  return (
    <div className="h-full flex flex-col">
      <DraftDetailsHeader draft={draft} onClose={closeDetails} />
      
      <ScrollArea className="flex-1">
        <div className="p-6 space-y-8">
          <div className="space-y-6">
            <div className="space-y-1">
              <h3 className="text-lg font-medium">Title & Artist</h3>
              <p className="text-sm text-muted-foreground">Basic track information</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={draft.title}
                  onChange={(e) => handleSave("title", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="artist">Artist</Label>
                <Input
                  id="artist"
                  value={draft.artist}
                  onChange={(e) => handleSave("artist", e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-1">
              <h3 className="text-lg font-medium">Metadata</h3>
              <p className="text-sm text-muted-foreground">Track details and specifications</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="genre">Genre</Label>
                <Input
                  id="genre"
                  value={draft.metadata.genre}
                  onChange={(e) => handleSave("metadata", { ...draft.metadata, genre: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bpm">BPM</Label>
                <Input
                  id="bpm"
                  type="number"
                  value={draft.metadata.bpm}
                  onChange={(e) => handleSave("metadata", { ...draft.metadata, bpm: parseInt(e.target.value) })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="key">Key</Label>
                <Input
                  id="key"
                  value={draft.metadata.key}
                  onChange={(e) => handleSave("metadata", { ...draft.metadata, key: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="duration">Duration</Label>
                <Input
                  id="duration"
                  value={draft.metadata.duration}
                  onChange={(e) => handleSave("metadata", { ...draft.metadata, duration: e.target.value })}
                />
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-1">
              <h3 className="text-lg font-medium">Rights & Licensing</h3>
              <p className="text-sm text-muted-foreground">Publishing and ownership information</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="publisher">Publisher</Label>
                <Input
                  id="publisher"
                  value={draft.metadata.publisher}
                  onChange={(e) => handleSave("metadata", { ...draft.metadata, publisher: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="masterRightsOwner">Master Rights Owner</Label>
                <Input
                  id="masterRightsOwner"
                  value={draft.metadata.masterRightsOwner}
                  onChange={(e) => handleSave("metadata", { ...draft.metadata, masterRightsOwner: e.target.value })}
                />
              </div>
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}