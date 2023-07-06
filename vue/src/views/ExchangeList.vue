<script setup>
import PageComponent from "../components/PageComponent.vue";
import StockCards from "../components/StockCards.vue";
import SelectMenu from "../components/SelectMenu.vue";
import {computed, ref} from "vue";
import store from "../store/index.js";

let currentIndex = ref(0);
const keyword = ref('');
const paginatedStocks = computed(() => store.getters.paginateExchangeStocks(currentIndex.value, currentIndex.value + 10, keyword.value));
const exchangeSelect = ref({ "mic": "XNYS", "name": "New York Stock Exchange"});
const exchanges = [
  {mic: 'XNYS', name: 'New York Stock Exchange'},
  {mic: 'BATS', name: 'BATS Global Markets',},
  {mic: 'XNAS', name: 'NASDAQ',},
  {mic: 'XASE', name: 'American Stock Exchange',}
]
function searchExchange() {
  store.dispatch('searchByExchange', exchangeSelect.value.mic)
    .catch((error) => {
      console.log(error);
    })
}

</script>

<template>
  <PageComponent title="Exchange list">
    <div class="grid grid-cols-3 gap-3">
      <div class="grid grid-cols-2 gap-3">
        <button @click="currentIndex -= 10" :disabled="currentIndex < 1"
                class="flex w-full mb-2 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold
                leading-6 text-white shadow-sm hover:bg-indigo-500">Previous</button>
        <button @click="currentIndex += 10" class="flex w-full mb-2 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm
          font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500">Next</button>
      </div>
      <div>
        <SelectMenu v-if="exchanges[0]" :selections="exchanges" v-model="exchangeSelect"/>
      </div>
      <button @click="currentIndex = 0; searchExchange()" class="flex w-full mb-2 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm
          font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500">Fetch exchange results</button>
    </div>
    <input v-model="keyword" type="text" placeholder="Search for stocks" @change="currentIndex = 0"
           class="rounded-md h-10 border-1 border-slate-300 w-full text-slate-900"/>
    <div class="grid grid-cols-1 gap-2 my-2">
      <StockCards :searchedStocks="paginatedStocks"/>
    </div>
  </PageComponent>
</template>

<style scoped>

</style>
