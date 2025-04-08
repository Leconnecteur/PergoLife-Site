/**
 * Configuration pour EmailJS
 * 
 * Instructions:
 * 1. Créez un compte sur https://www.emailjs.com/
 * 2. Créez un service (généralement SMTP pour votre email professionnel)
 * 3. Créez les templates suivants:
 *    - Template de contact (pour recevoir les demandes des clients)
 *    - Template de confirmation (pour toutes les confirmations et notifications)
 * 4. Remplacez les valeurs ci-dessous par vos propres identifiants
 */

export const emailJSConfig = {
  // Identifiants EmailJS
  // Utilisation du service SMTP existant
  serviceId: 'service_r8tb6kq', // ID du service SMTP
  contactTemplateId: 'template_xs0h73g', // ID du template de contact
  confirmationTemplateId: 'template_zjbesc6', // ID du template de confirmation (Auto-Reply)
  publicKey: '_dRSb5UY0lDrrKNrW', // Clé publique EmailJS
  
  // Paramètres des emails
  siteOwnerEmail: 'contact@pergo-life.fr', // Adresse email du destinataire (propriétaire du site)
  siteName: 'PergoLife',
  siteUrl: 'https://pergo-life.fr',
  
  // Messages
  contactSuccessMessage: 'Votre message a été envoyé avec succès ! Vous allez recevoir un email de confirmation.',
  contactErrorMessage: 'Une erreur est survenue lors de l\'envoi du message. Veuillez réessayer.',
  newsletterSuccessMessage: 'Inscription à la newsletter réussie ! Un email de confirmation vous a été envoyé.',
  newsletterErrorMessage: 'Une erreur est survenue lors de l\'inscription à la newsletter. Veuillez réessayer.'
};
