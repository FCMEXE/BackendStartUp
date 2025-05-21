const express = require('express');
const router = express.Router();
const colaboradorController = require('../controllers/colaboradorController');

// Middlewares de autenticação
const { protegerRotaColaborador } = require('../middleware/authColaboradorMiddleware');
const { protegerRotaGerente } = require('../middleware/authMiddleware'); // <- Importa o middleware do gerente

// Rotas públicas
router.post('/registrar', colaboradorController.registrarColaborador);
router.post('/login', colaboradorController.loginColaborador);

// Rota protegida por GERENTE (listar todos os colaboradores)
router.get('/', protegerRotaGerente, colaboradorController.getTodosColaboradores);

// Rotas protegidas por COLABORADOR
router.get('/perfil', protegerRotaColaborador, colaboradorController.getPerfilColaborador);
router.get('/:id', protegerRotaColaborador, colaboradorController.getColaboradorPorId);

module.exports = router;
