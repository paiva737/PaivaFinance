<template>
  <section class="lista-transacoes">
    <h1>Minhas Transações</h1>
    <ul v-if="transacoesInternas.length">
      <li
        v-for="transacao in transacoesInternas"
        :key="transacao.id"
        :class="transacao.tipo"
      >
        <div class="info">
          <p class="descricao">{{ transacao.descricao }}</p>
          <small class="categoria">{{ transacao.categoria }}</small>
        </div>

        <div class="valores-container">
          <div class="valor-data">
            <strong>
              {{ transacao.tipo === 'entrada' ? '+ R$' : '- R$' }}
              {{ transacao.valor.toFixed(2) }}
            </strong>
            <small class="data">{{ formatarData(transacao.data) }}</small>
          </div>
          <button class="remover-btn" @click="remover(transacao.id)">
            Remover
          </button>
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
    this.transacoesInternas = Array.isArray(this.transacoes)
      ? [...this.transacoes]
      : [];
  },
  watch: {
    transacoes: {
      immediate: true,
      handler(novas) {
        this.transacoesInternas = [...novas];
      }
    }
  },
  methods: {
    formatarData(data) {
      return new Date(data).toLocaleDateString('pt-BR');
    },
    remover(id) {
      this.$emit('remover', id);
    }
  }
};
</script>

<style scoped>
.lista-transacoes {
  margin-top: 2rem;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.lista-transacoes h1 {
  margin-bottom: 1rem;
  font-size: 1.8rem;
}

.lista-transacoes ul {
  list-style: none;
  padding: 0;
  margin: 0;
  width: 100%;
}

.lista-transacoes li {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  background: #f2f2f2;
  padding: 1.5rem;
  border-radius: 6px;
  margin-bottom: 1.2rem;
  border-left: 5px solid;
  min-width: 300px;
  max-width: 100%;
  width: 100%;
  flex-wrap: wrap;
}

.lista-transacoes li.entrada {
  border-color: green;
}

.lista-transacoes li.saida {
  border-color: red;
}

.info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}
.descricao {
  font-weight: bold;
  font-size: 1.3rem;
  word-break: break-word;
  max-width: 220px;
}

.categoria {
  font-size: 1rem;
  color: #666;
}

.valores-container {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-between;
  min-width: 160px;
  gap: 0.6rem;
}

.valor-data {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  white-space: nowrap;
}

.valor-data strong {
  font-size: 1.3rem;
  font-weight: bold;
}

.data {
  font-size: 1rem;
  color: #999;
  margin-left: 20px;
}

.remover-btn {
  background-color: transparent;
  border: none;
  color: red;
  cursor: pointer;
  font-size: 1rem;
  padding: 0;
  text-align: right;
}
</style>
