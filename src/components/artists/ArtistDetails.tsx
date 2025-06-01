import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X, Globe, Instagram, Twitter, Facebook, Music, BarChart2, Users, Mail } from "lucide-react";
import { useArtistsStore } from "@/lib/artists";

export function ArtistDetails() {
  const { artists, selectedArtistId, closeDetails } = useArtistsStore();
  const artist = artists.find(a => a.id === selectedArtistId);

  if (!artist) return null;

  return (
    <div className="h-full flex flex-col bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="relative h-48">
        <img 
          src={artist.imageUrl}
          alt={artist.name}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background" />
        <Button 
          variant="ghost" 
          size="icon" 
          className="absolute top-4 right-4"
          onClick={closeDetails}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="p-6 -mt-12 relative">
        <div className="space-y-4">
          <div>
            <h2 className="text-2xl font-semibold">{artist.name}</h2>
            <div className="flex flex-wrap gap-1 mt-2">
              {artist.genres.map((genre) => (
                <Badge key={genre} variant="secondary">{genre}</Badge>
              ))}
            </div>
          </div>

          {artist.bio && (
            <p className="text-sm text-muted-foreground">{artist.bio}</p>
          )}

          <div className="flex items-center gap-2">
            {artist.socialLinks?.website && (
              <Button variant="ghost" size="icon">
                <Globe className="h-4 w-4" />
              </Button>
            )}
            {artist.socialLinks?.instagram && (
              <Button variant="ghost" size="icon">
                <Instagram className="h-4 w-4" />
              </Button>
            )}
            {artist.socialLinks?.twitter && (
              <Button variant="ghost" size="icon">
                <Twitter className="h-4 w-4" />
              </Button>
            )}
            {artist.socialLinks?.facebook && (
              <Button variant="ghost" size="icon">
                <Facebook className="h-4 w-4" />
              </Button>
            )}
            {artist.socialLinks?.spotify && (
              <Button variant="ghost" size="icon">
                <Music className="h-4 w-4" />
              </Button>
            )}
          </div>

          <div className="flex flex-wrap gap-2 pt-2">
            <Button className="gap-2">
              <Music className="h-4 w-4" />
              View Catalog
            </Button>
            <Button variant="outline" className="gap-2">
              <BarChart2 className="h-4 w-4" />
              View Analytics
            </Button>
            <Button variant="outline" className="gap-2">
              <Users className="h-4 w-4" />
              Compare Artist
            </Button>
            <Button variant="outline" className="gap-2">
              <Mail className="h-4 w-4" />
              Contact Manager
            </Button>
          </div>
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-6 space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-4">Stats</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-1">
                <div className="text-2xl font-semibold">
                  {artist.stats.totalPlays.toLocaleString()}
                </div>
                <div className="text-sm text-muted-foreground">Total Plays</div>
              </div>
              <div className="space-y-1">
                <div className="text-2xl font-semibold">
                  {artist.stats.totalFollowers.toLocaleString()}
                </div>
                <div className="text-sm text-muted-foreground">Followers</div>
              </div>
              <div className="space-y-1">
                <div className="text-2xl font-semibold">
                  {artist.stats.totalShares.toLocaleString()}
                </div>
                <div className="text-sm text-muted-foreground">Shares</div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4">Top Cities</h3>
            <div className="space-y-2">
              {artist.topCities.map((city) => (
                <div key={city.name} className="flex items-center justify-between">
                  <span>{city.name}</span>
                  <span className="text-muted-foreground">
                    {city.listeners.toLocaleString()} listeners
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}