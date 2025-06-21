const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const CodigoVerificacao = require('../models/CodigoVerificacao');
const User = require('../models/User');

router.post('/validar-codigo', async (req, res) => {
  const { email, codigo } = req.body;

  try {
    const registroCodigo = await CodigoVerificacao.findOne({ email, codigo });

    if (!registroCodigo) {
      return res.status(400).json({ error: 'Código inválido ou expirado.' });
    }

    const usuario = await User.findOne({ email });

    if (!usuario) {
      return res.status(404).json({ error: 'Usuário não encontrado.' });
    }

    const token = jwt.sign(
      { id: usuario._id, email: usuario.email },
      process.env.JWT_SECRET,
      { expiresIn: '2h' }
    );

    await CodigoVerificacao.deleteOne({ _id: registroCodigo._id });

    res.json({
      message: 'Código validado com sucesso.',
      token,
      usuario: {
        nome: usuario.nome,
        email: usuario.email
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao validar o código.' });
  }
});

module.exports = router;
