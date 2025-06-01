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
  Play, 
  Download, 
  FileText, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  AlertCircle
} from "lucide-react";
import { cn } from "@/lib/utils";
import { discoverTracks } from "@/data/discoverTracks";

// Mock purchase data
const PURCHASES = [
  {
    id: 1,
    trackId: 101,
    purchaseDate: "2024-03-15",
    expiryDate: "2025-03-15",
    licenseType: "Standard",
    status: "active",
    usageRights: ["Web", "Social Media"],
    price: 8000,
    orderNumber: "ZS-384729"
  },
  {
    id: 2,
    trackId: 104,
    purchaseDate: "2024-02-20",
    expiryDate: "2026-02-20",
    licenseType: "Premium",
    status: "active",
    usageRights: ["Film", "TV", "Advertising"],
    price: 25000,
    orderNumber: "ZS-273849"
  },
  {
    id: 3,
    trackId: 107,
    purchaseDate: "2024-01-10",
    expiryDate: "2025-01-10",
    licenseType: "Standard",
    status: "active",
    usageRights: ["Film", "TV", "Luxury"],
    price: 22000,
    orderNumber: "ZS-192837"
  },
  {
    id: 4,
    trackId: 110,
    purchaseDate: "2023-12-05",
    expiryDate: "2024-12-05",
    licenseType: "Standard",
    status: "active",
    usageRights: ["Drama", "Film", "TV"],
    price: 18000,
    orderNumber: "ZS-102938"
  }
];

