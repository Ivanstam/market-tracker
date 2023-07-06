<script setup>
import PageComponent from "../components/PageComponent.vue";
import SelectMenu from "../components/SelectMenu.vue";
import NewsCards from "../components/NewsCards.vue";
import {computed, onMounted, ref} from "vue";
import store from "../store/index.js";

const currentIndex = ref(0);
const newsSelect = ref({ "cat": "general", "name": "General News"});
const newsAmount = computed(() => store.getters.getNewsAmount);
const paginatedNews = computed(() => store.getters.paginateNews(currentIndex.value, currentIndex.value + 10));
const username = sessionStorage.getItem('USER_NAME');
const newsCategory = [
  {cat: 'general', name: 'General News'},
  {cat: 'forex', name: 'Forex News',},
  {cat: 'crypto', name: 'Crypto News',},
  {cat: 'merger', name: 'Industry mergers',}
]

function getNews() {
  store.dispatch('getNews', newsSelect.value.cat)
    .catch((error) => {
      console.log(error);
    });
}

onMounted(() => {
  getNews();
});
</script>

<template>
  <PageComponent title="Dashboard">
    <div class="text-3xl mb-2">Good day, {{ username }}</div>
    <div class="grid grid-cols-3 gap-3">
      <div class="grid grid-cols-2 gap-1">
        <button @click="currentIndex -= 10" :disabled="currentIndex < 1"
                class="flex w-full mb-2 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold
                leading-6 text-white shadow-sm hover:bg-indigo-500">Previous</button>
        <button @click="currentIndex += 10" :disabled="currentIndex + 10 >= newsAmount" class="flex w-full mb-2 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm
          font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500">Next</button>
      </div>
      <SelectMenu v-if="newsCategory[0]" :selections="newsCategory" v-model="newsSelect"/>
      <button @click="currentIndex = 0;getNews()" class="flex w-full mb-2 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm
          font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500">Load news</button>
    </div>
    <div class="grid lg:grid-cols-2 gap-3">
      <NewsCards :newsPosts="paginatedNews"/>
    </div>
  </PageComponent>
</template>

<style scoped>

</style>
