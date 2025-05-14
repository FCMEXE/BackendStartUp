const jwt = require('jsonwebtoken');
const Gerente = require('../models/Gerente');

// Função para gerar um token JWT
const gerarToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '1h' // Define o tempo de expiração do token (ex: 1 hora)
  });
};

exports.criarGerente = async (req, res) => {
  try {
    const { nome, senha } = req.body;
    const gerente = new Gerente({ nome, senha });
    await gerente.save();
    res.status(201).json({ message: 'Gerente criado com sucesso!', gerente: { _id: gerente._id, nome: gerente.nome } });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.loginGerente = async (req, res) => {
  try {
    const { nome, senha } = req.body;

    const gerente = await Gerente.findOne({ nome });

    if (!gerente) {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }

    const isPasswordValid = await gerente.comparePassword(senha);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }

    // Gerar o token JWT após a autenticação bem-sucedida
    const token = gerarToken(gerente._id);

    res.status(200).json({ message: 'Login realizado com sucesso!', token, gerente: { _id: gerente._id, nome: gerente.nome } });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};