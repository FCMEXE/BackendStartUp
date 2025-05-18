const mongoose = require('mongoose');

// Coloque sua URI do Atlas aqui (ou use variável de ambiente)
const uri = 'mongodb+srv://Felps:123@clusterfe.ze2ocxd.mongodb.net/vigilantes?retryWrites=true&w=majority';

// Defina o schema do colaborador (ajuste conforme seu modelo)
const colaboradorSchema = new mongoose.Schema({
  nome: String,
  email: String,
  cargo: String,
  criadoEm: {
    type: Date,
    default: Date.now,
  },
});

// Modelo
const Colaborador = mongoose.model('Colaborador', colaboradorSchema);

async function run() {
  try {
    await mongoose.connect(uri);
    console.log('MongoDB conectado!');

    const novoColaborador = new Colaborador({
      nome: 'Teste no Terminal',
      senha: 'teste@terminal.com',
      gerente:"682a08c516207a551a4efc23"
    });

    const salvo = await novoColaborador.save();
    console.log('Documento salvo no Atlas:', salvo);

    await mongoose.disconnect();
    console.log('Desconectado do MongoDB');
  } catch (error) {
    console.error('Erro:', error);
  }
}

run();
