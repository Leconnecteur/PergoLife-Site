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
import { ChevronRight, Shield, Zap, Palette, Ruler, ThermometerSnowflake, Volume2 } from "lucide-react";
import PageSEO from "@/components/seo/PageSEO";
import { motion } from "framer-motion";
import OptimizedImage from "@/components/ui/optimized-image";

// Images de galerie pour les menuiseries sur-mesure
const galleryImages = [
  { 
    id: 1, 
    title: "Fenêtres en aluminium", 
    description: "Design contemporain avec finesse des profils et résistance optimale",
    image: "/images/menuiseries/fenetrealu.png"
  },
  { 
    id: 2, 
    title: "Porte d'entrée sur-mesure", 
    description: "Sécurité et élégance pour valoriser l'entrée de votre maison",
    image: "/images/menuiseries/porteentree.png"
  },
  { 
    id: 3, 
    title: "Baie vitrée coulissante", 
    description: "Luminosité maximale et vue panoramique sur votre extérieur",
    image: "/images/menuiseries/baievitree.png"
  },
  { 
    id: 4, 
    title: "Volets roulants motorisés", 
    description: "Confort d'utilisation et isolation renforcée pour toutes les saisons",
    image: "/images/menuiseries/voletroulant.png"
  }
];

// Types de menuiseries proposées
const menuiseriesTypes = [
  {
    icon: <Ruler className="w-8 h-8 text-pergo-green" />,
    title: "Fenêtres",
    description: "Fenêtres à la française, oscillo-battantes ou fixes, conçues pour s'adapter parfaitement à vos ouvertures existantes."
  },
  {
    icon: <Shield className="w-8 h-8 text-pergo-green" />,
    title: "Portes d'entrée",
    description: "Portes d'entrée alliant sécurité et design, disponibles dans une multitude de styles, matériaux et finitions."
  },
  {
    icon: <Palette className="w-8 h-8 text-pergo-green" />,
    title: "Baies vitrées",
    description: "Baies coulissantes ou à galandage pour maximiser la luminosité et créer une continuité entre intérieur et extérieur."
  },
  {
    icon: <Zap className="w-8 h-8 text-pergo-green" />,
    title: "Volets",
    description: "Volets roulants, battants ou coulissants, manuels ou motorisés, pour sécuriser et isoler votre habitation."
  }
];

