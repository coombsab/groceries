<template>
  <div class="wrapper fadeOut">
    <div class="spin-container m-auto">
      <div class="inner-wrapper">
        <div class="spin" id="loader"></div>
      </div>
      <div class="inner-wrapper">
        <div class="spin" id="loader2"></div>
      </div>
      <div class="inner-wrapper">
        <div class="spin" id="loader3"></div>
      </div>
      <div class="spin" id="loader4"></div>
      <div class="inner-wrapper">
        <span class="fs-3 fw-700">LOADING...</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  setup() {

    return {

    }
  }
}
</script>

<style scoped lang="scss">
:root {
  --animation-time: infinite;
}

.wrapper {
  position: absolute;
  // height: 100%;
  width: 100%;
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.inner-wrapper {
  background-color: transparent;
  width: 260px;
  height: 260px;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.spin-container {
  text-align: center;
  background-color: transparent;
  height: fit-content;
  width: fit-content;
  position: relative;
}

.spin {
  border-radius: 50%;
}

#loader {
  border: 3px solid #0D4B9F;
  width: 200px;
  height: 200px;
  border-left-color: transparent;
  border-right-color: transparent;
  animation: rotate 2s cubic-bezier(0.26, 1.36, 0.74, -0.29) infinite;
}

#loader2 {
  border: 3px solid #91a5c1;
  width: 220px;
  height: 220px;
  border-left-color: transparent;
  border-right-color: transparent;
  animation: rotate2 2s cubic-bezier(0.26, 1.36, 0.74, -0.29) infinite;
}

#loader3 {
  border: 3px solid #005CDC;
  width: 240px;
  height: 240px;
  border-left-color: transparent;
  border-right-color: transparent;
  animation: rotate 2s cubic-bezier(0.26, 1.36, 0.74, -0.29) infinite;
}

#loader4 {
  border: 3px solid #94B6E5;
  width: 260px;
  height: 260px;
  position: relative;
  top: 0;
  border-left-color: transparent;
  border-right-color: transparent;
  animation: rotate2 2s cubic-bezier(0.26, 1.36, 0.74, -0.29) infinite;
}

@keyframes rotate {
  0% {
    transform: rotateZ(-360deg)
  }

  100% {
    transform: rotateZ(0deg)
  }
}

@keyframes rotate2 {
  0% {
    transform: rotateZ(360deg)
  }

  100% {
    transform: rotateZ(0deg)
  }
}

#text {
  color: #D6E3F6;
  font-family: Arial;
  font-size: 15px;
}

.fadeOut {
  animation: fadeOut ease 8s;
  animation-fill-mode: forwards;
}

@keyframes fadeOut {
  0% {
    opacity: 1;
  }

  75% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
}
</style>