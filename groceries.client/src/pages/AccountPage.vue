<template>
  <div class="account d-flex flex-column gap-3 align-items-center text-visible"
    :style="{ backgroundImage: `url(${account.coverImg})` }">
    <div class="pos-relative" id="pictureElement">
      <img class="account-photo" :src="account.picture" alt="" />
      <i class="mdi mdi-square-edit-outline edit-icon" type="button" aria-label="Edit Picture"
        @click="toggleHidden('picture')"></i>
    </div>
    <form @submit.prevent="" class="hidden" id="pictureForm">
      <div class="input-group">
        <div class="form-floating mb-3">
          <input type="url" class="form-control" name="floatingPicture" id="floatingPicture" placeholder="Picture URL">
          <label for="floatingPicture">Picture URL</label>
        </div>
        <button class="btn btn-light bg-light submit" type="submit"><i class="mdi mdi-plus"></i></button>
      </div>
    </form>
    <div class="d-flex gap-2 align-items-center" id="nameElement">
      <h1>{{ account.name }}</h1>
      <i class="mdi mdi-square-edit-outline" type="button" aria-label="Edit Name" @click="toggleHidden('name')"></i>
    </div>
    <form @submit.prevent="" class="hidden" id="nameForm">
      <div class="input-group">
        <div class="form-floating mb-3">
          <input type="text" class="form-control" name="floatingName" id="floatingName" placeholder="Name">
          <label for="floatingName">Name</label>
        </div>
        <button class="btn btn-light bg-light submit" type="submit"><i class="mdi mdi-plus"></i></button>
      </div>
    </form>
    <div class="d-flex gap-2 align-items-center" id="emailElement">
      <p class="m-0">{{ account.email }}</p>
      <i class="mdi mdi-square-edit-outline" type="button" aria-label="Edit Email" @click="toggleHidden('email')"></i>
    </div>
    <form @submit.prevent="" class="hidden" id="emailForm">
      <div class="input-group">
        <div class="form-floating mb-3">
          <input type="text" class="form-control" name="floatingEmail" id="floatingEmail" placeholder="E-mail">
          <label for="floatingEmail">E-mail</label>
        </div>
        <button class="btn btn-light bg-light submit" type="submit"><i class="mdi mdi-plus"></i></button>
      </div>
    </form>
  </div>
</template>

<script>
import { computed } from 'vue'
import { AppState } from '../AppState'
export default {
  setup() {
    return {
      account: computed(() => AppState.account),
      toggleHidden(elementId) {
        document.getElementById(elementId + "Element").classList.toggle("hidden")
        document.getElementById(elementId + "Form").classList.toggle("hidden")
        console.log("elem", document.getElementById(elementId + "Element"))
        console.log("form", document.getElementById(elementId + "Form"))
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
