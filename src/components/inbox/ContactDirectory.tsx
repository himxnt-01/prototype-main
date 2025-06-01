import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, Mail } from "lucide-react";
import { useInboxStore } from "@/lib/inbox";
import { cn } from "@/lib/utils";

export function ContactDirectory() {
  const { contacts } = useInboxStore();

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search contacts..." className="pl-8" />
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Contact
        </Button>
      </div>

      <div className="space-y-2">
        {contacts.map((contact) => (
          <div 
            key={contact.id}
            className={cn(
              "flex items-center justify-between p-3 rounded-lg",
              "border bg-card-gradient hover:bg-card transition-colors"
            )}
          >
            <div className="flex items-center gap-3">
              <Avatar>
                <img 
                  src={contact.avatarUrl || `https://ui-avatars.com/api/?name=${contact.name}`}
                  alt={contact.name}
                />
              </Avatar>
              <div>
                <div className="flex items-center gap-2">
                  <div className="font-medium">{contact.name}</div>
                  {contact.isVerified && (
                    <Badge variant="secondary" className="bg-blue-500/10 text-blue-500">
                      Verified
                    </Badge>
                  )}
                </div>
                <div className="text-sm text-muted-foreground space-y-0.5">
                  <div>{contact.email}</div>
                  {contact.role && (
                    <div className="text-xs">
                      {contact.role} {contact.company && `at ${contact.company}`}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <Button variant="ghost" size="icon">
              <Mail className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}