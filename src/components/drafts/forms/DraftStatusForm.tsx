import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Draft } from "@/types/draft";

interface DraftStatusFormProps {
  status: Draft["status"];
  onChange: (status: Draft["status"]) => void;
}

export function DraftStatusForm({ status, onChange }: DraftStatusFormProps) {
  const handleChange = (key: keyof Draft["status"], value: any) => {
    onChange({ ...status, [key]: value });
  };

  const handleFlagChange = (flag: keyof NonNullable<Draft["status"]["flags"]>, value: boolean) => {
    const newFlags = { ...status.flags, [flag]: value };
    handleChange("flags", newFlags);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4">Status & Progress</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Phase</Label>
            <Select
              value={status.phase}
              onValueChange={(value: Draft["status"]["phase"]) => handleChange("phase", value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recording">Recording</SelectItem>
                <SelectItem value="editing">Editing</SelectItem>
                <SelectItem value="mixing">Mixing</SelectItem>
                <SelectItem value="mastering">Mastering</SelectItem>
                <SelectItem value="metadata">Metadata</SelectItem>
                <SelectItem value="legal_review">Legal Review</SelectItem>
                <SelectItem value="quality_control">Quality Control</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Clearance Status</Label>
            <Select
              value={status.clearance}
              onValueChange={(value: Draft["status"]["clearance"]) => handleChange("clearance", value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="not_started">Not Started</SelectItem>
                <SelectItem value="pending_submission">Pending Submission</SelectItem>
                <SelectItem value="under_review">Under Review</SelectItem>
                <SelectItem value="requires_revision">Requires Revision</SelectItem>
                <SelectItem value="cleared">Cleared</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="col-span-2 space-y-4">
            <Label>Flags</Label>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="highPriority" className="cursor-pointer">High Priority</Label>
                <Switch
                  id="highPriority"
                  checked={status.flags?.isHighPriority || false}
                  onCheckedChange={(checked) => handleFlagChange("isHighPriority", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="needsMetadata" className="cursor-pointer">Needs Metadata</Label>
                <Switch
                  id="needsMetadata"
                  checked={status.flags?.needsMetadata || false}
                  onCheckedChange={(checked) => handleFlagChange("needsMetadata", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="needsRightsClearance" className="cursor-pointer">Needs Rights Clearance</Label>
                <Switch
                  id="needsRightsClearance"
                  checked={status.flags?.needsRightsClearance || false}
                  onCheckedChange={(checked) => handleFlagChange("needsRightsClearance", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="needsQualityCheck" className="cursor-pointer">Needs Quality Check</Label>
                <Switch
                  id="needsQualityCheck"
                  checked={status.flags?.needsQualityCheck || false}
                  onCheckedChange={(checked) => handleFlagChange("needsQualityCheck", checked)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}