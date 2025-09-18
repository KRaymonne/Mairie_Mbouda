// Dans index.js ou server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const employee = require("./model/employee");
const equipement = require("./model/equipement");
const formfield = require("./model/formfield");
const procedure = require("./model/procedure");
const departement = require("./model/departement");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 8080
const Schema = mongoose.Schema;


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
      enum: ["Exécutif_Municipal",
    "Service_de_Recouvrement",
    "Service_de_Contrôle_des_Dépenses",
    "Service_de_la_Comptabilité_de_la_Caisse_et_de_la_Trésorerie_Communale",
    "Service_des_Affaires_Sociales",
    "Service_Hygiène_et_Salubrité_Publique",
    "Service_Technique_de_Aménagement_et_du_Développement_Urbain",
    "Service_Assiette_Fiscale",
    "Service_Financier_et_Économique"], // ✅ Liste des valeurs valides
      required: true,
  },
  
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

const EmployeeSchema = new mongoose.Schema({
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
      enum: ["Homme","Femme"],
      required: true,
  },
situationMatrimoniale: {
    type: String,
    enum: ["Celibataire","Marie","Divorce","Veuf/Veuve"],
    required: true,
},
diplome: {
    type: String,
    required: true,
},
contrat:  {
    type: String,
    enum: ["CDI","CDD","Stage","Freelance"],
    required: true,
},
positions:  {
    type: String,
    enum: ["Director",'Manager','Supervisor','Administrator','Clerk','Specialist','Analyst','Coordinator'],
    required: true,
},
service: {
    type: String,
    enum: ["Executif_Municipal",
  "Service_de_Recouvrement",
  "Service_de_Contrôle_des_Dépenses",
  "Service_de_la_Comptabilité_de_la_Caisse_et_de_la_Trésorerie_Communale",
  "Service_des_Affaires_Sociales",
  "Service_Hygiène_et_Salubrité_Publique",
  "Service_Technique_de_Aménagement_et_du_Développement_Urbain",
  "Service_Assiette_Fiscale",
  "Service_Financier_et_Économique"], 
   required: true,
},
statutProfessionnel: {
    type: String,
    enum: ["Fonctionnaire","Contractuel","Agent_Decision"],
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
}

});

const ProcedureSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
    },
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
});


// const userModel = mongoose.model("user",schemasData)
const employeeModel = mongoose.model("employee",EmployeeSchema)
const equipementModel = mongoose.model("equipement",EquipementSchema)
const procedureModel = mongoose.model('procedure',ProcedureSchema)
// const formfieldModel = mongoose.model("formfield ",formfield )
// const procedureModel = mongoose.model("procedure",procedure)
// const departementModel = mongoose.model("departement",departement)

//pour equipement

app.get("/equipement",async(req,res)=>{
  const data = await equipementModel.find({})
  res.json({sucess:true , data:data})
})
//create data
app.post("/create",async(req,res)=>{
  console.log(req.body)
   const data = new equipementModel(req.body)
   await data.save()
  res.send({sucess :true ,message:"data save sucessfully", data : data})
})
//update data
app.put("/update", async (req, res) => {
    try {
      console.log(req.body);
      const { id, ...rest } = req.body;
  
      // Vérifier si l'ID est valide
      if (!id) {
        return res.status(400).send({ success: false, message: "ID is required" });
      }
  
      // Mettre à jour l'équipement
      const data = await equipementModel.updateOne({ _id: id }, { $set: rest });
  
      if (data.nModified === 0) {
        return res.status(404).send({ success: false, message: "No equipment found to update" });
      }
  
      res.send({ success: true, message: "Data updated successfully", data });
    } catch (error) {
      console.error("Error updating equipment:", error);
      res.status(500).send({ success: false, message: "Error updating data" });
    }
  });
//delete api 
app.delete("/delete/:id",async(req,res)=>{
  
  const id = req.params.id
  console.log("id equipment deleted", id)
  // Vérifie si l'ID est valide
  try{
    const result =await equipementModel.findByIdAndDelete({ _id: id })
      res.send({sucess : true, message:"data deleted sucessfully", data : data})
  }catch(error){console.log(error)
    res.send({error : true, message:"delete failed", id})
  }
 // 
})

//pour employee

app.get("/employee", async(req,res)=>{
  const data = await employeeModel.find({})
  res.json({sucess:true , data:data})
})
//create data
app.post("/createEmployee", async(req,res)=>{
  console.log(req.body)
   const data = new employeeModel(req.body)
   await data.save()
  res.send({sucess :true ,message:"data save sucessfully", data : data})
})
//update data
app.put("/updateEmployee", async (req, res) => {
    try {
      console.log(req.body);
      const { id, ...rest } = req.body;
  
      // Vérifier si l'ID est valide
      if (!id) {
        return res.status(400).send({ success: false, message: "ID is required" });
      }
  
      // Mettre à jour l'émployee
      const data = await employeeModel.updateOne({ _id: id }, { $set: rest });
  
      if (data.nModified === 0) {
        return res.status(404).send({ success: false, message: "No employee found to update" });
      }
  
      res.send({ success: true, message: "Data updated successfully", data });
    } catch (error) {
      console.error("Error updating employee:", error);
      res.status(500).send({ success: false, message: "Error updating data" });
    }
  });
//delete api 
app.delete("/deleteEmployee/:id",async(req,res)=>{
  
    const id = req.params.id
    console.log("id employee deleted", id)
    // Vérifie si l'ID est valide
    try{
      const result =await employeeModel.findByIdAndDelete({ _id: id })
        res.send({sucess : true, message:"data deleted sucessfully", data : data})
    }catch(error){console.log(error)
      res.send({error : true, message:"delete failed", id})
    }
   // 
  })

// Importer le modèle Procedure
const Procedure = require('./model/procedure');

// Route pour obtenir toutes les procédures
app.get('/procedures', async (req, res) => {
    try {
        const data = await Procedure.find({});
        res.json({ success: true, data });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Route pour créer une nouvelle procédure
app.post('/createProcedure', async (req, res) => {
    try {
        const procedure = new Procedure(req.body);
        await procedure.save();
        res.json({ success: true, message: "Procedure created successfully", data: procedure });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Route pour mettre à jour une procédure
app.put('/updateProcedure/:id', async (req, res) => {
    try {
        const procedure = await Procedure.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!procedure) {
            return res.status(404).json({ success: false, message: "Procedure not found" });
        }
        res.json({ success: true, message: "Procedure updated successfully", data: procedure });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Route pour supprimer une procédure
app.delete('/deleteProcedure/:id', async (req, res) => {
    try {
        const procedure = await Procedure.findByIdAndDelete(req.params.id);
        if (!procedure) {
            return res.status(404).json({ success: false, message: "Procedure not found" });
        }
        res.json({ success: true, message: "Procedure deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

mongoose.connect("MONGODB_URI=mongodb+srv://raymonnekemayou_db_user:X6VSFxnhqxXHrBsF@cluster0.deru1gw.mongodb.net/crud")
.then(()=>console.log("connect DB"))
.catch((err)=> console.log(err))


app.listen(PORT,()=>console.log("server is running"))

