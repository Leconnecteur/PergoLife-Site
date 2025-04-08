/**
 * Service pour gérer les envois de formulaires via Formspree
 * Une alternative simple à EmailJS qui ne nécessite pas de configuration SMTP complexe
 */

// Remplacez ces valeurs par vos propres identifiants Formspree
const FORMSPREE_CONTACT_URL = 'https://formspree.io/f/VOTRE_ID_FORMSPREE_CONTACT';
const FORMSPREE_NEWSLETTER_URL = 'https://formspree.io/f/VOTRE_ID_FORMSPREE_NEWSLETTER';

// Messages de succès et d'erreur
const MESSAGES = {
  contactSuccessMessage: 'Votre message a été envoyé avec succès ! Nous vous répondrons dans les plus brefs délais.',
  contactErrorMessage: 'Une erreur est survenue lors de l\'envoi du message. Veuillez réessayer.',
  newsletterSuccessMessage: 'Inscription à la newsletter réussie ! Merci de votre intérêt pour PergoLife.',
  newsletterErrorMessage: 'Une erreur est survenue lors de l\'inscription à la newsletter. Veuillez réessayer.'
};

/**
 * Envoie un formulaire de contact via Formspree
 * @param formData Les données du formulaire de contact
 * @returns Promise avec le résultat de l'envoi
 */
export const sendContactForm = async (formData: {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}) => {
  try {
    const response = await fetch(FORMSPREE_CONTACT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        phone: formData.phone || 'Non renseigné',
        subject: formData.subject,
        message: formData.message,
        date: new Date().toLocaleString('fr-FR')
      })
    });

    if (!response.ok) {
      throw new Error('Erreur lors de l\'envoi du formulaire');
    }

    return {
      success: true,
      message: MESSAGES.contactSuccessMessage
    };
  } catch (error) {
    console.error('Erreur lors de l\'envoi du formulaire de contact:', error);
    return {
      success: false,
      message: MESSAGES.contactErrorMessage,
      error
    };
  }
};

/**
 * Envoie une inscription à la newsletter via Formspree
 * @param email L'email de la personne qui s'inscrit à la newsletter
 * @returns Promise avec le résultat de l'envoi
 */
export const subscribeToNewsletter = async (email: string) => {
  try {
    const response = await fetch(FORMSPREE_NEWSLETTER_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        date: new Date().toLocaleString('fr-FR')
      })
    });

    if (!response.ok) {
      throw new Error('Erreur lors de l\'inscription à la newsletter');
    }

    return {
      success: true,
      message: MESSAGES.newsletterSuccessMessage
    };
  } catch (error) {
    console.error('Erreur lors de l\'inscription à la newsletter:', error);
    return {
      success: false,
      message: MESSAGES.newsletterErrorMessage,
      error
    };
  }
};
