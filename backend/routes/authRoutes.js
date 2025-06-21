const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

router.post('/cadastro', async (req, res) => {
  const { nome, email, senha } = req.body;

  try {
    const usuarioExistente = await User.findOne({ email });
    if (usuarioExistente) {
      return res.status(400).json({ error: 'Usuário já cadastrado.' });
    }

    const senhaCriptografada = await bcrypt.hash(senha, 10);
    const novoUsuario = await User.create({ nome, email, senha: senhaCriptografada });

    res.json({ message: 'Usuário cadastrado com sucesso!' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao cadastrar o usuário.' });
  }
});

router.post('/login', async (req, res) => {
  const { email, senha } = req.body;

  try {
    const usuario = await User.findOne({ email });
    if (!usuario) {
      return res.status(400).json({ error: 'Usuário não encontrado.' });
    }

    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) {
      return res.status(400).json({ error: 'Senha inválida.' });
    }

    const token = jwt.sign(
      { id: usuario._id, email: usuario.email },
      process.env.JWT_SECRET,
      { expiresIn: '2h' }
    );

    res.json({
      message: 'Login realizado com sucesso!',
      usuario: { nome: usuario.nome, email: usuario.email },
      token
    });
  } catch (error) {
    
    res.status(500).json({ error: 'Erro ao realizar login.' });
  }
});

const autenticarToken = require('../middleware/authMiddleware');

router.get('/protegida', autenticarToken, (req, res) => {
  res.json({ message: `Olá, ${req.usuario.email}! Você acessou uma rota protegida.` });
});


module.exports = router;
