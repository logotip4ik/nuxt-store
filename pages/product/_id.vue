<template>
  <article v-if="product" class="main article">
    <h1 class="article-title">{{ product.title }}</h1>
    <h6
      v-if="product.date"
      class="inline-block py-1 px-2 my-2 bg-accent text-white font-medium rounded-sm dark:bg-accent whitespace-no-wrap"
    >
      {{ formatDate(product.date) }}
    </h6>
    <div v-html="$md.render(product.body)" />
  </article>
</template>
<script>
export default {
  async asyncData({ params, payload }) {
    console.log({ params, payload })
    if (payload) return { product: payload }
    else
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
