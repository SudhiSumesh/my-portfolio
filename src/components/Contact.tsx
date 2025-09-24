import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Send, Mail, MapPin, Phone, Github, Linkedin, Twitter } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const contactInfoRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

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
          }
        }
      );

      // Form animation
      gsap.fromTo(formRef.current?.children,
        { opacity: 0, x: -50, filter: 'blur(10px)' },
        {
          opacity: 1,
          x: 0,
          filter: 'blur(0px)',
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: formRef.current,
            start: "top 80%",
          }
        }
      );

      // Contact info animation
      gsap.fromTo(contactInfoRef.current?.children,
        { opacity: 0, x: 50, filter: 'blur(10px)' },
        {
          opacity: 1,
          x: 0,
          filter: 'blur(0px)',
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: contactInfoRef.current,
            start: "top 80%",
          }
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setFormData({ name: '', email: '', message: '' });
      
      // Success animation
      gsap.fromTo('.success-message', 
        { opacity: 0, scale: 0.8, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 0.5, ease: "back.out(1.7)" }
      );
      
      setTimeout(() => {
        gsap.to('.success-message', { opacity: 0, y: -20, duration: 0.3 });
      }, 3000);
    }, 2000);
  };

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'Sumesh.S@example.com',
      link: 'mailto:Sumesh.S@example.com'
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+1 (555) 123-4567',
      link: 'tel:+15551234567'
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'San Francisco, CA',
      link: 'https://maps.google.com/?q=San+Francisco,CA'
    }
  ];

  const socialLinks = [
    { icon: Github, href: 'https://github.com/Sumesh.S', label: 'GitHub' },
    { icon: Linkedin, href: 'https://linkedin.com/in/Sumesh.S', label: 'LinkedIn' },
    { icon: Twitter, href: 'https://twitter.com/Sumesh.S', label: 'Twitter' },
  ];

  return (
    <section id="contact" ref={sectionRef} className="py-20 lg:py-32 relative">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="font-mono text-sm text-primary mb-4">
            <span className="text-terminal-green">$</span> ./contact --interactive
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            Get In <span className="text-primary glow-text">Touch</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Have a project in mind or just want to say hello? 
            I'd love to hear from you. Let's create something amazing together.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <div className="space-y-8">
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <div className="space-y-2">
                <label className="block font-mono text-sm text-foreground">
                  <span className="text-terminal-green">$</span> Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-background-secondary border border-border rounded-lg focus:border-primary focus:ring-1 focus:ring-primary focus:shadow-neon transition-all duration-200 font-mono text-foreground placeholder-muted-foreground"
                  placeholder="Enter your name"
                />
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <label className="block font-mono text-sm text-foreground">
                  <span className="text-terminal-green">$</span> Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-background-secondary border border-border rounded-lg focus:border-primary focus:ring-1 focus:ring-primary focus:shadow-neon transition-all duration-200 font-mono text-foreground placeholder-muted-foreground"
                  placeholder="your.email@example.com"
                />
              </div>

              {/* Message Field */}
              <div className="space-y-2">
                <label className="block font-mono text-sm text-foreground">
                  <span className="text-terminal-green">$</span> Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 bg-background-secondary border border-border rounded-lg focus:border-primary focus:ring-1 focus:ring-primary focus:shadow-neon transition-all duration-200 font-mono text-foreground placeholder-muted-foreground resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="group w-full px-8 py-4 bg-gradient-cyber text-background font-mono font-medium rounded-lg neon-glow hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:hover:scale-100"
              >
                <span className="flex items-center justify-center gap-2">
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-background border-t-transparent rounded-full animate-spin"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send className="group-hover:translate-x-1 transition-transform duration-200" size={18} />
                    </>
                  )}
                </span>
              </button>

              {/* Success Message */}
              <div className="success-message opacity-0 text-center py-4">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-terminal-green/10 border border-terminal-green/20 rounded-lg text-terminal-green font-mono text-sm">
                  ✓ Message sent successfully!
                </div>
              </div>
            </form>
          </div>

          {/* Contact Information */}
          <div ref={contactInfoRef} className="space-y-8">
            {/* Contact Details */}
            <div className="glass rounded-2xl p-8 space-y-6">
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-foreground mb-4">
                  <span className="text-terminal-green font-mono">{'> '}</span>
                  Contact Info
                </h3>
                
                {contactInfo.map((info, index) => (
                  <a 
                    key={index}
                    href={info.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-3 rounded-lg hover:bg-background-secondary/50 transition-colors duration-200 group"
                  >
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center group-hover:shadow-neon transition-all duration-200">
                      <info.icon className="text-primary" size={18} />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">{info.label}</div>
                      <div className="font-mono text-foreground group-hover:text-primary transition-colors duration-200">
                        {info.value}
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div className="glass rounded-2xl p-8">
              <h3 className="text-xl font-bold text-foreground mb-6">
                <span className="text-terminal-green font-mono">{'> '}</span>
                Connect With Me
              </h3>
              
              <div className="flex gap-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-background-secondary border border-border rounded-lg flex items-center justify-center text-muted-foreground hover:text-primary hover:shadow-neon hover:scale-110 transition-all duration-200"
                    aria-label={social.label}
                  >
                    <social.icon size={20} />
                  </a>
                ))}
              </div>

              <div className="mt-6 p-4 bg-background-secondary/50 rounded-lg">
                <div className="font-mono text-sm text-muted-foreground">
                  <span className="text-terminal-amber">Status:</span>
                  <span className="text-terminal-green ml-2">Available for new projects</span>
                </div>
              </div>
            </div>

            {/* Terminal Quote */}
            <div className="glass rounded-2xl p-8 crt-effect">
              <div className="font-mono text-sm space-y-2">
                <div className="text-terminal-green">Sumesh.S@portfolio:~$ echo "quote"</div>
                <div className="text-terminal-amber glow-text animate-flicker">
                  "Code is like humor. When you have to explain it, it's bad."
                </div>
                <div className="text-muted-foreground">- Cory House</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Background Elements */}
      <div className="absolute top-1/3 left-8 w-32 h-32 bg-accent/5 rounded-full blur-xl animate-float"></div>
      <div className="absolute bottom-1/3 right-8 w-24 h-24 bg-primary/5 rounded-full blur-xl animate-float" style={{animationDelay: '2s'}}></div>
    </section>
  );
};

export default Contact;