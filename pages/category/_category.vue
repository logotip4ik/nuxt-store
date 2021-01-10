<template>
  <div>
    <h1>This is category: {{ category }}</h1>
    <pre>{{ products }}</pre>
  </div>
</template>

<script>
export default {
  async asyncData({ params, store }) {
    const products = await store.dispatch('getProductsByType', params.category)
    return { category: params.category, products }
  }
}
</script>

<style></style>
