import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { TabList, TabTrigger, TabContent } from "@/components/ui/custom-tabs";
import { Upload, Music } from "lucide-react";
import { useState } from "react";
import { Mix } from "@/types/mix";
import { MixForm } from "./MixForm";
import { MixSearch } from "./mix-search";

interface AddMixDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (mix: Mix) => void;
}

type DialogTab = "create" | "search";

export function AddMixDialog({ open, onOpenChange, onSave }: AddMixDialogProps) {
  const [currentTab, setCurrentTab] = useState<DialogTab>("create");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Add New Mix</DialogTitle>
        </DialogHeader>

        <TabList>
          <TabTrigger
            id="create"
            isActive={currentTab === "create"}
            onClick={() => setCurrentTab("create")}
            label={
              <div className="flex items-center gap-2">
                <Upload className="h-4 w-4" />
                Create New Mix
              </div>
            }
          />
          <TabTrigger
            id="search"
            isActive={currentTab === "search"}
            onClick={() => setCurrentTab("search")}
            label={
              <div className="flex items-center gap-2">
                <Music className="h-4 w-4" />
                Use Existing Mix
              </div>
            }
          />
        </TabList>

        <TabContent id="create" currentTab={currentTab}>
          <MixForm onSave={onSave} onCancel={() => onOpenChange(false)} />
        </TabContent>

        <TabContent id="search" currentTab={currentTab}>
          <MixSearch onSelect={(mix) => {
            onSave(mix);
            onOpenChange(false);
          }} />
        </TabContent>
      </DialogContent>
    </Dialog>
  );
}
