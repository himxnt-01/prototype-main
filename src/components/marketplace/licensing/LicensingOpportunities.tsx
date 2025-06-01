import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function LicensingOpportunities() {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold">Licensing Opportunities</h2>
        <Button variant="ghost" size="sm">View All</Button>
      </div>

      <div className="space-y-4">
        {OPPORTUNITIES.map((opportunity) => (
          <div 
            key={opportunity.id}
            className="flex items-center justify-between p-4 rounded-lg border bg-card-gradient hover:bg-card transition-colors"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <div className="font-medium">{opportunity.title}</div>
                <Badge variant="secondary" className={opportunity.urgent ? "bg-red-500/10 text-red-500" : ""}>
                  {opportunity.urgent ? "Urgent" : opportunity.type}
                </Badge>
              </div>
              <div className="text-sm text-muted-foreground">
                Budget: ${opportunity.budget.toLocaleString()}
              </div>
            </div>
            <Button variant="ghost" size="sm">
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
    </Card>
  );
}

const OPPORTUNITIES = [
  {
    id: 1,
    title: "TV Commercial - Sports Brand",
    type: "Advertising",
    budget: 15000,
    urgent: true
  },
  {
    id: 2,
    title: "Independent Film Soundtrack",
    type: "Film",
    budget: 8000,
    urgent: false
  },
  {
    id: 3,
    title: "Mobile Game Background Music",
    type: "Gaming",
    budget: 5000,
    urgent: false
  },
  {
    id: 4,
    title: "YouTube Creator Music Library",
    type: "Content",
    budget: 3000,
    urgent: false
  }
];
