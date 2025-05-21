const express = require('express');
const router = express.Router();
const { criarRota, listarRotasDoColaborador, buscarRotaDoColaborador } = require('../controllers/rotaController');
const { protegerRotaGerente } = require('../middleware/authMiddleware'); // Middleware para gerente
const { protegerRotaColaborador } = require('../middleware/authColaboradorMiddleware'); // Middleware para colaborador

// Criar rota (só gerente)
router.post('/registrar', protegerRotaGerente, criarRota);

// Listar rotas do colaborador (autenticado)
router.get('/colaboradores/:colaboradorId/rotas', protegerRotaColaborador, listarRotasDoColaborador);

// Buscar rota específica do colaborador
router.get('/colaboradores/:colaboradorId/rotas/:rotaId', protegerRotaColaborador, buscarRotaDoColaborador);

module.exports = router;
