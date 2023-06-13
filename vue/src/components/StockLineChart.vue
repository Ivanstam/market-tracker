<script setup>

import {computed, onMounted} from "vue";
import { Chart, registerables } from 'chart.js';
import store from "../store/index.js";
import {useRoute} from "vue-router";
Chart.register(...registerables);

const candleData = computed(() => store.getters.getCandleData);
const route = useRoute();

// Access candledata when canvas is created
onMounted(() => {
  getCandleData();
});

// Fetch candledata through the store, and initialize only after the data has been acquired
function getCandleData() {
  store.dispatch('getCandleData', route.params.symbol)
    .then((data) => {
      initialize(data)
    })
    .catch((error) => {
      console.log(error);
    });
}

// Initialize the chart and map the array contents to their corresponding inputs
function initialize(data) {
  console.log(data.data);
  const canvas = document.getElementById('lineChart');
  new Chart(canvas, {
    data: {
      labels: candleData.value.t.map((row) => new Date(row * 1000).toLocaleDateString()),
      datasets: [
        {
          type: 'line',
          label: 'Close',
          data: candleData.value.c,
          borderWidth: 1,
          yAxisID: 'y1'
        },
        {
          type: 'bar',
          label: 'Volume',
          data: candleData.value.v, // volume
          borderWidth: 1,
          yAxisID: 'y',
        },
      ]
    },
    options: {
      scales: {
        x: {
          ticks: {
            color: 'lightgray'
          }
        },
        y: {
          beginAtZero: true,
          type: 'linear',
          position: 'left',
          ticks: {
            color: 'lightgray'
          }
        },
        y1: {
          type: 'linear',
          position: 'right',
          grace: '20%',
          ticks: {
            color: 'lightgray'
          }
        }
      },
      plugins: {
        title: {
          display: true,
          text: 'Last year close/volume',
          color: 'white'
        }
      }
    }
  });
}
</script>

<template>
  <canvas id="lineChart"/>
</template>

<style scoped>

</style>
