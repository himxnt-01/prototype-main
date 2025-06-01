import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface WriterSearchProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelect: (writer: { name: string; email: string }) => void;
}

// Mock data - in a real app, this would come from your API
const MOCK_WRITERS = [
  { name: "John Smith", email: "john@example.com", role: "Composer" },
  { name: "Sarah Johnson", email: "sarah@example.com", role: "Lyricist" },
  { name: "Mike Wilson", email: "mike@example.com", role: "Producer" },
  { name: "Emily Brown", email: "emily@example.com", role: "Composer" },
];

export function WriterSearch({ open, onOpenChange, onSelect }: WriterSearchProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState(MOCK_WRITERS);

  const handleSearch = (value: string) => {
    setQuery(value);
    // In a real app, this would be an API call
    setResults(
      MOCK_WRITERS.filter(writer => 
        writer.name.toLowerCase().includes(value.toLowerCase()) ||
        writer.email.toLowerCase().includes(value.toLowerCase())
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
            placeholder="Search by name or email..."
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            className="pl-9"
          />
        </div>

        <ScrollArea className="h-[300px] -mx-6 px-6">
          <div className="space-y-2">
            {results.map((writer) => (
              <Button
                key={writer.email}
                variant="ghost"
                className="w-full justify-start h-auto py-3"
                onClick={() => onSelect(writer)}
              >
                <div className="text-left">
                  <div className="font-medium">{writer.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {writer.email} • {writer.role}
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