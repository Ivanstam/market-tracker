<script setup>
import PageComponent from '../components/PageComponent.vue';
import LineChart from "../components/LineChart.vue";
import {useRoute} from "vue-router";
import store from "../store/index.js";
import {onMounted, ref, computed} from "vue";

const route = useRoute();
const symbol = ref('');
const stockInfo = computed(() => store.state.stockInfo);
const capFormat = computed(() => store.getters.getStockCap);
let errorMessage = ref('');
let errorBool = false;

onMounted(() => {
  symbol.value = route.params.symbol;
  if (symbol.value) {
    getStockInfo()
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

// Add a stock to the users' portfolio
function setUserStock() {
  store.dispatch('setUserStock', stockInfo.value)
    .catch((error) => {
      errorMessage.value = error.response.data.message
    });
}
</script>

<template>
  <PageComponent title="Stock Details">
    <div v-if="!errorBool" class="p-2 grid gap-3 border bg-slate-700 bg-opacity-30 border-slate-500 shadow-md" >
      <div class="grid grid-cols-2 relative">
        <div v-html="stockInfo.name" class="text-2xl font-bold"></div>
        <button @click="setUserStock" class="absolute right-0 max-w-fit rounded-md bg-indigo-600 px-3 py-1.5 text-sm">
          Add to portfolio
        </button>
      </div>
      <div class="grid grid-cols-5 py-2 px-2 items-stretch">
        <div class="font-bold">Symbol</div>
        <div class="font-bold">Exchange</div>
        <div class="text-center font-bold">Currency</div>
        <div class="text-right font-bold">Country</div>
        <div class="text-right font-bold">Industry</div>
        <div v-html="stockInfo.ticker" class=""></div>
        <div v-html="stockInfo.exchange" class=""></div>
        <div v-html="stockInfo.currency" class="text-center"></div>
        <div v-html="stockInfo.country" class="text-right"></div>
        <div v-html="stockInfo.finnhubIndustry" class="text-right"></div>
      </div>
      <div class="grid grid-cols-2 py-2 px-2 items-stretch text-center">
        <div class="font-bold">Market Cap</div>
        <div class="font-bold">Website</div>
        <div v-html="capFormat"></div>
        <a :href="stockInfo.weburl" class="underline">Link</a>
      </div>
    </div>

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
  <button @click="getCandleData" class="absolute right-0 max-w-fit rounded-md bg-indigo-600 px-3 py-1.5 text-sm">
    Get candledata
  </button>
  <LineChart/>
</template>

<style>
</style>
