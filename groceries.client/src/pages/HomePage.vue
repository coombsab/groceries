<template>
  <section class="home" v-if="user.isAuthenticated">
    <div class="cards">
      <ItemCard v-for="i in items" :key="i.id" :item="i" :id="'item-card-' + i.id" v-if="inUseList" />
      <ItemCard v-for="i in itemsHistorical" :key="i.id + '-historical'" :id="'item-card-' + i.id + '-historical'"
        :item="i" v-else />
    </div>
    <AddItem />
  </section>
  <section class="flex-grow-1 d-flex align-items-center" v-else>
    <p class="fadeIn fs-1 fw-700 p-3 text-visible">Please login to see the list.</p>
    <Spinner />
  </section>
</template>

<script>
import { computed } from "@vue/reactivity";
import { onMounted, watch } from "vue";
import { AppState } from "../AppState";
import Spinner from "../components/Spinner.vue";
import { itemsService } from "../services/ItemsService";
import Pop from "../utils/Pop";

export default {
  setup() {
    async function getItems() {
      try {
        await itemsService.getItemsInUse();
        await itemsService.getItemsHistorical();
      }
      catch (error) {
        Pop.error(error.message, "[getItems] < HomePage");
      }
    }
    onMounted(() => {
      getItems();

    });

    return {
      items: computed(() => {
        const checkedItems = AppState.items.filter(i => i.isChecked)
        const uncheckedItems = AppState.items.filter(i => !i.isChecked)

        checkedItems.sort((a, b) => {
          const nameA = a.name.toUpperCase(); // ignore upper and lowercase
          const nameB = b.name.toUpperCase(); // ignore upper and lowercase
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }

          // names must be equal
          return 0;
        })

        uncheckedItems.sort((a, b) => {
          const nameA = a.name.toUpperCase(); // ignore upper and lowercase
          const nameB = b.name.toUpperCase(); // ignore upper and lowercase
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }

          // names must be equal
          return 0;
        })

        AppState.items = uncheckedItems.concat(checkedItems)
        return AppState.items
      }),
      itemsHistorical: computed(() => AppState.itemsHistorical.sort((a, b) => {
        const nameA = a.name.toUpperCase(); // ignore upper and lowercase
        const nameB = b.name.toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }

        // names must be equal
        return 0;
      })),
      inUseList: computed(() => AppState.inUseList),
      user: computed(() => AppState.user)
    };
  },
  components: { Spinner }
}
</script>

<style scoped lang="scss">
.home {
  background-color: rgba(0, 0, 0, 0.288);
  flex-grow: 1;
}

.cards {
  height: 80vh;
  overflow-y: auto;
}
</style>
