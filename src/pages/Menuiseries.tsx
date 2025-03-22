import React, { useRef, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";
import { ChevronRight } from "lucide-react";
import Testimonials from "@/components/home/Testimonials";

const categories = [
  { title: "Fenêtres", image: "window", description: "Des fenêtres sur mesure pour une isolation optimale." },
  { title: "Portes d'entrée", image: "door", description: "Sécurité et esthétisme pour l'entrée de votre maison." },
  { title: "Baies vitrées", image: "sliding-door", description: "Maximisez la luminosité et l'ouverture sur l'extérieur." }
];

const advantages = [
  {
    title: "Isolation thermique",
    description: "Réduisez votre consommation d'énergie grâce à des menuiseries à haute performance énergétique.",
  },
  {
    title: "Isolation acoustique",
    description: "Protégez-vous des nuisances sonores avec nos vitrages acoustiques performants.",
  },
  {
    title: "Sécurité renforcée",
    description: "Nos produits sont équipés de systèmes de fermeture multi-points pour une sécurité optimale.",
  },
  {
    title: "Design personnalisé",
    description: "Large choix de couleurs, finitions et accessoires pour s'adapter à votre style.",
  }
];

const materials = [
  { 
    title: "Aluminium", 
    description: "Idéal pour les grandes ouvertures, l'aluminium offre finesse, robustesse et une palette de couleurs illimitée.",
    image: "aluminum-window"
  },
  { 
    title: "PVC", 
    description: "Excellent isolant thermique, le PVC est économique, durable et ne nécessite aucun entretien particulier.",
    image: "pvc-window"
  },
  { 
    title: "Bois", 
    description: "Naturellement isolant et chaleureux, le bois apporte authenticité et confort à votre intérieur.",
    image: "wood-window"
  },
];

const Menuiseries = () => {
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
  
  const renderCategoriesGrid = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
      {categories.map((category, index) => (
        <div 
          key={index} 
          className="bg-white rounded-lg shadow-lg overflow-hidden hover-lift reveal-on-scroll"
          style={{ animationDelay: `${index * 150}ms` }}
        >
          <div className="aspect-w-16 aspect-h-10 bg-gray-200">
            <img
              src={`https://source.unsplash.com/random/800x600?${category.image}&sig=${index}`}
              alt={category.title}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
          <div className="p-6">
            <h3 className="text-xl font-bold mb-2 text-pergo-dark">{category.title}</h3>
            <p className="text-pergo-dark/70 mb-4">
              {category.description}
            </p>
            <Button variant="default">
              Découvrir
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
  
  const renderCategoriesCarousel = () => (
    <div className="mb-16 reveal-on-scroll">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent>
          {categories.map((category, index) => (
            <CarouselItem key={index} className="pl-4 basis-full">
              <div className="bg-white rounded-lg shadow-lg overflow-hidden h-full">
                <div className="aspect-w-16 aspect-h-10 bg-gray-200">
                  <img
                    src={`https://source.unsplash.com/random/800x600?${category.image}&sig=${index}`}
                    alt={category.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-pergo-dark">{category.title}</h3>
                  <p className="text-pergo-dark/70 mb-4">
                    {category.description}
                  </p>
                  <Button variant="default">
                    Découvrir
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
  
  const renderAdvantagesGrid = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {advantages.map((advantage, index) => (
        <div 
          key={index} 
          className="bg-white p-6 rounded-lg shadow-sm reveal-on-scroll"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <h3 className="text-lg font-bold mb-3 text-pergo-dark">{advantage.title}</h3>
          <p className="text-pergo-dark/70">{advantage.description}</p>
        </div>
      ))}
    </div>
  );
  
  const renderAdvantagesCarousel = () => (
    <div className="reveal-on-scroll">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent>
          {advantages.map((advantage, index) => (
            <CarouselItem key={index} className="pl-4 basis-full sm:basis-1/2">
              <div className="bg-white p-6 rounded-lg shadow-sm h-full">
                <h3 className="text-lg font-bold mb-3 text-pergo-dark">{advantage.title}</h3>
                <p className="text-pergo-dark/70">{advantage.description}</p>
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
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
      {materials.map((material, index) => (
        <div 
          key={index} 
          className="bg-white rounded-lg shadow-md overflow-hidden reveal-on-scroll"
          style={{ animationDelay: `${index * 150}ms` }}
        >
          <div className="aspect-w-16 aspect-h-10 bg-gray-200">
            <img
              src={`https://source.unsplash.com/random/600x400?${material.image}&sig=${index + 10}`}
              alt={material.title}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
          <div className="p-5">
            <h3 className="text-lg font-bold mb-2 text-pergo-dark">{material.title}</h3>
            <p className="text-pergo-dark/70 text-sm">{material.description}</p>
          </div>
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
              <div className="bg-white rounded-lg shadow-md overflow-hidden h-full">
                <div className="aspect-w-16 aspect-h-10 bg-gray-200">
                  <img
                    src={`https://source.unsplash.com/random/600x400?${material.image}&sig=${index + 10}`}
                    alt={material.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-bold mb-2 text-pergo-dark">{material.title}</h3>
                  <p className="text-pergo-dark/70 text-sm">{material.description}</p>
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

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-32 pb-12" ref={sectionRef}>
        <div className="container mx-auto px-6">
          <h1 className="text-4xl font-bold mb-8 text-pergo-dark reveal-on-scroll">Nos Menuiseries</h1>
          
          <div className="prose max-w-none mb-12 reveal-on-scroll">
            <p className="text-xl text-pergo-dark/80 mb-6">
              Découvrez notre gamme complète de menuiseries extérieures et intérieures, alliant esthétisme, performance thermique et sécurité.
            </p>
            
            <p className="mb-8 text-pergo-dark/80">
              Fenêtres, portes, baies vitrées... Tous nos produits sont fabriqués sur mesure pour s'adapter parfaitement à votre habitat et à vos besoins.
            </p>
          </div>
          
          {/* Catégories de menuiseries */}
          <h2 className="text-3xl font-bold mb-8 text-pergo-dark reveal-on-scroll">Nos produits</h2>
          {isMobile ? renderCategoriesCarousel() : renderCategoriesGrid()}
          
          {/* Avantages */}
          <div className="bg-gray-50 rounded-lg p-8 mb-16 reveal-on-scroll">
            <h2 className="text-2xl font-bold mb-8 text-pergo-dark text-center">Pourquoi choisir nos menuiseries ?</h2>
            {isMobile ? renderAdvantagesCarousel() : renderAdvantagesGrid()}
          </div>
          
          {/* Matériaux */}
          <h2 className="text-3xl font-bold mb-8 text-pergo-dark reveal-on-scroll">Nos matériaux</h2>
          {isMobile ? renderMaterialsCarousel() : renderMaterialsGrid()}
          
          {/* Témoignages */}
          <div className="mb-16">
            <Testimonials />
          </div>
          
          {/* Appel à l'action */}
          <div className="bg-pergo-green/10 rounded-lg p-8 text-center reveal-on-scroll">
            <h2 className="text-2xl font-bold mb-4 text-pergo-dark">Besoin de remplacer vos menuiseries ?</h2>
            <p className="mb-6 text-lg text-pergo-dark/80">
              Nos experts se déplacent chez vous pour réaliser un diagnostic gratuit et vous proposer les solutions les plus adaptées.
            </p>
            <Link to="/contact">
              <Button variant="default" size="lg" className="inline-flex items-center">
                Prendre rendez-vous
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Menuiseries;
