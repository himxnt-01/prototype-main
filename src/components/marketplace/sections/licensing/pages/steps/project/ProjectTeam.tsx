import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar } from "@/components/ui/avatar";
import { Plus, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProjectTeamProps {
  data: {
    team: Array<{
      id: number;
      name: string;
      email: string;
      role: string;
      avatarUrl?: string;
    }>;
  };
  onChange: (data: any) => void;
}

const ROLES = [
  "Project Manager",
  "Music Producer",
  "Composer",
  "Sound Designer",
  "Mix Engineer",
  "Mastering Engineer",
  "Music Supervisor",
  "Legal/Licensing",
  "Client"
] as const;

export function ProjectTeam({ data, onChange }: ProjectTeamProps) {
  const handleAddMember = () => {
    onChange({
      ...data,
      team: [
        ...data.team,
        {
          id: Date.now(),
          name: "",
          email: "",
          role: "Project Manager"
        }
      ]
    });
  };

  const handleRemoveMember = (id: number) => {
    onChange({
      ...data,
      team: data.team.filter(member => member.id !== id)
    });
  };

  const handleUpdateMember = (id: number, updates: Partial<typeof data.team[0]>) => {
    onChange({
      ...data,
      team: data.team.map(member =>
        member.id === id ? { ...member, ...updates } : member
      )
    });
  };

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        {data.team.map((member) => (
          <div 
            key={member.id}
            className={cn(
              "flex items-center gap-3 p-3 rounded-lg",
              "bg-background/50 hover:bg-background/70",
              "transition-colors"
            )}
          >
            <Avatar className="h-10 w-10">
              {member.avatarUrl && (
                <img 
                  src={member.avatarUrl} 
                  alt={member.name}
                  className="object-cover"
                />
              )}
            </Avatar>
            <div className="flex-1 grid grid-cols-3 gap-2">
              <Input
                placeholder="Name"
                value={member.name}
                onChange={(e) => handleUpdateMember(member.id, { name: e.target.value })}
              />
              <Input
                placeholder="Email"
                type="email"
                value={member.email}
                onChange={(e) => handleUpdateMember(member.id, { email: e.target.value })}
              />
              <Select
                value={member.role}
                onValueChange={(value) => handleUpdateMember(member.id, { role: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {ROLES.map((role) => (
                    <SelectItem key={role} value={role}>
                      {role}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {member.role !== "Client" && (
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => handleRemoveMember(member.id)}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        ))}
      </div>

      <Button 
        variant="outline" 
        onClick={handleAddMember}
        className="w-full"
      >
        <Plus className="h-4 w-4 mr-2" />
        Add Team Member
      </Button>
    </div>
  );
}