const express = require('express');
const router = express.Router();

const { 
  criarRota, 
  listarRotasDoColaborador, 
  buscarRotaDoColaborador, 
  listarTodasRotas 
} = require('../controllers/rotaController');

const { protegerRotaGerente } = require('../middleware/authMiddleware'); // Middleware para gerente
const { protegerRotaColaborador } = require('../middleware/authColaboradorMiddleware'); // Middleware para colaborador

// Criar rota (só gerente)
router.post('/registrar', protegerRotaGerente, criarRota);

// Listar rotas do colaborador (autenticado)
router.get('/colaboradores/:colaboradorId/rotas', protegerRotaColaborador, listarRotasDoColaborador);

// Buscar rota específica do colaborador
router.get('/colaboradores/:colaboradorId/rotas/:rotaId', protegerRotaColaborador, buscarRotaDoColaborador);

// Listar todas as rotas (ex: para gerente ver tudo)
router.get('/todas', protegerRotaGerente, listarTodasRotas);

module.exports = router;
