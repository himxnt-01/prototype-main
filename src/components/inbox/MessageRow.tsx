import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Message, useInboxStore } from "@/lib/inbox";
import { Star, FileText, MessageSquare, Link2, MoreHorizontal } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface MessageRowProps {
  message: Message;
}

const TYPE_ICONS = {
  sync_request: Link2,
  file_share: FileText,
  message: MessageSquare,
  contact_request: MessageSquare,
};

const TYPE_LABELS = {
  sync_request: "Sync Request",
  file_share: "Shared Files",
  message: "Message",
  contact_request: "Contact Request",
};

export function MessageRow({ message }: MessageRowProps) {
  const { selectMessage, markAsRead, toggleStarred, toggleArchived } = useInboxStore();
  const Icon = TYPE_ICONS[message.type];

  return (
    <div 
      className={cn(
        "flex items-start gap-4 p-4 rounded-lg border cursor-pointer",
        "hover:bg-card transition-colors",
        !message.readAt && "bg-primary/5 hover:bg-primary/10",
        message.isArchived && "opacity-60"
      )}
      onClick={() => {
        selectMessage(message.id);
        if (!message.readAt) {
          markAsRead(message.id);
        }
      }}
    >
      <Avatar className="mt-1">
        <img 
          src={message.sender.avatarUrl || `https://ui-avatars.com/api/?name=${message.sender.name}`}
          alt={message.sender.name}
        />
      </Avatar>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <div className="font-medium truncate">
            {message.sender.name}
          </div>
          <Badge variant="secondary" className="bg-primary/10">
            {TYPE_LABELS[message.type]}
          </Badge>
          {message.syncRequest?.status === 'pending' && (
            <Badge variant="secondary" className="bg-yellow-500/10 text-yellow-500">
              Pending
            </Badge>
          )}
        </div>

        <div className="text-base font-medium mb-1 truncate">
          {message.subject}
        </div>

        <div className="text-sm text-muted-foreground truncate">
          {message.content}
        </div>

        {message.attachments && message.attachments.length > 0 && (
          <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
            <FileText className="h-4 w-4" />
            <span>{message.attachments.length} attachment{message.attachments.length !== 1 ? 's' : ''}</span>
          </div>
        )}
      </div>

      <div className="flex items-start gap-2">
        <div className="text-sm text-muted-foreground whitespace-nowrap">
          {formatDistanceToNow(new Date(message.createdAt), { addSuffix: true })}
        </div>

        <Button 
          variant="ghost" 
          size="icon"
          className={cn(
            "h-8 w-8",
            message.isStarred && "text-yellow-500"
          )}
          onClick={(e) => {
            e.stopPropagation();
            toggleStarred(message.id);
          }}
        >
          <Star className="h-4 w-4" />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => markAsRead(message.id)}>
              Mark as {message.readAt ? 'Unread' : 'Read'}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => toggleStarred(message.id)}>
              {message.isStarred ? 'Remove Star' : 'Star'}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => toggleArchived(message.id)}>
              {message.isArchived ? 'Unarchive' : 'Archive'}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
