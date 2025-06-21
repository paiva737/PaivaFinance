const dotenv = require('dotenv');

dotenv.config();

async function enviarCodigo(email, codigo) {
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      from: 'Finance App <onboarding@resend.dev>',
      to: email,
      subject: 'Seu código de verificação',
      text: `Seu código de verificação é: ${codigo}`
    })
  });

  if (!response.ok) {
    const error = await response.text();
    console.error('Erro ao tentar enviar email:', error);
    throw new Error('Erro ao enviar e-mail via Resend API');
  }

  console.log('✅ Código enviado com sucesso para:', email);
}

module.exports = { enviarCodigo };
