# Guide de vérification de l'adresse email dans EmailJS

Pour résoudre l'erreur "SMTP: Can't send mail - all recipients were rejected: not owned by user contact@pergo-life.fr", suivez ces étapes :

## 1. Vérifier votre adresse email dans EmailJS

1. Connectez-vous à votre compte EmailJS : https://dashboard.emailjs.com/admin
2. Allez dans "Email Services" et sélectionnez votre service SMTP (`service_r8tb6kq`)
3. Dans les paramètres du service, vous devriez voir une section pour gérer les adresses email
4. Ajoutez l'adresse `contact@pergo-life.fr` comme adresse d'expéditeur autorisée
5. Suivez les instructions pour vérifier la propriété de cette adresse (généralement via un email de confirmation)

## 2. Alternative : Utiliser un service qui ne nécessite pas de vérification

Si vous ne pouvez pas vérifier l'adresse, vous pouvez :

1. Créer un nouveau service dans EmailJS qui utilise Gmail ou un autre fournisseur qui ne nécessite pas de vérification d'adresse
2. Mettre à jour l'ID de service dans votre configuration (`emailjs.config.ts`)

## 3. Vérifier les paramètres de votre template

Assurez-vous que dans vos templates EmailJS :
- Le champ "From Email" est configuré correctement (soit avec une variable dynamique, soit avec une adresse vérifiée)
- Les paramètres SMTP sont correctement configurés pour votre domaine

## 4. Test après vérification

Après avoir vérifié votre adresse email, testez à nouveau le formulaire pour confirmer que l'erreur est résolue.
