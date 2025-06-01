import { TabList, TabTrigger } from "@/components/ui/custom-tabs";
import { MessageSquare, Link2, Users } from "lucide-react";

interface InboxTabsProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
}

const INBOX_TABS = [
  { id: "chats", label: "Chats", icon: MessageSquare },
  { id: "sync_requests", label: "Sync Requests", icon: Link2 },
  { id: "contacts", label: "Contacts", icon: Users }
] as const;

export function InboxTabs({ currentTab, onTabChange }: InboxTabsProps) {
  return (
    <TabList>
      {INBOX_TABS.map(({ id, label, icon: Icon }) => (
        <TabTrigger
          key={id}
          id={id}
          isActive={currentTab === id}
          onClick={() => onTabChange(id)}
          label={
            <div className="flex items-center gap-2">
              <Icon className="h-4 w-4" />
              {label}
            </div>
          }
        />
      ))}
    </TabList>
  );
}