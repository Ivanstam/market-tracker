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
    <div class="grid grid-cols-1 gap-3">
      <StockCards v-if="userStocks[0]" :searchedStocks="userStocks"/>
    </div>
    <div v-if="!userStocks[0]">No stocks found in your portfolio!</div>
  </PageComponent>
</template>

<style scoped>

</style>
