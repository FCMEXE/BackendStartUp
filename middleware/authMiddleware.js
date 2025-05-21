const jwt = require('jsonwebtoken');
const Gerente = require('../models/Gerente');

const protegerRotaGerente = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.gerente = await Gerente.findById(decoded.id).select('-senha');
      if (!req.gerente) {
        return res.status(401).json({ message: 'Gerente não encontrado.' });
      }
      next();
    } catch (error) {
      console.error(error);
      return res.status(401).json({ message: 'Não autorizado, token inválido' });
    }
  } else {
    return res.status(401).json({ message: 'Não autorizado, sem token' });
  }
};

module.exports = { protegerRotaGerente };
