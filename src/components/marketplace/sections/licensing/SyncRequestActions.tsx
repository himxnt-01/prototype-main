import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
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

interface SyncRequestActionsProps {
  request: {
    id: number;
    title: string;
    client: {
      name: string;
      company: string;
    };
    budget: {
      amount: number;
      currency: string;
    };
  };
}

export function SyncRequestActions({ request }: SyncRequestActionsProps) {
  const [showDeclineDialog, setShowDeclineDialog] = useState(false);

  const handleAccept = () => {
    // In a real app, this would make an API call
    console.log("Accepting sync request:", request.id);
  };

  const handleDecline = () => {
    // In a real app, this would make an API call
    console.log("Declining sync request:", request.id);
    setShowDeclineDialog(false);
  };

  return (
    <>
      <div className="flex items-center gap-2">
        <Button 
          className="bg-green-600 hover:bg-green-700"
          onClick={handleAccept}
        >
          <Check className="h-4 w-4 mr-2" />
          Accept
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
              Are you sure you want to decline the sync request from {request.client.name} ({request.client.company}) for "{request.title}"? 
              This opportunity is worth ${request.budget.amount.toLocaleString()} {request.budget.currency}.
              <br /><br />
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDecline}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Yes, Decline Request
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}