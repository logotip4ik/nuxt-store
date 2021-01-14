<template>
  <div class="card">
    <div class="card__image">
      <img :src="image" :alt="`${$slots.default[0].text} image`" />
      <button @click="removeItemFromBag(slug)">
        <svg viewBox="0 0 78 75" fill="none" xmlns="http://www.w3.org/2000/svg">
          <line x1="5.41242" y1="1.87689" x2="76.1231" y2="72.5876" stroke="currentColor" stroke-width="5" />
          <line x1="1.87689" y1="72.5876" x2="72.5876" y2="1.8769" stroke="currentColor" stroke-width="5" />
        </svg>
      </button>
    </div>
    <div class="card__content">
      <h3 @click="openProduct"><slot></slot></h3>
      <div class="card__content__size">
        The size:
        <div class="card__content__size__items">
          <div
            v-for="(item, key) in sizes"
            :key="key"
            :class="{ size: true, 'size--activated': item === size }"
            @click="changeSizeToBagProduct({ slug, size: item })"
          >
            {{ item }}
          </div>
        </div>
      </div>
      <div class="card__content__count">
        Number:
        <div class="card__content__count__counter">
          <span>{{ count }}</span>
          <button @click="addCountToBagProduct(slug)">&plus;</button>
          <button @click="minusCountToBagProduct(slug)">&minus;</button>
        </div>
      </div>
      <div class="card__content__price">{{ (count * price).toLocaleString() }} RUB</div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  name: 'ProductCardBag',
  methods: {
    ...mapMutations([
      'removeItemFromBag',
      'toggleBag',
      'addCountToBagProduct',
      'minusCountToBagProduct',
      'changeSizeToBagProduct'
    ]),
    openProduct() {
      this.toggleBag()
      this.$router.push(`/product/${this.slug}`)
    }
  },
  props: {
    price: {
      type: Number,
      required: true
    },
    count: {
      type: Number,
      required: true
    },
    size: {
      type: String,
      required: true
    },
    sizes: {
      type: Array,
      requried: true,
      default: () => []
    },
    image: {
      type: String,
      required: true
    },
    slug: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.card {
  width: 100%;
  padding: 1rem;
  display: grid;
  grid-template-columns: 40% 60%;
  justify-content: flex-start;
  align-items: flex-start;

  &__image {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid rgba($color: #000000, $alpha: 0.3);
    border-radius: 1rem;
    position: relative;

    img {
      display: block;
      width: 100%;
      height: auto;
    }

    button {
      $button-size: 23px;
      color: rgba($color: #000000, $alpha: 0.5);
      width: $button-size;
      height: $button-size;
      position: absolute;
      top: -$button-size / 2;
      left: -$button-size / 2;
      appearance: none;
      border: 1px solid currentColor;
      border-radius: 9999px;
      outline: none;
      display: grid;
      place-items: center;
      cursor: pointer;
      transition: background-color 300ms ease-out, color 300ms ease-out;

      &:hover {
        background-color: black;
        color: white;
      }

      svg {
        width: $button-size / 2;
        height: auto;
      }
    }
  }

  &__content {
    width: 100%;
    padding: 0.5rem 0.75rem;

    & > *:first-child {
      font-weight: 600;
      margin-bottom: 0.5rem;
      cursor: pointer;
    }

    &__size {
      color: rgb(75, 75, 75);
      margin-bottom: 0.5rem;

      &__items {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-wrap: wrap;

        .size {
          padding: 0 0.25rem;
          margin: 0 0.25rem;
          color: rgb(59, 59, 59);
          cursor: pointer;

          &--activated {
            font-weight: 600;
            color: black;
            border-left: 1px solid rgb(59, 59, 59);
            border-right: 1px solid rgb(59, 59, 59);
          }
        }
      }
    }

    &__count {
      color: rgb(75, 75, 75);
      margin-bottom: 0.5rem;

      &__counter {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        color: black;

        span {
          padding-right: 0.5rem;
          border-right: 1px solid rgb(158, 158, 158);
        }

        button {
          cursor: pointer;
          margin: 0 0.25rem;
          appearance: none;
          border: none;
          outline: none;
          padding: 0 0.5rem;
          font: inherit;
          background: transparent;
        }
      }
    }

    &__price {
      text-align: right;
      font-weight: 600;
      font-size: 1.2rem;
    }
  }
}
</style>
