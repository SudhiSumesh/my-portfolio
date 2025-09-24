import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, Github } from 'lucide-react';
import project1 from '@/assets/project-1.png';
import project2 from '@/assets/project-2.png';
import project3 from '@/assets/project-3.png';
import project4 from '@/assets/project-4.png';
import project5 from '@/assets/project-5.png';
import project6 from '@/assets/project-6.png';

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Horizontal scroll setup
      const container = containerRef.current;
      if (!container) return;

      const cards = container.querySelectorAll('.project-card');
      
      // Set up horizontal scroll
      gsap.to(cards, {
        xPercent: -100 * (cards.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: container,
          pin: true,
          scrub: 1,
          snap: 1 / (cards.length - 1),
          end: () => "+=" + container.offsetWidth,
          onUpdate: (self) => {
            // Add parallax effect to cards during scroll
            cards.forEach((card, i) => {
              const progress = self.progress;
              const cardProgress = (progress * cards.length) - i;
              
              if (cardProgress >= 0 && cardProgress <= 1) {
                gsap.set(card, {
                  scale: 0.9 + (0.1 * (1 - Math.abs(cardProgress - 0.5) * 2))
                });
              }
            });
          }
        }
      });

      // Individual card animations
      cards.forEach((card, i) => {
        gsap.fromTo(card,
          { opacity: 0, y: 100, scale: 0.8 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            delay: i * 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "left 80%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const projects = [
    {
      title: "3D Interactive Web",
      description: "Create immersive 3D web experiences with modern technologies",
      image: project1,
      tech: ["React", "Three.js", "GSAP"],
      github: "https://github.com/Sumesh.S/project1",
      live: "https://project1.Sumesh.Scode.com"
    },
    {
      title: "Next-Level Gaming UI",
      description: "Advanced gaming interface with real-time interactions",
      image: project2,
      tech: ["Next.js", "TypeScript", "WebSocket"],
      github: "https://github.com/Sumesh.S/project2",
      live: "https://project2.Sumesh.Scode.com"
    },
    {
      title: "3D Portfolio Platform",
      description: "Portfolio showcase with 3D elements and smooth animations",
      image: project3,
      tech: ["React", "Spline", "Framer Motion"],
      github: "https://github.com/Sumesh.S/project3",
      live: "https://project3.Sumesh.Scode.com"
    },
    {
      title: "Gaming Website",
      description: "Complete gaming platform with modern UI/UX",
      image: project4,
      tech: ["Vue.js", "Node.js", "MongoDB"],
      github: "https://github.com/Sumesh.S/project4",
      live: "https://project4.Sumesh.Scode.com"
    },
    {
      title: "Animation Tools Hub",
      description: "Collection of web animation tools and tutorials",
      image: project5,
      tech: ["React", "GSAP", "CSS3"],
      github: "https://github.com/Sumesh.S/project5",
      live: "https://project5.Sumesh.Scode.com"
    },
    {
      title: "Animated Portfolio",
      description: "Step-by-step tutorial for creating animated portfolios",
      image: project6,
      tech: ["HTML5", "CSS3", "JavaScript"],
      github: "https://github.com/Sumesh.S/project6",
      live: "https://project6.Sumesh.Sicode.com"
    }
  ];

  return (
    <section id="projects" ref={sectionRef} className="py-20 lg:py-32 relative overflow-hidden">
      {/* Section Header */}
      <div className="container mx-auto px-6 mb-16">
        <div className="text-center">
          <div className="font-mono text-sm text-primary mb-4">
            <span className="text-terminal-green">$</span> ls projects/
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            Featured <span className="text-primary glow-text">Projects</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            A collection of my best work showcasing modern web technologies and creative solutions
          </p>
          <div className="text-sm font-mono text-muted-foreground">
            <span className="text-terminal-amber">→</span> Scroll horizontally to explore
          </div>
        </div>
      </div>

      {/* Horizontal Scroll Container */}
      <div ref={containerRef} className="relative h-screen flex items-center">
        <div className="flex gap-8 px-6">
          {projects.map((project, index) => (
            <div 
              key={index}
              className="project-card flex-shrink-0 w-96 h-[500px] glass rounded-2xl overflow-hidden group cursor-pointer"
            >
              {/* Project Image */}
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Project Links */}
                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <a 
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-background/90 rounded-full flex items-center justify-center text-foreground hover:text-primary hover:shadow-neon transition-all duration-200"
                  >
                    <Github size={16} />
                  </a>
                  <a 
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-background/90 rounded-full flex items-center justify-center text-foreground hover:text-primary hover:shadow-neon transition-all duration-200"
                  >
                    <ExternalLink size={16} />
                  </a>
                </div>
              </div>

              {/* Project Content */}
              <div className="p-6 space-y-4 h-52 flex flex-col">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-200">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {project.description}
                  </p>
                </div>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span 
                      key={tech}
                      className="px-2 py-1 text-xs font-mono bg-background-secondary border border-border rounded text-primary hover:shadow-neon transition-all duration-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Action Button */}
                <button className="w-full py-2 mt-4 bg-transparent border border-primary text-primary font-mono text-sm hover:bg-primary hover:text-primary-foreground transition-all duration-200 rounded neon-glow opacity-0 group-hover:opacity-100">
                  View Project
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile Grid View */}
      <div className="md:hidden container mx-auto px-6 mt-16">
        <div className="grid gap-8">
          {projects.map((project, index) => (
            <div 
              key={index}
              className="glass rounded-2xl overflow-hidden group"
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>
                
                <div className="absolute top-4 right-4 flex gap-2">
                  <a 
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-background/90 rounded-full flex items-center justify-center text-foreground hover:text-primary transition-all duration-200"
                  >
                    <Github size={16} />
                  </a>
                  <a 
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-background/90 rounded-full flex items-center justify-center text-foreground hover:text-primary transition-all duration-200"
                  >
                    <ExternalLink size={16} />
                  </a>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-200">
                  {project.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span 
                      key={tech}
                      className="px-2 py-1 text-xs font-mono bg-background-secondary border border-border rounded text-primary"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Background Elements */}
      <div className="absolute top-1/4 left-16 w-32 h-32 bg-accent/5 rounded-full blur-xl animate-float"></div>
      <div className="absolute bottom-1/4 right-16 w-24 h-24 bg-primary/5 rounded-full blur-xl animate-float" style={{animationDelay: '2s'}}></div>
    </section>
  );
};

export default Projects;