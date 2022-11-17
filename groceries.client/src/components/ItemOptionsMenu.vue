<template>
  <button class="btn" @click="optionsPopOver()"><img src="../assets/img/dots.png" alt="options" title="Item Options"></button>
</template>

<script>
import { Item } from "../models/Item"
import { itemsService } from "../services/ItemsService"

export default {
  props: {
    item: { type: Item, required: true }
  },
  
  setup(props) {
    return {
      optionsPopOver() {
        let modal = document.getElementById("itemOptionsModal")
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
  img {
    filter: drop-shadow(0 0 3px rgb(247, 247, 247))
  }
</style>