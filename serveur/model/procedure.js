const mongoose = require("mongoose");

const ProcedureSchema = mongoose.Schema({

id:  {
    type: String,
    required: true,
},
title:  {
    type: String,
    required: true,
},
Service:  {
    type: String,
    required: true,
},
documents:  {
    type: String,
    required: true,
},
steps:  {
    type: String,
    required: true,
},
lastUpdated:  {
    type: String,
    required: true,
},
})