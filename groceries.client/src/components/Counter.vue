<template>
  <section class="counter text-visible d-flex" @click="removeInUseItems()">
    <div class="checked-count">{{itemsCheckedCount}}</div>
    <div class="divider d-flex justify-content-center align-items-center">/</div>
    <div class="total-count">{{itemsCount}}</div>
  </section>
</template>

<script>
import { computed } from "@vue/reactivity";
import { AppState } from "../AppState";
import { itemsService } from "../services/ItemsService";
import Pop from "../utils/Pop";

export default {
  setup() {
    
    return {
      itemsCount: computed(() => AppState.items.length),
      itemsCheckedCount: computed(() => AppState.items.filter(i => i.isChecked).length),
      itemsHistoricalCount: computed(() => AppState.itemsHistorical.length),
      async removeInUseItems() {
        try {
          const yes = await Pop.confirm("Clear the list?")
          if (!yes) {
            return
          }
          await itemsService.removeInUseItems()
        }
        catch(error) {
          Pop.error(error.message, "[removeInUseItems] < Counter")
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
  .counter {
    position: relative;
    height: 32px;
    width: 32px;
    font-size: 14px;
  }

  .divider {
    height: 100%;
    width: 100%;
  }

  .checked-count {
    position: absolute;
    top: 0;
    left: 4px;
  }

  .total-count {
    position: absolute;
    bottom: 0;
    right: 4px;
  }
</style>