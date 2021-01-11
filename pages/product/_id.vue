<template>
  <div v-if="product" :class="{ wrapper: true, 'wrapper--dark': product ? product.black : false }">
    <div class="card">
      <h1>{{ toTitleCase(product.title) }}</h1>
      <div class="card__content">
        <img :src="product.image" :alt="`image for ${product.title}`" class="card__content--image" />
        <h2 class="card__content--price">{{ product.price }} RUB</h2>
        <div class="card__content__info">
          <div class="card__content__info--delivery">(Доставка по миру - 850 RUB, по Украине - 50 UAH)</div>
          <div class="card__content__info--description">{{ product.description }}</div>
          <div class="card__content__info--structure">
            <div>Structure: {{ product.structure }}</div>
            <div>Density: {{ product.density }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  async asyncData({ params }) {
    return {
      product: await require(`~/assets/content/products/${params.id}.json`)
    }
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
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  height: 100%;
  width: 100%;
  flex: 1;
  padding: 2rem 1rem;

  &--dark {
    background: #111113;
    color: white;

    .card__content--price {
      background: black;
      color: white;
    }
  }

  .card {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    padding: 0 1rem;

    h1 {
      font-size: 2.25rem;
      margin-bottom: 2rem;
    }

    &__content {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;

      &--image {
        display: block;
        width: 100%;
        height: auto;
      }
      &--price {
        display: inline-block;
        margin: 2rem auto;
        border-radius: 999px;
        padding: 0.5rem 1rem;
        background: white;
        color: black;
      }

      &__info {
        text-align: center;
        &--delivery {
          color: #636573;
          font-size: 1.2rem;
          margin-bottom: 5rem;
          position: relative;

          &::after {
            content: '';
            position: absolute;
            left: 10%;
            right: 10%;
            bottom: -2.5rem;
            height: 1px;
            background-color: #636573;
          }
        }

        &--description {
          font-size: 1.1rem;
          font-weight: 300;
          line-height: 1.75;
          margin-bottom: 3rem;
        }

        &--structure {
          div {
            font-size: 1.1rem;
            font-size: 300;

            &:first-child {
              margin-bottom: 0.5rem;
            }
          }
        }
      }
    }
  }
}

@media screen and (max-width: 500px) {
  .wrapper > .card > h1 {
    font-size: 7.9vw;
  }
}
</style>
