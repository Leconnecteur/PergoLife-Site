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
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

// Définition du type pour les projets
type Project = {
  id: number;
  title: string;
  category: string;
  location: string;
  imageUrl: string;
  description: string;
};

// Données fictives pour les projets
const projectsData: Project[] = [
  {
    id: 1,
    title: "Pergola bioclimatique moderne",
    category: "Pergolas",
    location: "Paris",
    imageUrl: "https://images.unsplash.com/photo-1621873495734-5018c6e78b4d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1335&q=80",
    description: "Installation d'une pergola bioclimatique avec lames orientables sur une terrasse parisienne."
  },
  {
    id: 2,
    title: "Abri de jardin contemporain",
    category: "Abris",
    location: "Lyon",
    imageUrl: "https://images.unsplash.com/photo-1530465548516-d231cfc45abb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1335&q=80",
    description: "Création d'un abri de jardin sur mesure avec intégration d'un espace de stockage et d'un atelier."
  },
  {
    id: 3,
    title: "Portail aluminium design",
    category: "Portails",
    location: "Bordeaux",
    imageUrl: "https://images.unsplash.com/photo-1506521781263-d8422e82f27a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
    description: "Installation d'un portail coulissant en aluminium avec motorisation et système de contrôle à distance."
  },
  {
    id: 4,
    title: "Fenêtres panoramiques",
    category: "Menuiseries",
    location: "Marseille",
    imageUrl: "https://images.unsplash.com/photo-1598549746422-3d7f6298812c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1754&q=80",
    description: "Remplacement complet des menuiseries d'une villa avec des fenêtres panoramiques à haute performance énergétique."
  },
  {
    id: 5,
    title: "Pergola avec store intégré",
    category: "Pergolas",
    location: "Nice",
    imageUrl: "https://images.unsplash.com/photo-1556702571-3e11dd2b1a92?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
    description: "Création d'une pergola sur mesure avec store zippé intégré pour une protection optimale contre le soleil et les intempéries."
  },
  {
    id: 6,
    title: "Carport double moderne",
    category: "Abris",
    location: "Toulouse",
    imageUrl: "https://images.unsplash.com/photo-1486006920555-c77dcf18193c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1548&q=80",
    description: "Installation d'un carport double en aluminium avec intégration de panneaux solaires sur le toit."
  },
  {
    id: 7,
    title: "Portail et clôture assortis",
    category: "Portails",
    location: "Lille",
    imageUrl: "https://images.unsplash.com/photo-1597254053221-8f4043e7d02e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80",
    description: "Création et pose d'un ensemble portail battant et clôture en aluminium, avec système d'ouverture à code."
  },
  {
    id: 8,
    title: "Baies vitrées à galandage",
    category: "Menuiseries",
    location: "Strasbourg",
    imageUrl: "https://images.unsplash.com/photo-1600607686527-6fb886090705?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80",
    description: "Installation de baies vitrées à galandage pour créer une ouverture totale entre l'intérieur et l'extérieur d'une maison contemporaine."
  },
  {
    id: 9,
    title: "Pergola voile d'ombrage",
    category: "Pergolas",
    location: "Montpellier",
    imageUrl: "https://images.unsplash.com/photo-1542728928-2a344700d8ac?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
    description: "Installation d'une pergola avec voile d'ombrage pour une terrasse de restaurant, créant un espace extérieur élégant et protégé."
  },
  {
    id: 10,
    title: "Abri de piscine télescopique",
    category: "Abris",
    location: "Nantes",
    imageUrl: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1932&q=80",
    description: "Conception et installation d'un abri de piscine télescopique bas, permettant de profiter de la piscine même en inter-saison."
  },
  {
    id: 11,
    title: "Portail design contemporain",
    category: "Portails",
    location: "Rennes",
    imageUrl: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1542&q=80",
    description: "Création d'un portail sur mesure au design contemporain avec intégration d'éléments décoratifs en acier."
  },
  {
    id: 12,
    title: "Rénovation complète menuiseries",
    category: "Menuiseries",
    location: "Dijon",
    imageUrl: "https://images.unsplash.com/photo-1604756162772-ea0b8afbe99d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
    description: "Rénovation complète des menuiseries d'une maison ancienne, alliant performance énergétique et respect du caractère historique du bâtiment."
  }
];

