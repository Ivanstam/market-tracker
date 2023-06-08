<script setup>
import PageComponent from "../components/PageComponent.vue";
import StockCards from "../components/StockCards.vue";
import {computed, ref} from "vue";
import store from "../store/index.js";

const searchedStocks = computed(() => store.state.searchedStocks);

function searchExchange() {
  store.dispatch('searchByExchange');
}
</script>

<template>
  <PageComponent title="Exchange list">
    <button @click="searchExchange" class="flex w-full mb-2 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm
        font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500">Fetch exchange results</button>
    <div class="grid grid-cols-1 gap-3">
<!--      Until pagination just slice all the results for smoothness-->
      <StockCards :searchedStocks="searchedStocks.slice(0, 20)"/>
    </div>
    <pre>{{ searchedStocks }}</pre>
  </PageComponent>
</template>

<style scoped>

</style>
