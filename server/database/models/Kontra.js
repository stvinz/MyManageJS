/*----------------------
      Kontra Model
----------------------*/
const mongoose = require('mongoose');

const KontraSchema = mongoose.Schema({
    name: {type: String, required: true},
    dateCreated: {type: Date, default: Date.now, required: true},
    total : {type: Number, required: true},
    nota_id: {type: [mongoose.Schema.Types.ObjectId], ref: 'Nota'},
});

const Kontra = mongoose.model('Kontra', KontraSchema);