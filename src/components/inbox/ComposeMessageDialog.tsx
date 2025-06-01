import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useInboxStore } from "@/lib/inbox";

interface ComposeMessageDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ComposeMessageDialog({ open, onOpenChange }: ComposeMessageDialogProps) {
  const [formData, setFormData] = useState({
    recipients: "",
    subject: "",
    content: ""
  });

  const { sendMessage } = useInboxStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    sendMessage({
      type: "message",
      sender: {
        id: 1,
        name: "You",
        email: "you@example.com"
      },
      recipients: formData.recipients.split(",").map(email => ({
        id: Date.now(),
        name: email.trim(),
        email: email.trim()
      })),
      subject: formData.subject,
      content: formData.content,
    });

    setFormData({
      recipients: "",
      subject: "",
      content: ""
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>New Message</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="recipients">To</Label>
            <Input
              id="recipients"
              value={formData.recipients}
              onChange={(e) => setFormData({ ...formData, recipients: e.target.value })}
              placeholder="Enter email addresses (comma separated)"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="subject">Subject</Label>
            <Input
              id="subject"
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              placeholder="Enter subject"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Message</Label>
            <Textarea
              id="content"
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              placeholder="Type your message here..."
              className="h-48"
              required
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">
              Send Message
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}