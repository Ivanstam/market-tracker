<script setup>
import PageComponent from '../components/PageComponent.vue';
import {useRoute} from "vue-router";
import store from "../store/index.js";
import {onMounted, ref, computed} from "vue";

const route = useRoute();
const symbol = ref('');
const stockInfo = computed(() => store.state.stockInfo);
const capFormat = computed(() => store.getters.getStockCap);

onMounted(() => {
  symbol.value = route.params.symbol;
  if (symbol.value) {
    getStockInfo()
  }
});
function getStockInfo() {
  store.dispatch('getStockInfo', symbol.value)
}

</script>

<template>
  <PageComponent title="Stock Details">
    <div class="p-2 grid cols-1 gap-3 border bg-slate-700 bg-opacity-30 border-slate-500 shadow-md" >
<!--      <div v-if="!stockInfo.Symbol">Selected Symbol is not a company</div>-->
      <div v-html="stockInfo.name" class="text-2xl font-bold"></div>
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
    <pre> {{ stockInfo }}</pre>
  </PageComponent>
</template>

<style>
</style>
