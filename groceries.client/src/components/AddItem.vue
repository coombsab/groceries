<template>
  <form class="add-item-form w-100 p-3" @submit.prevent="addItem()">
    <div class="input-group">
      <div class="form-floating">
        <input type="text" class="form-control" id="floatingItemName" placeholder="Add item" v-model="editable.name" required>
        <label for="floatingItemName">Add item</label>
      </div>
      <button class="btn btn-light" type="submit"><i class="mdi mdi-magnify"></i></button>
    </div>
  </form>
</template>

<script>
import { ref } from "vue";
import { ListHandler } from "../handlers/ListHandler";
import { itemsService } from "../services/ItemsService";
import Pop from "../utils/Pop";

export default {
  setup() {
    const editable = ref({})
    return {
      editable,
      async addItem() {
        try {
          const item = await itemsService.addItem(editable.value.name)
          ListHandler.addItem(item.id)
          editable.value = {}
        }
        catch(error) {
          Pop.error(error.message, "addItem(name) - AddItem.vue")
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
  .add-item-form {
    position: fixed;
    bottom: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.75);
  }
</style>