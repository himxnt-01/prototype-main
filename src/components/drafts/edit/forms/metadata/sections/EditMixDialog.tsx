import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { MixForm } from "./MixForm";
import { Mix } from "@/types/mix";

interface EditMixDialogProps {
  mix: Mix;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (mix: Mix) => void;
}

export function EditMixDialog({ mix, open, onOpenChange, onSave }: EditMixDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit Mix</DialogTitle>
        </DialogHeader>
        <MixForm 
          mix={mix} 
          onSave={onSave} 
          onCancel={() => onOpenChange(false)} 
        />
      </DialogContent>
    </Dialog>
  );
}