import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import { useInboxStore } from "@/lib/inbox";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useState } from "react";

interface SyncRequestActionsProps {
  messageId: number;
}

export function SyncRequestActions({ messageId }: SyncRequestActionsProps) {
  const [showDeclineDialog, setShowDeclineDialog] = useState(false);
  const { updateSyncRequestStatus } = useInboxStore();

  const handleAccept = () => {
    updateSyncRequestStatus(messageId, "accepted");
  };

  const handleDecline = () => {
    updateSyncRequestStatus(messageId, "rejected");
    setShowDeclineDialog(false);
  };

  return (
    <>
      <div className="flex items-center gap-2">
        <Button onClick={handleAccept} className="bg-green-600 hover:bg-green-700">
          <Check className="h-4 w-4 mr-2" />
          Accept Request
        </Button>
        <Button 
          variant="destructive" 
          onClick={() => setShowDeclineDialog(true)}
        >
          <X className="h-4 w-4 mr-2" />
          Decline
        </Button>
      </div>

      <AlertDialog open={showDeclineDialog} onOpenChange={setShowDeclineDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Decline Sync Request</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to decline this sync request? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDecline}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Decline Request
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}