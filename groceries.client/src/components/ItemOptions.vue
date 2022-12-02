<template>
  <section class="item-options">
    <button class="text-visible rounded" id="editNameBtn" @click="toggleHidden()">Edit Name</button>
    <form @submit.prevent="editItem()">
      <div class="input-group hidden" id="editNameSubmitInputGroup">
        <div class="form-floating">
          <input type="text" class="form-control" placeholder="Edit Name" id="floatingEditName" minlength="1"
            v-model="editable.name" onfocus="select()">
          <label for="floatingEditName">Edit Name</label>
        </div>
        <button class="btn btn-light bg-light submit" type="submit"><i class="mdi mdi-plus"></i></button>
      </div>
    </form>
    <button class="text-visible rounded" @click="removeItemFromList()" v-if="inUseList">Remove from List</button>
    <button class="text-visible rounded" @click="deleteItem()">Delete from Database</button>
  </section>
</template>

<script>
import { computed } from "@vue/reactivity"
import { ref, watchEffect } from "vue"
import { AppState } from "../AppState"
import { itemsService } from "../services/ItemsService"
import Pop from "../utils/Pop"

export default {
  setup() {
    const editable = ref({})

    watchEffect(() => {
      editable.value = { ...AppState.activeItem }
    })

    return {
      editable,
      item: computed(() => AppState.activeItem),
      inUseList: computed(() => AppState.inUseList),
      toggleHidden() {
        document.getElementById("editNameBtn").classList.toggle("hidden")
        document.getElementById("editNameSubmitInputGroup").classList.toggle("hidden")
      },
      async editItem() {
        try {
          const oldItemName = this.item.name
          await itemsService.editItem(editable.value.name, this.item.id)
          Pop.toast(`${oldItemName} has been renamed ${editable.value.name}`, "success", "bottom")
          this.toggleHidden()
          this.closeModal()
        }
        catch (error) {
          Pop.error(error.message, "[editItem] < ItemOptions")
        }
      },
      async removeItemFromList() {
        try {
          this.closeModal()

          // Don't necessarily need to confirm removing from list
          // const yes = await Pop.confirm(`Do you wish to remove ${this.item.name} from the active list?`)
          // if (!yes) {
          //   return
          // }
          Pop.toast(`${this.item.name} removed from list`, "success", "bottom")
          await itemsService.toggleInUse(this.item.id)
        }
        catch (error) {
          Pop.error(error.message, "[removeItemFromList] < ItemOptions")
        }
      },
      async deleteItem() {
        try {
          this.closeModal()
          const yes = await Pop.confirm(`Do you wish to delete ${this.item.name} from the databse?`)
          if (!yes) {
            return
          }
          await itemsService.deleteItem(this.item.id)
        }
        catch (error) {
          Pop.error(error.message, "[deleteItem] < ItemOptions")
        }
      },
      closeModal() {
        let modal = document.getElementById("itemOptionsModal");
        let body = document.querySelector("body");
        modal.style.display = "none";
        body.style.overflow = "auto";
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