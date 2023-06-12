<script setup>
import PageComponent from "../components/PageComponent.vue";
import StockCards from "../components/StockCards.vue";
import store from "../store/index.js";
import {computed} from "vue";

const userStocks = computed(() => store.state.userStocks);

// For testing purposes
// Makes a post request to the laravel server, asks for all the stocks that are attached to the current user
function getUserStocks() {
  store.dispatch('getUserStocks', sessionStorage.getItem('USER_ID'))
    .catch((error) => {
      console.log(error);
    });
}
</script>

<template>
  <PageComponent title="Portfolio">
    <button @click="getUserStocks" class="flex w-full justify-center mb-2 rounded-md bg-indigo-600 px-3 py-1.5 text-sm">
      Fetch the users' followed stocks
    </button>
    <div class="grid grid-cols-1 gap-3">
      <StockCards :searchedStocks="userStocks"/>
    </div>
  </PageComponent>
</template>

<style scoped>

</style>
