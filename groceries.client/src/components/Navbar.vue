<template>
  <nav class="d-flex justify-content-between align-items-center px-3">
    <router-link class="navbar-brand d-flex" :to="{ name: 'Home' }">
      <div class="d-flex flex-column align-items-center">
        <img alt="logo" src="../assets/img/grocries-logo-no-bg.png" class="logo" />
      </div>
    </router-link>
    <button class="btn" @click="toggleList()" v-if="route.name === 'Home'"><span class="text-visible">{{buttonText}}</span></button>
    <Login />
  </nav>
</template>

<script>
import { computed } from "@vue/reactivity";
import { watchEffect } from "vue";
import { useRoute } from "vue-router";
import { AppState } from "../AppState";
import Login from './Login.vue'
export default {
  setup() {
    const route = useRoute()

    return {
      route,
      buttonText: computed(() => AppState.buttonText),
      isInUseList: computed(() => AppState.isInUseList),
      toggleList() {
        AppState.inUseList = !AppState.inUseList
        if (AppState.inUseList) {
          AppState.buttonText = "List"
        } else {
          AppState.buttonText = "History"
        }
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
  height: 8vh;
}

.navbar-nav .router-link-exact-active {
  border-bottom: 2px solid var(--bs-success);
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

img {
  filter: drop-shadow(0 0 3px rgb(247, 247, 247));
  /* height: 40px; */
  max-width: 40px;
}

@media screen and (min-width: 768px) {
  nav {
    height: 64px;
  }
}

</style>
