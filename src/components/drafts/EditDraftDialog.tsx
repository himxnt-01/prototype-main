import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Draft } from "@/types/draft";
import { EditMetadataTab } from "./edit/EditMetadataTab";
import { EditRightsTab } from "./edit/EditRightsTab";
import { EditStatusTab } from "./edit/EditStatusTab";

interface EditDraftDialogProps {
  draft: Draft;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (updatedDraft: Draft) => void;
}

export function EditDraftDialog({ draft, open, onOpenChange, onSave }: EditDraftDialogProps) {
  const [editedDraft, setEditedDraft] = useState<Draft>(draft);

  const handleSave = () => {
    onSave(editedDraft);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit Draft</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={editedDraft.title}
                onChange={(e) => setEditedDraft({ ...editedDraft, title: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="artist">Artist</Label>
              <Input
                id="artist"
                value={editedDraft.artist}
                onChange={(e) => setEditedDraft({ ...editedDraft, artist: e.target.value })}
              />
            </div>
          </div>

          <Tabs defaultValue="metadata">
            <TabsList>
              <TabsTrigger value="metadata">Metadata</TabsTrigger>
              <TabsTrigger value="rights">Rights</TabsTrigger>
              <TabsTrigger value="status">Status</TabsTrigger>
            </TabsList>

            <TabsContent value="metadata">
              <EditMetadataTab
                metadata={editedDraft.metadata}
                onChange={(metadata) => setEditedDraft({ ...editedDraft, metadata })}
              />
            </TabsContent>

            <TabsContent value="rights">
              <EditRightsTab
                rights={editedDraft.rights}
                onChange={(rights) => setEditedDraft({ ...editedDraft, rights })}
              />
            </TabsContent>

            <TabsContent value="status">
              <EditStatusTab
                status={editedDraft.status}
                onChange={(status) => setEditedDraft({ ...editedDraft, status })}
              />
            </TabsContent>
          </Tabs>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>Save Changes</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}