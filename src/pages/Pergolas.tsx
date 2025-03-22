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
import { ChevronRight } from "lucide-react";

const Pergolas = () => {
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen">
      <PageSEO 
        title="Pergolas Bioclimatiques | PergoLife"
        description="Découvrez notre gamme de pergolas bioclimatiques sur mesure à Bénesse-Maremne. Lames orientables, options motorisées et design personnalisable pour votre extérieur."
        keywords="pergola bioclimatique, pergola sur mesure, lames orientables, pergola aluminium, Landes, Pays Basque"
        canonicalPath="/products/pergolas"
      />
      <ProductData
        name="Pergolas Bioclimatiques PergoLife"
        description="Pergolas bioclimatiques sur mesure avec lames orientables, fabrication française et installation professionnelle dans les Landes et le Pays Basque."
        image="https://pergolife.fr/images/products/pergola-bioclimatique.jpg"
        url="https://pergolife.fr/products/pergolas"
        brand="PergoLife"
        offers={{
          availability: "https://schema.org/InStock"
        }}
      />
      <Navbar />
      <main className="pt-32 pb-12">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl font-bold font-heading mb-8 text-pergo-dark">Nos Pergolas</h1>
          
          <div className="prose max-w-none mb-12">
            <p className="text-xl text-pergo-dark/80 mb-6">
              Des pergolas bioclimatiques de qualité supérieure pour transformer votre espace extérieur en un lieu de vie confortable et élégant.
            </p>
            
            <p className="mb-8 text-pergo-dark/80">
              Toutes nos pergolas sont personnalisables et fabriquées avec des matériaux de haute qualité pour une durabilité optimale face aux conditions climatiques.
            </p>
          </div>
          
          {/* Catégories de pergolas */}
          <h2 className="text-2xl font-bold mb-6 text-pergo-dark">Catégories de pergolas</h2>
          {isMobile ? (
            <div className="mb-16">
              <Carousel
                opts={{
                  align: "start",
                  loop: true,
                }}
                className="w-full"
              >
                <CarouselContent>
                  {[
                    { title: "Pergolas Bioclimatiques", image: "bioclimatic-pergola", description: "Lames orientables pour maîtriser l'ensoleillement et la ventilation" },
                    { title: "Pergolas Adossées", image: "attached-pergola", description: "Solution idéale pour les terrasses attenantes à la maison" },
                    { title: "Pergolas Autoportées", image: "freestanding-pergola", description: "Structure indépendante pour aménager n'importe quel espace extérieur" }
                  ].map((category, index) => (
                    <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                      <div className="bg-white rounded-lg shadow-lg overflow-hidden hover-lift h-full">
                        <div className="aspect-w-16 aspect-h-10 bg-gray-200">
                          <OptimizedImage
                            src={`https://source.unsplash.com/random/800x600?${category.image}&sig=${index}`}
                            alt={`${category.title} - PergoLife, spécialiste en pergolas bioclimatiques dans les Landes`}
                            className="w-full h-full"
                            objectFit="cover"
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
                <div className="flex justify-center mt-4">
                  <CarouselPrevious className="relative mr-2 translate-y-0" />
                  <CarouselNext className="relative ml-2 translate-y-0" />
                </div>
              </Carousel>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {[
                { title: "Pergolas Bioclimatiques", image: "bioclimatic-pergola", description: "Lames orientables pour maîtriser l'ensoleillement et la ventilation" },
                { title: "Pergolas Adossées", image: "attached-pergola", description: "Solution idéale pour les terrasses attenantes à la maison" },
                { title: "Pergolas Autoportées", image: "freestanding-pergola", description: "Structure indépendante pour aménager n'importe quel espace extérieur" }
              ].map((category, index) => (
                <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden hover-lift">
                  <div className="aspect-w-16 aspect-h-10 bg-gray-200">
                    <OptimizedImage
                      src={`https://source.unsplash.com/random/800x600?${category.image}&sig=${index}`}
                      alt={`${category.title} - PergoLife, spécialiste en pergolas bioclimatiques dans les Landes`}
                      className="w-full h-full"
                      objectFit="cover"
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
          )}
          
          {/* Produits populaires */}
          <h2 className="text-3xl font-bold mb-8 text-pergo-dark">Nos modèles de pergolas bioclimatiques</h2>
          {isMobile ? (
            <div className="mb-16">
              <Carousel
                opts={{
                  align: "start",
                  loop: true,
                }}
                className="w-full"
              >
                <CarouselContent>
                  {[
                    { name: "Élégance", feature: "Lames orientables" },
                    { name: "Prestige", feature: "Éclairage LED intégré" },
                    { name: "Confort", feature: "Capteurs météo" },
                    { name: "Excellence", feature: "Stores latéraux" }
                  ].map((model, index) => (
                    <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/4">
                      <div className="bg-white rounded-lg shadow-md overflow-hidden hover-lift h-full">
                        <div className="aspect-w-1 aspect-h-1 bg-gray-200">
                          <OptimizedImage
                            src={`https://source.unsplash.com/random/400x400?pergola&sig=${index + 10}`}
                            alt={`Pergola modèle ${model.name} - PergoLife`}
                            className="w-full h-full"
                            objectFit="cover"
                          />
                        </div>
                        <div className="p-4">
                          <h3 className="text-lg font-bold mb-1 text-pergo-dark">Modèle {model.name}</h3>
                          <p className="text-pergo-dark/70 text-sm mb-3">
                            {model.feature}
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
                <div className="flex justify-center mt-4">
                  <CarouselPrevious className="relative mr-2 translate-y-0" />
                  <CarouselNext className="relative ml-2 translate-y-0" />
                </div>
              </Carousel>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {[
                { name: "Élégance", feature: "Lames orientables" },
                { name: "Prestige", feature: "Éclairage LED intégré" },
                { name: "Confort", feature: "Capteurs météo" },
                { name: "Excellence", feature: "Stores latéraux" }
              ].map((model, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover-lift">
                  <div className="aspect-w-1 aspect-h-1 bg-gray-200">
                    <OptimizedImage
                      src={`https://source.unsplash.com/random/400x400?pergola&sig=${index + 10}`}
                      alt={`Pergola modèle ${model.name} - PergoLife`}
                      className="w-full h-full"
                      objectFit="cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-bold mb-1 text-pergo-dark">Modèle {model.name}</h3>
                    <p className="text-pergo-dark/70 text-sm mb-3">
                      {model.feature}
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
          )}
          
          {/* Avantages des pergolas bioclimatiques */}
          <div className="bg-white rounded-lg shadow-md p-8 mb-16">
            <h2 className="text-2xl font-bold mb-6 text-pergo-dark text-center">Les avantages des pergolas bioclimatiques</h2>
            {isMobile ? (
              <Carousel
                opts={{
                  align: "start",
                  loop: true,
                }}
                className="w-full"
              >
                <CarouselContent>
                  {[
                    { icon: "☀️", title: "Confort thermique", description: "Maîtrisez l'ensoleillement et la ventilation pour un confort optimal en toute saison." },
                    { icon: "🌧️", title: "Protection contre les intempéries", description: "Profitez de votre extérieur même en cas de pluie grâce aux lames étanches." },
                    { icon: "🏠", title: "Valorisation immobilière", description: "Augmentez la valeur de votre propriété en créant un espace de vie supplémentaire." },
                    { icon: "🔧", title: "Personnalisation", description: "Configurez votre pergola selon vos goûts : couleur, dimensions, options..." },
                    { icon: "📱", title: "Motorisation et domotique", description: "Pilotez votre pergola à distance via smartphone ou télécommande." },
                    { icon: "♻️", title: "Économie d'énergie", description: "Réduisez vos besoins en climatisation grâce à une gestion optimale de l'ombre." }
                  ].map((advantage, index) => (
                    <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                      <div className="flex flex-col items-center text-center p-4">
                        <div className="w-16 h-16 bg-pergo-green/10 rounded-full flex items-center justify-center mb-4">
                          <span className="text-pergo-green text-2xl">{advantage.icon}</span>
                        </div>
                        <h3 className="font-bold mb-2 text-pergo-dark">{advantage.title}</h3>
                        <p className="text-pergo-dark/70">{advantage.description}</p>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <div className="flex justify-center mt-4">
                  <CarouselPrevious className="relative mr-2 translate-y-0" />
                  <CarouselNext className="relative ml-2 translate-y-0" />
                </div>
              </Carousel>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="flex flex-col items-center text-center p-4">
                  <div className="w-16 h-16 bg-pergo-green/10 rounded-full flex items-center justify-center mb-4">
                    <span className="text-pergo-green text-2xl">☀️</span>
                  </div>
                  <h3 className="font-bold mb-2 text-pergo-dark">Confort thermique</h3>
                  <p className="text-pergo-dark/70">Maîtrisez l'ensoleillement et la ventilation pour un confort optimal en toute saison.</p>
                </div>
                <div className="flex flex-col items-center text-center p-4">
                  <div className="w-16 h-16 bg-pergo-green/10 rounded-full flex items-center justify-center mb-4">
                    <span className="text-pergo-green text-2xl">🌧️</span>
                  </div>
                  <h3 className="font-bold mb-2 text-pergo-dark">Protection contre les intempéries</h3>
                  <p className="text-pergo-dark/70">Profitez de votre extérieur même en cas de pluie grâce aux lames étanches.</p>
                </div>
                <div className="flex flex-col items-center text-center p-4">
                  <div className="w-16 h-16 bg-pergo-green/10 rounded-full flex items-center justify-center mb-4">
                    <span className="text-pergo-green text-2xl">🏠</span>
                  </div>
                  <h3 className="font-bold mb-2 text-pergo-dark">Valorisation immobilière</h3>
                  <p className="text-pergo-dark/70">Augmentez la valeur de votre propriété en créant un espace de vie supplémentaire.</p>
                </div>
                <div className="flex flex-col items-center text-center p-4">
                  <div className="w-16 h-16 bg-pergo-green/10 rounded-full flex items-center justify-center mb-4">
                    <span className="text-pergo-green text-2xl">🔧</span>
                  </div>
                  <h3 className="font-bold mb-2 text-pergo-dark">Personnalisation</h3>
                  <p className="text-pergo-dark/70">Configurez votre pergola selon vos goûts : couleur, dimensions, options...</p>
                </div>
                <div className="flex flex-col items-center text-center p-4">
                  <div className="w-16 h-16 bg-pergo-green/10 rounded-full flex items-center justify-center mb-4">
                    <span className="text-pergo-green text-2xl">📱</span>
                  </div>
                  <h3 className="font-bold mb-2 text-pergo-dark">Motorisation et domotique</h3>
                  <p className="text-pergo-dark/70">Pilotez votre pergola à distance via smartphone ou télécommande.</p>
                </div>
                <div className="flex flex-col items-center text-center p-4">
                  <div className="w-16 h-16 bg-pergo-green/10 rounded-full flex items-center justify-center mb-4">
                    <span className="text-pergo-green text-2xl">♻️</span>
                  </div>
                  <h3 className="font-bold mb-2 text-pergo-dark">Économie d'énergie</h3>
                  <p className="text-pergo-dark/70">Réduisez vos besoins en climatisation grâce à une gestion optimale de l'ombre.</p>
                </div>
              </div>
            )}
          </div>
          
          {/* Appel à l'action */}
          <div className="bg-pergo-green/10 rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-4 text-pergo-dark">Envie d'une pergola bioclimatique ?</h2>
            <p className="mb-6 text-lg text-pergo-dark/80">
              Contactez-nous pour discuter de votre projet et obtenir un devis personnalisé.
            </p>
            <Link to="/contact">
              <Button variant="default" size="lg">
                Demander un devis gratuit
              </Button>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Pergolas;
