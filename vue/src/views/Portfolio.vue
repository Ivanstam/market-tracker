<script setup>
import PageComponent from "../components/PageComponent.vue";
import PortfolioCards from "../components/PortfolioCards.vue";
import store from "../store/index.js";
import {computed, onMounted} from "vue";

const userStocks = computed(() => store.getters.getUserStocks);

function getUserStocks() {
  store.dispatch('getUserStocks', sessionStorage.getItem('USER_ID'))
    .catch((error) => {
      console.log(error);
    });
}

onMounted(() => {
  getUserStocks();
});
</script>

<template>
  <PageComponent title="Portfolio">
    <div class="grid grid-cols-2 gap-3 flex-col mx-auto rounded border-2 border-slate-700 p-2">
      <div class="text-center col-span-2">Here you will find your followed companies and stocks<br>
        To follow a stock go to their respective page and click 'add to portfolio'
      </div>
      <div class="relative max-w-sm bg-slate-600 rounded-full items-baseline
      text-center p-5 border-2 border-slate-700 grid grid-cols-1">
        <div>Portfolio entries</div>
        <div class="text-4xl font-bold">{{ userStocks.length }}</div>
      </div>
      <div class="relative bg-slate-600 rounded-full items-baseline
      text-center p-5 border-2 border-slate-700 grid grid-cols-1">
        <div>Total Equity</div>
        <div v-if="userStocks.equityTotal" class="text-4xl font-bold">${{ userStocks.equityTotal }}</div>
      </div>
    </div>
    <div class="grid grid-cols-1 gap-3 mt-2">
      <PortfolioCards v-if="userStocks[0]" :searchedStocks="userStocks"/>
    </div>
    <div v-if="!userStocks[0]">No stocks found in your portfolio!</div>
  </PageComponent>
</template>

<style scoped>

</style>
