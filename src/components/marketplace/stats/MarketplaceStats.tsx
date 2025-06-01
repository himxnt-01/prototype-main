import { Card } from "@/components/ui/card";
import { ArrowUpRight, ArrowDownRight, DollarSign, Music, Users, Zap } from "lucide-react";

export function MarketplaceStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="h-10 w-10 rounded-full bg-green-500/10 flex items-center justify-center">
            <DollarSign className="h-5 w-5 text-green-500" />
          </div>
          <ArrowUpRight className="h-4 w-4 text-green-500" />
        </div>
        <div>
          <div className="text-2xl font-semibold">$24,500</div>
          <div className="text-sm text-muted-foreground">Revenue this month</div>
        </div>
      </Card>

      <Card className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="h-10 w-10 rounded-full bg-blue-500/10 flex items-center justify-center">
            <Music className="h-5 w-5 text-blue-500" />
          </div>
          <ArrowUpRight className="h-4 w-4 text-green-500" />
        </div>
        <div>
          <div className="text-2xl font-semibold">156</div>
          <div className="text-sm text-muted-foreground">Active listings</div>
        </div>
      </Card>

      <Card className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="h-10 w-10 rounded-full bg-yellow-500/10 flex items-center justify-center">
            <Users className="h-5 w-5 text-yellow-500" />
          </div>
          <ArrowDownRight className="h-4 w-4 text-red-500" />
        </div>
        <div>
          <div className="text-2xl font-semibold">2,450</div>
          <div className="text-sm text-muted-foreground">Monthly visitors</div>
        </div>
      </Card>

      <Card className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="h-10 w-10 rounded-full bg-purple-500/10 flex items-center justify-center">
            <Zap className="h-5 w-5 text-purple-500" />
          </div>
          <ArrowUpRight className="h-4 w-4 text-green-500" />
        </div>
        <div>
          <div className="text-2xl font-semibold">85%</div>
          <div className="text-sm text-muted-foreground">Licensing success rate</div>
        </div>
      </Card>
    </div>
  );
}
