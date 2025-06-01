import { CheckCircle, Music, ListMusic, Disc, Mic2 } from "lucide-react";
import { SubSection } from "../SubSection";
import { NavItem } from "../NavItem";

interface LibrarySectionProps {
  isCollapsed: boolean;
  currentPath: string;
}

export function LibrarySection({ isCollapsed, currentPath }: LibrarySectionProps) {
  return (
    <SubSection title="Library" icon={CheckCircle} isCollapsed={isCollapsed}>
      <NavItem
        icon={Music}
        label="Tracks"
        path="/tracks"
        isCollapsed={isCollapsed}
        isActive={currentPath === "/tracks"}
      />
      <NavItem
        icon={ListMusic}
        label="Playlists"
        path="/playlists"
        isCollapsed={isCollapsed}
        isActive={currentPath === "/playlists"}
      />
      <NavItem
        icon={Disc}
        label="Albums"
        path="/albums"
        isCollapsed={isCollapsed}
        isActive={currentPath === "/albums"}
      />
      <NavItem
        icon={Mic2}
        label="Artists"
        path="/artists"
        isCollapsed={isCollapsed}
        isActive={currentPath === "/artists"}
      />
    </SubSection>
  );
}