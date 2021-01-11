<template>
  <article v-if="product">
    <pre>{{ product }}</pre>
  </article>
</template>
<script>
export default {
  async asyncData({ params }) {
    return {
      product: await require(`~/assets/content/products/${params.id}.json`)
    }
  },
  methods: {
    formatDate(dateString) {
      const date = new Date(dateString)
      return date.toLocaleDateString(process.env.lang) || ''
    }
  }
}
</script>

<style lang="scss" scoped>
// body {
//   background: #111113;
// }
</style>
