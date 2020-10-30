/*----------------------
      Nota Model
----------------------*/
const mongoose = require('mongoose');

const NotaSchema = mongoose.Schema({
    id: {type: Number, required: true, unique: true},
    name: {type: String, required: true},
    dateCreated: {type: Date, default: Date.now, required: true},
    total : {type: Number, required: true},
    highlighted: {type: Boolean, default: false, required: true},
    deleted: {type: Boolean, default: false, required: true},
    grouped: {type: Boolean, default: false, required: true},
    kontra_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Kontra', default: null}
});

const Nota = mongoose.model('Nota', NotaSchema);