import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ChevronDown } from 'lucide-react';
import InteractiveParticles from './InteractiveParticles';

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const splineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.5 });
    
    // Initial setup
    gsap.set([titleRef.current, subtitleRef.current, ctaRef.current], {
      opacity: 0,
      y: 60,
      filter: 'blur(10px)'
    });

    gsap.set(splineRef.current, {
      opacity: 0,
      x: 100,
      scale: 0.8
    });

    // Animate in sequence
    tl.to(titleRef.current, {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 1.2,
      ease: "power2.out"
    })
    .to(subtitleRef.current, {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 1,
      ease: "power2.out"
    }, "-=0.8")
    .to(ctaRef.current, {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 0.8,
      ease: "power2.out"
    }, "-=0.6")
    .to(splineRef.current, {
      opacity: 1,
      x: 0,
      scale: 1,
      duration: 1.2,
      ease: "power2.out"
    }, "-=1");

    // Floating animation for CTA
    gsap.to(ctaRef.current, {
      y: -10,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut"
    });

    return () => {
      tl.kill();
    };
  }, []);

  const scrollToAbout = () => {
    const aboutSection = document.querySelector('#about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div ref={containerRef} className="container mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            {/* Terminal Prompt */}
            <div className="font-mono text-sm text-muted-foreground mb-4">
              <span className="text-terminal-green">Sumesh.S@portfolio</span>
              <span className="text-foreground">:</span>
              <span className="text-terminal-cyan">~</span>
              <span className="text-foreground">$ ./introduce</span>
              <span className="animate-flicker">_</span>
            </div>

            {/* Main Headline */}
            <div ref={titleRef} className="space-y-4">
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                <span className="text-foreground">Hi, I'm </span>
                <span className="text-primary glow-tet animate-flicker">Sumesh</span>
              </h1>
              <div className="text-2xl lg:text-3xl font-mono text-terminal-amber glo-text">
                <div>• Software Engineer</div>
                <div>• Full-Stack Developer</div>
              </div>
            </div>

            {/* Subtitle */}
            <div ref={subtitleRef} className="space-y-4">
              <p className="text-lg text-muted-foreground max-w-lg leading-relaxed">
                Crafting digital experiences with the MERN stack, Next.js, Python, and cutting-edge technologies. 
                Turning ideas into immersive web applications.
              </p>

              {/* Tech Stack Display */}
              <div className="flex flex-wrap gap-2 text-sm font-mono">
                {['React', 'Node.js', 'Python', 'Next.js', 'Docker', 'AWS', 'MySQL','MongoDB'].map((tech) => (
                  <span 
                    key={tech}
                    className="px-3 py-1 bg-background-secondary border border-border rounded text-primary hover:shadow-neon transition-all duration-200"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* CTA Button */}
            <button
              ref={ctaRef}
              onClick={scrollToAbout}
              className="group px-8 py-4 bg-gradient-cyber text-background font-mono font-medium rounded-lg neon-glow hover:scale-105 transition-all duration-300"
            >
              <span className="flex items-center gap-2">
                Explore My Work
                <ChevronDown className="group-hover:translate-y-1 transition-transform duration-200" size={20} />
              </span>
            </button>
          </div>

          {/* Right Content - Interactive Particles */}
          <div ref={splineRef} className="relative">
            <div className="glass rounded-2xl p-4 h-96 lg:h-[500px]">
              <InteractiveParticles />
            </div>

            {/* Background Elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-accent/10 rounded-full blur-xl animate-glow"></div>
            <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-primary/10 rounded-full blur-xl animate-glow" style={{animationDelay: '1s'}}></div>
          </div>
        </div>
      </div>

      {/* Background Grid */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="w-full h-full" style={{
          backgroundImage: `
            linear-gradient(hsla(180, 100%, 60%, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, hsla(180, 100%, 60%, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(26)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-1 h-1 bg-primary rounded-full animate-float opacity-40`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 2}s`,
              animationDuration: `${4 + Math.random() * 4}s`
            }}
          ></div>
        ))}
      </div>
    </section>
  );
};

export default Hero;