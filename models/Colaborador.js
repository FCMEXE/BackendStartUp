const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { Schema } = mongoose; // Import Schema para maior clareza

const colaboradorSchema = new Schema({
  nome: {
    type: String,
    required: true
  },
  senha: {
    type: String,
    required: true
  },
  gerente: {
    type: Schema.Types.ObjectId, // Tipo ObjectId para referenciar outro documento do MongoDB
    ref: 'Gerente', // Referencia o modelo 'Gerente'
    required: true // Garante que cada colaborador esteja associado a um gerente
  },
  // Outros campos específicos do colaborador
});

colaboradorSchema.pre('save', async function(next) {
  if (!this.isModified('senha')) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.senha = await bcrypt.hash(this.senha, salt);
    next();
  } catch (error) {
    next(error);
  }
});

colaboradorSchema.methods.comparePassword = async function(candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.senha);
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = mongoose.model('Colaborador', colaboradorSchema);