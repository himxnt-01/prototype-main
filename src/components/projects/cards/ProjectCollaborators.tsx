import { Avatar } from "@/components/ui/avatar";
import { Project } from "@/lib/projects";

interface ProjectCollaboratorsProps {
  collaborators: Project["collaborators"];
}

export function ProjectCollaborators({ collaborators }: ProjectCollaboratorsProps) {
  return (
    <div className="flex -space-x-2">
      {collaborators.map((collaborator) => (
        <Avatar key={collaborator.id} className="border-2 border-background">
          <img 
            src={collaborator.avatarUrl || `https://ui-avatars.com/api/?name=${collaborator.name}`}
            alt={collaborator.name}
          />
        </Avatar>
      ))}
    </div>
  );
}