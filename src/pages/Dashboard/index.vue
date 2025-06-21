<template>
  <div class="dashboard-container">
    <header class="dashboard-header">
      <h1>Bem-vindo, {{ usuario?.nome || 'Usuário' }} 👋</h1>
  <button
  class="logout-button"
  @click="logout"
  style="background-color: red; color: white"
>
  Sair
</button>



    </header>

    <main class="dashboard-content">
      <div class="card">
        <h2>🏦 Painel Financeiro</h2>
        <p>Em breve você verá aqui seus dados financeiros organizados.</p>
      </div>
    </main>
  </div>
</template>

<script>
import '../Dashboard/dashboard.css'
export default {
  data() {
    return {
      usuario: null
    };
  },
  mounted() {
    const usuarioSalvo = localStorage.getItem('usuario');
    if (usuarioSalvo) {
      this.usuario = JSON.parse(usuarioSalvo);
    }
  },
  methods: {
    logout() {
      localStorage.removeItem('token');
      localStorage.removeItem('usuario');
      this.$router.push('/login');
    }
  }
};

</script>
