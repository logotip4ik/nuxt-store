<template>
  <div class="container">
    <h1>{{ toTitleCase(category) }}</h1>
    <div class="products">
      <ProductCard v-for="product in products" :key="product.slug" :image="product.image" :slug="product.slug">
        <template v-slot:price>{{ product.price }} RUB</template>
        {{ product.title }}
      </ProductCard>
    </div>
  </div>
</template>

<script>
import ProductCard from '@/components/ProductCard'
export default {
  async asyncData({ params, store }) {
    const products = await store.dispatch('getProductsByType', params.category)
    return { category: params.category, products }
  },
  methods: {
    toTitleCase(str) {
      return str
        .toLowerCase()
        .split(' ')
        .map(function(word) {
          return word.charAt(0).toUpperCase() + word.slice(1)
        })
        .join(' ')
    }
  },
  components: {
    ProductCard
  }
}
</script>

<style lang="scss" scoped>
.container {
  max-width: 1500px;
  padding: 2rem 1rem;
  margin: 1rem auto;

  & > h1 {
    text-align: center;
    margin-bottom: 3rem;
  }

  .products {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    align-items: flex-start;
  }
}
</style>
