<template>
  <div class="account d-flex flex-column gap-3 align-items-center text-visible"
    :style="{ backgroundImage: `url(${account.coverImg})` }">
    <div class="pos-relative picture-element" id="pictureElement">
      <img class="account-photo picture-element" :src="account.picture" alt="" />
      <i class="mdi mdi-square-edit-outline edit-icon picture-element" type="button" aria-label="Edit Picture"
        @click="toggleHidden('picture')"></i>
    </div>
    <form @submit.prevent="editAccount('picture')" class="hidden" id="pictureForm">
      <div class="input-group">
        <div class="form-floating mb-3">
          <input type="url" class="form-control" name="pictureFloating" id="pictureFloating" placeholder="Picture URL" required v-model="editable.picture" onfocus="select()">
          <label for="pictureFloating">Picture URL</label>
        </div>
        <button class="btn btn-light bg-light submit" type="submit"><i class="mdi mdi-plus"></i></button>
      </div>
    </form>
    <div class="d-flex gap-2 align-items-center name-element" id="nameElement">
      <h1 class="name-element">{{ account.name }}</h1>
      <i class="mdi mdi-square-edit-outline name-element" type="button" aria-label="Edit Name" @click="toggleHidden('name')"></i>
    </div>
    <form @submit.prevent="editAccount('name')" class="hidden" id="nameForm">
      <div class="input-group">
        <div class="form-floating mb-3">
          <input type="text" class="form-control" name="nameFloating" id="nameFloating" placeholder="Name" required v-model="editable.name" onfocus="select()">
          <label for="nameFloating">Name</label>
        </div>
        <button class="btn btn-light bg-light submit" type="submit"><i class="mdi mdi-plus"></i></button>
      </div>
    </form>
    <div class="d-flex gap-2 align-items-center">
      <p class="m-0 email-element">{{ account.email }}</p>
    </div>
  </div>
</template>

<script>
import { computed, ref, watchEffect } from 'vue'
import { AppState } from '../AppState'
import { accountService } from "../services/AccountService"
import Pop from "../utils/Pop"
export default {
  setup() {
    const editable = ref({})

    watchEffect(() => {
      editable.value = { ...AppState.account }
    })
    
    return {
      editable,
      account: computed(() => AppState.account),
      toggleHidden(elementId) {
        // document.getElementById(elementId + "Element").classList.toggle("hidden")
        const elems = document.querySelectorAll(`.${elementId}-element`)
        elems.forEach(elem => elem.classList.toggle("hidden"))
        document.getElementById(elementId + "Form").classList.toggle("hidden")
        document.getElementById(elementId + "Floating").focus()
      },
      async editAccount(elementId) {
        try {
          this.toggleHidden(elementId)
          await accountService.editAccount(editable.value)
        }
        catch(error) {
          Pop.error(error.message, "[editAccount] > AccountPage")
        }
      }
    }
  }
}
</script>

<style scoped>
.account {
  background-position: center;
  background-size: cover;
  height: 50vh;
}

.account-photo {
  border-radius: 50%;
  height: 128px;
  width: 128px;
}

.pos-relative {
  position: relative;
}

.edit-icon {
  position: absolute;
  right: 12%;
  top: 12%;
}

.input-group {
  height: 58px;
}

button {
  height: 58px;
}

.hidden {
  display: none;
}
</style>
