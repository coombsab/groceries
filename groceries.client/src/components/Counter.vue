<template>
  <section class="counter text-visible d-flex">
    <div>{{itemsCheckedCount}}</div>
    <div>/</div>
    <div v-if="true">{{itemsCount}}</div>
    <div v-else>{{itemsHistoricalCount}}</div>
  </section>
</template>

<script>
import { computed } from "@vue/reactivity";
import { AppState } from "../AppState";

export default {
  setup() {
    
    return {
      itemsCount: computed(() => AppState.items.length),
      itemsCheckedCount: computed(() => AppState.items.filter(i => i.isChecked).length),
      itemsHistoricalCount: computed(() => AppState.itemsHistorical.length)
    }
  }
}
</script>

<style scoped lang="scss">
  
</style>