import React, { useState } from 'react';
import { Plus, Search,ChevronDown, ChevronUp, Download } from 'lucide-react';
import { pdf } from '@react-pdf/renderer';
import { saveAs } from 'file-saver';
import Recognition from '../Templates/Recognition';
import Deces from "../Templates/Deces";
import Naissance from "../Templates/Naissance";
import Naissance_extrait from "../Templates/Naissance_extrait";
import Souche_acte from "../Templates/Souche_acte";
import Urbanisme from "../Templates/Urbanisme";
import Indigence from "../Templates/Indigence";
import Certi_deces from "../Templates/Certi_deces";
import Non_souche from '../Templates/Non_souche';
import Celibat from '../Templates/Celibat';
import Construire from "../Templates/Construire";
import Re_construire from "../Templates/Re_construire";
import Implanter from "../Templates/Implanter";
import Civil_regi from "../Templates/Civil_regi";
import Accesssibilite from "../Templates/Accessibilite";
import conduire from "../Templates/Conduire";

type FormField = {
  label: string;
  type: string;
  required: boolean;
  options?: string[];
  showIf?: {
    field: string;
    value: string;
  };
};

type Procedure = {
  id: string;
  title: string;
  Service: string;
  steps: string[];
  documents: string[];
  ServiceFormFields: FormField[];
  civilFormFields: FormField[];
  lastUpdated: string;
  category: 'civil' | 'service' | 'both';
};

type Dossier = {
  submissionCode: string;
  procedureId: string;
  formType: 'civil' | 'Service';
  submittedValues: Record<string, any>;
  submittedDocuments: Record<string, string | File>;
  status: 'complete' | 'incomplete';
  missingDocuments?: string[];
  createdAt?: string;
};


type FormData = {
  formValues: Record<string, any>;
  attachments: Record<string, File>;
};

