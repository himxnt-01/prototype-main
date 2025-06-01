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
import { SyncRequest } from "../types";
import { cn } from "@/lib/utils";

interface SyncRequestActionsProps {
  request: SyncRequest;
  onAccept: () => void;
}

export function SyncRequestActions({ request, onAccept }: SyncRequestActionsProps) {
  const [showDeclineDialog, setShowDeclineDialog] = useState(false);

  const handleDecline = () => {
    // In a real app, this would make an API call
    console.log("Declining sync request:", request.id);
    setShowDeclineDialog(false);
  };

  return (
    <>
      <div className="flex items-center gap-2">
        <Button 
          className={cn(
            "bg-blue-600 hover:bg-blue-700",
            "text-white",
            "border-blue-700/50",
            "shadow-lg shadow-blue-900/20",
            "transition-all duration-300",
            "hover:shadow-xl hover:shadow-blue-900/30",
            "active:shadow-md"
          )}
          onClick={onAccept}
        >
          <Check className="h-4 w-4 mr-2" />
          Accept
        </Button>
        <Button 
          variant="outline"
          className={cn(
            "border-muted-foreground/20",
            "hover:bg-muted-foreground/5",
            "hover:border-muted-foreground/30",
            "transition-all duration-300"
          )}
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
              className={cn(
                "bg-muted-foreground/10 hover:bg-muted-foreground/20",
                "text-foreground",
                "border border-muted-foreground/20",
                "hover:border-muted-foreground/30",
                "transition-all duration-300"
              )}
            >
              Yes, Decline Request
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}