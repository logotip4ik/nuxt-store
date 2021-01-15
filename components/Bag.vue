<template>
  <transition name="slide-bag" :duration="500">
    <div class="bag--wrapper" v-show="value">
      <div class="bag">
        <button @click="$emit('input', false)">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 17 32" class="close-icon">
            <path
              d="M2.2 16L16.7 1.5c.4-.4.4-.9 0-1.3s-.9-.4-1.3 0L.3 15.4c-.4.4-.4.9 0 1.3l15.2 15.1c.2.2.4.3.6.3.2 0 .5-.1.6-.3.4-.4.4-.9 0-1.3L2.2 16z"
            ></path>
          </svg>
          Continue shopping
        </button>
        <div :class="{ bag__purchase: true, 'bag__purchase--pb': products.length === 0 }">
          <div class="bag__purchase__header">
            My purchases
          </div>
          <div class="bag__purchase__container">
            <ProductCardBag
              v-for="product in products"
              :key="product.slug"
              :image="product.image"
              :sizes="product.sizes"
              :size="product.size"
              :count="product.count"
              :price="product.price"
              :slug="product.slug"
            >
              {{ product.title }}
            </ProductCardBag>
          </div>
        </div>
        <div class="bag__summery">
          <div class="bag__summery__promo">
            <h4>Promocode</h4>
            <div class="input-wrapper">
              <input type="text" />
              <button>apply</button>
            </div>
          </div>
          <div class="bag__summery__total">
            Total: <span>{{ summeryCost }} RUB</span>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import ProductCardBag from './ProductCardBag'

export default {
  name: 'Bag',
  computed: {
    products() {
      return this.$store.state.bagItems
    },
    summeryCost() {
      return this.products.reduce((acc, item) => acc + item.price * item.count, 0).toLocaleString()
    }
  },
  watch: {
    products: {
      get(val) {
        console.log(val)
        localStorage.setItem('_nuxtBag', JSON.stringify(val))
      },
      deep: true
    }
  },
  props: {
    value: {
      type: Boolean,
      required: true
    }
  },
  components: {
    ProductCardBag
  }
}
</script>

<style lang="scss" scoped>
.bag--wrapper {
  position: fixed;
  right: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
  display: flex;
  justify-content: flex-end;
  background: linear-gradient(to right, rgba($color: black, $alpha: 0.5), rgba($color: black, $alpha: 0.8));

  .bag {
    height: 100%;
    width: 100vw;
    overflow-y: auto;
    background: white;
    scrollbar-width: none;

    & > button {
      background: transparent;
      appearance: none;
      border: none;
      outline: none;
      text-transform: uppercase;
      padding: 0.5rem;
      padding-top: 0.6rem;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      font: inherit;
      font-size: 1.25rem;
      font-weight: 400;
      border-bottom: 2px solid #ebeef1;
      transition: background-color 300ms ease-out;
      cursor: pointer;

      &:hover {
        background-color: rgb(214, 214, 214);
      }

      .close-icon {
        height: 25px;
        width: auto;
        margin: 0.5rem;
        transform: translateY(-1px);
      }
    }

    &__purchase {
      padding: 1rem;
      border-bottom: 2px solid #484848;

      &--pb {
        padding-bottom: 3rem;
      }

      &__header {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 2rem;
        padding: 1.5rem 0;
        &::after {
          content: '';
          width: 30%;
          height: 2px;
          background-color: black;
          margin-left: 1.25rem;
          transform: translateY(2px);
        }
      }
      &__container {
        div:not(:last-child) {
          border-bottom: 1px solid rgb(160, 160, 160);
          margin-bottom: 1rem;
        }
      }
    }

    &__summery {
      padding: 1.75rem;

      &__promo {
        padding: 1rem;
        padding-bottom: 2rem;
        position: relative;
        margin-bottom: 2rem;

        &::after {
          content: '';
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          bottom: 0;
          width: 90%;
          height: 2px;
          background-color: rgb(209, 209, 209);
        }

        & > *:first-child {
          color: #999;
          font-size: 0.75rem;
          text-transform: uppercase;
          margin-bottom: 0.5rem;
        }

        .input-wrapper {
          width: 100%;
          height: 35px;
          position: relative;

          input {
            width: 100%;
            height: 100%;
            text-align: left;
            padding: 0.5rem 0.75rem;
            padding-right: 5.5rem;
            appearance: none;
            border: none;
            border-radius: 999px;
            outline: none;
            background-color: #f4f6f8;
            font: inherit;
          }

          button {
            position: absolute;
            top: 0;
            right: 0;
            appearance: none;
            border: none;
            border-radius: 999px;
            background-color: black;
            color: white;
            height: 100%;
            text-transform: uppercase;
            font: inherit;
            font-size: 1.1rem;
            font-weight: 600;
            letter-spacing: 1px;
            padding: 0 0.75rem;
          }
        }
      }

      &__total {
        display: flex;
        justify-content: space-between;
        align-items: center;
        text-transform: uppercase;
        color: rgb(163, 163, 163);

        span {
          color: black;
          font-size: 1.5rem;
          font-weight: 600;
        }
      }
    }
  }
}

.slide-bag-enter-active,
.slide-bag-leave-active {
  transition: transform 400ms ease-in-out;
}
.slide-bag-enter,
.slide-bag-leave-to {
  transform: translateX(100%);
}

@media screen and (min-width: 420px) {
  .bag--wrapper .bag {
    width: 380px;
  }
}
</style>
