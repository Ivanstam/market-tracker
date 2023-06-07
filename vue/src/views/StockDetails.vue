<script setup>
import PageComponent from '../components/PageComponent.vue';
import {useRoute} from "vue-router";
import store from "../store/index.js";
import {onMounted, ref, computed} from "vue";

const route = useRoute();
const symbol = ref('');
const stockInfo = computed(() => store.state.stockInfo);
onMounted(() => {
  symbol.value = route.params.symbol;
  if (symbol.value) {
    getStockInfo()
  }
});
function getStockInfo() {
  store.dispatch('getStockInfo', symbol.value)
}

</script>

<template>
  <PageComponent title="Stock Details">
    <div class="p-2 grid cols-1 gap-3 border border-slate-500 shadow-md" >
      <div v-if="!stockInfo.Symbol">Selected Symbol is not a company</div>
      <div v-if="stockInfo.Symbol" v-html="stockInfo.Name" class="text-2xl font-bold"></div>
      <div v-if="stockInfo.Symbol" class="grid grid-cols-5 py-2 px-2 items-stretch">
        <div class="font-bold">Symbol</div>
        <div class="font-bold">Exchange</div>
        <div class="text-center font-bold">Currency</div>
        <div class="text-right font-bold">Country</div>
        <div class="text-right font-bold">Currency</div>
        <div v-html="stockInfo.Symbol" class=""></div>
        <div v-html="stockInfo.Exchange" class=""></div>
        <div v-html="stockInfo.Currency" class="text-center"></div>
        <div v-html="stockInfo.Country" class="text-right"></div>
        <div v-html="stockInfo.Currency" class="text-right"></div>
      </div>
      <div v-if="stockInfo.Symbol" v-html="stockInfo.Description" class="p-2 ">

      </div>
    </div>
    <pre> {{ stockInfo }}</pre>
  </PageComponent>
</template>

<style>
</style>
