import React, { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { Send, CheckCircle, MapPin, Mail, Phone, Clock } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from "@/components/ui/carousel";

const contactInfo = [
  {
    icon: MapPin,
    title: "Nos bureaux",
    content: "830 Route de Bayonne - 40 230 Bénesse-Maremne",
    link: "https://maps.google.com/?q=830+Route+de+Bayonne+-+40+230+Bénesse-Maremne",
    isExternal: true
  },
  {
    icon: Mail,
    title: "Email",
    content: "contact@pergolife.fr",
    link: "mailto:contact@pergolife.fr",
    isExternal: false
  },
  {
    icon: Phone,
    title: "Téléphone",
    content: "06 09 53 89 79",
    link: "tel:0609538979",
    isExternal: false
  },
  {
    icon: Clock,
    title: "Horaires d'ouverture",
    content: "9h - 18h tous les jours du lundi au samedi",
    link: null,
    isExternal: false
  }
];

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const sectionRef = useRef<HTMLElement>(null);
  const isMobile = useIsMobile();
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      toast({
        title: "Message envoyé !",
        description: "Nous vous répondrons dans les plus brefs délais.",
      });
      
      // Reset form after success
      setTimeout(() => {
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: ""
        });
        setIsSuccess(false);
      }, 3000);
    }, 1500);
  };
  
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

  const renderContactCarousel = () => (
    <div className="w-full mb-8 reveal-on-scroll">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent>
          {contactInfo.map((item, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/4 pl-4">
              <div className="bg-pergo-light p-6 rounded-lg h-full flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-pergo-green/10 rounded-full flex items-center justify-center mb-3">
                  <item.icon className="text-pergo-green" size={24} />
                </div>
                <h3 className="text-xl font-bold text-pergo-dark mb-2">{item.title}</h3>
                {item.link ? (
                  <a 
                    href={item.link} 
                    target={item.isExternal ? "_blank" : undefined} 
                    rel={item.isExternal ? "noopener noreferrer" : undefined}
                    className="text-pergo-dark/70 hover:text-pergo-green transition-colors"
                  >
                    {item.content}
                  </a>
                ) : (
                  <p className="text-pergo-dark/70">{item.content}</p>
                )}
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
  );

  const renderContactGrid = () => (
    <div className="space-y-6 reveal-on-scroll">
      {contactInfo.map((item, index) => (
        <div key={index} className="bg-pergo-light p-6 rounded-lg">
          <h3 className="text-xl font-bold text-pergo-dark mb-2">{item.title}</h3>
          {item.link ? (
            <a 
              href={item.link} 
              target={item.isExternal ? "_blank" : undefined} 
              rel={item.isExternal ? "noopener noreferrer" : undefined}
              className="text-pergo-dark/70 hover:text-pergo-green transition-colors"
            >
              {item.content}
            </a>
          ) : (
            <p className="text-pergo-dark/70">{item.content}</p>
          )}
        </div>
      ))}
    </div>
  );

  return (
    <section ref={sectionRef} className="py-20">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <span className="inline-block text-pergo-green font-medium mb-3 reveal-on-scroll">CONTACT</span>
              <h2 className="text-3xl md:text-4xl font-bold text-pergo-dark mb-6 reveal-on-scroll">Discutons de votre projet</h2>
              
              <p className="text-lg text-pergo-dark/70 mb-10 reveal-on-scroll">
                Que vous ayez une question sur nos produits ou que vous souhaitiez démarrer un nouveau projet, notre équipe est à votre disposition pour vous accompagner.
              </p>
              
              {isMobile ? renderContactCarousel() : renderContactGrid()}
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-card reveal-on-scroll">
              <h3 className="text-2xl font-bold text-pergo-dark mb-6">Envoyez-nous un message</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-pergo-dark mb-2">
                      Nom complet
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className={cn(
                        "w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-pergo-green/30 focus:border-pergo-green outline-none transition-all duration-300",
                        "border-gray-200"
                      )}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-pergo-dark mb-2">
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-pergo-green/30 focus:border-pergo-green outline-none transition-all duration-300"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-pergo-dark mb-2">
                      Téléphone
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-pergo-green/30 focus:border-pergo-green outline-none transition-all duration-300"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-pergo-dark mb-2">
                      Sujet
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-pergo-green/30 focus:border-pergo-green outline-none transition-all duration-300"
                    >
                      <option value="">Sélectionnez...</option>
                      <option value="Pergolas">Pergolas</option>
                      <option value="Abris">Abris</option>
                      <option value="Portails">Portails</option>
                      <option value="Menuiseries">Menuiseries</option>
                      <option value="Autre">Autre</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-pergo-dark mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-pergo-green/30 focus:border-pergo-green outline-none transition-all duration-300"
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting || isSuccess}
                  className={cn(
                    "w-full py-3 px-6 rounded-lg font-medium transition-all duration-300 flex items-center justify-center",
                    isSuccess 
                      ? "bg-green-500 text-white" 
                      : "bg-pergo-green text-white hover:bg-pergo-green/90"
                  )}
                >
                  {isSubmitting ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Envoi en cours...
                    </span>
                  ) : isSuccess ? (
                    <span className="flex items-center">
                      <CheckCircle className="mr-2 h-5 w-5" />
                      Message envoyé !
                    </span>
                  ) : (
                    <span className="flex items-center">
                      <Send className="mr-2 h-5 w-5" />
                      Envoyer le message
                    </span>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
