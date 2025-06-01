import { Card } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SyncRequestHeader } from "./SyncRequestHeader";
import { SyncRequestBrief } from "../sections/SyncRequestBrief";
import { SyncRequestDetails } from "../sections/SyncRequestDetails";
import { SyncRequestRequirements } from "../sections/SyncRequestRequirements";
import { SyncRequest } from "../types";
import { cn } from "@/lib/utils";

interface SyncRequestCardProps {
  request: SyncRequest;
  onAccept: () => void;
}

export function SyncRequestCard({ request, onAccept }: SyncRequestCardProps) {
  return (
    <Card className={cn(
      "overflow-hidden",
      "bg-gradient-to-b from-card/50 to-background/50",
      "hover:from-card/70 hover:to-background/70",
      "transition-all duration-300",
      "group"
    )}>
      <SyncRequestHeader request={request} onAccept={onAccept} />
      
      <Accordion type="single" collapsible className="px-6 pb-6 mt-2">
        <AccordionItem value="brief" className="border-none">
          <AccordionTrigger className={cn(
            "py-3 text-sm font-medium",
            "hover:bg-muted/20 rounded-md px-2 -mx-2",
            "transition-colors duration-200",
            "data-[state=open]:text-primary"
          )}>
            Music Brief
          </AccordionTrigger>
          <AccordionContent className="pt-3">
            <SyncRequestBrief brief={request.brief} />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="details" className="border-none">
          <AccordionTrigger className={cn(
            "py-3 text-sm font-medium",
            "hover:bg-muted/20 rounded-md px-2 -mx-2",
            "transition-colors duration-200",
            "data-[state=open]:text-primary"
          )}>
            Project Details
          </AccordionTrigger>
          <AccordionContent className="pt-3">
            <SyncRequestDetails 
              budget={request.budget}
              usage={request.usage}
              deadline={request.deadline}
            />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="requirements" className="border-none">
          <AccordionTrigger className={cn(
            "py-3 text-sm font-medium",
            "hover:bg-muted/20 rounded-md px-2 -mx-2",
            "transition-colors duration-200",
            "data-[state=open]:text-primary"
          )}>
            Technical Requirements
          </AccordionTrigger>
          <AccordionContent className="pt-3">
            <SyncRequestRequirements requirements={request.requirements} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Card>
  );
}