const express = require('express');
const router = express.Router();
const { criarRota, listarRotasDoColaborador, buscarRotaDoColaborador } = require('../controllers/rotaController');
const { protegerRota } = require('../middleware/authMiddleware'); // Middleware para gerente
const { protegerRotaColaborador } = require('../middleware/authColaboradorMiddleware'); // Novo middleware para colaborador

// Rota para criar uma nova rota (requer autenticação de gerente)
router.post('/', protegerRota, criarRota);

// Rota para listar todas as rotas DESTE colaborador (requer autenticação DO colaborador)
router.get('/colaboradores/:colaboradorId/rotas', protegerRotaColaborador, listarRotasDoColaborador);

// Rota para buscar uma rota específica DESTE colaborador (requer autenticação DO colaborador)
router.get('/colaboradores/:colaboradorId/rotas/:rotaId', protegerRotaColaborador, buscarRotaDoColaborador);

module.exports = router;