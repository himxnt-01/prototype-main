import { useState } from "react";
import { InboxHeader } from "@/components/inbox/InboxHeader";
import { InboxList } from "@/components/inbox/InboxList";
import { MessageDetails } from "@/components/inbox/MessageDetails";
import { ContactDirectory } from "@/components/inbox/ContactDirectory";
import { InboxTabs } from "@/components/inbox/InboxTabs";
import { useInboxStore } from "@/lib/inbox";
import { cn } from "@/lib/utils";

export function InboxPage() {
  const { isDetailsOpen } = useInboxStore();
  const [currentTab, setCurrentTab] = useState("chats");

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col">
      <InboxHeader />
      <div className="mb-6">
        <InboxTabs currentTab={currentTab} onTabChange={setCurrentTab} />
      </div>

      <div className="flex-1 flex gap-6 min-h-0">
        <div className={cn(
          "flex-1 min-w-0 transition-all duration-300",
          isDetailsOpen && "lg:max-w-[calc(100%-500px)]"
        )}>
          {currentTab === "contacts" ? (
            <ContactDirectory />
          ) : (
            <InboxList filter={currentTab === "sync_requests" ? "sync_request" : undefined} />
          )}
        </div>

        {isDetailsOpen && (
          <div className="hidden lg:block w-[500px] h-full">
            <div className="rounded-lg border border-border bg-card-gradient shadow-md h-full overflow-hidden">
              <MessageDetails />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}