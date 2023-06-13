<script setup>
import PageComponent from "../components/PageComponent.vue";
import SelectMenu from "../components/SelectMenu.vue";
import {computed, onMounted, ref} from "vue";
import store from "../store/index.js";

const newsSelect = ref({ "cat": "general", "name": "General News"});
const news = computed(() => store.state.newsData);
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
    <div class="grid grid-cols-3 gap-3">
      <div class="text-2xl">Latest News</div>
      <SelectMenu v-if="newsCategory[0]" :selections="newsCategory" v-model="newsSelect"/>
      <button @click="getNews" class="flex w-full mb-2 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm
          font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500">Load news</button>
    </div>
    <pre> {{ news }}</pre>
  </PageComponent>
</template>

<style scoped>

</style>
