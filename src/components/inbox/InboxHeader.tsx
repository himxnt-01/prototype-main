
import { Button } from "@/components/ui/button";
import { Plus, Inbox } from "lucide-react";
import { InboxActions } from "./InboxActions";
import { ComposeMessageDialog } from "./ComposeMessageDialog";
import { useState } from "react";

export function InboxHeader() {
  const [isComposeOpen, setIsComposeOpen] = useState(false);

  return (
    <div className="space-y-4 mb-6">
      <div className="flex items-center gap-4">
        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
          <Inbox className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-semibold">Inbox</h1>
          <p className="text-sm text-muted-foreground">
            Manage your messages, sync requests, and shared files
          </p>
        </div>
        <div className="flex-1" />
        <Button onClick={() => setIsComposeOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          New Message
        </Button>
      </div>
      <InboxActions />

      <ComposeMessageDialog 
        open={isComposeOpen}
        onOpenChange={setIsComposeOpen}
      />
    </div>
  );
}