// Avantages des menuiseries sur-mesure
const advantages = [
  {
    icon: <ThermometerSnowflake className="w-8 h-8 text-pergo-green" />,
    title: "Performance thermique",
    description: "Nos menuiseries à haute isolation thermique réduisent significativement votre consommation énergétique et améliorent votre confort."
  },
  {
    icon: <Volume2 className="w-8 h-8 text-pergo-green" />,
    title: "Isolation acoustique",
    description: "Profitez d'un intérieur calme grâce à nos vitrages acoustiques qui atténuent efficacement les bruits extérieurs."
  },
  {
    icon: <Shield className="w-8 h-8 text-pergo-green" />,
    title: "Sécurité renforcée",
    description: "Nos menuiseries sont équipées de systèmes de fermeture multi-points et de vitrages retardateurs d'effraction."
  },
  {
    icon: <Palette className="w-8 h-8 text-pergo-green" />,
    title: "Esthétique personnalisée",
    description: "Large choix de matériaux, couleurs, finitions et accessoires pour des menuiseries qui s'harmonisent parfaitement avec votre intérieur et extérieur."
  }
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
        title="Menuiseries Sur-Mesure | PergoLife"
        description="Transformez votre habitat avec nos menuiseries sur-mesure alliant confort, performance énergétique et design personnalisé pour une maison à votre image."
        keywords="menuiseries sur-mesure, fenêtres, portes d'entrée, baies vitrées, volets, isolation thermique, économie d'énergie, design personnalisé"
        canonicalPath="/products/menuiseries"
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
                <span className="text-pergo-green">Confort</span>, performance et <span className="text-pergo-green">design</span> pour vos ouvertures
              </h1>
              <p className="text-xl text-pergo-dark/80 mb-8">
                Des menuiseries sur-mesure qui allient esthétique, isolation thermique et sécurité pour transformer durablement votre habitat.
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
                  <span className="relative z-10">Imaginez vos menuiseries</span>
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
                    src="/images/menuiseries/presentationmenuiserie.png"
                    alt="Menuiseries sur-mesure - PergoLife"
                    className="w-full h-full object-cover object-center"
                    objectFit="cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-pergo-dark/30 to-transparent pointer-events-none"></div>
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 bg-pergo-green text-white p-4 rounded-lg shadow-lg">
                <p className="font-bold">Performance & Design</p>
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
                Nos menuiseries sur-mesure sont conçues pour répondre aux exigences les plus élevées en matière de qualité, d'isolation et d'esthétique. 
                Nous utilisons exclusivement des matériaux premium et des technologies de pointe pour vous garantir des produits durables et performants.
              </p>
              <p className="text-lg text-pergo-dark/80">
                Que vous souhaitiez remplacer vos fenêtres, installer une nouvelle porte d'entrée ou aménager votre espace avec des baies vitrées, 
                notre expertise vous assure des menuiseries parfaitement adaptées à votre habitat et à vos besoins spécifiques.
              </p>
            </div>
          </motion.div>

          {/* Section Vos ouvertures, notre expertise */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="mb-20"
          >
            <h2 className="text-3xl font-bold mb-8 text-pergo-dark text-center">
              Vos <span className="text-pergo-green">ouvertures</span>, notre expertise
            </h2>
            
            <motion.div 
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {menuiseriesTypes.map((type, index) => (
                <motion.div 
                  key={index}
                  variants={fadeIn}
                  className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 hover:-translate-y-1"
                >
                  <div className="w-16 h-16 bg-pergo-green/10 rounded-full flex items-center justify-center mb-4">
                    {type.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-pergo-dark">{type.title}</h3>
                  <p className="text-pergo-dark/70">{type.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Section Design et performance au service de votre confort */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="mb-20"
          >
            <h2 className="text-3xl font-bold mb-8 text-pergo-dark text-center">
              Design et <span className="text-pergo-green">performance</span> au service de votre confort
            </h2>
            
            <div className="bg-white rounded-xl shadow-xl p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-pergo-green/10 to-transparent"></div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                  <p className="text-lg mb-6 text-pergo-dark/80">
                    Nos menuiseries sur-mesure ne se contentent pas d'être belles, elles sont aussi <strong className="text-pergo-green">hautement performantes</strong>. 
                    Nous concevons chaque élément en pensant à l'équilibre parfait entre esthétique et efficacité.
                  </p>
                  
                  <p className="text-lg mb-6 text-pergo-dark/80">
                    Grâce à des <strong className="text-pergo-green">matériaux innovants</strong> et des <strong className="text-pergo-green">technologies de pointe</strong>, 
                    nos menuiseries vous garantissent une isolation thermique et acoustique optimale, réduisant significativement votre consommation énergétique 
                    tout en améliorant votre confort au quotidien.
                  </p>
                  
                  <p className="text-lg text-pergo-dark/80">
                    Chaque projet est unique et bénéficie d'un <strong className="text-pergo-green">accompagnement personnalisé</strong>, 
                    de la conception à l'installation, pour vous assurer des menuiseries parfaitement adaptées à votre style de vie et à l'architecture de votre maison.
                  </p>
                </div>
                
                <div className="relative">
                  <div className="rounded-lg overflow-hidden shadow-lg">
                    <OptimizedImage
                      src="/images/menuiseries/design-performance.jpg"
                      alt="Design et performance des menuiseries sur-mesure - PergoLife"
                      className="w-full h-auto"
                      objectFit="cover"
                    />
                  </div>
                  <div className="absolute -bottom-4 -left-4 bg-white p-4 rounded-lg shadow-lg">
                    <p className="font-bold text-pergo-green">Économies d'énergie</p>
                    <p className="text-sm text-pergo-dark/70">Jusqu'à 30% sur votre facture</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
              {advantages.map((advantage, index) => (
                <motion.div 
                  key={index}
                  variants={fadeIn}
                  className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="w-12 h-12 bg-pergo-green/10 rounded-full flex items-center justify-center mb-4">
                    {advantage.icon}
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-pergo-dark">{advantage.title}</h3>
                  <p className="text-sm text-pergo-dark/70">{advantage.description}</p>
                </motion.div>
              ))}
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
              <h2 className="text-3xl font-bold mb-4 text-pergo-dark">Parlez-nous de votre projet de menuiserie</h2>
              <p className="mb-8 text-xl text-pergo-dark/80 max-w-2xl mx-auto">
                Vous avez un projet de rénovation ou de construction ? Nos experts vous accompagnent dans le choix et l'installation 
                de menuiseries sur-mesure parfaitement adaptées à vos besoins et à votre budget.
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

export default Menuiseries;