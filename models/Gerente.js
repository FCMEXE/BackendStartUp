const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); // Para hash da senha

const gerenteSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true
  },
  senha: {
    type: String,
    required: true
  }
});

// Middleware para executar antes de salvar um gerente
gerenteSchema.pre('save', async function(next) {
  if (!this.isModified('senha')) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.senha = await bcrypt.hash(this.senha, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Método para comparar a senha fornecida com a senha armazenada (hasheada)
gerenteSchema.methods.comparePassword = async function(candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.senha);
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = mongoose.model('Gerente', gerenteSchema);