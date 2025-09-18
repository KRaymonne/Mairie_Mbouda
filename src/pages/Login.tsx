import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BackImage from "../assets/back.jpg";


const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [service, setService] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      if (!username || !password) {
        throw new Error('Nom d\'utilisateur et mot de passe requis');
      }
      // Simuler la connexion
      if (username === 'public' && password === 'public') {
        navigate('/public-service');
      } else {
        navigate('/services');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'La connexion a échoué. Veuillez vérifier vos informations d\'identification.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div 
      style={{
        backgroundImage: 'url(../assets/back.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
      className="flex items-center justify-center min-h-screen py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-8 space-y-6 backdrop-blur-md bg-opacity-95 border border-gray-100">
        <div className="flex flex-col items-center justify-center">
          {/* Logo placeholder - remplacer par votre propre logo */}
          <div className="w-20 h-20 mb-4 bg-green-600 rounded-full overflow-hidden">
        <img src={BackImage} alt="Icône" className="w-full h-full object-cover" />
      </div>
          <h1 className="text-center text-2xl font-bold text-gray-900 tracking-tight">MAIRIE DE MBOUDA</h1>
          <div className="w-16 h-1 bg-green-600 my-3 rounded-full"></div>
          <h2 className="text-center text-sm font-medium text-gray-600">Portail d'authentification</h2>
        </div>
        
        {error && (
          <div className="rounded-md bg-red-50 p-4 border-l-4 border-red-500 animate-pulse">
            <div className="flex">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-600" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">{error}</h3>
              </div>
            </div>
          </div>
        )}

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label htmlFor="service" className="block text-sm font-medium text-gray-700">Service</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <select
                id="service"
                name="service"
                required
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 bg-gray-50 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 ease-in-out"
                value={service}
                onChange={(e) => setService(e.target.value)}
              >
                <option value="">Sélectionner un service</option>
                <option value="Service_affaires_generales">Service des affaires générales</option>
                <option value="Service_economique_financier">Service économique et financier</option>
                <option value="Service_technique_urbain">Service technique de l'aménagement et du développement urbain</option>
                <option value="Service_hygiene_salubrite">Service hygiène, salubrité</option>
                <option value="Service_social_culturel">Service social et culturel</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">Nom d'utilisateur</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <input
                id="username"
                name="username"
                type="text"
                required
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 bg-gray-50 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 ease-in-out"
                placeholder="Entrez votre nom d'utilisateur"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Mot de passe</label>
              <a href="#" className="text-xs text-green-600 hover:text-green-500">Mot de passe oublié?</a>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 bg-gray-50 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 ease-in-out"
                placeholder="Entrez votre mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full flex justify-center items-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white ${isLoading ? 'bg-green-500 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-200 ease-in-out shadow-md hover:shadow-lg`}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Connexion en cours...
                </>
              ) : 'Se connecter'}
            </button>
          </div>
        </form>

        <div className="text-center mt-6 pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-600">Vous n'avez pas de compte? <a href="/register" className="font-medium text-green-600 hover:text-green-500 transition-colors">Inscrivez-vous</a></p>
        </div>
        
        <div className="text-center text-xs text-gray-500 mt-6">
          © 2025 Mairie de Mbouda. Tous droits réservés.
        </div>
      </div>
    </div>
  );
};

export default Login;