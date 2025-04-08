import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Testimonials from "@/components/home/Testimonials";
import { useIsMobile } from "@/hooks/use-mobile";
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi
} from "@/components/ui/carousel";
import { ChevronRight, X, ChevronLeft, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { Button } from "@/components/ui/button";

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

// Données fictives pour les projets
const projectsData: Project[] = [
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
    id: 3,
    title: "Pergola bioclimatique extérieure",
    category: "Pergolas",
    location: "Lyon",
    imageUrl: "/images/realisations/pergola3.jpg",
    description: "Réalisation d'une pergola bioclimatique pour un espace extérieur, offrant une protection optimale contre les intempéries.",
    gallery: [
      "/images/realisations/pergola3.jpg"
    ]
  },
  {
    id: 4,
    title: "Pergola avec toiture ajustable",
    category: "Pergolas",
    location: "Bordeaux",
    imageUrl: "/images/realisations/pergola4.jpg",
    description: "Installation d'une pergola avec toiture ajustable permettant de contrôler l'ensoleillement et la ventilation.",
    gallery: [
      "/images/realisations/pergola4.jpg"
    ]
  },
  {
    id: 5,
    title: "Pergola avec store intégré",
    category: "Pergolas",
    location: "Nice",
    imageUrl: "/images/realisations/pergolas.jpg",
    description: "Création d'une pergola sur mesure avec store zippé intégré pour une protection optimale contre le soleil et les intempéries.",
    gallery: [
      "/images/realisations/pergolas.jpg"
    ]
  },
  {
    id: 6,
    title: "Portail moderne en aluminium",
    category: "Portails",
    location: "Toulouse",
    imageUrl: "/images/realisations/portail1.jpg",
    description: "Installation d'un portail moderne en aluminium avec système d'ouverture motorisée.",
    gallery: [
      "/images/realisations/portail1.jpg"
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
    id: 8,
    title: "Portail coulissant design",
    category: "Portails",
    location: "Rennes",
    imageUrl: "/images/realisations/portail3.jpg",
    description: "Installation d'un portail coulissant au design épuré, offrant sécurité et esthétique moderne.",
    gallery: [
      "/images/realisations/portail3.jpg"
    ]
  },
  {
    id: 9,
    title: "Menuiserie intérieure sur mesure",
    category: "Menuiseries",
    location: "Strasbourg",
    imageUrl: "/images/realisations/menuiserie1.jpg",
    description: "Réalisation de menuiseries intérieures sur mesure pour un espace contemporain et lumineux.",
    gallery: [
      "/images/realisations/menuiserie1.jpg"
    ]
  },
  {
    id: 10,
    title: "Menuiserie extérieure moderne",
    category: "Menuiseries",
    location: "Nantes",
    imageUrl: "/images/realisations/menuiserie2.jpg",
    description: "Installation de menuiseries extérieures modernes offrant une excellente isolation thermique et phonique.",
    gallery: [
      "/images/realisations/menuiserie2.jpg"
    ]
  },
  {
    id: 11,
    title: "Rénovation complète menuiseries",
    category: "Menuiseries",
    location: "Dijon",
    imageUrl: "/images/realisations/menuiserie3.jpg",
    description: "Rénovation complète des menuiseries d'une maison ancienne, alliant performance énergétique et respect du caractère historique du bâtiment.",
    gallery: [
      "/images/realisations/menuiserie3.jpg"
    ]
  },
  {
    id: 12,
    title: "Carport double moderne",
    category: "Abris",
    location: "Marseille",
    imageUrl: "/images/realisations/carport.jpg",
    description: "Installation d'un carport double en aluminium avec intégration de panneaux solaires sur le toit.",
    gallery: [
      "/images/realisations/carport.jpg"
    ]
  }
];

const Realisations = () => {
  const [activeFilter, setActiveFilter] = useState<string>("Tous");
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [visibleProjects, setVisibleProjects] = useState(8); // Nombre initial de projets visibles
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  
  useEffect(() => {
    const handleRevealOnScroll = () => {
      const elements = document.querySelectorAll('.reveal-on-scroll:not(.revealed)');
      
      elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight * 0.85) {
          element.classList.add('revealed');
        }
      });
    };
    
    window.addEventListener('scroll', handleRevealOnScroll);
    // Initial check for elements in viewport on load
    handleRevealOnScroll();
    
    return () => {
      window.removeEventListener('scroll', handleRevealOnScroll);
    };
  }, []);
  
  useEffect(() => {
    if (!api) return;
    
    setCurrent(api.selectedScrollSnap());
    
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  // Réinitialiser le nombre de projets visibles lors du changement de filtre
  useEffect(() => {
    setVisibleProjects(8);
  }, [activeFilter]);
  
  const categories = ["Tous", "Pergolas", "Abris", "Portails", "Menuiseries"];
  
  const filteredProjects = activeFilter === "Tous" 
    ? projectsData 
    : projectsData.filter(project => project.category === activeFilter);

  // Fonction pour ouvrir la lightbox avec un projet spécifique
  const openLightbox = (project: Project, index: number = 0) => {
    setCurrentProject(project);
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  // Fonction pour charger plus de projets
  const loadMoreProjects = () => {
    setVisibleProjects(prev => Math.min(prev + 8, filteredProjects.length));
  };

  const renderFilterButtons = () => (
    <div className="flex flex-wrap gap-2 mb-10">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => setActiveFilter(category)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            activeFilter === category
              ? "bg-pergo-green text-white shadow-sm"
              : "bg-pergo-green/10 text-pergo-dark hover:bg-pergo-green/20 backdrop-blur-sm"
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
  
  const renderFilterCarousel = () => (
    <div className="mb-8 reveal-on-scroll">
      <Carousel
        opts={{
          align: "start",
          loop: false,
        }}
        className="w-full"
        setApi={setApi}
      >
        <CarouselContent className="-ml-2">
          {categories.map((category) => (
            <CarouselItem key={category} className="pl-2 basis-auto">
              <button
                onClick={() => setActiveFilter(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
                  activeFilter === category
                    ? "bg-pergo-green text-white shadow-sm"
                    : "bg-pergo-green/10 text-pergo-dark hover:bg-pergo-green/20 backdrop-blur-sm"
                }`}
              >
                {category}
              </button>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
  
  const renderProjectsGrid = () => {
    return (
      <>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 reveal-on-scroll">
          {filteredProjects.slice(0, visibleProjects).map((project) => (
            <div
              key={project.id}
              className="group bg-white rounded-lg shadow-md overflow-hidden hover-lift transition-all duration-300 hover:shadow-xl cursor-pointer"
              onClick={() => openLightbox(project)}
            >
              <div className="h-64 bg-gray-200 overflow-hidden relative">
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-pergo-dark/10 transition-all duration-300 flex items-center justify-center">
                  <span className="bg-white/90 text-pergo-dark px-4 py-2 rounded-full font-medium text-sm shadow-md relative overflow-hidden group">
                    <span className="relative z-10">Agrandir</span>
                    <span className="absolute inset-0 bg-gradient-to-r from-pergo-green/30 via-pergo-green/50 to-pergo-green/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-lg"></span>
                  </span>
                </div>
              </div>
              <div className="absolute top-4 left-4 z-10">
                <span className="inline-block px-3 py-1 bg-white/90 text-pergo-green text-xs font-medium rounded-full shadow-sm">
                  {project.category}
                </span>
              </div>
            </div>
          ))}
        </div>
        
        {/* Bouton "Charger plus" */}
        {visibleProjects < filteredProjects.length && (
          <div className="flex justify-center mb-16">
            <Button 
              onClick={loadMoreProjects}
              variant="default"
              size="lg"
              className="relative overflow-hidden group"
            >
              <span className="relative z-10">Charger plus de réalisations</span>
              <span className="absolute inset-0 bg-gradient-to-r from-pergo-green/30 via-pergo-green/50 to-pergo-green/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-lg"></span>
            </Button>
          </div>
        )}
      </>
    );
  };
  const renderProjectsCarousel = () => {
    return (
      <div className="mb-16 reveal-on-scroll">
        <Carousel
          setApi={setApi}
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent>
            {filteredProjects.map((project) => (
              <CarouselItem key={project.id} className="pl-4 basis-full sm:basis-1/2">
                <div
                  className="group bg-white rounded-lg shadow-md overflow-hidden block h-full cursor-pointer"
                  onClick={() => openLightbox(project)}
                >
                  <div className="h-64 bg-gray-200 overflow-hidden relative">
                    <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />  
                    <div className="absolute inset-0 bg-pergo-dark/10 transition-all duration-300 flex items-center justify-center">
                      <span className="bg-white/90 text-pergo-dark px-4 py-2 rounded-full font-medium text-sm shadow-md relative overflow-hidden group">
                        <span className="relative z-10">Agrandir</span>
                        <span className="absolute inset-0 bg-gradient-to-r from-pergo-green/30 via-pergo-green/50 to-pergo-green/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-lg"></span>
                      </span>
                    </div>
                  </div>
                  <div className="absolute top-4 left-4 z-10">
                    <span className="inline-block px-3 py-1 bg-white/90 text-pergo-green text-xs font-medium rounded-full shadow-sm">
                      {project.category}
                    </span>
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
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-32 pb-12" ref={sectionRef}>
        <div className="container mx-auto px-6">
          <h1 className="text-4xl font-bold mb-8 text-pergo-dark reveal-on-scroll">Nos Réalisations</h1>
          
          <div className="prose max-w-none mb-10 reveal-on-scroll">
            <p className="text-xl text-pergo-dark/80">
              Découvrez nos projets récents et laissez-vous inspirer par nos réalisations. Chaque projet est unique et adapté aux besoins spécifiques de nos clients.
            </p>
          </div>
          
          {/* Filtres */}
          {isMobile ? renderFilterCarousel() : renderFilterButtons()}
          
          {/* Projets */}
          {isMobile ? renderProjectsCarousel() : renderProjectsGrid()}
          
          {/* Lightbox pour afficher les images en plein écran */}
          {currentProject && (
            <Lightbox
              open={lightboxOpen}
              close={() => setLightboxOpen(false)}
              index={lightboxIndex}
              slides={currentProject.gallery?.map(url => ({ src: url })) || [{ src: currentProject.imageUrl }]}
              styles={{ 
                container: { backgroundColor: "rgba(0, 0, 0, 0.9)" },
                navigationPrev: { color: "#ffffff" },
                navigationNext: { color: "#ffffff" }
              }}
              render={{
                iconPrev: () => <ChevronLeft className="w-8 h-8" />,
                iconNext: () => <ChevronRight className="w-8 h-8" />,
                iconClose: () => <X className="w-8 h-8" />
              }}
              carousel={{ 
                padding: "16px",
                spacing: "16px"
              }}
              controller={{ 
                closeOnBackdropClick: true,
                closeOnPullDown: true
              }}
            />
          )}
          
          {/* Testimonials section */}
          <Testimonials />
          
          {/* Section appel à l'action */}
          <div className="bg-pergo-green/10 rounded-lg p-10 text-center reveal-on-scroll">
            <h2 className="text-2xl font-bold mb-4 text-pergo-dark">Vous avez un projet en tête ?</h2>
            <p className="mb-6 text-lg text-pergo-dark/80 max-w-2xl mx-auto">
              Que vous ayez besoin d'une pergola, d'un abri, d'un portail ou de nouvelles menuiseries, nous sommes prêts à vous accompagner dans la réalisation de votre projet.
            </p>
            <Link to="/contact">
              <Button 
                variant="default" 
                size="lg"
                className="relative overflow-hidden group"
              >
                <span className="relative z-10 flex items-center">Demander un devis gratuit <ChevronRight className="ml-2 h-4 w-4" /></span>
                <span className="absolute inset-0 bg-gradient-to-r from-pergo-green/30 via-pergo-green/50 to-pergo-green/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-lg"></span>
              </Button>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Realisations;
