/*----------------------
      Nota Model
----------------------*/
const mongoose = require('mongoose');

const NotaSchema = mongoose.Schema({
    id: {type: Number, required: true},
    name: {type: String, required: true},
    dateCreated: {type: Date, default: Date.now, required: true},
    total : {type: Number, required: true},
    highlighted: {type: Boolean, default: false, required: true}
});

const Nota = mongoose.model('Nota', NotaSchema);