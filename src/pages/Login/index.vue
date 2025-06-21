<template>
  <div class="login-container">
    <div class="login-box">
      <h2 class="login-title">🔐 LOGIN</h2>
      <p class="login-subtitle">Informe seu e-mail para receber o código de acesso.</p>

      <label for="email">E-mail</label>
      <div class="input-wrapper">
        <span class="icon">📧</span>
        <input
          v-model="email"
          type="email"
          id="email"
          placeholder="Digite seu e-mail"
          required
        />
      </div>

      <button @click="enviarCodigo">Enviar Código</button>
      <button class="create-account" @click="irParaCadastro">Cadastrar Email</button>

      <p v-if="mensagem" class="mensagem">{{ mensagem }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      mensagem: ''
    };
  },
  methods: {
    async enviarCodigo() {
      try {
        const response = await fetch('http://localhost:5001/enviar-codigo', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: this.email })
        });

        const data = await response.json();

        if (response.ok) {
          this.$router.push('/verificar-codigo'); 
        } else {
          this.mensagem = data.error;
        }
      } catch (error) {
        this.mensagem = 'Erro ao enviar o código.';
      }
    },
    irParaCadastro() {
      this.$router.push('/cadastro');
    }
  }
};
import '../Login/login.css'
</script>
