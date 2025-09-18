import React, { useState, useEffect } from 'react';
import { Plus, Search, Edit, Trash2, X } from 'lucide-react';
import type { Equipment, Department } from '../types';
import axios from 'axios';

axios.defaults.baseURL = "http://localhost:8080/";

const EquipmentPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false); 
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [editingEquipment, setEditingEquipment] = useState<Equipment | null>(null);
  const [showUpdateSuccessModal, setShowUpdateSuccessModal] = useState(false);
  const [formData, setFormData] = useState({
    code: '',
    name: '',
    type: '',
    department: '' as Department,
    status: 'available' as Equipment['status'],
    assignedTo: 'None',
    nombre: '',
    dateInstallation: '',
    etatBien: 'neuf' as Equipment['etatBien']
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const initialFormData = { ...formData };
  const [equipment, setEquipment] = useState<Equipment[]>([]);

  const equipmentTypes = [
    'Bureau',
    'Table',
    'Chaise',
    'Fauteuil',
    'Registre',
    'Ordinateur',
    'Écran',
    'Imprimante',
    'Photocopieur',
    'Scanner',
    'Traceur',
    'GPS',
    'Station Totale',
    'Niveau',
    'Réfrigérateur',
    'Climatisation',
    'Véhicule de Ville',
    'Véhicule 4x4',
    'Camion',
    'Engin',
    'Other'
  ];

  const prepareEdit = (equip: Equipment) => {
    setEditingEquipment(equip);
    setFormData({
      code: equip.code || '',
      name: equip.name || '',
      type: equip.type || '',
      department: equip.department || '' as Department,
      status: equip.status || 'available',
      assignedTo: equip.assignedTo || 'None',
      nombre: equip.nombre || '',
      dateInstallation: equip.dateInstallation || '',
      etatBien: equip.etatBien || 'neuf'
    });
    setShowUpdateModal(true);
    setFormErrors({});
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!formData.name.trim()) errors.name = 'Name is required';
    if (!formData.type) errors.type = 'Type is required';
    if (!formData.department) errors.department = 'Department is required';
    if (!formData.status) errors.status = 'Status is required';
    if (formData.status === 'in-use' && !formData.assignedTo.trim()) {
      errors.assignedTo = 'Assigned user is required when status is in-use';
    }
    return errors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    
    try {
      const data = await axios.post("/create", formData);
      if (data.data.success) {
        setShowSuccessModal(true);
        // Mettre à jour la liste des équipements immédiatement
        fetchData();
        // Réinitialiser le formulaire et fermer les modaux après un délai
        setTimeout(() => {
          setShowAddModal(false);
          setFormData(initialFormData);
          setShowSuccessModal(false);
        }, 1000);
      } else {
        alert(data.data.message || "Une erreur est survenue lors de l'ajout de l'équipement.");
      }
    } catch (error) {
      console.error("Erreur lors de l'ajout de l'équipement:", error);
      alert("Une erreur est survenue lors de l'ajout de l'équipement.");
    }
  };

  const fetchData = async () => {
    try {
      const data = await axios.get("/equipement");
      setEquipment(data.data.data);
    } catch (error) {
      console.error("Error fetching equipment:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      const result = await axios.delete("/delete/" + id);
      if (result.data.success) {
        setShowDeleteModal(true);
        // Mettre à jour la liste des équipements immédiatement
        fetchData();
        // Fermer le modal après un délai
        setTimeout(() => {
          setShowDeleteModal(false);
        }, 1000);
      } else {
        alert(result.data.message || "Une erreur est survenue lors de la suppression de l'équipement.");
      }
    } catch (error) {
      console.error("Error deleting equipment:", error);
      alert("Une erreur est survenue lors de la suppression de l'équipement.");
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingEquipment) return;
  
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    if (editingEquipment.status === 'in-use' && formData.status !== 'in-use') {
      formData.assignedTo = 'None';
    }
  
    try {
      const response = await axios.put("/update", { id: editingEquipment._id, ...formData });
      if (response.data.success) {
        setShowUpdateSuccessModal(true);
        // Mettre à jour la liste des équipements immédiatement
        fetchData();
        // Réinitialiser le formulaire et fermer les modaux après un délai
        setTimeout(() => {
          setShowUpdateModal(false);
          setFormData(initialFormData);
          setEditingEquipment(null);
          setShowUpdateSuccessModal(false);
        }, 1000);
      } else {
        alert(response.data.message || "Une erreur est survenue lors de la mise à jour de l'équipement.");
      }
    } catch (error) {
      console.error("Error updating equipment:", error);
      alert("Une erreur est survenue lors de la mise à jour de l'équipement.");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Equipment</h1>
        <button
          onClick={() => {
            setFormData({
              code: '',
              name: '',
              type: '',
              department: '' as Department,
              status: 'available' as Equipment['status'],
              assignedTo: 'None',
              nombre: '',
              dateInstallation: '',
              etatBien: 'neuf' as Equipment['etatBien']
            });
            setShowAddModal(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700"
        >
          <Plus size={20} />
          Ajouter Equipment
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search equipment..."
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">code</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assigned To</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date Installation</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Etat Bien</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {equipment.map((equipment) => (
                <tr key={equipment._id}>
                  <td className="px-6 py-4 whitespace-nowrap">{equipment.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{equipment.type}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{equipment.code}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{equipment.department}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{equipment.status}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{equipment.assignedTo}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{equipment.nombre}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{equipment.dateInstallation}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{equipment.etatBien}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${equipment.status === 'available' ? 'bg-green-100 text-green-800' :
                        equipment.status === 'in-use' ? 'bg-blue-100 text-blue-800' :
                          'bg-yellow-100 text-yellow-800'}`}>
                      {equipment.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <button
                        className="text-blue-600 hover:text-blue-800"
                        onClick={() => prepareEdit(equipment)}
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        className="text-red-600 hover:text-red-800"
                        onClick={() => handleDelete(equipment._id)}
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

      {/* Add Equipment Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center overflow-y-auto py-6">
          <div className="bg-white rounded-lg p-6 w-full max-w-md overflow-y-auto my-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Ajouter Equipment</h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${formErrors.name ? 'border-red-500' : 'border-gray-300'
                    }`}
                  placeholder="Enter equipment name"
                />
                {formErrors.name && (
                  <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Type
                </label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${formErrors.type ? 'border-red-500' : 'border-gray-300'
                    }`}
                >
                  <option value="">Select type</option>
                  {equipmentTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
                {formErrors.type && (
                  <p className="text-red-500 text-sm mt-1">{formErrors.type}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Code
                </label>
                <input
                  type="text"
                  name="code"
                  value={formData.code}
                  onChange={handleInputChange}
                  className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${formErrors.code ? 'border-red-500' : 'border-gray-300'
                    }`}
                  placeholder="Enter code"
                />
                {formErrors.code && (
                  <p className="text-red-500 text-sm mt-1">{formErrors.code}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Department
                </label>
                <select
                  name="department"
                  value={formData.department}
                  onChange={handleInputChange}
                  className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${formErrors.department ? 'border-red-500' : 'border-gray-300'
                    }`}
                >
                  <option value="">Select department</option>
                  <option value="Service_de_Recouvrement">Service de Recouvrement</option>
                  <option value="Service_de_Contrôle_des_Dépenses">Service de Contrôle des Dépenses</option>
                  <option value="Service_de_la_Comptabilité_de_la_Caisse_et_de_la_Trésorerie_Communale">Service de la Comptabilité, de la Caisse et de la Trésorerie Communale</option>
                  <option value="Service_des_Affaires_Sociales">Service des Affaires Sociales</option>
                  <option value="Service_Hygiène_et_Salubrité_Publique">Service d'Hygiène et Salubrité Publique</option>
                  <option value="Service_Technique_de_Aménagement_et_du_Développement_Urbain">Service Technique de l'Aménagement et du Développement Urbain</option>
                  <option value="Service_d'Assiette_Fiscale">Service d'Assiette Fiscale</option>
                  <option value="Service_Financier_et_Économique">Service Financier et Économique</option>
                </select>
                {formErrors.department && (
                  <p className="text-red-500 text-sm mt-1">{formErrors.department}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${formErrors.status ? 'border-red-500' : 'border-gray-300'
                    }`}
                >
                  <option value="">Select status</option>
                  <option value="available">Available</option>
                  <option value="in-use">In Use</option>
                  <option value="maintenance">Maintenance</option>
                </select>
                {formErrors.status && (
                  <p className="text-red-500 text-sm mt-1">{formErrors.status}</p>
                )}
              </div>

              {formData.status === 'in-use' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Assigned To
                  </label>
                  <input
                    type="text"
                    name="assignedTo"
                    value={formData.assignedTo}
                    onChange={handleInputChange}
                    className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${formErrors.assignedTo ? 'border-red-500' : 'border-gray-300'
                      }`}
                    placeholder="Enter user name"
                  />
                  {formErrors.assignedTo && (
                    <p className="text-red-500 text-sm mt-1">{formErrors.assignedTo}</p>
                  )}
                </div>
              )}
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre
                </label>
                <input
                  type="number"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleInputChange}
                  className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${formErrors.nombre ? 'border-red-500' : 'border-gray-300'
                    }`}
                  placeholder="Enter quantity"
                />
                {formErrors.nombre && (
                  <p className="text-red-500 text-sm mt-1">{formErrors.nombre}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date Installation
                </label>
                <input
                  type="date"
                  name="dateInstallation"
                  value={formData.dateInstallation}
                  onChange={handleInputChange}
                  className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${formErrors.dateInstallation ? 'border-red-500' : 'border-gray-300'
                    }`}
                />
                {formErrors.dateInstallation && (
                  <p className="text-red-500 text-sm mt-1">{formErrors.dateInstallation}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Etat Bien
                </label>
                <select
                  name="etatBien"
                  value={formData.etatBien}
                  onChange={handleInputChange}
                  className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                    formErrors.etatBien ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select état des biens</option>
                  <option value="neuf">Neuf</option>
                  <option value="vieux">Vieux</option>
                </select>
                {formErrors.etatBien && (
                  <p className="text-red-500 text-sm mt-1">{formErrors.etatBien}</p>
                )}
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Add Equipment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Success Modal for Add */}
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
              <h3 className="mt-3 text-lg font-medium text-gray-900">Ajout réussi!</h3>
              <p className="mt-2 text-sm text-gray-500">
                L'équipement a été ajouté avec succès.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal for Delete */}
      {showDeleteModal && (
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
              <h3 className="mt-3 text-lg font-medium text-gray-900">Suppression réussie!</h3>
              <p className="mt-2 text-sm text-gray-500">
                L'équipement a été supprimé avec succès.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal for Update */}
      {showUpdateSuccessModal && (
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
              <h3 className="mt-3 text-lg font-medium text-gray-900">Mise à jour réussie!</h3>
              <p className="mt-2 text-sm text-gray-500">
                L'équipement a été mis à jour avec succès.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Update Equipment Modal */}
      {showUpdateModal && editingEquipment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center overflow-y-auto py-6">
          <div className="bg-white rounded-lg p-6 w-full max-w-md overflow-y-auto my-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Modifier Equipment</h2>
              <button
                onClick={() => setShowUpdateModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleUpdate} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${formErrors.name ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="Enter equipment name"
                />
                {formErrors.name && <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${formErrors.type ? 'border-red-500' : 'border-gray-300'}`}
                >
                  <option value="">Select type</option>
                  {equipmentTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
                {formErrors.type && <p className="text-red-500 text-sm mt-1">{formErrors.type}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Code</label>
                <input
                  type="text"
                  name="code"
                  value={formData.code}
                  onChange={handleInputChange}
                  className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${formErrors.code ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="Enter code"
                />
                {formErrors.code && <p className="text-red-500 text-sm mt-1">{formErrors.code}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                <select
                  name="department"
                  value={formData.department}
                  onChange={handleInputChange}
                  className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${formErrors.department ? 'border-red-500' : 'border-gray-300'}`}
                >
                  <option value="">Select department</option>
                  <option value="Service_de_Recouvrement">Service de Recouvrement</option>
                  <option value="Service_de_Contrôle_des_Dépenses">Service de Contrôle des Dépenses</option>
                  <option value="Service_de_la_Comptabilité_de_la_Caisse_et_de_la_Trésorerie_Communale">Service de la Comptabilité, de la Caisse et de la Trésorerie Communale</option>
                  <option value="Service_des_Affaires_Sociales">Service des Affaires Sociales</option>
                  <option value="Service_Hygiène_et_Salubrité_Publique">Service d'Hygiène et Salubrité Publique</option>
                  <option value="Service_Technique_de_Aménagement_et_du_Développement_Urbain">Service Technique de l'Aménagement et du Développement Urbain</option>
                  <option value="Service_d'Assiette_Fiscale">Service d'Assiette Fiscale</option>
                  <option value="Service_Financier_et_Économique">Service Financier et Économique</option>
                </select>
                {formErrors.department && <p className="text-red-500 text-sm mt-1">{formErrors.department}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${formErrors.status ? 'border-red-500' : 'border-gray-300'}`}
                >
                  <option value="">Select status</option>
                  <option value="available">Available</option>
                  <option value="in-use">In Use</option>
                  <option value="maintenance">Maintenance</option>
                </select>
                {formErrors.status && <p className="text-red-500 text-sm mt-1">{formErrors.status}</p>}
              </div>

              {formData.status === 'in-use' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Assigned To</label>
                  <input
                    type="text"
                    name="assignedTo"
                    value={formData.assignedTo}
                    onChange={handleInputChange}
                    className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${formErrors.assignedTo ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="Enter user name"
                  />
                  {formErrors.assignedTo && <p className="text-red-500 text-sm mt-1">{formErrors.assignedTo}</p>}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                <input
                  type="number"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleInputChange}
                  className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${formErrors.nombre ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="Enter quantity"
                />
                {formErrors.nombre && <p className="text-red-500 text-sm mt-1">{formErrors.nombre}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date Installation</label>
                <input
                  type="date"
                  name="dateInstallation"
                  value={formData.dateInstallation}
                  onChange={handleInputChange}
                  className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${formErrors.dateInstallation ? 'border-red-500' : 'border-gray-300'}`}
                />
                {formErrors.dateInstallation && <p className="text-red-500 text-sm mt-1">{formErrors.dateInstallation}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Etat Bien</label>
                <select
                  name="etatBien"
                  value={formData.etatBien}
                  onChange={handleInputChange}
                  className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${formErrors.etatBien ? 'border-red-500' : 'border-gray-300'}`}
                >
                  <option value="">Select état des biens</option>
                  <option value="neuf">Neuf</option>
                  <option value="vieux">Vieux</option>
                </select>
                {formErrors.etatBien && <p className="text-red-500 text-sm mt-1">{formErrors.etatBien}</p>}
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowUpdateModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Mettre à jour l'équipement
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EquipmentPage;