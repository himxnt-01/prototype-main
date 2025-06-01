import { Button } from "@/components/ui/button";
import { Plus, FolderKanban } from "lucide-react";
import { ProjectsActions } from "./ProjectsActions";
import { useState } from "react";

export function ProjectsHeader() {
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  return (
    <div className="space-y-4 mb-6">
      <div className="flex items-center gap-4">
        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
          <FolderKanban className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-semibold">Projects</h1>
          <p className="text-sm text-muted-foreground">
            Manage your collaborative projects and sync opportunities
          </p>
        </div>
        <div className="flex-1" />
        <Button onClick={() => setIsCreateOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          New Project
        </Button>
      </div>
      <ProjectsActions />
    </div>
  );
}