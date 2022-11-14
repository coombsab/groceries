<template>
  <section class="creator-info text-visible">
    <h5 class="text-center">Created by</h5>
    <div class="d-flex flex-wrap gap-3 align-items-center">
      <img :src="item?.creator.picture" :alt="item?.creator.name">
      <h2>{{item?.creator.name}}</h2>
    </div>
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
.creator-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

img {
  border-radius: 50%;
  height: 64px;
  width: 64px;
}
</style>