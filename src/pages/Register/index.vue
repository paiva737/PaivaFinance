<template>
  <div class="register-container">
    <div class="register-box">
      <h2 class="register-title">Crie sua conta</h2>
      <form @submit.prevent="cadastrarUsuario">
        <label for="nome">Nome completo</label>
        <input v-model="nome" type="text" id="nome" required />

        <label for="email">E-mail</label>
        <input v-model="email" type="email" id="email" required />

        <label for="confirmarEmail">Confirme seu E-mail</label>
        <input v-model="confirmarEmail" type="email" id="confirmarEmail" required />

        <button type="submit">Cadastrar</button>

        <p class="mensagem" v-if="mensagem">{{ mensagem }}</p>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      nome: '',
      email: '',
      confirmarEmail: '',
      mensagem: ''
    }
  },
  methods: {
    async cadastrarUsuario() {
      if (this.email !== this.confirmarEmail) {
        this.mensagem = 'Os e-mails não coincidem.'
        return
      }

      try {
        const response = await axios.post('http://localhost:5001/auth/cadastro', {
          nome: this.nome,
          email: this.email
        })
        this.mensagem = response.data.message
        setTimeout(() => {
          this.$router.push('/login')
        }, 2000)
      } catch (error) {
        this.mensagem = error.response?.data?.error || 'Erro ao cadastrar.'
      }
    }
  }
}
import '../Register/register.css'
</script>

