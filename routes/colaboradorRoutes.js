const express = require('express');
const router = express.Router();
const colaboradorController = require('../controllers/colaboradorController');
const { protegerRota } = require('../middleware/authMiddleware');

router.post('/registrar', colaboradorController.registrarColaborador);
router.post('/login', colaboradorController.loginColaborador);
router.get('/perfil', protegerRota, async (req, res) => {
  try {
    const colaborador = await Colaborador.findById(req.colaborador._id).populate('gerente', 'nome'); // Popula o gerente e seleciona apenas o nome
    res.status(200).json({ colaborador });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;