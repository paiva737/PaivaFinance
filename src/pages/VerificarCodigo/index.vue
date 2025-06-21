<template>
  <div class="codigo-container">
    <div class="codigo-box">
      <h2 class="codigo-title">🔐 Verificar Código</h2>
      <p class="codigo-subtitle">Digite o código que enviamos para seu e-mail.</p>

      <label for="codigo">Código</label>
      <input v-model="codigo" type="text" id="codigo" placeholder="Ex: 123456" required />

      <button @click="validarCodigo">Validar Código</button>

      <p v-if="mensagem" class="mensagem">{{ mensagem }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      codigo: '',
      mensagem: ''
    };
  },
  methods: {
    async validarCodigo() {
      const email = localStorage.getItem('email');
      if (!email) {
        this.mensagem = 'E-mail não encontrado. Faça o login novamente.';
        return;
      }

      try {
        const response = await fetch('http://localhost:5001/validar-codigo', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, codigo: this.codigo })
        });

        const data = await response.json();

        if (response.ok) {
          localStorage.removeItem('email');
          localStorage.setItem('token', data.token); 
          this.$router.push('/dashboard');

        } else {
          this.mensagem = data.error;
        }
      } catch (error) {
        this.mensagem = 'Erro ao validar o código.';
      }
    }
  }
};
import '../VerificarCodigo/verificarCodigo.css'
</script>

