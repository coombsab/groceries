<template>
  <section class="item-card px-3 py-1 text-visible" :id="'item-card-' + item.name">
    <div class="content-wrapper d-flex align-items-center gap-2 justify-content-between">
      <CreatorIcon :key="item.id" :item="item" />
      <div>
        <div class="content d-flex gap-2 align-items-center flex-grow-1 text-center" v-if="inUseList">
          <input type="checkbox" :id="'checkbox-' + item.name" @click="toggleFormatting()">
          <label :for="'checkbox-' + item.name" :id="'checkbox-label-' + item.name" class="flex-grow-1">{{item.name}}</label>
        </div>
        <div class="content d-flex gap-2 align-items-center flex-grow-1 text-center" v-else>
          <span class="flex-grow-1" @click="addToList()">{{item.name}}</span>
        </div>
      </div>
      <ItemOptionsMenu :key="item.id" :item="item" />
    </div>
    
  </section>
</template>

<script>
import { computed, ref } from "@vue/reactivity";
import { AppState } from "../AppState";
import { Item } from "../models/Item";
import { itemsService } from "../services/ItemsService";
import Pop from "../utils/Pop";
import CreatorIcon from "./CreatorIcon.vue";
import ItemOptions from "./ItemOptionsMenu.vue";

export default {
    props: {
        item: { type: Item, required: true }
    },
    setup(props) {
        const editable = ref();
        return {
            account: computed(() => AppState.account),
            inUseList: computed(() => AppState.inUseList),
            toggleFormatting() {
                document.getElementById("checkbox-label-" + props.item.name).classList.toggle("checked");
                document.getElementById("item-card-" + props.item.name).classList.toggle("checked-card");
            },
            async addToList() {
              try {
                await itemsService.toggleInUse(props.item.id)
                Pop.toast(`${props.item.name} added to list`, "success", "center")
              }
              catch(error) {
                Pop.error(error.message, "[addToList] > ItemCard")
              }
            }
        };
    },
    components: { CreatorIcon, ItemOptions }
}
</script>

<style scoped lang="scss">
  input[type=checkbox] {
    display: none;
  }

  .checked {
    // text-decoration: line-through;
    // color: rgb(0, 123, 255);
    filter: brightness(0.5);
  }

  .checked-card {
    background-color: rgba(167, 88, 236, 0.249);
    filter: brightness(0.5);
  }

</style>