export function PurchasesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [playingTrackId, setPlayingTrackId] = useState<number | null>(null);
  const [currentTab, setCurrentTab] = useState<'active' | 'expired' | 'all'>('active');

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

  // Filter purchases based on tab and search
  const filteredPurchases = PURCHASES.filter(purchase => {
    const track = tracksWithPrices.find(t => t.id === purchase.trackId);
    if (!track) return false;

    const matchesSearch = 
      track.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      track.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
      purchase.orderNumber.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (!matchesSearch) return false;

    if (currentTab === 'active') return purchase.status === 'active';
    if (currentTab === 'expired') return purchase.status === 'expired';
    return true; // 'all' tab
  });

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Purchases & Licenses</h1>
        <div className="flex items-center gap-2">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input 
              placeholder="Search purchases..." 
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
        </div>
      </div>

      <Tabs defaultValue="active" value={currentTab} onValueChange={(value) => setCurrentTab(value as 'active' | 'expired' | 'all')}>
        <TabsList className="mb-6">
          <TabsTrigger value="active">Active Licenses</TabsTrigger>
          <TabsTrigger value="expired">Expired Licenses</TabsTrigger>
          <TabsTrigger value="all">All Purchases</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="mt-0">
          <ScrollArea className="h-[calc(100vh-15rem)]">
            <div className="space-y-4">
              {filteredPurchases.length > 0 ? (
                filteredPurchases.map(purchase => {
                  const track = tracksWithPrices.find(t => t.id === purchase.trackId);
                  if (!track) return null;
                  
                  return (
                    <div 
                      key={purchase.id}
                      className="rounded-lg border bg-card-gradient hover:bg-card transition-colors"
                    >
                      <div className="p-4 flex flex-col md:flex-row gap-4">
                        <div className="flex items-center gap-4">
                          <div className="relative h-16 w-16 rounded-md overflow-hidden">
                            <img 
                              src={`https://picsum.photos/seed/${track.id}/64/64`} 
                              alt={track.title}
                              className="h-full w-full object-cover"
                            />
                            <Button
                              size="icon"
                              variant="secondary"
                              className={cn(
                                "absolute inset-0 h-full w-full",
                                "opacity-0 hover:opacity-100 transition-opacity",
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
                          <div>
                            <h3 className="font-medium">{track.title}</h3>
                            <p className="text-sm text-muted-foreground">{track.artist}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="secondary" className="bg-pink-600/10 text-pink-600">
                                {track.genre}
                              </Badge>
                              <Badge variant="secondary" className="bg-green-500/10 text-green-500">
                                <CheckCircle2 className="h-3 w-3 mr-1" />
                                Active
                              </Badge>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex-1" />
                        
                        <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                          <div className="space-y-1">
                            <div className="text-sm text-muted-foreground flex items-center gap-1">
                              <FileText className="h-3.5 w-3.5" />
                              License: {purchase.licenseType}
                            </div>
                            <div className="text-sm text-muted-foreground flex items-center gap-1">
                              <Calendar className="h-3.5 w-3.5" />
                              Expires: {purchase.expiryDate}
                            </div>
                            <div className="text-sm text-muted-foreground flex items-center gap-1">
                              <Clock className="h-3.5 w-3.5" />
                              Order: {purchase.orderNumber}
                            </div>
                          </div>
                          
                          <div className="flex flex-col gap-2">
                            <Button size="sm" className="gap-2">
                              <Download className="h-4 w-4" />
                              Download Track
                            </Button>
                            <Button size="sm" variant="outline" className="gap-2">
                              <FileText className="h-4 w-4" />
                              View License
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <AlertCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <h3 className="text-lg font-medium mb-2">No licenses found</h3>
                  <p>Try adjusting your search or filter criteria</p>
                </div>
              )}
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="expired" className="mt-0">
          <div className="text-center py-12 text-muted-foreground">
            <AlertCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-medium mb-2">No expired licenses</h3>
            <p>All your licenses are currently active</p>
          </div>
        </TabsContent>

        <TabsContent value="all" className="mt-0">
          <ScrollArea className="h-[calc(100vh-15rem)]">
            <div className="space-y-4">
              {filteredPurchases.length > 0 ? (
                filteredPurchases.map(purchase => {
                  const track = tracksWithPrices.find(t => t.id === purchase.trackId);
                  if (!track) return null;
                  
                  return (
                    <div 
                      key={purchase.id}
                      className="rounded-lg border bg-card-gradient hover:bg-card transition-colors"
                    >
                      <div className="p-4 flex flex-col md:flex-row gap-4">
                        <div className="flex items-center gap-4">
                          <div className="relative h-16 w-16 rounded-md overflow-hidden">
                            <img 
                              src={`https://picsum.photos/seed/${track.id}/64/64`} 
                              alt={track.title}
                              className="h-full w-full object-cover"
                            />
                            <Button
                              size="icon"
                              variant="secondary"
                              className={cn(
                                "absolute inset-0 h-full w-full",
                                "opacity-0 hover:opacity-100 transition-opacity",
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
                          <div>
                            <h3 className="font-medium">{track.title}</h3>
                            <p className="text-sm text-muted-foreground">{track.artist}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="secondary" className="bg-pink-600/10 text-pink-600">
                                {track.genre}
                              </Badge>
                              <Badge variant="secondary" className="bg-green-500/10 text-green-500">
                                <CheckCircle2 className="h-3 w-3 mr-1" />
                                Active
                              </Badge>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex-1" />
                        
                        <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                          <div className="space-y-1">
                            <div className="text-sm text-muted-foreground flex items-center gap-1">
                              <FileText className="h-3.5 w-3.5" />
                              License: {purchase.licenseType}
                            </div>
                            <div className="text-sm text-muted-foreground flex items-center gap-1">
                              <Calendar className="h-3.5 w-3.5" />
                              Expires: {purchase.expiryDate}
                            </div>
                            <div className="text-sm text-muted-foreground flex items-center gap-1">
                              <Clock className="h-3.5 w-3.5" />
                              Order: {purchase.orderNumber}
                            </div>
                          </div>
                          
                          <div className="flex flex-col gap-2">
                            <Button size="sm" className="gap-2">
                              <Download className="h-4 w-4" />
                              Download Track
                            </Button>
                            <Button size="sm" variant="outline" className="gap-2">
                              <FileText className="h-4 w-4" />
                              View License
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <AlertCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <h3 className="text-lg font-medium mb-2">No licenses found</h3>
                  <p>Try adjusting your search or filter criteria</p>
                </div>
              )}
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  );
}