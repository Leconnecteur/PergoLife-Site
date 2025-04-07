import React, { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import PageSEO from "@/components/seo/PageSEO";
import OptimizedImage from "@/components/ui/optimized-image";
import { ProductData } from "@/components/seo/StructuredData";
import { useIsMobile } from "@/hooks/use-mobile";
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from "@/components/ui/carousel";
import { ChevronRight, Sun, Cloud, Droplets, Home, Zap, Palette, Smartphone, Leaf } from "lucide-react";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Pergolas = () => {
  const isMobile = useIsMobile();
  const [activeTab, setActiveTab] = useState("miami");

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

  const models = [
    {
      id: "miami",
      name: "MIAMI",
      image: "/images/pergolaMIAMI.png",
      description: "Design épuré et élégant, idéal pour les espaces contemporains",
      features: [
        "Structure en aluminium thermolaqué",
        "Lames orientables de 0° à 135°",
        "Dimensions max: 7m x 4m sans poteau intermédiaire",
        "Éclairage LED intégré en option",
        "Capteurs pluie et vent disponibles"
      ],
      colors: ["Blanc", "Gris anthracite", "Noir", "Personnalisable"],
      price: "À partir de"
    },
    {
      id: "ibiza",
      name: "IBIZA",
      image: "/images/pergolaIBIZA.png",
      description: "Style méditerranéen avec options d'éclairage intégré pour des soirées inoubliables",
      features: [
        "Structure en aluminium thermolaqué",
        "Lames orientables motorisées",
        "Système d'éclairage RGB multicolore",
        "Dimensions max: 6m x 4.5m sans poteau intermédiaire",
        "Stores latéraux zip en option"
      ],
      colors: ["Blanc", "Gris anthracite", "Beige", "Personnalisable"],
      price: "À partir de"
    },
    {
      id: "paris",
      name: "PARIS",
      image: "/images/pergolaPARIS.png",
      description: "Modèle haut de gamme avec finitions luxueuses pour un extérieur raffiné",
      features: [
        "Structure en aluminium thermolaqué haute résistance",
        "Lames orientables silencieuses",
        "Système domotique intégré",
        "Dimensions max: 5m x 7m sans poteau intermédiaire",
        "Chauffage infrarouge et système audio en option"
      ],
      colors: ["Blanc", "Noir", "Gris anthracite", "Bronze", "Personnalisable"],
      price: "À partir de"
    },
    {
      id: "hawai",
      name: "HAWAÏ",
      image: "/images/pergolaHAWAÏ.png",
      description: "Grande pergola pour couvrir de vastes espaces extérieurs avec style",
      features: [
        "Structure renforcée pour grandes dimensions",
        "Lames orientables extra-larges",
        "Dimensions max: 9m x 5m sans poteau intermédiaire",
        "Système de récupération d'eau de pluie",
        "Résistance aux vents jusqu'à 180 km/h"
      ],
      colors: ["Blanc", "Gris anthracite", "Noir", "Corten", "Personnalisable"],
      price: "À partir de"
    }
  ];

  const benefits = [
    {
      icon: <Sun className="w-8 h-8 text-pergo-green" />,
      title: "Confort thermique",
      description: "Maîtrisez l'ensoleillement et la ventilation pour un confort optimal en toute saison."
    },
    {
      icon: <Cloud className="w-8 h-8 text-pergo-green" />,
      title: "Protection contre les intempéries",
      description: "Profitez de votre extérieur même en cas de pluie grâce aux lames étanches."
    },
    {
      icon: <Home className="w-8 h-8 text-pergo-green" />,
      title: "Valorisation immobilière",
      description: "Augmentez la valeur de votre propriété en créant un espace de vie supplémentaire."
    },
    {
      icon: <Palette className="w-8 h-8 text-pergo-green" />,
      title: "Personnalisation",
      description: "Configurez votre pergola selon vos goûts : couleur, dimensions, options..."
    },
    {
      icon: <Smartphone className="w-8 h-8 text-pergo-green" />,
      title: "Motorisation et domotique",
      description: "Pilotez votre pergola à distance via smartphone ou télécommande."
    },
    {
      icon: <Leaf className="w-8 h-8 text-pergo-green" />,
      title: "Économie d'énergie",
      description: "Réduisez vos besoins en climatisation grâce à une gestion optimale de l'ombre."
    }
  ];

  const faqs = [
    {
      question: "Qu'est-ce qu'une pergola bioclimatique ?",
      answer: "Une pergola bioclimatique est une structure extérieure équipée de lames orientables qui permettent de réguler la luminosité, la ventilation et la température. Elle s'adapte aux conditions climatiques pour offrir un confort optimal en toute saison."
    },
    {
      question: "Quelle est la durée de vie d'une pergola bioclimatique ?",
      answer: "Nos pergolas bioclimatiques sont conçues pour durer. Avec une structure en aluminium thermolaqué de haute qualité, elles ont une durée de vie estimée de 20 à 30 ans avec un entretien minimal."
    },
    {
      question: "Peut-on installer une pergola bioclimatique soi-même ?",
      answer: "Bien que techniquement possible, nous recommandons fortement une installation professionnelle pour garantir la sécurité, l'étanchéité et le bon fonctionnement de votre pergola. Nos équipes sont formées pour réaliser une installation parfaite."
    },
    {
      question: "Les pergolas bioclimatiques sont-elles résistantes au vent ?",
      answer: "Oui, nos pergolas sont testées pour résister à des vents allant jusqu'à 180 km/h selon les modèles. Le système de lames permet également de les orienter en position de sécurité en cas de vent fort."
    }
  ];

  return (
    <div className="min-h-screen">
      <PageSEO 
        title="Pergolas Bioclimatiques | PergoLife"
        description="Découvrez notre gamme de pergolas bioclimatiques sur mesure. Lames orientables, options motorisées et design personnalisable pour transformer votre extérieur."
        keywords="pergola bioclimatique, pergola sur mesure, lames orientables, pergola aluminium, modèle Miami, modèle Ibiza, modèle Paris, modèle Hawaï"
        canonicalPath="/products/pergolas"
      />
      <ProductData
        name="Pergolas Bioclimatiques PergoLife"
        description="Pergolas bioclimatiques sur mesure avec lames orientables, fabrication française et installation professionnelle."
        image="https://pergolife.fr/images/products/pergola-bioclimatique.jpg"
        url="https://pergolife.fr/products/pergolas"
        brand="PergoLife"
        offers={{
          availability: "https://schema.org/InStock"
        }}
      />
      <Navbar />
      
      {/* Hero Section */}
      <main className="pt-32 pb-12">
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="container mx-auto px-6"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold font-heading mb-6 text-pergo-dark">
                Pergolas <span className="text-pergo-green">Bioclimatiques</span>
              </h1>
              <p className="text-xl text-pergo-dark/80 mb-8">
                Transformez votre extérieur en un espace de vie confortable et élégant, 
                parfaitement adapté à toutes les saisons grâce à nos pergolas bioclimatiques innovantes.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button 
                  variant="default" 
                  size="lg"
                  className="relative overflow-hidden group"
                  onClick={() => {
                    const modelsSection = document.getElementById('models');
                    if (modelsSection) {
                      const yOffset = -80; // Compensation pour la barre de navigation fixe
                      const y = modelsSection.getBoundingClientRect().top + window.pageYOffset + yOffset;
                      window.scrollTo({top: y, behavior: 'smooth'});
                    }
                  }}
                >
                  <span className="relative z-10">Découvrir nos modèles</span>
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
                    src="/images/pergolas.jpg"
                    alt="Pergola bioclimatique - PergoLife"
                    className="w-full h-full object-cover object-center"
                    objectFit="cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-pergo-dark/30 to-transparent pointer-events-none"></div>
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 bg-pergo-green text-white p-4 rounded-lg shadow-lg">
                <p className="font-bold">Innovation & Confort</p>
                <p className="text-sm">Technologie bioclimatique</p>
              </div>
            </div>
          </div>

          {/* What is a bioclimatic pergola section */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="mb-20"
          >
            <h2 className="text-3xl font-bold mb-8 text-pergo-dark text-center">
              Qu'est-ce qu'une <span className="text-pergo-green">pergola bioclimatique</span> ?
            </h2>
            
            <div className="bg-white rounded-xl shadow-xl p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-pergo-green/10 to-transparent"></div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                  <p className="text-lg mb-6 text-pergo-dark/80">
                    Une pergola bioclimatique est une structure extérieure innovante dotée de 
                    <strong className="text-pergo-green"> lames orientables</strong> qui s'adaptent aux conditions climatiques.
                  </p>
                  
                  <p className="text-lg mb-6 text-pergo-dark/80">
                    Contrairement aux pergolas traditionnelles, elle vous permet de 
                    <strong className="text-pergo-green"> contrôler précisément</strong> l'ensoleillement, 
                    la ventilation et la température de votre espace extérieur.
                  </p>
                  
                  <p className="text-lg text-pergo-dark/80">
                    Grâce à son système motorisé, vous pouvez ajuster l'orientation des lames 
                    pour créer l'ambiance parfaite, quelle que soit la météo ou la saison.
                  </p>
                </div>
                
                <div className="relative">
                  <div className="rounded-lg overflow-hidden shadow-lg">
                    <OptimizedImage
                      src="https://source.unsplash.com/random/800x600?pergola,bioclimatic"
                      alt="Fonctionnement d'une pergola bioclimatique - PergoLife"
                      className="w-full h-auto"
                      objectFit="cover"
                    />
                  </div>
                  <div className="absolute -bottom-4 -left-4 bg-white p-4 rounded-lg shadow-lg">
                    <p className="font-bold text-pergo-green">Lames orientables</p>
                    <p className="text-sm text-pergo-dark/70">De 0° à 135°</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Benefits section */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="mb-20"
          >
            <h2 className="text-3xl font-bold mb-8 text-pergo-dark text-center">
              Pourquoi choisir une <span className="text-pergo-green">pergola bioclimatique</span> ?
            </h2>
            
            <motion.div 
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {benefits.map((benefit, index) => (
                <motion.div 
                  key={index}
                  variants={fadeIn}
                  className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 hover:-translate-y-1"
                >
                  <div className="w-16 h-16 bg-pergo-green/10 rounded-full flex items-center justify-center mb-4">
                    {benefit.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-pergo-dark">{benefit.title}</h3>
                  <p className="text-pergo-dark/70">{benefit.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Models section */}
          <motion.div 
            id="models"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="mb-20"
          >
            <h2 className="text-3xl font-bold mb-8 text-pergo-dark text-center">
              Nos modèles de <span className="text-pergo-green">pergolas bioclimatiques</span>
            </h2>
            
            {isMobile ? (
              <Carousel
                opts={{
                  align: "start",
                  loop: true,
                }}
                className="w-full"
              >
                <CarouselContent>
                  {models.map((model, index) => (
                    <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                      <div className="bg-white rounded-xl shadow-lg overflow-hidden h-full flex flex-col">
                        <div className="bg-gray-100 p-4 flex items-center justify-center">
                          <OptimizedImage
                            src={model.image}
                            alt={`Pergola bioclimatique modèle ${model.name} - PergoLife`}
                            className="max-w-full h-auto object-contain"
                            objectFit="contain"
                          />
                        </div>
                        <div className="p-6 flex-grow">
                          <h3 className="text-2xl font-bold mb-2 text-pergo-dark">{model.name}</h3>
                          <p className="text-pergo-dark/80 mb-4">{model.description}</p>
                          <ul className="mb-6 space-y-2">
                            {model.features.slice(0, 3).map((feature, idx) => (
                              <li key={idx} className="flex items-start">
                                <ChevronRight className="w-5 h-5 text-pergo-green shrink-0 mt-0.5" />
                                <span className="text-pergo-dark/70">{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="p-6 pt-0">
                          <Link to="/contact">
                            <Button 
                              variant="default" 
                              className="w-full relative overflow-hidden group"
                            >
                              <span className="relative z-10">Demander un devis</span>
                              <span className="absolute inset-0 bg-gradient-to-r from-pergo-green/80 via-pergo-green to-pergo-green/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-lg"></span>
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <div className="flex justify-center mt-4">
                  <CarouselPrevious className="static transform-none mx-2" />
                  <CarouselNext className="static transform-none mx-2" />
                </div>
              </Carousel>
            ) : (
              <Tabs defaultValue="miami" className="w-full" onValueChange={setActiveTab}>
                <TabsList className="grid grid-cols-4 mb-8">
                  {models.map((model) => (
                    <TabsTrigger 
                      key={model.id} 
                      value={model.id}
                      className={`text-lg font-medium ${activeTab === model.id ? 'text-pergo-green' : 'text-pergo-dark/70'}`}
                    >
                      {model.name}
                    </TabsTrigger>
                  ))}
                </TabsList>
                
                {models.map((model) => (
                  <TabsContent key={model.id} value={model.id} className="mt-0">
                    <div className="bg-white rounded-xl shadow-xl overflow-hidden">
                      <div className="grid grid-cols-1 lg:grid-cols-2">
                        <div className="bg-gray-100 p-6 flex items-center justify-center min-h-[400px]">
                          <OptimizedImage
                            src={model.image}
                            alt={`Pergola bioclimatique modèle ${model.name} - PergoLife`}
                            className="max-w-full h-auto object-contain"
                            objectFit="contain"
                          />
                        </div>
                        <div className="p-8">
                          <h3 className="text-3xl font-bold mb-3 text-pergo-dark">{model.name}</h3>
                          <p className="text-xl text-pergo-dark/80 mb-6">{model.description}</p>
                          
                          <h4 className="text-lg font-semibold mb-3 text-pergo-dark">Caractéristiques :</h4>
                          <ul className="mb-6 space-y-3">
                            {model.features.map((feature, idx) => (
                              <li key={idx} className="flex items-start">
                                <ChevronRight className="w-5 h-5 text-pergo-green shrink-0 mt-0.5" />
                                <span className="text-pergo-dark/70">{feature}</span>
                              </li>
                            ))}
                          </ul>
                          
                          <h4 className="text-lg font-semibold mb-3 text-pergo-dark">Coloris disponibles :</h4>
                          <div className="flex flex-wrap gap-2 mb-8">
                            {model.colors.map((color, idx) => (
                              <span key={idx} className="bg-pergo-green/10 text-pergo-green px-3 py-1 rounded-full text-sm">
                                {color}
                              </span>
                            ))}
                          </div>
                          
                          <Link to="/contact">
                            <Button 
                              variant="default" 
                              size="lg"
                              className="relative overflow-hidden group"
                            >
                              <span className="relative z-10">Demander un devis</span>
                              <span className="absolute inset-0 bg-gradient-to-r from-pergo-green/80 via-pergo-green to-pergo-green/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-lg"></span>
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            )}
          </motion.div>

          {/* FAQ section */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="mb-20"
          >
            <h2 className="text-3xl font-bold mb-8 text-pergo-dark text-center">
              Questions <span className="text-pergo-green">fréquentes</span>
            </h2>
            
            <div className="bg-white rounded-xl shadow-xl p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {faqs.map((faq, index) => (
                  <div key={index} className="border-b border-gray-200 pb-6">
                    <h3 className="text-xl font-bold mb-3 text-pergo-dark">{faq.question}</h3>
                    <p className="text-pergo-dark/70">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
          
          {/* CTA section */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <div className="bg-gradient-to-r from-pergo-green/20 via-pergo-green/30 to-pergo-green/20 rounded-xl p-8 md:p-12 text-center">
              <h2 className="text-3xl font-bold mb-4 text-pergo-dark">Envie d'une pergola bioclimatique ?</h2>
              <p className="mb-8 text-xl text-pergo-dark/80 max-w-2xl mx-auto">
                Contactez-nous pour discuter de votre projet et obtenir un devis personnalisé. 
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

export default Pergolas;
