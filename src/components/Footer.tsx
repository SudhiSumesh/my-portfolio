import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUp, Heart, Terminal } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Footer fade-in animation
      gsap.fromTo(footerRef.current,
        { opacity: 0, y: 60, filter: 'blur(10px)' },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 90%",
          }
        }
      );

      // Animate footer content elements
      gsap.fromTo(footerRef.current?.querySelectorAll('.footer-item'),
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 85%",
          }
        }
      );

      // Floating particles animation
      const particles = particlesRef.current?.querySelectorAll('.particle');
      particles?.forEach((particle, i) => {
        gsap.to(particle, {
          y: -30,
          duration: 3 + Math.random() * 2,
          repeat: -1,
          yoyo: true,
          delay: i * 0.5,
          ease: "power1.inOut"
        });
      });

    }, footerRef);

    return () => ctx.revert();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  const services = [
    'Full-Stack Development',
    'Frontend Design',
    'Backend Architecture',
    'API Development',
    // '3D Web Experiences',
    'Performance Optimization'
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer ref={footerRef} className="relative bg-background-secondary border-t border-border mt-20">
      {/* Floating Particles Background */}
      <div ref={particlesRef} className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className={`particle absolute w-1 h-1 bg-primary rounded-full opacity-30 animate-glow`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.3}s`
            }}
          ></div>
        ))}
      </div>

      <div className="container mx-auto px-6 py-16">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <div className="footer-item space-y-4">
            <div className="font-mono text-xl font-bold text-primary gow-text">
              <span className="text-terminal-amber">{'<'}</span>
              sumesh.dev
              <span className="text-terminal-amber">{'/>'}</span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Crafting digital experiences with modern technologies. 
              Full-stack developer passionate about creating innovative solutions.
            </p>
            <div className="flex items-center gap-2 text-sm font-mono">
              <Terminal className="text-primary" size={16} />
              <span className="text-muted-foreground">Always coding, always learning</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-item space-y-4">
            <h3 className="font-mono text-sm font-semibold text-foreground">
              <span className="text-terminal-green">$</span> Navigation
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-muted-foreground hover:text-primary transition-colors duration-200 text-sm font-mono hover:glow-text"
                  >
                    <span className="text-terminal-green">•</span> {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="footer-item space-y-4">
            <h3 className="font-mono text-sm font-semibold text-foreground">
              <span className="text-terminal-green">$</span> Services
            </h3>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service}>
                  <span className="text-muted-foreground text-sm font-mono">
                    <span className="text-terminal-green">•</span> {service}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Terminal Status */}
          <div className="footer-item space-y-4">
            <h3 className="font-mono text-sm font-semibold text-foreground">
              <span className="text-terminal-green">$</span> Status
            </h3>
            <div className="glass rounded-lg p-4 space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-terminal-green rounded-full animate-glow"></div>
                <span className="text-xs font-mono text-foreground">System Online</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-terminal-amber rounded-full animate-glow"></div>
                <span className="text-xs font-mono text-muted-foreground">Available for Projects</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full animate-glow"></div>
                <span className="text-xs font-mono text-muted-foreground">Actively Learning</span>
              </div>
            </div>
            
            {/* Back to Top Button */}
            <button
              onClick={scrollToTop}
              className="w-full px-4 py-2 bg-transparent border border-primary text-primary font-mono text-xs hover:bg-primary hover:text-primary-foreground transition-all duration-200 rounded neon-glow flex items-center justify-center gap-2"
            >
              <ArrowUp size={14} />
              Back to Top
            </button>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="footer-item pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <div className="flex items-center gap-2 text-sm text-muted-foreground font-mono">
              <span>© {new Date().getFullYear()} sumesh.s Code. Made with</span>
              <Heart className="text-destructive animate-glow" size={14} />
              <span>and lots of ☕</span>
            </div>

            {/* Terminal Command */}
            <div className="text-sm font-mono text-muted-foreground">
              <span className="text-terminal-green">Sumesh.S@portfolio</span>
              <span>:</span>
              <span className="text-terminal-cyan">~</span>
              <span>$ whoami</span>
              <span className="text-primary ml-2 glow-tex animate-flicker">developer</span>
            </div>
          </div>

          {/* Terminal Quote */}
          <div className="mt-6 p-4 bg-background/50 rounded-lg border border-border/30">
            <div className="font-mono text-xs space-y-1">
              <div className="text-terminal-green">
                <span className="animate-flicker">{'>'}</span> console.log("Thanks for visiting!");
              </div>
              <div className="text-terminal-amber">
                Thanks for visiting!
              </div>
              <div className="text-muted-foreground">
                <span className="animate-flicker">{'>'}</span> Let's build something amazing together 🚀
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Glowing Bottom Border */}
      <div className="h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-50"></div>
    </footer>
  );
};

export default Footer;