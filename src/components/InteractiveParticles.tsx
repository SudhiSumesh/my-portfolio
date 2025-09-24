import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

interface Particle {
  id: number;
  x: number;
  y: number;
  originalX: number;
  originalY: number;
  size: number;
  opacity: number;
  color: string;
  vx: number;
  vy: number;
}

const InteractiveParticles = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationRef = useRef<number>();
  const [isInitialized, setIsInitialized] = useState(false);

  // Color palette for particles
  const colors = ['#00ffff', '#ffff00', '#ffffff', '#ff00ff', '#00ff00'];

  // Generate particles
  const generateParticles = (width: number, height: number): Particle[] => {
    const particles: Particle[] = [];
    const particleCount = Math.floor((width * height) / 6000);
    
    for (let i = 0; i < particleCount; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      
      particles.push({
        id: i,
        x,
        y,
        originalX: x,
        originalY: y,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.8 + 0.2,
        color: colors[Math.floor(Math.random() * colors.length)],
        vx: 0,
        vy: 0
      });
    }
    
    return particles;
  };

  // Initialize particles and canvas
  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const rect = container.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
    
    particlesRef.current = generateParticles(rect.width, rect.height);
    setIsInitialized(true);

    // Handle resize
    const handleResize = () => {
      const newRect = container.getBoundingClientRect();
      canvas.width = newRect.width;
      canvas.height = newRect.height;
      particlesRef.current = generateParticles(newRect.width, newRect.height);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Animation and rendering
  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas || !isInitialized) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    };

    const handleMouseLeave = () => {
      // Reset mouse position to center when leaving
      mouseRef.current = {
        x: canvas.width / 2,
        y: canvas.height / 2
      };
    };

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const mouse = mouseRef.current;
      
      // Update and draw particles
      particlesRef.current.forEach((particle, index) => {
        const dx = particle.x - mouse.x;
        const dy = particle.y - mouse.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = 120;
        
        if (distance < maxDistance && distance > 0) {
          // Calculate repulsion force
          const force = (maxDistance - distance) / maxDistance;
          const angle = Math.atan2(dy, dx);
          
          // Apply force
          const pushStrength = force * 2;
          particle.vx += Math.cos(angle) * pushStrength;
          particle.vy += Math.sin(angle) * pushStrength;
          
          // Increase opacity when affected
          particle.opacity = Math.min(1, 0.3 + force * 0.7);
          particle.size = Math.max(0.5, 1 + force * 2);
        } else {
          // Return to original position
          const returnForce = 0.05;
          particle.vx += (particle.originalX - particle.x) * returnForce;
          particle.vy += (particle.originalY - particle.y) * returnForce;
          
          // Fade back to normal
          particle.opacity = Math.max(0.2, particle.opacity * 0.98);
          particle.size = Math.max(0.5, particle.size * 0.99);
        }
        
        // Apply velocity with damping
        particle.vx *= 0.9;
        particle.vy *= 0.9;
        particle.x += particle.vx;
        particle.y += particle.vy;
        
        // Keep particles in bounds
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -0.8;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -0.8;
        particle.x = Math.max(0, Math.min(canvas.width, particle.x));
        particle.y = Math.max(0, Math.min(canvas.height, particle.y));
        
        // Draw particle with glow effect
        ctx.save();
        ctx.globalAlpha = particle.opacity;
        
        // Glow effect
        ctx.shadowColor = particle.color;
        ctx.shadowBlur = particle.size * 3;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();
        
        // Inner bright core
        ctx.shadowBlur = 0;
        ctx.globalAlpha = particle.opacity * 0.8;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size * 0.3, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.fill();
        
        ctx.restore();
        
        // Draw connections to nearby particles
        particlesRef.current.slice(index + 1).forEach(otherParticle => {
          const dx2 = particle.x - otherParticle.x;
          const dy2 = particle.y - otherParticle.y;
          const dist2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);
          
          if (dist2 < 100) {
            const alpha = (100 - dist2) / 100 * 0.3;
            ctx.save();
            ctx.globalAlpha = alpha * Math.min(particle.opacity, otherParticle.opacity);
            ctx.strokeStyle = particle.color;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.stroke();
            ctx.restore();
          }
        });
      });
      
      animationRef.current = requestAnimationFrame(animate);
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);
    
    // Initialize mouse at center
    mouseRef.current = {
      x: canvas.width / 2,
      y: canvas.height / 2
    };
    
    // Start animation
    animate();

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isInitialized]);

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-full bg-gradient-to-br from-background via-background-secondary to-background overflow-hidden cursor-crosshair rounded-xl"
      style={{ minHeight: '400px' }}
    >
      {/* Canvas for particles */}
      <canvas 
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />

      {/* Interactive Instructions */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
        <div className="text-center space-y-4 opacity-70 hover:opacity-100 transition-opacity duration-500">
          <div className="text-4xl mb-4 animate-glow">⭐</div>
          <p className="font-mono text-sm text-primary glow-text animate-flicker">
            Move your mouse
          </p>
          <p className="font-mono text-xs text-muted-foreground">
            Interactive Particle System
          </p>
        </div>
      </div>

      {/* Corner decorations */}
      <div className="absolute top-2 left-2 w-3 h-3 border-l-2 border-t-2 border-primary/40"></div>
      <div className="absolute top-2 right-2 w-3 h-3 border-r-2 border-t-2 border-primary/40"></div>
      <div className="absolute bottom-2 left-2 w-3 h-3 border-l-2 border-b-2 border-primary/40"></div>
      <div className="absolute bottom-2 right-2 w-3 h-3 border-r-2 border-b-2 border-primary/40"></div>
      
      {/* Scan lines overlay */}
      <div className="absolute inset-0 opacity-5 pointer-events-none crt-effect rounded-xl"></div>
      
      {/* Subtle glow border */}
      <div className="absolute inset-0 rounded-xl border border-primary/20 pointer-events-none"></div>
    </div>
  );
};

export default InteractiveParticles;