import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const Privacy = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-32 pb-12">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl font-bold mb-8 text-pergo-dark">Politique de Confidentialité</h1>
          
          <div className="prose max-w-none">
            <p className="text-xl text-pergo-dark/80 mb-8">
              Chez PergoLife, nous accordons une grande importance à la protection de vos données personnelles. Cette politique de confidentialité vous explique comment nous collectons, utilisons et protégeons vos informations lorsque vous utilisez notre site web ou nos services.
            </p>
            
            <h2 className="text-2xl font-bold mt-10 mb-4 text-pergo-dark">1. Collecte des informations</h2>
            <p className="mb-4">
              Nous collectons différents types d'informations lorsque vous utilisez notre site web ou nos services :
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>Informations que vous nous fournissez volontairement (nom, adresse e-mail, numéro de téléphone, adresse postale) lorsque vous remplissez un formulaire, nous contactez ou demandez un devis.</li>
              <li>Informations de navigation collectées automatiquement (adresse IP, type de navigateur, pages visitées, temps passé sur le site) via les cookies et technologies similaires.</li>
              <li>Informations relatives à votre projet et à vos préférences pour personnaliser notre offre.</li>
            </ul>
            
            <h2 className="text-2xl font-bold mt-10 mb-4 text-pergo-dark">2. Utilisation des informations</h2>
            <p className="mb-4">
              Nous utilisons vos informations personnelles aux fins suivantes :
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>Vous fournir les services que vous avez demandés (devis, informations commerciales, suivi de projet).</li>
              <li>Personnaliser votre expérience et répondre à vos besoins individuels.</li>
              <li>Améliorer notre site web et nos services.</li>
              <li>Vous contacter par email, téléphone ou courrier postal pour des raisons commerciales ou de service client.</li>
              <li>Respecter nos obligations légales et réglementaires.</li>
            </ul>
            
            <h2 className="text-2xl font-bold mt-10 mb-4 text-pergo-dark">3. Protection des informations</h2>
            <p className="mb-6">
              Nous mettons en œuvre diverses mesures de sécurité pour préserver la sécurité de vos informations personnelles. Nous utilisons un cryptage avancé pour protéger les informations sensibles transmises en ligne. Nous protégeons également vos informations hors ligne. Seuls les employés qui ont besoin d'effectuer un travail spécifique ont accès aux informations personnelles identifiables.
            </p>
            
            <h2 className="text-2xl font-bold mt-10 mb-4 text-pergo-dark">4. Cookies</h2>
            <p className="mb-6">
              Notre site web utilise des cookies pour améliorer votre expérience. Un cookie est un petit fichier qui demande la permission d'être placé sur le disque dur de votre ordinateur. Les cookies nous aident à analyser le trafic web ou nous permettent de savoir quand vous visitez un site particulier. Vous pouvez choisir de refuser les cookies, mais cela pourrait empêcher certaines fonctionnalités de notre site de fonctionner correctement.
            </p>
            
            <h2 className="text-2xl font-bold mt-10 mb-4 text-pergo-dark">5. Partage avec des tiers</h2>
            <p className="mb-6">
              Nous ne vendons, n'échangeons ni ne transférons vos informations personnelles identifiables à des tiers sans votre consentement, sauf lorsque cela est nécessaire pour fournir un service ou lorsque la loi nous y oblige. Cela peut inclure nos partenaires de confiance qui nous aident à exploiter notre site web, à conduire nos activités ou à vous servir, à condition que ces parties acceptent de garder ces informations confidentielles.
            </p>
            
            <h2 className="text-2xl font-bold mt-10 mb-4 text-pergo-dark">6. Vos droits</h2>
            <p className="mb-4">
              Conformément à la réglementation applicable, vous disposez des droits suivants concernant vos données personnelles :
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>Droit d'accès : vous pouvez demander à accéder à vos données personnelles.</li>
              <li>Droit de rectification : vous pouvez demander la correction des données inexactes vous concernant.</li>
              <li>Droit à l'effacement : vous pouvez demander la suppression de vos données dans certaines circonstances.</li>
              <li>Droit à la limitation du traitement : vous pouvez demander la limitation du traitement de vos données.</li>
              <li>Droit à la portabilité : vous pouvez demander à recevoir vos données dans un format structuré.</li>
              <li>Droit d'opposition : vous pouvez vous opposer au traitement de vos données pour des motifs légitimes.</li>
            </ul>
            <p className="mb-6">
              Pour exercer ces droits, veuillez nous contacter par email à <a href="mailto:contact@pergolife.fr" className="text-pergo-secondary hover:text-pergo-dark">contact@pergolife.fr</a> ou par courrier à l'adresse indiquée à la fin de cette politique.
            </p>
            
            <h2 className="text-2xl font-bold mt-10 mb-4 text-pergo-dark">7. Conservation des données</h2>
            <p className="mb-6">
              Nous conservons vos données personnelles aussi longtemps que nécessaire pour atteindre les finalités pour lesquelles elles ont été collectées, sauf si la loi exige une période de conservation plus longue.
            </p>
            
            <h2 className="text-2xl font-bold mt-10 mb-4 text-pergo-dark">8. Modifications de notre politique de confidentialité</h2>
            <p className="mb-6">
              Nous nous réservons le droit de modifier cette politique de confidentialité à tout moment. Toute modification sera publiée sur cette page avec une date de mise à jour. Nous vous encourageons à consulter régulièrement cette page pour rester informé des changements.
            </p>
            
            <h2 className="text-2xl font-bold mt-10 mb-4 text-pergo-dark">9. Nous contacter</h2>
            <p className="mb-6">
              Si vous avez des questions concernant cette politique de confidentialité, vous pouvez nous contacter :
            </p>
            <ul className="list-none mb-6 space-y-2">
              <li>Par email : <a href="mailto:contact@pergolife.fr" className="text-pergo-secondary hover:text-pergo-dark">contact@pergolife.fr</a></li>
              <li>Par téléphone : <a href="tel:0609538979" className="text-pergo-secondary hover:text-pergo-dark">06 09 53 89 79</a></li>
              <li>Par courrier : PergoLife, 830 Route de Bayonne - 40 230 Bénesse-Maremne</li>
            </ul>
            
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

export default Privacy;
