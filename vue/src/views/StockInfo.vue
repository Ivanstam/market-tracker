<script setup>
import PageComponent from '../components/PageComponent.vue';
import StockLineChart from "../components/StockLineChart.vue";
import StockInfoCard from "../components/StockInfoCard.vue";
import {useRoute} from "vue-router";
import store from "../store/index.js";
import {onMounted, ref, computed} from "vue";

const route = useRoute();
const symbol = ref('');
const stockInfo = computed(() => store.getters.getStockInfo);
let errorMessage = ref('');
let errorBool = false;

onMounted(() => {
  symbol.value = route.params.symbol;
  if (symbol.value) {
    getStockInfo();
  }
});

// Fetch stock info from finnhub
function getStockInfo() {
  store.dispatch('getStockInfo', symbol.value)
    .catch((error) => {
      console.log(error);
      errorMessage.value = error.response.data.error;
      errorBool = true;
    });
}
</script>

<template>
  <PageComponent v-if="!errorBool" title="Stock Details">
    <StockInfoCard :stockInfo="stockInfo"/>
    <div v-if="errorMessage"
         class="flex items-center justify-between py-3 px-2 mb-2 bg-gradient-to-br from-red-400 to-red-600 rounded">
      {{ errorMessage }}
      <span @click="errorMessage = ''" class="w-8 h-8 flex items-center justify-center rounded-full transition-colors
      cursor-pointer hover:bg-red-400">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
             stroke-width="1.5" stroke="currentColor" class="w-6 h-6 flex">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </span>
    </div>

<!--    <pre> {{ stockInfo }}</pre>-->
  </PageComponent>
  <StockLineChart/>
</template>

<style>
</style>
