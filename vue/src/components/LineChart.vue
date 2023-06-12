<script setup>

import {computed, onMounted} from "vue";
import { Chart, registerables } from 'chart.js';
import store from "../store/index.js";
Chart.register(...registerables);

const candleData = computed(() => store.getters.getCandleData);
const symbol = computed(() => store.getters.getCurrentSymbol);

onMounted(() => {
  getCandleData();
});

function initialize(data) {
  console.log(data.data);
  const canvas = document.getElementById('lineChart');
  new Chart(canvas, {
    type: 'bar',
    data: {
      labels: candleData.value.t.map((row) => new Date(row * 1000).toLocaleDateString()),
      datasets: [{
        label: 'Volume',
        data: candleData.value.v,
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}

function getCandleData() {
  store.dispatch('getCandleData', symbol.value)
    .then((data) => {
      initialize(data)
    })
    .catch((error) => {
      console.log(error);
    });
}
</script>

<template>
  <canvas id="lineChart"/>
</template>

<style scoped>

</style>
