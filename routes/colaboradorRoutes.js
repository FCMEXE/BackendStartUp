const express = require('express');
const router = express.Router();
const colaboradorController = require('../controllers/colaboradorController');
const { protegerRotaColaborador } = require('../middleware/authColaboradorMiddleware');

// Rotas públicas
router.post('/registrar', colaboradorController.registrarColaborador);
router.post('/login', colaboradorController.loginColaborador);

// Rotas protegidas (apenas colaboradores autenticados)
router.get('/perfil', protegerRotaColaborador, colaboradorController.getPerfilColaborador);
router.get('/', protegerRotaColaborador, colaboradorController.getTodosColaboradores);
router.get('/:id', protegerRotaColaborador, colaboradorController.getColaboradorPorId);

module.exports = router;
