import { useState, useEffect } from 'react';

/**
 * Hook personnalisé pour détecter si l'appareil est un mobile
 * @returns {boolean} true si l'appareil est un mobile, false sinon
 */
export function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    // Fonction pour vérifier si l'appareil est un mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Vérifier au chargement initial
    checkMobile();

    // Ajouter un écouteur d'événement pour les changements de taille de fenêtre
    window.addEventListener('resize', checkMobile);

    // Nettoyer l'écouteur d'événement
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return isMobile;
}
