<script setup>
import PageComponent from "../components/PageComponent.vue";
import store from "../store";
import { computed } from "@vue/reactivity";

const stocks = computed(() => store.state.stocks)
</script>

<template>
<PageComponent title="Stock list">
  <div class="grid grid-cols-1 gap-3">
    <div v-for="stock in stocks" :key="stock.symbol" class="grid md:grid-cols-5 items-center py-2 px-6 shadow-md bg-slate-700 transition-colors hover:bg-slate-600">
      <div v-html="stock.symbol"></div>
      <div v-html="stock.name" class="text-center"></div>
      <div v-html="stock.currency" class="text-center"></div>
      <div v-html="stock.type" class="text-center"></div>
      <div class="text-right">
        <router-link :to="{ name: 'StockDetails', params: { symbol: stock.symbol} }" class="py-1 px-2 max-w-fit text-end text-white bg-slate-500 rounded-md hover:drop-shadow-xl">
        Details
        </router-link>
      </div>
    </div>
    <pre>{{ stocks }}</pre>
  </div>
</PageComponent>
</template>

<style scoped>

</style>
