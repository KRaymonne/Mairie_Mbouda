const mongoose = require("mongoose");

const DepartementSchema = mongoose.Schema({
    id: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    Service: {
        type: String,
        required: true,
    },
})