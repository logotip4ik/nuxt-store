<template>
  <main>
    <header>
      <div class="bg-image"></div>
      <div class="slogan">
        <h1 class="">This is <span class="invert">our</span> slogan</h1>
      </div>
    </header>
  </main>
</template>

<script>
export default {
  head() {
    return {
      script: [{ src: 'https://identity.netlify.com/v1/netlify-identity-widget.js' }]
    }
  }
}
</script>

<style lang="scss" scoped>
main {
  min-height: 100vh;

  header {
    display: flex;
    flex-direction: column;
    min-height: 100vh;

    .bg-image {
      width: 100%;
      height: 75vh;
      min-height: 600px;
      background: linear-gradient(rgba($color: #000000, $alpha: 0.6), rgba($color: #000000, $alpha: 0.3)),
        url('https://source.unsplash.com/aL7SA1ASVdQ/1600x900');
      background-repeat: no-repeat;
      background-attachment: fixed;
      background-size: cover;
    }

    .slogan {
      min-height: 200px;
      flex-grow: 1;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;

      .invert {
        border-radius: 0.25rem;
        padding: 0.25rem 1rem;
        background: black;
        color: white;
      }
    }
  }
}
</style>
