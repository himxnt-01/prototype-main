import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface HolographicAlbumCoverProps {
  imageUrl: string;
  isPlaying: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function HolographicAlbumCover({ 
  imageUrl, 
  isPlaying, 
  size = 'md',
  className 
}: HolographicAlbumCoverProps) {
  const [rotation, setRotation] = useState(0);
  const [holographicPhase, setHolographicPhase] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const rotationIntervalRef = useRef<number | null>(null);
  const holographicIntervalRef = useRef<number | null>(null);
  
  // Set size classes
  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-48 h-48 sm:w-64 sm:h-64',
    lg: 'w-64 h-64 sm:w-80 sm:h-80'
  };
  
  // Rotate album when playing
  useEffect(() => {
    if (isPlaying) {
      rotationIntervalRef.current = window.setInterval(() => {
        setRotation(prev => (prev + 0.2) % 360);
      }, 16);
    } else if (rotationIntervalRef.current) {
      clearInterval(rotationIntervalRef.current);
      rotationIntervalRef.current = null;
    }
    
    return () => {
      if (rotationIntervalRef.current) {
        clearInterval(rotationIntervalRef.current);
      }
    };
  }, [isPlaying]);
  
  // Slowly change holographic effect over time
  useEffect(() => {
    holographicIntervalRef.current = window.setInterval(() => {
      setHolographicPhase(prev => (prev + 0.001) % 1);
    }, 16);
    
    return () => {
      if (holographicIntervalRef.current) {
        clearInterval(holographicIntervalRef.current);
      }
    };
  }, []);
  
  // Calculate holographic effect based on phase
  const calculateHolographicEffect = () => {
    // Calculate hue rotation based on phase
    const hueRotate = Math.floor((holographicPhase * 360) % 360);
    
    // Calculate brightness and contrast with subtle variations
    const brightness = 1 + 0.1 * Math.sin(holographicPhase * Math.PI * 2);
    const contrast = 1 + 0.1 * Math.cos(holographicPhase * Math.PI * 2);
    
    return {
      filter: `hue-rotate(${hueRotate}deg) brightness(${brightness}) contrast(${contrast})`,
      backgroundPosition: `${(holographicPhase * 100).toFixed(2)}% ${((1 - holographicPhase) * 100).toFixed(2)}%`
    };
  };
  
  const holographicEffect = calculateHolographicEffect();
  
  return (
    <div 
      ref={containerRef}
      className={cn(
        "relative",
        sizeClasses[size],
        className
      )}
    >
      <div 
        className={cn(
          "absolute inset-0 rounded-full overflow-hidden",
          "before:absolute before:inset-0 before:z-10",
          "before:bg-gradient-to-br before:from-pink-300/30 before:via-purple-300/30 before:to-blue-300/30",
          "after:absolute after:inset-0 after:z-20",
          "after:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2),transparent_70%)]",
          "shadow-xl"
        )}
        style={{ 
          transform: `rotate(${rotation}deg)`,
          transition: isPlaying ? 'none' : 'transform 0.5s ease-out',
          ...holographicEffect
        }}
      >
        <img 
          src={imageUrl}
          alt="Album cover"
          className="w-full h-full object-cover"
        />
        
        {/* Holographic overlay */}
        <div 
          className="absolute inset-0 bg-gradient-to-br from-pink-500/10 via-purple-500/10 to-blue-500/10 mix-blend-overlay"
          style={{ backgroundPosition: holographicEffect.backgroundPosition }}
        ></div>
        
        {/* Shine effect */}
        <div 
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.2),transparent_70%)] animate-pulse"
          style={{ backgroundPosition: holographicEffect.backgroundPosition }}
        ></div>
      </div>
      
      {/* Center hole */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/6 h-1/6 rounded-full bg-black/80 z-30 flex items-center justify-center">
        <div className="w-1/4 h-1/4 rounded-full bg-zinc-400"></div>
      </div>
    </div>
  );
}