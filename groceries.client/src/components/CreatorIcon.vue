<template>
  <button class="btn" @click="popOver()"><img class="creator-icon elevation-3" :src="item.creator.picture" :alt="item.creator.name" :title="item.creator.name"></button>
</template>

<script>
import { Item } from "../models/Item";
import { itemsService } from "../services/ItemsService";

export default {
  props: {
    item: { type: Item, required: true }
  },
  setup(props) {

    return {
      popOver() {
        let modal = document.getElementById("creatorInfoModal")
        let body = document.querySelector("body")
        modal.style.display = "block"
        body.style.overflow = "hidden"
        itemsService.setActiveItem(props.item)
      }
    }
  }
}
</script>

<style scoped lang="scss">
.creator-icon {
  height: 16px;
  width: 16px;
  border-radius: 50%;
}
</style>