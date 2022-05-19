/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Commit } from 'vuex'
import { User } from 'src/store/types'
import axios from 'src/plugins/axios.config'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import _ from 'lodash'

export default {
  namespaced: true,
  state: {
    user: {}
  },

  getters: {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    isLoggedIn: () => !!localStorage.getItem('user-token')
  },

  mutations: {
    SET_USER (state: Record<string, User>, user: User) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
      _.assign(state.user, user)
    },

    LOGOUT (state: Record<string, unknown>) {
      localStorage.removeItem('user-token')
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
      _.assign(state.user, null)
    }
  },

  actions: {
    setUser: ({ commit }: { commit: Commit }, user: User) => {
      commit('SET_USER', user)
    },

    logout: ({ commit }: { commit: Commit }) => axios.post('api/logout').then(() => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      delete axios.defaults.headers.common.Authorization
      commit('LOGOUT')
    })
  }
}
