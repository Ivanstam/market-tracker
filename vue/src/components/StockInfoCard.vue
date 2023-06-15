<script setup>
import store from "../store/index.js";

defineProps({
    stockInfo: Object,
})

// Add a stock to the users' portfolio
function setUserStock() {
  store.dispatch('setUserStock')
    .catch((error) => {
      errorMessage.value = error.response.data.message
    });
}
</script>

<template>
<div class="p-2 grid gap-3 border bg-slate-700 bg-opacity-30 border-slate-500 shadow-md" >
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
  <div class="grid grid-cols-4 py-2 px-2 items-stretch text-center">
    <div class="font-bold">Market Cap</div>
    <div class="font-bold"># of shares</div>
    <div class="font-bold">Share price</div>
    <div class="font-bold">Website</div>
    <div v-html="stockInfo.marketCapitalization.toLocaleString() + ' K'"></div>
    <div v-html="stockInfo.shareOutstanding.toLocaleString() + ' K'"></div>
    <div v-html="stockInfo.sharePrice"></div>
    <a :href="stockInfo.weburl" class="underline">Link</a>
  </div>
</div>
</template>

<style scoped>

</style>
