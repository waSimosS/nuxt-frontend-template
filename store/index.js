import Vuex from 'vuex'
import Vue from 'vue'

import { auth } from './auth.module'

Vue.use(Vuex)

const store = () => {
  return new Vuex.Store({
    modules: {
      auth
    }
  })
}

export default store
