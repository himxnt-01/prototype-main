import { useRef, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { useTheme } from '@/components/ThemeProvider';

interface AudioWaveformProps {
  isPlaying: boolean;
  progress: number; // 0-100
  onSeek?: (position: number) => void;
  className?: string;
  barCount?: number;
  trackId?: number; // Added to regenerate waveform when track changes
}

export function AudioWaveform({ 
  isPlaying, 
  progress, 
  onSeek, 
  className,
  barCount = 40,
  trackId
}: AudioWaveformProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  const [bars, setBars] = useState<number[]>([]);
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';
  
  // Generate random bar heights when track changes
  useEffect(() => {
    const generateBars = () => {
      const newBars = [];
      for (let i = 0; i < barCount; i++) {
        // Create a pattern with some randomness but also some structure
        const baseHeight = Math.sin(i / (barCount / 6)) * 0.3 + 0.5;
        const randomFactor = Math.random() * 0.4;
        const height = Math.max(0.1, Math.min(1, baseHeight + randomFactor));
        newBars.push(height);
      }
      setBars(newBars);
    };
    
    generateBars();
  }, [barCount, trackId]); // Regenerate when trackId changes
  
  // Draw waveform
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container || bars.length === 0) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions
    const dpr = window.devicePixelRatio || 1;
    const rect = container.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);
    
    // Clear canvas
    ctx.clearRect(0, 0, rect.width, rect.height);
    
    // Calculate bar width and spacing
    const barWidth = 3;
    const spacing = 2;
    const totalBarWidth = barWidth + spacing;
    
    // Calculate progress position
    const progressPosition = (progress / 100) * rect.width;
    
    // Draw floating bi-directional bars
    const drawBars = () => {
      const centerY = rect.height / 2;
      
      for (let i = 0; i < bars.length; i++) {
        const x = i * totalBarWidth + (rect.width - bars.length * totalBarWidth) / 2; // Center the waveform
        const barHeight = bars[i] * (rect.height * 0.4); // Reduced height to make it more compact
        
        // Determine if this bar is before or after the progress position
        const isBeforeProgress = x < progressPosition;
        
        // Set color based on progress and theme
        if (isBeforeProgress) {
          // Use white for played portion in both themes
          ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        } else {
          ctx.fillStyle = isDarkMode ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.3)';
        }
        
        // Add animation to bars near the progress position
        let animatedHeight = barHeight;
        if (isPlaying && Math.abs(x - progressPosition) < totalBarWidth * 3) {
          const animationFactor = 1 + Math.sin(Date.now() / 200) * 0.2;
          animatedHeight *= animationFactor;
        }
        
        // Draw top bar (above center line)
        const topBarHeight = animatedHeight;
        const topY = centerY - topBarHeight;
        
        // Draw rounded bar
        const radius = barWidth / 2;
        ctx.beginPath();
        ctx.moveTo(x, topY + radius);
        ctx.lineTo(x, centerY - radius);
        ctx.arcTo(x, centerY, x + radius, centerY, radius);
        ctx.lineTo(x + barWidth - radius, centerY);
        ctx.arcTo(x + barWidth, centerY, x + barWidth, centerY - radius, radius);
        ctx.lineTo(x + barWidth, topY + radius);
        ctx.arcTo(x + barWidth, topY, x + barWidth - radius, topY, radius);
        ctx.lineTo(x + radius, topY);
        ctx.arcTo(x, topY, x, topY + radius, radius);
        ctx.fill();
        
        // Draw bottom bar (mirror of top bar)
        const bottomY = centerY;
        
        ctx.beginPath();
        ctx.moveTo(x, bottomY + radius);
        ctx.lineTo(x, bottomY + topBarHeight - radius);
        ctx.arcTo(x, bottomY + topBarHeight, x + radius, bottomY + topBarHeight, radius);
        ctx.lineTo(x + barWidth - radius, bottomY + topBarHeight);
        ctx.arcTo(x + barWidth, bottomY + topBarHeight, x + barWidth, bottomY + topBarHeight - radius, radius);
        ctx.lineTo(x + barWidth, bottomY + radius);
        ctx.arcTo(x + barWidth, bottomY, x + barWidth - radius, bottomY, radius);
        ctx.lineTo(x + radius, bottomY);
        ctx.arcTo(x, bottomY, x, bottomY + radius, radius);
        ctx.fill();
      }
    };
    
    // Animate waveform if playing
    const animate = () => {
      ctx.clearRect(0, 0, rect.width, rect.height);
      drawBars();
      if (isPlaying) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };
    
    if (isPlaying) {
      animate();
    } else {
      drawBars();
    }
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [bars, progress, isPlaying, isDarkMode]);
  
  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current && containerRef.current) {
        const dpr = window.devicePixelRatio || 1;
        const rect = containerRef.current.getBoundingClientRect();
        canvasRef.current.width = rect.width * dpr;
        canvasRef.current.height = rect.height * dpr;
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Handle seek on click
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || !onSeek) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newPosition = (clickX / rect.width) * 100;
    onSeek(Math.max(0, Math.min(100, newPosition)));
  };
  
  return (
    <div 
      ref={containerRef}
      className={cn("relative cursor-pointer", className)}
      onClick={handleClick}
    >
      <canvas 
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />
    </div>
  );
}