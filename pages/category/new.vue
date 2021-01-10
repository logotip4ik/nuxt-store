<template>
  <div>
    <h1>This is category: new</h1>
    {{ products }}
  </div>
</template>

<script>
export default {
  async asyncData({ store }) {
    const products = await store.dispatch('getNewProducts')

    return { products }
  }
}
</script>

<style></style>
