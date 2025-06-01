import { TableRow, TableHead } from "@/components/ui/table";

export function DraftsTableHeader() {
  return (
    <TableRow className="hover:bg-transparent">
      <TableHead className="w-12"></TableHead>
      <TableHead>Title</TableHead>
      <TableHead>Phase</TableHead>
      <TableHead>Progress</TableHead>
      <TableHead>Last Modified</TableHead>
      <TableHead className="w-12"></TableHead>
    </TableRow>
  );
}