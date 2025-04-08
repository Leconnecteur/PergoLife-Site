import React, { useState } from 'react';
import { Send, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { subscribeToNewsletter } from '@/services/email-service';

interface NewsletterSignupProps {
  title?: string;
  description?: string;
  className?: string;
}

const NewsletterSignup: React.FC<NewsletterSignupProps> = ({
  title = 'Inscrivez-vous à notre newsletter',
  description = 'Recevez nos dernières actualités et offres exclusives directement dans votre boîte mail.',
  className = '',
}) => {
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation basique de l'email
    if (!email || !email.includes('@') || !email.includes('.')) {
      setError('Veuillez entrer une adresse email valide');
      return;
    }
    
    setIsSubmitting(true);
    setError('');
    
    try {
      const result = await subscribeToNewsletter(email);
      
      if (result.success) {
        // Nous utilisons uniquement la notification toast et non le message dans le composant
        toast({
          title: 'Inscription réussie',
          description: 'Merci de vous être inscrit à notre newsletter !',
        });
        setEmail('');
        // Réinitialiser le formulaire au lieu d'afficher un message de succès
      } else {
        setError(result.message);
        toast({
          title: 'Erreur',
          description: result.message,
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error("Erreur lors de l'inscription à la newsletter:", error);
      setError("Une erreur inattendue s'est produite. Veuillez réessayer ultérieurement.");
      toast({
        title: 'Erreur',
        description: "Une erreur inattendue s'est produite. Veuillez réessayer ultérieurement.",
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`bg-pergo-green/10 rounded-lg p-6 ${className}`}>
      <h3 className="text-xl font-bold mb-2 text-pergo-dark">{title}</h3>
      <p className="text-pergo-dark/80 mb-4">{description}</p>
      
      {error && (
        <div className="mb-4 p-3 bg-red-50 border-l-4 border-red-500 text-red-700 flex items-start">
          <AlertCircle size={18} className="mr-2 shrink-0 mt-0.5" />
          <p>{error}</p>
        </div>
      )}
          
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (error) setError('');
          }}
          placeholder="Votre adresse email"
          className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pergo-green text-pergo-dark dark:text-white bg-white dark:bg-pergo-dark/50"
          required
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-pergo-secondary hover:bg-pergo-green text-white px-4 py-2 rounded-md font-medium transition-colors shadow-sm flex items-center justify-center"
        >
          {isSubmitting ? (
            <>
              <span className="animate-spin mr-2">⟳</span>
              Envoi...
            </>
          ) : (
            <>
              <Send size={18} className="mr-2" />
              S'inscrire
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default NewsletterSignup;
