import { TableCell, TableRow } from "@/components/ui/table";
import { Avatar } from "@/components/ui/avatar";
import { Draft } from "@/types/draft";
import { useDraftsStore } from "@/lib/drafts";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

interface DraftRowProps {
  draft: Draft;
}

export function DraftRow({ draft }: DraftRowProps) {
  const { 
    selectDraft, 
    selectedDraftId,
    isSelectionMode,
    toggleDraftSelection,
  } = useDraftsStore();
  
  const isSelected = selectedDraftId === draft.id;

  const calculateProgress = () => {
    let total = 0;
    let completed = 0;
    if (draft.metadata) {
      total += 6;
      completed += Object.values(draft.metadata).filter(Boolean).length;
    }
    if (draft.rights) {
      total += 3;
      completed += draft.rights.writers?.length ? 1 : 0;
      completed += draft.rights.publishers?.length ? 1 : 0;
      completed += draft.rights.masterOwners?.length ? 1 : 0;
    }
    if (draft.lyrics) {
      total += 1;
      completed += draft.lyrics.content ? 1 : 0;
    }
    if (draft.tags) {
      total += 1;
      completed += draft.tags.length > 0 ? 1 : 0;
    }
    if (draft.licensing) {
      total += 4;
      completed += draft.licensing.tier ? 1 : 0;
      completed += draft.licensing.usageTypes?.length > 0 ? 1 : 0;
      completed += draft.licensing.territories?.length > 0 ? 1 : 0;
      completed += draft.licensing.restrictions ? 1 : 0;
    }
    return total > 0 ? Math.round((completed / total) * 100) : 0;
  };

  const progress = calculateProgress();

  const handleRowClick = () => {
    if (isSelectionMode) {
      toggleDraftSelection(draft.id);
    } else {
      selectDraft(draft.id);
    }
  };

  const lastModifiedDate = draft.lastModified ? new Date(draft.lastModified) : null;
  const lastModifiedDisplay = lastModifiedDate && !isNaN(lastModifiedDate.getTime())
    ? formatDistanceToNow(lastModifiedDate, { addSuffix: true })
    : 'recently';
    
  const genre = Array.isArray(draft.metadata.genre) 
    ? draft.metadata.genre.join(', ') 
    : draft.metadata.genre;

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

      <TableCell className="text-muted-foreground text-sm">
        {genre || 'N/A'}
      </TableCell>

      <TableCell className="text-muted-foreground text-sm">
        <div className="inline-flex items-center rounded-md bg-purple-400/10 px-2.5 py-0.5 text-xs font-semibold text-purple-400">
          {draft.metadata.key || 'N/A'}
        </div>
      </TableCell>
      
      <TableCell className="text-muted-foreground text-sm">
        <div className="inline-flex items-center rounded-md bg-blue-400/10 px-2.5 py-0.5 text-xs font-semibold text-blue-400">
          {draft.metadata.bpm || 'N/A'}
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