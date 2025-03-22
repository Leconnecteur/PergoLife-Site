import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import OptimizedImage from "@/components/ui/optimized-image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";

const categories = [
  {
    id: "pergolas",
    title: "Pergolas",
    description: "Créez un espace extérieur élégant et fonctionnel avec nos pergolas sur mesure.",
    image: "/images/categories/pergola.jpg",
    link: "/products/pergolas"
  },
  {
    id: "abris",
    title: "Abris",
    description: "Solutions d'abris pratiques et esthétiques pour protéger vos véhicules et équipements.",
    image: "/images/categories/abris.jpg",
    link: "/products/abris"
  },
  {
    id: "portails",
    title: "Portails",
    description: "Portails élégants et sécurisés, disponibles dans une variété de styles et de matériaux.",
    image: "/images/categories/portail.jpg",
    link: "/products/portails"
  },
  {
    id: "menuiseries",
    title: "Menuiseries",
    description: "Fenêtres, portes et menuiseries de qualité pour améliorer l'esthétique et l'efficacité énergétique.",
    image: "/images/categories/menuiserie.jpg",
    link: "/products/menuiseries"
  }
];

const ProductCategories = () => {
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

  const renderProductCard = (category) => (
    <div className="bg-white rounded-xl overflow-hidden shadow-card hover-lift h-full flex flex-col">
      <div className="image-reveal h-64">
        <OptimizedImage
          src={category.image}
          alt={`Catégorie ${category.title} - PergoLife, spécialiste en ${category.title.toLowerCase()}`}
          className="w-full h-full"
          objectFit="cover"
        />
      </div>
      
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-pergo-dark mb-3">{category.title}</h3>
        <p className="text-pergo-dark/70 mb-4 flex-grow">{category.description}</p>
        <Link 
          to={category.link}
          className={cn(
            "inline-flex items-center text-pergo-green font-medium mt-auto",
            "relative after:absolute after:left-0 after:bottom-0 after:w-full after:h-0.5",
            "after:origin-right after:scale-x-0 after:bg-pergo-green",
            "after:transition-transform after:duration-300 hover:after:origin-left hover:after:scale-x-100"
          )}
        >
          En savoir plus
        </Link>
      </div>
    </div>
  );

  const renderMobileCarousel = () => (
    <div className="w-full px-4 mt-6 reveal-on-scroll">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent>
          {categories.map((category) => (
            <CarouselItem key={category.id} className="md:basis-1/2 lg:basis-1/3 pl-4">
              {renderProductCard(category)}
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="flex justify-center mt-4">
          <CarouselPrevious className="relative static mx-1 translate-y-0 left-0" />
          <CarouselNext className="relative static mx-1 translate-y-0 right-0" />
        </div>
      </Carousel>
    </div>
  );

  const renderDesktopGrid = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {categories.map((category) => (
        <div key={category.id} className="reveal-on-scroll">
          {renderProductCard(category)}
        </div>
      ))}
    </div>
  );

  return (
    <section ref={sectionRef} className="py-20 bg-pergo-light">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="inline-block text-pergo-green font-medium mb-3 reveal-on-scroll">NOS PRODUITS</span>
          <h2 className="text-3xl md:text-4xl font-bold font-heading text-pergo-dark mb-6 reveal-on-scroll">Des solutions adaptées à tous vos besoins</h2>
          <p className="text-lg text-pergo-dark/70 max-w-2xl mx-auto reveal-on-scroll">
            Découvrez notre gamme complète de produits conçus pour embellir et améliorer votre habitat extérieur.
          </p>
        </div>
        
        {/* Conditional rendering based on screen size */}
        {isMobile ? renderMobileCarousel() : renderDesktopGrid()}
      </div>
    </section>
  );
};

export default ProductCategories;
