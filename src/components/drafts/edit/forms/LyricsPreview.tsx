import { cn } from "@/lib/utils";

interface LyricsPreviewProps {
  content: string;
}

export function LyricsPreview({ content }: LyricsPreviewProps) {
  const formatLine = (line: string) => {
    // Skip empty lines
    if (!line.trim()) {
      return '<br/>';
    }

    // Handle bold text
    line = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    // Handle italic text
    line = line.replace(/_(.*?)_/g, '<em>$1</em>');
    
    // Handle centered text (lines starting with >)
    if (line.startsWith('> ')) {
      return `<div class="text-center">${line.slice(2)}</div>`;
    }
    
    // Handle list items
    if (line.startsWith('- ')) {
      return `<li class="ml-4">${line.slice(2)}</li>`;
    }
    
    // Wrap normal lines in paragraphs
    return `<p>${line}</p>`;
  };

  const formattedContent = content
    .split('\n')
    .map(formatLine)
    .join('');

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <div className="h-px flex-1 bg-border" />
        <span>Preview</span>
        <div className="h-px flex-1 bg-border" />
      </div>
      
      <div
        className={cn(
          "rounded-md bg-card p-4",
          "text-base leading-relaxed",
          "prose prose-invert max-w-none",
          "prose-p:my-1.5 prose-li:my-0"
        )}
        dangerouslySetInnerHTML={{ __html: formattedContent }}
      />
    </div>
  );
}