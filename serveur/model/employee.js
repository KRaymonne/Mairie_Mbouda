const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const EmployeeSchema = mongoose.Schema({
id: {
    type: String,
    required: true,
},
matricule: {
    type: String,
    required: true,
},
nom: {
    type: String,
    required: true,
},
dateNaissance: {
    type: String,
    required: true,
},
lieuNaissance: {
    type: String,
    required: true,
},
sexe: {
    type: String,
    required: true,
},
situationMatrimoniale: {
    type: String,
    required: true,
},
diplome: {
    type: String,
    required: true,
},
contrat: {
    type: String,
    required: true,
},
statutProfessionnel: {
    type: String,
    required: true,
},
grade:  {
    type: String,
    required: true,
},
corpsMetier:  {
    type: String,
    required: true,
},
competences:  {
    type: String,
    required: true,
},
informationsSupplementaires: {
    type: String,
    required: true,
},
positions:  {
    type: String,
    required: true,
},
departement: { type: Schema.ObjectId, ref:"departement"},
  
})