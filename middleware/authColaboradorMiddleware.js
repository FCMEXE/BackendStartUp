const jwt = require('jsonwebtoken');
const Colaborador = require('../models/Colaborador');

const protegerRotaColaborador = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.colaborador = await Colaborador.findById(decoded.id).select('-senha');
      if (!req.colaborador) {
        return res.status(401).json({ message: 'Colaborador não encontrado.' });
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

module.exports = { protegerRotaColaborador };
