const jwt = require('jsonwebtoken');
const Colaborador = require('../models/Colaborador');

const gerarTokenColaborador = (id) => {
  return jwt.sign({ id, tipo: 'colaborador' }, process.env.JWT_SECRET, {
    expiresIn: '1h'
  });
};

exports.registrarColaborador = async (req, res) => {
  try {
    const { nome, senha, gerente } = req.body; // Agora esperamos o 'gerente' no body
    const novoColaborador = new Colaborador({ nome, senha, gerente });
    await novoColaborador.save();
    res.status(201).json({ message: 'Colaborador criado com sucesso!', colaborador: { _id: novoColaborador._id, nome: novoColaborador.nome, gerente: novoColaborador.gerente } });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.loginColaborador = async (req, res) => {
  try {
    const { nome, senha } = req.body;

    const colaborador = await Colaborador.findOne({ nome });

    if (!colaborador) {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }

    const isPasswordValid = await colaborador.comparePassword(senha);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }

    const token = gerarTokenColaborador(colaborador._id);
    res.status(200).json({ message: 'Login realizado com sucesso!', token, colaborador: { _id: colaborador._id, nome: colaborador.nome, gerente: colaborador.gerente } });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Outras funções do controller