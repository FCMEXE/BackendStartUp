const Rota = require('../models/Rota');

exports.criarRota = async (req, res) => {
  try {
    const { nome, pontos, colaboradorId } = req.body;
    const rota = new Rota({ nome, pontos, colaboradorId });
    await rota.save();
    res.status(201).json(rota);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.listarRotasDoColaborador = async (req, res) => {
  try {
    const { colaboradorId } = req.params;
    if (req.colaborador.id !== colaboradorId) {
      return res.status(403).json({ message: 'Não autorizado a ver rotas de outro colaborador.' });
    }
    const rotas = await Rota.find({ colaboradorId }).populate('colaboradorId', 'nome');
    res.status(200).json(rotas);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.buscarRotaDoColaborador = async (req, res) => {
  try {
    const { colaboradorId, rotaId } = req.params;
    if (req.colaborador.id !== colaboradorId) {
      return res.status(403).json({ message: 'Não autorizado a ver rotas de outro colaborador.' });
    }
    const rota = await Rota.findOne({ _id: rotaId, colaboradorId }).populate('colaboradorId', 'nome');
    if (!rota) {
      return res.status(404).json({ message: 'Rota não encontrada para este colaborador.' });
    }
    res.status(200).json(rota);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.listarTodasRotas = async (req, res) => {
  try {
    const rotas = await Rota.find().populate('colaboradorId', 'nome');
    res.status(200).json(rotas);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
