const express = require('express');
const router = express.Router();
const gerenteController = require('../controllers/gerenteController');
const { protegerRotaGerente } = require('../middleware/authMiddleware');

// Registro e login (público)
router.post('/registrar', gerenteController.criarGerente);
router.post('/login', gerenteController.loginGerente);

// Rotas protegidas para gerentes
router.get('/perfil', protegerRotaGerente, (req, res) => {
  res.status(200).json({ gerente: { _id: req.gerente._id, nome: req.gerente.nome } });
});

router.get('/', protegerRotaGerente, gerenteController.listarGerentes);
router.get('/:id', protegerRotaGerente, gerenteController.buscarGerentePorId);

module.exports = router;
