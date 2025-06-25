<template>
  <div class="dashboard-container">
    <header class="dashboard-header">
      <h1>Bem-vindo, {{ usuario?.nome || 'Usuário' }} 👋</h1>
      <button class="logout-button" @click="logout">Sair</button>
    </header>

    <main class="dashboard-content">
      <section class="coluna-esquerda">
        <div class="resumo">
          <div class="card_entrada">
            <p>Entradas</p>
            <strong>R$ {{ resumo.entradas.toFixed(2) }}</strong>
          </div>
          <div class="card_saida">
            <p>Saídas</p>
            <strong>R$ {{ resumo.saidas.toFixed(2) }}</strong>
          </div>
          <div class="card_total">
            <p>Total</p>
            <strong>R$ {{ resumo.total.toFixed(2) }}</strong>
          </div>
        </div>

        <ListaTransacoes
          :transacoes="transacoes"
          @remover="removerTransacao"
        />
      </section>

      <div class="acoes">
        <button class="nova-transacao-btn" @click="abrirModal">
          + Nova Transação
        </button>
      </div>

      <ModalNovaTransacao
        v-if="mostrarModal"
        @fechar="mostrarModal = false"
        @add-transaction="adicionarTransacao"
      />
    </main>
  </div>
</template>


<script>
import ListaTransacoes from '../../components/Transacoes/ListaTransacoes.vue';
import ModalNovaTransacao from '../../components/ButtonTransação/ModalNovaTransacao.vue';
import '../Dashboard/dashboard.css';
import {
  buscarTransacoes,
  salvarTransacao
} from '../../Services/transacoesService.js';

export default {
  components: {
    ModalNovaTransacao,
    ListaTransacoes
  },
  data() {
    return {
      usuario: null,
      mostrarModal: false,
      transacoes: [],
      resumo: {
        entradas: 0,
        saidas: 0,
        total: 0
      }
    };
  },
  mounted() {
    const usuarioSalvo = localStorage.getItem('usuario');
    if (usuarioSalvo) {
      this.usuario = JSON.parse(usuarioSalvo);
    }

    this.transacoes = buscarTransacoes();
    this.calcularResumo();
  },
  methods: {
    logout() {
      localStorage.removeItem('token');
      localStorage.removeItem('usuario');
      this.$router.push('/login');
    },
    abrirModal() {
      this.mostrarModal = true;
    },
    adicionarTransacao(novaTransacao) {
      salvarTransacao(novaTransacao);
      this.transacoes = buscarTransacoes();
      this.calcularResumo();
    },
    removerTransacao(id) {
      this.transacoes = this.transacoes.filter(t => t.id !== id);
      localStorage.setItem('transacoes_usuario', JSON.stringify(this.transacoes));
      this.calcularResumo();
    },
    calcularResumo() {
      let entradas = 0;
      let saidas = 0;

      this.transacoes.forEach(transacao => {
        if (transacao.tipo === 'entrada') {
          entradas += transacao.valor;
        } else if (transacao.tipo === 'saida') {
          saidas += transacao.valor;
        }
      });

      this.resumo.entradas = entradas;
      this.resumo.saidas = saidas;
      this.resumo.total = entradas - saidas;
    }
  }
};
</script>
