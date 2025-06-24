<template>
  <section class="lista-transacoes">
    <h2>Minhas Transações</h2>
    <ul v-if="transacoesInternas.length">
      <li v-for="transacao in transacoesInternas" :key="transacao.id" :class="transacao.tipo">
        <div class="info">
          <p class="descricao">{{ transacao.descricao }}</p>
          <small class="categoria">{{ transacao.categoria }}</small>
        </div>
        <div class="valores">
          <strong>
            {{ transacao.tipo === 'entrada' ? '+' : '-' }} R$ {{ transacao.valor.toFixed(2) }}
          </strong>
          <small class="data">{{ formatarData(transacao.data) }}</small>
        </div>
      </li>
    </ul>
    <p v-else>Nenhuma transação cadastrada.</p>
  </section>
</template>

<script>
export default {
  props: {
    transacoes: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      transacoesInternas: []
    };
  },
  mounted() {
   this.transacoesInternas = Array.isArray(this.transacoes) ? [...this.transacoes] : [];
  },
  methods: {
    formatarData(data) {
      return new Date(data).toLocaleDateString('pt-BR');
    }
  }
};

</script>



<style scoped>
.lista-transacoes {
  margin-top: 2rem;
  padding: 1rem;
}

.lista-transacoes ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.lista-transacoes li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #f2f2f2;
  padding: 1rem;
  border-radius: 6px;
  margin-bottom: 0.8rem;
  border-left: 5px solid;
}

.lista-transacoes li.entrada {
  border-color: green;
}

.lista-transacoes li.saida {
  border-color: red;
}

.info {
  display: flex;
  flex-direction: column;
}

.descricao {
  font-weight: bold;
}

.categoria {
  font-size: 0.75rem;
  color: #666;
}

.valores {
  text-align: right;
}

.data {
  font-size: 0.75rem;
  color: #999;
}
</style>
