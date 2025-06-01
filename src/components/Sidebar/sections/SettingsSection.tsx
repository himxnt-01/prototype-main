import { Settings, BarChart3, Gamepad } from "lucide-react";
import { SubSection } from "../SubSection";
import { NavItem } from "../NavItem";

interface SettingsSectionProps {
  isCollapsed: boolean;
  currentPath: string;
}

export function SettingsSection({ isCollapsed, currentPath }: SettingsSectionProps) {
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
        path="/settings"
        isCollapsed={isCollapsed}
        isActive={currentPath === "/settings"}
      />
    </SubSection>
  );
}