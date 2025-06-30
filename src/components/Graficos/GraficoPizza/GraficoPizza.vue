<script>
import {
  Chart,
  ArcElement,
  Tooltip,
  Legend,
  Title,
  PieController
} from 'chart.js';

Chart.register(PieController, ArcElement, Tooltip, Legend, Title);

export default {
  name: 'GraficoPizza',
  props: {
    entradas: {
      type: Number,
      required: true
    },
    saidas: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      chart: null
    };
  },
  watch: {
    entradas: 'atualizarGrafico',
    saidas: 'atualizarGrafico'
  },
  mounted() {
    this.$nextTick(() => {
      this.renderizarGrafico();
    });
  },
  methods: {
    renderizarGrafico() {
      const ctx = this.$refs.pizzaCanvas.getContext('2d');

     
      if (this.chart) {
        this.chart.destroy();
      }

      this.chart = new Chart(ctx, {
        type: 'pie',
        data: {
          labels: ['Entradas', 'Saídas'],
          datasets: [
            {
              data: [this.entradas, this.saidas],
              backgroundColor: ['#4CAF50', '#F44336'],
              borderColor: ['#ffffff', '#ffffff'],
              borderWidth: 2
            }
          ]
        },
        options: {
          responsive: true,
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
import '../GraficoPizza/GraficoPizza.css'
</script>

<template>
  <div class="grafico-container">
    <canvas ref="pizzaCanvas"></canvas>
  </div>
</template>
