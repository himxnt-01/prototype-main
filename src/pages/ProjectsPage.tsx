import { ProjectsHeader } from "@/components/projects/ProjectsHeader";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { useProjectsStore } from "@/lib/projects";

export function ProjectsPage() {
  const { projects } = useProjectsStore();

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col">
      <ProjectsHeader />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}