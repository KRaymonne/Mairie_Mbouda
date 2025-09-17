const mongoose = require("mongoose");

const FormFieldSchema = mongoose.Schema({
 label: {
    type: String,
    required: true,
},
type:  {
    type: String,
    required: true,
},
  required:  {
    type: Boolean,
    required: true,
},
  options :  {
    type: String,
    required: true,
},
})
