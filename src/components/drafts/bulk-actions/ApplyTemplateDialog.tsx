import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface ApplyTemplateDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onApply: (template: any) => void;
  selectedCount: number;
}

const TEMPLATES = [
  {
    id: 1,
    name: "Standard Release",
    description: "Basic metadata and rights for standard music releases",
    metadata: {
      publisher: "Self-Published",
      territories: ["Worldwide"],
      explicit: false
    },
    rights: {
      writers: [],
      publishers: [
        { name: "Self-Published", share: 100 }
      ],
      masterOwners: [
        { name: "Self-Owned", share: 100 }
      ]
    },
    status: {
      monetization: true,
      public: true
    }
  },
  {
    id: 2,
    name: "Sync Ready",
    description: "Optimized for sync licensing opportunities",
    metadata: {
      publisher: "Sync Publishing Co",
      territories: ["Worldwide"],
      explicit: false
    },
    rights: {
      writers: [],
      publishers: [
        { name: "Sync Publishing Co", share: 100 }
      ],
      masterOwners: [
        { name: "Artist", share: 100 }
      ]
    },
    status: {
      monetization: true,
      public: true,
      flags: {
        needsMetadata: false,
        isHighPriority: true
      }
    }
  }
];

export function ApplyTemplateDialog({ 
  open, 
  onOpenChange,
  onApply,
  selectedCount 
}: ApplyTemplateDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Apply Template</DialogTitle>
        </DialogHeader>

        <div className="mb-4">
          <p className="text-sm text-muted-foreground">
            Choose a template to apply to {selectedCount} selected draft{selectedCount !== 1 ? 's' : ''}.
            This will update metadata, rights, and status settings.
          </p>
        </div>

        <ScrollArea className="h-[400px] -mx-6">
          <div className="px-6 space-y-4">
            {TEMPLATES.map((template) => (
              <div 
                key={template.id}
                className={cn(
                  "p-4 rounded-lg border cursor-pointer",
                  "hover:bg-muted/50 hover:border-primary/50",
                  "transition-colors duration-300"
                )}
                onClick={() => onApply(template)}
              >
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h3 className="font-medium">{template.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {template.description}
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    Apply
                  </Button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {template.metadata.publisher && (
                    <Badge variant="secondary">
                      Publisher: {template.metadata.publisher}
                    </Badge>
                  )}
                  {template.metadata.territories?.map((territory) => (
                    <Badge key={territory} variant="secondary">
                      {territory}
                    </Badge>
                  ))}
                  {template.status.monetization && (
                    <Badge variant="secondary" className="bg-green-500/10 text-green-500">
                      Monetization Enabled
                    </Badge>
                  )}
                  {template.status.flags?.isHighPriority && (
                    <Badge variant="secondary" className="bg-amber-500/10 text-amber-500">
                      High Priority
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        <div className="flex justify-end">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
