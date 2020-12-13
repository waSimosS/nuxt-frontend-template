import AuthService from '../services/auth.service.js'

const user = JSON.parse(localStorage.getItem('user'))
const initialState = user
  ? { status: { loggedIn: true }, user: user.username }
  : { status: { loggedIn: false }, user: null }

export const auth = {
  namespaced: true,
  state: () => ({
    status: initialState.status,
    user: initialState.user
  }),
  actions: {
    login ({ commit }, user) {
      return AuthService.login(user).then(
        (username) => {
          commit('LOGIN_SUCCESS', username)
          return Promise.resolve(username)
        },
        (error) => {
          commit('LOGIN_FAILURE')
          return Promise.reject(error)
        }
      )
    },
    logout ({ commit }) {
      AuthService.logout()
      commit('LOGOUT')
    }
  },
  mutations: {
    LOGIN_SUCCESS (state, username) {
      state.status.loggedIn = true
      state.user = username
    },
    LOGIN_FAILURE (state) {
      state.status.loggedIn = false
      state.user = null
    },
    LOGOUT (state) {
      state.status.loggedIn = false
      state.user = null
    }
  }
}
