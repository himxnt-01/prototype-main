import { GameContainer } from '@/components/game/GameContainer';
import { Button } from '@/components/ui/button';
import { useLocation } from '@/hooks/useLocation';
import { ChevronLeft } from 'lucide-react';

export function GamePage() {
  const { navigate } = useLocation();

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex items-center gap-4 mb-6">
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => navigate("/")}
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-semibold">Space Explorer</h1>
      </div>
      
      <GameContainer className="mb-6" />
      
      <div className="max-w-4xl mx-auto space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-lg border p-4 bg-card">
            <h3 className="font-medium mb-2">Visual Features</h3>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• Parallax scrolling background with 4 depth layers</li>
              <li>• Sleek, modern spaceship design with hover animation</li>
              <li>• Pulsating engine glow effects</li>
              <li>• Deep purple and blue color palette with neon accents</li>
            </ul>
          </div>
          
          <div className="rounded-lg border p-4 bg-card">
            <h3 className="font-medium mb-2">Technical Details</h3>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• Canvas-based rendering for smooth animations</li>
              <li>• Responsive design that adapts to container size</li>
              <li>• Theme-aware with dark/light mode support</li>
              <li>• Optimized animation using requestAnimationFrame</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}