const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EquipmentSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
    },
    code: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    departement: { type: Schema.ObjectId, ref: "departement" },
    
    status: {
        type: String,
        enum: ['available', 'in-use', 'maintenance'], // ✅ Liste des valeurs valides
        required: true,
    },
    
    assignedTo: {
        type: String,
        required: true,
    },
    
    nombre: {
        type: String,
        required: true,
    },
    
    dateInstallation: {
        type: String,
        required: true,
    },
    
    etatBien: {
        type: String,
        enum: ['neuf', 'vieux'], // ✅ Liste des états valides
        required: true,
    }
});


