import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader = ({ onComplete }: PreloaderProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const percentRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();
    
    // Initial setup
    gsap.set([progressRef.current, textRef.current], { opacity: 0, y: 30 });
    
    // Animate in
    tl.to([textRef.current, progressRef.current], {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: "power2.out"
    });
    
    // Progress bar animation
    tl.to(progressRef.current?.querySelector('.progress-fill'), {
      width: "100%",
      duration: 2.5,
      ease: "power2.out",
      onUpdate: function() {
        if (percentRef.current) {
          const progress = Math.round(this.progress() * 100);
          percentRef.current.textContent = `${progress}%`;
        }
      }
    });
    
    // Terminal flicker effect
    tl.to(textRef.current, {
      opacity: 0.8,
      duration: 0.1,
      repeat: 3,
      yoyo: true
    }, "-=0.5");
    
    // Exit animation
    tl.to(containerRef.current, {
      opacity: 0,
      scale: 0.9,
      duration: 1,
      ease: "power2.inOut",
      onComplete: () => {
        onComplete();
      }
    }, "+=0.3");

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-background"
    >
      {/* CRT Screen Effect */}
      <div className="relative w-full max-w-2xl mx-auto p-8">
        <div className="crt-effect bg-background-secondary rounded-lg border border-border p-12 shadow-terminal">
          {/* Terminal Header */}
          <div className="flex items-center gap-2 mb-8">
            <div className="w-3 h-3 rounded-full bg-destructive animate-glow"></div>
            <div className="w-3 h-3 rounded-full bg-terminal-amber animate-glow"></div>
            <div className="w-3 h-3 rounded-full bg-terminal-green animate-glow"></div>
            <span className="ml-4 text-muted-foreground text-sm font-mono">Terminal v2.1.0</span>
          </div>

          {/* Loading Text */}
          <div ref={textRef} className="mb-8 space-y-2">
            <div className="font-mono text-2xl text-terminal-amber glow-text animate-flicker">
              <span className="text-terminal-green">$</span> Initializing Portfolio...
            </div>
            <div className="font-mono text-sm text-muted-foreground">
              Loading Sumesh.S's creative universe
            </div>
          </div>

          {/* Progress Bar */}
          <div ref={progressRef} className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="font-mono text-sm text-foreground">Progress:</span>
              <span ref={percentRef} className="font-mono text-sm text-primary glow-text">0%</span>
            </div>
            <div className="w-full h-2 bg-muted rounded-sm overflow-hidden">
              <div className="progress-fill h-full bg-gradient-terminal w-0 shadow-amber"></div>
            </div>
          </div>

          {/* Scan Lines */}
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            <div className="h-1 w-full bg-primary animate-scan"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preloader;