const CompleteDossierModal = ({ 
  show, 
  onClose, 
  dossier,
  onComplete
}: { 
  show: boolean, 
  onClose: () => void, 
  dossier: Dossier | null,
  onComplete: (files: Record<string, File>) => void 
}) => {
  const [files, setFiles] = useState<Record<string, File | null>>({});

  const handleClose = () => {
    setFiles({});
    onClose();
  };

  if (!show || !dossier || dossier.status === 'complete') return null;

  const handleFileChange = (docName: string, file: File | null) => {
    setFiles(prev => ({
      ...prev,
      [docName]: file
    }));
  };

  const handleSubmit = () => {
    const submittedFiles: Record<string, File> = {};
    
    for (const [docName, file] of Object.entries(files)) {
      if (file) {
        submittedFiles[docName] = file;
      }
    }
    
    onComplete(submittedFiles);
    handleClose();
  };

  return (
    <div 
      className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50"
      onClick={handleClose}
    >
      <div 
        className="bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold mb-2">Ajouter les Pièces jointes</h2>
        
        
        <div className="space-y-4">
          {dossier.missingDocuments?.map((doc, index) => (
            <div key={index} className="mb-4">
              <label className="block text-gray-700 mb-1">
                {doc} <span className="text-red-500">*</span>
              </label>
              <div>
                <input
                  type="file"
                  className="w-full px-4 py-2 border rounded-lg"
                  required
                  onChange={(e) => handleFileChange(doc, e.target.files?.[0] || null)}
                />
                {files[doc] && (
                  <span className="text-sm text-gray-500">
                    Fichier sélectionné: {files[doc]?.name}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-end gap-2 mt-6">
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400"
          >
            Annuler
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            disabled={Object.keys(files).length === 0}
          >
            Finaliser le dossier
          </button>
        </div>
      </div>
    </div>
  );
};

const Modal = ({ show, onClose, procedure, formType }: { show: boolean, onClose: () => void, procedure: Procedure | null, formType: string }) => {
  if (!show || !procedure) return null;
  const [formData, setFormData] = useState<FormData>({
    formValues: {
      "Date de déclaration": new Date().toISOString().split('T')[0]
    },
    attachments: {}
  });
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [previewPdfUrl, setPreviewPdfUrl] = useState<string | null>(null);
  const [showDocumentsModal, setShowDocumentsModal] = useState(false);
  const [, setIncompleteDossiers] = useState<Dossier[]>([]);
  
  const generateSubmissionCode = (procedure: Procedure | null) => {
    // Partie 1: Code de la Mairie (MB pour Mairie de Bouda)
    const cityCode = "MB";
    
    // Partie 2: ID de la procédure (2 chiffres)
    const procedureId = procedure?.id?.toString().padStart(2, '0') || '00';
    
    // Partie 3: Code de la procédure (2 lettres)
    const getProcedureCode = () => {
      if (!procedure || !procedure.title) return 'XX';
      
      const title = procedure.title.toUpperCase();
      
      // Tableau de correspondance procédure/code
      const procedureCodes = [
        { keyword: 'DECLARATION DE RECONNAISSANCE D\'ENFANT NÉ HORS MARIAGE', code: 'EM' },
        { keyword: 'DÉCLARATION DE DÉCÈS', code: 'DD' },
        { keyword: 'DÉCLARATION DE NAISSANCE', code: 'DN' },
        { keyword: 'EXTRAIT D\'ACTE DE NAISSANCE', code: 'EN' },  
        { keyword: 'ATTESTATION D\'EXISTENCE DE SOUCHE D\'ACTE DE NAISSANCE', code: 'SN' },
        { keyword: 'URBANISME', code: 'UR' },
        { keyword: 'CERTIFICAT D\'INDIGENCE', code: 'CI' },
        { keyword: 'ACTE DE DÉCÈS / DEATH CERTIFICATE', code: 'AD' },
        { keyword: 'CERTIFICAT DE NON EXISTENCE DE SOUCHE D\'ACTE DE NAISSANCE', code: 'NN' },
        { keyword: 'CERTIFICAT DE CÉLIBAT', code: 'CC' },
        { keyword: 'DEMANDE DE PERMIS DE CONDUIRE', code: 'PC' },
        { keyword: 'DEMANDE DE PERMIS DE CONSTRUIRE', code: 'CS' },
        { keyword: 'DEMANDE DE PERMIS D\'IMPLANTER', code: 'IM' },
        { keyword: 'CENTRE D\'ÉTAT CIVIL / CIVIL STATUS REGISTRATION CENTRE', code: 'EC' },
        { keyword: 'DEMANDE DE CERTIFICAT D\'ACCESSIBILITÉ', code: 'AC' },
        { keyword: 'DEMANDE DE RENOUVELLEMENT DE PERMIS DE CONSTRUIRE', code: 'RC' } ]
      
      // Recherche dans le tableau
      for (const entry of procedureCodes) {
        if (title.includes(entry.keyword)) {
          return entry.code;
        }
      }
      
      return 'XX'; // Code par défaut si aucune correspondance trouvée
    };
    
    const procedureCode = getProcedureCode();
  
    // Partie 4: Timestamp pour unicité (derniers 4 chiffres de l'horodatage actuel)
    const timestamp = Date.now().toString().slice(-4);
    
    // Partie 5: Identifiant aléatoire de 2 caractères alphanumériques
    const randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const getRandomChar = () => randomChars.charAt(Math.floor(Math.random() * randomChars.length));
    const randomId = getRandomChar() + getRandomChar();
    
    // Construction du code final: MB-01-EN-3456-A7
    return `${cityCode}-${procedureId}-${procedureCode}-${timestamp}-${randomId}`;
  };  

  const cleanDataForPdf = (data: Record<string, any>) => {
    const cleaned: Record<string, any> = {};
    
    Object.entries(data).forEach(([key, value]) => {
      if (!(value instanceof File)) {
        cleaned[key] = value;
      }
    });
    
    return cleaned;
  };

  const getTemplateComponent = (procedureId: string, procedureCase: string) => {
    switch(procedureId) {
      case '1': return Recognition;
      case '2': return Deces;
      case '3': return Naissance;
      case '4': return Naissance_extrait;
      case '5': return Souche_acte;
      case '6': return Urbanisme;
      case '7': return Indigence;
      case '8': return Certi_deces;
      case '9': return Non_souche;
      case '10': return Celibat;
      case "11": return conduire;
      case "12": return Construire;
      case "13": return Implanter;
      case "14": return Civil_regi;
      case '15': return Accesssibilite;
      case "16": 
        switch(procedureCase){
          case 'civil': return Re_construire;
          case 'service': return Re_construire;
        };
        return Re_construire;
      default: return Recognition;
    }
  };

  const getOrderedFormData = () => {
    if (!procedure) return { "Date de déclaration": new Date().toISOString().split('T')[0] };
    
    const fields = formType === 'Service' 
      ? procedure.ServiceFormFields 
      : procedure.civilFormFields;
    
    const orderedData: Record<string, any> = {
      "Date de déclaration": formData.formValues["Date de déclaration"] || new Date().toISOString().split('T')[0],
      submissionCode: generateSubmissionCode(procedure)
    };
    
    fields.forEach(field => {
      orderedData[field.label] = formData.formValues[field.label];
    });
    
    return orderedData;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    
    const submissionCode = generateSubmissionCode(procedure);
    
    // Validation plus stricte qui inclut les pièces jointes
    const validateForm = (): {
      isValid: boolean;
      missingFields: string[];
      missingDocuments: string[];
    } => {
      if (!procedure) {
        return {
          isValid: false,
          missingFields: [],
          missingDocuments: []
        };
      }
    
      // Valider les champs requis
      const expectedFields = (formType === 'Service' 
        ? procedure.ServiceFormFields 
        : procedure.civilFormFields
      ).filter(field => field.required)
       .map(field => field.label);
    
      const missingFields = expectedFields.filter(
        field => !formData.formValues[field] || formData.formValues[field] === ''
      );
    
      // Valider les pièces jointes requises
      const missingDocuments = procedure.documents.filter(
        doc => !formData.attachments[doc]
      );
    
      return {
        isValid: missingFields.length === 0 && missingDocuments.length === 0,
        missingFields,
        missingDocuments
      };
    };
  
    const validation = validateForm();
    const isComplete = validation.isValid;

    const dossierData: Dossier = {
      submissionCode,
      procedureId: procedure?.id || '',
      formType: formType as 'civil' | 'Service',
      submittedValues: formData.formValues,
      submittedDocuments: Object.keys(formData.attachments).reduce((acc, key) => {
        if (formData.attachments[key]) {
          acc[key] = formData.attachments[key].name;
        }
        return acc;
      }, {} as Record<string, string>),
      status: isComplete ? 'complete' : 'incomplete',
      createdAt: new Date().toISOString(),
      missingDocuments: validation.missingDocuments // Toujours inclus maintenant
    };
  
    setIsGenerating(true);
    
    try {
      const blob = await generateAndPreviewPdf();
      
      if (!blob) {
        throw new Error("La génération du PDF a échoué");
      }
  
      const pdfUrl = URL.createObjectURL(blob);
      setPreviewPdfUrl(pdfUrl);
  
      // Stocker le blob et le code pour le téléchargement ultérieur
      setGeneratedPdf({
        blob,
        fileName: `${procedure?.title.replace(/\s+/g, '_')}_${submissionCode}.pdf`
      });
  
      if (!isComplete) {
        setIncompleteDossiers(prev => [...prev, dossierData]);
        alert(`Votre dossier est incomplet.\n\nDocuments manquants: ${validation.missingDocuments.join(', ')}\n\nCode dossier: ${submissionCode}`);
        return;
      }
  
      setIncompleteDossiers(prev => [...prev, dossierData]);
      alert(`Dossier #${submissionCode} généré avec succès! Cliquez sur Télécharger pour obtenir votre PDF.`);
  
    } catch (err) {
      console.error("Erreur lors de la génération:", err);
      setError("Erreur lors de la génération du document");
      
      try {
        const fallbackDossier: Dossier = {
          ...dossierData,
          status: 'incomplete',
          missingDocuments: procedure?.documents || []
        };
        
        setIncompleteDossiers(prev => [...prev, fallbackDossier]);
        alert(`Un problème est survenu. Votre dossier a été sauvegardé comme brouillon (code: ${submissionCode})`);
      } catch (fallbackErr) {
        console.error("Erreur sauvegarde fallback:", fallbackErr);
        setError(`Erreur critique. Notez ces informations: ${submissionCode}`);
      }
    } finally {
      setIsGenerating(false);
    }
  };

  const handleInputChange = (fieldName: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      formValues: {
        ...prev.formValues,
        [fieldName]: value
      }
    }));
  };

  const handleDocumentsSubmit = (files: Record<string, File>) => {
    setFormData(prev => ({
      ...prev,
      attachments: {
        ...prev.attachments,
        ...files
      }
    }));
  };

  const generateAndPreviewPdf = async (): Promise<Blob> => {  
    if (!procedure) {
      throw new Error("Procedure manquante");
    }
    
    try {
      const orderedData = getOrderedFormData();
      const cleanedData = cleanDataForPdf(orderedData);
      
      const TemplateComponent = getTemplateComponent(procedure.id, procedure.category);
      const instance = pdf(
        <TemplateComponent 
          data={cleanedData} 
          procedure={procedure} 
          formType={formType}
        />
      );
      
      return await instance.toBlob();
    } catch (err) {
      console.error("Erreur génération PDF:", err);
      throw err;
    }
  };

  const closePreview = () => {
    if (previewPdfUrl) {
      URL.revokeObjectURL(previewPdfUrl);
      setPreviewPdfUrl(null);
    }
  };


  const formFields = formType === 'Service' ? procedure?.ServiceFormFields : procedure?.civilFormFields;
  const [generatedPdf, setGeneratedPdf] = useState<{ blob: Blob; fileName: string;} | null>(null);

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">{procedure?.title} - {formType === 'Service' ? 'Société' : 'Civil'}</h2>
        
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <input 
            type="hidden" 
            value={formData.formValues["Date de déclaration"]}
            onChange={(e) => handleInputChange("Date de déclaration", e.target.value)}
          />
          
          {formFields?.map((field, index) => (
            <div key={index} className="mb-4">
              <label className="block text-gray-700 mb-1">
                {field.label}
                {field.required && <span className="text-red-500 ml-1">*</span>}
              </label>

              {field.type === 'select' && field.options ? (
                <>
                  <select
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required={field.required}
                    value={formData.formValues[field.label] || ''}
                    onChange={(e) => handleInputChange(field.label, e.target.value)}
                  >
                    <option value="">Sélectionnez...</option>
                    {field.options.map((option, i) => (
                      <option key={i} value={option}>{option}</option>
                    ))}
                  </select>
                  {field.showIf && formData.formValues[field.label] === field.showIf.value && (
                    <div className="mt-2">
                      <input
                        type="text"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={formData.formValues[field.showIf.field] || ''}
                        onChange={(e) => {
                          if (field.showIf) {
                            handleInputChange(field.showIf.field, e.target.value);
                          }
                        }}
                        placeholder={`Précisez ${field.label.toLowerCase()}`}
                      />
                    </div>
                  )}
                </>
              ) : field.type === 'date' ? (
                <input
                  type="date"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required={field.required}
                  value={formData.formValues[field.label] || ''}
                  onChange={(e) => handleInputChange(field.label, e.target.value)}
                />
              ) : (
                <input
                  type={field.type}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required={field.required}
                  value={formData.formValues[field.label] || ''}
                  onChange={(e) => handleInputChange(field.label, e.target.value)}
                />
              )}
            </div>
          ))}

          <div className="flex justify-end gap-2 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400"
            >
              Annuler
            </button>
            <button
              type="button"
              onClick={() => setShowDocumentsModal(true)}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 relative"
            >
              Pièces jointes
              {Object.keys(formData.attachments).length > 0 && (
                <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {Object.keys(formData.attachments).length}
                </span>
              )}
            </button>
            <button 
              type="submit" 
              className={`bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2 ${
                isGenerating ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              disabled={isGenerating}
            >
              {isGenerating ? (
                <>
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Génération...
                </>
              ) : (
                'Soumettre'
              )}
            </button>
          </div>
        </form>

        {showDocumentsModal && procedure && (
              <CompleteDossierModal
                show={showDocumentsModal}
                onClose={() => setShowDocumentsModal(false)}
                dossier ={{
                  submissionCode:"",
                  procedureId: procedure.id,
                  formType: formType as 'civil' | 'Service',
                  submittedValues: formData.formValues,
                  submittedDocuments: formData.attachments,
                  status: 'incomplete',
                  missingDocuments: procedure.documents.filter(doc => !formData.attachments[doc])
                }}
                onComplete={handleDocumentsSubmit}
              />
            )}

        {previewPdfUrl && generatedPdf && (
  <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-6xl h-[90vh] flex flex-col">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">Aperçu du document</h3>
                <button 
                  onClick={closePreview}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="flex-1">
                <iframe 
                  src={previewPdfUrl}
                  className="w-full h-full border"
                  title="Aperçu du document PDF"
                />
              </div>
              <div className="mt-4 flex justify-end gap-2">
                <button
                  onClick={onClose}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400"
                >
                  Fermer
                </button>
                <button
                  onClick={() => {
                    closePreview();
                  }}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                >
                  Modifier
                </button>
                <button
                  onClick={() => {
                    saveAs(generatedPdf.blob, generatedPdf.fileName);
                  }}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
                >
                  <Download size={18} />
                  Télécharger
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const Procedures = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedProcedureId, setExpandedProcedureId] = useState<string | null>(null);
  const [modalProcedure, setModalProcedure] = useState<Procedure | null>(null);
  const [formType, setFormType] = useState<string>('');
  const [incompleteDossiers, setIncompleteDossiers] = useState<Dossier[]>([]);
  const [dossierCode, setDossierCode] = useState('');
  const [showDossierModal, setShowDossierModal] = useState(false);
  const [currentDossier, setCurrentDossier] = useState<Dossier | null>(null);

  const procedures: Procedure[] = [
    {
      id: '1',
      title: 'DECLARATION DE RECONNAISSANCE D\'ENFANT NÉ HORS MARIAGE',
      Service: 'Service technique de l\'aménagement et du développement urbain',
      steps: [
        'Remplir le formulaire de déclaration de reconnaissance.',
        'Joindre les documents nécessaires (pièce d\'identité, acte de naissance, etc.).',
        'Soumettre la demande auprès de l\'officier d\'état civil.'
      ],
      documents: [
        "Copie de la pièce d'identité du déclarant.",
        "Acte de naissance de l'enfant.",
        "Preuve de la filiation (témoin, déclaration, etc.).",
        "Justificatif de domicile du déclarant."
      ],    
      ServiceFormFields: [
        // Informations sur l'officier d'état civil
        { label: "Nom de l'officier d'état civil", type: 'text', required: true },
        { label: "Lieu de l'état civil", type: 'text', required: true },
        
        // Informations sur le déclarant (père)
        { label: 'Nom du déclarant', type: 'text', required: true },
        { label: 'Date de naissance du déclarant', type: 'date', required: true },
        { label: 'Lieu de naissance du déclarant', type: 'text', required: true },
        { label: 'Nom du père du déclarant', type: 'text', required: true },
        { label: 'Nom de la mère du déclarant', type: 'text', required: true },
        { label: 'Document de référence (CNI / passeport / acte de naissance)', type: 'file', required: true },
        { label: 'Profession du déclarant', type: 'text', required: true },
        { label: 'Téléphone du déclarant', type: 'tel', required: true },
        
        // Informations sur l'enfant
        { label: 'Nom de l\'enfant', type: 'text', required: true },
        { label: 'Date de naissance de l\'enfant', type: 'date', required: true },
        { label: 'Lieu de naissance de l\'enfant', type: 'text', required: true },
        { label: 'Nom du père', type: 'text', required: true },
        { label: 'Nom de la mère', type: 'text', required: true },
        
        // Informations sur la mère
        { label: 'Date de naissance de la mère', type: 'date', required: true },
        { label: 'Lieu de naissance de la mère', type: 'text', required: true },
        { label: 'Nationalité de la mère', type: 'text', required: true },
        { label: 'Profession de la mère', type: 'text', required: true },
        { label: 'Document de référence de la mère (CNI / passeport / acte de naissance)', type: 'file', required: true },
        
        // Informations sur les grands-parents maternels
        { label: 'Nom du grand-père maternel', type: 'text', required: true },
        { label: 'Nationalité du grand-père maternel', type: 'text', required: true },
        { label: 'Nom de la grand-mère maternelle', type: 'text', required: true },
        { label: 'Nationalité de la grand-mère maternelle', type: 'text', required: true },
        
        // Témoins
        { label: 'Nom du témoin 1', type: 'text', required: true },
        { label: 'Date de naissance du témoin 1', type: 'date', required: true },
        { label: 'Lieu de naissance du témoin 1', type: 'text', required: true },
        { label: 'Profession du témoin 1', type: 'text', required: true },
        { label: 'Nationalité du témoin 1', type: 'text', required: true },
        { label: 'CNI du témoin 1', type: 'file', required: true },
        
        { label: 'Nom du témoin 2', type: 'text', required: true },
        { label: 'Date de naissance du témoin 2', type: 'date', required: true },
        { label: 'Lieu de naissance du témoin 2', type: 'text', required: true },
        { label: 'Profession du témoin 2', type: 'text', required: true },
        { label: 'Nationalité du témoin 2', type: 'text', required: true },
        { label: 'CNI du témoin 2', type: 'file', required: true },
        
      ],
      civilFormFields: [
        // Version simplifiée pour les particuliers
        // Informations sur l'officier d'état civil
        { label: "Nom de l'officier d'état civil", type: 'text', required: true },
        { label: "Lieu de l'état civil", type: 'text', required: true },
        
        // Informations sur le déclarant (père)
        { label: 'Nom du déclarant', type: 'text', required: true },
        { label: 'Date de naissance du déclarant', type: 'date', required: true },
        { label: 'Lieu de naissance du déclarant', type: 'text', required: true },
        { label: 'Nom du père du déclarant', type: 'text', required: true },
        { label: 'Nom de la mère du déclarant', type: 'text', required: true },
        { label: 'Document de référence (CNI / passeport / acte de naissance)', type: 'file', required: true },
        { label: 'Profession du déclarant', type: 'text', required: true },
        { label: 'Téléphone du déclarant', type: 'tel', required: true },
        
        // Informations sur l'enfant
        { label: 'Nom de l\'enfant', type: 'text', required: true },
        { label: 'sexe', type: 'text', required: true },
        { label: 'Date de naissance de l\'enfant', type: 'date', required: true },
        { label: 'Lieu de naissance de l\'enfant', type: 'text', required: true },
        { label: 'Nom du père', type: 'text', required: true },
        { label: 'Nom de la mère', type: 'text', required: true },
        
        // Informations sur la mère
        { label: 'Date de naissance de la mère', type: 'date', required: true },
        { label: 'Lieu de naissance de la mère', type: 'text', required: true },
        { label: 'Nationalité de la mère', type: 'text', required: true },
        { label: 'Profession de la mère', type: 'text', required: true },
        { label: 'Document de référence de la mère (CNI / passeport / acte de naissance)', type: 'file', required: true },
        
        // Informations sur les grands-parents maternels
        { label: 'Nom du pere de la fille ', type: 'text', required: true },
        { label: 'Nationalité', type: 'text', required: true },
        { label: 'Nom de la mère de la fille', type: 'text', required: true },
        { label: 'Nationalité ', type: 'text', required: true },
        
        // Témoins
        { label: 'Nom du témoin 1', type: 'text', required: true },
        { label: 'Date de naissance du témoin 1', type: 'date', required: true },
        { label: 'Lieu de naissance du témoin 1', type: 'text', required: true },
        { label: 'Profession du témoin 1', type: 'text', required: true },
        { label: 'Nationalité du témoin 1', type: 'text', required: true },
        { label: 'CNI du témoin 1', type: 'file', required: true },
        
        { label: 'Nom du témoin 2', type: 'text', required: true },
        { label: 'Date de naissance du témoin 2', type: 'date', required: true },
        { label: 'Lieu de naissance du témoin 2', type: 'text', required: true },
        { label: 'Profession du témoin 2', type: 'text', required: true },
        { label: 'Nationalité du témoin 2', type: 'text', required: true },
        { label: 'CNI du témoin 2', type: 'file', required: true },
      ],
      lastUpdated: '2025-03-15',
      category:"civil"
    },
    {
      id: '2',
      title: 'DÉCLARATION DE DÉCÈS',
      Service: 'Service technique de l’état civil',
      steps: [
          'Remplir le formulaire de déclaration de décès.',
          'Joindre les documents nécessaires (acte de naissance, pièce d\'identité, etc.).',
          'Soumettre la demande auprès de l\'officier d\'état civil.'
      ],
      documents: [
          "Acte de naissance du défunt.",
          "Copie de la pièce d'identité du déclarant.",
          "Justificatif de domicile du déclarant.",
          "Certificat médical de décès (si disponible)."
      ],
      ServiceFormFields: [
          { label: 'Nom du défunt', type: 'text', required: true },
          { label: 'Date de décès', type: 'date', required: true },
          { label: 'Lieu de décès', type: 'text', required: true },
          { label: 'Nom du déclarant', type: 'text', required: true },
          { label: 'Document de référence (CNI / acte de décès)', type: 'file', required: true },
          { label: 'Profession du déclarant', type: 'text', required: true },
          { label: 'Téléphone du déclarant', type: 'tel', required: true },
          { label: 'Nationalité du défunt', type: 'text', required: true },
          { label: 'Signature du déclarant', type: 'text', required: true },
          { label: 'Date de naissance du défunt', type: 'date', required: true },
          { label: 'Nom de la mère du défunt', type: 'text', required: true },
          { label: 'Nom du père du défunt', type: 'text', required: true }
      ],
      civilFormFields: [
        { label: "Noms du défunt", type: 'text', required: true },
        { label: "Prénoms du défunt", type: 'text', required: true },
        { 
          label: "Sexe du défunt", 
          type: 'select', 
          options: ["Masculin / Male", "Féminin / Female"], 
          required: true 
        },
        { label: "Date de naissance du défunt", type: 'date', required: true },
        { label: "Age du défunt", type: 'text', required: false },
        { label: "Lieu de naissance du défunt", type: 'text', required: true },
        { label: "Nationalité du défunt", type: 'text', required: true },
        { label: "Numéro CNI du défunt", type: 'text', required: false },
        { label: "Profession du défunt", type: 'text', required: false },
        { label: "Domicile du défunt", type: 'text', required: true },
        { 
          label: "Statut matrimonial du défunt", 
          type: 'select', 
          options: [
            "Célibataire/Single", 
            "Marié(e) / Married", 
            "Divorcé(e)/Divorced", 
            "Veuf(ve)/Widow"
          ], 
          required: true 
        },
  
        // Section 2 - Informations sur le décès
        { label: "Date de décès", type: 'date', required: true },
        { label: "Heure de décès", type: 'text', required: false },
        { label: "Lieu du décès", type: 'text', required: true },
        { 
          label: "Site du décès", 
          type: 'select', 
          options: [
            "Hôpital/hospital", 
            "Communauté/community", 
            "Prison", 
            "Voie publique/road place",
            "Lieu de travail/work place",
            "Autre/others"
          ], 
          required: true 
        },
        { 
          label: "Circonstances du décès", 
          type: 'select', 
          options: [
            "Maladie / Illness", 
            "Accident/Accident", 
            "Agression physique/Assault", 
            "Suicide/Suicide",
            "Guerre/War",
            "catastrophe naturelle/natural disaster",
            "Autre (à préciser)/others (please specify)"
          ], 
          required: true 
        },
  
        // Section 3 - Informations sur le déclarant
        { label: "Noms et prénoms du déclarant", type: 'text', required: true },
        { label: "Qualité du déclarant", type: 'text', required: true },
        { label: "Contact du déclarant", type: 'tel', required: true },
        { label: "Pièce d'identité du déclarant", type: 'file', required: true },
  
        // Section 4 - Officier d'état civil
        { label: "Nom de l'officier d'état civil", type: 'text', required: true },
        { label: "Qualité de l'officier", type: 'text', required: true },
        { label: "Centre d'état civil", type: 'text', required: true },
      ],
      lastUpdated: '2025-03-15',
      category:'civil'
  },  
  {
    id: '3',
    title: 'DÉCLARATION DE NAISSANCE',
    Service: 'Service des affaires sociales',
    steps: [
        'Remplir le formulaire de déclaration de naissance.',
        'Joindre les documents nécessaires (acte de mariage, pièce d\'identité, etc.).',
        'Soumettre la demande auprès de l\'officier d\'état civil.'
    ],
    documents: [
        "Acte de mariage des parents (le cas échéant).",
        "Copie de la pièce d'identité de la mère.",
        "Certificat médical de naissance (si disponible).",
        "Justificatif de domicile des parents."
    ],
    ServiceFormFields: [
        { label: 'Nom de l\'enfant', type: 'text', required: true },
        { label: 'Prénoms de l\'enfant', type: 'text', required: true },
        { label: 'Date de naissance', type: 'date', required: true },
        { label: 'Lieu de naissance (Ville/Village)', type: 'text', required: true },
        { label: 'Sexe', type: 'select', options: ['Masculin', 'Féminin'], required: true },
        { label: 'Type de naissance', type: 'text', required: true },
        { label: 'Rang de naissance', type: 'number', required: true },
        { label: "Poids", type: 'number', required: true },
        { label: "Taille", type: 'number', required: true },
        { label: 'Personne ayant assisté à l\'accouchement', type: 'select', options: ['Médecin', 'Sage-femme', 'Infirmière', 'Accouchement à domicile', 'Aucune'], required: true }
    ],
    civilFormFields: [
      { label: "Nom de l'enfant", type: 'text', required: true },
      { label: "Prénoms de l'enfant", type: 'text', required: true },
      { label: "Date de naissance", type: 'date', required: true },
      { label: "Lieu de naissance", type: 'text', required: true },
      { 
        label: "Sexe", 
        type: 'select', 
        options: ["Masculin", "Féminin"], 
        required: true 
      },
      { 
        label: "Type de naissance", 
        type: 'select', 
        options: ["Vaginal", "Césarienne","Baignoire"], 
        required: true 
      },
      { 
        label: "Rang de naissance", 
        type: 'select', 
        options: ["Ainé (e)", "Cadet (te)","Benjamins/ Benjamines","Enfants de Milieu"], 
        required: true 
      },
      { 
        label: "Assistant à l'accouchement", 
        type: 'select', 
        options: ["Médecin/Doctor", "Sage femme/Midwife","Infirmière/Nurse","Accouchement à domicile/Home birth","Aucune/None"], 
        required: true 
      },
      { label: 'Poids de l\'enfant (kg)', type: 'number', required: true },
      { label: 'Taille de l\'enfant (cm)', type: 'number', required: true },
      { label: "Nom et prénoms de la mère", type: 'text', required: true },
      { label: "Date de naissance mère", type: 'date', required: true },
      { label: "Lieu de naissance mère", type: 'text', required: true },
      { label: "Domicile mère", type: 'text', required: true },
      { label: "Durée résidence mère", type: 'text', required: false },
      { label: "Profession mère", type: 'text', required: false },
      { label: "Contact mère", type: 'tel', required: true },
      { 
        label: "Situation matrimoniale mère", 
        type: 'select', 
        options: ["Mariée/Maried", "Divorcée/Divorced","Veuve/Widow","Célibataire/Single"], 
        required: true 
      },
      { 
        label: "Niveau scolaire mère", 
        type: 'select', 
        options: ["Primaire/Primary", "Secondaire/Secondary","Supérieur/Higher","Sans/None"], 
        required: true 
      },
      { label: "Nationalité mère", type: 'text', required: false },
      { label: "CNI mère", type: 'text', required: false },
      { label: "Nombre enfants vivants", type: 'text', required: false },
      { label: "Nombre décès foetaux", type: 'text', required: false },
      { label: "Date dernier décès", type: 'text', required: false },
    
      { label: "Nom et prénoms du père", type: 'text', required: false },
      { label: "Date de naissance père", type: 'date', required: false },
      { label: "Lieu de naissance père", type: 'text', required: false },
      { label: "Domicile père", type: 'text', required: false },
      { label: "Contact père", type: 'tel', required: false },
      { label: "Profession père", type: 'text', required: false },
      { 
        label: "Niveau scolaire père", 
        type: 'select', 
        options: ["Primaire/Primary", "Secondaire/Secondary","Supérieur/Higher","Sans/None"], 
        required: true 
      },
      { label: "Nationalité père", type: 'text', required: false },
      { label: "CNI père", type: 'text', required: false },
      { label: "Nom et prénoms déclarant", type: 'text', required: false },
      { label: "Qualité déclarant", type: 'text', required: false },
      { label: "Contact déclarant", type: 'text', required: false },
      ],
    lastUpdated: '2025-03-15',
    category:'civil'
},
{
  id: '4',
  title: 'EXTRAIT D\'ACTE DE NAISSANCE',
  Service: 'Service technique de l’état civil',
  steps: [
    'Remplir le formulaire de demande d\'extrait d\'acte de naissance.',
    'Fournir les documents suivants :',
    'Présenter une pièce d\'identité valide.',
    'Fournir une copie de l\'acte de naissance si disponible.',
    'Soumettre le formulaire et les documents au Service concerné.',
    'Attendre la délivrance de l\'extrait.'
],
documents:  [
    'Formulaire de demande dûment rempli',
    'Copie de la pièce d\'identité du déclarant',
    'Justificatif de domicile (si nécessaire)',
    'Copie de l\'acte de naissance (si disponible)'
  ],
  ServiceFormFields: [
      { label: 'Nom de la société', type: 'text', required: true },
      { label: 'Numéro d\'identification fiscale', type: 'text', required: true },
      { label: 'Adresse de la société', type: 'text', required: true },
      { label: 'Date de création de la société', type: 'date', required: true },
      { label: 'Nom du représentant légal', type: 'text', required: true },
      { label: 'Contact du représentant légal', type: 'tel', required: true }
  ],
  civilFormFields: [
    { label: "Nom de l'enfant", type: 'text', required: true },
    { label: "Date de naissance", type: 'date', required: true },
    { label: "Lieu de naissance", type: 'text', required: true },
    { label: "Arrondissement", type: 'text', required: true },
    { label: "Département", type: 'text', required: true },
    { label: "Région", type: 'text', required: true },
    { label: "Domicile", type: 'text', required: true },
    { label: "Nom du père", type: 'text', required: true },
    { label: "Nom de la mère", type: 'text', required: true },
    ],
  lastUpdated: '2025-03-15',
  category:"civil"
},
{
  id: '5',
  title: 'ATTESTATION D\'EXISTENCE DE SOUCHE D\'ACTE DE NAISSANCE',
  Service: 'Service technique de l’état civil',
  steps: [
      'Remplir le formulaire de demande d\'attestation.',
      'Fournir les documents suivants :',
      'Présenter une pièce d\'identité valide.',
      'Fournir une copie de l\'acte de naissance si disponible.',
      'Soumettre le formulaire et les documents au Service concerné.',
      'Attendre la délivrance de l\'attestation.'
  ],
  documents:  [
      'Formulaire de demande dûment rempli',
      'Copie de la pièce d\'identité du déclarant',
      'Copie de l\'acte de naissance (si disponible)',
      'Justificatif de domicile (si nécessaire)'
  ],
  ServiceFormFields: [
      { label: 'Nom de la société', type: 'text', required: true },
      { label: 'Numéro d\'identification fiscale', type: 'text', required: true },
      { label: 'Adresse de la société', type: 'text', required: true },
      { label: 'Date de création de la société', type: 'date', required: true },
      { label: 'Nom du représentant légal', type: 'text', required: true },
      { label: 'Contact du représentant légal', type: 'tel', required: true }
  ],
  civilFormFields: [
    { label: 'Numéro d\'acte de naissance', type: 'text', required: true },
    { label: 'Date de dressage de l\'acte', type: 'date', required: true },
    { label: 'Lieu', type: 'text', required: true },
    { label: 'Nom de l\'enfant', type: 'text', required: true },
    { label: 'Date de naissance de l\'enfant', type: 'date', required: true },
    { label: 'Lieu de naissance de l\'enfant', type: 'text', required: true },
    { label: 'Nom du père', type: 'text', required: true },
    { label: 'Nom de la mère', type: 'text', required: true },
    { label: 'Date de signature de la copie', type: 'date', required: true },
  ],
  lastUpdated: '2024-03-15',
  category:'civil'
},
    {
      id: '6',
      title: 'DEMANDE DE CERTIFICAT D\'URBANISME',
      Service: 'Service technique de l’aménagement et du développement urbain',
      steps: [
        'Soumettre une demande écrite.',
        'Fournir les coordonnées du terrain.',
        'Recevoir les informations sur les règlements d\'urbanisme.'
      ],
      documents: [
        "Coordonnées du terrain.",
        "Description du projet."
      ],
      ServiceFormFields: [
        { label: "Nom de l'entreprise", type: 'text', required: true },
        { label: 'Adresse', type: 'text', required: true },
        { label: 'B.P', type: 'text', required: true },
        { label: 'Téléphone', type: 'text', required: true },
        { label: 'Email', type: 'text', required: true },
        { 
          label: 'Qualité', 
          type: 'select', 
          options: ['Propriétaire', 'Mandataire', 'Autre à préciser'], 
          required: true 
        },
        { 
          label: 'Précisez autre qualité', 
          type: 'text', 
          required: false, 
          showIf: { field: 'Qualité', value: 'Autre à préciser'}
        },
      { label: 'Nom du propriétaire (si différent du demandeur)', type: 'text', required: false },
        { label: 'Adresse du propriétaire', type: 'text', required: false },
        { label: 'B.P du propriétaire', type: 'text', required: false },
        { label: 'Téléphone du propriétaire', type: 'text', required: false },
        { label: 'Email du propriétaire', type: 'text', required: false },
        { 
          label: 'Type de projet', 
          type: 'select', 
          options: [
            'Construction : maison d\'habitation', 
            'Ouvrage commercial', 
            'Ouvrage industriel', 
            'Lotissement', 
            'Autre à préciser'
          ], 
          required: true 
        },
        { 
          label: 'Précisez autre projet', 
          type: 'text', 
          required: false, 
          showIf: { field: 'Type de projet', value: 'Autre à préciser'}
        },{ label: 'Arrondissement', type: 'text', required: true },
        { label: 'Quartier', type: 'text', required: true },
        { label: 'Lieudit', type: 'text', required: true },
        { label: 'Rue', type: 'text', required: true },
        { label: 'Titre Foncier N°', type: 'text', required: true },
        { label: 'Superficie', type: 'text', required: true },
      ],
      civilFormFields: [
        { label: 'Nom, Prénom et/ou Raison Sociale', type: 'text', required: true },
        { label: 'Adresse', type: 'text', required: true },
        { label: 'B.P', type: 'text', required: true },
        { label: 'Téléphone', type: 'text', required: true },
        { label: 'Email', type: 'text', required: true },
        { 
          label: 'Qualité', 
          type: 'select', 
          options: ['Propriétaire', 'Mandataire', 'Autre à préciser'], 
          required: true 
        },
        { 
          label: 'Précisez autre qualité', 
          type: 'text', 
          required: false, 
          showIf: { field: 'Qualité', value: 'Autre à préciser'}
        },
      { label: 'Nom du propriétaire (si différent du demandeur)', type: 'text', required: false },
        { label: 'Adresse du propriétaire', type: 'text', required: false },
        { label: 'B.P du propriétaire', type: 'text', required: false },
        { label: 'Téléphone du propriétaire', type: 'text', required: false },
        { label: 'Email du propriétaire', type: 'text', required: false },
        { 
          label: 'Type de projet', 
          type: 'select', 
          options: [
            'Construction : maison d\'habitation', 
            'Ouvrage commercial', 
            'Ouvrage industriel', 
            'Lotissement', 
            'Autre à préciser'
          ], 
          required: true 
        },
        { 
          label: 'Précisez autre projet', 
          type: 'text', 
          required: false, 
          showIf: { field: 'Type de projet', value: 'Autre à préciser'}
        },{ label: 'Arrondissement', type: 'text', required: true },
        { label: 'Quartier', type: 'text', required: true },
        { label: 'Lieudit', type: 'text', required: true },
        { label: 'Rue', type: 'text', required: true },
        { label: 'Titre Foncier N°', type: 'text', required: true },
        { label: 'Superficie', type: 'text', required: true },
      ],
      lastUpdated: '2024-03-15',
      category:"both"
    },
    {
      id: "7",
      title: "CERTIFICAT D'INDIGENCE",
      Service: "Service des affaires sociales",
      steps: [
        "Soumettre une demande écrite au Service des affaires sociales.",
        "Fournir les pièces justificatives nécessaires.",
        "Recevoir le certificat après évaluation et approbation."
      ],
      documents: [
        "Pièce d'identité du demandeur.",
        "Justificatif de domicile.",
        "Attestation de revenus ou de non-imposition."
      ],
      ServiceFormFields: [
        { label: "M./Mme/Mlle", type: "text", required: true },
        { label: "Né(e) le", type: "date", required: true },
        { label: "À", type: "text", required: true },
        { label: "Fils/Fille de", type: "text", required: true },
        { label: "Et de", type: "text", required: true },
        { label: "Profession", type: "text", required: true },
        { label: "Domicile", type: "text", required: true }
      ],
      civilFormFields: [
        { label: "M./Mme/Mlle", type: "text", required: true },
        { label: "Né(e) le", type: "date", required: true },
        { label: "À", type: "text", required: true },
        { label: "Fils/Fille de", type: "text", required: true },
        { label: "Et de", type: "text", required: true },
        { label: "Profession", type: "text", required: true },
        { label: "Domicile", type: "text", required: true }
      ],
      lastUpdated: "2024-03-15",
      category:"civil"
    },        
    {
      id: "8",
      title: "ACTE DE DÉCÈS / DEATH CERTIFICATE",
      Service: "Service de l'état civil",
      steps: [
        "Soumettre une demande auprès du Service de l'état civil.",
        "Fournir les documents justificatifs requis.",
        "Obtention de l'acte de décès après validation."
      ],
      documents: [
        "Pièce d'identité du défunt.",
        "Certificat médical de décès.",
        "Justificatif de lien avec le défunt."
      ],
      ServiceFormFields: [
        { label: "Nom de l'entreprise", type: "text", required: true },
        { label: "Nom du (de la) décédé(e)", type: "text", required: true },
        { label: "Prénom du (de la) décédé(e)", type: "text", required: true },
        { label: "Date de décès", type: "date", required: true },
        { label: "Lieu du décès", type: "text", required: true },
        { label: "Sexe", type: "text", required: true },
        { label: "Situation matrimoniale", type: "text", required: true },
        { label: "Profession", type: "text", required: true },
        { label: "Domicilié(e) à", type: "text", required: true },
        { label: "Date d'enregistrement", type: "date", required: true },
      ],
      civilFormFields: [
        { label: "Centre d'etat civil", type: "text", required: true },
        { label: "Nom du défunt", type: "text", required: true },
        { label: "Prénom du défunt", type: "text", required: true },
        { label: "Date de décès", type: "date", required: true },
        { label: "Lieu de décès", type: "text", required: true },
        { label: "nom", type: "text", required: true },
        { label: "Date de naissance", type: "date", required: true },
        { label: "Lieu de naissance", type: "text", required: true },
        { 
          label: "Sexe", 
          type: "select", 
          options: ["Masculin", "Féminin"], 
          required: true 
        },
        { 
          label: "Situation matrimoniale", 
          type: "select", 
          options: ["Célibataire", "Marié(e)", "Divorcé(e)", "Veuf(ve)"], 
          required: true 
        },
        { label: "Profession", type: "text", required: true },
        { label: "Domicile", type: "text", required: true },
        { label: "Fils/Fille de", type: "text", required: true },
        { label: "Et de", type: "text", required: true },
    
        { label: "Date de dressage", type: "date", required: true },
        { label: "Nom du déclarant", type: "text", required: true },
        { label: "Profession du déclarant", type: "text", required: true },
        { 
      label: "Qualité du déclarant", 
      type: "select", 
      options: ["Chef de famille", "Parent du défunt", "Personne ayant eu connaissance certaine du décès", "Chef d'établissement hospitalier ou penitentiaire"], 
      required: true 
    },
    { label: "Nom témoin 1", type: "text", required: true },
    { label: "Profession témoin 1", type: "text", required: true },
    { label: "Résidence témoin 1", type: "text", required: true },
    { label: "Nom témoin 2", type: "text", required: true },
    { label: "Profession témoin 2", type: "text", required: true },
    { label: "Résidence témoin 2", type: "text", required: true },
    
    { label: "Numéro d'acte", type: "text", required: true },
    { label: "Officier d'état civil", type: "text", required: true },
    { label: "Secrétaire d'état civil", type: "text", required: true },
    ],
      lastUpdated: "2024-03-19",
      category:"civil"
    },
    {
      id: "9",
      title: "CERTIFICAT DE NON EXISTENCE DE SOUCHE D'ACTE DE NAISSANCE",
      Service: "Service des affaires générales",
      steps: [
        "Faire une demande auprès du Service de l'état civil.",
        "Vérification dans le registre d'État Civil.",
        "Délivrance du certificat si aucune souche n'existe."
      ],
      documents: [
        "Pièce d'identité du demandeur.",
        "Justificatif de lien avec la personne concernée.",
        "Demande écrite précisant les informations de naissance."
      ],
      ServiceFormFields: [
        { label: "Nom de l'entreprise", type: "text", required: true },
        { label: "Raison sociale", type: "text", required: true },
        { label: "Numéro d'enregistrement", type: "text", required: true },
        { label: "Adresse de l'entreprise", type: "text", required: true },
        { label: "Nom du représentant légal", type: "text", required: true },
        { label: "Téléphone du représentant légal", type: "text", required: true },
        { label: "Email du représentant légal", type: "text", required: false },
        { label: "Motif de la demande", type: "textarea", required: true }
      ],
      civilFormFields: [
        { label: 'Nom de l\'officier', type: "text", required: true },
        { label: 'Nom de la personne', type: "text", required: true },
      ],
      lastUpdated: "2024-03-19",
      category:"civil"
    },
    {
      id: "10",
      title: "CERTIFICAT DE CÉLIBAT",
      Service: "Service de l'état civil",
      steps: [
        "Faire une demande auprès du Service compétent.",
        "Fournir les pièces justificatives.",
        "Déclaration sous serment devant témoins.",
        "Émission du certificat de célibat."
      ],
      documents: [
        "Pièce d'identité du demandeur.",
        "Déclarations de témoins.",
        "Justificatif de domicile.",
        "Acte de naissance."
      ],
      ServiceFormFields: [ ],
      civilFormFields: [
        { label: "Nom du responsable", type: "text", required: true },
        { label: "Nom du demandeur", type: "text", required: true },
        { label: "Prénom du demandeur", type: "text", required: true },
        { label: "Date de naissance", type: "date", required: true },
        { label: "Lieu de naissance", type: "text", required: true },
        { label: "Nom du père", type: "text", required: true },
        { label: "Nom de la mère", type: "text", required: true },
        { label: "Domicile du demandeur", type: "text", required: true },
        { label: "Nationalité", type: "text", required: true },
        { label: "Nom du premier témoin", type: "text", required: true },
        { label: "No CNI du premier témoin", type: "text", required: true },
        { label: "Profession du premier témoin", type: "text", required: true },
        { label: "Domicile du premier témoin", type: "text", required: true },
        { label: "Nom du deuxième témoin", type: "text", required: true },
        { label: "No CNI du deuxième témoin", type: "text", required: true },
        { label: "Profession du deuxième témoin", type: "text", required: true },
        { label: "Domicile du deuxième témoin", type: "text", required: true }
      ],
      lastUpdated: "2024-03-19",
      category:'civil'
    },
    {
      id: "11",
      title: "DEMANDE DE PERMIS DE CONDUIRE",
      Service: "Service des Permis de Conduire",
      steps: [
        "Remplir le formulaire de demande.",
        "Fournir les pièces justificatives (photo d'identité, pièce d'identité, etc.).",
        "Passer un examen médical si nécessaire.",
        "Passer l'examen théorique et pratique.",
        "Émission du permis de conduire."
      ],
      documents: [
        "Pièce d'identité du demandeur.",
        "Justificatif de domicile.",
        "Certificat médical (si applicable).",
        "Photos d'identité récentes.",
        "Examen théorique réussi (si applicable).",
        "Examen pratique réussi."
      ],
      ServiceFormFields: [
        { label: "Nom de l'entreprise", type: "text", required: true },
        { label: "Nom&Prénom du demandeur", type: "text", required: true },
        { label: "Date de naissance", type: "date", required: true },
        { label: "Lieu de naissance", type: "text", required: true },
        { label: "Adresse du demandeur", type: "text", required: true },
        { label: "Numéro de téléphone", type: "text", required: true },
        { label: "Adresse email", type: "email", required: true },
        { label: "Type de permis demandé", type: "select", options: ["Permis de voiture", "Permis moto", "Permis poids lourd"], required: true },
        { label: "Certificat médical", type: "file", required: false }
      ],
      civilFormFields: [
        { label: "Nom du demandeur", type: "text", required: true },
        { label: "Prénom du demandeur", type: "text", required: true },
        { label: "Date de naissance", type: "date", required: true },
        { label: "Lieu de naissance", type: "text", required: true },
        { label: "Adresse du demandeur", type: "text", required: true },
        { label: "Numéro de téléphone", type: "text", required: true },
        { label: "Adresse email", type: "email", required: true },
        { label: "Type de permis demandé", type: "select", options: ["Permis de voiture", "Permis moto", "Permis poids lourd"], required: true },
        { label: "Certificat médical", type: "file", required: false },
        { label: "Nom du père", type: "text", required: false },
        { label: "Nom de la mère", type: "text", required: false },
        { label: "Nationalité", type: "text", required: true },
        { label: "Numéro de la pièce d'identité", type: "text", required: true }
      ],
      lastUpdated: "2024-03-19",
      category:"both"
    },
    {
        id: "12",
        title: "DEMANDE DE PERMIS DE CONSTRUIRE",
        Service: "Service de Contrôle des Dépenses",
        steps: [
          "Évaluation des besoins de la communauté.",
          "Élaboration de plans de projet.",
          "Mise en œuvre et suivi des projets.",
          "Soumettre la demande de permis de construire.",
          "Examen et validation de la demande par les autorités compétentes.",
          "Délivrance du permis de construire."
        ],
        documents: [
          "Plans de projet.",
          "Justificatif de financement.",
          "Titre de propriété du terrain.",
          "Certificat d'urbanisme.",
          "Déclaration préalable des travaux."
        ],
        ServiceFormFields: [
          { label: "Nom de l'entreprise", type: "text", required: true },
    { label: "Adresse", type: "text", required: true },
    
    { label: "Situation terrain", type: "text", required: true },
    { label: "Cadastre", type: "text", required: true },
    { label: "Propriétaire si différent", type: "text", required: false },
    { 
      label: "Dans lotissement", 
      type: "select", 
      options: ["Oui", "Non"], 
      required: true 
    },
    { label: "Servitudes", type: "text", required: false },
    
    { 
      label: "Nature travaux", 
      type: "multiselect", 
      options: [
        "Construction", "Surélévation", "Addition", "Modification",
        "Distribution", "Façade", "Annexe", "Clôture",
        "Usage d'habitation", "Industrie", "Commerce", "Bureau",
        "Agricole", "Bâtiment", "Public"
      ], 
      required: true 
    },
    { label: "Matériaux", type: "text", required: true },
    { label: "Accord préalable", type: "text", required: false },
    { 
      label: "Qualité demandeur", 
      type: "select", 
      options: ["Propriétaire", "Mandataire", "Locataire"], 
      required: true 
    },
    
    { label: "Appellation lotissement", type: "text", required: false },
    { label: "Texte autorisation lotissement", type: "text", required: false },
    { label: "Numéro lot", type: "text", required: false },
    { label: "Date approbation lotissement", type: "date", required: false },
    { label: "Montant travaux", type: "text", required: true },
    
    { label: "Architecte responsable", type: "text", required: false },
    
    { 
      label: "Mode financement", 
      type: "select", 
      options: ["personnel", "prêt"], 
      required: true 
    },
    { label: "Organisme prêteur", type: "text", required: false },
    
    { label: "Lieu date signature", type: "text", required: true },
  ],
        civilFormFields: [
          { label: "Noms et prénoms", type: "text", required: true },
    { label: "Adresse", type: "text", required: true },
    
    { label: "Situation terrain", type: "text", required: true },
    { label: "Cadastre", type: "text", required: true },
    { label: "Propriétaire si différent", type: "text", required: false },
    { 
      label: "Dans lotissement", 
      type: "select", 
      options: ["Oui", "Non"], 
      required: true 
    },
    { label: "Servitudes", type: "text", required: false },
    
    { 
      label: "Nature travaux", 
      type: "multiselect", 
      options: [
        "Construction", "Surélévation", "Addition", "Modification",
        "Distribution", "Façade", "Annexe", "Clôture",
        "Usage d'habitation", "Industrie", "Commerce", "Bureau",
        "Agricole", "Bâtiment", "Public"
      ], 
      required: true 
    },
    { label: "Matériaux", type: "text", required: true },
    { label: "Accord préalable", type: "text", required: false },
    { 
      label: "Qualité demandeur", 
      type: "select", 
      options: ["Propriétaire", "Mandataire", "Locataire"], 
      required: true 
    },
    
    { label: "Appellation lotissement", type: "text", required: false },
    { label: "Texte autorisation lotissement", type: "text", required: false },
    { label: "Numéro lot", type: "text", required: false },
    { label: "Date approbation lotissement", type: "date", required: false },
    { label: "Montant travaux", type: "text", required: true },
    
    { label: "Architecte responsable", type: "text", required: false },
    
    { 
      label: "Mode financement", 
      type: "select", 
      options: ["personnel", "prêt"], 
      required: true 
    },
    { label: "Organisme prêteur", type: "text", required: false },
    
    { label: "Lieu date signature", type: "text", required: true },
  ],
        lastUpdated: "2024-03-15",
        category:"both"
      },
      {
        id:"13",
        title: "DEMANDE DE PERMIS D'IMPLANTER",
        Service: "Service de Contrôle des Dépenses",
        steps: [
          "Évaluation des besoins de la communauté.",
          "Élaboration de plans de projet.",
          "Mise en œuvre et suivi des projets.",
          "Soumettre la demande de permis d'implanter.",
          "Examen et validation de la demande par les autorités compétentes.",
          "Délivrance du permis d'implanter."
        ],
        documents: [
          "Plans de projet.",
          "Justificatif de financement.",
          "Titre de propriété du terrain.",
          "Certificat d'urbanisme.",
          "Déclaration préalable des travaux."
        ],
        ServiceFormFields: [
          { label: "Nom de l'entreprise", type: "text", required: true },
    { label: "Adresse", type: "text", required: true },
    
    { label: "Situation terrain", type: "text", required: true },
    { label: "Cadastre", type: "text", required: true },
    { label: "Propriétaire si différent", type: "text", required: false },
    { 
      label: "Dans lotissement", 
      type: "select", 
      options: ["Oui", "Non"], 
      required: true 
    },
    { label: "Servitudes", type: "text", required: false },
    
    { 
      label: "Nature travaux", 
      type: "multiselect", 
      options: [
        "Construction", "Surélévation", "Addition", "Modification",
        "Distribution", "Façade", "Annexe", "Clôture",
        "Usage d'habitation", "Industrie", "Commerce", "Bureau",
        "Agricole", "Bâtiment", "Public"
      ], 
      required: true 
    },
    { label: "Matériaux", type: "text", required: true },
    { label: "Accord préalable", type: "text", required: false },
    { 
      label: "Qualité demandeur", 
      type: "select", 
      options: ["Propriétaire", "Mandataire", "Locataire"], 
      required: true 
    },
    
    { label: "Appellation lotissement", type: "text", required: false },
    { label: "Texte autorisation lotissement", type: "text", required: false },
    { label: "Numéro lot", type: "text", required: false },
    { label: "Date approbation lotissement", type: "date", required: false },
    { label: "Montant travaux", type: "text", required: true },
    
    { label: "Architecte responsable", type: "text", required: false },
    
    { 
      label: "Mode financement", 
      type: "select", 
      options: ["personnel", "prêt"], 
      required: true 
    },
    { label: "Organisme prêteur", type: "text", required: false },
    
    { label: "Lieu date signature", type: "text", required: true },
  ],
        civilFormFields: [
          { label: "Noms et prénoms", type: "text", required: true },
    { label: "Adresse", type: "text", required: true },
    
    { label: "Situation terrain", type: "text", required: true },
    { label: "Cadastre", type: "text", required: true },
    { label: "Propriétaire si différent", type: "text", required: false },
    { 
      label: "Dans lotissement", 
      type: "select", 
      options: ["Oui", "Non"], 
      required: true 
    },
    { label: "Servitudes", type: "text", required: false },
    
    { 
      label: "Nature travaux", 
      type: "multiselect", 
      options: [
        "Construction", "Surélévation", "Addition", "Modification",
        "Distribution", "Façade", "Annexe", "Clôture",
        "Usage d'habitation", "Industrie", "Commerce", "Bureau",
        "Agricole", "Bâtiment", "Public"
      ], 
      required: true 
    },
    { label: "Matériaux", type: "text", required: true },
    { label: "Accord préalable", type: "text", required: false },
    { 
      label: "Qualité demandeur", 
      type: "select", 
      options: ["Propriétaire", "Mandataire", "Locataire"], 
      required: true 
    },
    
    { label: "Appellation lotissement", type: "text", required: false },
    { label: "Texte autorisation lotissement", type: "text", required: false },
    { label: "Numéro lot", type: "text", required: false },
    { label: "Date approbation lotissement", type: "date", required: false },
    { label: "Montant travaux", type: "text", required: true },
    
    { label: "Architecte responsable", type: "text", required: false },
    
    { 
      label: "Mode financement", 
      type: "select", 
      options: ["personnel", "prêt"], 
      required: true 
    },
    { label: "Organisme prêteur", type: "text", required: false },
    
    { label: "Lieu date signature", type: "text", required: true },
  ],
        lastUpdated: "2024-03-15",
        category:'both'
      },
      {
        id: "14",
        title: "CENTRE D'ÉTAT CIVIL / CIVIL STATUS REGISTRATION CENTRE",
        Service: "Service de Contrôle des Dépenses",
        steps: [
          "Évaluation des besoins de la communauté.",
          "Élaboration de plans de projet.",
          "Mise en œuvre et suivi des projets.",
          "Soumettre la demande d'enregistrement de l'état civil.",
          "Examen et validation de la demande par les autorités compétentes.",
          "Enregistrement de l'état civil et délivrance du certificat."
        ],
        documents: [
          "Certificat de naissance de l'enfant.",
          "Pièce d'identité des parents.",
          "Acte de mariage des parents (si applicable).",
          "Justificatif de domicile."
        ],
        ServiceFormFields: [
          { label: "Nom du projet", type: "text", required: true },
          { label: "Description du projet", type: "textarea", required: true },
          { label: "Budget estimé", type: "number", required: true },
          { label: "Nom de l'architecte responsable", type: "text", required: true },
          { label: "Adresse de l'architecte", type: "text", required: true },
          { label: "Mode de financement", type: "text", required: true }
        ],
        civilFormFields: [
          // Informations sur l'enfant
    { label: "Nom du centre", type: "text", required: true },
    { label: "Nom de l'enfant", type: "text", required: true },
    { label: "Date de naissance", type: "date", required: true },
    { label: "Lieu de naissance", type: "text", required: true },
    { 
      label: "Sexe", 
      type: "select", 
      options: ["Masculin", "Féminin"], 
      required: true 
    },

    // Informations sur le père
    { label: "Nom du père", type: "text", required: true },
    { label: "Date de naissance père", type: "date", required: false },
    { label: "Lieu de naissance père", type: "text", required: false },
    { label: "Domicile père", type: "text", required: true },
    { label: "Profession père", type: "text", required: true },

    // Informations sur la mère
    { label: "Nom de la mère", type: "text", required: true },
    { label: "Date de naissance mère", type: "date", required: false },
    { label: "Lieu de naissance mère", type: "text", required: false },
    { label: "Domicile mère", type: "text", required: true },
    { label: "Profession mère", type: "text", required: true },

    // Informations sur la déclaration
    { label: "Date de déclaration", type: "date", required: true },
    { label: "Nom du déclarant", type: "text", required: true },
    { label: "Nom de l'officier", type: "text", required: true },
    { label: "Lieu de l'état civil", type: "text", required: true },
    { label: "Nom du secrétaire", type: "text", required: true },
    

    ],
        lastUpdated: "2024-03-15",
        category:'civil'
      },
      {
        id:"15",
        title: "DEMANDE DE CERTIFICAT D'ACCESSIBILITÉ",
        Service: "Exécutif municipal",
        steps: [
          "Évaluation des besoins en accessibilité pour la communauté.",
          "Élaboration du plan de projet d'accessibilité.",
          "Mise en œuvre et suivi des travaux d'accessibilité.",
          "Soumettre la demande de certificat d'accessibilité.",
          "Examen et validation de la demande par les autorités compétentes.",
          "Délivrance du certificat d'accessibilité."
        ],
        documents: [
          "Plans d'accessibilité du site.",
          "Justificatif de financement.",
          "Évaluation d'impact sur l'accessibilité.",
          "Autorisation d'occupation du domaine public (si applicable)."
        ],
        ServiceFormFields: [
          { label: "Nom du projet", type: "text", required: true },
          { label: "Description du projet d'accessibilité", type: "textarea", required: true },
          { label: "Budget estimé", type: "number", required: true },
          { label: "Nom de l'architecte responsable du projet", type: "text", required: true },
          { label: "Adresse de l'architecte", type: "text", required: true },
          { label: "Mode de financement", type: "text", required: true },
          { label: "Organisme prêteur (si applicable)", type: "text", required: false }
        ],
        civilFormFields: [
          { label: "nom et prenom du demandeur", type: "text", required: true },
          { label: "Superficie", type: "text", required: true },
          { label: "Lieu ", type: "text", required: true },
          { label: "Date de delivrance", type: "text", required: true },
          ],
        lastUpdated: "2024-03-15",
        category:"both"
    },
    {
      id: "16",
      title: "DEMANDE DE RENOUVELLEMENT DE PERMIS DE CONSTRUIRE",
      Service: "Service de Contrôle des Dépenses",
      steps: [
        "Soumettre la demande de renouvellement.",
        "Évaluation du projet de construction.",
        "Examen des documents justificatifs.",
        "Examen de la conformité du projet avec les normes en vigueur.",
        "Délivrance du permis de construire renouvelé."
      ],
      documents: [
        "Plans de projet actualisés.",
        "Justificatif de financement."
      ],
      ServiceFormFields: [
    { label: "Nom de l'entreprise", type: "text", required: true },
    { label: "Adresse", type: "text", required: true },
    
    { label: "Situation terrain", type: "text", required: true },
    { label: "Cadastre", type: "text", required: true },
    { label: "Propriétaire si différent", type: "text", required: false },
    { 
      label: "Dans lotissement", 
      type: "select", 
      options: ["Oui", "Non"], 
      required: true 
    },
    { label: "Servitudes", type: "text", required: false },
    
    { 
      label: "Nature travaux", 
      type: "multiselect", 
      options: [
        "Construction", "Surélévation", "Addition", "Modification",
        "Distribution", "Façade", "Annexe", "Clôture",
        "Usage d'habitation", "Industrie", "Commerce", "Bureau",
        "Agricole", "Bâtiment", "Public"
      ], 
      required: true 
    },
    { label: "Matériaux", type: "text", required: true },
    { label: "Accord préalable", type: "text", required: false },
    { 
      label: "Qualité demandeur", 
      type: "select", 
      options: ["Propriétaire", "Mandataire", "Locataire"], 
      required: true 
    },
    
    { label: "Appellation lotissement", type: "text", required: false },
    { label: "Texte autorisation lotissement", type: "text", required: false },
    { label: "Numéro lot", type: "text", required: false },
    { label: "Date approbation lotissement", type: "date", required: false },
    { label: "Montant travaux", type: "text", required: true },
    
    { label: "Architecte responsable", type: "text", required: false },
    
    { 
      label: "Mode financement", 
      type: "select", 
      options: ["personnel", "prêt"], 
      required: true 
    },
    { label: "Organisme prêteur", type: "text", required: false },
    
    { label: "Lieu date signature", type: "text", required: true },
  ],
      civilFormFields: [
        { label: "Noms et prénoms", type: "text", required: true },
    { label: "Adresse", type: "text", required: true },
    
    { label: "Situation terrain", type: "text", required: true },
    { label: "Cadastre", type: "text", required: true },
    { label: "Propriétaire si différent", type: "text", required: false },
    { 
      label: "Dans lotissement", 
      type: "select", 
      options: ["Oui", "Non"], 
      required: true 
    },
    { label: "Servitudes", type: "text", required: false },
    
    { 
      label: "Nature travaux", 
      type: "multiselect", 
      options: [
        "Construction", "Surélévation", "Addition", "Modification",
        "Distribution", "Façade", "Annexe", "Clôture",
        "Usage d'habitation", "Industrie", "Commerce", "Bureau",
        "Agricole", "Bâtiment", "Public"
      ], 
      required: true 
    },
    { label: "Matériaux", type: "text", required: true },
    { label: "Accord préalable", type: "text", required: false },
    { 
      label: "Qualité demandeur", 
      type: "select", 
      options: ["Propriétaire", "Mandataire", "Locataire"], 
      required: true 
    },
    
    { label: "Appellation lotissement", type: "text", required: false },
    { label: "Texte autorisation lotissement", type: "text", required: false },
    { label: "Numéro lot", type: "text", required: false },
    { label: "Date approbation lotissement", type: "date", required: false },
    { label: "Montant travaux", type: "text", required: true },
    
    { label: "Architecte responsable", type: "text", required: false },
    
    { 
      label: "Mode financement", 
      type: "select", 
      options: ["personnel", "prêt"], 
      required: true 
    },
    { label: "Organisme prêteur", type: "text", required: false },
    
    { label: "Lieu date signature", type: "text", required: true },
  ],
      lastUpdated: "2024-03-15",
      category:'both'
    },
  ];
  const handleDossierSearch = () => {
    const dossiers = incompleteDossiers.find(d => d.submissionCode === dossierCode);
    if (dossiers) {
      const procedure = procedures.find(p => p.id === dossiers.procedureId);
      if (procedure) {
        setCurrentDossier(dossiers);
        setModalProcedure(procedure);
        setFormType(dossiers.formType);
        
        if (dossiers.status === 'incomplete') {
          setShowDossierModal(true);
        } else {
          alert('Ce dossier est déjà complet');
        }
      } else {
        alert('Procédure non trouvée');
      }
    } else {
      alert('Dossier non trouvé');
    }
    setDossierCode('');
  };

  const handleCompleteDossier = (files: Record<string, File>) => {
    if (!currentDossier) return;

    // En production: envoyer les fichiers complémentaires au backend
    console.log('Documents complémentaires:', files);
    
    // Mettre à jour le dossier
    const updatedDossiers = incompleteDossiers.map(d => 
      d.submissionCode === currentDossier.submissionCode 
        ? { ...d, status: 'complete' } 
        : d
    );
    
    setIncompleteDossiers(updatedDossiers);
    setShowDossierModal(false);
    alert('Dossier complété avec succès!');
  };


  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">List des Procédures</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700">
          <Plus size={20} />
          Nouvelle Procédure
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Rechercher une procédure..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex flex-1 gap-2">
            <input
              type="text"
              placeholder="Entrez votre code dossier"
              className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={dossierCode}
              onChange={(e) => setDossierCode(e.target.value)}
            />
            <button
              onClick={handleDossierSearch}
              className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 whitespace-nowrap"
            >
              Compléter dossier
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {procedures
            .filter(proc => 
              proc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
              proc.Service.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((proc) => (
              <div key={proc.id} className="border rounded-lg overflow-hidden">
                <div 
                  className="flex flex-col md:flex-row items-start md:items-center justify-between p-4 cursor-pointer hover:bg-gray-50"
                  onClick={() => setExpandedProcedureId(expandedProcedureId === proc.id ? null : proc.id)}
                >
                  <div className="mb-2 md:mb-0">
                    <h3 className="text-lg font-medium text-gray-900">{proc.title}</h3>
                    <p className="text-sm text-gray-500">{proc.Service}</p>
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    {proc.category !== 'civil' && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setModalProcedure(proc);
                          setFormType('Service');
                        }}
                        className="bg-blue-600 text-white px-10 py-3 text-sm rounded-lg hover:bg-blue-700"
                      >
                        Société
                      </button>
                    )}
                    {proc.category !== 'service' && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setModalProcedure(proc);
                          setFormType('civil');
                        }}
                        className="bg-green-600 text-white px-10 py-3 text-sm rounded-lg hover:bg-green-700"
                      >
                        Civil
                      </button>
                    )}
                    <span className="text-xs text-gray-500">
                      MAJ: {proc.lastUpdated}
                    </span>
                    {expandedProcedureId === proc.id ? 
                      <ChevronUp size={20} /> : 
                      <ChevronDown size={20} />
                    }
                  </div>
                </div>

                {expandedProcedureId === proc.id && (
                  <div className="p-4 border-t bg-gray-50">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium mb-2">Étapes:</h4>
                        <ol className="list-decimal list-inside space-y-1">
                          {proc.steps.map((step, index) => (
                            <li key={index} className="text-gray-700 text-sm">{step}</li>
                          ))}
                        </ol>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">Documents requis:</h4>
                        <ul className="list-disc list-inside space-y-1">
                          {proc.documents.map((doc, index) => (
                            <li key={index} className="text-gray-700 text-sm">{doc}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
        </div>
      </div>

      <Modal
        show={modalProcedure !== null}
        onClose={() => setModalProcedure(null)}
        procedure={modalProcedure}
        formType={formType}
      />

<CompleteDossierModal
  show={showDossierModal}
  onClose={() => setShowDossierModal(false)}
  dossier={currentDossier}
  onComplete={handleCompleteDossier}
/>
    </div>
  );
};

export default Procedures;