<template>
  <section class="item-options">
    <button class="text-visible rounded" id="editNameBtn" @click="toggleHidden()">Edit Name</button>
    <form @submit.prevent="editItem()">
      <div class="input-group hidden" id="editNameSubmitInputGroup">
        <div class="form-floating">
          <input type="text" class="form-control" placeholder="Edit Name" id="floatingEditName" minlength="1"
            v-model="editable.name">
          <label for="floatingEditName">Edit Name</label>
        </div>
        <button class="btn btn-light bg-light submit" type="submit" @click="toggleHidden()"><i
            class="mdi mdi-magnify"></i></button>
      </div>
    </form>
    <button class="text-visible rounded">Remove from List</button>
    <button class="text-visible rounded">Delete from Database</button>
  </section>
</template>

<script>
import { computed } from "@vue/reactivity"
import { ref } from "vue"
import { AppState } from "../AppState"
import { itemsService } from "../services/ItemsService"
import Pop from "../utils/Pop"

export default {
  setup() {
    const editable = ref({})
    return {
      editable,
      item: computed(() => AppState.activeItem),
      toggleHidden() {
        document.getElementById("editNameBtn").classList.toggle("hidden")
        document.getElementById("editNameSubmitInputGroup").classList.toggle("hidden")
      },
      async editItem() {
        try {
          await itemsService.editItem(editable.value.name, item.id)
          Pop.toast(`${item.name} has been renamed ${editable.value.name}`, "success", "top")
          editable.value = {}
        }
        catch (error) {
          Pop.error(error.message, "[editItem] < ItemOptions")
        }
      },
      async removeItemFromList() {
        try {
          const yes = Pop.confirm(`Do you wish to remove ${item.name} from the active list?`)
          if (!yes) {
            return
          }
          await itemsService.toggleInUse(item.id)
        }
        catch (error) {
          Pop.error(error.message, "[removeItemFromList] < ItemOptions")
        }
      },
      async deleteItem() {
        try {
          const yes = Pop.confirm(`Do you wish to delete ${item.name} from the databse?`)
          if (!yes) {
            return
          }
          await itemsService.deleteItem(item.id)
        }
        catch (error) {
          Pop.error(error.message, "[deleteItem] < ItemOptions")
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
.item-options {
  display: flex;
  flex-direction: column;
  align-items: center;
}

button {
  margin-bottom: 1rem;
  background-color: rgba(0, 0, 0, 0);
  width: fit-content;
}

.submit {
  height: 58px;
}

.floatingEditName {
  height: 58px;
}

.hidden {
  display: none;
}
</style>