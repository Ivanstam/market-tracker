<script setup>
import PageComponent from "../components/PageComponent.vue";
import store from "../store";
import {computed, onMounted, ref} from "vue";

const keyword = ref('');
const searchedStocks = computed(() => store.state.searchedStocks.result);

onMounted(() => {
  searchStocks()
});

function searchStocks() {
  if(keyword.value !== '') {
    store.dispatch('searchStocks', keyword.value);
    console.log(searchedStocks);
  }
}
</script>

<template>
<PageComponent title="Stock list">
  <input v-model="keyword" type="text" placeholder="Search for stocks" @change="searchStocks"
         class="rounded-md border-1 border-slate-300 w-full text-slate-900 mb-4"/>
  <div class="grid grid-cols-1 gap-3">
    <div v-for="stock in searchedStocks" :key="stock.symbol"
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
    <pre>{{ searchedStocks }}</pre>
  </div>
</PageComponent>
</template>

<style scoped>

</style>
