<script setup>
defineProps({
  newsPosts: Array,
})
</script>

<template>
  <div v-for="newsPost in newsPosts" :key="newsPost.symbol"
       class="grid items-center py-2 px-6 shadow-md bg-slate-700 transition-colors rounded hover:bg-slate-600">
    <a :href="newsPost.url" target="_blank" v-html="newsPost.headline"
       class="font-bold text-xl text-center"></a>
    <div v-html="newsPost.source" class="border-b text-right text-gray-400 font-bold"></div>
    <div class="grid xl:grid-cols-2 gap-2 mt-2">
      <div v-html="newsPost.summary" class="text-center"></div>
      <img :src="newsPost.image" class="p-2"/>
    </div>
  </div>
</template>

<style scoped>

</style>
