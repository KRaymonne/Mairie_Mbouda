export interface Employee {
  _id: string;
  matricule: string;
  nom: string;
  dateNaissance: string;
  lieuNaissance: string;
  sexe: 'Homme' | 'Femme';
  situationMatrimoniale: "Celibataire" | "Marie" | "Divorce" | "Veuf/Veuve";
  diplome: string;
  contrat: 'CDI' | 'CDD' | 'Stage' | 'Freelance';
  statutProfessionnel: "Fonctionnaire" | "Contractuel" | "Agent_Decision";
  grade: string;
  corpsMetier: string;
  competences: string;
  informationsSupplementaires: string;
  positions: "Director" | 'Manager' | 'Supervisor' | 'Administrator' | 'Clerk' | 'Specialist' | 'Analyst' | 'Coordinator';
  service: Department; // Ajoutez cette ligne
}


export interface Equipment {
  _id: string;
  code:string;
  name: string;
  type: string;
  department: Department;
  status: 'available' | 'in-use' | 'maintenance';
  assignedTo?: string;
  nombre: string;
  dateInstallation: string;
  etatBien: 'neuf'| 'vieux';
}

export interface FormField {
  label: string;
  type: string;
  required: boolean;
  options?: string[]; 
}

export interface Procedure {
  id: string;
  title: string;
  Service: string;
  documents: string[];
  steps: string[];
  lastUpdated: string;
  ServiceFormFields: FormField[]; // Utilisation du type FormField[]
  civilFormFields: FormField[];   // Utilisation du type FormField[]
}

export type Department = 
  | "Executif Municipal"
  | "Service de Recouvrement"
  | "Service de Contrôle des Dépenses"
  |"Service de la Comptabilité, de la Caisse et de la Trésorerie Communale"
  |"Service des Affaires Sociales"
  |"Service d'Hygiène et Salubrité Publique"
  | "Service Technique de l'Aménagement et du Développement Urbain"
  | "Service d'Assiette Fiscale"
  |"Service Financier et Économique";
  

  