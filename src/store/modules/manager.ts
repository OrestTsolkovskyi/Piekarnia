/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Commit } from 'vuex'
import { Manager } from 'src/store/types'
import axios from 'src/plugins/axios.config'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import _ from 'lodash'

export default {
  namespaced: true,
  state: {
    manager: {}
  },

  getters: {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    isLoggedIn: () => !!localStorage.getItem('user-token')
  },

  mutations: {
    SET_MANAGER (state: Record<string, Manager>, manager: Manager) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
      _.assign(state.admin, manager)
    },

    MANAGER_LOGOUT (state: Record<string, unknown>) {
      localStorage.removeItem('user-token')
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
      _.assign(state.user, null)
    }
  },

  actions: {
    setManager: ({ commit }: { commit: Commit }, manager: Manager) => {
      commit('SET_MANAGER', manager)
    },

    logout: ({ commit }: { commit: Commit }) => axios.post('api/manager_logout').then(() => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      delete axios.defaults.headers.common.Authorization
      commit('MANAGER_LOGOUT')
    })
  }
}
