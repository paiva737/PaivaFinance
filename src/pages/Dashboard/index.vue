<template>
  <div class="dashboard-container">
    <header class="dashboard-header">
      <h1>Bem-vindo, {{ usuario?.nome || 'Usuário' }} 👋</h1>
      <button class="logout-button" @click="logout">Sair</button>
    </header>

    <main class="dashboard-content">
      <section class="resumo">
        <div class="card_entrada">
          <p>Entradas</p>
          <strong>R$ 0,00</strong>
        </div>
        <div class="card_saida">
          <p>Saídas</p>
          <strong>R$ 0,00</strong>
        </div>
        <div class="card_total">
          <p>Total</p>
          <strong>R$ 0,00</strong>
        </div>
      </section>
      
      <div class="acoes">
        <button class="nova-transacao-btn" @click="abrirModal">+ Nova Transação</button>
      </div>

      <!-- Aqui está a modificação solicitada -->
      <ListaTransacoes :transacoes="transacoes" />

      <ModalNovaTransacao v-if="mostrarModal" @fechar="mostrarModal = false" />
    </main>
  </div>
</template>

<script>
import ListaTransacoes from '../../components/Transacoes/ListaTransacoes.vue';
import ModalNovaTransacao from '../../components/ButtonTransação/ModalNovaTransacao.vue';
import '../Dashboard/dashboard.css';
import { buscarTransacoes } from '../../Services/transacoesService.js';

export default {
  components: {
    ModalNovaTransacao,
    ListaTransacoes
  },
  data() {
    return {
      usuario: null,
      mostrarModal: false,
      transacoes: []
    };
  },
  mounted() {
    const usuarioSalvo = localStorage.getItem('usuario');
    if (usuarioSalvo) {
      this.usuario = JSON.parse(usuarioSalvo);
    }

    this.transacoes = buscarTransacoes();
  },
  methods: {
    logout() {
      localStorage.removeItem('token');
      localStorage.removeItem('usuario');
      this.$router.push('/login');
    },
    abrirModal() {
      this.mostrarModal = true;
    }
  }
};
</script>
