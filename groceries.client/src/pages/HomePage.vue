<template>
  <section class="home">
    <ItemCard v-for="i in items" :key="i.id" :item="i" v-if="inUseList" />
    <ItemCard v-for="i in itemsHistorical" :key="i.name" :item="i" v-else />
    <AddItem />
  </section>
</template>

<script>
import { computed } from "@vue/reactivity";
import { onMounted } from "vue";
import { AppState } from "../AppState";
import { itemsService } from "../services/ItemsService";
import Pop from "../utils/Pop";



export default {
  setup() {
    async function getItems() {
      try {
        await itemsService.getItemsInUse()
        await itemsService.getItemsHistorical()
      }
      catch(error) {
        Pop.error(error.message, "[getItems] < HomePage")
      }
    }

    onMounted(() => {
      getItems()
    })
    
    return {
      items: computed(() => AppState.items.sort()),
      itemsHistorical: computed(() => AppState.itemsHistorical.sort()),
      inUseList: computed(() => AppState.inUseList)
    }
  }
}
</script>

<style scoped lang="scss">
.home {
  background-color: rgba(0, 0, 0, 0.288);
}
</style>
