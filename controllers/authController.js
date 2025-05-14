// controllers/authController.js
const Gerente = require('../models/Gerente');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.login = async (req, res) => {
  const { nome, senha } = req.body;

  try {
    const gerente = await Gerente.findOne({ nome });
    if (!gerente) return res.status(400).json({ error: 'Gerente não encontrado' });

    const isMatch = await bcrypt.compare(senha, gerente.senha);
    if (!isMatch) return res.status(400).json({ error: 'Senha incorreta' });

    const token = jwt.sign({ id: gerente._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
