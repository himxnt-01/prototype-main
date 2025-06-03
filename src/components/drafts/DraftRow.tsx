import { TableCell, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Music2 } from "lucide-react";
import { Draft } from "@/types/draft";
import { useDraftsStore } from "@/lib/drafts";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

interface DraftRowProps {
  draft: Draft;
  index: number;
}

export function DraftRow({ draft, index }: DraftRowProps) {
  const { 
    selectDraft, 
    selectedDraftId,
    isSelectionMode,
    selectedDraftIds,
    toggleDraftSelection
  } = useDraftsStore();
  
  const isSelected = selectedDraftId === draft.id;
  const isChecked = selectedDraftIds.has(draft.id);

  // Calculate completion percentage including licensing
  const calculateProgress = () => {
    let total = 0;
    let completed = 0;

    // Metadata
    if (draft.metadata) {
      total += 6; // title, artist, genre, bpm, key, duration
      completed += Object.values(draft.metadata).filter(Boolean).length;
    }

    // Rights
    if (draft.rights) {
      total += 3; // writers, publishers, masterOwners
      completed += draft.rights.writers.length ? 1 : 0;
      completed += draft.rights.publishers.length ? 1 : 0;
      completed += draft.rights.masterOwners.length ? 1 : 0;
    }

    // Lyrics
    if (draft.lyrics) {
      total += 1;
      completed += draft.lyrics.content ? 1 : 0;
    }

    // Tags
    if (draft.tags) {
      total += 1;
      completed += draft.tags.length > 0 ? 1 : 0;
    }

    // Licensing
    if (draft.licensing) {
      total += 4; // tier, usageTypes, territories, restrictions
      completed += draft.licensing.tier ? 1 : 0;
      completed += draft.licensing.usageTypes.length > 0 ? 1 : 0;
      completed += draft.licensing.territories.length > 0 ? 1 : 0;
      completed += draft.licensing.restrictions ? 1 : 0;
    }

    return Math.round((completed / total) * 100);
  };

  const progress = calculateProgress();

  const handleClick = () => {
    if (isSelectionMode) {
      toggleDraftSelection(draft.id);
    } else {
      selectDraft(draft.id);
    }
  };

  return (
    <TableRow 
      className={cn(
        "group cursor-pointer transition-all relative",
        "hover:bg-card/50",
        (isSelected || isChecked) && [
          "bg-card/50",
          "shadow-[0_0_0_1px_rgba(255,255,255,0.1)]",
          "relative z-10"
        ]
      )}
      onClick={handleClick}
    >
      <TableCell className="w-[48px] text-center">
        {isSelectionMode ? (
          <div className="flex items-center justify-center">
            <Checkbox 
              checked={isChecked}
              onCheckedChange={() => toggleDraftSelection(draft.id)}
              className="bg-background data-[state=checked]:bg-primary"
            />
          </div>
        ) : (
          <span>{index + 1}</span>
        )}
      </TableCell>

      <TableCell className="w-[48px] p-2">
        <Avatar className="rounded-md w-10 h-10">
          <img 
            src={`https://picsum.photos/seed/${draft.id}/40/40`} 
            alt={draft.title}
            className="object-cover"
          />
        </Avatar>
      </TableCell>

      <TableCell>
        <div className="space-y-0.5">
          <div className="font-medium">{draft.title}</div>
          <div className="text-sm text-muted-foreground">{draft.artist}</div>
        </div>
      </TableCell>

      <TableCell>
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <Progress value={progress} className="w-32" />
            <span className="text-sm text-muted-foreground">{progress}%</span>
          </div>
          {draft.licensing?.tier && (
            <Badge variant="outline" className="capitalize">
              {draft.licensing.tier} License
            </Badge>
          )}
        </div>
      </TableCell>

      <TableCell>
        <div className="text-sm text-muted-foreground">
          {formatDistanceToNow(new Date(draft.lastModified), { addSuffix: true })}
        </div>
      </TableCell>

      <TableCell className="w-[48px]" onClick={(e) => e.stopPropagation()}>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>Share</DropdownMenuItem>
            <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
}
