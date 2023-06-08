<script setup>
import PageComponent from "../components/PageComponent.vue";
import {computed, ref} from "vue";
import store from "../store/index.js";

const searchedStocks = computed(() => store.state.searchedStocks);

function searchExchange() {
  store.dispatch('searchByExchange');
}
</script>

<template>
  <PageComponent title="Stock list">
    <div class="grid grid-cols-1 gap-3">
<!--      <div v-for="stock in searchedStocks" :key="stock.symbol"-->
<!--           class="grid md:grid-cols-4 items-center py-2 px-6 shadow-md bg-slate-700 transition-colors rounded-->
<!--         hover:bg-slate-600">-->
<!--        <div v-html="stock.displaySymbol"></div>-->
<!--        <div v-html="stock.description" class="text-center"></div>-->
<!--        <div v-html="stock.type" class="text-center"></div>-->
<!--        <div class="text-right">-->
<!--          <router-link :to="{ name: 'StockDetails', params: { symbol: stock.symbol} }" class="py-1 px-2 max-w-fit text-end text-white bg-slate-500 rounded-md hover:drop-shadow-xl">-->
<!--            Details-->
<!--          </router-link>-->
<!--        </div>-->
<!--      </div>-->
      <pre>{{ searchedStocks }}</pre>
    </div>
    <button @click="searchExchange">Hoi</button>
  </PageComponent>
</template>

<style scoped>

</style>
