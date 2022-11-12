<template>
  <section class="creator-info">
    <img :src="item?.creator.picture" :alt="item?.creator.name">
    <span>{{item?.creator.name}}</span>
  </section>
</template>

<script>
import { computed } from "@vue/reactivity";
import { AppState } from "../AppState";

export default {

  setup() {
    
    return {
      item: computed(() => AppState.activeItem)
    }
  }
}
</script>

<style scoped lang="scss">

</style>