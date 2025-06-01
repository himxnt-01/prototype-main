import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProjectDeliverablesProps {
  data: {
    deliverables: Array<{
      id: number;
      type: string;
      dueDate: string;
      description?: string;
    }>;
  };
  onChange: (data: any) => void;
}

export function ProjectDeliverables({ data, onChange }: ProjectDeliverablesProps) {
  const handleAddDeliverable = () => {
    onChange({
      ...data,
      deliverables: [
        ...data.deliverables,
        {
          id: Date.now(),
          type: "",
          dueDate: "",
          description: ""
        }
      ]
    });
  };

  const handleRemoveDeliverable = (id: number) => {
    onChange({
      ...data,
      deliverables: data.deliverables.filter(d => d.id !== id)
    });
  };

  const handleUpdateDeliverable = (id: number, updates: Partial<typeof data.deliverables[0]>) => {
    onChange({
      ...data,
      deliverables: data.deliverables.map(d =>
        d.id === id ? { ...d, ...updates } : d
      )
    });
  };

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        {data.deliverables.map((deliverable) => (
          <div 
            key={deliverable.id}
            className={cn(
              "p-4 rounded-lg border bg-card-gradient",
              "hover:bg-card transition-colors"
            )}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Type</Label>
                  <Input
                    value={deliverable.type}
                    onChange={(e) => handleUpdateDeliverable(deliverable.id, { type: e.target.value })}
                    placeholder="e.g., Final Mix, Stems"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Due Date</Label>
                  <Input
                    type="date"
                    value={deliverable.dueDate}
                    onChange={(e) => handleUpdateDeliverable(deliverable.id, { dueDate: e.target.value })}
                  />
                </div>
              </div>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => handleRemoveDeliverable(deliverable.id)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="mt-4 space-y-2">
              <Label>Description</Label>
              <Textarea
                value={deliverable.description}
                onChange={(e) => handleUpdateDeliverable(deliverable.id, { description: e.target.value })}
                placeholder="Add any specific requirements or notes..."
                className="h-20"
              />
            </div>
          </div>
        ))}
      </div>

      <Button 
        variant="outline" 
        onClick={handleAddDeliverable}
        className="w-full"
      >
        <Plus className="h-4 w-4 mr-2" />
        Add Deliverable
      </Button>
    </div>
  );
}