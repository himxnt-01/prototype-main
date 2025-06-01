import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ProjectData } from "./types";

interface ProjectBasicsProps {
  data: ProjectData;
  onChange: (data: ProjectData) => void;
}

export function ProjectBasics({ data, onChange }: ProjectBasicsProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Project Title</Label>
          <Input 
            value={data.title}
            onChange={(e) => onChange({ ...data, title: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label>Due Date</Label>
          <Input 
            type="date"
            value={data.dueDate.split('T')[0]}
            onChange={(e) => onChange({ ...data, dueDate: e.target.value })}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Description</Label>
        <Textarea 
          value={data.description}
          onChange={(e) => onChange({ ...data, description: e.target.value })}
          className="h-24"
        />
      </div>
    </div>
  );
}