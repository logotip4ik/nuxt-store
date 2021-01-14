<template>
  <div class="popup--wrapper">
    <transition name="drop">
      <div class="popup" v-show="value">
        <div class="popup__toolbar">
          <div class="popup__toolbar--close" @click="$emit('input', false)"></div>
        </div>
        <div class="popup__content">
          <slot></slot>
        </div>
      </div>
    </transition>
    <transition name="fade">
      <div class="overlay" v-show="value"></div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'Popup',
  props: {
    value: {
      type: Boolean,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.popup--wrapper {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  pointer-events: none;
  z-index: 999;
}
.popup {
  overflow-y: auto;
  width: 90vw;
  max-width: 600px;
  max-height: 90vh;
  position: fixed;
  z-index: 999;
  background: white;
  border-radius: 1rem;
  color: black;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 1rem 0.5rem;
  pointer-events: initial;

  &__toolbar {
    display: flex;
    flex-grow: 1;
    justify-content: flex-end;
    width: 100%;
    margin-bottom: 0.5rem;

    &--close {
      $button-size: 30px;
      cursor: pointer;
      width: $button-size;
      height: $button-size;
      position: relative;

      &::after,
      &::before {
        content: '';
        position: absolute;
        width: $button-size;
        height: 3px;
        background-color: #999;
        border-radius: 0.2rem;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      }
      &::after {
        transform: translateX(-$button-size/2) rotate(45deg);
      }
      &::before {
        transform: translateX(-$button-size/2) rotate(-45deg);
      }
    }
  }

  &__content {
    text-align: center;
    padding: 1rem 1rem 4vw;
  }
}
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10;
  background-color: rgba($color: #000000, $alpha: 0.5);
  pointer-events: auto;
}

.drop-enter-active,
.drop-leave-active {
  transition: transform 400ms ease-in-out, opacity 350ms ease-in-out;
}
.drop-enter {
  opacity: 0;
  transform: scale(1.2);
}
.drop-leave-to {
  transform: scale(0.8);
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 500ms;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
