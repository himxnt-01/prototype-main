import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface LyricsOptionsProps {
  hasLyrics: boolean;
  language?: string;
  explicit?: boolean;
  onHasLyricsChange: (value: boolean) => void;
  onLanguageChange?: (value: string) => void;
  onExplicitChange?: (value: boolean) => void;
}

export function LyricsOptions({
  hasLyrics,
  language,
  explicit,
  onHasLyricsChange,
  onLanguageChange,
  onExplicitChange,
}: LyricsOptionsProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Checkbox
          id="hasLyrics"
          checked={hasLyrics}
          onCheckedChange={onHasLyricsChange}
        />
        <Label htmlFor="hasLyrics">This track has lyrics</Label>
      </div>

      {hasLyrics && onLanguageChange && onExplicitChange && (
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Language</Label>
            <Select value={language} onValueChange={onLanguageChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="es">Spanish</SelectItem>
                <SelectItem value="fr">French</SelectItem>
                <SelectItem value="de">German</SelectItem>
                <SelectItem value="it">Italian</SelectItem>
                <SelectItem value="pt">Portuguese</SelectItem>
                <SelectItem value="ja">Japanese</SelectItem>
                <SelectItem value="ko">Korean</SelectItem>
                <SelectItem value="zh">Chinese</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Content Rating</Label>
            <div className="flex items-center gap-2">
              <Checkbox
                id="explicit"
                checked={explicit}
                onCheckedChange={onExplicitChange}
              />
              <Label htmlFor="explicit">Contains explicit content</Label>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}