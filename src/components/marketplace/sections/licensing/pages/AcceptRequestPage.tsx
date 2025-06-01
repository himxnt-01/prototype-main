import { useState } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { AlertTriangle, ArrowLeft } from "lucide-react";
import { SyncRequest } from "../types";
import { StepIndicator } from "./steps/StepIndicator";
import { RequestOverview } from "./steps/RequestOverview";
import { ProjectSetup } from "./steps/ProjectSetup";
import { ReviewSubmit } from "./steps/ReviewSubmit";
import { NegotiationTerms } from "../sections/budget/BudgetNegotiationDialog";
import { cn } from "@/lib/utils";

const STEPS = [
  { id: "overview", label: "Request Overview" },
  { id: "setup", label: "Project Setup" },
  { id: "review", label: "Review & Submit" }
] as const;

type Step = typeof STEPS[number]["id"];

interface AcceptRequestPageProps {
  request: SyncRequest;
  onBack: () => void;
}

export function AcceptRequestPage({ request, onBack }: AcceptRequestPageProps) {
  const [currentStep, setCurrentStep] = useState<Step>("overview");
  const [negotiationTerms, setNegotiationTerms] = useState<NegotiationTerms>();
  const [projectData, setProjectData] = useState({
    title: request.title,
    description: request.brief.description,
    dueDate: request.deadline.submission,
    team: [
      {
        id: Date.now(),
        name: request.client.name,
        email: "client@example.com",
        role: "Client",
        avatarUrl: request.client.avatar
      }
    ],
    deliverables: [],
    milestones: [],
    syncDetails: {
      genre: request.brief.style[0] || "",
      mood: request.brief.mood,
      tempo: "120",
      key: "",
      duration: "3:00",
      stems: request.requirements.stems,
      customEdits: request.requirements.custom_edits || false,
      loopPoints: request.requirements.loop_points || false
    }
  });

  const handleNegotiate = (terms: NegotiationTerms) => {
    setNegotiationTerms(terms);
    setCurrentStep("review");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={onBack}
            className="h-8 w-8"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h2 className="text-lg font-semibold">Accept Sync Request</h2>
            <p className="text-sm text-muted-foreground">
              {currentStep === "overview" && "Review request details"}
              {currentStep === "setup" && "Configure project settings"}
              {currentStep === "review" && "Review and submit"}
            </p>
          </div>
        </div>

        <StepIndicator steps={STEPS} currentStep={currentStep} />
      </div>

      {/* Negotiation Alert */}
      {negotiationTerms && (
        <Alert 
          variant="warning" 
          className={cn(
            "bg-amber-500/10 text-amber-600 border-amber-500/20",
            "animate-in fade-in-50 duration-300"
          )}
        >
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            You have proposed changes to the original terms. These changes will need to be reviewed and approved by the client.
          </AlertDescription>
        </Alert>
      )}

      {/* Content */}
      <div className="min-h-[calc(100vh-16rem)]">
        {currentStep === "overview" && (
          <RequestOverview 
            request={request}
            onNext={() => setCurrentStep("setup")}
            onNegotiate={handleNegotiate}
            onBack={onBack}
          />
        )}

        {currentStep === "setup" && (
          <ProjectSetup
            request={request}
            data={projectData}
            onChange={setProjectData}
            onBack={() => setCurrentStep("overview")}
            onNext={() => setCurrentStep("review")}
          />
        )}

        {currentStep === "review" && (
          <ReviewSubmit
            request={request}
            projectData={projectData}
            negotiationTerms={negotiationTerms}
            onBack={() => setCurrentStep("setup")}
            onSubmit={onBack}
          />
        )}
      </div>
    </div>
  );
}
