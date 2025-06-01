import { useInboxStore } from "@/lib/inbox";
import { MessageRow } from "./MessageRow";

export function InboxList() {
  const { messages, filters, search } = useInboxStore();

  // Apply filters and search
  const filteredMessages = messages.filter(message => {
    if (filters.type && message.type !== filters.type) return false;
    if (filters.read !== undefined && !!message.readAt !== filters.read) return false;
    if (filters.starred && !message.isStarred) return false;
    if (filters.archived && !message.isArchived) return false;
    
    if (search) {
      const searchLower = search.toLowerCase();
      return (
        message.subject.toLowerCase().includes(searchLower) ||
        message.content.toLowerCase().includes(searchLower) ||
        message.sender.name.toLowerCase().includes(searchLower) ||
        message.sender.email.toLowerCase().includes(searchLower)
      );
    }

    return true;
  });

  if (filteredMessages.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        No messages found
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {filteredMessages.map((message) => (
        <MessageRow key={message.id} message={message} />
      ))}
    </div>
  );
}
