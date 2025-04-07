import React, { useState, useEffect, useRef } from 'react';
import { cn } from "@/lib/utils";
import { Menu, X, ChevronDown, ChevronRight, Phone, Mail, MapPin, Clock } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const location = useLocation();
  const isMobile = useIsMobile();
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  const toggleSubmenu = (name: string) => {
    setActiveSubmenu(prev => prev === name ? null : name);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when changing routes
  useEffect(() => {
    setIsMenuOpen(false);
    setActiveSubmenu(null);
  }, [location.pathname]);
  
  // Add touch swipe to close mobile menu
  useEffect(() => {
    if (!mobileMenuRef.current) return;
    
    let touchStartX = 0;
    
    const handleTouchStart = (e: TouchEvent) => {
      touchStartX = e.touches[0].clientX;
    };
    
    const handleTouchMove = (e: TouchEvent) => {
      if (!isMenuOpen) return;
      
      const touchX = e.touches[0].clientX;
      const diff = touchStartX - touchX;
      
      // If swiping left (positive diff) more than 100px, close the menu
      if (diff > 100) {
        setIsMenuOpen(false);
      }
    };
    
    const menuEl = mobileMenuRef.current;
    menuEl.addEventListener('touchstart', handleTouchStart);
    menuEl.addEventListener('touchmove', handleTouchMove);
    
    return () => {
      menuEl.removeEventListener('touchstart', handleTouchStart);
      menuEl.removeEventListener('touchmove', handleTouchMove);
    };
  }, [isMenuOpen]);

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { name: 'Accueil', path: '/' },
    { 
      name: 'Nos Produits', 
      path: '#',
      children: [
        { name: 'Pergolas', path: '/products/pergolas' },
        { name: 'Abris', path: '/products/abris' },
        { name: 'Portails', path: '/products/portails' },
        { name: 'Menuiseries', path: '/products/menuiseries' },
      ]
    },
    { name: 'Réalisations', path: '/realisations' },
    { name: 'À Propos', path: '/about' },
    { name: 'Contact', path: '/contact' }
  ];

  // Apply different styles based on scrolled state
  const navItemClass = (isActive: boolean) => cn(
    "font-medium transition-all duration-300 text-sm px-4 py-2 relative group",
    isScrolled 
      ? isActive ? "text-pergo-secondary font-semibold" : "text-pergo-dark hover:text-pergo-secondary" 
      : isActive ? "text-pergo-highlight font-semibold" : "text-white hover:text-pergo-highlight"
  );

  const dropdownTriggerClass = (isActive: boolean) => cn(
    "transition-all duration-300 bg-transparent hover:bg-transparent relative group",
    isScrolled 
      ? isActive ? "text-pergo-secondary font-semibold" : "text-pergo-dark hover:text-pergo-secondary" 
      : isActive ? "text-pergo-highlight font-semibold" : "text-white hover:text-pergo-highlight"
  );

  return (
    <>
      {/* Top bar with contact info - only visible when scrolled on desktop */}
      <div className={cn(
        "hidden lg:block fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out bg-pergo-dark text-white py-2 px-6",
        isScrolled ? "translate-y-0" : "-translate-y-full"
      )}>
        <div className="container mx-auto flex justify-between items-center text-sm">
          <div className="flex items-center space-x-6">
            <a href="tel:0609538979" className="flex items-center hover:text-pergo-highlight transition-colors">
              <Phone size={14} className="mr-2" />
              <span>06 09 53 89 79</span>
            </a>
            <a href="mailto:contact@pergo-life.fr" className="flex items-center hover:text-pergo-highlight transition-colors">
              <Mail size={14} className="mr-2" />
              <span>contact@pergo-life.fr</span>
            </a>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-pergo-highlight font-medium">Ouvert du Lundi au Samedi • 9h-18h</span>
          </div>
        </div>
      </div>

      {/* Main header */}
      <header
        className={cn(
          "fixed left-0 right-0 z-50 transition-all duration-300 ease-in-out px-6",
          isScrolled 
            ? "top-0 lg:top-10 py-3 bg-white/95 shadow-sm backdrop-blur-md" 
            : "top-0 py-5 bg-gradient-to-b from-pergo-dark/80 to-transparent backdrop-blur-sm"
        )}
      >
        <div className="container mx-auto">
          <nav className="flex items-center justify-between">
            {/* Logo with enhanced styling */}
            <Link to="/" className={cn(
              "flex items-center z-50 transition-all duration-300",
              isScrolled 
                ? "bg-white rounded-lg" 
                : "bg-white/90 backdrop-blur-sm rounded-lg p-1"
            )}>
              <img 
                src="/lovable-uploads/b065ac33-5cfa-4e4a-9562-68b8b59fa563.png" 
                alt="PergoLife" 
                className={cn(
                  "transition-all duration-300",
                  isScrolled ? "h-12 md:h-14" : "h-14 md:h-16"
                )}
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:block">
              <NavigationMenu>
                <NavigationMenuList className="gap-2">
                  {navLinks.map((link, index) => {
                    // Check if the link has children
                    if (link.children) {
                      return (
                        <NavigationMenuItem key={index}>
                          <NavigationMenuTrigger className={dropdownTriggerClass(isActive(link.path))}>
                            {link.name}
                            {/* Animated underline effect */}
                            <span className={cn(
                              "absolute left-0 right-0 bottom-0 h-0.5 bg-pergo-secondary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left",
                              isActive(link.path) && "scale-x-100"
                            )}></span>
                          </NavigationMenuTrigger>
                          <NavigationMenuContent>
                            <ul className="grid w-[220px] gap-1 p-4 bg-white shadow-lg rounded-lg backdrop-blur-sm">
                              {link.children.map((child, childIndex) => (
                                <li key={childIndex}>
                                  <NavigationMenuLink asChild>
                                    <Link
                                      to={child.path}
                                      className={cn(
                                        "block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors",
                                        "hover:bg-pergo-light hover:text-pergo-secondary relative overflow-hidden group",
                                        isActive(child.path) ? "text-pergo-secondary font-medium" : "text-pergo-dark"
                                      )}
                                    >
                                      <div className="text-sm font-medium relative z-10">{child.name}</div>
                                      <span className="absolute bottom-0 left-0 w-full h-0 bg-pergo-secondary/10 transition-all duration-300 group-hover:h-full"></span>
                                    </Link>
                                  </NavigationMenuLink>
                                </li>
                              ))}
                            </ul>
                          </NavigationMenuContent>
                        </NavigationMenuItem>
                      );
                    } 
                    
                    // Regular link without children
                    return (
                      <NavigationMenuItem key={index}>
                        <Link
                          to={link.path}
                          className={navItemClass(isActive(link.path))}
                        >
                          {link.name}
                          {/* Animated underline effect */}
                          <span className={cn(
                            "absolute left-0 right-0 bottom-0 h-0.5 bg-pergo-secondary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left",
                            isActive(link.path) && "scale-x-100"
                          )}></span>
                        </Link>
                      </NavigationMenuItem>
                    );
                  })}
                </NavigationMenuList>
              </NavigationMenu>
            </div>

            {/* Contact button on larger screens with enhanced styling */}
            <div className="hidden md:block">
              <Link 
                to="/contact" 
                className="inline-block px-5 py-2.5 rounded-md font-medium bg-pergo-secondary hover:bg-pergo-green text-white transition-colors duration-300 shadow-sm"
              >
                Demander un devis
              </Link>
            </div>

            {/* Mobile menu button with enhanced styling */}
            <button
              className={cn(
                "lg:hidden focus:outline-none p-2 rounded-md",
                isScrolled ? "text-pergo-dark bg-pergo-light/50" : "text-white bg-pergo-dark/30 backdrop-blur-sm"
              )}
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </nav>
        </div>
      </header>

      {/* Mobile Navigation with enhanced styling */}
      <div
        ref={mobileMenuRef}
        className={cn(
          "fixed inset-0 z-[100] bg-white w-full h-full transform transition-transform duration-300 ease-in-out lg:hidden overflow-y-auto",
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
        aria-hidden={!isMenuOpen}
        role="dialog"
        aria-modal="true"
      >
        {/* Close button for mobile menu */}
        <div className="flex justify-end p-6">
          <button 
            onClick={toggleMenu}
            aria-label="Close menu"
            className="text-pergo-dark hover:text-pergo-secondary transition-colors p-2 bg-pergo-light/50 rounded-full"
          >
            <X size={24} />
          </button>
        </div>
        
        {/* Logo in mobile menu with enhanced styling */}
        <div className="flex items-center justify-center mb-10">
          <Link to="/" onClick={() => setIsMenuOpen(false)} className="flex items-center">
            <img 
              src="/lovable-uploads/b065ac33-5cfa-4e4a-9562-68b8b59fa563.png" 
              alt="PergoLife" 
              className="h-20" 
              loading="eager"
            />
          </Link>
        </div>
        
        {/* Mobile menu links with accordion effect */}
        <div className="flex flex-col space-y-6 px-8">
          {navLinks.map((link, index) => {
            if (link.children) {
              const isSubmenuActive = activeSubmenu === link.name;
              
              return (
                <div key={index} className="space-y-4">
                  <button 
                    onClick={() => toggleSubmenu(link.name)}
                    className={cn(
                      "w-full text-left text-xl font-medium flex items-center justify-between",
                      isSubmenuActive ? "text-pergo-secondary" : "text-pergo-dark"
                    )}
                  >
                    <span>{link.name}</span>
                    <ChevronDown 
                      size={20} 
                      className={cn(
                        "text-pergo-secondary transition-transform duration-300",
                        isSubmenuActive ? "transform rotate-180" : ""
                      )} 
                    />
                  </button>
                  
                  <div className={cn(
                    "pl-4 border-l-2 border-pergo-light space-y-3 overflow-hidden transition-all duration-300",
                    isSubmenuActive ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                  )}>
                    {link.children.map((child, childIndex) => (
                      <Link
                        key={childIndex}
                        to={child.path}
                        onClick={() => setIsMenuOpen(false)}
                        className={cn(
                          "block text-lg py-2 px-3 rounded-md transition-colors flex items-center",
                          isActive(child.path)
                            ? "text-pergo-secondary font-medium bg-pergo-light/50"
                            : "text-pergo-dark/80 hover:text-pergo-secondary hover:bg-pergo-light/30"
                        )}
                      >
                        <ChevronRight size={16} className="mr-2 text-pergo-secondary/70" />
                        {child.name}
                      </Link>
                    ))}
                  </div>
                </div>
              );
            }
            
            return (
              <Link
                key={index}
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                className={cn(
                  "block text-xl py-3 font-medium transition-colors relative",
                  isActive(link.path)
                    ? "text-pergo-secondary"
                    : "text-pergo-dark hover:text-pergo-secondary"
                )}
              >
                {link.name}
                {isActive(link.path) && (
                  <span className="absolute left-0 w-8 h-0.5 -bottom-1 bg-pergo-secondary"></span>
                )}
              </Link>
            );
          })}
        </div>
        
        {/* Contact info in mobile menu */}
        <div className="mt-10 px-8 py-6 bg-pergo-light/50">
          <h3 className="text-lg font-medium text-pergo-dark mb-4">Contactez-nous</h3>
          <div className="space-y-4">
            <a href="tel:0609538979" className="flex items-center text-pergo-dark hover:text-pergo-secondary transition-colors">
              <Phone size={18} className="mr-3 text-pergo-secondary" />
              <span>06 09 53 89 79</span>
            </a>
            <a href="mailto:contact@pergo-life.fr" className="flex items-center text-pergo-dark hover:text-pergo-secondary transition-colors">
              <Mail size={18} className="mr-3 text-pergo-secondary" />
              <span>contact@pergo-life.fr</span>
            </a>
            <a 
              href="https://maps.google.com/?q=830+Route+de+Bayonne+-+40+230+Bénesse-Maremne" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center text-pergo-dark hover:text-pergo-secondary transition-colors"
            >
              <MapPin size={18} className="mr-3 text-pergo-secondary" />
              <span>830 Route de Bayonne - 40 230 Bénesse-Maremne</span>
            </a>
            <div className="flex items-center text-pergo-dark">
              <Clock size={18} className="mr-3 text-pergo-secondary" />
              <span>9h - 18h tous les jours du lundi au samedi</span>
            </div>
          </div>
          
          <div className="mt-6">
            <Link 
              to="/contact" 
              onClick={() => setIsMenuOpen(false)}
              className="block w-full py-3 text-center rounded-md font-medium bg-pergo-secondary hover:bg-pergo-green text-white transition-colors duration-300"
            >
              Demander un devis
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
