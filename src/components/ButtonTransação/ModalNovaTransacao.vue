<template>
  <div class="modal-overlay" @click.self="$emit('fechar')">
    <div class="modal-content">
      <header>
        <h2>Adicionar Transação</h2>
        <button class="close-btn" @click="$emit('fechar')">×</button>
      </header>
      <form @submit.prevent="handleSubmit">
        <label>Descrição</label>
        <input v-model="descricao" type="text" required />

        <label>Valor (R$)</label>
        <input v-model.number="valor" type="number" step="0.01" required />

        <label>Categoria</label>
        <select v-model="categoria" required>
          <option disabled value="">Selecione...</option>
          <option>Alimentação</option>
          <option>Transporte</option>
          <option>Lazer</option>
          <option>Saúde</option>
          <option>Salario</option>
          <option>Investimentos</option>
          <option>Ensino</option>
          <option>Casa</option>
          <option>Outros</option>
        </select>

        <label>Tipo</label>
        <div class="tipo-group">
          <label><input type="radio" value="entrada" v-model="tipo" /> Entrada</label>
          <label><input type="radio" value="saida" v-model="tipo" /> Saída</label>
        </div>

        <button type="submit" class="submit-btn">Adicionar</button>
      </form>
    </div>
  </div>
</template>

<script>
import { salvarTransacao } from '../../services/transacoesService';
import '../ButtonTransação/ModalNovaTransacao.css';

export default {
  data() {
    return {
      descricao: '',
      valor: null,
      categoria: '',
      tipo: 'entrada'
    };
  },
  methods: {
    handleSubmit() {
      const novaTransacao = {
        descricao: this.descricao,
        valor: this.valor,
        categoria: this.categoria,
        tipo: this.tipo,
        data: new Date().toISOString()
      };

      this.$emit('add-transaction', novaTransacao);

      this.descricao = '';
      this.valor = null;
      this.categoria = '';
      this.tipo = 'entrada';

      this.$emit('fechar');
    }
  }
};
</script>
