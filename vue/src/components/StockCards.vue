<script setup>
defineProps({
  searchedStocks: Array
})
</script>

<template>
  <div v-for="stock in searchedStocks" :key="stock.displaySymbol"
       class="grid md:grid-cols-4 items-center py-2 px-6 shadow-md bg-slate-700 transition-colors rounded
         hover:bg-slate-600">
    <div v-html="stock.displaySymbol"></div>
    <div v-html="stock.description" class="text-center"></div>
    <div v-html="stock.type" class="text-center"></div>
    <div class="text-right">
      <router-link :to="{ name: 'StockDetails', params: { symbol: stock.symbol} }" class="py-1 px-2 max-w-fit text-end text-white bg-slate-500 rounded-md hover:drop-shadow-xl">
        Details
      </router-link>
    </div>
  </div>
</template>

<style scoped>

</style>
