import React, { useState, useEffect, useRef } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Award, ThumbsUp, Users, Clock, Shield, Trophy } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import PageSEO from "@/components/seo/PageSEO";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";

// Testimonial data
const testimonials = [
  {
    name: "Thomas L.",
    location: "Paris",
    text: "PergoLife a transformé notre terrasse en un véritable espace de vie. Le professionnalisme de l'équipe et la qualité de la pergola ont dépassé nos attentes."
  },
  {
    name: "Martine D.",
    location: "Lyon",
    text: "De la conception à l'installation, tout a été impeccable. Notre abri de jardin est exactement comme nous l'imaginions. Merci à toute l'équipe !"
  },
  {
    name: "Philippe R.",
    location: "Marseille",
    text: "Après avoir changé toutes nos fenêtres avec PergoLife, nous avons constaté une réelle différence dans notre confort thermique et acoustique. Service 5 étoiles !"
  }
];

const About = () => {
  const isMobile = useIsMobile();

  const renderTestimonialCarousel = () => (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      className="w-full"
    >
      <CarouselContent>
        {testimonials.map((testimonial, index) => (
          <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
            <div className="bg-white p-6 rounded-lg shadow-md h-full">
              <div className="mb-4">
                ⭐⭐⭐⭐⭐
              </div>
              <p className="text-pergo-dark/80 mb-5 italic">
                "{testimonial.text}"
              </p>
              <div>
                <p className="font-bold text-pergo-dark">{testimonial.name}</p>
                <p className="text-sm text-pergo-dark/70">{testimonial.location}</p>
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
  );

  const renderTestimonialGrid = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {testimonials.map((testimonial, index) => (
        <div key={index} className="bg-white p-6 rounded-lg shadow-md">
          <div className="mb-4">
            ⭐⭐⭐⭐⭐
          </div>
          <p className="text-pergo-dark/80 mb-5 italic">
            "{testimonial.text}"
          </p>
          <div>
            <p className="font-bold text-pergo-dark">{testimonial.name}</p>
            <p className="text-sm text-pergo-dark/70">{testimonial.location}</p>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen">
      <PageSEO 
        title="À Propos | PergoLife"
        description="Découvrez PergoLife, spécialiste en pergolas bioclimatiques, abris, portails et menuiseries avec 6 ans d'expérience. Une équipe d'experts à votre service à Bénesse-Maremne."
        keywords="PergoLife, à propos, pergola bioclimatique, expertise, Bénesse-Maremne, Landes, Pays Basque"
        canonicalPath="/about"
      />
      <Navbar />
      <main className="pt-32 pb-12">
        <div className="container mx-auto px-6">
          {/* Hero section */}
          <div className="mb-16">
            <h1 className="text-4xl font-bold mb-6 text-pergo-dark">À propos de PergoLife</h1>
            <p className="text-xl text-pergo-dark/80 max-w-3xl">
              Spécialistes de la vente et l'installation de pergolas, abris, portails et menuiseries, nous transformons vos espaces extérieurs en lieux de vie confortables et élégants.
            </p>
          </div>
          
          {/* Notre histoire */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-pergo-dark">Notre histoire</h2>
              <div className="space-y-4 text-pergo-dark/80">
                <p>
                  PergoLife est née d'une passion pour l'aménagement extérieur et d'une volonté de proposer des solutions de qualité, durables et personnalisées pour les habitants de la région de Bénesse-Maremne et ses environs.
                </p>
                <p>
                  Notre entreprise s'est spécialisée dans les pergolas bioclimatiques, tout en développant une gamme complète de produits d'extérieur : abris, portails et menuiseries.
                </p>
                <p>
                  Aujourd'hui, grâce à notre expertise et notre engagement envers la qualité, PergoLife s'est imposé comme un partenaire de confiance pour tous vos projets d'aménagement extérieur.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-pergo-green/10 rounded-lg"></div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-pergo-green/10 rounded-lg"></div>
              <div className="relative z-10 overflow-hidden rounded-lg">
                <img 
                  src="https://images.unsplash.com/photo-1577495508048-b635879837f1?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
                  alt="L'équipe PergoLife" 
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
          
          {/* Nos valeurs */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold mb-10 text-pergo-dark text-center">Nos valeurs</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: ThumbsUp,
                  title: "Qualité",
                  description: "Nous utilisons uniquement des matériaux de première qualité et travaillons avec les meilleurs fournisseurs pour garantir des produits durables."
                },
                {
                  icon: Users,
                  title: "Service client",
                  description: "Votre satisfaction est notre priorité. Nous vous accompagnons à chaque étape de votre projet, de la conception à l'installation."
                },
                {
                  icon: Shield,
                  title: "Fiabilité",
                  description: "Nous respectons nos engagements en termes de délais, de budget et de qualité. Nos clients peuvent compter sur nous."
                }
              ].map((value, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                  <div className="w-14 h-14 bg-pergo-green/20 rounded-full flex items-center justify-center mb-4">
                    <value.icon size={28} className="text-pergo-green" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-pergo-dark">{value.title}</h3>
                  <p className="text-pergo-dark/70">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
          
          {/* Chiffres clés */}
          <div className="bg-pergo-green/10 rounded-lg p-10 mb-20">
            <h2 className="text-3xl font-bold mb-10 text-center text-pergo-dark">Chiffres clés</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              {[
                { value: "100%", label: "Satisfaction client", icon: Award, startValue: 0, suffix: "%" },
                { value: "4.9", label: "Note moyenne sur 5", icon: Trophy, startValue: 0, suffix: "" },
                { value: "6", label: "Années d'expertise", icon: Clock, startValue: 0, suffix: "" }
              ].map((stat, index) => (
                <CountUpStat key={index} stat={stat} />
              ))}
            </div>
          </div>
          
          {/* Témoignages */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-10 text-pergo-dark text-center">Ce que nos clients disent</h2>
            {isMobile ? renderTestimonialCarousel() : renderTestimonialGrid()}
          </div>
          
          {/* Appel à l'action */}
          <div className="bg-pergo-green/10 rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-4 text-pergo-dark">Prêt à commencer votre projet ?</h2>
            <p className="mb-6 text-lg text-pergo-dark/80">
              Contactez-nous dès aujourd'hui pour discuter de vos besoins et obtenir un devis personnalisé.
            </p>
            <a href="/contact" className="inline-block bg-pergo-secondary hover:bg-pergo-green text-white px-6 py-3 rounded-lg font-medium transition-colors shadow-sm">
              Demander un devis gratuit
            </a>
          </div>
          
          {/* Nos coordonnées */}
          <div className="mt-16 bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold mb-6 text-pergo-dark text-center">Nos coordonnées</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-pergo-green/10 rounded-full flex items-center justify-center mb-4">
                  <span className="text-pergo-green text-xl">📍</span>
                </div>
                <h3 className="font-bold mb-2 text-pergo-dark">Adresse</h3>
                <p className="text-pergo-dark/80">830 Route de Bayonne<br />40 230 Bénesse-Maremne</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-pergo-green/10 rounded-full flex items-center justify-center mb-4">
                  <span className="text-pergo-green text-xl">📞</span>
                </div>
                <h3 className="font-bold mb-2 text-pergo-dark">Téléphone</h3>
                <p className="text-pergo-dark/80">
                  <a href="tel:0609538979" className="hover:text-pergo-green transition-colors">06 09 53 89 79</a>
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-pergo-green/10 rounded-full flex items-center justify-center mb-4">
                  <span className="text-pergo-green text-xl">⏰</span>
                </div>
                <h3 className="font-bold mb-2 text-pergo-dark">Horaires</h3>
                <p className="text-pergo-dark/80">9h - 18h<br />Du lundi au samedi</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

// Composant pour l'animation des chiffres
const CountUpStat = ({ stat }) => {
  const [count, setCount] = useState(stat.startValue);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);
  
  // Extraire la valeur numérique
  const numericValue = parseFloat(stat.value.replace(/[^0-9.]/g, ''));
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    
    if (ref.current) {
      observer.observe(ref.current);
    }
    
    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);
  
  useEffect(() => {
    if (!isVisible) return;
    
    let startValue = stat.startValue;
    const endValue = numericValue;
    const duration = 2000; // 2 secondes
    const frameDuration = 1000 / 60; // 60 FPS
    const totalFrames = Math.round(duration / frameDuration);
    const increment = (endValue - startValue) / totalFrames;
    
    let currentFrame = 0;
    const counter = setInterval(() => {
      currentFrame++;
      const progress = currentFrame / totalFrames;
      const easedProgress = progress < 0.5
        ? 2 * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 2) / 2; // Easing function
      
      const currentCount = startValue + (endValue - startValue) * easedProgress;
      
      setCount(currentCount);
      
      if (currentFrame === totalFrames) {
        clearInterval(counter);
        setCount(endValue);
      }
    }, frameDuration);
    
    return () => clearInterval(counter);
  }, [isVisible, numericValue, stat.startValue]);
  
  return (
    <div ref={ref} className="p-4">
      <div className="flex justify-center mb-4">
        <stat.icon size={32} className="text-pergo-green" />
      </div>
      <div className="text-4xl font-bold mb-2 text-pergo-green">
        {count.toFixed(numericValue % 1 === 0 ? 0 : 1)}{stat.suffix}
      </div>
      <div className="text-pergo-dark/80">{stat.label}</div>
    </div>
  );
};

export default About;
