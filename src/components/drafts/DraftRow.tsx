import { TableCell, TableRow } from "@/components/ui/table";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { Draft } from "@/types/draft";
import { useDraftsStore } from "@/lib/drafts";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";
import { useState } from "react";
import { DraftDetails } from "./DraftDetails";

// Helper to ensure value is an array
const ensureArray = (value: string | string[] | undefined): string[] => {
  if (Array.isArray(value)) return value;
  if (typeof value === 'string') return [value];
  return [];
};

interface DraftRowProps {
  draft: Draft;
}

export function DraftRow({ draft }: DraftRowProps) {
  const { 
    selectDraft, 
    selectedDraftId,
  } = useDraftsStore();
  
  const isSelected = selectedDraftId === draft.id;

  const handleRowClick = () => {
    // This will open the main details panel on the right
    selectDraft(draft.id);
  };

  const lastModifiedDate = draft.lastModified ? new Date(draft.lastModified) : null;
  const lastModifiedDisplay = lastModifiedDate && !isNaN(lastModifiedDate.getTime())
    ? formatDistanceToNow(lastModifiedDate, { addSuffix: true })
    : 'recently';

  return (
    <TableRow 
      className={cn(
        "group cursor-pointer transition-all relative",
        "hover:bg-card/50",
        isSelected && "bg-card/50",
      )}
      onClick={handleRowClick}
    >
      <TableCell className="w-[48px] p-2">
        <Avatar className="rounded-md w-10 h-10">
          <img 
            src={draft.cover_art_url || `https://picsum.photos/seed/${draft.id}/40/40`} 
            alt={draft.title || 'Untitled'}
            className="object-cover"
          />
        </Avatar>
      </TableCell>

      <TableCell>
        <div className="space-y-0.5">
          <div className="font-medium">{draft.title || 'Untitled'}</div>
          <div className="text-sm text-muted-foreground">{draft.artist || 'Unknown Artist'}</div>
        </div>
      </TableCell>

      <TableCell className="text-muted-foreground text-sm">
        {ensureArray(draft.genre).join(', ')}
      </TableCell>

      <TableCell className="text-muted-foreground text-sm">
        <div className="inline-flex items-center rounded-md bg-purple-400/10 px-2.5 py-0.5 text-xs font-semibold text-purple-400">
          {draft.key || 'N/A'}
        </div>
      </TableCell>
      
      <TableCell className="text-muted-foreground text-sm">
        <div className="inline-flex items-center rounded-md bg-blue-400/10 px-2.5 py-0.5 text-xs font-semibold text-blue-400">
          {draft.bpm || 'N/A'}
        </div>
      </TableCell>

      <TableCell>
        <div className="text-sm text-muted-foreground">
          {lastModifiedDisplay}
        </div>
      </TableCell>
    </TableRow>
  );
}
