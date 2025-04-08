import React, { useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import ProductCategories from "@/components/home/ProductCategories";
import About from "@/components/home/About";
import Gallery from "@/components/home/Gallery";
import Contact from "@/components/home/Contact";
import Testimonials from "@/components/home/Testimonials";
import LifeSpa from "@/components/home/LifeSpa";
import PageSEO from "@/components/seo/PageSEO";
import { LocalBusinessData } from "@/components/seo/StructuredData";

const Index = () => {
  useEffect(() => {
    // Script to handle reveal animations on scroll
    const handleRevealOnScroll = () => {
      const elements = document.querySelectorAll('.reveal-on-scroll:not(.revealed)');
      
      elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight * 0.85) {
          element.classList.add('revealed');
        }
      });
    };
    
    window.addEventListener('scroll', handleRevealOnScroll);
    // Initial check for elements in viewport on load
    handleRevealOnScroll();
    
    // Also run the reveal check after small delay to ensure carousels are properly initialized
    setTimeout(() => {
      handleRevealOnScroll();
    }, 500);
    
    return () => {
      window.removeEventListener('scroll', handleRevealOnScroll);
    };
  }, []);
  
  return (
    <div className="min-h-screen">
      <PageSEO 
        title="PergoLife | Spécialiste en pergolas bioclimatiques, abris, portails et menuiseries"
        description="Découvrez PergoLife, expert en pergolas bioclimatiques, abris de jardin, portails et menuiseries à Bénesse-Maremne (40). Installation professionnelle et devis gratuit."
        keywords="pergola bioclimatique, abri de jardin, portail, menuiserie, Landes, Pays Basque, Bénesse-Maremne"
        canonicalPath="/"
      />
      <LocalBusinessData
        name="PergoLife"
        description="Spécialiste en pergolas bioclimatiques, abris, portails et menuiseries dans les Landes et le Pays Basque."
        url="https://pergolife.fr"
        telephone="0609538979"
        email="contact@pergo-life.fr"
        address={{
          streetAddress: "830 Route de Bayonne",
          addressLocality: "Bénesse-Maremne",
          postalCode: "40230",
          addressCountry: "FR"
        }}
        geo={{
          latitude: 43.6204,
          longitude: -1.3897
        }}
        openingHours={[
          "Mo-Sa 09:00-18:00"
        ]}
        image="https://pergolife.fr/images/og-image.jpg"
      />
      <Navbar />
      <main>
        <Hero />
        <ProductCategories />
        <About />
        <Gallery />
        <Testimonials />
        <LifeSpa />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
