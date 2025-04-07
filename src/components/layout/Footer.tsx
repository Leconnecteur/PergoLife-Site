import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Instagram, Mail, MapPin, Phone, ChevronRight, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import NewsletterSignup from "@/components/shared/NewsletterSignup";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-pergo-dark text-white">
      {/* Newsletter section */}
      <div className="container mx-auto px-6 py-12 border-b border-white/10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-bold mb-2">Restez informé</h3>
            <p className="text-gray-300 max-w-md">
              Inscrivez-vous à notre newsletter pour recevoir nos actualités et offres spéciales.
            </p>
          </div>
          <div className="w-full md:w-auto">
            <NewsletterSignup 
              title="" 
              description="" 
              className="bg-transparent p-0" 
            />
          </div>
        </div>
      </div>
      
      {/* Main footer content */}
      <div className="container mx-auto px-6 pt-12 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-bold font-heading mb-6">
              Pergo<span className="text-pergo-secondary">Life</span>
            </h3>
            <p className="text-gray-300 mb-6">
              Spécialiste en pergolas, abris, portails et menuiseries. Notre expertise crée des espaces de vie élégants et durables.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://www.facebook.com/profile.php?id=61574408078852" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="bg-white/10 hover:bg-pergo-secondary text-white p-2 rounded-full transition-colors duration-300"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a 
                href="#" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="bg-white/10 hover:bg-pergo-secondary text-white p-2 rounded-full transition-colors duration-300"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a 
                href="mailto:contact@pergo-life.fr" 
                className="bg-white/10 hover:bg-pergo-secondary text-white p-2 rounded-full transition-colors duration-300"
                aria-label="Email"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>
          
          {/* Products */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-pergo-secondary">Nos Produits</h4>
            <ul className="space-y-3">
              {[
                { name: 'Pergolas', path: '/products/pergolas' },
                { name: 'Abris', path: '/products/abris' },
                { name: 'Portails', path: '/products/portails' },
                { name: 'Menuiseries', path: '/products/menuiseries' }
              ].map((item, index) => (
                <li key={index}>
                  <Link 
                    to={item.path} 
                    className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center group"
                  >
                    <ChevronRight size={14} className="mr-2 text-pergo-secondary opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span>{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-pergo-secondary">Liens Utiles</h4>
            <ul className="space-y-3">
              {[
                { name: 'Nos Réalisations', path: '/realisations' },
                { name: 'À Propos', path: '/about' },
                { name: 'Contact', path: '/contact' },
                { name: 'Politique de Confidentialité', path: '/privacy' }
              ].map((item, index) => (
                <li key={index}>
                  <Link 
                    to={item.path} 
                    className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center group"
                  >
                    <ChevronRight size={14} className="mr-2 text-pergo-secondary opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span>{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-pergo-secondary">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin size={20} className="mr-3 text-pergo-secondary shrink-0 mt-1" />
                <a href="https://maps.google.com/?q=830+Route+de+Bayonne+-+40+230+Bénesse-Maremne" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors">830 Route de Bayonne - 40 230 Bénesse-Maremne</a>
              </li>
              <li className="flex items-center">
                <Phone size={20} className="mr-3 text-pergo-secondary shrink-0" />
                <a href="tel:0609538979" className="text-gray-300 hover:text-white transition-colors">06 09 53 89 79</a>
              </li>
              <li className="flex items-center">
                <Mail size={20} className="mr-3 text-pergo-secondary shrink-0" />
                <a href="mailto:contact@pergo-life.fr" className="text-gray-300 hover:text-white transition-colors">contact@pergo-life.fr</a>
              </li>
            </ul>
            <Link 
              to="/contact" 
              className="mt-6 flex items-center text-pergo-secondary hover:text-white transition-colors duration-300 font-medium"
            >
              Nous contacter <ArrowUpRight size={16} className="ml-1" />
            </Link>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between text-gray-400 text-sm">
          <p> {currentYear} PergoLife. Tous droits réservés par <a href="https://leconnecteurdigital.fr/" target="_blank" rel="noopener noreferrer" className="text-pergo-secondary hover:text-white transition-colors duration-300">Le Connecteur Digital</a></p>
          <div className="mt-4 md:mt-0 flex gap-6">
            <Link to="/legal" className="hover:text-pergo-secondary transition-colors duration-300">
              Mentions légales
            </Link>
            <Link to="/privacy" className="hover:text-pergo-secondary transition-colors duration-300">
              Politique de confidentialité
            </Link>
          </div>
        </div>
      </div>
      
      {/* Scroll to top button */}
      <div className="text-center pb-6">
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="bg-pergo-secondary text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-pergo-highlight transition-colors shadow-md"
          aria-label="Retour en haut de la page"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m18 15-6-6-6 6"/>
          </svg>
        </button>
      </div>
    </footer>
  );
};

export default Footer;
