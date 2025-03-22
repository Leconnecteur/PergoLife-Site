import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { Award, ThumbsUp, Clock, Shield } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from "@/components/ui/carousel";

const features = [
  {
    icon: Award,
    title: "Savoir-faire",
    description: "Notre équipe met son expertise au service de vos projets d'aménagement extérieur."
  },
  {
    icon: ThumbsUp,
    title: "Qualité supérieure",
    description: "Utilisation exclusive de matériaux premium et durables pour garantir la longévité de nos produits."
  },
  {
    icon: Clock,
    title: "Sur mesure",
    description: "Chaque projet est unique. Nous concevons des solutions personnalisées adaptées à vos besoins spécifiques."
  },
  {
    icon: Shield,
    title: "Garantie étendue",
    description: "Tranquillité d'esprit assurée avec notre garantie de 10 ans sur tous nos produits et installations."
  }
];

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isMobile = useIsMobile();
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const elements = entry.target.querySelectorAll('.reveal-on-scroll');
            elements.forEach((el, index) => {
              setTimeout(() => {
                el.classList.add('revealed');
              }, index * 150);
            });
          }
        });
      },
      { threshold: 0.2 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const renderFeatureCarousel = () => (
    <div className="w-full mt-6 reveal-on-scroll">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent>
          {features.map((feature, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/2 pl-4">
              <div className="flex flex-col items-center text-center p-4 bg-white rounded-lg shadow-sm h-full">
                <div className="shrink-0 w-16 h-16 bg-pergo-green/10 rounded-full flex items-center justify-center mb-4">
                  <feature.icon className="text-pergo-green" size={28} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-pergo-dark mb-2">{feature.title}</h3>
                  <p className="text-pergo-dark/70">{feature.description}</p>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="flex justify-center mt-4">
          <CarouselPrevious className="relative mr-2 translate-y-0" />
          <CarouselNext className="relative ml-2 translate-y-0" />
        </div>
      </Carousel>
    </div>
  );

  const renderFeatureGrid = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {features.map((feature, index) => (
        <div key={index} className="flex items-start reveal-on-scroll">
          <div className="shrink-0 w-12 h-12 bg-pergo-green/10 rounded-lg flex items-center justify-center mr-4">
            <feature.icon className="text-pergo-green" size={24} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-pergo-dark mb-2">{feature.title}</h3>
            <p className="text-pergo-dark/70">{feature.description}</p>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <section ref={sectionRef} className="py-20">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-pergo-green/10 rounded-lg z-0"></div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-pergo-green/20 rounded-lg z-0"></div>
              
              <div className="relative overflow-hidden rounded-lg z-10 reveal-on-scroll">
                <img
                  src="https://images.unsplash.com/photo-1595844730298-b960ff98fee0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                  alt="PergoLife workshop"
                  className="w-full h-auto object-cover aspect-[4/3]"
                />
              </div>
              
              {isMobile && (
                <div className="absolute bottom-4 right-4 bg-white p-3 rounded-lg shadow-lg z-20 reveal-on-scroll">
                  <div className="text-center">
                    <span className="text-pergo-green font-bold text-2xl">6</span>
                    <p className="text-xs text-pergo-dark">années d'expérience</p>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div>
            <span className="inline-block text-pergo-green font-medium mb-3 reveal-on-scroll">À PROPOS DE NOUS</span>
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-pergo-dark mb-6 reveal-on-scroll">Une expertise au service de votre extérieur</h2>
            
            <p className="text-lg text-pergo-dark/70 mb-8 reveal-on-scroll">
              Depuis 2019, PergoLife vend et installe des aménagements extérieurs de qualité. Notre objectif est de transformer vos espaces extérieurs en lieux de vie confortables et esthétiques, en harmonie avec votre habitat.
            </p>
            
            <p className="text-lg text-pergo-dark/70 mb-10 reveal-on-scroll">
              Nous proposons et installons des pergolas, abris, portails et menuiseries sur mesure, en alliant innovation technique et design contemporain.
            </p>
            
            {isMobile ? renderFeatureCarousel() : renderFeatureGrid()}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
