import emailjs from '@emailjs/browser';
import { emailJSConfig } from '@/config/emailjs.config';
import { sendContactConfirmation, sendNewsletterConfirmation } from './formspree-service';

// Constantes pour EmailJS depuis la configuration
const SERVICE_ID = emailJSConfig.serviceId;
const CONTACT_TEMPLATE_ID = emailJSConfig.contactTemplateId;
const CONFIRMATION_TEMPLATE_ID = emailJSConfig.confirmationTemplateId;
const PUBLIC_KEY = emailJSConfig.publicKey;

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
    // 1. Envoi de l'email au propriétaire du site
    // Utilisation du template avec l'adresse email par défaut du compte EmailJS
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
        to_email: emailJSConfig.siteOwnerEmail, // Ajout de l'adresse du destinataire
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
    
    // 2. Envoi d'un email de confirmation au client via Formspree
    // Cette méthode est plus fiable pour les emails de confirmation aux clients
    try {
      // Utilisation de Formspree pour envoyer la confirmation au client
      await sendContactConfirmation({
        name: formData.name,
        email: formData.email,
        subject: formData.subject
      });
      console.log('Email de confirmation envoyé avec succès via Formspree');
    } catch (confirmationError) {
      // Nous ignorons cette erreur car l'email principal a été envoyé avec succès
      console.log('Erreur lors de l\'envoi de l\'email de confirmation, mais l\'email principal a été envoyé');
    }
    
    return {
      success: true,
      message: emailJSConfig.contactSuccessMessage,
      response
    };
  } catch (error) {
    console.error('Erreur lors de l\'envoi du formulaire de contact:', error);
    return {
      success: false,
      message: emailJSConfig.contactErrorMessage,
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
    // 1. Notification au propriétaire du site d'une nouvelle inscription via le template de confirmation
    // Utilisation du template avec l'adresse email par défaut du compte EmailJS
    const response = await emailjs.send(
      SERVICE_ID,
      CONTACT_TEMPLATE_ID,
      {
        from_name: 'Inscription Newsletter',
        from_email: email,
        from_phone: 'Non renseigné',
        subject: 'Nouvelle inscription à la newsletter',
        message: `Nouvelle inscription à la newsletter: ${email}`,
        reply_to: email,
        to_email: emailJSConfig.siteOwnerEmail, // Ajout de l'adresse du destinataire
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
    
    // 2. Email de confirmation à l'abonné via Formspree
    // Cette méthode est plus fiable pour les emails de confirmation aux clients
    try {
      // Utilisation de Formspree pour envoyer la confirmation au client
      await sendNewsletterConfirmation(email);
      console.log('Email de confirmation newsletter envoyé avec succès via Formspree');
    } catch (confirmationError) {
      // Nous ignorons cette erreur car l'email principal a été envoyé avec succès
      console.log('Erreur lors de l\'envoi de l\'email de confirmation newsletter, mais la notification a été envoyée');
    }
    
    return {
      success: true,
      message: emailJSConfig.newsletterSuccessMessage,
      response
    };
  } catch (error) {
    console.error('Erreur lors de l\'inscription à la newsletter:', error);
    return {
      success: false,
      message: emailJSConfig.newsletterErrorMessage,
      error
    };
  }
};

/**
 * Initialise EmailJS
 * Cette fonction doit être appelée au démarrage de l'application
 */
export const initEmailJS = () => {
  emailjs.init(PUBLIC_KEY);
  console.log('EmailJS initialisé avec succès');
};
