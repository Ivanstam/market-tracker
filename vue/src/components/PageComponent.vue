<script setup>
defineProps({
  title: String,
})
</script>

<template>
  <header class="shadow-xl bg-slate-800">
    <div class="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
      <h1 class="text-3xl font-bold tracking-tight">
        {{ title }}
      </h1>
    </div>
  </header>
  <main>
    <div class="mx-auto max-w-7xl py-3 px-4">
      <slot>
        <!--    Body content here    -->
      </slot>
    </div>
  </main>
</template>

<style></style>