const Realisations = () => {
  const [filter, setFilter] = useState<string>("Tous");
  const categories = ["Tous", "Pergolas", "Abris", "Portails", "Menuiseries"];
  const isMobile = useIsMobile();
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!api) return;
    
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);
  
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
  
  const filteredProjects = filter === "Tous" 
    ? projectsData 
    : projectsData.filter(project => project.category === filter);

  const renderFilterButtons = () => (
    <div className="flex flex-wrap gap-2 mb-10">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => setFilter(category)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            filter === category
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
                onClick={() => setFilter(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
                  filter === category
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
  
  const renderProjectsGrid = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
      {filteredProjects.map((project) => (
        <Link
          to={`/realisations/${project.id}`}
          key={project.id}
          className="group bg-white rounded-lg shadow-md overflow-hidden hover-lift reveal-on-scroll"
        >
          <div className="aspect-w-16 aspect-h-10 bg-gray-200 overflow-hidden">
            <img
              src={project.imageUrl}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
            />
          </div>
          <div className="p-6">
            <span className="inline-block px-3 py-1 bg-pergo-green/10 text-pergo-green text-xs font-medium rounded-full mb-3">
              {project.category}
            </span>
            <h3 className="text-xl font-bold mb-2 text-pergo-dark group-hover:text-pergo-green transition-colors">
              {project.title}
            </h3>
            <p className="text-pergo-dark/70 mb-4">
              {project.description}
            </p>
            <div className="flex items-center justify-between">
              <span className="text-sm text-pergo-dark/60">
                <span className="font-medium">Lieu:</span> {project.location}
              </span>
              <span className="text-pergo-green font-medium group-hover:underline">
                Voir détails
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
  
  const renderProjectsCarousel = () => (
    <div className="mb-16 reveal-on-scroll">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent>
          {filteredProjects.map((project) => (
            <CarouselItem key={project.id} className="pl-4 basis-full sm:basis-1/2">
              <Link
                to={`/realisations/${project.id}`}
                className="group bg-white rounded-lg shadow-md overflow-hidden block h-full"
              >
                <div className="aspect-w-16 aspect-h-10 bg-gray-200 overflow-hidden">
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                </div>
                <div className="p-6">
                  <span className="inline-block px-3 py-1 bg-pergo-green/10 text-pergo-green text-xs font-medium rounded-full mb-3">
                    {project.category}
                  </span>
                  <h3 className="text-xl font-bold mb-2 text-pergo-dark group-hover:text-pergo-green transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-pergo-dark/70 mb-4 line-clamp-2">
                    {project.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-pergo-dark/60">
                      <span className="font-medium">Lieu:</span> {project.location}
                    </span>
                    <span className="text-pergo-green font-medium group-hover:underline">
                      Voir détails
                    </span>
                  </div>
                </div>
              </Link>
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
          
          {/* Testimonials section */}
          <Testimonials />
          
          {/* Section appel à l'action */}
          <div className="bg-pergo-green/10 rounded-lg p-10 text-center reveal-on-scroll">
            <h2 className="text-2xl font-bold mb-4 text-pergo-dark">Vous avez un projet en tête ?</h2>
            <p className="mb-6 text-lg text-pergo-dark/80 max-w-2xl mx-auto">
              Que vous ayez besoin d'une pergola, d'un abri, d'un portail ou de nouvelles menuiseries, nous sommes prêts à vous accompagner dans la réalisation de votre projet.
            </p>
            <Link to="/contact" className="inline-flex items-center bg-pergo-secondary hover:bg-pergo-green text-white px-6 py-3 rounded-lg font-medium transition-colors shadow-sm">
              Demander un devis gratuit
              <ChevronRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Realisations;
