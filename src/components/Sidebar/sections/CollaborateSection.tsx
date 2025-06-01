import { Users2, Store, FolderKanban, Inbox } from "lucide-react";
import { SubSection } from "../SubSection";
import { NavItem } from "../NavItem";
import { Badge } from "@/components/ui/badge";

interface CollaborateSectionProps {
  isCollapsed: boolean;
  currentPath: string;
}

export function CollaborateSection({ isCollapsed, currentPath }: CollaborateSectionProps) {
  return (
    <SubSection title="Collaborate" icon={Users2} isCollapsed={isCollapsed}>
      <NavItem
        icon={Store}
        label={
          <div className="flex items-center gap-2">
            Marketplace
            <Badge 
              variant="secondary" 
              className="bg-primary/20 text-xs font-medium px-1.5 h-4"
            >
              BETA
            </Badge>
          </div>
        }
        path="/marketplace"
        isCollapsed={isCollapsed}
        isActive={currentPath === "/marketplace"}
      />
      <NavItem
        icon={FolderKanban}
        label="Projects"
        path="/projects"
        isCollapsed={isCollapsed}
        isActive={currentPath === "/projects"}
      />
      <NavItem
        icon={Inbox}
        label="Inbox"
        path="/inbox"
        isCollapsed={isCollapsed}
        isActive={currentPath === "/inbox"}
      />
    </SubSection>
  );
}