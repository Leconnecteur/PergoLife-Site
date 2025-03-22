import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ArrowLeft, MapPin, Calendar, Tag, Grid3X3 } from "lucide-react";

// Définition du type pour les projets
type Project = {
  id: number;
  title: string;
  category: string;
  location: string;
  date?: string;
  imageUrl: string;
  description: string;
  challenge?: string;
  solution?: string;
  result?: string;
  gallery?: string[];
  features?: string[];
};

// Données fictives pour les projets (version étendue pour les détails)
const projectsData: Project[] = [
  {
    id: 1,
    title: "Pergola bioclimatique moderne",
    category: "Pergolas",
    location: "Paris",
    date: "Juin 2023",
    imageUrl: "https://images.unsplash.com/photo-1621873495734-5018c6e78b4d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1335&q=80",
    description: "Installation d'une pergola bioclimatique avec lames orientables sur une terrasse parisienne.",
    challenge: "Le client souhaitait profiter de sa terrasse toute l'année, même par mauvais temps, tout en conservant un design épuré et moderne qui s'intègre parfaitement dans son environnement urbain.",
    solution: "Nous avons proposé une pergola bioclimatique avec lames orientables motorisées, équipée de capteurs de pluie et de vent. Des parois vitrées coulissantes ont été installées sur les côtés pour créer un espace totalement fermé par temps froid ou pluvieux.",
    result: "Un espace extérieur entièrement modulable, utilisable en toutes saisons, et parfaitement intégré à l'architecture moderne de l'immeuble. Le système domotique permet au client de contrôler tous les aspects de sa pergola depuis son smartphone.",
    gallery: [
      "https://images.unsplash.com/photo-1621873495734-5018c6e78b4d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1335&q=80",
      "https://images.unsplash.com/photo-1534119428213-bd2626145a3e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
      "https://images.unsplash.com/photo-1580229080435-1c7e2ce835af?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
    ],
    features: [
      "Lames orientables et motorisées",
      "Capteurs de pluie et de vent",
      "Parois vitrées coulissantes",
      "Éclairage LED intégré",
      "Commande par smartphone",
      "Structure en aluminium thermolaqué"
    ]
  },
  // Autres projets... mais on n'en a besoin que d'un pour l'exemple
];

const RealisationDetail = () => {
  const { id } = useParams<{ id: string }>();
  const projectId = parseInt(id || "1");
  
  const project = projectsData.find(p => p.id === projectId) || projectsData[0];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [projectId]);

  // Fonction pour simuler des projets similaires
  const getSimilarProjects = () => {
    return projectsData
      .filter(p => p.id !== projectId && p.category === project.category)
      .slice(0, 3);
  };

  const similarProjects = getSimilarProjects();

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-32 pb-12">
        <div className="container mx-auto px-6">
          {/* Fil d'Ariane et bouton retour */}
          <div className="flex flex-wrap justify-between items-center mb-8">
            <Link to="/realisations" className="inline-flex items-center text-pergo-blue hover:underline font-medium">
              <ArrowLeft size={18} className="mr-2" />
              Retour aux réalisations
            </Link>
            <div className="text-sm text-pergo-dark/60">
              <span>Réalisations</span> &gt; <span>{project.category}</span> &gt; <span className="text-pergo-dark">{project.title}</span>
            </div>
          </div>
          
          {/* Titre et informations */}
          <div className="mb-10">
            <h1 className="text-4xl font-bold mb-4 text-pergo-dark">{project.title}</h1>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center text-pergo-dark/70">
                <MapPin size={18} className="mr-1 text-pergo-blue" />
                <span>{project.location}</span>
              </div>
              {project.date && (
                <div className="flex items-center text-pergo-dark/70">
                  <Calendar size={18} className="mr-1 text-pergo-blue" />
                  <span>{project.date}</span>
                </div>
              )}
              <div className="flex items-center text-pergo-dark/70">
                <Tag size={18} className="mr-1 text-pergo-blue" />
                <span>{project.category}</span>
              </div>
            </div>
          </div>
          
          {/* Image principale */}
          <div className="mb-10 rounded-lg overflow-hidden">
            <img 
              src={project.imageUrl} 
              alt={project.title} 
              className="w-full h-auto object-cover" 
            />
          </div>
          
          {/* Description du projet */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-12">
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold mb-5 text-pergo-dark">À propos de ce projet</h2>
              <div className="prose max-w-none mb-8">
                <p className="text-lg text-pergo-dark/80 mb-4">{project.description}</p>
                
                {project.challenge && (
                  <div className="mb-6">
                    <h3 className="text-xl font-bold mb-3 text-pergo-dark">Le défi</h3>
                    <p className="text-pergo-dark/70">{project.challenge}</p>
                  </div>
                )}
                
                {project.solution && (
                  <div className="mb-6">
                    <h3 className="text-xl font-bold mb-3 text-pergo-dark">Notre solution</h3>
                    <p className="text-pergo-dark/70">{project.solution}</p>
                  </div>
                )}
                
                {project.result && (
                  <div>
                    <h3 className="text-xl font-bold mb-3 text-pergo-dark">Le résultat</h3>
                    <p className="text-pergo-dark/70">{project.result}</p>
                  </div>
                )}
              </div>
            </div>
            
            <div>
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-4 text-pergo-dark flex items-center">
                  <Grid3X3 size={20} className="mr-2 text-pergo-blue" />
                  Caractéristiques
                </h3>
                
                {project.features && (
                  <ul className="space-y-2 mb-6">
                    {project.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-pergo-blue mr-2">✓</span>
                        <span className="text-pergo-dark/80">{feature}</span>
                      </li>
                    ))}
                  </ul>
                )}
                
                <div className="border-t border-gray-200 pt-6 mt-6">
                  <h3 className="text-lg font-bold mb-4 text-pergo-dark">Intéressé par un projet similaire ?</h3>
                  <a href="/contact" className="inline-block bg-pergo-blue text-white px-4 py-2 rounded-lg font-medium hover:bg-pergo-blue/80 transition-colors w-full text-center">
                    Demander un devis
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          {/* Galerie de photos */}
          {project.gallery && project.gallery.length > 0 && (
            <div className="mb-16">
              <h2 className="text-2xl font-bold mb-6 text-pergo-dark">Galerie photos</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {project.gallery.map((image, index) => (
                  <div key={index} className="rounded-lg overflow-hidden aspect-w-16 aspect-h-10 hover-lift">
                    <img 
                      src={image} 
                      alt={`${project.title} - photo ${index + 1}`} 
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Projets similaires */}
          {similarProjects.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold mb-6 text-pergo-dark">Projets similaires</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {similarProjects.map((project) => (
                  <Link
                    to={`/realisations/${project.id}`}
                    key={project.id}
                    className="group bg-white rounded-lg shadow-md overflow-hidden hover-lift"
                  >
                    <div className="aspect-w-16 aspect-h-10 bg-gray-200 overflow-hidden">
                      <img
                        src={project.imageUrl}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-bold mb-1 text-pergo-dark group-hover:text-pergo-blue transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-sm text-pergo-dark/70">{project.location}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default RealisationDetail;
