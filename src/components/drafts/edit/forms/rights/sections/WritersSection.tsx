import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { WriterCard } from "../cards/WriterCard";
import { SearchWriterDialog } from "../dialogs/SearchWriterDialog";
import { InviteWriterDialog } from "../dialogs/InviteWriterDialog";
import { Writer } from "@/types/draft";

interface WritersSectionProps {
  writers: Writer[];
  onChange: () => void;
}

export function WritersSection({ writers, onChange }: WritersSectionProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isInviteOpen, setIsInviteOpen] = useState(false);

  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <h3 className="text-base font-medium">Writers & Composers</h3>
        <p className="text-sm text-muted-foreground">
          Add all writers and composers who contributed to this track
        </p>
      </div>

      <div className="space-y-3">
        {writers.map((writer, index) => (
          <WriterCard
            key={index}
            writer={writer}
            onRemove={() => {
              writers.splice(index, 1);
              onChange();
            }}
            onUpdate={(updates) => {
              writers[index] = { ...writer, ...updates };
              onChange();
            }}
          />
        ))}

        <div className="flex gap-2">
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => setIsSearchOpen(true)}
          >
            <Plus className="h-4 w-4 mr-2" />
            Search Writers
          </Button>
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => setIsInviteOpen(true)}
          >
            <Plus className="h-4 w-4 mr-2" />
            Invite Writer
          </Button>
        </div>
      </div>

      <SearchWriterDialog
        open={isSearchOpen}
        onOpenChange={setIsSearchOpen}
        onSelect={(writer) => {
          writers.push(writer);
          onChange();
        }}
      />

      <InviteWriterDialog
        open={isInviteOpen}
        onOpenChange={setIsInviteOpen}
        onInvite={(writer) => {
          writers.push(writer);
          onChange();
        }}
      />
    </div>
  );
}