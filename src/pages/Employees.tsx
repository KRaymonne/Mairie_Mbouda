import React, { useState, useEffect } from 'react';
import { Plus, Search, Edit, Trash2, X } from 'lucide-react';
import type { Employee, Department } from '../types';
import axios from 'axios';

axios.defaults.baseURL = "http://localhost:8080/";

// Composant partagé pour le formulaire
const EmployeeForm = ({
  initialData,
  onSubmit,
  onCancel,
  submitText,
  steps,
  currentStep,
  setCurrentStep,
  formErrors,
  handleInputChange
}: {
  initialData: any;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
  submitText: string;
  steps: { title: string; description: string }[];
  currentStep: number;
  setCurrentStep: (step: number) => void;
  formErrors: Record<string, string>;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
}) => {
  const position = [
    'Director',
    'Manager',
    'Supervisor',
    'Administrator',
    'Clerk',
    'Specialist',
    'Analyst',
    'Coordinator'
  ];

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  return (
    <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto my-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">{submitText === "Ajouter l'employé" ? "Ajouter Employé" : "Modifier Employé"}</h2>
        <button onClick={onCancel} className="text-gray-500 hover:text-gray-700">
          <X size={30} />
        </button>
      </div>

      {/* Stepper Header */}
      <div className="mb-8">
        <div className="flex justify-between items-center">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center relative">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  currentStep >= index
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}
              >
                {index + 1}
              </div>
              <div className="text-xs mt-2 text-center w-24">{step.title}</div>

              {index < steps.length - 1 && (
                <div
                  className={`absolute top-5 w-full h-1 left-40 -z-10 ${
                    currentStep > index ? 'bg-blue-600' : 'bg-gray-200'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      <form className="space-y-4" onSubmit={(e) => {
        e.preventDefault();
      }}>
        {/* Step 1: Personal Information */}
        {currentStep === 0 && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              {steps[currentStep].title}
            </h2>
            <p className="text-gray-600 mb-4">{steps[currentStep].description}</p>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Matricule
              </label>
              <input
                type="text"
                name="matricule"
                value={initialData.matricule}
                onChange={handleInputChange}
                className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                  formErrors.matricule ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Entrez le matricule de l'employé"
              />
              {formErrors.matricule && (
                <p className="text-red-500 text-sm mt-1">{formErrors.matricule}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Noms et Prénoms
              </label>
              <input
                type="text"
                name="nom"
                value={initialData.nom}
                onChange={handleInputChange}
                className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                  formErrors.nom ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Entrez le nom de l'employé"
              />
              {formErrors.nom && (
                <p className="text-red-500 text-sm mt-1">{formErrors.nom}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date de Naissance
              </label>
              <input
                type="date"
                name="dateNaissance"
                value={initialData.dateNaissance}
                onChange={handleInputChange}
                className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                  formErrors.dateNaissance ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {formErrors.dateNaissance && (
                <p className="text-red-500 text-sm mt-1">{formErrors.dateNaissance}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Lieu de Naissance
              </label>
              <input
                type="text"
                name="lieuNaissance"
                value={initialData.lieuNaissance}
                onChange={handleInputChange}
                className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                  formErrors.lieuNaissance ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Ville, Pays"
              />
              {formErrors.lieuNaissance && (
                <p className="text-red-500 text-sm mt-1">{formErrors.lieuNaissance}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Sexe
              </label>
              <select
                name="sexe"
                value={initialData.sexe}
                onChange={handleInputChange}
                className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                  formErrors.sexe ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="Homme">Masculin</option>
                <option value="Femme">Féminin</option>
              </select>
              {formErrors.sexe && (
                <p className="text-red-500 text-sm mt-1">{formErrors.sexe}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Situation Matrimoniale
              </label>
              <select
                name="situationMatrimoniale"
                value={initialData.situationMatrimoniale}
                onChange={handleInputChange}
                className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                  formErrors.situationMatrimoniale ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="Celibataire">Célibataire</option>
                <option value="Marie">Marié(e)</option>
                <option value="Divorce">Divorcé(e)</option>
                <option value="Veuf/Veuve">Veuf/Veuve</option>
              </select>
              {formErrors.situationMatrimoniale && (
                <p className="text-red-500 text-sm mt-1">{formErrors.situationMatrimoniale}</p>
              )}
            </div>
          </div>
        )}

        {/* Step 2: Professional Information */}
        {currentStep === 1 && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              {steps[currentStep].title}
            </h2>
            <p className="text-gray-600 mb-4">{steps[currentStep].description}</p>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Diplôme
              </label>
              <input
                type="text"
                name="diplome"
                value={initialData.diplome}
                onChange={handleInputChange}
                className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                  formErrors.diplome ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Ex: Master en Informatique"
              />
              {formErrors.diplome && (
                <p className="text-red-500 text-sm mt-1">{formErrors.diplome}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Contrat
              </label>
              <select
                name="contrat"
                value={initialData.contrat}
                onChange={handleInputChange}
                className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                  formErrors.contrat ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="CDI">CDI</option>
                <option value="CDD">CDD</option>
                <option value="Stage">Stage</option>
                <option value="Freelance">Freelance</option>
              </select>
              {formErrors.contrat && (
                <p className="text-red-500 text-sm mt-1">{formErrors.contrat}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Position
              </label>
              <select
                name="positions"
                value={initialData.positions}
                onChange={handleInputChange}
                className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                  formErrors.positions ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                {position.map(pos => (
                  <option key={pos} value={pos}>{pos}</option>
                ))}
              </select>
              {formErrors.positions && (
                <p className="text-red-500 text-sm mt-1">{formErrors.positions}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Service
              </label>
              <select
                name="service"
                value={initialData.service}
                onChange={handleInputChange}
                className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                  formErrors.service ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="Executif_Municipal">Exécutif Municipal</option>
                <option value="Service_de_Recouvrement">Service de Recouvrement</option>
                <option value="Service_de_Contrôle_des_Dépenses">Service de Contrôle des Dépenses</option>
                <option value="Service_de_la_Comptabilité_de_la_Caisse_et_de_la_Trésorerie_Communale">
                  Service de la Comptabilité, de la Caisse et de la Trésorerie Communale
                </option>
                <option value="Service_des_Affaires_Socialese">Service des Affaires Sociales</option>
                <option value="Service_Hygiène_et_Salubrité_Publique">Service d'Hygiène et Salubrité Publique</option>
                <option value="Service_Technique_de_Aménagement_et_du_Développement_Urbain">
                  Service Technique de l'Aménagement et du Développement Urbain
                </option>
                <option value="Service_Assiette_Fiscale">Service d'Assiette Fiscale</option>
                <option value="Service_Financier_et_Économique">Service Financier et Économique</option>
              </select>
              {formErrors.service && (
                <p className="text-red-500 text-sm mt-1">{formErrors.service}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Statut Professionnel
              </label>
              <select
                name="statutProfessionnel"
                value={initialData.statutProfessionnel}
                onChange={handleInputChange}
                className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                  formErrors.statutProfessionnel ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="Fonctionnaire">Fonctionnaire</option>
                <option value="Contractuel">Contractuel</option>
                <option value="Agent_Decision">Agent Décision</option>
              </select>
              {formErrors.statutProfessionnel && (
                <p className="text-red-500 text-sm mt-1">{formErrors.statutProfessionnel}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Grade
              </label>
              <input
                type="text"
                name="grade"
                value={initialData.grade}
                onChange={handleInputChange}
                className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                  formErrors.grade ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Ex: Senior, Junior..."
              />
              {formErrors.grade && (
                <p className="text-red-500 text-sm mt-1">{formErrors.grade}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Corps de Métier
              </label>
              <input
                type="text"
                name="corpsMetier"
                value={initialData.corpsMetier}
                onChange={handleInputChange}
                className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                  formErrors.corpsMetier ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Ex: Informatique, Administration..."
              />
              {formErrors.corpsMetier && (
                <p className="text-red-500 text-sm mt-1">{formErrors.corpsMetier}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Compétences
              </label>
              <input
                type="text"
                name="competences"
                value={initialData.competences}
                onChange={handleInputChange}
                className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                  formErrors.competences ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Listez vos compétences, séparées par des virgules"
              />
              {formErrors.competences && (
                <p className="text-red-500 text-sm mt-1">{formErrors.competences}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Informations Supplémentaires
              </label>
              <textarea
                name="informationsSupplementaires"
                value={initialData.informationsSupplementaires}
                onChange={handleInputChange}
                className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                  formErrors.informationsSupplementaires ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Ajoutez des informations supplémentaires ici"
                rows={4}
              />
              {formErrors.informationsSupplementaires && (
                <p className="text-red-500 text-sm mt-1">{formErrors.informationsSupplementaires}</p>
              )}
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8">
          <button
            type="button"
            onClick={prevStep}
            className={`px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 ${
              currentStep === 0 ? 'invisible' : 'visible'
            }`}
          >
            Précédent
          </button>

          {currentStep < steps.length - 1 ? (
            <button
              type="button"
              onClick={nextStep}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Suivant
            </button>
          ) : (
            <button
              type="button"
              onClick={onSubmit}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              {submitText}
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

const initialFormData = {
  matricule: '',
  nom: '',
  dateNaissance: '',
  lieuNaissance: '',
  sexe: 'Homme' as 'Homme' | 'Femme',
  situationMatrimoniale: 'Celibataire' as "Celibataire" | "Marie" | "Divorce" | "Veuf/Veuve",
  diplome: '',
  contrat: 'CDI' as 'CDI' | 'CDD' | 'Stage' | 'Freelance',
  statutProfessionnel: 'Fonctionnaire' as "Fonctionnaire" | "Contractuel" | "Agent_Decision",
  grade: '',
  corpsMetier: '',
  competences: '',
  informationsSupplementaires: '',
  positions: 'Manager' as "Director" | 'Manager' | 'Supervisor' | 'Administrator' | 'Clerk' | 'Specialist' | 'Analyst' | 'Coordinator',
  service: 'Executif_Municipal' as Department
};

const Employees = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [formData, setFormData] = useState(initialFormData);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [addStep, setAddStep] = useState(0);
  const [editStep, setEditStep] = useState(0);

  const steps = [
    {
      title: "Informations personnelles",
      description: "Informations personnelles et formation"
    },
    {
      title: "Informations professionnelles",
      description: "Qualifications et statut professionnel"
    }
  ];

  const prepareEdit = (employee: Employee) => {
    setFormData({
      matricule: employee.matricule || '',
      nom: employee.nom || '',
      dateNaissance: employee.dateNaissance || '',
      lieuNaissance: employee.lieuNaissance || '',
      sexe: employee.sexe || 'Homme',
      situationMatrimoniale: employee.situationMatrimoniale || 'Celibataire',
      diplome: employee.diplome || '',
      contrat: employee.contrat || 'CDI',
      statutProfessionnel: employee.statutProfessionnel || 'Fonctionnaire',
      grade: employee.grade || '',
      corpsMetier: employee.corpsMetier || '',
      competences: employee.competences || '',
      informationsSupplementaires: employee.informationsSupplementaires || '',
      positions: employee.positions || 'Manager',
      service: employee.service || 'Executif_Municipal'
    });
    setEditingEmployee(employee);
    setEditStep(0);
  };

  const fetchEmployees = async () => {
    try {
      const response = await axios.get("/employee");
      setEmployees(response.data.data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (addStep === 0) return;

    try {
      const data = await axios.post("/createEmployee", formData);
      if (data.data.success) {
        setShowSuccessModal(true);
        // Mettre à jour la liste des employés immédiatement
        fetchEmployees(); 
        // Réinitialiser le formulaire et fermer les modaux après un délai
        setTimeout(() => {
          setShowAddModal(false);
          setFormData(initialFormData);
          setAddStep(0);
          setShowSuccessModal(false);
        }, 1000);
      }
    } catch (error) {
      console.error("Erreur lors de l'ajout de l'employé:", error);
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (editStep === 0) {
      const errors = validateForm(0);
      if (Object.keys(errors).length > 0) {
        setFormErrors(errors);
        return;
      }
      setEditStep(1);
      return;
    }

    const errors = validateForm(1);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    if (!editingEmployee) return;

    try {
      const response = await axios.put("/updateEmployee", {
        id: editingEmployee._id,
        ...formData
      });
      if (response.data.success) {
        setShowSuccessModal(true);
        // Mettre à jour la liste des employés immédiatement
        fetchEmployees(); 
        // Réinitialiser le formulaire et fermer les modaux après un délai
        setTimeout(() => {
          setEditingEmployee(null);
          setFormData(initialFormData);
          setEditStep(0);
          setShowSuccessModal(false);
        }, 1000);
      }
    } catch (error) {
      console.error("Error updating employee:", error);
    }
  };

  const validateForm = (step: number) => {
    const errors: Record<string, string> = {};
    if (step === 0) {
      if (!formData.matricule.trim()) errors.matricule = 'Matricule est requis';
      if (!formData.nom.trim()) errors.nom = 'Nom est requis';
      if (!formData.dateNaissance.trim()) errors.dateNaissance = 'Date de naissance est requise';
      if (!formData.lieuNaissance.trim()) errors.lieuNaissance = 'Lieu de naissance est requis';
    } else if (step === 1) {
      if (!formData.diplome.trim()) errors.diplome = 'Diplôme est requis';
      if (!formData.contrat.trim()) errors.contrat = 'Contrat est requis';
      if (!formData.statutProfessionnel.trim()) errors.statutProfessionnel = 'Statut professionnel est requis';
      if (!formData.grade.trim()) errors.grade = 'Grade est requis';
      if (!formData.corpsMetier.trim()) errors.corpsMetier = 'Corps de métier est requis';
      if (!formData.competences.trim()) errors.competences = 'Compétences sont requises';
      if (!formData.positions.trim()) errors.positions = 'Position est requise';
      if (!formData.service.trim()) errors.service = 'Service est requis';
    }
    setFormErrors(errors);
    return errors;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const filteredEmployees = employees.filter(employee =>
    employee._id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.matricule?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.nom?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.dateNaissance?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.lieuNaissance?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.sexe?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.situationMatrimoniale?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.diplome?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.contrat?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.statutProfessionnel?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.grade?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.corpsMetier?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.competences?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.informationsSupplementaires?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async (id: string) => {
    try {
      const result = await axios.delete("/deleteEmployee/" + id);
      if (result) {
        // Mettre à jour la liste des employés après suppression
        fetchEmployees();
      }
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Employees</h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700"
        >
          <Plus size={20} />
          Ajouter Employee
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search employees..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Matricule</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nom</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date de Naissance</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lieu de Naissance</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sexe</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Situation Matrimoniale</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Diplôme</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contrat</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut Professionnel</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Grade</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Positions</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Corps de Métier</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Compétences</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Informations Supplémentaires</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredEmployees.map((employee) => (
                <tr key={employee._id}>
                  <td className="px-6 py-4 whitespace-nowrap">{employee.matricule}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{employee.nom}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{employee.dateNaissance}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{employee.lieuNaissance}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{employee.sexe}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{employee.situationMatrimoniale}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{employee.diplome}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{employee.contrat}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{employee.statutProfessionnel}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{employee.grade}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{employee.positions}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{employee.service}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{employee.corpsMetier}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{employee.competences}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{employee.informationsSupplementaires}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <button
                        className="text-blue-600 hover:text-blue-800"
                        onClick={() => prepareEdit(employee)}
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        className="text-red-600 hover:text-red-800"
                        onClick={() => handleDelete(employee._id)}
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Employee Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center overflow-y-auto py-6">
          <EmployeeForm
            initialData={formData}
            onSubmit={handleSubmit}
            onCancel={() => {
              setShowAddModal(false);
              setFormData(initialFormData);
              setAddStep(0);
            }}
            submitText="Ajouter l'employé"
            steps={steps}
            currentStep={addStep}
            setCurrentStep={setAddStep}
            formErrors={formErrors}
            handleInputChange={handleInputChange}
          />
        </div>
      )}
      
      {/* Update Employee Modal */}
      {editingEmployee && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center overflow-y-auto py-6">
          <EmployeeForm
            initialData={formData}
            onSubmit={handleUpdate}
            onCancel={() => {
              setEditingEmployee(null);
              setFormData(initialFormData);
              setEditStep(0);
            }}
            submitText="Mettre à jour"
            steps={steps}
            currentStep={editStep}
            setCurrentStep={setEditStep}
            formErrors={formErrors}
            handleInputChange={handleInputChange}
          />
        </div>
      )}

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                <svg
                  className="h-6 w-6 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3 className="mt-3 text-lg font-medium text-gray-900">Opération réussie!</h3>
              <p className="mt-2 text-sm text-gray-500">
                {editingEmployee ? "L'employé a été mis à jour avec succès." : "L'employé a été ajouté avec succès."}
              </p>
              <div className="mt-4">
                <button
                  onClick={() => {
                    setShowSuccessModal(false);
                    if (!editingEmployee) {
                      setShowAddModal(false);
                    }
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Employees;