import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Mix } from "@/types/mix";
import { MoreHorizontal, Play } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { cn } from "@/lib/utils";
import { TYPE_STYLES } from "@/config/mixCategories";
import { EditMixDialog } from "./EditMixDialog";

interface MixesListProps {
  mixes?: Mix[];
  onUpdate: (mixes: Mix[]) => void;
}

export function MixesList({ mixes = [], onUpdate }: MixesListProps) {
  const [editingMix, setEditingMix] = useState<Mix | null>(null);
  const [deletingMix, setDeletingMix] = useState<Mix | null>(null);

  const handleEditMix = (mix: Mix) => {
    const updatedMixes = mixes.map((m) => 
      m.id === mix.id ? mix : m
    );
    onUpdate(updatedMixes);
    setEditingMix(null);
  };

  const handleDeleteMix = () => {
    if (deletingMix) {
      const updatedMixes = mixes.filter((m) => m.id !== deletingMix.id);
      onUpdate(updatedMixes);
      setDeletingMix(null);
    }
  };

  if (!mixes.length) {
    return (
      <div className="text-sm text-muted-foreground text-center py-8 border rounded-lg">
        No mixes available. Create a new mix to get started.
      </div>
    );
  }

  return (
    <>
      <div className="space-y-3">
        {mixes.map((mix) => (
          <div 
            key={mix.id}
            className="flex items-center justify-between p-3 rounded-md border bg-card-gradient hover:bg-card transition-colors"
          >
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 mb-0.5">
                <h4 className="font-medium truncate">{mix.title}</h4>
                <Badge
                  variant="secondary"
                  className={cn("capitalize shrink-0", TYPE_STYLES[mix.type])}
                >
                  {mix.type.replace("_", " ")}
                </Badge>
              </div>
              <div className="text-xs text-muted-foreground flex items-center gap-2">
                <span>{mix.duration}</span>
                <span>•</span>
                <span className="truncate">{mix.metadata.mixer}</span>
                {mix.metadata.notes && (
                  <>
                    <span>•</span>
                    <span className="truncate text-muted-foreground/70">
                      {mix.metadata.notes}
                    </span>
                  </>
                )}
              </div>
            </div>
            
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Play className="h-4 w-4" />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setEditingMix(mix)}>
                    Edit Mix
                  </DropdownMenuItem>
                  <DropdownMenuItem>Download</DropdownMenuItem>
                  <DropdownMenuItem>Share</DropdownMenuItem>
                  <DropdownMenuItem 
                    className="text-destructive"
                    onClick={() => setDeletingMix(mix)}
                  >
                    Delete Mix
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        ))}
      </div>

      {editingMix && (
        <EditMixDialog
          mix={editingMix}
          open={true}
          onOpenChange={(open) => !open && setEditingMix(null)}
          onSave={handleEditMix}
        />
      )}

      <AlertDialog 
        open={!!deletingMix} 
        onOpenChange={(open) => !open && setDeletingMix(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Mix</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this mix? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDeleteMix}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}