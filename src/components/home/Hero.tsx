import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";

const heroSlides = [
  {
    image: "https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    title: "Transformez votre extérieur",
    highlight: "en espace de vie",
    description: "Découvrez notre gamme exclusive de pergolas, abris, portails et menuiseries conçus pour sublimer votre habitat."
  },
  {
    image: "https://images.unsplash.com/photo-1604014237800-1c9102c219da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    title: "Des solutions sur mesure",
    highlight: "pour chaque projet",
    description: "Nos experts vous accompagnent dans la conception et l'installation de votre aménagement extérieur idéal."
  },
  {
    image: "https://images.unsplash.com/photo-1600566753376-12c8ab8e17a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    title: "Qualité et durabilité",
    highlight: "garanties",
    description: "Tous nos produits sont fabriqués avec des matériaux premium pour une longévité et une esthétique exceptionnelles."
  }
];

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const isMobile = useIsMobile();
  const slideInterval = useRef<NodeJS.Timeout | null>(null);
  
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  // Start automatic slideshow
  useEffect(() => {
    slideInterval.current = setInterval(() => {
      nextSlide();
    }, 6000);
    
    return () => {
      if (slideInterval.current) {
        clearInterval(slideInterval.current);
      }
    };
  }, []);

  // Reset timer when manually changing slides
  const handleSlideChange = (direction: 'next' | 'prev') => {
    if (slideInterval.current) {
      clearInterval(slideInterval.current);
    }
    
    if (direction === 'next') {
      nextSlide();
    } else {
      prevSlide();
    }
    
    slideInterval.current = setInterval(() => {
      nextSlide();
    }, 6000);
  };
  
  useEffect(() => {
    const heroElement = heroRef.current;
    
    if (heroElement) {
      const handleParallax = () => {
        const scrollPosition = window.scrollY;
        if (scrollPosition < window.innerHeight) {
          const translateY = scrollPosition * 0.4;
          heroElement.style.transform = `translateY(${translateY}px)`;
        }
      };
      
      window.addEventListener('scroll', handleParallax);
      return () => window.removeEventListener('scroll', handleParallax);
    }
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Background Image with Parallax Effect */}
      {heroSlides.map((slide, index) => (
        <div
          key={index}
          ref={index === 0 ? heroRef : undefined}
          className={cn(
            "absolute inset-0 h-[120%] w-full bg-cover bg-center transition-opacity duration-1000",
            index === currentSlide ? "opacity-100" : "opacity-0"
          )}
          style={{ backgroundImage: `url('${slide.image}')` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-pergo-dark/60 via-pergo-dark/40 to-transparent"></div>
        </div>
      ))}
      
      {/* Content with padding top augmenté significativement pour éviter le chevauchement avec le logo */}
      <div className="relative container mx-auto px-6 h-full flex flex-col justify-center">
        <div className="max-w-3xl pt-32 md:pt-0">
          <div className="p-1.5 px-4 rounded-full bg-pergo-secondary/30 backdrop-blur-sm inline-flex items-center mb-6 animate-fade-in shadow-sm">
            <span className="text-sm font-medium text-white text-shadow">Innovation & Élégance</span>
          </div>
          
          {heroSlides.map((slide, index) => (
            <div 
              key={index} 
              className={cn(
                "transition-all duration-1000",
                index === currentSlide ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8 absolute"
              )}
              style={{ display: index === currentSlide ? 'block' : 'none' }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading text-white leading-tight mb-6">
                {slide.title}<br />
                <span className="text-pergo-highlight">{slide.highlight}</span>
              </h1>
              
              <p className="text-lg md:text-xl text-white/90 max-w-xl mb-8">
                {slide.description}
              </p>
            </div>
          ))}
          
          <div className="flex flex-col sm:flex-row gap-4 opacity-0 animate-fade-in-up" style={{ animationDelay: '900ms', animationFillMode: 'forwards' }}>
            <Link
              to="/contact"
              className={cn(
                "bg-pergo-green hover:bg-pergo-secondary text-white px-8 py-3 rounded-lg",
                "flex items-center justify-center transition-all duration-300 ease-in-out",
                "hover:shadow-lg hover:translate-y-[-2px]"
              )}
            >
              Demander un devis
              <ArrowRight size={16} className="ml-2" />
            </Link>
          </div>
        </div>
      </div>
      
      {/* Slide navigation */}
      <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 flex items-center space-x-2">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setCurrentSlide(index);
              if (slideInterval.current) {
                clearInterval(slideInterval.current);
                slideInterval.current = setInterval(() => {
                  nextSlide();
                }, 6000);
              }
            }}
            className={cn(
              "w-2.5 h-2.5 rounded-full transition-all duration-300",
              index === currentSlide 
                ? "bg-white scale-125" 
                : "bg-white/50 hover:bg-white/80"
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
      
      {/* Mobile navigation arrows */}
      {isMobile && (
        <div className="absolute inset-x-0 top-1/2 transform -translate-y-1/2 flex justify-between px-4">
          <button
            onClick={() => handleSlideChange('prev')}
            className="w-10 h-10 rounded-full bg-black/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/30 transition-all"
            aria-label="Previous slide"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={() => handleSlideChange('next')}
            className="w-10 h-10 rounded-full bg-black/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/30 transition-all"
            aria-label="Next slide"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      )}
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce">
        <div className="w-[30px] h-[50px] rounded-full border-2 border-white/50 flex justify-center p-2">
          <div className="w-1 h-3 bg-white/80 rounded-full animate-fade-in-up animate-delay-500"></div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
