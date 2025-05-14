const mongoose = require('mongoose');

const rotaSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  pontos: [{
    latitude: Number,
    longitude: Number,
    descricao: String
  }],
  colaboradorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Colaborador'
  }
});

module.exports = mongoose.model('Rota', rotaSchema);