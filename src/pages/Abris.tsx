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
import { ChevronRight, Shield, Ruler, Leaf, Clock, ThumbsUp, Heart } from "lucide-react";
import PageSEO from "@/components/seo/PageSEO";
import { motion } from "framer-motion";
import OptimizedImage from "@/components/ui/optimized-image";

// Images de galerie pour les abris sur-mesure
const galleryImages = [
  { 
    id: 1, 
    title: "Carport moderne en bois", 
    description: "Un abri de voiture élégant et contemporain pour votre entrée",
    image: "/images/abris/carportmoderne.png"
  },
  { 
    id: 2, 
    title: "Abri de jardin rustique", 
    description: "Un espace de rangement charmant avec plantes grimpantes",
    image: "/images/abris/abrisdejardin.png"
  },
  { 
    id: 3, 
    title: "Abri de spa au coucher du soleil", 
    description: "Protection et intimité pour votre espace bien-être",
    image: "/images/abris/abrisspa.png"
  },
  { 
    id: 4, 
    title: "Abri minimaliste à toit plat", 
    description: "Extension moderne pour votre espace de vie extérieur",
    image: "/images/abris/abristoisplat.png"
  }
];

// Atouts de l'entreprise
const advantages = [
  {
    icon: <Ruler className="w-8 h-8 text-pergo-green" />,
    title: "100% Sur-Mesure",
    description: "Chaque abri est conçu spécifiquement pour s'adapter parfaitement à votre espace et vos besoins."
  },
  {
    icon: <Shield className="w-8 h-8 text-pergo-green" />,
    title: "Matériaux Durables",
    description: "Nous sélectionnons uniquement des matériaux de haute qualité pour garantir la longévité de nos réalisations."
  },
  {
    icon: <Leaf className="w-8 h-8 text-pergo-green" />,
    title: "Fabrication Locale",
    description: "Tous nos abris sont fabriqués localement, réduisant notre empreinte carbone et soutenant l'économie locale."
  },
  {
    icon: <Clock className="w-8 h-8 text-pergo-green" />,
    title: "Accompagnement Personnalisé",
    description: "De la conception à l'installation, nous vous guidons à chaque étape de votre projet."
  },
  {
    icon: <ThumbsUp className="w-8 h-8 text-pergo-green" />,
    title: "Garantie 10 ans",
    description: "Nous avons confiance en la qualité de nos abris et vous offrons une garantie décennale."
  },
  {
    icon: <Heart className="w-8 h-8 text-pergo-green" />,
    title: "Satisfaction Client",
    description: "Votre satisfaction est notre priorité, nous nous engageons à dépasser vos attentes."
  }
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
        title="Abris Sur-Mesure | PergoLife"
        description="Créez l'abri de vos rêves avec notre expertise en conception et installation d'abris sur-mesure pour votre jardin, voiture ou spa."
        keywords="abri sur-mesure, abri de jardin, carport, abri de spa, abri de terrasse, fabrication locale"
        canonicalPath="/products/abris"
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
                Créez l'<span className="text-pergo-green">abri de vos rêves</span>, nous le réalisons
              </h1>
              <p className="text-xl text-pergo-dark/80 mb-8">
                Des solutions sur-mesure qui s'adaptent parfaitement à votre espace et subliment votre extérieur, conçues avec passion et expertise.
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
                  <span className="relative z-10">Parlez-nous de votre projet</span>
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
                    src="/images/abris/hero-abri.jpg"
                    alt="Abri sur-mesure - PergoLife"
                    className="w-full h-full object-cover object-center"
                    objectFit="cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-pergo-dark/30 to-transparent pointer-events-none"></div>
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 bg-pergo-green text-white p-4 rounded-lg shadow-lg">
                <p className="font-bold">Design & Qualité</p>
                <p className="text-sm">Fabrication sur-mesure</p>
              </div>
            </div>
          </div>

          {/* Section Nos Atouts */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="mb-20"
          >
            <h2 className="text-3xl font-bold mb-8 text-pergo-dark text-center">
              Nos <span className="text-pergo-green">atouts</span>
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

          {/* Section Vos Envies, Notre Expertise */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="mb-20"
          >
            <h2 className="text-3xl font-bold mb-8 text-pergo-dark text-center">
              Vos <span className="text-pergo-green">envies</span>, notre <span className="text-pergo-green">expertise</span>
            </h2>
            
            <div className="bg-white rounded-xl shadow-xl p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-pergo-green/10 to-transparent"></div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                  <p className="text-lg mb-6 text-pergo-dark/80">
                    Que vous rêviez d'un <strong className="text-pergo-green">carport élégant</strong> pour protéger votre véhicule, 
                    d'un <strong className="text-pergo-green">abri de jardin fonctionnel</strong> pour ranger vos outils, 
                    ou d'un <strong className="text-pergo-green">espace couvert pour votre spa</strong>, nous concevons la solution idéale.
                  </p>
                  
                  <p className="text-lg mb-6 text-pergo-dark/80">
                    Notre équipe d'experts vous accompagne de la conception à l'installation, 
                    en tenant compte de vos contraintes d'espace, de style et de budget.
                  </p>
                  
                  <p className="text-lg text-pergo-dark/80">
                    Chaque projet est unique, et c'est pourquoi nous travaillons en étroite collaboration avec vous 
                    pour créer un abri qui répond parfaitement à vos attentes et s'intègre harmonieusement à votre environnement.
                  </p>
                </div>
                
                <div className="relative">
                  <div className="rounded-lg overflow-hidden shadow-lg">
                    <OptimizedImage
                      src="/images/abris/carportsurmesure.png"
                      alt="Conception d'abris sur-mesure - PergoLife"
                      className="w-full h-auto"
                      objectFit="cover"
                    />
                  </div>
                  <div className="absolute -bottom-4 -left-4 bg-white p-4 rounded-lg shadow-lg">
                    <p className="font-bold text-pergo-green">Conception personnalisée</p>
                    <p className="text-sm text-pergo-dark/70">Selon vos besoins</p>
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
              <h2 className="text-3xl font-bold mb-4 text-pergo-dark">Parlez-nous de votre projet</h2>
              <p className="mb-8 text-xl text-pergo-dark/80 max-w-2xl mx-auto">
                Vous avez un projet d'abri sur-mesure ? Contactez-nous pour discuter de vos idées et obtenir un devis personnalisé. 
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

export default Abris;