<script setup>
defineProps({
  searchedStocks: Array
})
</script>

<template>
  <div v-for="stock in searchedStocks" :key="stock.symbol"
       class="grid grid-cols-2 md:grid-cols-5 gap-1 items-center py-2 px-6 shadow-md bg-slate-700 transition-colors rounded
         hover:bg-slate-600">
    <div v-html="stock.symbol" class="font-bold"></div>
    <div v-html="stock.currency" class="md:text-left text-right"></div>
    <div v-html="stock.description" class="md:text-center text-left"></div>
    <div v-html="stock.type" class="text-right"></div>
    <div class="md:col-span-1 col-span-2 text-right">
      <router-link :to="{ name: 'StockInfo', params: { symbol: stock.symbol} }"
                   class="py-1 px-2 col-span-2 max-w-fit text-end text-white bg-slate-500 rounded-md hover:drop-shadow-xl">
        Details
      </router-link>
    </div>
  </div>
</template>

<style scoped>

</style>
