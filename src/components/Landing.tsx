import { useNavigate } from 'react-router-dom';
import back from '../assets/back.jpg';
import { useEffect, useState } from 'react';

const Landing = () => {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // Animation au défilement
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    
    // Animation à l'entrée
    const timer = setTimeout(() => {
      const contentContainer = document.querySelector('.content-container');
      if (contentContainer) {
        contentContainer.classList.add('show');
      }
    }, 100);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-100 relative overflow-hidden">
      {/* Header avec effet de parallaxe */}
      <div 
        className={`w-full h-64 md:h-80 bg-cover bg-center relative overflow-hidden transition-all duration-500 ${
          scrolled ? 'h-48' : ''
        }`}
        style={{ 
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url(${back})` 
        }}
      >
        <div className="absolute inset-0 bg-blue-900 opacity-40"></div>
        <div className="container mx-auto px-4 h-full flex flex-col items-center justify-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold text-white text-center mb-2 tracking-tight">
            Mairie de Mbouda
          </h1>
          <p className="text-white text-xl opacity-90 font-light max-w-2xl text-center">
            Au service des citoyens de la commune
          </p>
        </div>
      </div>

      {/* Contenu principal avec animation */}
      <div className="container mx-auto px-4 py-8 relative z-10 -mt-16">
        <div className="content-container transform translate-y-8 transition-all duration-700 ease-out">
          <div className="bg-white rounded-xl shadow-xl overflow-hidden max-w-4xl mx-auto">
            
            {/* Section d'introduction */}
            <div className="p-8 md:p-10 border-b border-gray-100">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="w-36 h-36 rounded-full overflow-hidden flex-shrink-0 border-4 border-white shadow-lg">
                  <img
                    src={back}
                    alt="Mairie de Mbouda"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h2 className="text-2xl font-semibold text-gray-800 mb-3">Bienvenue à la Mairie de Mbouda</h2>
                  <p className="text-gray-600 leading-relaxed">
                    La mairie de Mbouda est engagée à fournir des services de qualité à ses citoyens
                    et à promouvoir le développement durable de la région.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Section Informations */}
            <div className="p-8 md:p-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                
                {/* Emplacement */}
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-gray-800">
                    Localisation
                  </h3>
                  
                  <div className="grid grid-cols-1 gap-4">
                    <div className="flex items-start space-x-3 p-4 rounded-lg bg-blue-50 transition-all hover:bg-blue-100 hover:shadow-md">
                      <div className="p-2 rounded-full bg-blue-100 text-blue-600">
                        {/* Icone à remplacer */}
                      </div>
                      <div>
                        <p className="text-sm text-blue-700 font-medium">Région & Département</p>
                        <p className="text-gray-800 font-medium">Ouest - Bamboutos</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3 p-4 rounded-lg bg-green-50 transition-all hover:bg-green-100 hover:shadow-md">
                      <div className="p-2 rounded-full bg-green-100 text-green-600">
                        {/* Icone à remplacer */}
                      </div>
                      <div>
                        <p className="text-sm text-green-700 font-medium">Superficie</p>
                        <p className="text-gray-800 font-medium">437 km²</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3 p-4 rounded-lg bg-purple-50 transition-all hover:bg-purple-100 hover:shadow-md">
                      <div className="p-2 rounded-full bg-purple-100 text-purple-600">
                        {/* Icone à remplacer */}
                      </div>
                      <div>
                        <p className="text-sm text-purple-700 font-medium">Adresse</p>
                        <p className="text-gray-800 font-medium">Mairie de Mbouda, Centre-ville</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Contact */}
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-gray-800">
                    Contact
                  </h3>
                  
                  <div className="grid grid-cols-1 gap-4">
                    <div className="flex items-start space-x-3 p-4 rounded-lg bg-amber-50 transition-all hover:bg-amber-100 hover:shadow-md">
                      <div className="p-2 rounded-full bg-amber-100 text-amber-600">
                        {/* Icone à remplacer */}
                      </div>
                      <div>
                        <p className="text-sm text-amber-700 font-medium">Téléphone</p>
                        <p className="text-gray-800 font-medium">+237 677 72 08 62</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3 p-4 rounded-lg bg-red-50 transition-all hover:bg-red-100 hover:shadow-md">
                      <div className="p-2 rounded-full bg-red-100 text-red-600">
                        {/* Icone à remplacer */}
                      </div>
                      <div>
                        <p className="text-sm text-red-700 font-medium">Email</p>
                        <p className="text-gray-800 font-medium">communembouda@yahoo.fr</p>
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <button
                        onClick={() => navigate('/login')}
                        className="w-full py-4 px-6 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center text-lg font-medium"
                      >
                        <span className="mr-2">Se Connecter</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Footer */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 py-4 px-8 text-center">
              <p className="text-white text-sm">
                © {new Date().getFullYear()} Mairie de Mbouda. Tous droits réservés.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Éléments décoratifs */}
      <div className="hidden md:block absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-blue-100 opacity-20"></div>
      <div className="hidden md:block absolute top-40 -right-20 w-72 h-72 rounded-full bg-blue-200 opacity-20"></div>
    </div>
  );
};

export default Landing;