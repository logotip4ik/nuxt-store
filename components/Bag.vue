<template>
  <transition name="slide" mode="out-in">
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
        <div class="bag--content">
          <pre>
            {{ products }}
          </pre>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'Bag',
  computed: {
    products() {
      return this.$store.state.bagItems
    }
  },
  props: {
    value: {
      type: Boolean,
      required: true
    }
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
  z-index: 10;
  display: flex;
  justify-content: flex-end;
  background: linear-gradient(to right, rgba($color: black, $alpha: 0.5), rgba($color: black, $alpha: 0.8));

  .bag {
    height: 100%;
    width: 100vw;
    overflow-y: auto;
    background: white;

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
  }
}

.slide-enter-active,
.slide-leave-active {
  transition: width 500ms ease-in-out;
  overflow: hidden;
}

.slide-enter-from,
.slide-leave-to {
  width: 0;
}

@media screen and (min-width: 420px) {
  .bag--wrapper .bag {
    width: 380px;
  }
}
</style>
