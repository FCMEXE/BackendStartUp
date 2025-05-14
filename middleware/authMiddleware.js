const jwt = require('jsonwebtoken');
const Gerente = require('../models/Gerente');

const protegerRota = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Obter o token do cabeçalho
      token = req.headers.authorization.split(' ')[1];

      // Verificar o token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Obter o gerente do token
      req.gerente = await Gerente.findById(decoded.id).select('-senha');

      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'Não autorizado, token inválido' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Não autorizado, sem token' });
  }
};

module.exports = { protegerRota };