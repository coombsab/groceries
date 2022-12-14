<template>
    <section class="item-card px-3 py-1 text-visible" :key="item.name + item.isChecked"
      :class="item.isChecked ? 'checked-card' : ''">
      <div class="content-wrapper d-flex align-items-center gap-2 justify-content-between">
        <CreatorIcon :key="item.id + '-creatorIcon'" :item="item" />
        <div class="content d-flex gap-2 align-items-center flex-grow-1 text-center" v-if="inUseList">
          <input type="checkbox" :id="'checkbox-' + item.id" @click="toggleChecked()">
          <label :for="'checkbox-' + item.id" :id="'checkbox-label-' + item.id" class="flex-grow-1"
            :class="item.isChecked ? 'checked' : ''">{{ item.name }}</label>
        </div>
        <div class="content d-flex gap-2 align-items-center flex-grow-1 text-center" v-else>
          <span class="flex-grow-1" @click="addToListFromHistory()">{{ item.name }}</span>
        </div>
        <ItemOptionsMenu :key="item.id + '-optionsMenu'" :item="item" />
      </div>
    </section>
</template>

<script>
import { computed, ref } from "@vue/reactivity";
import { AppState } from "../AppState";
import { ListHandler } from "../handlers/ListHandler";
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
        const itemCard = document.getElementById("item-card-" + props.item.id);
        document.getElementById("checkbox-label-" + props.item.id).classList.toggle("checked");
        itemCard.classList.toggle("checked-card");
      },
      async toggleChecked() {
        try {
          this.toggleFormatting()
          await itemsService.toggleChecked(props.item.id)
          ListHandler.toggleIsItemChecked(props.item.id)
        }
        catch (error) {
          this.toggleFormatting();
          Pop.error(error.message, "[toggleChecked]");
        }
      },
      async addToListFromHistory() {
        try {
          await itemsService.toggleInUse(props.item.id)
          ListHandler.addItem(props.item.id)
          Pop.toast(`${props.item.name} added to list`, "success", "bottom")

        }
        catch (error) {
          Pop.error(error.message, "[addToListFromHistory] > ItemCard")
        }
      },

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
  filter: brightness(0.375);
}

.checked-card {
  background-color: rgba(167, 88, 236, 0.249);
  // filter: brightness(0.5);
}
</style>