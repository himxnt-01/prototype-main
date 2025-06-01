import { ScrollArea } from "@/components/ui/scroll-area";
import { SyncRequestCard } from "./cards/SyncRequestCard";
import { REQUESTS } from "./data/requests";
import { SyncRequest } from "./types";

interface LicensingRequestsProps {
  onAcceptRequest: (request: SyncRequest) => void;
}

export function LicensingRequests({ onAcceptRequest }: LicensingRequestsProps) {
  return (
    <ScrollArea className="h-[calc(100vh-20rem)]">
      <div className="space-y-4">
        {REQUESTS.map((request) => (
          <SyncRequestCard 
            key={request.id} 
            request={request} 
            onAccept={() => onAcceptRequest(request)}
          />
        ))}
      </div>
    </ScrollArea>
  );
}