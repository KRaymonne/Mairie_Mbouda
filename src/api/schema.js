const mongoose = require('mongoose');

// Define Department enum values
const DepartmentEnum = [
  "Service des affaires générales",
  "Service économique et financier",
  "Service technique de l'aménagement et du développement urbain",
  "Service hygiène, salubrité",
  "Service social et culturel"
];

// Employee Schema
const employeeSchema = new mongoose.Schema({
  matricule: { type: String, required: true, unique: true },
  nom: { type: String, required: true },
  dateNaissance: { type: String, required: true },
  lieuNaissance: { type: String, required: true },
  sexe: { type: String, required: true },
  situationMatrimoniale: { type: String, required: true },
  diplome: { type: String, required: true },
  contrat: { type: String, required: true },
  statutProfessionnel: { type: String, required: true },
  grade: { type: String, required: true },
  corpsMetier: { type: String, required: true },
  competences: { type: String, required: true },
  informationsSupplementaires: { type: String, required: true },
  positions: { type: String, required: true },
  departement: { type: String, required: true, enum: DepartmentEnum }
}, { timestamps: true });

// Equipment Schema
const equipmentSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  type: { type: String, required: true },
  department: { type: String, required: true, enum: DepartmentEnum },
  status: { 
    type: String, 
    required: true, 
    enum: ['available', 'in-use', 'maintenance']
  },
  assignedTo: { type: String },
  nombre: { type: String, required: true },
  dateInstallation: { type: String, required: true },
  etatBien: { 
    type: String, 
    required: true, 
    enum: ['neuf', 'vieux']
  }
}, { timestamps: true });

// Procedure Schema
const procedureSchema = new mongoose.Schema({
  title: { type: String, required: true },
  department: { type: String, required: true, enum: DepartmentEnum },
  steps: [{ type: String, required: true }],
  lastUpdated: { type: String, required: true }
}, { timestamps: true });

// Create indexes for frequently queried fields
employeeSchema.index({ matricule: 1, departement: 1 });
equipmentSchema.index({ code: 1, department: 1, status: 1 });
procedureSchema.index({ department: 1, lastUpdated: 1 });

// Create models
const Employee = mongoose.model('Employee', employeeSchema);
const Equipment = mongoose.model('Equipment', equipmentSchema);
const Procedure = mongoose.model('Procedure', procedureSchema);

module.exports = {
  Employee,
  Equipment,
  Procedure,
  DepartmentEnum
};