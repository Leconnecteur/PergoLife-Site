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

const projects = [
  {
    id: 1,
    title: "Pergola bioclimatique",
    category: "Pergolas",
    location: "Lyon, France",
    image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
  },
  {
    id: 2,
    title: "Abri de jardin en bois",
    category: "Abris",
    location: "Nice, France",
    image: "https://images.unsplash.com/photo-1529290130-4ca3753253ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1476&q=80"
  },
  {
    id: 3,
    title: "Portail moderne",
    category: "Portails",
    location: "Paris, France",
    image: "https://images.unsplash.com/photo-1599809275671-b5942cabc7a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
  },
  {
    id: 4,
    title: "Fenêtres panoramiques",
    category: "Menuiseries",
    location: "Bordeaux, France",
    image: "https://images.unsplash.com/photo-1509644851169-2acc08aa25b5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
  },
  {
    id: 5,
    title: "Terrasse couverte",
    category: "Pergolas",
    location: "Marseille, France",
    image: "https://images.unsplash.com/photo-1600607687644-c7f34bc90283?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
  },
  {
    id: 6,
    title: "Carport aluminium",
    category: "Abris",
    location: "Toulouse, France",
    image: "https://images.unsplash.com/photo-1578986303627-e8699326e027?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1015&q=80"
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
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <div className="text-white">
                      <p className="text-sm font-medium">{project.category}</p>
                      <p className="text-xs opacity-80">{project.location}</p>
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
          <CarouselPrevious className="relative static mx-1 translate-y-0 left-0" />
          <CarouselNext className="relative static mx-1 translate-y-0 right-0" />
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
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
              <div className="text-white">
                <p className="text-sm font-medium">{project.category}</p>
                <p className="text-xs opacity-80">{project.location}</p>
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
              "hover:shadow-lg hover:translate-y-[-2px]"
            )}
          >
            Voir toutes nos réalisations
            <ArrowRight size={16} className="ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
