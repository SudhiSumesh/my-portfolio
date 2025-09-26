import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Menu, X, Github, Linkedin, Mail } from 'lucide-react';
const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (menuRef.current) {
      if (isOpen) {
        gsap.fromTo(menuRef.current, 
          { x: '100%', opacity: 0 },
          { x: '0%', opacity: 1, duration: 0.3, ease: "power2.out" }
        );
      } else {
        gsap.to(menuRef.current, 
          { x: '100%', opacity: 0, duration: 0.3, ease: "power2.in" }
        );
      }
    }
  }, [isOpen]);

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  const socialLinks = [
    { icon: Github, href: 'https://github.com/SudhiSumesh/Sumesh.S/', label: 'GitHub' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/sumeshsudhi', label: 'LinkedIn' },
    { icon: Mail, href: 'mailto:sudhisumesh01@gmail.com', label: 'Email' },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  return (
    <>
      <nav 
        ref={navRef}
        className={`fixed top-0 w-full z-40 transition-all duration-300 ${
          scrolled ? 'glass backdrop-blur-md' : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="font-mono text-xl font-bold text-primary glow-ext">
              <span className="text-terminal-amber">{'< '}</span>
               sumesh.dev
              <span className="text-terminal-amber">{' />'}</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className="font-mono text-sm text-foreground hover:text-primary transition-colors duration-200 hover:glow-text"
                >
                  <span className="text-terminal-green">0{navItems.indexOf(item) + 1}.</span> {item.name}
                </button>
              ))}
              
              {/* Social Icons */}
              <div className="flex items-center space-x-4 ml-8">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors duration-200 hover:shadow-neon"
                    aria-label={social.label}
                  >
                    <social.icon size={18} />
                  </a>
                ))}
              </div>

              {/* Hire Me Button */}
              <a  href="/sumesh.s.pdf" target='_blank'>
              <button className="px-6 py-2 bg-transparent border border-primary text-primary font-mono text-sm hover:bg-primary hover:text-primary-foreground transition-all duration-200 rounded neon-glow">
               Resume
              </button>
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-primary hover:text-primary-glow transition-colors duration-200"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 z-30 md:hidden ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}>
        {/* Backdrop */}
        <div 
          className={`absolute inset-0 bg-background/95 backdrop-blur-md transition-opacity duration-300 ${
            isOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setIsOpen(false)}
        />

        {/* Menu Content */}
        <div 
          ref={menuRef}
          className="absolute right-0 top-0 h-full w-80 max-w-sm bg-background-secondary border-l border-border p-6 shadow-glass"
        >
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div className="font-mono text-lg font-bold text-primary glow-text">
                Menu
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-primary hover:text-primary-glow transition-colors duration-200"
              >
                <X size={24} />
              </button>
            </div>

            {/* Navigation Items */}
            <div className="flex-1 space-y-6">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className="block w-full text-left font-mono text-lg text-foreground hover:text-primary transition-colors duration-200 hover:glow-text"
                >
                  <span className="text-terminal-green">0{navItems.indexOf(item) + 1}.</span> {item.name}
                </button>
              ))}
            </div>

            {/* Social Links */}
            <div className="flex items-center justify-center space-x-6 mb-6">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors duration-200 hover:shadow-neon"
                  aria-label={social.label}
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>

            {/* Hire Me Button */}
            <a href="/sumesh.s.pdf" target='_blank' >

            <button className="w-full px-6 py-3 bg-transparent border border-primary text-primary font-mono hover:bg-primary hover:text-primary-foreground transition-all duration-200 rounded neon-glow">
              Hire Me
            </button>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navigation;