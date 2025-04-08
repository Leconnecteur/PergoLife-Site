import React, { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";

// Définition du type pour les projets
type Project = {
  id: number;
  title: string;
  category: string;
  location: string;
  imageUrl: string;
  description: string;
  gallery?: string[];
  features?: string[];
};

// Utilisation des mêmes données que la page Réalisations
const projects: Project[] = [
  {
    id: 1,
    title: "Pergola bioclimatique moderne",
    category: "Pergolas",
    location: "Paris",
    imageUrl: "/images/realisations/pergola1.jpg",
    description: "Installation d'une pergola bioclimatique avec lames orientables sur une terrasse parisienne.",
    gallery: [
      "/images/realisations/pergola1.jpg"
    ],
    features: [
      "Lames orientables et motorisées",
      "Capteurs de pluie et de vent",
      "Éclairage LED intégré"
    ]
  },
  {
    id: 2,
    title: "Pergola design contemporain",
    category: "Pergolas",
    location: "Montpellier",
    imageUrl: "/images/realisations/pergola2.jpg",
    description: "Installation d'une pergola au design contemporain avec éclairage intégré et finition moderne.",
    gallery: [
      "/images/realisations/pergola2.jpg"
    ]
  },
  {
    id: 7,
    title: "Portail et clôture assortis",
    category: "Portails",
    location: "Lille",
    imageUrl: "/images/realisations/portail2.jpg",
    description: "Création et pose d'un ensemble portail battant et clôture en aluminium, avec système d'ouverture à code.",
    gallery: [
      "/images/realisations/portail2.jpg"
    ]
  },
  {
    id: 9,
    title: "Menuiserie intérieure sur mesure",
    category: "Menuiseries",
    location: "Strasbourg",
    imageUrl: "/images/realisations/menuiserie1.jpg",
    description: "Conception et installation de menuiseries intérieures sur mesure, alliant esthétique et fonctionnalité.",
    gallery: [
      "/images/realisations/menuiserie1.jpg"
    ]
  },
  {
    id: 12,
    title: "Carport avec panneaux solaires",
    category: "Abris",
    location: "Annecy",
    imageUrl: "/images/realisations/carport.jpg",
    description: "Installation d'un carport double en aluminium avec intégration de panneaux solaires sur le toit.",
    gallery: [
      "/images/realisations/carport.jpg"
    ]
  },
  {
    id: 3,
    title: "Pergola bioclimatique extérieure",
    category: "Pergolas",
    location: "Lyon",
    imageUrl: "/images/realisations/pergola3.jpg",
    description: "Réalisation d'une pergola bioclimatique pour un espace extérieur, offrant une protection optimale contre les intempéries.",
    gallery: [
      "/images/realisations/pergola3.jpg"
    ]
  }
];

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState("Tous");
  const [filteredProjects, setFilteredProjects] = useState(projects);
  const sectionRef = useRef<HTMLElement>(null);
  const isMobile = useIsMobile();
  
  const categories = ["Tous", "Pergolas", "Abris", "Portails", "Menuiseries"];
  
  useEffect(() => {
    if (activeCategory === "Tous") {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(projects.filter(project => project.category === activeCategory));
    }
  }, [activeCategory]);
  
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
          {filteredProjects.map((project) => (
            <CarouselItem key={project.id} className="md:basis-1/2 lg:basis-1/3 pl-4">
              <div className="group bg-white rounded-xl overflow-hidden shadow-card hover-lift h-full">
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <div className="text-white">
                      <p className="text-sm font-medium">{project.category}</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-pergo-dark mb-1">{project.title}</h3>
                  <p className="text-pergo-blue mb-4">{project.category}</p>
                  <Link 
                    to={`/realisations/${project.id}`}
                    className="inline-flex items-center text-pergo-dark/70 hover:text-pergo-blue transition-colors duration-300"
                  >
                    Voir le projet
                    <ArrowRight size={16} className="ml-2" />
                  </Link>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="flex justify-center mt-4">
          <CarouselPrevious className="relative static mx-1 translate-y-0 left-0 bg-pergo-secondary hover:bg-pergo-green text-white" />
          <CarouselNext className="relative static mx-1 translate-y-0 right-0 bg-pergo-secondary hover:bg-pergo-green text-white" />
        </div>
      </Carousel>
    </div>
  );

  const renderDesktopGrid = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredProjects.map((project, index) => (
        <div 
          key={project.id}
          className="group bg-white rounded-xl overflow-hidden shadow-card hover-lift reveal-on-scroll"
        >
          <div className="relative h-64 overflow-hidden">
            <img
              src={project.imageUrl}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
              <div className="text-white">
                <p className="text-sm font-medium">{project.category}</p>
              </div>
            </div>
          </div>
          
          <div className="p-6">
            <h3 className="text-xl font-bold text-pergo-dark mb-1">{project.title}</h3>
            <p className="text-pergo-blue mb-4">{project.category}</p>
            <Link 
              to={`/realisations/${project.id}`}
              className="inline-flex items-center text-pergo-dark/70 hover:text-pergo-blue transition-colors duration-300"
            >
              Voir le projet
              <ArrowRight size={16} className="ml-2" />
            </Link>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <section ref={sectionRef} className="py-20 bg-pergo-light">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="inline-block text-pergo-green font-medium mb-3 reveal-on-scroll">NOS RÉALISATIONS</span>
          <h2 className="text-3xl md:text-4xl font-bold text-pergo-dark mb-6 reveal-on-scroll">Projets récemment réalisés</h2>
          <p className="text-lg text-pergo-dark/70 max-w-2xl mx-auto reveal-on-scroll">
            Découvrez quelques-unes de nos plus belles réalisations à travers la France.
          </p>
        </div>
        
        {/* Filter buttons */}
        <div className="flex flex-wrap justify-center gap-2 mb-12 reveal-on-scroll">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={cn(
                "px-5 py-2 rounded-full transition-all duration-300",
                activeCategory === category
                  ? "bg-pergo-green text-white shadow-md"
                  : "bg-white text-pergo-dark hover:bg-pergo-green/10"
              )}
            >
              {category}
            </button>
          ))}
        </div>
        
        {/* Conditional rendering based on screen size */}
        {isMobile ? renderMobileCarousel() : renderDesktopGrid()}
        
        {/* View All Button */}
        <div className="text-center mt-12 reveal-on-scroll">
          <Link
            to="/realisations"
            className={cn(
              "inline-flex items-center justify-center",
              "bg-pergo-secondary hover:bg-pergo-green text-white",
              "px-8 py-3 rounded-lg transition-all duration-300",
              "hover:shadow-lg hover:translate-y-[-2px]",
              "relative overflow-hidden group"
            )}
          >
            <span className="relative z-10 flex items-center">
              Voir toutes nos réalisations
              <ArrowRight size={16} className="ml-2" />
            </span>
            <span className="absolute inset-0 bg-gradient-to-r from-pergo-green/30 via-pergo-green/50 to-pergo-green/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-lg"></span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
