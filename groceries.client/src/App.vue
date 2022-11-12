<template>
  <header>
    <Navbar />
  </header>
  <main :style="{ backgroundImage: `url(${apod.hdurl ? apod.hdurl : apod.url})` }">
    <router-view />
  </main>
  <!-- <footer class="bg-dark text-light">
    Made with 💖 by CodeWorks
  </footer> -->
  <PopModal :id="'creatorInfoModal'">
    <CreatorInfo />
  </PopModal>
  <PopModal :id="'itemOptionsModal'">
    <ItemOptions />
  </PopModal>
</template>

<script>
import { computed, onMounted } from 'vue'
import { AppState } from './AppState'
import CreatorInfo from "./components/CreatorInfo.vue"
import ItemOptions from "./components/ItemOptions.vue"
import Navbar from './components/Navbar.vue'
import PopModal from "./components/PopModal.vue"
import { nasaService } from "./services/NasaService"
import Pop from "./utils/Pop"

export default {
  setup() {
    async function getApod() {
      try {
        await nasaService.getApod()
      }
      catch (error) {
        Pop.error(error.message, "[getApod]")
      }
    }

    onMounted(() => {
      getApod()
    })

    return {
      appState: computed(() => AppState),
      apod: computed(() => AppState.apod)
    }
  },
  components: { Navbar, CreatorInfo, PopModal, ItemOptions }
}
</script>

<style lang="scss">
@import "./assets/scss/main.scss";

:root{
  --main-height: calc(100vh - 32px - 64px);
}

main {
  background-color: rgb(10, 10, 10);
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
}

footer {
  display: grid;
  place-content: center;
  height: 32px;
}
</style>
