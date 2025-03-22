import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious,
  type CarouselApi
} from "@/components/ui/carousel";
import { Link } from "react-router-dom";

const testimonials = [
  {
    id: 1,
    name: "Thomas Dupont",
    location: "Bayonne",
    rating: 5,
    text: "Nous avons fait installer une pergola bioclimatique par PergoLife et nous sommes ravis du résultat. L'équipe a été très professionnelle du début à la fin, et la qualité du produit est exceptionnelle.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
  },
  {
    id: 2,
    name: "Marie Laurent",
    location: "Biarritz",
    rating: 5,
    text: "Service impeccable et produit de qualité. Notre nouvel abri de jardin s'intègre parfaitement dans notre espace extérieur. Merci à toute l'équipe de PergoLife pour leur expertise et leurs conseils.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
  },
  {
    id: 3,
    name: "Jean-Pierre Moreau",
    location: "Anglet",
    rating: 5,
    text: "Très satisfait de notre nouveau portail. Installation rapide et soignée, et un résultat à la hauteur de nos attentes. Je recommande vivement PergoLife pour leur sérieux et leur professionnalisme.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
  },
  {
    id: 4,
    name: "Sophie Martin",
    location: "Capbreton",
    rating: 5,
    text: "Excellente expérience avec PergoLife. De la conception à l'installation, tout s'est déroulé comme prévu. Notre pergola est magnifique et parfaitement adaptée à nos besoins.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
  }
];

const Testimonials = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isMobile = useIsMobile();
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  
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

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Star
        key={index}
        size={16}
        className={cn(
          "fill-current",
          index < rating ? "text-yellow-400" : "text-gray-300"
        )}
      />
    ));
  };

  const renderTestimonialCard = (testimonial: typeof testimonials[0]) => (
    <div className="bg-white p-6 rounded-xl shadow-card h-full flex flex-col">
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
          <img
            src={testimonial.image}
            alt={testimonial.name}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
        <div>
          <h3 className="font-bold text-pergo-dark">{testimonial.name}</h3>
          <p className="text-sm text-pergo-dark/60">{testimonial.location}</p>
        </div>
      </div>
      
      <div className="flex mb-4">
        {renderStars(testimonial.rating)}
      </div>
      
      <div className="relative flex-grow">
        <Quote className="absolute -top-2 -left-2 text-pergo-green/10" size={40} />
        <p className="text-pergo-dark/80 relative z-10 italic">
          "{testimonial.text}"
        </p>
      </div>
    </div>
  );

  const renderMobileCarousel = () => (
    <div className="w-full mt-10 reveal-on-scroll">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
        setApi={setApi}
      >
        <CarouselContent>
          {testimonials.map((testimonial) => (
            <CarouselItem key={testimonial.id} className="md:basis-1/2 lg:basis-1/3 pl-4">
              {renderTestimonialCard(testimonial)}
            </CarouselItem>
          ))}
        </CarouselContent>
        
        <div className="flex justify-center mt-6 items-center">
          <CarouselPrevious 
            className="relative mr-2 translate-y-0 bg-pergo-secondary hover:bg-pergo-green text-white" 
          />
          
          <div className="flex space-x-1 mx-4">
            {Array.from({ length: count }).map((_, i) => (
              <button
                key={i}
                className={cn(
                  "h-2 w-2 rounded-full transition-all duration-300",
                  current === i 
                    ? "bg-pergo-secondary w-4" 
                    : "bg-pergo-secondary/30"
                )}
                onClick={() => api?.scrollTo(i)}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
          
          <CarouselNext 
            className="relative ml-2 translate-y-0 bg-pergo-secondary hover:bg-pergo-green text-white" 
          />
        </div>
      </Carousel>
    </div>
  );

  const renderDesktopGrid = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
      {testimonials.map((testimonial) => (
        <div key={testimonial.id} className="reveal-on-scroll">
          {renderTestimonialCard(testimonial)}
        </div>
      ))}
    </div>
  );

  return (
    <section ref={sectionRef} className="py-20 bg-pergo-light">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto">
          <span className="inline-block text-pergo-green font-medium mb-3 reveal-on-scroll">TÉMOIGNAGES</span>
          <h2 className="text-3xl md:text-4xl font-bold text-pergo-dark mb-6 reveal-on-scroll">Ce que nos clients disent</h2>
          <p className="text-lg text-pergo-dark/70 reveal-on-scroll">
            Découvrez les expériences de nos clients qui ont fait confiance à PergoLife pour transformer leurs espaces extérieurs.
          </p>
        </div>
        
        {isMobile ? renderMobileCarousel() : renderDesktopGrid()}
        
        {/* Appel à l'action */}
        <div className="mt-12 text-center reveal-on-scroll">
          <Link 
            to="/contact" 
            className="inline-flex items-center px-6 py-3 rounded-md bg-pergo-secondary hover:bg-pergo-green text-white transition-colors duration-300 font-medium"
          >
            Demander un devis gratuit
            <ChevronRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
