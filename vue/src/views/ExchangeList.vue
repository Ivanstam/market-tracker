<script setup>
import PageComponent from "../components/PageComponent.vue";
import StockCards from "../components/StockCards.vue";
import SelectMenu from "../components/SelectMenu.vue";
import {computed, ref} from "vue";
import store from "../store/index.js";

const currentIndex = ref(0);
const paginatedStocks = computed(() => store.getters.paginate(currentIndex.value, currentIndex.value + 10));
const exchangeSelect = ref('');

function searchExchange() {
  store.dispatch('searchByExchange');
}

</script>

<template>
  <PageComponent title="Exchange list">
<!--    For now using a button to fetch instead of onMounted because of the large API response and to conserve calls-->
    <div class="grid grid-cols-3 gap-3">
      <div class="grid grid-cols-2 gap-3">
        <button @click="currentIndex -= 10" class="flex w-full mb-2 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm
          font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500">Previous</button>
        <button @click="currentIndex += 10" class="flex w-full mb-2 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm
          font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500">Next</button>
      </div>
      <div>
        <SelectMenu v-model="exchangeSelect"/>
      </div>
      <button @click="searchExchange" class="flex w-full mb-2 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm
          font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500">Fetch exchange results</button>
    </div>
    <div class="grid grid-cols-1 gap-3">
      <StockCards :searchedStocks="paginatedStocks"/>
    </div>
    {{ exchangeSelect }}
  </PageComponent>
</template>

<style scoped>

</style>
