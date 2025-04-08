import React from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import OptimizedImage from "@/components/ui/optimized-image";

const LifeSpa = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <section className="py-16 bg-gradient-to-r from-pergo-green/5 to-pergo-green/10">
      <div className="container mx-auto px-6">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
        >
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-pergo-dark">
              Découvrez notre univers <span className="text-pergo-green">bien-être</span>
            </h2>
            <p className="text-lg text-pergo-dark/80 mb-8">
              Le même savoir-faire artisanal qui fait la réputation de PergoLife se retrouve dans notre boutique 
              <strong className="text-pergo-green"> LifeSpa</strong>. Spécialisés dans les spas haut de gamme, 
              nous vous proposons des solutions de bien-être pour transformer votre extérieur en véritable oasis de relaxation. 
              Venez découvrir notre sélection exclusive de spas conçus pour votre confort et votre détente.
            </p>
            <a 
              href="https://lifespa.fr" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block"
            >
              <Button 
                variant="default" 
                size="lg"
                className="relative overflow-hidden group"
              >
                <span className="relative z-10">Découvrir LifeSpa</span>
                <span className="absolute inset-0 bg-gradient-to-r from-pergo-green/80 via-pergo-green to-pergo-green/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-lg"></span>
              </Button>
            </a>
          </div>
          <div className="relative">
            <div className="rounded-xl overflow-hidden shadow-2xl">
              <OptimizedImage
                src="/images/lifespa/spa-exterieur.png"
                alt="Spa extérieur haut de gamme - LifeSpa"
                className="w-full h-[400px] object-cover"
                objectFit="cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-pergo-dark/20 to-transparent pointer-events-none"></div>
            </div>
            <div className="absolute -bottom-6 -right-6 bg-pergo-green text-white p-4 rounded-lg shadow-lg">
              <p className="font-bold">Détente & Bien-être</p>
              <p className="text-sm">Spas haut de gamme</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default LifeSpa;
