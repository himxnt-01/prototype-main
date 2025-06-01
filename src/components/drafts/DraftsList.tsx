import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DraftRow } from "./DraftRow";
import { useDraftsStore } from "@/lib/drafts";

export function DraftsList() {
  const { drafts } = useDraftsStore();

  return (
    <div className="rounded-lg bg-card/50 shadow-sm overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent border-b border-border/50">
            <TableHead className="w-12"></TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Progress</TableHead>
            <TableHead>Last Modified</TableHead>
            <TableHead className="w-12"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {drafts.map((draft, index) => (
            <DraftRow 
              key={draft.id} 
              draft={draft} 
              index={index}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}