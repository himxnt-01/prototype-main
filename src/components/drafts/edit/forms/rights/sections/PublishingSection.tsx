import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, X } from "lucide-react";
import { TERRITORIES } from "@/data/constants";

interface Publisher {
  name: string;
  share: number;
  territories?: string[];
}

interface PublishingSectionProps {
  publishers: Publisher[];
  onChange: (publishers: Publisher[]) => void;
}

export function PublishingSection({ publishers, onChange }: PublishingSectionProps) {
  const handleAddPublisher = () => {
    onChange([...publishers, { name: "", share: 100 }]);
  };

  const handleRemovePublisher = (index: number) => {
    const newPublishers = [...publishers];
    newPublishers.splice(index, 1);
    onChange(newPublishers);
  };

  const handleUpdatePublisher = (index: number, field: keyof Publisher, value: any) => {
    const newPublishers = publishers.map((pub, i) => 
      i === index ? { ...pub, [field]: value } : pub
    );
    onChange(newPublishers);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <h3 className="text-lg font-medium">Publishing Rights</h3>
        <p className="text-sm text-muted-foreground">
          Add publishing companies and their respective shares
        </p>
      </div>

      <div className="space-y-3">
        {publishers.map((publisher, index) => (
          <div 
            key={index}
            className="flex items-start gap-3 p-3 rounded-lg border bg-card-gradient"
          >
            <div className="flex-1 space-y-3">
              <div className="grid grid-cols-[1fr,120px] gap-3">
                <Input
                  value={publisher.name}
                  onChange={(e) => handleUpdatePublisher(index, "name", e.target.value)}
                  placeholder="Publisher name"
                />
                <Input
                  type="number"
                  value={publisher.share}
                  onChange={(e) => handleUpdatePublisher(index, "share", parseInt(e.target.value))}
                  placeholder="Share %"
                />
              </div>
              
              <Select
                value={publisher.territories?.[0]}
                onValueChange={(value) => handleUpdatePublisher(index, "territories", [value])}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select territory" />
                </SelectTrigger>
                <SelectContent>
                  {TERRITORIES.map((territory) => (
                    <SelectItem key={territory} value={territory}>
                      {territory}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => handleRemovePublisher(index)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}

        <Button
          variant="outline"
          size="sm"
          className="w-full"
          onClick={handleAddPublisher}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Publisher
        </Button>
      </div>
    </div>
  );
}