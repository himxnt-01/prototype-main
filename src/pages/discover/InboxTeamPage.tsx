import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, 
  Filter, 
  ArrowDownUp, 
  MessageSquare, 
  Users, 
  Plus, 
  Mail, 
  Clock, 
  Star, 
  FileText, 
  Link, 
  X, 
  Send, 
  UserPlus
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";

// Define mock data
const MESSAGES = [
  {
    id: 1,
    type: "message",
    sender: {
      id: 1,
      name: "Sarah Chen",
      email: "sarah@example.com",
      avatar: "https://picsum.photos/seed/sarah/200/200"
    },
    subject: "Regarding the latest license request",
    content: "Hi there, I wanted to follow up on the license request for the Mountain Sunrise track. Let me know if you need any additional information.",
    timestamp: "2024-03-15T14:30:00Z",
    read: false,
    starred: false
  },
  {
    id: 2,
    type: "sync_request",
    sender: {
      id: 2,
      name: "Mike Thompson",
      email: "mike@filmstudios.com",
      avatar: "https://picsum.photos/seed/mike/200/200"
    },
    subject: "Sync Request for Documentary",
    content: "We're working on a nature documentary and would love to license Ocean Breeze for our project. The documentary will be distributed worldwide on streaming platforms.",
    timestamp: "2024-03-14T10:15:00Z",
    read: true,
    starred: true,
    details: {
      project: "Nature's Wonders Documentary",
      budget: 15000,
      deadline: "2024-04-01",
      usage: "Streaming, TV"
    }
  },
  {
    id: 3,
    type: "file_share",
    sender: {
      id: 3,
      name: "Alex Rivera",
      email: "alex@musicprod.com",
      avatar: "https://picsum.photos/seed/alex/200/200"
    },
    subject: "New track demo for review",
    content: "I've attached a demo of the new track we discussed. Let me know what you think!",
    timestamp: "2024-03-13T16:45:00Z",
    read: true,
    starred: false,
    files: [
      { name: "track_demo_v1.wav", size: "24.5 MB" }
    ]
  }
];

const TEAM_MEMBERS = [
  {
    id: 1,
    name: "John Smith",
    email: "john@example.com",
    role: "Music Supervisor",
    avatar: "https://picsum.photos/seed/john/200/200",
    status: "active"
  },
  {
    id: 2,
    name: "Emily Johnson",
    email: "emily@example.com",
    role: "Legal Advisor",
    avatar: "https://picsum.photos/seed/emily/200/200",
    status: "away"
  },
  {
    id: 3,
    name: "David Wilson",
    email: "david@example.com",
    role: "Financial Manager",
    avatar: "https://picsum.photos/seed/david/200/200",
    status: "offline"
  }
];

