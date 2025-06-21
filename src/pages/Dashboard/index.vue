<template>
  <div class="dashboard-container">
    <h1>Bem-vindo, {{ nome }}!</h1>
    <button @click="logout">Sair</button>
 
  </div>
</template>

<script>
export default {
  data() {
    return {
      nome: ''
    }
  },
  mounted() {
    const usuario = JSON.parse(localStorage.getItem('usuario'));
    if (usuario && usuario.nome) {
      this.nome = usuario.nome;
    }
  },
  methods: {
    logout() {
      localStorage.removeItem('token');
      localStorage.removeItem('usuario');
      this.$router.push('/login');
    }
  }
}
import '../Dashboard/dashboard.css'
</script>
