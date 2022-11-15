<template>
  <nav class="navbar navbar-expand-lg navbar-dark px-3">
    <router-link class="navbar-brand d-flex" :to="{ name: 'Home' }">
      <div class="d-flex flex-column align-items-center">
        <img alt="logo" src="../assets/img/grocries-logo-no-bg.png" height="45" />
      </div>
    </router-link>

    <!-- TODO get text to toggle -->
    <span class="btn btn-outline-light" @click="toggleList()">{{buttonText}}</span>
    <button
      class="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarText"
      aria-controls="navbarText"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarText">
      <ul class="navbar-nav me-auto">
        <li>
          <router-link :to="{ name: 'About' }" class="btn text-success lighten-30 selectable text-uppercase">
            About
          </router-link>
        </li>
      </ul>
      <!-- LOGIN COMPONENT HERE -->
      <Login />
    </div>
  </nav>
</template>

<script>
import { computed } from "@vue/reactivity";
import { watchEffect } from "vue";
import { AppState } from "../AppState";
import Login from './Login.vue'
export default {
  setup() {
    let buttonText = "History"

    watchEffect(() => {
      if(AppState.inUseList) {
        console.log("History")
        buttonText = "History"
      } else {
        console.log("List")
        buttonText = "List"
      }
    })

    return {
      buttonText,
      isInUseList: computed(() => AppState.isInUseList),
      toggleList() {
        AppState.inUseList = !AppState.inUseList
      }
    }
  },
  components: { Login }
}
</script>

<style scoped>
a:hover {
  text-decoration: none;
}

.nav-link {
  text-transform: uppercase;
}

nav {
  background-color: rgba(0, 0, 0, 0);
}

.navbar-nav .router-link-exact-active {
  border-bottom: 2px solid var(--bs-success);
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

img {
  filter: drop-shadow(0 0 3px rgb(247, 247, 247))
}

@media screen and (min-width: 768px) {
  nav {
    height: 64px;
  }
}

</style>
