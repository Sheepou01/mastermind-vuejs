import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    allColors: ['yellow', 'green', 'red', 'blue', 'purple', 'orange'],
    settings: {
      nbColors: 4,
      nbPawns: 4,
      nbTries: 20
    }

  },
  getters: {
    allColors: state => {
      return state.allColors
    },
    settings: state => {
      return state.settings
    }
  },
  mutations: {
    updateSettings: (state, settings) => {
      console.log(settings)
      state.settings = settings
      console.log(state)
    }
  },
  modules: {
  }
})
