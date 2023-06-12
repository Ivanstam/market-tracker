<script setup>
import {onMounted} from "vue";
// Attempt to automatically import only needed components for tree-shaking
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

onMounted(() => {
  const canvas = document.getElementById('lineChart');
  new Chart(canvas, {
    type: 'bar',
    data: {
      labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
      datasets: [{
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3],
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
});


</script>

<template>
  <canvas id="lineChart"/>
</template>

<style scoped>

</style>
