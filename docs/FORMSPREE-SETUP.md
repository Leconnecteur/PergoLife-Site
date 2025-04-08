# Configuration de Formspree pour les formulaires de contact

Puisque nous rencontrons des difficultés avec EmailJS et la vérification SMTP, voici une alternative simple et efficace utilisant Formspree.

## Pourquoi Formspree ?

- **Simple à configurer** : Pas besoin de vérifier des adresses email
- **Plan gratuit** : 50 soumissions par mois gratuitement
- **Personnalisable** : Possibilité d'ajouter des redirections et des messages personnalisés
- **Sécurisé** : Protection anti-spam intégrée

## Comment configurer Formspree

1. **Créez un compte** sur [Formspree](https://formspree.io/)
2. **Créez un nouveau formulaire** dans votre tableau de bord
3. **Obtenez l'URL de votre formulaire** (ressemble à `https://formspree.io/f/xrgwpvnk`)
4. **Intégrez l'URL** dans votre configuration

## Intégration dans le code

1. Créez un fichier de configuration pour Formspree
2. Utilisez l'URL de votre formulaire dans ce fichier
3. Modifiez le service d'email pour utiliser Formspree au lieu d'EmailJS

## Avantages par rapport à EmailJS

- Pas de problème de vérification d'adresse email
- Configuration plus simple
- Fonctionne immédiatement sans configuration SMTP complexe

## Conservation du design

Tous les boutons du site conserveront leur effet de lueur (glow) avec dégradé de couleurs animé au survol, conformément à vos préférences.
