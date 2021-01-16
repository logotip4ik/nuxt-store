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
  bag: [],
  showBag: false
})

export const getters = {
  bag: state => state.bag
}

export const mutations = {
  [SET_STORE_ITEMS](state, list) {
    state.storeItems = list
  },
  [ADD_ITEM_TO_BAG](state, { item: itemToAdd }) {
    for (let i = 0; i < state.bag.length; i++) {
      const item = state.bag[i]
      if (item.slug === itemToAdd.slug) {
        item.count = item.count + itemToAdd.count
        return
      }
    }
    state.bag = [...state.bag, itemToAdd]
  },
  [ADD_COUNT_TO_ITEM_BAG](state, slug) {
    for (let i = 0; i < state.bag.length; i++) {
      const item = state.bag[i]
      if (item.slug === slug && item.count !== 99) {
        item.count = item.count + 1
      }
    }
  },
  [MINUS_COUNT_TO_ITEM_BAG](state, slug) {
    for (let i = 0; i < state.bag.length; i++) {
      const item = state.bag[i]
      if (item.slug === slug && item.count !== 1) {
        item.count = item.count - 1
      }
    }
  },
  [CHANGE_SIZE_TO_ITEM_BAG](state, { slug, size }) {
    for (let i = 0; i < state.bag.length; i++) {
      const item = state.bag[i]
      if (item.slug === slug) {
        item.size = size
      }
    }
  },
  [TOGGLE_BAG](state) {
    state.showBag = !state.showBag
  },
  [REMOVE_ITEM_FROM_BAG](state, slug) {
    state.bag = state.bag.filter(item => item.slug !== slug)
  },
  setBag(state, bag) {
    state.bag = bag
  }
}

export const actions = {
  setBag({ commit }, newBag) {
    if (typeof newBag === 'object') {
      commit('setBag', newBag)
    }
  },
  addItemToBag({ commit }, item) {
    commit(ADD_ITEM_TO_BAG, item)
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
