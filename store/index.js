import {
  SET_STORE_ITEMS,
  ADD_ITEM_TO_BAG,
  TOGGLE_BAG,
  REMOVE_ITEM_FROM_BAG,
  ADD_COUNT_TO_ITEM_BAG,
  MINUS_COUNT_TO_ITEM_BAG,
  CHANGE_SIZE_TO_ITEM_BAG
} from './mutations.type'

const whiteListTypes = ['t-shirts', 'hoodie', 'sweatshirts']

export const state = () => ({
  storeItems: [],
  bagItems: [],
  showBag: false
})

export const mutations = {
  [SET_STORE_ITEMS](state, list) {
    state.storeItems = list
  },
  [ADD_ITEM_TO_BAG](state, itemToAdd) {
    for (let i = 0; i < state.bagItems.length; i++) {
      const item = state.bagItems[i]
      if (item.slug === itemToAdd.slug) {
        item.count = item.count + 1
        return
      }
    }
    state.bagItems.push(itemToAdd)
  },
  [ADD_COUNT_TO_ITEM_BAG](state, slug) {
    for (let i = 0; i < state.bagItems.length; i++) {
      const item = state.bagItems[i]
      if (item.slug === slug && item.count !== 99) {
        item.count = item.count + 1
      }
    }
  },
  [MINUS_COUNT_TO_ITEM_BAG](state, slug) {
    for (let i = 0; i < state.bagItems.length; i++) {
      const item = state.bagItems[i]
      if (item.slug === slug && item.count !== 1) {
        item.count = item.count - 1
      }
    }
  },
  [CHANGE_SIZE_TO_ITEM_BAG](state, { slug, size }) {
    for (let i = 0; i < state.bagItems.length; i++) {
      const item = state.bagItems[i]
      if (item.slug === slug) {
        item.size = size
      }
    }
  },
  [TOGGLE_BAG](state) {
    state.showBag = !state.showBag
  },
  [REMOVE_ITEM_FROM_BAG](state, slug) {
    state.bagItems = state.bagItems.filter(item => item.slug === slug)
  }
}

export const actions = {
  addItemToBag({ commit }, { product, count, size, slug }) {
    commit(ADD_ITEM_TO_BAG, { ...product, count, size, slug })
    commit(TOGGLE_BAG)
  },
  getNewProducts({ state }) {
    return state.storeItems.filter(item => (item.new ? true : false))
  },
  getProductsByType({ state }, type) {
    if (whiteListTypes.includes(type)) {
      return state.storeItems.filter(item => item.type === type)
    } else {
      throw new Error('Page not Found')
    }
  },
  getPosts(files) {
    return files.keys().map(key => {
      let res = files(key)
      res.slug = key.slice(2, -5)
      return res
    })
  },
  async nuxtServerInit({ commit }) {
    let itemFiles = await require.context('~/assets/content/products/', false, /\.json$/)
    await commit(SET_STORE_ITEMS, actions.getPosts(itemFiles))

    // ? When adding/changing NetlifyCMS collection types, make sure to:
    // ? 1. Add/rename exact slugs here
    // ? 2. Add/rename the MUTATION_TYPE names in `./mutations.type.js`
    // ? 3. Add/rename `pages/YOUR_SLUG_HERE` and use the Vuex store like the included examples
    // ? If you are adding, add a state, mutation and commit (like above) for it too
  }
}
