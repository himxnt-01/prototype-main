import { SpaceGameScene } from './SpaceGameScene';
import { cn } from '@/lib/utils';

interface GameContainerProps {
  className?: string;
}

export function GameContainer({ className }: GameContainerProps) {
  return (
    <div className={cn(
      "w-full aspect-[21/9] max-w-4xl mx-auto rounded-lg overflow-hidden border shadow-lg",
      "border-purple-900/50 shadow-purple-900/20",
      className
    )}>
      <SpaceGameScene />
    </div>
  );
}