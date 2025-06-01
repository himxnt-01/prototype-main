import { FileStack, Upload, PenTool } from "lucide-react";
import { SubSection } from "../SubSection";
import { NavItem } from "../NavItem";

interface DraftsSectionProps {
  isCollapsed: boolean;
  currentPath: string;
}

export function DraftsSection({ isCollapsed, currentPath }: DraftsSectionProps) {
  return (
    <SubSection title="Drafts" icon={FileStack} isCollapsed={isCollapsed}>
      <NavItem
        icon={Upload}
        label="Upload"
        path="/upload"
        isCollapsed={isCollapsed}
        isActive={currentPath === "/upload"}
      />
      <NavItem
        icon={PenTool}
        label="Drafts"
        path="/drafts"
        isCollapsed={isCollapsed}
        isActive={currentPath === "/drafts"}
      />
    </SubSection>
  );
}