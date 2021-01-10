<template>
  <div>
    <Header />
    <nuxt />
  </div>
</template>

<script>
import Header from '~/components/general/Header.vue'

export default {
  components: {
    Header
  }
}
</script>

<style lang="scss">
*,
*::before,
*::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body {
  font-family: 'Nunito', sans-serif;
  min-height: 100vh;
}
.page-enter-active,
.page-leave-active {
  transition: opacity 300ms ease-out;
}
.page-enter,
.page-leave-to {
  opacity: 0;
}
</style>