export function InboxTeamPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentTab, setCurrentTab] = useState<'inbox' | 'team'>('inbox');
  const [selectedMessage, setSelectedMessage] = useState<typeof MESSAGES[0] | null>(null);
  const [replyText, setReplyText] = useState("");
  const [inboxTab, setInboxTab] = useState<'all' | 'sync' | 'files'>('all');

  // Filter messages based on search and inbox tab
  const filteredMessages = MESSAGES.filter(message => {
    const matchesSearch = 
      message.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      message.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      message.sender.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (!matchesSearch) return false;

    if (inboxTab === 'sync') return message.type === 'sync_request';
    if (inboxTab === 'files') return message.type === 'file_share';
    return true; // 'all' tab
  });

  // Filter team members based on search
  const filteredTeamMembers = TEAM_MEMBERS.filter(member => 
    member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">
          {currentTab === 'inbox' ? 'Inbox' : 'Team Management'}
        </h1>
        <div className="flex items-center gap-2">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input 
              placeholder={currentTab === 'inbox' ? "Search messages..." : "Search team..."} 
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          {currentTab === 'inbox' && (
            <>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <Button variant="outline" size="sm">
                <ArrowDownUp className="h-4 w-4 mr-2" />
                Sort
              </Button>
            </>
          )}
          {currentTab === 'team' && (
            <Button className="gap-2">
              <UserPlus className="h-4 w-4" />
              Invite Member
            </Button>
          )}
        </div>
      </div>

      <Tabs defaultValue="inbox" value={currentTab} onValueChange={(value) => setCurrentTab(value as 'inbox' | 'team')}>
        <TabsList className="mb-6">
          <TabsTrigger value="inbox" className="gap-2">
            <MessageSquare className="h-4 w-4" />
            Inbox
          </TabsTrigger>
          <TabsTrigger value="team" className="gap-2">
            <Users className="h-4 w-4" />
            Team
          </TabsTrigger>
        </TabsList>

        <TabsContent value="inbox" className="mt-0">
          <div className="flex h-[calc(100vh-15rem)] gap-6">
            <div className={cn(
              "flex flex-col transition-all duration-300",
              selectedMessage ? "w-1/3" : "w-full"
            )}>
              <div className="mb-4">
                <TabsList>
                  <TabsTrigger 
                    value="all" 
                    onClick={() => setInboxTab('all')}
                    className={inboxTab === 'all' ? "bg-primary/10 text-primary" : ""}
                  >
                    All Messages
                  </TabsTrigger>
                  <TabsTrigger 
                    value="sync" 
                    onClick={() => setInboxTab('sync')}
                    className={inboxTab === 'sync' ? "bg-primary/10 text-primary" : ""}
                  >
                    Sync Requests
                  </TabsTrigger>
                  <TabsTrigger 
                    value="files" 
                    onClick={() => setInboxTab('files')}
                    className={inboxTab === 'files' ? "bg-primary/10 text-primary" : ""}
                  >
                    File Shares
                  </TabsTrigger>
                </TabsList>
              </div>

              <div className="flex justify-between mb-4">
                <Button variant="outline" size="sm" className="gap-2">
                  <Plus className="h-4 w-4" />
                  Compose
                </Button>
              </div>

              <ScrollArea className="flex-1">
                <div className="space-y-2">
                  {filteredMessages.map(message => (
                    <div 
                      key={message.id}
                      className={cn(
                        "flex items-start gap-3 p-3 rounded-lg cursor-pointer",
                        "border transition-colors",
                        selectedMessage?.id === message.id 
                          ? "border-primary bg-primary/5" 
                          : "border-border bg-card-gradient hover:bg-card",
                        !message.read && "bg-primary/5"
                      )}
                      onClick={() => setSelectedMessage(message)}
                    >
                      <Avatar>
                        <img 
                          src={message.sender.avatar} 
                          alt={message.sender.name}
                          className="h-full w-full object-cover"
                        />
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <div className="font-medium truncate">{message.sender.name}</div>
                          <div className="text-xs text-muted-foreground">
                            {new Date(message.timestamp).toLocaleDateString()}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="font-medium truncate">{message.subject}</div>
                          {message.type === 'sync_request' && (
                            <Badge variant="secondary" className="bg-blue-500/10 text-blue-500">
                              <Link className="h-3 w-3 mr-1" />
                              Sync
                            </Badge>
                          )}
                          {message.type === 'file_share' && (
                            <Badge variant="secondary" className="bg-green-500/10 text-green-500">
                              <FileText className="h-3 w-3 mr-1" />
                              Files
                            </Badge>
                          )}
                          {message.starred && (
                            <Star className="h-3 w-3 text-yellow-500" />
                          )}
                        </div>
                        <div className="text-sm text-muted-foreground truncate">
                          {message.content}
                        </div>
                      </div>
                    </div>
                  ))}

                  {filteredMessages.length === 0 && (
                    <div className="text-center py-12 text-muted-foreground">
                      <Mail className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <h3 className="text-lg font-medium mb-2">No messages found</h3>
                      <p>Try adjusting your search or filter criteria</p>
                    </div>
                  )}
                </div>
              </ScrollArea>
            </div>

            {selectedMessage && (
              <div className="w-2/3 border rounded-lg bg-card-gradient flex flex-col">
                <div className="p-4 border-b flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <img 
                        src={selectedMessage.sender.avatar} 
                        alt={selectedMessage.sender.name}
                        className="h-full w-full object-cover"
                      />
                    </Avatar>
                    <div>
                      <div className="font-medium">{selectedMessage.sender.name}</div>
                      <div className="text-sm text-muted-foreground">{selectedMessage.sender.email}</div>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => setSelectedMessage(null)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                <div className="p-4 border-b">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-medium">{selectedMessage.subject}</h3>
                    <div className="text-sm text-muted-foreground">
                      {new Date(selectedMessage.timestamp).toLocaleString()}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {selectedMessage.type === 'sync_request' && (
                      <Badge variant="secondary" className="bg-blue-500/10 text-blue-500">
                        <Link className="h-3 w-3 mr-1" />
                        Sync Request
                      </Badge>
                    )}
                    {selectedMessage.type === 'file_share' && (
                      <Badge variant="secondary" className="bg-green-500/10 text-green-500">
                        <FileText className="h-3 w-3 mr-1" />
                        File Share
                      </Badge>
                    )}
                  </div>
                </div>

                <ScrollArea className="flex-1">
                  <div className="p-4 space-y-4">
                    <div className="prose prose-invert max-w-none">
                      {selectedMessage.content}
                    </div>

                    {selectedMessage.type === 'sync_request' && selectedMessage.details && (
                      <div className="rounded-lg border p-4 space-y-3 mt-4">
                        <h4 className="font-medium">Sync Request Details</h4>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <div className="text-muted-foreground">Project</div>
                            <div>{selectedMessage.details.project}</div>
                          </div>
                          <div>
                            <div className="text-muted-foreground">Budget</div>
                            <div>${selectedMessage.details.budget.toLocaleString()}</div>
                          </div>
                          <div>
                            <div className="text-muted-foreground">Deadline</div>
                            <div>{selectedMessage.details.deadline}</div>
                          </div>
                          <div>
                            <div className="text-muted-foreground">Usage</div>
                            <div>{selectedMessage.details.usage}</div>
                          </div>
                        </div>
                        <div className="flex gap-2 mt-4">
                          <Button className="gap-2">
                            Accept Request
                          </Button>
                          <Button variant="outline" className="gap-2">
                            Negotiate
                          </Button>
                        </div>
                      </div>
                    )}

                    {selectedMessage.type === 'file_share' && selectedMessage.files && (
                      <div className="space-y-2 mt-4">
                        <h4 className="font-medium">Attachments</h4>
                        <div className="space-y-2">
                          {selectedMessage.files.map((file, index) => (
                            <div 
                              key={index}
                              className="flex items-center justify-between p-2 rounded-lg border bg-card"
                            >
                              <div className="flex items-center gap-2">
                                <FileText className="h-4 w-4 text-muted-foreground" />
                                <div className="text-sm">{file.name}</div>
                                <div className="text-xs text-muted-foreground">{file.size}</div>
                              </div>
                              <Button variant="ghost" size="sm">
                                Download
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </ScrollArea>

                <div className="p-4 border-t">
                  <div className="flex flex-col gap-4">
                    <Textarea 
                      placeholder="Type your reply..."
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      className="min-h-[100px]"
                    />
                    <div className="flex justify-end">
                      <Button className="gap-2">
                        <Send className="h-4 w-4" />
                        Send Reply
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="team" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTeamMembers.map(member => (
              <div 
                key={member.id}
                className="rounded-lg border bg-card-gradient hover:bg-card transition-colors p-4"
              >
                <div className="flex items-center gap-4 mb-4">
                  <Avatar className="h-16 w-16">
                    <img 
                      src={member.avatar} 
                      alt={member.name}
                      className="h-full w-full object-cover"
                    />
                  </Avatar>
                  <div>
                    <h3 className="font-medium">{member.name}</h3>
                    <p className="text-sm text-muted-foreground">{member.email}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="secondary">
                        {member.role}
                      </Badge>
                      <Badge 
                        variant="secondary" 
                        className={cn(
                          member.status === 'active' && "bg-green-500/10 text-green-500",
                          member.status === 'away' && "bg-yellow-500/10 text-yellow-500",
                          member.status === 'offline' && "bg-gray-500/10 text-gray-500"
                        )}
                      >
                        {member.status.charAt(0).toUpperCase() + member.status.slice(1)}
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1 gap-2">
                    <Mail className="h-4 w-4" />
                    Message
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1 gap-2">
                    <Users className="h-4 w-4" />
                    Manage
                  </Button>
                </div>
              </div>
            ))}

            <div 
              className="rounded-lg border border-dashed bg-card/50 hover:bg-card transition-colors p-4 flex flex-col items-center justify-center gap-4 cursor-pointer h-[172px]"
            >
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <UserPlus className="h-6 w-6 text-primary" />
              </div>
              <div className="text-center">
                <h3 className="font-medium">Add Team Member</h3>
                <p className="text-sm text-muted-foreground">Invite collaborators to your team</p>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}