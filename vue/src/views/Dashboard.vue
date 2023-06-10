<script setup>
import PageComponent from "../components/PageComponent.vue";
import store from "../store/index.js";
import {computed} from "vue";

const user = computed(() => store.getters.getUser);

// For testing purposes
// Makes a post request to the laravel server, asks for all the stocks that are attached to the current user
function getUserStocks() {
  console.log(user.value);
  store.dispatch('getUserStocks', sessionStorage.getItem('USER_ID'))
    .catch((error) => {
      console.log(error);
    });
}
</script>

<template>
  <PageComponent title="Dashboard">
    <h1>Dashboard content</h1>
    <button @click="getUserStocks" class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm">
      Fetch the users' followed stocks
    </button>
  </PageComponent>
</template>

<style scoped>

</style>
