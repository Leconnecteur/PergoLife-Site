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
import { ChevronRight, Shield, Key, Palette, Cog, Ruler, Zap } from "lucide-react";
import PageSEO from "@/components/seo/PageSEO";
import { motion } from "framer-motion";
import OptimizedImage from "@/components/ui/optimized-image";

// Images de galerie pour les portails sur-mesure
const galleryImages = [
  { 
    id: 1, 
    title: "Portail contemporain en aluminium", 
    description: "Lignes épurées et design minimaliste pour une entrée moderne",
    image: "/images/portails/portailrecent.png"
  },
  { 
    id: 2, 
    title: "Portail classique en fer forgé", 
    description: "Élégance intemporelle avec des détails travaillés à la main",
    image: "/images/portails/portailferforge.png"
  },
  { 
    id: 3, 
    title: "Portail coulissant motorisé", 
    description: "Solution pratique et sécurisée pour les espaces limités",
    image: "/images/portails/portailcoulissant.png"
  },
  { 
    id: 4, 
    title: "Portail design avec éclairage intégré", 
    description: "Alliance parfaite entre esthétique et fonctionnalité",
    image: "/images/portails/portailaveclumiere.png"
  }
];

// Avantages des portails sur-mesure
const advantages = [
  {
    icon: <Ruler className="w-8 h-8 text-pergo-green" />,
    title: "Adaptation parfaite",
    description: "Chaque portail est conçu spécifiquement pour s'adapter aux dimensions et contraintes de votre entrée."
  },
  {
    icon: <Palette className="w-8 h-8 text-pergo-green" />,
    title: "Choix des matériaux",
    description: "Aluminium, fer forgé, bois... Sélectionnez le matériau qui correspond à vos goûts et à votre budget."
  },
  {
    icon: <ChevronRight className="w-8 h-8 text-pergo-green" />,
    title: "Type d'ouverture",
    description: "Optez pour un portail battant ou coulissant selon la configuration de votre entrée et vos préférences."
  },
  {
    icon: <Zap className="w-8 h-8 text-pergo-green" />,
    title: "Motorisation intégrée",
    description: "Profitez du confort d'un portail motorisé avec télécommande, digicode ou contrôle via smartphone."
  },
  {
    icon: <Shield className="w-8 h-8 text-pergo-green" />,
    title: "Sécurité renforcée",
    description: "Protégez votre propriété avec des systèmes de verrouillage performants et des matériaux résistants."
  },
  {
    icon: <Cog className="w-8 h-8 text-pergo-green" />,
    title: "Harmonie architecturale",
    description: "Votre portail s'intègre parfaitement au style de votre maison et valorise votre propriété."
  }
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

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const renderGalleryGrid = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
      {galleryImages.map((item) => (
        <motion.div 
          key={item.id} 
          className="bg-white rounded-xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300 flex flex-col"
          variants={fadeIn}
        >
          <div className="h-[420px] w-full bg-gray-100 overflow-hidden">
            <OptimizedImage
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover"
              objectFit="cover"
            />
          </div>
          <div className="p-6 flex-1">
            <h3 className="text-xl font-bold mb-2 text-pergo-dark">{item.title}</h3>
            <p className="text-pergo-dark/70">{item.description}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
  
  const renderGalleryCarousel = () => (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      className="w-full mb-16"
    >
      <CarouselContent>
        {galleryImages.map((item) => (
          <CarouselItem key={item.id} className="md:basis-1/2 lg:basis-1/2">
            <motion.div 
              className="bg-white rounded-xl shadow-xl overflow-hidden h-full flex flex-col"
              variants={fadeIn}
            >
              <div className="h-[420px] w-full bg-gray-100 overflow-hidden">
                <OptimizedImage
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                  objectFit="cover"
                />
              </div>
              <div className="p-6 flex-1">
                <h3 className="text-xl font-bold mb-2 text-pergo-dark">{item.title}</h3>
                <p className="text-pergo-dark/70">{item.description}</p>
              </div>
            </motion.div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="flex justify-center mt-4">
        <CarouselPrevious className="static transform-none mx-2" />
        <CarouselNext className="static transform-none mx-2" />
      </div>
    </Carousel>
  );

  return (
    <div className="min-h-screen">
      <PageSEO 
        title="Portails Sur-Mesure | PergoLife"
        description="Créez le portail de vos rêves avec notre expertise en conception et installation de portails sur-mesure pour sécuriser et embellir votre propriété."
        keywords="portail sur-mesure, portail aluminium, portail fer forgé, portail coulissant, portail battant, portail motorisé, portail design"
        canonicalPath="/products/portails"
      />
      <Navbar />
      <main className="pt-32 pb-12" ref={sectionRef}>
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="container mx-auto px-6"
        >
          {/* Hero Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold font-heading mb-6 text-pergo-dark">
                <span className="text-pergo-green">Sécurisez</span> et <span className="text-pergo-green">sublimez</span> l'entrée de votre propriété
              </h1>
              <p className="text-xl text-pergo-dark/80 mb-8">
                Des portails sur-mesure alliant esthétique, sécurité et durabilité pour valoriser votre habitat et refléter votre personnalité.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button 
                  onClick={() => {
                    const projectSection = document.getElementById('contact-section');
                    if (projectSection) {
                      const yOffset = -80;
                      const y = projectSection.getBoundingClientRect().top + window.pageYOffset + yOffset;
                      window.scrollTo({top: y, behavior: 'smooth'});
                    }
                  }}
                  variant="default" 
                  size="lg"
                  className="relative overflow-hidden group"
                >
                  <span className="relative z-10">Imaginez votre portail idéal</span>
                  <span className="absolute inset-0 bg-gradient-to-r from-pergo-green/80 via-pergo-green to-pergo-green/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-lg"></span>
                </Button>
                <Link to="/contact">
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="relative overflow-hidden group"
                  >
                    <span className="relative z-10">Demander un devis</span>
                    <span className="absolute inset-0 bg-gradient-to-r from-pergo-green/30 via-pergo-green/50 to-pergo-green/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-lg"></span>
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="rounded-lg overflow-hidden shadow-2xl h-[300px] bg-gray-100">
                <div className="relative w-full h-full">
                  <OptimizedImage
                    src="/images/portails/installationportail.png"
                    alt="Portail sur-mesure - PergoLife"
                    className="w-full h-full object-cover object-center"
                    objectFit="cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-pergo-dark/30 to-transparent pointer-events-none"></div>
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 bg-pergo-green text-white p-4 rounded-lg shadow-lg">
                <p className="font-bold">Élégance & Sécurité</p>
                <p className="text-sm">Fabrication française</p>
              </div>
            </div>
          </div>

          {/* Introduction */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="mb-20"
          >
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-lg text-pergo-dark/80 mb-6">
                Notre expertise dans la création de portails sur-mesure nous permet de répondre à toutes vos exigences, quels que soient le style architectural de votre maison, les contraintes techniques de votre entrée ou vos préférences esthétiques.
              </p>
              <p className="text-lg text-pergo-dark/80">
                Chaque projet est unique et bénéficie d'un accompagnement personnalisé, de la conception à l'installation, pour vous garantir un portail parfaitement adapté à vos besoins et à votre environnement.
              </p>
            </div>
          </motion.div>

          {/* Section Pourquoi un portail sur-mesure */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="mb-20"
          >
            <h2 className="text-3xl font-bold mb-8 text-pergo-dark text-center">
              Pourquoi un <span className="text-pergo-green">portail sur-mesure</span> ?
            </h2>
            
            <motion.div 
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {advantages.map((advantage, index) => (
                <motion.div 
                  key={index}
                  variants={fadeIn}
                  className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 hover:-translate-y-1"
                >
                  <div className="w-16 h-16 bg-pergo-green/10 rounded-full flex items-center justify-center mb-4">
                    {advantage.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-pergo-dark">{advantage.title}</h3>
                  <p className="text-pergo-dark/70">{advantage.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Section Style et sécurité à votre image */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="mb-20"
          >
            <h2 className="text-3xl font-bold mb-8 text-pergo-dark text-center">
              Style et <span className="text-pergo-green">sécurité</span> à votre image
            </h2>
            
            <div className="bg-white rounded-xl shadow-xl p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-pergo-green/10 to-transparent"></div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                  <p className="text-lg mb-6 text-pergo-dark/80">
                    Votre portail est bien plus qu'une simple entrée : c'est la <strong className="text-pergo-green">première impression</strong> que vous donnez de votre propriété. 
                    Nous vous proposons une personnalisation complète pour créer un portail qui vous ressemble.
                  </p>
                  
                  <p className="text-lg mb-6 text-pergo-dark/80">
                    Du choix des <strong className="text-pergo-green">matériaux</strong> (aluminium, fer forgé, bois...) aux <strong className="text-pergo-green">finitions</strong> (couleurs, textures, motifs), 
                    en passant par les <strong className="text-pergo-green">systèmes de sécurité</strong> (domotique, interphone, vidéosurveillance), 
                    nous vous accompagnons dans la création d'un portail alliant esthétique et fonctionnalité.
                  </p>
                  
                  <p className="text-lg text-pergo-dark/80">
                    Nos solutions d'<strong className="text-pergo-green">éclairage intégré</strong> subliment votre entrée et renforcent la sécurité de votre propriété, 
                    tandis que nos systèmes de <strong className="text-pergo-green">motorisation</strong> vous offrent un confort d'utilisation optimal au quotidien.
                  </p>
                </div>
                
                <div className="relative">
                  <div className="rounded-lg overflow-hidden shadow-lg">
                    <OptimizedImage
                      src="/images/portails/style-securite.jpg"
                      alt="Style et sécurité des portails sur-mesure - PergoLife"
                      className="w-full h-auto"
                      objectFit="cover"
                    />
                  </div>
                  <div className="absolute -bottom-4 -left-4 bg-white p-4 rounded-lg shadow-lg">
                    <p className="font-bold text-pergo-green">Design personnalisé</p>
                    <p className="text-sm text-pergo-dark/70">Selon vos goûts</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Galerie d'inspiration */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="mb-20"
          >
            <h2 className="text-3xl font-bold mb-8 text-pergo-dark text-center">
              Galerie <span className="text-pergo-green">d'inspiration</span>
            </h2>
            
            {isMobile ? renderGalleryCarousel() : renderGalleryGrid()}
          </motion.div>
          
          {/* CTA section */}
          <motion.div 
            id="contact-section"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <div className="bg-gradient-to-r from-pergo-green/20 via-pergo-green/30 to-pergo-green/20 rounded-xl p-8 md:p-12 text-center">
              <h2 className="text-3xl font-bold mb-4 text-pergo-dark">Imaginez votre portail idéal</h2>
              <p className="mb-8 text-xl text-pergo-dark/80 max-w-2xl mx-auto">
                Vous avez un projet de portail sur-mesure ? Contactez-nous pour discuter de vos idées et obtenir un devis personnalisé. 
                Nos experts vous accompagnent de la conception à l'installation.
              </p>
              <Link to="/contact">
                <Button 
                  variant="default" 
                  size="lg"
                  className="relative overflow-hidden group"
                >
                  <span className="relative z-10">Demander un devis gratuit</span>
                  <span className="absolute inset-0 bg-gradient-to-r from-pergo-green/80 via-pergo-green to-pergo-green/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-lg"></span>
                </Button>
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default Portails;