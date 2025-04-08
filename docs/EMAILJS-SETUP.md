# Configuration d'EmailJS pour PergoLife

Ce document explique comment configurer EmailJS pour les formulaires de contact et la newsletter du site PergoLife.

## Étape 1 : Créer un compte EmailJS

1. Rendez-vous sur [EmailJS](https://www.emailjs.com/) et créez un compte gratuit
2. Le plan gratuit permet d'envoyer 200 emails par mois, ce qui est généralement suffisant pour un site vitrine

## Étape 2 : Créer un service d'email

1. Dans le tableau de bord EmailJS, cliquez sur "Email Services" puis "Add New Service"
2. Choisissez votre fournisseur d'email (Gmail, Outlook, etc.)
3. Suivez les instructions pour connecter votre compte email
4. Nommez votre service "service_pergolife" (ou notez l'ID généré pour le mettre à jour dans la configuration)

## Étape 3 : Créer les templates d'email

Vous devez créer 3 templates d'email :

### Template de contact (pour recevoir les demandes des clients)

1. Dans le tableau de bord EmailJS, cliquez sur "Email Templates" puis "Create New Template"
2. Nommez-le "template_contact_pergolife"
3. Configurez le template avec les paramètres suivants :
   - **To Email**: Votre email (ex: contact@pergo-life.fr)
   - **From Name**: {{from_name}}
   - **From Email**: {{from_email}}
   - **Subject**: Nouvelle demande de contact: {{subject}}
   - **Content**: Créez un contenu HTML qui affiche les informations du formulaire (nom, email, téléphone, sujet, message)

### Template de newsletter (pour être notifié des inscriptions)

1. Créez un nouveau template nommé "template_newsletter_pergolife"
2. Configurez-le avec les paramètres suivants :
   - **To Email**: Votre email (ex: contact@pergo-life.fr)
   - **Subject**: Nouvelle inscription à la newsletter
   - **Content**: Un simple message indiquant qu'une nouvelle personne s'est inscrite à la newsletter, avec son email ({{subscriber_email}})

### Template de confirmation (pour envoyer des confirmations aux clients)

1. Créez un nouveau template nommé "template_confirmation_pergolife"
2. Utilisez le modèle HTML fourni dans `/docs/email-templates/confirmation-template.html`
3. Configurez-le avec les paramètres suivants :
   - **To Email**: {{to_email}}
   - **Subject**: {{subject}}
   - **Content**: Copiez le contenu du fichier HTML

## Étape 4 : Mettre à jour la configuration

1. Ouvrez le fichier `/src/config/emailjs.config.ts`
2. Remplacez les valeurs par vos propres identifiants :
   - **serviceId**: L'ID de votre service EmailJS
   - **publicKey**: Votre clé publique EmailJS (disponible dans les paramètres de votre compte)
   - Les autres valeurs peuvent rester inchangées si vous avez utilisé les noms suggérés

## Étape 5 : Tester les formulaires

1. Lancez l'application en mode développement
2. Testez le formulaire de contact et l'inscription à la newsletter
3. Vérifiez que vous recevez bien les emails et que les clients reçoivent les confirmations

## Remarques importantes

- Les templates EmailJS peuvent être personnalisés avec votre propre design
- Assurez-vous que les variables utilisées dans les templates correspondent à celles envoyées par le code
- Le plan gratuit d'EmailJS est limité à 200 emails par mois, au-delà il faudra passer à un plan payant
