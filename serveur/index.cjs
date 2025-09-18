// Dans index.js ou server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 8080;

// Configuration de MongoDB Atlas - Variable d'environnement intégrée
const MONGODB_URI = "mongodb+srv://raymonnekemayou_db_user:X6VSFxnhqxXHrBsF@cluster0.deru1gw.mongodb.net/crud?retryWrites=true&w=majority";

// Schéma pour les équipements
const EquipementSchema = new mongoose.Schema({
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
    department: {
        type: String,
        enum: [
            "Exécutif_Municipal",
            "Service_de_Recouvrement",
            "Service_de_Contrôle_des_Dépenses",
            "Service_de_la_Comptabilité_de_la_Caisse_et_de_la_Trésorerie_Communale",
            "Service_des_Affaires_Sociales",
            "Service_Hygiène_et_Salubrité_Publique",
            "Service_Technique_de_Aménagement_et_du_Développement_Urbain",
            "Service_Assiette_Fiscale",
            "Service_Financier_et_Économique"
        ],
        required: true,
    },
    status: {
        type: String,
        enum: ['available', 'in-use', 'maintenance'],
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
        enum: ['neuf', 'vieux'],
        required: true,
    }
}, {
    timestamps: true
});

// Schéma pour les employés
const EmployeeSchema = new mongoose.Schema({
    matricule: {
        type: String,
        required: true,
        unique: true
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
        enum: ["Homme", "Femme"],
        required: true,
    },
    situationMatrimoniale: {
        type: String,
        enum: ["Celibataire", "Marie", "Divorce", "Veuf/Veuve"],
        required: true,
    },
    diplome: {
        type: String,
        required: true,
    },
    contrat: {
        type: String,
        enum: ["CDI", "CDD", "Stage", "Freelance"],
        required: true,
    },
    positions: {
        type: String,
        enum: ["Director", 'Manager', 'Supervisor', 'Administrator', 'Clerk', 'Specialist', 'Analyst', 'Coordinator'],
        required: true,
    },
    service: {
        type: String,
        enum: [
            "Executif_Municipal",
            "Service_de_Recouvrement",
            "Service_de_Contrôle_des_Dépenses",
            "Service_de_la_Comptabilité_de_la_Caisse_et_de_la_Trésorerie_Communale",
            "Service_des_Affaires_Sociales",
            "Service_Hygiène_et_Salubrité_Publique",
            "Service_Technique_de_Aménagement_et_du_Développement_Urbain",
            "Service_Assiette_Fiscale",
            "Service_Financier_et_Économique"
        ],
        required: true,
    },
    statutProfessionnel: {
        type: String,
        enum: ["Fonctionnaire", "Contractuel", "Agent_Decision"],
        required: true,
    },
    grade: {
        type: String,
        required: true,
    },
    corpsMetier: {
        type: String,
        required: true,
    },
    competences: {
        type: String,
        required: true,
    },
    informationsSupplementaires: {
        type: String,
        required: true,
    }
}, {
    timestamps: true
});

// Schéma pour les procédures
const ProcedureSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    service: {
        type: String,
        required: true,
    },
    steps: {
        type: [String],
        required: true,
    },
    documents: {
        type: [String],
        required: true,
    },
    serviceFormFields: {
        type: [Object],
        required: true,
    },
    civilFormFields: {
        type: [Object],
        required: true,
    },
    lastUpdated: {
        type: Date,
        default: Date.now,
    },
    category: {
        type: String,
        enum: ['civil', 'service', 'both'],
        required: true,
    },
}, {
    timestamps: true
});

// Création des modèles
const EquipementModel = mongoose.model("Equipement", EquipementSchema);
const EmployeeModel = mongoose.model("Employee", EmployeeSchema);
const ProcedureModel = mongoose.model("Procedure", ProcedureSchema);

// ==================== ROUTES POUR EQUIPEMENTS ====================
app.get("/equipement", async (req, res) => {
    try {
        const data = await EquipementModel.find({});
        res.json({ success: true, data: data });
    } catch (error) {
        console.error("Erreur lors de la récupération des équipements:", error);
        res.status(500).json({ success: false, message: "Erreur serveur" });
    }
});

app.post("/create", async (req, res) => {
    try {
        console.log(req.body);
        const data = new EquipementModel(req.body);
        await data.save();
        res.json({ success: true, message: "Equipement créé avec succès", data: data });
    } catch (error) {
        console.error("Erreur lors de la création:", error);
        res.status(500).json({ success: false, message: "Erreur lors de la création" });
    }
});

app.put("/update", async (req, res) => {
    try {
        console.log(req.body);
        const { id, ...rest } = req.body;

        if (!id) {
            return res.status(400).json({ success: false, message: "ID requis" });
        }

        const data = await EquipementModel.findByIdAndUpdate(id, rest, { new: true });
        
        if (!data) {
            return res.status(404).json({ success: false, message: "Équipement non trouvé" });
        }

        res.json({ success: true, message: "Données mises à jour avec succès", data });
    } catch (error) {
        console.error("Erreur lors de la mise à jour:", error);
        res.status(500).json({ success: false, message: "Erreur lors de la mise à jour" });
    }
});

app.delete("/delete/:id", async (req, res) => {
    try {
        const id = req.params.id;
        console.log("ID équipement à supprimer:", id);
        
        const result = await EquipementModel.findByIdAndDelete(id);
        
        if (!result) {
            return res.status(404).json({ success: false, message: "Équipement non trouvé" });
        }
        
        res.json({ success: true, message: "Données supprimées avec succès", data: result });
    } catch (error) {
        console.error("Erreur lors de la suppression:", error);
        res.status(500).json({ success: false, message: "Erreur lors de la suppression" });
    }
});

