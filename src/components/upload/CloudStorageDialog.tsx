import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Cloud, HardDrive, Database } from "lucide-react";

interface CloudStorageDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CloudStorageDialog({ open, onOpenChange }: CloudStorageDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Import from Cloud Storage</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="dropbox">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="dropbox">Dropbox</TabsTrigger>
            <TabsTrigger value="gdrive">Google Drive</TabsTrigger>
            <TabsTrigger value="box">Box</TabsTrigger>
          </TabsList>
          
          <TabsContent value="dropbox" className="space-y-4">
            <div className="flex flex-col items-center gap-4 py-8">
              <Cloud className="h-12 w-12 text-muted-foreground" />
              <Button>Connect to Dropbox</Button>
            </div>
          </TabsContent>

          <TabsContent value="gdrive" className="space-y-4">
            <div className="flex flex-col items-center gap-4 py-8">
              <HardDrive className="h-12 w-12 text-muted-foreground" />
              <Button>Connect to Google Drive</Button>
            </div>
          </TabsContent>

          <TabsContent value="box" className="space-y-4">
            <div className="flex flex-col items-center gap-4 py-8">
              <Database className="h-12 w-12 text-muted-foreground" />
              <Button>Connect to Box</Button>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}