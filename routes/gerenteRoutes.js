const express = require('express');
const router = express.Router();
const gerenteController = require('../controllers/gerenteController');
const { protegerRota } = require('../middleware/authMiddleware');

router.post('/registrar', gerenteController.criarGerente);
router.post('/login', gerenteController.loginGerente);
router.get('/perfil', protegerRota, (req, res) => {
  res.status(200).json({ gerente: { _id: req.gerente._id, nome: req.gerente.nome } });
});

module.exports = router;