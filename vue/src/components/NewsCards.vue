<script setup>
defineProps({
  newsPosts: Array,
})
</script>

<template>
  <div v-for="newsPost in newsPosts" :key="newsPost.symbol"
       class="grid items-center py-2 px-6 shadow-md bg-slate-700 transition-colors rounded hover:bg-slate-600">
    <div v-html="newsPost.headline" class="font-bold text-xl text-center pb-2 mb-2 border-b"></div>
    <div class="grid xl:grid-cols-2 gap-2">
      <div v-html="newsPost.summary" class="text-center"></div>
      <img :src="newsPost.image" class="m-2"/>
    </div>
  </div>
</template>

<style scoped>

</style>
