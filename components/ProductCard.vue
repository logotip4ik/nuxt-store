<template>
  <div class="card">
    <div class="card__wrapper">
      <h2 class="card__wrapper--price"><slot name="price"></slot></h2>
      <img :src="image" alt="" />
      <div class="card__wrapper--overlay">
        <NuxtLink :to="`/product/${slug}`">More Detailed &rarr;</NuxtLink>
      </div>
    </div>
    <NuxtLink class="card--title" :to="`/product/${slug}`">{{ toTitleCase($slots.default[0].text) }}</NuxtLink>
  </div>
</template>

<script>
export default {
  name: 'ProductCard',
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
  props: {
    slug: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.card {
  $borderRadius: 1.5rem;
  $transitionDuration: 400ms;
  max-width: 500px;
  margin: 1rem;

  &:hover {
    .card__wrapper--overlay {
      opacity: 1;
      pointer-events: initial;
    }
    .card--title {
      background-color: black;
      color: white;
    }
  }

  &__wrapper {
    position: relative;
    box-shadow: 0 0 10px 0 rgba($color: #000000, $alpha: 0.1);
    border-radius: $borderRadius;
    overflow: hidden;

    &--price {
      position: absolute;
      z-index: 10;
      top: 0;
      left: 0;
      border-bottom-right-radius: $borderRadius;
      padding: 0.75rem;
      color: white;
      background: black;
    }

    &--overlay {
      position: absolute;
      z-index: 1;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba($color: #000000, $alpha: 0.5);
      display: grid;
      place-items: center;
      opacity: 0;
      pointer-events: none;
      transition: opacity $transitionDuration ease-in-out;

      a {
        color: black;
        background-color: white;
        box-shadow: 0 0 10px 0 rgba($color: #000000, $alpha: 0.1);
        padding: 0.5rem 1rem;
        border-radius: $borderRadius;
        text-decoration: none;
        font-size: 1.25rem;
        font-weight: 400;
      }
    }
  }

  &--title {
    display: block;
    cursor: pointer;
    margin-top: 1rem;
    border-radius: $borderRadius;
    padding: 0.75rem 0.5rem;
    background: white;
    color: black;
    font-size: 1.5rem;
    box-shadow: 0 0 10px 0 rgba($color: #000000, $alpha: 0.1);
    text-align: center;
    transition: background-color $transitionDuration ease-in-out, color $transitionDuration ease-in-out;
    font-weight: 400;
    text-decoration: none;
  }

  img {
    display: block;
    width: 100%;
    height: auto;
  }
}
</style>
