import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Draft } from "@/types/draft";

interface EditStatusTabProps {
  status: Draft["status"];
  onChange: (status: Draft["status"]) => void;
}

export function EditStatusTab({ status, onChange }: EditStatusTabProps) {
  const handleChange = (key: keyof Draft["status"], value: any) => {
    onChange({ ...status, [key]: value });
  };

  return (
    <div className="space-y-4 py-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Phase</Label>
          <Select
            value={status.phase}
            onValueChange={(value) => handleChange("phase", value)}
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
            onValueChange={(value) => handleChange("clearance", value)}
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
      </div>
    </div>
  );
}