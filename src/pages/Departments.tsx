import { useState } from 'react';
import { Users, Wrench, FileText, Phone, Mail, MapPin, ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { Department } from '../types';


const Departments = () => {
  const navigate = useNavigate();
  const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null);

  const departments: Department[] = [
    "Exécutif Municipal",
    "Service de Recouvrement",
    "Service de Contrôle des Dépenses",
    "Service de la Comptabilité, de la Caisse et de la Trésorerie Communale",
    "Service des Affaires Sociales",
    "Service d'Hygiène et Salubrité Publique",
    "Service Technique de l'Aménagement et du Développement Urbain",
    "Service d'Assiette Fiscale",
    "Service Financier et Économique",
  ];

  // Schémas de couleurs pour les départements
  const departmentColors = {
    "Exécutif Municipal": {
      bg: 'bg-blue-50',
      button: 'bg-blue-600 hover:bg-blue-700',
      icon: 'text-blue-600'
    },
    "Service de Recouvrement": {
      bg: 'bg-green-50',
      button: 'bg-green-600 hover:bg-green-700',
      icon: 'text-green-600'
    },
    "Service de Contrôle des Dépenses": {
      bg: 'bg-yellow-50',
      button: 'bg-yellow-600 hover:bg-yellow-700',
      icon: 'text-yellow-600'
    },
    "Service de la Comptabilité, de la Caisse et de la Trésorerie Communale": {
      bg: 'bg-orange-50',
      button: 'bg-orange-600 hover:bg-orange-700',
      icon: 'text-orange-600'
    },
    "Service des Affaires Sociales": {
      bg: 'bg-red-50',
      button: 'bg-red-600 hover:bg-red-700',
      icon: 'text-red-600'
    },
    "Service d'Hygiène et Salubrité Publique": {
      bg: 'bg-purple-50',
      button: 'bg-purple-600 hover:bg-purple-700',
      icon: 'text-purple-600'
    },
    "Service Technique de l'Aménagement et du Développement Urbain": {
      bg: 'bg-teal-50',
      button: 'bg-teal-600 hover:bg-teal-700',
      icon: 'text-teal-600'
    },
    "Service d'Assiette Fiscale": {
      bg: 'bg-gray-50',
      button: 'bg-gray-600 hover:bg-gray-700',
      icon: 'text-gray-600'
    },
    "Service Financier et Économique": {
      bg: 'bg-indigo-50',
      button: 'bg-indigo-600 hover:bg-indigo-700',
      icon: 'text-indigo-600'
    },
  };

  // Données fictives pour les détails des départements
  const getDepartmentDetails = (dept: Department) => {
    switch(dept) {
      case "Exécutif Municipal":
        return {
          head: { name: "Maire", title: "Maire", email: "maire@domain.com", phone: "+33 1 23 45 67 88" },
          location: "Bâtiment A, Rez-de-chaussée",
          statistics: { employees: 5, equipment: 3, procedures: 2, activeProjects: 1 },
          recentProcedures: [],
          units: [
            "Maire / Adjoints",
            "Cellule Informatique",
            "Secrétariat Général",
            "Bureau d'ordre et du courrier",
            "Poste de Comptabilité"
          ]
        };
      case "Service de Recouvrement":
        return {
          head: { name: "Jean Dupont", title: "Responsable", email: "jean.dupont@domain.com", phone: "+33 1 23 45 67 89" },
          location: "Bâtiment B, 1er étage",
          statistics: { employees: 6, equipment: 4, procedures: 3, activeProjects: 1 },
          recentProcedures: [],
          units: []
        };
      case "Service de Contrôle des Dépenses":
        return {
          head: { name: "Marie Claire", title: "Directrice", email: "marie.claire@domain.com", phone: "+33 1 23 45 67 90" },
          location: "Bâtiment B, 1er étage",
          statistics: { employees: 8, equipment: 4, procedures: 2, activeProjects: 1 },
          recentProcedures: [],
          units: [
            "Bureau de Gestion des Dépenses",
            "Bureau de la Comptabilité"
          ]
        };
      case "Service de la Comptabilité, de la Caisse et de la Trésorerie Communale":
        return {
          head: { name: "Alice Martin", title: "Directrice", email: "alice.martin@domain.com", phone: "+33 1 23 45 67 91" },
          location: "Bâtiment C, 2ème étage",
          statistics: { employees: 10, equipment: 5, procedures: 3, activeProjects: 1 },
          recentProcedures: [],
          units: []
        };
      case "Service des Affaires Sociales":
        return {
          head: { name: "Sophie Bernard", title: "Directrice", email: "sophie.bernard@domain.com", phone: "+33 1 23 45 67 93" },
          location: "Bâtiment D, 1er étage",
          statistics: { employees: 12, equipment: 6, procedures: 5, activeProjects: 2 },
          recentProcedures: [],
          units: [
            "Bureau de la Culture",
            "Bureau d'Animation et de Jeunesse",
            "Bureau des Ressources Humaines",
            "Bureau d'état civil et démographie",
            "Bureau du Contentieux et des Assurances"
          ]
        };
      case "Service d'Hygiène et Salubrité Publique":
        return {
          head: { name: "Claire Petit", title: "Directrice", email: "claire.petit@domain.com", phone: "+33 1 23 45 67 92" },
          location: "Bâtiment E, Rez-de-chaussée",
          statistics: { employees: 20, equipment: 25, procedures: 8, activeProjects: 5 },
          recentProcedures: [],
          units: [
            "Bureau de l'enlèvement des Déchets et de la Salubrité Publique",
            "Bureau des Inspections et de la Protection de l'Environnement"
          ]
        };
      case "Service Technique de l'Aménagement et du Développement Urbain":
        return {
          head: { name: "Philippe Roux", title: "Directeur Technique", email: "philippe.roux@domain.com", phone: "+33 1 23 45 67 91" },
          location: "Bâtiment F, 2ème étage",
          statistics: { employees: 15, equipment: 20, procedures: 6, activeProjects: 4 },
          recentProcedures: [],
          units: [
            "Bureau d'Urbanisme et de Construction",
            "Bureau des Affaires Foncières et Cadastrales",
            "Bureau de la Maintenance du Patrimoine et des Espaces Verts"
          ]
        };
      case "Service d'Assiette Fiscale":
        return {
          head: { name: "Jean Dupont", title: "Responsable", email: "jean.dupont@domain.com", phone: "+33 1 23 45 67 89" },
          location: "Bâtiment G, 1er étage",
          statistics: { employees: 5, equipment: 2, procedures: 1, activeProjects: 0 },
          recentProcedures: [],
          units: [
            "Bureau des Émissions",
            "Bureau de la Gestion des Équipements Marchands"
          ]
        };
      case "Service Financier et Économique":
        return {
          head: { name: "Marie Claire", title: "Directrice", email: "marie.claire@domain.com", phone: "+33 1 23 45 67 90" },
          location: "Bâtiment H, 1er étage",
          statistics: { employees: 10, equipment: 5, procedures: 3, activeProjects: 2 },
          recentProcedures: [],
          units: []
        };
      default:
        return {
          head: { name: "Non assigné", title: "Non défini", email: "contact@domain.com", phone: "+33 1 23 45 67 89" },
          location: "Non spécifié",
          statistics: { employees: 0, equipment: 0, procedures: 0, activeProjects: 0 },
          recentProcedures: [],
          units: []
        };
    }
  };

  if (selectedDepartment) {
    const details = getDepartmentDetails(selectedDepartment);
    const colors = departmentColors[selectedDepartment];

    return (
      <div className="h-full">
        <div className="mb-6 flex items-center gap-4">
          <button 
            onClick={() => setSelectedDepartment(null)}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
          >
            <ChevronLeft size={20} />
            Retour aux Services
          </button>
        </div>

        <div className={`bg-white rounded-lg shadow-md ${colors.bg}`}>
          <div className="p-6 border-b">
            <h1 className="text-2xl font-bold text-gray-800">{selectedDepartment}</h1>
            <div className="mt-4 flex items-center gap-3 text-gray-600">
              <MapPin size={20} />
              <span>{details.location}</span>
            </div>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Informations sur le responsable du département */}
              <div className="bg-white/80 p-6 rounded-lg shadow-sm">
                <h2 className="text-lg font-semibold mb-4">Responsable du Service</h2>
                <div className="space-y-3">
                  <p className="text-gray-800 font-medium">{details.head.name}</p>
                  <p className="text-gray-600">{details.head.title}</p>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Mail size={16} className={colors.icon} />
                    <span>{details.head.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Phone size={16} className={colors.icon} />
                    <span>{details.head.phone}</span>
                  </div>
                </div>
              </div>

              {/* Statistiques */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h2 className="text-lg font-semibold mb-4">Statistiques</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-lg">
                    <div className="flex items-center gap-2 text-blue-600">
                      <Users size={20} className={colors.icon} />
                      <span className="text-2xl font-bold">{details.statistics.employees}</span>
                    </div>
                    <p className="text-gray-600 mt-1">Employés</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <div className="flex items-center gap-2 text-green-600">
                      <Wrench size={20} className={colors.icon} />
                      <span className="text-2xl font-bold">{details.statistics.equipment}</span>
                    </div>
                    <p className="text-gray-600 mt-1">Équipement</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <div className="flex items-center gap-2 text-purple-600">
                      <FileText size={20} className={colors.icon} />
                      <span className="text-2xl font-bold">{details.statistics.procedures}</span>
                    </div>
                    <p className="text-gray-600 mt-1">Procédures</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <div className="flex items-center gap-2 text-orange-600">
                      <FileText size={20} className={colors.icon} />
                      <span className="text-2xl font-bold">{details.statistics.activeProjects}</span>
                    </div>
                    <p className="text-gray-600 mt-1">Projets Actifs</p>
                  </div>
                </div>
              </div>

              {/* Unités et sections */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h2 className="text-lg font-semibold mb-4">Unités et Sections</h2>
                <ul className="list-disc list-inside">
                  {details.units.map((unit, index) => (
                    <li key={index} className="text-gray-600">{unit}</li>
                  ))}
                </ul>
              </div>

              {/* Procédures récentes */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h2 className="text-lg font-semibold mb-4">Procédures Récentes</h2>
                <div className="space-y-3">
                  {details.recentProcedures.map(procedure => (
                    <div key={procedure.id} className="bg-white p-4 rounded-lg">
                      <p className="font-medium text-gray-800">{procedure.name}</p>
                      <span className={`inline-block mt-2 px-2 py-1 text-xs rounded-full ${
                        procedure.status === 'active' ? 'bg-green-100 text-green-800' :
                        procedure.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {procedure.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Services</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {departments.map((department) => {
          const details = getDepartmentDetails(department);
          const colors = departmentColors[department];

          return (
            <div key={department} className={`rounded-lg shadow-md p-6 ${colors.bg} border border-gray-100`}>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">{department}</h2>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-gray-600">
                  <Users size={20} className={colors.icon} />
                  <span>Employés: {details.statistics.employees}</span>
                </div>
                
                <div className="flex items-center gap-3 text-gray-600">
                  <Wrench size={20} className={colors.icon} />
                  <span>Équipement: {details.statistics.equipment}</span>
                </div>
                
                <div className="flex items-center gap-3 text-gray-600">
                  <FileText size={20} className={colors.icon} />
                  <span>Procédures: {details.statistics.procedures}</span>
                </div>
              </div>
              
              <button 
                className={`mt-6 w-full text-white px-4 py-2 rounded-lg ${colors.button}`}
                onClick={() => setSelectedDepartment(department)}
              >
                Voir détails
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Departments;