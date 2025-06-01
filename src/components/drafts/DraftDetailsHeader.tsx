import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { X } from "lucide-react";
import { Draft } from "@/types/draft";

interface DraftDetailsHeaderProps {
  draft: Draft;
  onClose: () => void;
}

export function DraftDetailsHeader({ draft, onClose }: DraftDetailsHeaderProps) {
  return (
    <div className="border-b border-border">
      <div className="p-4 flex items-start justify-between">
        <div className="flex gap-4">
          <Avatar className="h-16 w-16 rounded-md">
            <img 
              src={`https://picsum.photos/seed/${draft.id}/64/64`} 
              alt={draft.title}
              className="object-cover"
            />
          </Avatar>
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold">{draft.title}</h2>
            <p className="text-lg text-muted-foreground">{draft.artist}</p>
          </div>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}