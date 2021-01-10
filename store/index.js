import { SET_BLOG_POSTS, SET_PROJECT_POSTS, SET_STORE_ITEMS } from './mutations.type'

export const state = () => ({
  blogPosts: [],
  projectPosts: [],
  storeItems: []
})

export const mutations = {
  [SET_STORE_ITEMS](state, list) {
    state.storeItems = list
  }
}

export const actions = {
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
