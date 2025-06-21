const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { enviarCodigo } = require('./services/emailService');
const connectDB = require('./config/database');
const User = require('./models/User');
const CodigoVerificacao = require('./models/CodigoVerificacao');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API rodando 🚀');
});


app.post('/enviar-codigo', async (req, res) => {
  const { email } = req.body;

  console.log('Requisição recebida para o e-mail:', email);

  if (!email) {
    return res.status(400).json({ error: 'E-mail é obrigatório.' });
  }

  const usuario = await User.findOne({ email });
  if (!usuario) {
    return res.status(400).json({ error: 'E-mail não encontrado. Faça seu cadastro.' });
  }

  const codigo = Math.floor(100000 + Math.random() * 900000);
  console.log('Código gerado:', codigo);

  await CodigoVerificacao.create({ email, codigo });

  try {
    await enviarCodigo(email, codigo);
    console.log('E-mail enviado com sucesso');
    res.json({ message: 'Código enviado com sucesso.' });
  } catch (error) {
    console.error('Erro ao enviar o e-mail:', error);
    res.status(500).json({ error: 'Erro ao enviar o código.' });
  }
});


app.post('/validar-codigo', async (req, res) => {
  const { email, codigo } = req.body;

  if (!email || !codigo) {
    return res.status(400).json({ error: 'E-mail e código são obrigatórios.' });
  }

  try {
    const registro = await CodigoVerificacao.findOne({ email, codigo });

    if (!registro) {
      console.log(`Código inválido para o e-mail: ${email}`);
      return res.status(400).json({ error: 'Código inválido.' });
    }

    await CodigoVerificacao.deleteOne({ _id: registro._id });
    console.log(`Código válido para o e-mail: ${email}`);
    res.json({ message: 'Código validado com sucesso.' });
  } catch (error) {
    console.error('Erro ao validar o código:', error);
    res.status(500).json({ error: 'Erro ao validar o código.' });
  }
});

connectDB();
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
