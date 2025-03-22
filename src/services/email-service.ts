import emailjs from '@emailjs/browser';

// Constantes pour EmailJS
const SERVICE_ID = 'service_pergolife'; // À remplacer par votre ID de service EmailJS
const CONTACT_TEMPLATE_ID = 'template_contact_pergolife'; // À remplacer par votre ID de template pour le formulaire de contact
const NEWSLETTER_TEMPLATE_ID = 'template_newsletter_pergolife'; // À remplacer par votre ID de template pour la newsletter
const PUBLIC_KEY = 'YOUR_PUBLIC_KEY'; // À remplacer par votre clé publique EmailJS

/**
 * Envoie un email avec les informations du formulaire de contact
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
    const response = await emailjs.send(
      SERVICE_ID,
      CONTACT_TEMPLATE_ID,
      {
        from_name: formData.name,
        from_email: formData.email,
        from_phone: formData.phone || 'Non renseigné',
        subject: formData.subject,
        message: formData.message,
        reply_to: formData.email,
        date: new Date().toLocaleString('fr-FR', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })
      },
      PUBLIC_KEY
    );
    
    return {
      success: true,
      message: 'Votre message a été envoyé avec succès !',
      response
    };
  } catch (error) {
    console.error('Erreur lors de l\'envoi du formulaire de contact:', error);
    return {
      success: false,
      message: 'Une erreur est survenue lors de l\'envoi du message. Veuillez réessayer.',
      error
    };
  }
};

/**
 * Envoie un email avec les informations d'inscription à la newsletter
 * @param email L'email de la personne qui s'inscrit à la newsletter
 * @returns Promise avec le résultat de l'envoi
 */
export const subscribeToNewsletter = async (email: string) => {
  try {
    const response = await emailjs.send(
      SERVICE_ID,
      NEWSLETTER_TEMPLATE_ID,
      {
        subscriber_email: email,
        date: new Date().toLocaleString('fr-FR', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })
      },
      PUBLIC_KEY
    );
    
    return {
      success: true,
      message: 'Inscription à la newsletter réussie !',
      response
    };
  } catch (error) {
    console.error('Erreur lors de l\'inscription à la newsletter:', error);
    return {
      success: false,
      message: 'Une erreur est survenue lors de l\'inscription à la newsletter. Veuillez réessayer.',
      error
    };
  }
};

/**
 * Initialise EmailJS
 */
export const initEmailJS = () => {
  emailjs.init(PUBLIC_KEY);
};
