import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { useTheme } from '@/components/ThemeProvider';

export function SpaceGameScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const requestRef = useRef<number>();
  const [isInitialized, setIsInitialized] = useState(false);
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';

  // Game state
  const gameStateRef = useRef({
    shipY: 0,
    shipFloatOffset: 0,
    shipFloatDirection: 1,
    backgroundLayers: [
      { x: 0, speed: 0.1, image: null as HTMLImageElement | null }, // Far stars
      { x: 0, speed: 0.2, image: null as HTMLImageElement | null }, // Nebulas
      { x: 0, speed: 0.3, image: null as HTMLImageElement | null }, // Distant structures
      { x: 0, speed: 0.5, image: null as HTMLImageElement | null }, // Closer structures
    ],
    engineGlowIntensity: 0,
    engineGlowDirection: 1,
  });

  // Initialize game
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      const { width, height } = canvas.getBoundingClientRect();
      canvas.width = width;
      canvas.height = height;
      
      // Reset ship position
      gameStateRef.current.shipY = height * 0.7; // Position ship at 70% of height instead of 80%
    };

    // Load background images
    const loadImages = async () => {
      const layers = [
        'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=1000&h=300&fit=crop&q=80&auto=format', // Far stars
        'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=1000&h=300&fit=crop&q=80&auto=format', // Nebulas
        'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1000&h=300&fit=crop&q=80&auto=format', // Distant structures
        'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=1000&h=300&fit=crop&q=80&auto=format', // Closer structures
      ];

      for (let i = 0; i < layers.length; i++) {
        const img = new Image();
        img.src = layers[i];
        img.onload = () => {
          gameStateRef.current.backgroundLayers[i].image = img;
        };
      }
    };

    resizeCanvas();
    loadImages();
    window.addEventListener('resize', resizeCanvas);
    setIsInitialized(true);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, []);

  // Game loop
  useEffect(() => {
    if (!isInitialized) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const gameLoop = () => {
      const { width, height } = canvas;
      const gameState = gameStateRef.current;

      // Clear canvas
      ctx.clearRect(0, 0, width, height);

      // Update background positions
      gameState.backgroundLayers.forEach(layer => {
        layer.x -= layer.speed;
        if (layer.x <= -width) {
          layer.x = 0;
        }
      });

      // Update ship float animation
      gameState.shipFloatOffset += 0.05 * gameState.shipFloatDirection;
      if (Math.abs(gameState.shipFloatOffset) > 2) { // Reduced float range
        gameState.shipFloatDirection *= -1;
      }

      // Update engine glow
      gameState.engineGlowIntensity += 0.05 * gameState.engineGlowDirection;
      if (gameState.engineGlowIntensity > 1 || gameState.engineGlowIntensity < 0.5) {
        gameState.engineGlowDirection *= -1;
      }

      // Draw background layers (parallax effect)
      gameState.backgroundLayers.forEach(layer => {
        if (layer.image) {
          // Draw the image twice to create a seamless loop
          ctx.drawImage(layer.image, layer.x, 0, width, height);
          ctx.drawImage(layer.image, layer.x + width, 0, width, height);
        }
      });

      // Draw spaceship - smaller size (3% of width instead of 5%)
      const shipWidth = width * 0.03;
      const shipHeight = height * 0.015;
      const shipX = width * 0.15;
      const shipY = gameState.shipY + gameState.shipFloatOffset;

      // Ship body (sleek design)
      ctx.fillStyle = isDarkMode ? '#e0e0e0' : '#2a2a2a';
      ctx.beginPath();
      ctx.moveTo(shipX, shipY);
      ctx.lineTo(shipX + shipWidth * 0.8, shipY - shipHeight * 0.5);
      ctx.lineTo(shipX + shipWidth, shipY);
      ctx.lineTo(shipX + shipWidth * 0.8, shipY + shipHeight * 0.5);
      ctx.closePath();
      ctx.fill();

      // Engine glow
      const glowRadius = shipWidth * 0.3 * gameState.engineGlowIntensity;
      const gradient = ctx.createRadialGradient(
        shipX, shipY, 0,
        shipX, shipY, glowRadius
      );
      gradient.addColorStop(0, 'rgba(0, 255, 255, 0.8)');
      gradient.addColorStop(1, 'rgba(0, 255, 255, 0)');
      
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(shipX, shipY, glowRadius, 0, Math.PI * 2);
      ctx.fill();

      // Cockpit
      ctx.fillStyle = isDarkMode ? '#4a9eff' : '#1a6eff';
      ctx.beginPath();
      ctx.ellipse(
        shipX + shipWidth * 0.6, 
        shipY, 
        shipWidth * 0.15, 
        shipHeight * 0.4, 
        0, 0, Math.PI * 2
      );
      ctx.fill();

      // Ship details
      ctx.strokeStyle = isDarkMode ? '#9f9fff' : '#6a6aff';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(shipX + shipWidth * 0.3, shipY - shipHeight * 0.3);
      ctx.lineTo(shipX + shipWidth * 0.7, shipY - shipHeight * 0.3);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(shipX + shipWidth * 0.3, shipY + shipHeight * 0.3);
      ctx.lineTo(shipX + shipWidth * 0.7, shipY + shipHeight * 0.3);
      ctx.stroke();

      requestRef.current = requestAnimationFrame(gameLoop);
    };

    requestRef.current = requestAnimationFrame(gameLoop);

    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [isInitialized, isDarkMode]);

  return (
    <div className="w-full h-full relative overflow-hidden">
      {/* Dark overlay for mood */}
      <div className="absolute inset-0 bg-gradient-to-t from-purple-900/30 to-transparent z-10 pointer-events-none"></div>
      
      {/* Game canvas */}
      <canvas 
        ref={canvasRef} 
        className="w-full h-full bg-gradient-to-b from-black to-purple-950"
      />
      
      {/* Neon accents */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-fuchsia-500 to-transparent opacity-50"></div>
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-30"></div>
    </div>
  );
}