<template>
  <div v-if="product" :class="{ wrapper: true, 'wrapper--dark': product ? product.black : false }">
    <div class="card">
      <h1>{{ toTitleCase(product.title) }}</h1>
      <div class="card__content">
        <div class="image-wrapper">
          <img :src="product.image" :alt="`image for ${product.title}`" class="card__content--image" />
        </div>
        <div class="card__content__info">
          <h2 class="card__content--price">{{ product.price.toLocaleString(undefined) }} RUB</h2>
          <div class="card__content__info--delivery">(Worldwide delivery - 850 RUB, Ukraine - 50 UAH)</div>
          <div class="card__content__info--description">{{ product.description }}</div>
          <div class="card__content__info--structure">
            <div>Structure: {{ product.structure }}</div>
            <div>Density: {{ product.density }}</div>
          </div>
          <div class="card__content__info--buttons">
            <button @click="showingSize = !showingSize">Size chart</button>
            <button @click="showingCare = !showingCare">Care of the thing</button>
          </div>
          <div class="card__content__info__size">
            <h4>Select size:</h4>
            <div class="card__content__info__size__radios">
              <div
                :class="{
                  'card__content__info__size__radios--item': true,
                  'card__content__info__size__radios--item--selected': currSize === idx
                }"
                v-for="(size, idx) in product.sizes"
                :key="idx"
                @click="currSize = idx"
              >
                {{ size }}
              </div>
            </div>
          </div>
          <div class="display-flex">
            <div class="card__content__info__counter">
              <h4>Number:</h4>
              <div class="card__content__info__counter__wrapper">
                <span class="minus" @click="minusProduct"><div class="translate-up">&minus;</div></span>
                <input readonly type="text" v-model="productCount" />
                <span class="plus" @click="addProduct"><div class="translate-up">&plus;</div></span>
              </div>
            </div>
            <button class="card__content__info__buy" @click="addToBag">Add to Cart &rarr;</button>
          </div>
        </div>
      </div>
    </div>
    <PopUp v-model="showingSize">
      <h2 style="font-size: 1.65rem; margin-bottom: 1.5rem">How to choose the right size?</h2>
      <p style="font-weight: 300;margin-bottom: 1rem">
        Choose your T-shirt / sweatshirt / hoodie and measure with the meter
      </p>
      <p style="font-weight: 300;margin-bottom: 1rem">
        The width on the dimensional grid is indicated by the letter A, measure under the armpits, from seam to seam, as
        shown by the red line.
      </p>
      <p style="font-weight: 300;margin-bottom: 1rem">
        The length on the dimensional grid is indicated by the letter B, you measure from the neck to the very bottom of
        the item, as shown by the red line.
      </p>
      <p style="font-weight: 300;margin-bottom: 1rem">
        The length of the sleeves on the dimensional grid is indicated by the letter C, if it is a sweatshirt or hoodie,
        measure from the neck to the very end of the sleeve, if it is a T-shirt, then as shown by the red line.
      </p>
      <p style="font-weight: 300;margin-bottom: 1rem">
        Next, compare your indicators with our table of sizes, having estimated plus / minus a couple of centimeters and
        choose the size.
      </p>
      <img
        style="display: block;width: 100%;height: auto; margin-bottom: 1rem"
        src="https://via.placeholder.com/400"
        alt="just placeholder image"
      />
      <table width="100%" style="background-color: #FCFCFD; margin-bottom: 1rem;">
        <thead>
          <tr>
            <th>(sm)</th>
            <th>A</th>
            <th>B</th>
            <th>C</th>
          </tr>
        </thead>
        <tbody>
          <tr class="highlight">
            <td>S</td>
            <td>48</td>
            <td>71</td>
            <td>21</td>
          </tr>
          <tr>
            <td>M</td>
            <td>50</td>
            <td>71</td>
            <td>21</td>
          </tr>
          <tr class="highlight">
            <td>L</td>
            <td>52</td>
            <td>72</td>
            <td>21</td>
          </tr>
          <tr>
            <td>XL</td>
            <td>54</td>
            <td>72</td>
            <td>21</td>
          </tr>
          <tr class="highlight">
            <td>2XL</td>
            <td>56</td>
            <td>72</td>
            <td>21</td>
          </tr>
        </tbody>
      </table>
    </PopUp>
    <PopUp v-model="showingCare">
      <h2 style="margin-bottom: 1rem;font-size: 1.65rem">Standard care rules</h2>
      <p style="font-weight: 300">
        Wash in the inverted state, only in a washing machine, up to 40 degrees, do not use tumble dry, dry only on a
        hanger, without exposure to sunlight on the fabric. Do not iron the print with an iron.
      </p>
    </PopUp>
  </div>
