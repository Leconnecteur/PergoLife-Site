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
  { title: "Abris de jardin", image: "garden-shed", description: "Idéal pour ranger vos outils et équipements de jardin." },
  { title: "Carports", image: "carport", description: "Protégez votre véhicule des intempéries avec style." },
  { title: "Abris de terrasse", image: "patio-cover", description: "Profitez de votre terrasse par tous les temps." }
];

const popularProducts = [
  { id: 1, title: "Abri de jardin moderne", image: "shed", description: "Structure en aluminium avec panneaux composites." },
  { id: 2, title: "Carport double", image: "carport", description: "Solution élégante pour protéger deux véhicules." },
  { id: 3, title: "Abri de terrasse vitré", image: "patio", description: "Profitez de votre extérieur toute l'année." },
  { id: 4, title: "Abri de jardin compact", image: "small-shed", description: "Solution idéale pour les petits espaces." }
];

const Abris = () => {
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
            <CarouselItem key={index} className="pl-4 basis-full sm:basis-1/2">
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
  
  const renderProductsGrid = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
      {popularProducts.map((product) => (
        <div 
          key={product.id} 
          className="bg-white rounded-lg shadow-md overflow-hidden hover-lift reveal-on-scroll"
          style={{ animationDelay: `${product.id * 100}ms` }}
        >
          <div className="aspect-w-1 aspect-h-1 bg-gray-200">
            <img
              src={`https://source.unsplash.com/random/400x400?${product.image}&sig=${product.id + 10}`}
              alt={product.title}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
          <div className="p-4">
            <h3 className="text-lg font-bold mb-1 text-pergo-dark">{product.title}</h3>
            <p className="text-pergo-dark/70 text-sm mb-3">
              {product.description}
            </p>
            <Button 
              variant="default" 
              size="sm"
            >
              Voir détails
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
  
  const renderProductsCarousel = () => (
    <div className="mb-16 reveal-on-scroll">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent>
          {popularProducts.map((product) => (
            <CarouselItem key={product.id} className="pl-4 basis-1/2">
              <div className="bg-white rounded-lg shadow-md overflow-hidden h-full">
                <div className="aspect-w-1 aspect-h-1 bg-gray-200">
                  <img
                    src={`https://source.unsplash.com/random/400x400?${product.image}&sig=${product.id + 10}`}
                    alt={product.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-bold mb-1 text-pergo-dark">{product.title}</h3>
                  <p className="text-pergo-dark/70 text-sm mb-3">
                    {product.description}
                  </p>
                  <Button 
                    variant="default" 
                    size="sm"
                  >
                    Voir détails
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

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-32 pb-12" ref={sectionRef}>
        <div className="container mx-auto px-6">
          <h1 className="text-4xl font-bold font-heading mb-8 text-pergo-dark reveal-on-scroll">Nos Abris</h1>
          
          <div className="prose max-w-none mb-12 reveal-on-scroll">
            <p className="text-xl text-pergo-dark/80 mb-6">
              Des abris de jardin, de voiture et de terrasse de qualité supérieure pour protéger vos biens et aménager votre espace extérieur avec style.
            </p>
            
            <p className="mb-8 text-pergo-dark/80">
              Tous nos abris sont personnalisables et fabriqués avec des matériaux résistants pour une durabilité optimale face aux conditions climatiques.
            </p>
          </div>
          
          {/* Catégories d'abris */}
          <h2 className="text-3xl font-bold mb-8 text-pergo-dark reveal-on-scroll">Nos catégories d'abris</h2>
          {isMobile ? renderCategoriesCarousel() : renderCategoriesGrid()}
          
          {/* Produits populaires */}
          <h2 className="text-3xl font-bold mb-8 text-pergo-dark reveal-on-scroll">Nos abris les plus populaires</h2>
          {isMobile ? renderProductsCarousel() : renderProductsGrid()}
          
          {/* Témoignages */}
          <div className="mb-16">
            <Testimonials />
          </div>
          
          {/* Appel à l'action */}
          <div className="bg-pergo-green/10 rounded-lg p-8 text-center reveal-on-scroll">
            <h2 className="text-2xl font-bold mb-4 text-pergo-dark">Besoin d'un abri sur mesure ?</h2>
            <p className="mb-6 text-lg text-pergo-dark/80">
              Contactez-nous pour discuter de votre projet et obtenir un devis personnalisé.
            </p>
            <Link to="/contact">
              <Button variant="default" size="lg" className="inline-flex items-center">
                Nous contacter
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

export default Abris;
