import { Badge } from "@/components/ui/badge";

interface TagsTabProps {
  tags: string[];
}

export function TagsTab({ tags }: TagsTabProps) {
  return (
    <div className="flex flex-wrap gap-2 p-4">
      {tags.map((tag) => (
        <Badge key={tag} variant="secondary">
          {tag}
        </Badge>
      ))}
    </div>
  );
}