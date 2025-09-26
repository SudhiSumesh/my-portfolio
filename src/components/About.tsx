import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
// import profileImage from '@/assets/profile.png';
import profileImage from '@/assets/profile-ai.png';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Main section animation
      gsap.fromTo(sectionRef.current, 
        { opacity: 0, y: 100 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "bottom 20%",
          }
        }
      );

      // Image animation
      gsap.fromTo(imageRef.current,
        { opacity: 0, x: -100, rotateY: 45 },
        {
          opacity: 1,
          x: 0,
          rotateY: 0,
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: imageRef.current,
            start: "top 80%",
          }
        }
      );

      // Content animation
      gsap.fromTo(contentRef.current?.children,
        { opacity: 0, y: 50, filter: 'blur(10px)' },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.8,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 80%",
          }
        }
      );

      // Skills animation
      gsap.fromTo(skillsRef.current?.children,
        { opacity: 0, scale: 0.8, y: 30 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: skillsRef.current,
            start: "top 80%",
          }
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // const skills = [
  //   { name: 'React', icon: '⚛️' },
  //   { name: 'Node.js', icon: '🟢' },
  //   { name: 'Python', icon: '🐍' },
  //   { name: 'Next.js', icon: '▲' },
  //   { name: 'TypeScript', icon: '🔷' },
  //   { name: 'Docker', icon: '🐋' },
  //   { name: 'AWS', icon: '☁️' },
  //   { name: 'MySQL', icon: '🗄️' },
  //   { name: 'MongoDB', icon: '🍃' },
  //   { name: 'Express', icon: '🚀' },
  //   { name: 'GSAP', icon: '🎭' },
  //   { name: 'Git', icon: '📚' }
  // ];
const skills = [
  { name: 'React', icon: '⚛️' },
  { name: 'Node.js', icon: '🟢' },
  { name: 'Python', icon: '🐍' },
  { name: 'Next.js', icon: '▲' },
  { name: 'TypeScript', icon: '🔷' },
  { name: 'Docker', icon: '🐋' },
  { name: 'AWS', icon: '☁️' },
  { name: 'MySQL', icon: '🗄️' },
  { name: 'MongoDB', icon: '🍃' },
  { name: 'Express', icon: '🚀' },
  { name: 'GSAP', icon: '🎭' },
  { name: 'Git', icon: '📚' },
  { name: 'HTML5', icon: '📄' },
  { name: 'CSS3', icon: '🎨' },
  { name: 'SCSS', icon: '💅' },
  { name: 'JavaScript', icon: '✨' },
  { name: 'Redux', icon: '🔁' },
  { name: 'Socket.IO', icon: '🔌' },
  { name: 'React Flow', icon: '🔀' },
  { name: 'React-dnd', icon: '🧲' },
  { name: 'Tailwind CSS', icon: '🌬️' },
  { name: 'Bootstrap', icon: '👢' },
  { name: 'Material-UI', icon: '📐' },
  { name: 'Ant Design', icon: '🐜' },
  { name: 'RESTful APIs', icon: '🔗' },
  { name: 'JWT Authentication', icon: '🔒' },
  { name: 'Keycloak', icon: '🛡️' },
  { name: 'FastAPI', icon: '⚡' },
  { name: 'SQLite', icon: '💾' },
  { name: 'Bitbucket', icon: '🧺' },
  { name: 'Jira', icon: '📋' },
  { name: 'Postman', icon: '📮' },
  { name: 'VS Code', icon: '🖥️' }
];

  return (
    <section id="about" ref={sectionRef} className="py-20 lg:py-32 relative">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="font-mono text-sm text-primary mb-4">
            <span className="text-terminal-green">$</span> cat about.txt
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            About <span className="text-primary glow-text">Me</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Passionate developer crafting digital experiences with modern technologies
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Profile Image */}
          <div ref={imageRef} className="relative">
            <div className="relative group">
              {/* Glowing border */}
              <div className="absolute -inset-4 bg-gradient-cyber rounded-full blur opacity-20 group-hover:opacity-30 transition-opacity duration-500"></div>
              
              {/* Image container */}
              <div className="relative glass rounded-full p-4 transform group-hover:scale-105 transition-all duration-500">
                <div className="w-80 h-80 mx-auto rounded-full overflow-hidden border-2 border-primary/20 shadow-neon">
                  <img 
                    src={profileImage} 
                    alt="Sumesh.S - Software Developer"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-accent rounded-full blur-sm animate-float opacity-60"></div>
              <div className="absolute -bottom-8 -left-8 w-6 h-6 bg-primary rounded-full blur-sm animate-float opacity-80" style={{animationDelay: '2s'}}></div>
            </div>
          </div>

          {/* Content */}
          <div ref={contentRef} className="space-y-8">
            {/* Bio */}
            <div className="space-y-6 text-lg leading-relaxed">
              <div>
                <span className="text-terminal-green font-mono">{'> '}</span>
                <span className="text-foreground">
                  Hi there! I'm <span className="text-primary font-semibold">Sumesh.S</span>, 
                  a passionate full-stack developer with expertise in modern web technologies.
                </span>
              </div>
              
              <div>
                <span className="text-terminal-green font-mono">{'> '}</span>
                <span className="text-muted-foreground">
                  I specialize in building scalable applications using the <span className="text-primary">MERN stack</span>, 
                  <span className="text-primary"> Next.js</span>, and <span className="text-primary">Python</span>. 
                  My goal is to create seamless user experiences backed by robust, efficient code.
                </span>
              </div>

              <div>
                <span className="text-terminal-green font-mono">{'> '}</span>
                <span className="text-muted-foreground">
                  When I'm not coding, you'll find me exploring new technologies, contributing to open-source projects, 
                  or experimenting with creative animations and 3D web experiences.
                </span>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary glow-text">2+</div>
                <div className="text-sm text-muted-foreground font-mono">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary glow-text">10+</div>
                <div className="text-sm text-muted-foreground font-mono">Projects Completed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary glow-text">10+</div>
                <div className="text-sm text-muted-foreground font-mono">Technologies</div>
              </div>
            </div>
          </div>
        </div>

        {/* Skills Grid */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <div className="font-mono text-sm text-primary mb-4">
              <span className="text-terminal-green">$</span> ls skills/
            </div>
            <h3 className="text-2xl lg:text-3xl font-bold mb-4">
              Tech <span className="text-primary glow-text">Arsenal</span>
            </h3>
          </div>

          <div ref={skillsRef} className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {skills.map((skill, index) => (
              <div 
                key={skill.name}
                className="group glass rounded-lg p-4 text-center hover:shadow-neon hover:scale-105 transition-all duration-300 cursor-pointer"
              >
                <div className="text-2xl mb-2 group-hover:animate-bounce">
                  {skill.icon}
                </div>
                <div className="font-mono text-sm text-foreground group-hover:text-primary transition-colors duration-200">
                  {skill.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Background Elements */}
      <div className="absolute top-1/4 left-8 w-24 h-24 bg-accent/5 rounded-full blur-xl animate-float"></div>
      <div className="absolute bottom-1/4 right-8 w-32 h-32 bg-primary/5 rounded-full blur-xl animate-float" style={{animationDelay: '3s'}}></div>
    </section>
  );
};

export default About;