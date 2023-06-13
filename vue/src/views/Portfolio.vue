<script setup>
import PageComponent from "../components/PageComponent.vue";
import StockCards from "../components/StockCards.vue";
import store from "../store/index.js";
import {computed, onMounted} from "vue";

const userStocks = computed(() => store.state.userStocks);

// For testing purposes
// Makes a post request to the laravel server, asks for all the stocks that are attached to the current user
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
    <div class="grid grid-cols-2 gap-3 flex-col rounded border-2 border-slate-700 p-2">
      <div class="relative w-36 h-36 bg-slate-600 rounded-full items-baseline
      text-center p-5 border-2 border-slate-700 grid grid-cols-1">
        <div class="text-4xl font-bold">{{ userStocks.length }}</div>
        <div>Portfolio entries</div>
      </div>
      <div class="text-center">Here you will find your followed companies and stocks<br>
        To follow a stock go to their respective page and click 'add to portfolio'
      </div>
    </div>
    <div class="grid grid-cols-1 gap-3 mt-2">
      <StockCards v-if="userStocks[0]" :searchedStocks="userStocks"/>
    </div>
    <div v-if="!userStocks[0]">No stocks found in your portfolio!</div>
  </PageComponent>
</template>

<style scoped>

</style>
