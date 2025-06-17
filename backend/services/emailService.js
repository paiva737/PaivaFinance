const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();

const transporter = nodemailer.createTransport({
  host: 'smtp.resend.com',
  port: 587,
  secure: false, 
  auth: {
    user: 'resend',
    pass: process.env.RESEND_API_KEY
  }
});

console.log('Transporter configurado com Resend');

async function enviarCodigo(email, codigo) {
  const mailOptions = {
    from: 'Finance App <onboarding@resend.dev>', 
    to: email,
    subject: 'Seu código de verificação',
    text: `Seu código de verificação é: ${codigo}`
  };

  await transporter.sendMail(mailOptions);
}

module.exports = { enviarCodigo };
