# Guide de configuration EmailJS pour PergoLife

Ce guide explique comment configurer EmailJS pour que les formulaires de contact et d'inscription à la newsletter fonctionnent correctement sur le site PergoLife.

## Étape 1 : Créer un compte EmailJS

1. Rendez-vous sur [EmailJS](https://www.emailjs.com/) et créez un compte gratuit.
2. Le plan gratuit permet d'envoyer jusqu'à 200 emails par mois, ce qui devrait être suffisant pour commencer. Vous pourrez passer à un plan payant si nécessaire.

## Étape 2 : Configurer un service d'email

1. Dans votre tableau de bord EmailJS, cliquez sur "Email Services" puis sur "Add New Service".
2. Choisissez votre fournisseur d'email (Gmail, Outlook, etc.) et suivez les instructions pour connecter votre compte.
3. Nommez votre service `service_pergolife` (ou notez l'ID généré pour le mettre à jour dans le code).

## Étape 3 : Créer des templates d'email

### Template pour le formulaire de contact

1. Dans votre tableau de bord, cliquez sur "Email Templates" puis sur "Create New Template".
2. Nommez votre template `template_contact_pergolife`.
3. Configurez le sujet de l'email, par exemple : `Nouveau message de contact de {{from_name}}`.
4. Créez le contenu de l'email en utilisant les variables suivantes :
   ```
   Nom: {{from_name}}
   Email: {{from_email}}
   Téléphone: {{from_phone}}
   Sujet: {{subject}}
   
   Message:
   {{message}}
   
   Envoyé le: {{date}}
   ```
5. Enregistrez le template.

### Template pour l'inscription à la newsletter

1. Créez un nouveau template nommé `template_newsletter_pergolife`.
2. Configurez le sujet de l'email, par exemple : `Nouvelle inscription à la newsletter PergoLife`.
3. Créez le contenu de l'email en utilisant les variables suivantes :
   ```
   Nouvelle inscription à la newsletter
   
   Email: {{subscriber_email}}
   Date d'inscription: {{date}}
   ```
4. Enregistrez le template.

## Étape 4 : Obtenir votre clé publique

1. Dans votre tableau de bord, allez dans "Account" > "API Keys".
2. Copiez votre "Public Key".

## Étape 5 : Mettre à jour le code

1. Ouvrez le fichier `/src/services/email-service.ts`.
2. Remplacez les valeurs suivantes par celles que vous avez obtenues :
   ```typescript
   const SERVICE_ID = 'service_pergolife'; // Remplacez par votre ID de service
   const CONTACT_TEMPLATE_ID = 'template_contact_pergolife'; // Remplacez par votre ID de template de contact
   const NEWSLETTER_TEMPLATE_ID = 'template_newsletter_pergolife'; // Remplacez par votre ID de template de newsletter
   const PUBLIC_KEY = 'YOUR_PUBLIC_KEY'; // Remplacez par votre clé publique
   ```

## Étape 6 : Tester les formulaires

1. Lancez votre site web.
2. Testez le formulaire de contact en envoyant un message.
3. Testez l'inscription à la newsletter.
4. Vérifiez que vous recevez bien les emails correspondants.

## Remarques importantes

- Les emails seront envoyés à l'adresse configurée dans votre service EmailJS.
- Vous pouvez personnaliser davantage les templates d'email selon vos besoins.
- Si vous souhaitez recevoir les emails à plusieurs adresses, vous pouvez configurer cela dans les templates EmailJS.
- Pour des raisons de sécurité, ne partagez jamais votre clé publique en dehors du code de l'application.

## Support

Si vous rencontrez des problèmes avec la configuration d'EmailJS, vous pouvez consulter la [documentation officielle](https://www.emailjs.com/docs/) ou contacter le support d'EmailJS.
