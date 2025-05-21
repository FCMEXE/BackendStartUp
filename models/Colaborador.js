const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { Schema } = mongoose; // Import Schema para maior clareza

const colaboradorSchema = new Schema({
  nome: {
    type: String,
    required: true,
    unique: true, // Adicionado para garantir nomes únicos
    trim: true
  },
  senha: {
    type: String,
    required: true,
    minlength: 6 // Sugestão: Adicione um tamanho mínimo para a senha
  },
  gerente: {
    type: Schema.Types.ObjectId, // Tipo ObjectId para referenciar outro documento do MongoDB
    ref: 'Gerente', // Referencia o modelo 'Gerente' (certifique-se de ter um modelo 'Gerente.js')
    required: true // Mantenha como true se todo colaborador DEVE ter um gerente
  },
  // Outros campos específicos do colaborador
}, {
  timestamps: true // Adiciona `createdAt` e `updatedAt`
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
    // É uma boa prática lançar um erro específico ou retornar false aqui
    throw new Error('Erro ao comparar senhas.');
  }
};

module.exports = mongoose.model('Colaborador', colaboradorSchema);