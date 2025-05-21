const jwt = require('jsonwebtoken');
const Colaborador = require('../models/Colaborador'); // Importa o modelo Colaborador
const Gerente = require('../models/Gerente'); // <--- NOVIDADE: Importe o modelo Gerente

// Função auxiliar para gerar token JWT
const gerarTokenColaborador = (id) => {
  return jwt.sign({ id, tipo: 'colaborador' }, process.env.JWT_SECRET, {
    expiresIn: '1h'
  });
};

// @desc    Registrar um novo colaborador
// @route   POST /api/colaboradores/registrar
// @access  Público
exports.registrarColaborador = async (req, res) => {
  try {
    const { nome, senha, gerente } = req.body; // 'gerente' deve ser o _id do gerente

    // 1. Verificar se o colaborador já existe
    const colaboradorExistente = await Colaborador.findOne({ nome });
    if (colaboradorExistente) {
      return res.status(400).json({ message: 'Colaborador com este nome já existe.' });
    }

    // 2. Opcional: Verificar se o ID do gerente fornecido existe
    if (gerente) {
      const gerenteExiste = await Gerente.findById(gerente);
      if (!gerenteExiste) {
        return res.status(400).json({ message: 'ID de Gerente inválido ou não encontrado.' });
      }
    }

    // 3. Criar e salvar o novo colaborador
    const novoColaborador = new Colaborador({ nome, senha, gerente });
    await novoColaborador.save();

    res.status(201).json({
      message: 'Colaborador criado com sucesso!',
      colaborador: {
        _id: novoColaborador._id,
        nome: novoColaborador.nome,
        gerente: novoColaborador.gerente // Retorna o ID do gerente
      }
    });
  } catch (err) {
    console.error('Erro ao registrar colaborador:', err.message);
    res.status(500).json({ message: 'Erro no servidor ao registrar colaborador.', error: err.message });
  }
};

// @desc    Autenticar colaborador e obter token
// @route   POST /api/colaboradores/login
// @access  Público
exports.loginColaborador = async (req, res) => {
  try {
    const { nome, senha } = req.body;

    // 1. Encontrar o colaborador pelo nome
    const colaborador = await Colaborador.findOne({ nome });
    if (!colaborador) {
      return res.status(401).json({ message: 'Credenciais inválidas: Colaborador não encontrado.' });
    }

    // 2. Comparar a senha fornecida com a senha hasheada no banco de dados
    const isPasswordValid = await colaborador.comparePassword(senha);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Credenciais inválidas: Senha incorreta.' });
    }

    // 3. Gerar o token JWT para o colaborador logado
    const token = gerarTokenColaborador(colaborador._id);

    res.status(200).json({
      message: 'Login realizado com sucesso!',
      token,
      colaborador: {
        _id: colaborador._id,
        nome: colaborador.nome,
        gerente: colaborador.gerente // Retorna o ID do gerente
      }
    });

  } catch (err) {
    console.error('Erro no login do colaborador:', err.message);
    res.status(500).json({ message: 'Erro no servidor ao realizar login.', error: err.message });
  }
};

// @desc    Buscar todos os colaboradores
// @route   GET /api/colaboradores
// @access  Privado (requer token JWT válido)
exports.getTodosColaboradores = async (req, res) => {
  try {
    // Busca todos os colaboradores, exclui a senha e popula o campo 'gerente'
    // 'populate('gerente', 'nome email')' irá trazer os campos 'nome' e 'email' do Gerente
    const colaboradores = await Colaborador.find({}).select('-senha').populate('gerente', 'nome email');
    res.status(200).json(colaboradores);
  } catch (err) {
    console.error('Erro ao buscar todos os colaboradores:', err.message);
    res.status(500).json({ message: 'Erro no servidor ao buscar colaboradores.', error: err.message });
  }
};

// @desc    Buscar um único colaborador por ID
// @route   GET /api/colaboradores/:id
// @access  Privado (requer token JWT válido)
exports.getColaboradorPorId = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id.match(/^[0-9a-fA-F]{24}$/)) { // Validação básica para IDs do MongoDB
      return res.status(400).json({ message: 'ID de colaborador inválido.' });
    }

    // Busca o colaborador pelo ID, exclui a senha e popula o gerente
    const colaborador = await Colaborador.findById(id).select('-senha').populate('gerente', 'nome email');
    
    if (!colaborador) {
      return res.status(404).json({ message: 'Colaborador não encontrado.' });
    }

    res.status(200).json(colaborador);
  } catch (err) {
    console.error('Erro ao buscar colaborador por ID:', err.message);
    res.status(500).json({ message: 'Erro no servidor ao buscar colaborador.', error: err.message });
  }
};

exports.getPerfilColaborador = async (req, res) => {
  try {
    if (!req.colaborador) {
      return res.status(404).json({ message: 'Colaborador não encontrado.' });
    }

    // Retorna só o nome e o token atual (que veio no header)
    const token = req.headers.authorization.split(' ')[1];

    res.status(200).json({
      nome: req.colaborador.nome,
      token
    });
  } catch (error) {
    console.error('Erro ao buscar perfil do colaborador:', error.message);
    res.status(500).json({ message: 'Erro no servidor ao buscar perfil.', error: error.message });
  }
};
