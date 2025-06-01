import { Project } from "@/lib/projects";
import { useProjectsStore } from "@/lib/projects";
import { cn } from "@/lib/utils";
import { ProjectBadges } from "./cards/ProjectBadges";
import { ProjectProgress } from "./cards/ProjectProgress";
import { ProjectCollaborators } from "./cards/ProjectCollaborators";
import { ProjectDueDate } from "./cards/ProjectDueDate";
import { ProjectActions } from "./cards/ProjectActions";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const { selectProject } = useProjectsStore();

  return (
    <div 
      className={cn(
        "group relative rounded-lg overflow-hidden cursor-pointer",
        "border border-border bg-card-gradient hover:bg-card transition-colors"
      )}
      onClick={() => selectProject(project.id)}
    >
      <div className="p-4 space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h3 className="font-medium">{project.title}</h3>
              <ProjectBadges type={project.type} status={project.status} />
            </div>
            {project.description && (
              <p className="text-sm text-muted-foreground">{project.description}</p>
            )}
          </div>
          <ProjectActions />
        </div>

        <ProjectProgress progress={project.progress} />

        <div className="flex items-center justify-between">
          <ProjectCollaborators collaborators={project.collaborators} />
          {project.dueDate && <ProjectDueDate dueDate={project.dueDate} />}
        </div>
      </div>
    </div>
  );
}