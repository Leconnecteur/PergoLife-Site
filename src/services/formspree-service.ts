/**
 * Service pour gérer les envois d'emails de confirmation aux clients via Formspree
 * Une solution simple qui utilise un seul formulaire Formspree pour toutes les confirmations
 */

// Identifiant Formspree pour le formulaire de confirmation
// Ce formulaire est utilisé pour envoyer toutes les confirmations aux clients
const FORMSPREE_URL = 'https://formspree.io/f/mqapgvew';

// Messages de succès et d'erreur
const MESSAGES = {
  contactSuccessMessage: 'Votre message a été envoyé avec succès ! Nous vous répondrons dans les plus brefs délais.',
  contactErrorMessage: 'Une erreur est survenue lors de l\'envoi du message. Veuillez réessayer.',
  newsletterSuccessMessage: 'Inscription à la newsletter réussie ! Merci de votre intérêt pour PergoLife.',
  newsletterErrorMessage: 'Une erreur est survenue lors de l\'inscription à la newsletter. Veuillez réessayer.'
};

/**
 * Envoie un email de confirmation au client après soumission d'un formulaire de contact
 * @param formData Les données du formulaire de contact
 * @returns Promise avec le résultat de l'envoi
 */
export const sendContactConfirmation = async (formData: {
  name: string;
  email: string;
  subject: string;
}) => {
  try {
    // Création d'un message de confirmation personnalisé
    const confirmationMessage = `
Bonjour ${formData.name},

Nous avons bien reçu votre demande concernant "${formData.subject}".

Notre équipe va l'étudier dans les plus brefs délais et reviendra vers vous rapidement.

Cordialement,
L'équipe PergoLife
contact@pergo-life.fr
Tél: 06 09 53 89 79
`;
    
    // Envoi via Formspree
    const response = await fetch(FORMSPREE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        // Ces champs seront visibles dans le tableau de bord Formspree
        _subject: `Confirmation de votre demande : ${formData.subject}`,
        email: formData.email,
        name: formData.name,
        message: confirmationMessage,
        
        // Ces champs sont spécifiques à Formspree
        _replyto: 'contact@pergo-life.fr',
        _cc: '', // Laissez vide ou ajoutez des emails en copie si nécessaire
      })
    });

    if (!response.ok) {
      console.warn('Erreur lors de l\'envoi de la confirmation au client, mais le formulaire a bien été envoyé');
      return { success: false };
    }

    return { success: true };
  } catch (error) {
    console.warn('Erreur lors de l\'envoi de la confirmation au client, mais le formulaire a bien été envoyé:', error);
    return { success: false };
  }
};

/**
 * Envoie un email de confirmation pour l'inscription à la newsletter
 * @param email L'email de la personne qui s'inscrit à la newsletter
 * @returns Promise avec le résultat de l'envoi
 */
export const sendNewsletterConfirmation = async (email: string) => {
  try {
    // Création d'un message de confirmation personnalisé
    const confirmationMessage = `
Bonjour,

Nous vous confirmons votre inscription à la newsletter PergoLife.

Vous recevrez désormais nos actualités et offres exclusives directement dans votre boîte mail.

Cordialement,
L'équipe PergoLife
contact@pergo-life.fr
Tél: 06 09 53 89 79
`;
    
    // Envoi via Formspree
    const response = await fetch(FORMSPREE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        // Ces champs seront visibles dans le tableau de bord Formspree
        _subject: 'Confirmation d\'inscription à la newsletter PergoLife',
        email: email,
        message: confirmationMessage,
        
        // Ces champs sont spécifiques à Formspree
        _replyto: 'contact@pergo-life.fr',
        _cc: '', // Laissez vide ou ajoutez des emails en copie si nécessaire
      })
    });

    if (!response.ok) {
      console.warn('Erreur lors de l\'envoi de la confirmation newsletter, mais l\'inscription a bien été enregistrée');
      return { success: false };
    }

    return { success: true };
  } catch (error) {
    console.warn('Erreur lors de l\'envoi de la confirmation newsletter, mais l\'inscription a bien été enregistrée:', error);
    return { success: false };
  }
};
