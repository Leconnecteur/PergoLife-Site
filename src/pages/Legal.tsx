import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const Legal = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-32 pb-12">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl font-bold mb-8 text-pergo-dark">Mentions Légales</h1>
          
          <div className="prose max-w-none">
            <p className="text-xl text-pergo-dark/80 mb-8">
              Conformément aux dispositions de la loi n° 2004-575 du 21 juin 2004 pour la confiance en l'économie numérique, nous vous informons des mentions légales suivantes concernant le site PergoLife.
            </p>
            
            <h2 className="text-2xl font-bold mt-10 mb-4 text-pergo-dark">1. Éditeur du site</h2>
            <p className="mb-4">
              Le site PergoLife est édité par :
            </p>
            <ul className="list-none mb-6 space-y-2">
              <li><strong>Raison sociale :</strong> CKS rénovation</li>
              <li><strong>Nom commercial :</strong> PergoLife</li>
              <li><strong>Forme juridique :</strong> SARL</li>
              <li><strong>Capital social :</strong> 1000 €</li>
              <li><strong>SIRET :</strong> 84217008600024</li>
              <li><strong>Numéro de TVA intracommunautaire :</strong> FR61842170086</li>
              <li><strong>Siège social :</strong> 830 Route de Bayonne - 40 230 Bénesse-Maremne</li>
              <li><strong>Téléphone :</strong> 06 09 53 89 79</li>
              <li><strong>Email :</strong> contact@pergo-life.fr</li>
            </ul>
            
            <h2 className="text-2xl font-bold mt-10 mb-4 text-pergo-dark">2. Directeur de la publication</h2>
            <p className="mb-6">
              Le directeur de la publication du site est Christopher GOSSE en qualité de Gérant de la SARL CKS rénovation.
            </p>
            
            <h2 className="text-2xl font-bold mt-10 mb-4 text-pergo-dark">3. Hébergeur du site</h2>
            <p className="mb-6">
              Le site PergoLife est hébergé par :
            </p>
            <ul className="list-none mb-6 space-y-2">
              <li><strong>Société :</strong> Le Connecteur Digital</li>
              <li><strong>Adresse :</strong> 22 Impasse des Aubépines - 64 210 Bidart</li>
              <li><strong>Téléphone :</strong> 06 13 63 09 84</li>
              <li><strong>Site web :</strong> <a href="https://leconnecteurdigital.fr/" target="_blank" rel="noopener noreferrer" className="text-pergo-secondary hover:text-pergo-dark">leconnecteurdigital.fr</a></li>
            </ul>
            
            <h2 className="text-2xl font-bold mt-10 mb-4 text-pergo-dark">4. Propriété intellectuelle</h2>
            <p className="mb-6">
              L'ensemble du contenu du site PergoLife (structure, textes, logos, images, photographies, vidéos, sons, etc.) est la propriété exclusive de CKS rénovation ou de ses partenaires. Toute reproduction, représentation, modification, publication, adaptation ou exploitation de tout ou partie des éléments du site, quel que soit le moyen ou le procédé utilisé, est interdite sans autorisation préalable écrite de CKS rénovation.
            </p>
            <p className="mb-6">
              Toute exploitation non autorisée du site ou de son contenu sera considérée comme constitutive d'une contrefaçon et poursuivie conformément aux dispositions des articles L.335-2 et suivants du Code de la Propriété Intellectuelle.
            </p>
            
            <h2 className="text-2xl font-bold mt-10 mb-4 text-pergo-dark">5. Liens hypertextes</h2>
            <p className="mb-6">
              Le site PergoLife peut contenir des liens hypertextes vers d'autres sites internet. CKS rénovation n'exerce aucun contrôle sur ces sites et ne saurait être tenu responsable de leur contenu ou des pratiques de leurs éditeurs.
            </p>
            <p className="mb-6">
              La création de liens hypertextes vers le site PergoLife est soumise à l'accord préalable de CKS rénovation. Pour toute demande, veuillez nous contacter à l'adresse : contact@pergo-life.fr.
            </p>
            
            <h2 className="text-2xl font-bold mt-10 mb-4 text-pergo-dark">6. Données personnelles</h2>
            <p className="mb-6">
              Les informations concernant la collecte et le traitement des données personnelles sont détaillées dans notre <a href="/privacy" className="text-pergo-secondary hover:text-pergo-dark">Politique de Confidentialité</a>.
            </p>
            
            <h2 className="text-2xl font-bold mt-10 mb-4 text-pergo-dark">7. Droit applicable et juridiction compétente</h2>
            <p className="mb-6">
              Les présentes mentions légales sont régies par le droit français. En cas de litige, les tribunaux français seront seuls compétents.
            </p>
            
            <h2 className="text-2xl font-bold mt-10 mb-4 text-pergo-dark">8. Crédits</h2>
            <p className="mb-6">
              Conception et développement du site : <a href="https://leconnecteurdigital.fr/" target="_blank" rel="noopener noreferrer" className="text-pergo-secondary hover:text-pergo-dark">Le Connecteur Digital</a>
            </p>
            
            <p className="text-sm text-pergo-dark/60 mt-10">
              Dernière mise à jour : {new Date().toLocaleDateString('fr-FR', {day: 'numeric', month: 'long', year: 'numeric'})}
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Legal;
