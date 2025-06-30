<script>
import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  Tooltip,
  Legend
} from 'chart.js';

Chart.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  Tooltip,
  Legend
);

export default {
  name: 'GraficoLinha',
  props: {
    transacoes: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      chart: null
    };
  },
  watch: {
    transacoes: {
      handler() {
        this.atualizarGrafico();
      },
      deep: true
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.renderizarGrafico();
    });
  },
  methods: {
    agruparPorMes() {
      const meses = [
        'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
        'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
      ];

      const entradasPorMes = Array(12).fill(0);
      const saidasPorMes = Array(12).fill(0);

      this.transacoes.forEach(t => {
        const data = new Date(t.data);
        const mes = data.getMonth();

        if (t.tipo === 'entrada') {
          entradasPorMes[mes] += t.valor;
        } else if (t.tipo === 'saida') {
          saidasPorMes[mes] += t.valor;
        }
      });

      return {
        labels: meses,
        entradas: entradasPorMes,
        saidas: saidasPorMes
      };
    },

    renderizarGrafico() {
      const ctx = this.$refs.linhaCanvas.getContext('2d');
      const dados = this.agruparPorMes();

    
      if (this.chart) {
        this.chart.destroy();
      }

      this.chart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: dados.labels,
          datasets: [
            {
              label: 'Entradas',
              data: dados.entradas,
              borderColor: '#4CAF50',
              backgroundColor: 'rgba(76, 175, 80, 0.1)',
              tension: 0.3
            },
            {
              label: 'Saídas',
              data: dados.saidas,
              borderColor: '#F44336',
              backgroundColor: 'rgba(244, 67, 54, 0.1)',
              tension: 0.3
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'bottom'
            }
          }
        }
      });
    },

    atualizarGrafico() {
      if (this.chart) {
        this.chart.destroy();      
      }
      this.renderizarGrafico();     
    }
  }
};
import '../GraficoLinha/GraficoLinha.css'
</script>

<template>
  <div class="grafico-linha-container">
    <canvas
      ref="linhaCanvas"
      style="width: 100% !important; height: 100% !important;"
    ></canvas>
  </div>
</template>
