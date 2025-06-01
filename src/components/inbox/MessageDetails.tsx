import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { X, Download, Reply, Forward, Star, Archive } from "lucide-react";
import { useInboxStore } from "@/lib/inbox";
import { formatDistanceToNow } from "date-fns";
import { cn } from "@/lib/utils";
import { SyncRequestActions } from "./SyncRequestActions";

export function MessageDetails() {
  const { messages, selectedMessageId, closeDetails, toggleStarred, toggleArchived } = useInboxStore();
  const message = messages.find(m => m.id === selectedMessageId);

  if (!message) return null;

  return (
    <div className="h-full flex flex-col bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-3">
          <Avatar>
            <img 
              src={message.sender.avatarUrl || `https://ui-avatars.com/api/?name=${message.sender.name}`}
              alt={message.sender.name}
            />
          </Avatar>
          <div>
            <h2 className="font-semibold">{message.sender.name}</h2>
            <p className="text-sm text-muted-foreground">{message.sender.email}</p>
          </div>
        </div>
        <Button variant="ghost" size="icon" onClick={closeDetails}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="p-4 border-b">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-medium">{message.subject}</h3>
          <div className="text-sm text-muted-foreground">
            {formatDistanceToNow(new Date(message.createdAt), { addSuffix: true })}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="bg-primary/10">
            {message.type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
          </Badge>
          {message.syncRequest?.status === 'pending' && (
            <Badge variant="secondary" className="bg-yellow-500/10 text-yellow-500">
              Pending
            </Badge>
          )}
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-4 space-y-4">
          <div className="prose prose-invert max-w-none">
            {message.content}
          </div>

          {message.attachments && message.attachments.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-muted-foreground">Attachments</h4>
              <div className="space-y-2">
                {message.attachments.map((attachment) => (
                  <div 
                    key={attachment.id}
                    className={cn(
                      "flex items-center justify-between p-2 rounded-lg",
                      "border bg-card-gradient hover:bg-card transition-colors"
                    )}
                  >
                    <div className="flex items-center gap-2">
                      <div className="text-sm">{attachment.name}</div>
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      <div className="p-4 border-t bg-muted/50">
        {message.type === 'sync_request' && message.syncRequest?.status === 'pending' ? (
          <SyncRequestActions messageId={message.id} />
        ) : (
          <div className="flex items-center gap-2">
            <Button>
              <Reply className="h-4 w-4 mr-2" />
              Reply
            </Button>
            <Button variant="outline">
              <Forward className="h-4 w-4 mr-2" />
              Forward
            </Button>
            <div className="flex-1" />
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => toggleStarred(message.id)}
              className={cn(
                message.isStarred && "text-yellow-500"
              )}
            >
              <Star className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => toggleArchived(message.id)}
              className={cn(
                message.isArchived && "text-primary"
              )}
            >
              <Archive className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}