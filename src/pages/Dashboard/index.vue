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

        <div class="acoes">
          <button class="nova-transacao-btn" @click="abrirModal">
            + Nova Transação
          </button>
        </div>
      </section>

      <section class="coluna-direita">
        <GraficoPizza
          v-if="graficoPronto"
          :entradas="resumo.entradas"
          :saidas="resumo.saidas"
        />

        <GraficoLinha
          v-if="graficoPronto"
          :transacoes="transacoes"
        />
      </section>
    </main>

    <ModalNovaTransacao
      v-if="mostrarModal"
      @fechar="mostrarModal = false"
      @add-transaction="adicionarTransacao"
    />
  </div>
</template>

<script>
import ListaTransacoes from '../../components/Transacoes/ListaTransacoes.vue';
import ModalNovaTransacao from '../../components/ButtonTransação/ModalNovaTransacao.vue';
import '../Dashboard/dashboard.css';
import GraficoPizza from '../../components/Graficos/GraficoPizza/GraficoPizza.vue';
import GraficoLinha from '../../components/Graficos/GraficoLinha/GraficoLinha.vue';
import { buscarTransacoes, salvarTransacao } from '../../Services/transacoesService.js';

export default {
  components: {
    ModalNovaTransacao,
    ListaTransacoes,
    GraficoPizza,
    GraficoLinha
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
      },
      graficoPronto: false
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
      this.transacoes = [...buscarTransacoes()];
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

      this.graficoPronto = true;
    }
  }
};
</script>
