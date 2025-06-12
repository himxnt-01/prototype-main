import { Settings, BarChart3, Gamepad } from "lucide-react";
import { SubSection } from "../SubSection";
import { NavItem } from "../NavItem";
import { useLocation, useNavigate } from "react-router-dom";

interface SettingsSectionProps {
  isCollapsed: boolean;
}

export function SettingsSection({ isCollapsed }: SettingsSectionProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

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
        path="/profile"
        isCollapsed={isCollapsed}
        isActive={currentPath.includes("/profile")}
      />
    </SubSection>
  );
}