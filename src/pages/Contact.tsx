import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { MapPin, Phone, Mail, Clock, Send, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import PageSEO from "@/components/seo/PageSEO";
import { sendContactForm } from "@/services/email-service";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    
    // Réinitialiser l'erreur lorsque l'utilisateur modifie le formulaire
    if (formError) setFormError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormError("");
    
    try {
      const result = await sendContactForm(formData);
      
      if (result.success) {
        toast({
          title: "Message envoyé",
          description: "Nous vous répondrons dans les plus brefs délais.",
        });
        
        // Réinitialiser le formulaire après succès
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
      } else {
        setFormError(result.message);
        toast({
          title: "Erreur",
          description: result.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi du formulaire:", error);
      setFormError("Une erreur inattendue s'est produite. Veuillez réessayer ultérieurement.");
      toast({
        title: "Erreur",
        description: "Une erreur inattendue s'est produite. Veuillez réessayer ultérieurement.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen">
      <PageSEO 
        title="Contact | PergoLife"
        description="Contactez PergoLife, votre spécialiste en pergolas bioclimatiques, abris, portails et menuiseries à Bénesse-Maremne. Demandez un devis gratuit au 06 09 53 89 79."
        keywords="contact PergoLife, devis pergola, contact menuiserie, Bénesse-Maremne, Landes, Pays Basque"
        canonicalPath="/contact"
      />
      <Navbar />
      <main className="pt-32 pb-12">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl font-bold mb-8 text-pergo-dark">Contactez-nous</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {/* Formulaire de contact */}
            <div>
              <div className="bg-white rounded-lg shadow-md p-8">
                <h2 className="text-2xl font-bold mb-6 text-pergo-dark">Envoyez-nous un message</h2>
                
                {formError && (
                  <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 flex items-start">
                    <AlertCircle size={20} className="mr-2 shrink-0 mt-0.5" />
                    <p>{formError}</p>
                  </div>
                )}
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-pergo-dark/80 mb-1">Nom complet *</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pergo-blue"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-pergo-dark/80 mb-1">Email *</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pergo-blue"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-pergo-dark/80 mb-1">Téléphone</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pergo-blue"
                      />
                    </div>
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-pergo-dark/80 mb-1">Sujet *</label>
                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pergo-blue"
                        required
                      >
                        <option value="">Sélectionnez un sujet</option>
                        <option value="devis">Demande de devis</option>
                        <option value="information">Demande d'information</option>
                        <option value="rdv">Prise de rendez-vous</option>
                        <option value="sav">Service après-vente</option>
                        <option value="autre">Autre</option>
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-pergo-dark/80 mb-1">Message *</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={6}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pergo-blue"
                      required
                    ></textarea>
                  </div>
                  
                  <div>
                    <button
                      type="submit"
                      className="inline-flex items-center justify-center bg-pergo-secondary hover:bg-pergo-green text-white px-6 py-3 rounded-lg font-medium transition-colors shadow-sm w-full md:w-auto"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <span className="animate-spin mr-2">⟳</span>
                          Envoi en cours...
                        </>
                      ) : (
                        <>
                          <Send size={18} className="mr-2" />
                          Envoyer le message
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
            
            {/* Infos de contact */}
            <div>
              <div className="bg-pergo-green/10 text-pergo-dark rounded-lg shadow-md p-8 mb-8">
                <h2 className="text-2xl font-bold mb-6">Nos coordonnées</h2>
                <div className="space-y-5">
                  <div className="flex items-start">
                    <MapPin size={20} className="text-pergo-green mr-3 mt-1 shrink-0" />
                    <div>
                      <p className="font-medium mb-1">Adresse</p>
                      <p className="text-pergo-dark/80">830 Route de Bayonne, 40 230 Bénesse-Maremne</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Phone size={20} className="text-pergo-green mr-3 mt-1 shrink-0" />
                    <div>
                      <p className="font-medium mb-1">Téléphone</p>
                      <p className="text-pergo-dark/80">
                        <a href="tel:0609538979" className="hover:text-pergo-green transition-colors">06 09 53 89 79</a>
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Mail size={20} className="text-pergo-green mr-3 mt-1 shrink-0" />
                    <div>
                      <p className="font-medium mb-1">Email</p>
                      <p className="text-pergo-dark/80">
                        <a href="mailto:contact@pergolife.fr" className="hover:text-pergo-green transition-colors">contact@pergolife.fr</a>
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Clock size={20} className="text-pergo-green mr-3 mt-1 shrink-0" />
                    <div>
                      <p className="font-medium mb-1">Horaires d'ouverture</p>
                      <p className="text-pergo-dark/80">Lundi - Samedi: 9h00 - 18h00</p>
                      <p className="text-pergo-dark/80">Dimanche: Fermé</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Carte Google Maps */}
              <div className="bg-gray-200 rounded-lg overflow-hidden h-80 relative">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2889.5793570090723!2d-1.3978029230068138!3d43.61215845555977!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd5177e0d7a7a2d9%3A0x6eb5daa5b8a71f9f!2s830%20Rte%20de%20Bayonne%2C%2040230%20B%C3%A9nesse-Maremne!5e0!3m2!1sfr!2sfr!4v1711154651701!5m2!1sfr!2sfr" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen={false} 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Localisation PergoLife"
                  className="absolute inset-0"
                ></iframe>
              </div>
            </div>
          </div>
          
          {/* FAQ */}
          <div className="bg-pergo-green/5 rounded-lg p-8 mb-16">
            <h2 className="text-2xl font-bold mb-8 text-pergo-dark text-center">Questions fréquentes</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  question: "Comment demander un devis ?",
                  answer: "Vous pouvez demander un devis en remplissant notre formulaire de contact, en nous appelant au 06 09 53 89 79 ou en nous envoyant un email à contact@pergolife.fr. Nous vous répondrons dans les 24-48 heures ouvrées."
                },
                {
                  question: "Quels sont les délais de livraison et d'installation ?",
                  answer: "Les délais varient en fonction du produit et de la période de l'année. En général, comptez 3 à 6 semaines entre la commande et l'installation. Nous vous communiquerons un calendrier précis lors de la confirmation de commande."
                },
                {
                  question: "Quelle zone géographique couvrez-vous ?",
                  answer: "Nous intervenons principalement dans les Landes (40) et le Pays Basque, mais nous pouvons également nous déplacer dans les départements limitrophes. Contactez-nous pour vérifier si votre localité est couverte."
                },
                {
                  question: "Quelle est la garantie sur vos produits ?",
                  answer: "Tous nos produits bénéficient d'une garantie de 2 à 10 ans selon les fabricants. Les pergolas bioclimatiques sont généralement garanties 10 ans sur la structure et 5 ans sur la motorisation. Les conditions détaillées sont précisées dans votre contrat."
                }
              ].map((item, index) => (
                <div key={index} className="bg-white p-5 rounded-lg shadow-sm">
                  <h3 className="text-lg font-bold mb-2 text-pergo-dark">{item.question}</h3>
                  <p className="text-pergo-dark/70">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
