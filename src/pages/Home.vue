<template>
  <div class="home-container">
    <header class="home-header">
      <h1>Controle suas Finanças de Forma Simples e Visual</h1>
      <p>Visualize entradas, saídas e total em tempo real com gráficos intuitivos.</p>
      <router-link to="/login" class="start-button">Começar</router-link>
    </header>

    <section class="home-benefits">
      <div class="benefit-card">
        <h2>📈 Gráficos Inteligentes</h2>
        <p>Acompanhe sua saúde financeira mês a mês.</p>
      </div>
      <div class="benefit-card">
        <h2>🔐 Seguro e Local</h2>
        <p>Suas transações ficam salvas localmente, com total privacidade.</p>
      </div>
      <div class="benefit-card">
        <h2>⚡ Rápido e Responsivo</h2>
        <p>Interface simples, fluida e moderna.</p>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'Home'
};
import './Home.css'
</script>

