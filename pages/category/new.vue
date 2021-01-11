<template>
  <div class="container">
    <h1>New</h1>
    <div class="products">
      <ProductCard v-for="product in products" :key="product.slug" :image="product.image" :slug="product.slug">
        <template v-slot:price>{{ product.price }} RUB</template>
        {{ product.title }}
      </ProductCard>
    </div>
  </div>
</template>

<script>
import ProductCard from '@/components/general/ProductCard'

export default {
  async asyncData({ store }) {
    const products = await store.dispatch('getNewProducts')

    return { products }
  },
  components: {
    ProductCard
  }
}
</script>

<style lang="scss" scoped>
.container {
  max-width: 1500px;
  padding: 2rem;
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
