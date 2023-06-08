<script setup>
import PageComponent from "../components/PageComponent.vue";
import StockCards from "../components/StockCards.vue";
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
  }
}
</script>

<template>
<PageComponent title="Stock list">
  <input v-model="keyword" type="text" placeholder="Search for stocks" @change="searchStocks"
         class="rounded-md border-1 border-slate-300 w-full text-slate-900 mb-4"/>
  <div class="grid grid-cols-1 gap-3">
    <StockCards :searchedStocks="searchedStocks"/>
    <pre>{{ searchedStocks }}</pre>
  </div>
</PageComponent>
</template>

<style scoped>

</style>
