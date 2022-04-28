import Vue from 'vue'
import Vuex from 'vuex'
import tab from './tab.js'
import token from './token.js'

Vue.use(Vuex)

export default new Vuex.Store({
  modules:{
    tab,
    token
  }
})