<template>
  <section class="counter text-visible d-flex" @click="removeInUseItems()">
    <Transition name="bounce" mode="out-in">
      <div class="checked-count m-auto" :key="itemsCheckedCount">{{ itemsCheckedCount }}</div>
    </Transition>
    <!-- <div class="divider d-flex justify-content-center align-items-center">/</div> -->
    <!-- <div class="total-count">{{itemsCount}}</div> -->
  </section>
</template>

<script>
import { computed } from "@vue/reactivity";
import { AppState } from "../AppState";
import { ListHandler } from "../handlers/ListHandler";
import { itemsService } from "../services/ItemsService";
import Pop from "../utils/Pop";

export default {
  setup() {

    return {
      itemsCount: computed(() => AppState.items.length),
      itemsCheckedCount: computed(() => AppState.items.filter(i => !i.isChecked).length),
      itemsHistoricalCount: computed(() => AppState.itemsHistorical.length),
      async removeInUseItems() {
        try {
          if (AppState.items.length === 0) {
            return
          }
          const yes = await Pop.confirm("Clear the list?")
          if (!yes) {
            return
          }
          await itemsService.removeInUseItems()
          ListHandler.getList()
          ListHandler.getHistory()
        }
        catch (error) {
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
  // font-size: 14px;
  perspective: 1000px;
}

.counter:target {
  background: red;
  color: red;
}

.divider {
  height: 100%;
  width: 100%;
}

.checked-count {
  transition: transform 0.25s;
  transform-style: preserve-3d;
}

.total-count {
  position: absolute;
  bottom: 0;
  right: 4px;
}

.slide-fade-enter-active {
  transition: all .3s ease;
}

.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}

.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}

.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.25);
  }
  100% {
    transform: scale(1);
  }
}

.flip-enter-active {
  transform: rotateY(90deg);
}

.flip-enter-to {

}

.flip-leave-active {
  transform: rotateY(90deg);

}
</style>