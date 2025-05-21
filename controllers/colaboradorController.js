const jwt = require('jsonwebtoken');
const Colaborador = require('../models/Colaborador');
const Gerente = require('../models/Gerente');
const Rota = require('../models/Rota'); // Não esqueça de importar o modelo Rota, se usar

// Função auxiliar para gerar token JWT
const gerarTokenColaborador = (id) => {
  return jwt.sign({ id, tipo: 'colaborador' }, process.env.JWT_SECRET, {
    expiresIn: '1h'
  });
};

// Registrar novo colaborador
const registrarColaborador = async (req, res) => {
  try {
    const { nome, senha, gerente } = req.body;

    const colaboradorExistente = await Colaborador.findOne({ nome });
    if (colaboradorExistente) {
      return res.status(400).json({ message: 'Colaborador com este nome já existe.' });
    }

    if (gerente) {
      const gerenteExiste = await Gerente.findById(gerente);
      if (!gerenteExiste) {
        return res.status(400).json({ message: 'ID de Gerente inválido ou não encontrado.' });
      }
    }

    const novoColaborador = new Colaborador({ nome, senha, gerente });
    await novoColaborador.save();

    res.status(201).json({
      message: 'Colaborador criado com sucesso!',
      colaborador: {
        _id: novoColaborador._id,
        nome: novoColaborador.nome,
        gerente: novoColaborador.gerente
      }
    });
  } catch (err) {
    console.error('Erro ao registrar colaborador:', err.message);
    res.status(500).json({ message: 'Erro no servidor ao registrar colaborador.', error: err.message });
  }
};

// Login colaborador e gerar token
const loginColaborador = async (req, res) => {
  try {
    const { nome, senha } = req.body;

    const colaborador = await Colaborador.findOne({ nome });
    if (!colaborador) {
      return res.status(401).json({ message: 'Credenciais inválidas: Colaborador não encontrado.' });
    }

    const isPasswordValid = await colaborador.comparePassword(senha);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Credenciais inválidas: Senha incorreta.' });
    }

    const token = gerarTokenColaborador(colaborador._id);

    res.status(200).json({
      message: 'Login realizado com sucesso!',
      token,
      colaborador: {
        _id: colaborador._id,
        nome: colaborador.nome,
        gerente: colaborador.gerente
      }
    });
  } catch (err) {
    console.error('Erro no login do colaborador:', err.message);
    res.status(500).json({ message: 'Erro no servidor ao realizar login.', error: err.message });
  }
};

// Buscar todos os colaboradores
const getTodosColaboradores = async (req, res) => {
  try {
    const colaboradores = await Colaborador.find({}).select('-senha').populate('gerente', 'nome email');
    res.status(200).json(colaboradores);
  } catch (err) {
    console.error('Erro ao buscar todos os colaboradores:', err.message);
    res.status(500).json({ message: 'Erro no servidor ao buscar colaboradores.', error: err.message });
  }
};

// Buscar colaborador por ID
const getColaboradorPorId = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: 'ID de colaborador inválido.' });
    }

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

// Buscar perfil do colaborador pelo token (req.colaborador)
// Importante: req.colaborador deve ser setado no middleware de autenticação (protegerRotaColaborador)
const getPerfilColaborador = async (req, res) => {
  try {
    if (!req.colaborador) {
      return res.status(404).json({ message: 'Colaborador não encontrado.' });
    }

    const colaboradorId = req.colaborador._id || req.colaborador.id;

    // Buscar as rotas vinculadas a esse colaborador
    const rotas = await Rota.find({ colaboradorId }).select('-__v');

    const token = req.headers.authorization?.split(' ')[1];

    res.status(200).json({
      nome: req.colaborador.nome,
      token,
      rotas
    });
  } catch (error) {
    console.error('Erro ao buscar perfil do colaborador:', error.message);
    res.status(500).json({ message: 'Erro no servidor ao buscar perfil.', error: error.message });
  }
};

module.exports = {
  registrarColaborador,
  loginColaborador,
  getTodosColaboradores,
  getColaboradorPorId,
  getPerfilColaborador,
};
