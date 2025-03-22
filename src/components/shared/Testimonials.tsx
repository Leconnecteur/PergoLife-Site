
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";
import { useIsMobile } from "@/hooks/use-mobile";

// Testimonial data
export const testimonials = [
  {
    name: "Thomas L.",
    location: "Paris",
    text: "PergoLife a transformé notre terrasse en un véritable espace de vie. Le professionnalisme et la qualité de la pergola ont dépassé nos attentes."
  },
  {
    name: "Martine D.",
    location: "Lyon",
    text: "De la conception à l'installation, tout a été impeccable. Notre abri de jardin est exactement comme nous l'imaginions. Merci pour ce service impeccable !"
  },
  {
    name: "Philippe R.",
    location: "Marseille",
    text: "Après avoir changé toutes nos fenêtres avec PergoLife, nous avons constaté une réelle différence dans notre confort thermique et acoustique. Service 5 étoiles !"
  }
];

export const TestimonialsSection: React.FC<{
  title?: string;
  className?: string;
}> = ({ title = "Ce que nos clients disent", className = "" }) => {
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
    <section className={`py-12 ${className}`}>
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold mb-10 text-pergo-dark text-center">{title}</h2>
        {isMobile ? renderTestimonialCarousel() : renderTestimonialGrid()}
      </div>
    </section>
  );
};
