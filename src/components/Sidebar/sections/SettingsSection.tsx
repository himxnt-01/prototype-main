import { Settings, BarChart3, Gamepad } from "lucide-react";
import { SubSection } from "../SubSection";
import { NavItem } from "../NavItem";
import { useProfileNavigation } from "@/hooks/useProfileNavigation";

interface SettingsSectionProps {
  isCollapsed: boolean;
  currentPath: string;
}

export function SettingsSection({ isCollapsed, currentPath }: SettingsSectionProps) {
  const { navigateToProfile } = useProfileNavigation();

  return (
    <SubSection title="Tools" icon={Settings} isCollapsed={isCollapsed}>
      <NavItem
        icon={BarChart3}
        label="Analytics"
        path="/analytics"
        isCollapsed={isCollapsed}
        isActive={currentPath === "/analytics"}
      />
      <NavItem
        icon={Gamepad}
        label="Space Game"
        path="/game"
        isCollapsed={isCollapsed}
        isActive={currentPath === "/game"}
      />
      <NavItem
        icon={Settings}
        label="Profile & Settings"
        onClick={navigateToProfile}
        isCollapsed={isCollapsed}
        isActive={currentPath.includes("/profile")}
      />
    </SubSection>
  );
}