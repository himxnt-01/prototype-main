import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { SyncRequestCard } from "./cards/SyncRequestCard";
import { AcceptRequestPage } from "./pages/AcceptRequestPage";
import { REQUESTS } from "./data/requests";
import { SyncRequest } from "./types";
import { cn } from "@/lib/utils";

export function SyncRequestsSection() {
  const [selectedRequest, setSelectedRequest] = useState<SyncRequest | null>(null);

  const handleAcceptRequest = (request: SyncRequest) => {
    setSelectedRequest(request);
  };

  return (
    <div className="space-y-6">
      {selectedRequest ? (
        <AcceptRequestPage 
          request={selectedRequest}
          onBack={() => setSelectedRequest(null)}
        />
      ) : (
        <>
          <div className="flex items-center gap-4">
            <div className="flex-1 max-w-xl relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search requests..." className="pl-9" />
            </div>
          </div>

          <ScrollArea className="h-[calc(100vh-20rem)]">
            <div className="space-y-4">
              {REQUESTS.map((request) => (
                <SyncRequestCard 
                  key={request.id} 
                  request={request} 
                  onAccept={() => handleAcceptRequest(request)}
                />
              ))}
            </div>
          </ScrollArea>
        </>
      )}
    </div>
  );
}
