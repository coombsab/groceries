<template>
  <section class="home" v-if="user.isAuthenticated">
    <ItemCard v-for="i in items" :key="i.id" :item="i" v-if="inUseList" />
    <ItemCard v-for="i in itemsHistorical" :key="i.name" :item="i" v-else />
    <AddItem />
  </section>
  <section class="flex-grow-1 d-flex align-items-center" v-else>
    <p class="fadeIn fs-1 fw-700 p-3 text-visible">Please login to see the list.</p>
    <Spinner />
  </section>
</template>

<script>
import { computed } from "@vue/reactivity";
import { onMounted } from "vue";
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
            items: computed(() => AppState.items.sort()),
            itemsHistorical: computed(() => AppState.itemsHistorical.sort()),
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
}
</style>
