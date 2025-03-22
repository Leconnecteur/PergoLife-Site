import React, { useRef, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";
import { ChevronRight, Check } from "lucide-react";
import Testimonials from "@/components/home/Testimonials";

const portailTypes = [
  { 
    title: "Portails battants", 
    description: "Les portails battants s'ouvrent vers l'intérieur ou l'extérieur de votre propriété, offrant une ouverture maximale.",
    image: "swing-gate"
  },
  { 
    title: "Portails coulissants", 
    description: "Les portails coulissants sont idéaux pour les entrées où l'espace est limité, se déplaçant parallèlement à votre clôture.",
    image: "sliding-gate"
  },
];

const materials = [
  { 
    title: "Aluminium", 
    benefits: ["Durable et résistant", "Sans entretien", "Nombreuses finitions disponibles", "Écologique et recyclable"],
    image: "aluminum"
  },
  { 
    title: "PVC", 
    benefits: ["Excellent rapport qualité-prix", "Isolation thermique", "Résistant aux intempéries", "Facile d'entretien"],
    image: "pvc"
  },
];

const Portails = () => {
  const isMobile = useIsMobile();
  const sectionRef = useRef<HTMLDivElement>(null);
  
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
  
  const renderPortailTypesGrid = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
      {portailTypes.map((type, index) => (
        <div 
          key={index} 
          className="bg-white rounded-lg shadow-lg overflow-hidden hover-lift reveal-on-scroll"
          style={{ animationDelay: `${index * 150}ms` }}
        >
          <div className="aspect-w-16 aspect-h-9 bg-gray-200">
            <img
              src={`https://source.unsplash.com/random/800x500?${type.image}&sig=${index}`}
              alt={type.title}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
          <div className="p-6">
            <h3 className="text-2xl font-bold mb-3 text-pergo-dark">{type.title}</h3>
            <p className="text-pergo-dark/70 mb-4">
              {type.description}
            </p>
            <Button className="bg-pergo-secondary hover:bg-pergo-green text-white transition-colors">
              Voir les modèles
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
  
  const renderPortailTypesCarousel = () => (
    <div className="mb-16 reveal-on-scroll">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent>
          {portailTypes.map((type, index) => (
            <CarouselItem key={index} className="pl-4 basis-full">
              <div className="bg-white rounded-lg shadow-lg overflow-hidden h-full">
                <div className="aspect-w-16 aspect-h-9 bg-gray-200">
                  <img
                    src={`https://source.unsplash.com/random/800x500?${type.image}&sig=${index}`}
                    alt={type.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-3 text-pergo-dark">{type.title}</h3>
                  <p className="text-pergo-dark/70 mb-4">
                    {type.description}
                  </p>
                  <Button className="bg-pergo-secondary hover:bg-pergo-green text-white transition-colors">
                    Voir les modèles
                  </Button>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="flex justify-center mt-6">
          <CarouselPrevious className="relative mr-2 translate-y-0 bg-pergo-secondary hover:bg-pergo-green text-white" />
          <CarouselNext className="relative ml-2 translate-y-0 bg-pergo-secondary hover:bg-pergo-green text-white" />
        </div>
      </Carousel>
    </div>
  );
  
  const renderMaterialsGrid = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
      {materials.map((material, index) => (
        <div 
          key={index} 
          className="bg-white rounded-lg shadow-md p-6 hover-lift reveal-on-scroll"
          style={{ animationDelay: `${index * 150}ms` }}
        >
          <h3 className="text-xl font-bold mb-4 text-pergo-dark">{material.title}</h3>
          <ul className="mb-6 space-y-2">
            {material.benefits.map((benefit, i) => (
              <li key={i} className="flex items-start">
                <Check className="text-pergo-green mr-2 h-5 w-5 flex-shrink-0" />
                <span className="text-pergo-dark/80">{benefit}</span>
              </li>
            ))}
          </ul>
          <Button variant="outline" className="text-pergo-green hover:text-white hover:bg-pergo-green border-pergo-green">
            En savoir plus <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
      ))}
    </div>
  );
  
  const renderMaterialsCarousel = () => (
    <div className="mb-16 reveal-on-scroll">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent>
          {materials.map((material, index) => (
            <CarouselItem key={index} className="pl-4 basis-full">
              <div className="bg-white rounded-lg shadow-md p-6 h-full">
                <h3 className="text-xl font-bold mb-4 text-pergo-dark">{material.title}</h3>
                <ul className="mb-6 space-y-2">
                  {material.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-start">
                      <Check className="text-pergo-green mr-2 h-5 w-5 flex-shrink-0" />
                      <span className="text-pergo-dark/80">{benefit}</span>
                    </li>
                  ))}
                </ul>
                <Button variant="outline" className="text-pergo-green hover:text-white hover:bg-pergo-green border-pergo-green">
                  En savoir plus <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="flex justify-center mt-6">
          <CarouselPrevious className="relative mr-2 translate-y-0 bg-pergo-secondary hover:bg-pergo-green text-white" />
          <CarouselNext className="relative ml-2 translate-y-0 bg-pergo-secondary hover:bg-pergo-green text-white" />
        </div>
      </Carousel>
    </div>
  );

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-32 pb-12" ref={sectionRef}>
        <div className="container mx-auto px-6">
          <h1 className="text-4xl font-bold mb-8 text-pergo-dark reveal-on-scroll">Nos Portails</h1>
          
          <div className="prose max-w-none mb-12 reveal-on-scroll">
            <p className="text-xl text-pergo-dark/80 mb-6">
              Des portails élégants et sécurisés pour sublimer l'entrée de votre propriété tout en garantissant votre intimité.
            </p>
            
            <p className="mb-8 text-pergo-dark/80">
              Nous proposons une large gamme de portails sur mesure, en aluminium ou en PVC, disponibles dans différents styles et coloris pour s'adapter parfaitement à votre habitat.
            </p>
          </div>
          
          {/* Types de portails */}
          <h2 className="text-3xl font-bold mb-8 text-pergo-dark reveal-on-scroll">Types de portails</h2>
          {isMobile ? renderPortailTypesCarousel() : renderPortailTypesGrid()}
          
          {/* Matériaux */}
          <h2 className="text-3xl font-bold mb-8 text-pergo-dark reveal-on-scroll">Nos matériaux</h2>
          {isMobile ? renderMaterialsCarousel() : renderMaterialsGrid()}
          
          {/* Automatisation */}
          <div className="bg-gradient-to-r from-pergo-green/20 to-pergo-green/5 rounded-lg p-8 mb-16 reveal-on-scroll">
            <h2 className="text-2xl font-bold mb-4 text-pergo-dark">Automatisez votre portail</h2>
            <p className="mb-6 text-lg text-pergo-dark/80">
              Nous proposons des solutions d'automatisation complètes pour votre confort quotidien : télécommandes, digicode, commande smartphone, etc.
            </p>
            <Button className="bg-pergo-secondary hover:bg-pergo-green text-white">
              Options d'automatisation <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
          
          {/* Témoignages */}
          <div className="mb-16">
            <Testimonials />
          </div>
          
          {/* Appel à l'action */}
          <div className="bg-pergo-green/10 rounded-lg p-8 text-center reveal-on-scroll">
            <h2 className="text-2xl font-bold mb-4 text-pergo-dark">Envie d'un portail personnalisé ?</h2>
            <p className="mb-6 text-lg text-pergo-dark/80">
              Nos experts sont disponibles pour vous aider à choisir le portail idéal pour votre propriété.
            </p>
            <Link to="/contact">
              <Button className="bg-pergo-secondary hover:bg-pergo-green text-white inline-flex items-center">
                Demander un devis <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Portails;
