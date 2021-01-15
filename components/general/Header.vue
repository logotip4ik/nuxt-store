<template>
  <div>
    <nav :class="{ indexPage: $route.path === '/' }">
      <div class="heading">
        <div class="stripe"></div>
        <h1><NuxtLink to="/#/">Nuxt CMS Store</NuxtLink></h1>
        <div class="stripe"></div>
      </div>
      <ul>
        <li v-for="(link, idx) in links" :key="idx">
          <NuxtLink :to="link.src">{{ link.name }}</NuxtLink>
        </li>
      </ul>
      <div class="svg--wrapper">
        <svg
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 2138.327 2138.327"
          xml:space="preserve"
          @click="toggleBag"
        >
          <path
            style="fill:currentColor;"
            d="M1032.925,1852.654c0,98.076-79.506,177.583-177.583,177.583S677.76,1950.73,677.76,1852.654  c0-98.076,79.506-177.583,177.583-177.583S1032.925,1754.578,1032.925,1852.654z M1574.387,1675.072  c-98.076,0-177.583,79.507-177.583,177.583c0,98.076,79.507,177.583,177.583,177.583c98.076,0,177.583-79.507,177.583-177.583  C1751.969,1754.578,1672.463,1675.072,1574.387,1675.072z M2125.619,841.423l-218.512,649.464c0,0-18.088,96.383-110.247,96.383  s-993.407,0-1103.389,0s-114.604-120.809-114.604-120.809S461.624,596.637,455.814,544.088s-73.013-91.498-73.013-91.498  L93.651,317.522c-158.306-82.784-86.349-240.298,0-204.121c366.652,172.961,536.973,258.122,547.932,326.25  c11.091,68.26,30.367,232.64,30.367,232.64v1.056c2.245-0.66,3.829-1.056,3.829-1.056s1124.382,0,1351.477,0  C2190.447,672.291,2125.619,841.688,2125.619,841.423z M1809.535,1203.058l-2.245,0.132H737.57L759.619,1378h997.896  L1809.535,1203.058z M1913.708,850.534H693.339l23.502,186.825c234.092,0,919.601,0,1141.678,0L1913.708,850.534z"
          />
        </svg>
      </div>
      <div class="burger" @click="showMenu = !showMenu">
        <div class="line"></div>
        <div class="line"></div>
        <div class="line"></div>
      </div>
    </nav>
    <transition mode="out-in" name="slide">
      <div v-show="showMenu" class="menu">
        <div class="close" @click="showMenu = !showMenu"></div>
        <ul>
          <li v-for="(link, idx) in links" :key="idx" @click="showMenu = false">
            <NuxtLink :to="link.src">{{ link.name }}</NuxtLink>
          </li>
        </ul>
      </div>
    </transition>
    <Bag v-model="showBag"></Bag>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

import Bag from '@/components/Bag'

export default {
  name: 'Header',
  data: () => ({
    showMenu: false,
    links: [
      { name: 'New', src: '/category/new' },
      { name: 'T-Shirts', src: '/category/t-shirts' },
      { name: 'Sweatshirts', src: '/category/sweatshirts' },
      { name: 'Hoodie', src: '/category/hoodie' }
    ]
  }),
  computed: {
    showBag: {
      get() {
        return this.$store.state.showBag
      },
      set() {
        this.toggleBag()
      }
    }
  },
  mounted() {
    const bag = localStorage.getItem('_nuxtBag')
    if (bag) {
      this.setBag(JSON.parse(bag))
    }
  },
  methods: {
    ...mapMutations(['toggleBag', 'setBag'])
  },
  components: {
    Bag
  }
}
</script>

<style lang="scss" scoped>
nav {
  background-color: #111113;
  color: white;
  padding: 1.25rem 0;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 5px 10px 0 rgba($color: #000000, $alpha: 0.25);
  width: 100%;

  &.indexPage {
    background-color: transparent;
    position: absolute;
    box-shadow: none;
    z-index: 999;

    h1 {
      position: relative;
    }
  }

  .heading {
    display: flex;
    flex: 1 1 100vw;
    .stripe {
      flex: 1;
      height: 2px;
      background-color: white;
      margin-top: auto;
      margin-bottom: 0.75rem;
    }
    h1 {
      a {
        font-size: 2.5rem;
      }
      display: inline;
    }
  }

  .svg--wrapper {
    position: absolute;
    top: 77px;
    right: 3vw;
    svg {
      width: 30px;
      height: auto;
      // margin-right: 2rem;
    }
  }

  ul {
    list-style-type: none;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.5rem;

    li {
      margin: 0 0.25rem;
      cursor: pointer;

      a {
        padding: 0.5rem 1.25rem;
        position: relative;
        &::before {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          transform-origin: center center;
          transform: translateX(-50%);
          width: 0;
          height: 2px;
          background: white;
          transition: width 300ms ease-in-out;
        }

        &:hover::before {
          width: 100%;
        }
      }
    }
  }
}

.burger {
  position: relative;
  margin: 1rem 0;
  margin-left: 1.5rem;
  height: auto;
  min-height: 20px;
  max-height: 30px;
  width: 40px;
  display: none;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;

  .line {
    width: 100%;
    height: 2px;
    border-radius: 0.25rem;
    background-color: white;
  }
}

.menu {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  background: white;
  position: fixed;
  z-index: 9999;
  right: 0;
  top: 0;
  height: 100%;
  width: 280px;
  transition: width 200ms ease-in-out;
  box-shadow: -5px 0 10px 0 rgba($color: #000000, $alpha: 0.1);

  ul {
    color: black;
    list-style-type: none;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;

    li {
      width: 100%;

      a {
        display: block;
        padding: 0.75rem 2rem;
        width: 100%;
        color: black;
        transition: background-color 200ms ease-out;
        &:hover {
          background-color: #c0c0c0;
        }
      }
    }
  }

  .close {
    $button-size: 35px;
    width: $button-size;
    height: $button-size;
    margin: 0.25rem;
    margin-left: auto;
    margin-bottom: 1rem;
    cursor: pointer;
    position: relative;

    &::after,
    &::before {
      content: '';
      position: absolute;
      left: 50%;
      top: 50%;
      width: $button-size;
      height: 3px;
      background: #999;
      border-radius: 0.25rem;
      transform-origin: center center;
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

a {
  color: white;
  font-size: 1rem;
  text-decoration: none;
}

@media screen and (max-width: 500px) {
  nav {
    display: flex;
    padding-left: 0.75rem;
    padding-right: 0.75rem;
    border-bottom: 1px solid #616161;

    .heading > h1 > a {
      font-size: 1.5rem;
    }

    & > ul {
      display: none;
    }
    .svg--wrapper {
      position: initial;
    }
  }
  .burger {
    display: flex;
  }
  .stripe {
    display: none;
  }
}

.slide-enter-active,
.slide-leave-active {
  transition: width 300ms ease-in-out;
  overflow: hidden;
}
.slide-enter,
.slide-leave-to {
  width: 0;
}
</style>
