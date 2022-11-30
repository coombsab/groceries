<template>
  <div class="modal-bg" :id="id">
    <div class="modal-content-wrapper">
      <div class="modal-content" :id="id + 'Content'">
        <slot>

        </slot>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted } from "vue";
import Pop from "../utils/Pop";

export default {
  props: {
    id: { type: String }
  },
  setup(props) {
    function setupModal() {
      try {
        let modalBg = document.getElementById(props.id);
        let modal = document.getElementById(props.id + "Content");
        modalBg.addEventListener("click", closeModal);
        modal.addEventListener("click", modalClick);
      }
      catch (error) {
        Pop.error(error.message, "[setupModal]")
      }
    }

    function modalClick(event) {
      // event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();
      return false;
    }

    function closeModal() {
      let modal = document.getElementById(props.id);
      let body = document.querySelector("body");
      modal.style.display = "none";
      body.style.overflow = "auto";
      const editNameBtnElem = document.getElementById("editNameBtn")
      const editNameSubmitInputGroup = document.getElementById("editNameSubmitInputGroup")

      if (editNameBtnElem.classList.contains("hidden")) {
        editNameBtnElem.classList.toggle("hidden")
        editNameSubmitInputGroup.classList.toggle("hidden")
      }
    }

    onMounted(() => {
      setupModal()
    })

    return {

    }
  }
}
</script>

<style scoped lang="scss">
.modal-bg {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.75);
  z-index: 2000;
}

.modal-content-wrapper {
  height: 100%;
  width: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2001;
}

.modal-content {
  height: fit-content;
  width: fit-content;
  background-color: #E5E5E5;
  border-radius: 6.94872px;
  z-index: 2002;
  background-color: rgba(0, 0, 0, 0);
}
</style>