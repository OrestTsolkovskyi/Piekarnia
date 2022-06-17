/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Commit } from 'vuex'
import { Chef } from 'src/store/types'
import axios from 'src/plugins/axios.config'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import _ from 'lodash'

export default {
  namespaced: true,
  state: {
    chef: {}
  },

  getters: {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    isLoggedIn: () => !!localStorage.getItem('user-token')
  },

  mutations: {
    SET_CHEF (state: Record<string, Chef>, chef: Chef) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
      _.assign(state.admin, chef)
    },

    CHEF_LOGOUT (state: Record<string, unknown>) {
      localStorage.removeItem('user-token')
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
      _.assign(state.user, null)
    }
  },

  actions: {
    setChef: ({ commit }: { commit: Commit }, chef: Chef) => {
      commit('SET_CHEF', chef)
    },

    logout: ({ commit }: { commit: Commit }) => axios.post('api/chef_logout').then(() => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      delete axios.defaults.headers.common.Authorization
      commit('CHEF_LOGOUT')
    })
  }
}
