import { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Preloader from '@/components/Preloader';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Projects from '@/components/Projects';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Initialize smooth scroll (placeholder for Locomotive Scroll)
    const initLocomotiveScroll = async () => {
      try {
        // Placeholder for locomotive scroll initialization
        // In a real implementation, you would initialize locomotive scroll here
        console.log('Smooth scroll initialized');
      } catch (error) {
        console.log('Locomotive scroll not available, using native scroll');
      }
    };

    initLocomotiveScroll();

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const handlePreloaderComplete = () => {
    setIsLoading(false);
    
    // Start main animations after preloader
    gsap.fromTo(document.body, 
      { overflow: 'hidden' },
      { 
        overflow: 'auto',
        duration: 0.1,
        delay: 0.5
      }
    );
  };

  return (
    <>
      {/* Preloader */}
      {isLoading && <Preloader onComplete={handlePreloaderComplete} />}
      
      {/* Main Content */}
      <div className={`min-h-screen ${isLoading ? 'overflow-hidden' : ''}`}>
        <Navigation />
        <Hero />
        <About />
        <Projects />
        <Contact />
        <Footer />
      </div>
    </>
  );
};

export default Index;
