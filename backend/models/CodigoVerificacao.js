const mongoose = require('mongoose');

const codigoVerificacaoSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  codigo: {
    type: String,
    required: true,
  },
  criadoEm: {
    type: Date,
    default: Date.now,
    expires: 300, 
  },
});

module.exports = mongoose.model('CodigoVerificacao', codigoVerificacaoSchema);
