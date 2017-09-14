import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist'
import state from './state'
import actions from './actions'
import getters from './getters'
import mutations from './mutations'

Vue.use(Vuex)

const vuexLocalStorage = new VuexPersist({
  key: 'vuex',
  storage: window.localStorage,
  reducer: state => ({ user: state.user })
})

const store = new Vuex.Store({
  plugins: [vuexLocalStorage.plugin],
  state,
  actions,
  getters,
  mutations
})

export default store
