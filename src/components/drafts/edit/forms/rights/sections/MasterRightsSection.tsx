import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, X } from "lucide-react";

interface MasterOwner {
  name: string;
  share: number;
}

interface MasterRightsSectionProps {
  masterOwners: MasterOwner[];
  onChange: (masterOwners: MasterOwner[]) => void;
}

export function MasterRightsSection({ masterOwners, onChange }: MasterRightsSectionProps) {
  const handleAddOwner = () => {
    onChange([...masterOwners, { name: "", share: 100 }]);
  };

  const handleRemoveOwner = (index: number) => {
    const newOwners = [...masterOwners];
    newOwners.splice(index, 1);
    onChange(newOwners);
  };

  const handleUpdateOwner = (index: number, field: keyof MasterOwner, value: any) => {
    const newOwners = masterOwners.map((owner, i) => 
      i === index ? { ...owner, [field]: value } : owner
    );
    onChange(newOwners);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <h3 className="text-lg font-medium">Master Rights</h3>
        <p className="text-sm text-muted-foreground">
          Add master rights owners and their respective shares
        </p>
      </div>

      <div className="space-y-3">
        {masterOwners.map((owner, index) => (
          <div 
            key={index}
            className="flex items-center gap-3 p-3 rounded-lg border bg-card-gradient"
          >
            <div className="flex-1 grid grid-cols-[1fr,120px] gap-3">
              <Input
                value={owner.name}
                onChange={(e) => handleUpdateOwner(index, "name", e.target.value)}
                placeholder="Owner name"
              />
              <Input
                type="number"
                value={owner.share}
                onChange={(e) => handleUpdateOwner(index, "share", parseInt(e.target.value))}
                placeholder="Share %"
              />
            </div>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => handleRemoveOwner(index)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}

        <Button
          variant="outline"
          size="sm"
          className="w-full"
          onClick={handleAddOwner}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Owner
        </Button>
      </div>
    </div>
  );
}