// ==================== ROUTES POUR EMPLOYEES ====================
app.get("/employee", async (req, res) => {
    try {
        const data = await EmployeeModel.find({});
        res.json({ success: true, data: data });
    } catch (error) {
        console.error("Erreur lors de la récupération des employés:", error);
        res.status(500).json({ success: false, message: "Erreur serveur" });
    }
});

app.post("/createEmployee", async (req, res) => {
    try {
        console.log(req.body);
        const data = new EmployeeModel(req.body);
        await data.save();
        res.json({ success: true, message: "Employé créé avec succès", data: data });
    } catch (error) {
        console.error("Erreur lors de la création de l'employé:", error);
        if (error.code === 11000) {
            res.status(400).json({ success: false, message: "Ce matricule existe déjà" });
        } else {
            res.status(500).json({ success: false, message: "Erreur lors de la création" });
        }
    }
});

app.put("/updateEmployee", async (req, res) => {
    try {
        console.log(req.body);
        const { id, ...rest } = req.body;

        if (!id) {
            return res.status(400).json({ success: false, message: "ID requis" });
        }

        const data = await EmployeeModel.findByIdAndUpdate(id, rest, { new: true });
        
        if (!data) {
            return res.status(404).json({ success: false, message: "Employé non trouvé" });
        }

        res.json({ success: true, message: "Données mises à jour avec succès", data });
    } catch (error) {
        console.error("Erreur lors de la mise à jour de l'employé:", error);
        res.status(500).json({ success: false, message: "Erreur lors de la mise à jour" });
    }
});

app.delete("/deleteEmployee/:id", async (req, res) => {
    try {
        const id = req.params.id;
        console.log("ID employé à supprimer:", id);
        
        const result = await EmployeeModel.findByIdAndDelete(id);
        
        if (!result) {
            return res.status(404).json({ success: false, message: "Employé non trouvé" });
        }
        
        res.json({ success: true, message: "Données supprimées avec succès", data: result });
    } catch (error) {
        console.error("Erreur lors de la suppression:", error);
        res.status(500).json({ success: false, message: "Erreur lors de la suppression" });
    }
});

// ==================== ROUTES POUR PROCEDURES ====================
app.get('/procedures', async (req, res) => {
    try {
        const data = await ProcedureModel.find({});
        res.json({ success: true, data });
    } catch (error) {
        console.error("Erreur lors de la récupération des procédures:", error);
        res.status(500).json({ success: false, message: error.message });
    }
});

app.post('/createProcedure', async (req, res) => {
    try {
        const procedure = new ProcedureModel(req.body);
        await procedure.save();
        res.json({ success: true, message: "Procédure créée avec succès", data: procedure });
    } catch (error) {
        console.error("Erreur lors de la création de la procédure:", error);
        res.status(500).json({ success: false, message: error.message });
    }
});

app.put('/updateProcedure/:id', async (req, res) => {
    try {
        const procedure = await ProcedureModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!procedure) {
            return res.status(404).json({ success: false, message: "Procédure non trouvée" });
        }
        res.json({ success: true, message: "Procédure mise à jour avec succès", data: procedure });
    } catch (error) {
        console.error("Erreur lors de la mise à jour de la procédure:", error);
        res.status(500).json({ success: false, message: error.message });
    }
});

app.delete('/deleteProcedure/:id', async (req, res) => {
    try {
        const procedure = await ProcedureModel.findByIdAndDelete(req.params.id);
        if (!procedure) {
            return res.status(404).json({ success: false, message: "Procédure non trouvée" });
        }
        res.json({ success: true, message: "Procédure supprimée avec succès" });
    } catch (error) {
        console.error("Erreur lors de la suppression de la procédure:", error);
        res.status(500).json({ success: false, message: error.message });
    }
});

// ==================== CONNEXION BASE DE DONNÉES ====================
const connectDB = async () => {
    try {
        console.log("🔄 Tentative de connexion à MongoDB Atlas...");
        console.log("🔗 URI de connexion:", MONGODB_URI);
        
        await mongoose.connect(MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
            family: 4
        });
        
        console.log("✅ Base de données MongoDB Atlas connectée avec succès");
    } catch (error) {
        console.error("❌ Erreur de connexion à la base de données:", error.message);
        console.log("🔍 Vérifiez que:");
        console.log("   - Votre cluster MongoDB Atlas est actif");
        console.log("   - Votre adresse IP est autorisée dans les paramètres réseau d'Atlas");
        console.log("   - Vos identifiants de connexion sont corrects");
        process.exit(1);
    }
};

// Gestion des événements de connexion
mongoose.connection.on('connected', () => {
    console.log('✅ Mongoose connecté à MongoDB');
});

mongoose.connection.on('error', (err) => {
    console.error('❌ Erreur de connexion Mongoose:', err);
});

mongoose.connection.on('disconnected', () => {
    console.log('⚠️  Mongoose déconnecté');
});

// Fermeture propre de la connexion
process.on('SIGINT', async () => {
    await mongoose.connection.close();
    console.log('📴 Connexion MongoDB fermée suite à l\'arrêt de l\'application');
    process.exit(0);
});

// Démarrage du serveur
const startServer = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`🚀 Serveur Express en cours d'exécution sur le port ${PORT}`);
            console.log(`📊 Base de données: MongoDB Atlas`);
            console.log(`🔗 Point de terminaison: http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error("❌ Erreur lors du démarrage du serveur:", error.message);
        process.exit(1);
    }
};

// Gestion des erreurs non capturées
process.on('unhandledRejection', (err) => {
    console.error('❌ Erreur non gérée:', err);
    process.exit(1);
});

// Démarrage de l'application
startServer();