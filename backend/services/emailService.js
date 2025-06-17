const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  }
});

console.log('Transporter configurado com:', {
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  user: process.env.MAIL_USER
});

async function enviarCodigo(email, codigo) {
  const mailOptions = {
    from: '"Finance App" <no-reply@financeapp.com>',
    to: email,
    subject: 'Seu código de verificação',
    text: `Seu código de verificação é: ${codigo}`
  };

  await transporter.sendMail(mailOptions);
}

module.exports = { enviarCodigo };
