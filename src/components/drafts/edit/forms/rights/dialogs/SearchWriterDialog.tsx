import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search } from "lucide-react";
import { Writer } from "@/types/draft";

interface SearchWriterDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelect: (writer: Writer) => void;
}

// Mock data - in a real app, this would come from an API
const MOCK_WRITERS = [
  { name: "John Smith", role: "Composer", share: 50 },
  { name: "Sarah Johnson", role: "Lyricist", share: 50 },
  { name: "Mike Wilson", role: "Producer", share: 25 },
  { name: "Emily Brown", role: "Composer", share: 25 }
];

export function SearchWriterDialog({ open, onOpenChange, onSelect }: SearchWriterDialogProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState(MOCK_WRITERS);

  const handleSearch = (value: string) => {
    setQuery(value);
    // In a real app, this would be an API call
    setResults(
      MOCK_WRITERS.filter(writer => 
        writer.name.toLowerCase().includes(value.toLowerCase())
      )
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Search Writers</DialogTitle>
        </DialogHeader>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by name..."
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            className="pl-9"
          />
        </div>

        <ScrollArea className="h-[300px] -mx-6 px-6">
          <div className="space-y-2">
            {results.map((writer) => (
              <Button
                key={writer.name}
                variant="ghost"
                className="w-full justify-start h-auto py-3"
                onClick={() => {
                  onSelect(writer);
                  onOpenChange(false);
                }}
              >
                <div className="text-left">
                  <div className="font-medium">{writer.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {writer.role}
                  </div>
                </div>
              </Button>
            ))}

            {results.length === 0 && (
              <div className="text-sm text-muted-foreground text-center py-4">
                No writers found matching "{query}"
              </div>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