</template>

<script>
import PopUp from '@/components/PopUp'

export default {
  data: () => ({
    showingSize: false,
    showingCare: false,
    currSize: 0,
    productCount: 1
  }),
  async asyncData({ params, error }) {
    let product
    try {
      product = await require(`~/assets/content/products/${params.id}.json`)
    } catch (err) {
      error({
        statusCode: 404,
        message: 'This product was Not Found'
      })
    }

    return {
      product,
      slug: params.id
    }
  },
  methods: {
    addToBag() {
      const item = {
        ...this.product,
        slug: this.slug,
        size: this.product.sizes[this.currSize],
        count: this.productCount
      }
      this.$store.dispatch('addItemToBag', { item })
    },
    addProduct() {
      if (this.productCount === 99) return
      this.productCount = this.productCount + 1
    },
    minusProduct() {
      if (this.productCount === 1) return
      this.productCount = this.productCount - 1
    },
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
    PopUp
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  height: 100%;
  width: 100%;
  flex: 1;
  padding: 2rem 1rem;
  background-color: #ebe6e8;

  &--dark {
    background-color: #111113;
    color: white !important;

    .card__content {
      &--price {
        background: white !important;
        color: black !important;
      }
      &__info {
        color: white !important;

        h4 {
          color: #636573 !important;
        }

        &--buttons button {
          border-color: #474852 !important;
          color: #474852 !important;
          &:hover {
            background-color: #474852 !important;
            color: white !important;
          }
        }

        &__size__radios--item {
          color: #797b8c !important;
          background-color: #474852 !important;

          &--selected {
            color: black !important;
            background-color: white !important;
          }
        }
        &__counter__wrapper {
          * {
            border-color: white !important;
          }
          input {
            background-color: white !important;
          }
        }
        &__buy {
          background: white !important;
          color: black !important;

          &::after {
            border-color: white !important;
          }
        }
      }
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

      .image-wrapper {
        max-width: 605px;
        position: relative;
        z-index: 1;
        box-shadow: 0 0 1500000px -150px rgba($color: white, $alpha: 1);
      }

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
        background: black;
        color: white;
      }

      &__info {
        text-align: center;
        font-weight: 400;
        color: #484450;
        min-width: 50vw;
        h4 {
          font-weight: 600;
        }

        &--delivery {
          color: #636573;
          font-size: 1.2rem;
          margin-bottom: 4rem;
          position: relative;

          &::after {
            content: '';
            position: absolute;
            left: 10%;
            right: 10%;
            bottom: -2rem;
            height: 2px;
            border-radius: 0.25rem;
            background-color: #636573;
          }
        }

        &--description {
          font-size: 1.1rem;
          line-height: 1.75;
          margin-bottom: 3rem;
        }

        &--structure {
          margin-bottom: 3rem;
          div {
            font-size: 1.1rem;
            font-size: 300;

            &:first-child {
              margin-bottom: 1rem;
            }
          }
        }

        &--buttons {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          align-items: center;
          margin-bottom: 3rem;

          button {
            appearance: none;
            border-radius: 999px;
            margin: 0.5rem;
            padding: 0.6rem 1.25rem;
            border: 2px solid #9c9eaf;
            background: transparent;
            font: inherit;
            font-weight: 400;
            text-transform: uppercase;
            color: #9c9eaf;
            cursor: pointer;
            transition: color 300ms ease-in-out, background-color 300ms ease-in-out;

            &:hover {
              background: #9c9eaf;
              color: white;
            }
          }
        }

        &__size {
          margin-bottom: 2rem;
          & > *:first-child {
            color: #484450;
            margin-bottom: 0.5rem;
          }

          &__radios {
            display: flex;
            justify-content: center;
            align-items: center;
            flex-wrap: wrap;

            &--item {
              $size: 40px;
              width: $size;
              height: $size;
              border-radius: 50%;
              background-color: white;
              margin: 0.5rem;
              color: #d7d5d6;
              display: grid;
              place-items: center;
              cursor: pointer;
              font-weight: 600;
              transition: background-color 300ms ease-in-out, color 300ms ease-in-out;

              &--selected {
                background-color: black;
                color: white;
              }
            }
          }
        }

        &__counter {
          margin-bottom: 2rem;

          & > *:first-child {
            margin-bottom: 1rem;
          }

          &__wrapper {
            display: flex;
            justify-content: center;
            align-items: center;

            * {
              height: 50px;
              width: 50px;
              display: grid;
              place-items: center;
              font-size: 1.5rem;
            }
            input {
              font: inherit;
              appearance: none;
              border: none;
              outline: none;
              background: transparent;
              border: 2px solid black;
              border-radius: 0;
              text-align: center;
            }
            span {
              border-top: 2px solid black;
              border-bottom: 2px solid black;
              cursor: pointer;

              .translate-up {
                transform: translate(0, -3px);
                user-select: none;
              }
            }
            .plus {
              border-bottom-right-radius: 999px;
              border-top-right-radius: 999px;
              border-right: 2px solid black;
            }
            .minus {
              border-bottom-left-radius: 999px;
              border-top-left-radius: 999px;
              border-left: 2px solid black;
            }
          }
        }

        &__buy {
          appearance: none;
          border: none;
          border-radius: 999px;
          background-color: black;
          color: white;
          text-transform: uppercase;
          padding: 0.75rem 1.75rem;
          cursor: pointer;
          font: inherit;
          font-weight: 600;
          position: relative;
          z-index: 1;
          max-height: 50px;
          margin-bottom: 2rem;

          &:hover::after {
            transform: scaleX(1.075) scaleY(1.3);
          }

          &::after {
            content: '';
            position: absolute;
            z-index: -1;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            border: 2px solid black;
            border-radius: 999px;
            transition: transform 300ms ease-in-out;
          }
        }
      }
    }
  }
}

th,
td {
  padding: 0.5rem;
  border: none;
  appearance: none;
}

thead {
  position: relative;
  &::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 1px;
    background-color: #777;
  }
}

tr:not(:last-child) {
  position: relative;
  &::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 1px;
    background-color: #999;
  }
}

.highlight {
  position: relative;
  background-color: #f4f6f8;
}

.display-flex {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}

@media screen and (min-width: 1200px) {
  .card__content {
    display: grid !important;
    grid-template-columns: 40% auto;
    align-items: flex-start !important;

    &__info {
      text-align: left !important;
      padding-left: 2rem;

      &--delivery::after {
        left: 0 !important;
        right: 40% !important;
      }
      &--buttons {
        justify-content: flex-start !important;

        button:first-child {
          margin-left: 0;
        }
      }
      &__size__radios {
        justify-content: flex-start !important;
      }
      &__buy {
        margin-left: 2rem;
        align-self: flex-end;
      }
    }
  }
  .display-flex {
    flex-direction: row;
    justify-content: flex-start;
  }
}

@media screen and (max-width: 500px) {
  .wrapper > .card > h1 {
    font-size: 7.9vw;
  }
}
</style>
