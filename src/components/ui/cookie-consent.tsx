import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { X, Check, Cookie } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CookieConsentProps {
  className?: string;
}

const CookieConsent: React.FC<CookieConsentProps> = ({ className }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Vérifier si le consentement aux cookies a déjà été donné
    const consent = Cookies.get('cookie-consent');
    if (!consent) {
      // Afficher la bannière après un court délai pour une meilleure expérience utilisateur
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptAll = () => {
    // Définir le cookie de consentement pour 1 an
    Cookies.set('cookie-consent', 'all', { expires: 365 });
    setIsVisible(false);
  };

  const acceptEssential = () => {
    // Définir le cookie de consentement pour les cookies essentiels uniquement
    Cookies.set('cookie-consent', 'essential', { expires: 365 });
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className={cn(
      "fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6",
      "animate-in slide-in-from-bottom duration-500",
      className
    )}>
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100">
        <div className="p-6 md:p-8">
          <div className="flex items-start justify-between">
            <div className="flex items-center">
              <Cookie className="h-8 w-8 text-pergo-green mr-4" />
              <h3 className="text-xl font-bold text-pergo-dark">Politique de cookies</h3>
            </div>
            <button 
              onClick={acceptEssential}
              className="text-gray-400 hover:text-gray-500 transition-colors"
              aria-label="Fermer"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          
          <div className="mt-4">
            <p className="text-pergo-dark/70 leading-relaxed">
              Nous utilisons des cookies pour améliorer votre expérience sur notre site, personnaliser le contenu et les publicités, 
              fournir des fonctionnalités de médias sociaux et analyser notre trafic. En cliquant sur "Accepter tous les cookies", 
              vous consentez à notre utilisation des cookies.
            </p>
            
            <div className="mt-6 flex flex-col sm:flex-row items-center gap-4">
              <button
                onClick={acceptEssential}
                className={cn(
                  "w-full sm:w-auto px-6 py-3 rounded-lg border border-pergo-secondary",
                  "text-pergo-secondary font-medium hover:bg-pergo-secondary/5 transition-colors"
                )}
              >
                Cookies essentiels uniquement
              </button>
              
              <button
                onClick={acceptAll}
                className={cn(
                  "w-full sm:w-auto px-6 py-3 rounded-lg",
                  "bg-pergo-secondary hover:bg-pergo-green text-white font-medium",
                  "transition-colors flex items-center justify-center"
                )}
              >
                <Check className="mr-2 h-4 w-4" />
                Accepter tous les cookies
              </button>
            </div>
            
            <div className="mt-4 text-xs text-gray-500">
              <p>
                Pour en savoir plus, consultez notre{' '}
                <a href="/privacy" className="text-pergo-green hover:underline">
                  politique de confidentialité
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
