<template>
  <footer>
    <a
      href="https://unsplash.com/photos/aL7SA1ASVdQ?utm_source=unsplash&utm_medium=referral&utm_content=creditShareLink"
    >
      Background Photo
    </a>
    <a href="https://jolybell.com/">
      Inspired by JolyBell
    </a>
    <a href="https://bogdankostyuk.xyz/">
      Coded by BogdanKostyuk
    </a>
  </footer>
</template>

<script>
export default {
  name: 'Footer'
}
</script>

<style lang="scss" scoped>
footer {
  margin-top: auto;
  background: #0d0d0e;
  color: white !important;
  padding: 1rem 1.25rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  text-align: center;

  a {
    color: white;
    text-decoration: none;
    font-size: 1.1rem;
    transition: transform 200ms ease-out;

    &:not(:last-child) {
      margin-bottom: 1rem;
    }

    &:hover {
      text-decoration: underline;
      transform: translate(2px, -2px);
    }
  }
}
</style>
