import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar } from "@/components/ui/avatar";
import { 
  Search, 
  Filter, 
  ArrowDownUp, 
  Play, 
  Download, 
  FileText, 
  FolderPlus, 
  Folder, 
  MoreHorizontal, 
  Users, 
  Calendar, 
  CheckCircle2, 
  FileCheck, 
  Clock, 
  Plus
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { discoverTracks } from "@/data/discoverTracks";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

// Define mock project data
const PROJECTS = [
  {
    id: 1,
    name: "Pepsi Ad – Feb 2025",
    description: "Commercial campaign for Pepsi's new product line",
    createdAt: "2024-02-15T10:30:00Z",
    dueDate: "2025-02-01T00:00:00Z",
    status: "active",
    client: "PepsiCo",
    trackIds: [101, 106, 115],
    team: [
      { id: 1, name: "John Smith", role: "Music Supervisor" },
      { id: 2, name: "Emily Johnson", role: "Legal Advisor" }
    ],
    documents: [
      { id: 1, name: "License Agreement.pdf", type: "license" },
      { id: 2, name: "Invoice #12345.pdf", type: "invoice" },
      { id: 3, name: "Usage Terms.pdf", type: "legal" }
    ]
  },
  {
    id: 2,
    name: "Short Film – Berlin Festival",
    description: "Independent short film for Berlin International Film Festival",
    createdAt: "2024-01-20T14:45:00Z",
    dueDate: "2024-06-15T00:00:00Z",
    status: "active",
    client: "Indie Films GmbH",
    trackIds: [102, 104, 107, 114],
    team: [
      { id: 1, name: "John Smith", role: "Music Supervisor" },
      { id: 3, name: "David Wilson", role: "Financial Manager" }
    ],
    documents: [
      { id: 4, name: "Film License.pdf", type: "license" },
      { id: 5, name: "Payment Receipt.pdf", type: "invoice" },
      { id: 6, name: "Film Festival Submission.pdf", type: "other" }
    ]
  },
  {
    id: 3,
    name: "Corporate Training Videos",
    description: "Series of training videos for enterprise clients",
    createdAt: "2024-03-05T09:15:00Z",
    dueDate: "2024-05-30T00:00:00Z",
    status: "active",
    client: "Enterprise Solutions Inc.",
    trackIds: [108, 112],
    team: [
      { id: 2, name: "Emily Johnson", role: "Legal Advisor" },
      { id: 3, name: "David Wilson", role: "Financial Manager" }
    ],
    documents: [
      { id: 7, name: "Enterprise License.pdf", type: "license" },
      { id: 8, name: "Invoice #54321.pdf", type: "invoice" }
    ]
  }
];

export function ProjectsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [playingTrackId, setPlayingTrackId] = useState<number | null>(null);
  const [selectedProject, setSelectedProject] = useState<typeof PROJECTS[0] | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newProjectData, setNewProjectData] = useState({
    name: "",
    description: "",
    client: "",
    dueDate: ""
  });

  // Set static prices between 2k and 200k
  const tracksWithPrices = discoverTracks.map(track => {
    // Generate a deterministic but varied price based on track id
    const basePrice = 2000 + (track.id * 1337) % 198000;
    // Round to nearest thousand
    const roundedPrice = Math.round(basePrice / 1000) * 1000;
    return {
      ...track,
      price: roundedPrice
    };
  });

  const togglePlayTrack = (id: number) => {
    if (playingTrackId === id) {
      setPlayingTrackId(null);
    } else {
      setPlayingTrackId(id);
    }
  };

  // Filter projects based on search
  const filteredProjects = PROJECTS.filter(project => 
    project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.client.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Get tracks for selected project
  const getProjectTracks = (project: typeof PROJECTS[0]) => {
    return tracksWithPrices.filter(track => project.trackIds.includes(track.id));
  };

  const handleCreateProject = () => {
    // In a real app, this would create a new project
    console.log("Creating new project:", newProjectData);
    setIsCreateDialogOpen(false);
    setNewProjectData({
      name: "",
      description: "",
      client: "",
      dueDate: ""
    });
  };

  return (
    <div className="container mx-auto px-4 py-6">
      {!selectedProject ? (
        <>
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-semibold">My Projects</h1>
            <div className="flex items-center gap-2">
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input 
                  placeholder="Search projects..." 
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <Button variant="outline" size="sm">
                <ArrowDownUp className="h-4 w-4 mr-2" />
                Sort
              </Button>
              <Button onClick={() => setIsCreateDialogOpen(true)}>
                <FolderPlus className="h-4 w-4 mr-2" />
                New Project
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map(project => (
              <div 
                key={project.id}
                className="rounded-lg border bg-card-gradient hover:bg-card transition-colors cursor-pointer"
                onClick={() => setSelectedProject(project)}
              >
                <div className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Folder className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h2 className="font-semibold">{project.name}</h2>
                        <p className="text-sm text-muted-foreground">{project.client}</p>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Edit Project</DropdownMenuItem>
                        <DropdownMenuItem>Share Project</DropdownMenuItem>
                        <DropdownMenuItem>Archive Project</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">Delete Project</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  <p className="text-sm text-muted-foreground line-clamp-2">{project.description}</p>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>Due {new Date(project.dueDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <FileCheck className="h-4 w-4" />
                      <span>{project.trackIds.length} tracks</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex -space-x-2">
                      {project.team.map(member => (
                        <Avatar key={member.id} className="border-2 border-background">
                          <img 
                            src={`https://picsum.photos/seed/${member.name}/40/40`} 
                            alt={member.name}
                            className="h-full w-full object-cover"
                          />
                        </Avatar>
                      ))}
                    </div>
                    <Badge variant="secondary" className="bg-green-500/10 text-green-500">
                      Active
                    </Badge>
                  </div>
                </div>
              </div>
            ))}

            <div 
              className="rounded-lg border border-dashed bg-card/50 hover:bg-card transition-colors p-6 flex flex-col items-center justify-center gap-4 cursor-pointer"
              onClick={() => setIsCreateDialogOpen(true)}
            >
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <FolderPlus className="h-6 w-6 text-primary" />
              </div>
              <div className="text-center">
                <h3 className="font-medium">Create New Project</h3>
                <p className="text-sm text-muted-foreground">Organize your licensed tracks</p>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="flex items-center gap-4 mb-6">
            <Button 
              variant="outline" 
              onClick={() => setSelectedProject(null)}
            >
              Back to Projects
            </Button>
            <h1 className="text-2xl font-semibold">{selectedProject.name}</h1>
            <Badge variant="secondary" className="bg-green-500/10 text-green-500">
              Active
            </Badge>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="rounded-lg border bg-card-gradient p-6">
                <h2 className="text-lg font-semibold mb-4">Project Details</h2>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Client</div>
                    <div className="font-medium">{selectedProject.client}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Due Date</div>
                    <div className="font-medium">{new Date(selectedProject.dueDate).toLocaleDateString()}</div>
                  </div>
                  <div className="col-span-2">
                    <div className="text-sm text-muted-foreground mb-1">Description</div>
                    <div>{selectedProject.description}</div>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border bg-card-gradient p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold">Licensed Tracks</h2>
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Track
                  </Button>
                </div>
                <div className="space-y-4">
                  {getProjectTracks(selectedProject).map((track) => (
                    <div 
                      key={track.id}
                      className={cn(
                        "flex items-center gap-4 p-4 rounded-lg",
                        "border border-border bg-card/50 hover:bg-card transition-colors",
                        "group"
                      )}
                    >
                      <div className="relative h-12 w-12 rounded-md overflow-hidden">
                        <img 
                          src={`https://picsum.photos/seed/${track.id}/48/48`} 
                          alt={track.title}
                          className="h-full w-full object-cover"
                        />
                        <Button
                          size="icon"
                          variant="secondary"
                          className={cn(
                            "absolute inset-0 h-full w-full",
                            "opacity-0 group-hover:opacity-100 transition-opacity",
                            "bg-black/50 hover:bg-black/70 rounded-none"
                          )}
                          onClick={() => togglePlayTrack(track.id)}
                        >
                          {playingTrackId === track.id ? (
                            <Play className="h-4 w-4" />
                          ) : (
                            <Play className="h-4 w-4" />
                          )}
                        </Button>
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="font-medium truncate">{track.title}</div>
                        <div className="text-sm text-muted-foreground truncate">{track.artist}</div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="bg-pink-600/10 text-pink-600">
                          {track.genre}
                        </Badge>
                        <div className="text-sm font-medium">
                          ${track.price.toLocaleString()}
                        </div>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-lg border bg-card-gradient p-6">
                <h3 className="font-semibold flex items-center gap-2 mb-4">
                  <Users className="h-4 w-4" />
                  Team Members
                </h3>
                <div className="space-y-3">
                  {selectedProject.team.map(member => (
                    <div key={member.id} className="flex items-center gap-3 p-2 rounded-md bg-background/50">
                      <Avatar>
                        <img 
                          src={`https://picsum.photos/seed/${member.name}/40/40`} 
                          alt={member.name}
                          className="h-full w-full object-cover"
                        />
                      </Avatar>
                      <div>
                        <div className="font-medium">{member.name}</div>
                        <div className="text-xs text-muted-foreground">{member.role}</div>
                      </div>
                    </div>
                  ))}
                  <Button variant="outline" size="sm" className="w-full">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Team Member
                  </Button>
                </div>
              </div>

              <div className="rounded-lg border bg-card-gradient p-6">
                <h3 className="font-semibold flex items-center gap-2 mb-4">
                  <FileText className="h-4 w-4" />
                  Documents
                </h3>
                <div className="space-y-2">
                  {selectedProject.documents.map(doc => (
                    <div 
                      key={doc.id}
                      className="flex items-center justify-between p-2 rounded-md bg-background/50"
                    >
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        <div className="text-sm">{doc.name}</div>
                      </div>
                      <Badge variant="secondary" className={cn(
                        doc.type === 'license' && "bg-blue-500/10 text-blue-500",
                        doc.type === 'invoice' && "bg-green-500/10 text-green-500",
                        doc.type === 'legal' && "bg-yellow-500/10 text-yellow-500",
                        doc.type === 'other' && "bg-gray-500/10 text-gray-500"
                      )}>
                        {doc.type.charAt(0).toUpperCase() + doc.type.slice(1)}
                      </Badge>
                    </div>
                  ))}
                  <Button variant="outline" size="sm" className="w-full">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Document
                  </Button>
                </div>
              </div>

              <div className="rounded-lg border bg-card-gradient p-6">
                <h3 className="font-semibold flex items-center gap-2 mb-4">
                  <Clock className="h-4 w-4" />
                  Recent Activity
                </h3>
                <div className="space-y-3">
                  <div className="flex gap-3">
                    <div className="h-8 w-8 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0">
                      <FileCheck className="h-4 w-4 text-blue-500" />
                    </div>
                    <div>
                      <div className="text-sm">License approved for "Electric Dreams"</div>
                      <div className="text-xs text-muted-foreground">2 days ago</div>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="h-8 w-8 rounded-full bg-green-500/10 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                    </div>
                    <div>
                      <div className="text-sm">Invoice #12345 paid</div>
                      <div className="text-xs text-muted-foreground">5 days ago</div>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="h-8 w-8 rounded-full bg-purple-500/10 flex items-center justify-center shrink-0">
                      <Users className="h-4 w-4 text-purple-500" />
                    </div>
                    <div>
                      <div className="text-sm">Emily Johnson added to project</div>
                      <div className="text-xs text-muted-foreground">1 week ago</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Create New Project</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Project Name</Label>
              <Input 
                id="name" 
                placeholder="e.g., Summer Campaign 2025"
                value={newProjectData.name}
                onChange={(e) => setNewProjectData({...newProjectData, name: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="client">Client</Label>
              <Input 
                id="client" 
                placeholder="e.g., Acme Corporation"
                value={newProjectData.client}
                onChange={(e) => setNewProjectData({...newProjectData, client: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dueDate">Due Date</Label>
              <Input 
                id="dueDate" 
                type="date"
                value={newProjectData.dueDate}
                onChange={(e) => setNewProjectData({...newProjectData, dueDate: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea 
                id="description" 
                placeholder="Brief description of the project"
                value={newProjectData.description}
                onChange={(e) => setNewProjectData({...newProjectData, description: e.target.value})}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleCreateProject}>Create Project</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}