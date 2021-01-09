<template>
  <main v-if="storeItems" class="main">
    <h1 class="title text-left">Items</h1>
    <ul v-for="(item, index) in storeItems" :key="index" class="articles">
      <div class="dark:text-white">
        <pre>{{ storeItems }}</pre>
      </div>
      <!-- <nuxt-link :to="`blog/${blogPost.slug}`" class="article article--clickable">
        <div class="flex justify-between align-baseline">
          <h3 class="article-title">{{ blogPost.title }}</h3>
          <h6
            v-if="blogPost.date"
            class="inline-block py-1 px-2 bg-accent text-white font-medium rounded-sm dark:bg-accent whitespace-no-wrap"
          >
            {{ formatDate(blogPost.date) }}
          </h6>
        </div>
        <div class="mt-4 mb-2">
          <p class="inline">{{ blogPost.description }}</p>
        </div>
      </nuxt-link> -->
    </ul>
  </main>
</template>
<script>
export default {
  computed: {
    storeItems() {
      return this.$store.state.storeItems
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
