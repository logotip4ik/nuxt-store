<template>
  <div class="__main">
    <Header />
    <nuxt />
    <Footer />
  </div>
</template>

<script>
import Header from '@/components/general/Header'
import Footer from '@/components/general/Footer'

export default {
  components: {
    Header,
    Footer
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
  vertical-align: baseline;
}
body {
  font-family: 'Nunito', sans-serif;
  min-height: 100vh;
  background: #fafafa;
  ::selection {
    background-color: #9c9eaf;
  }
}
.page-enter-active,
.page-leave-active {
  transition: opacity 300ms ease-out;
}
.page-enter,
.page-leave-to {
  opacity: 0;
}
.__main {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>
