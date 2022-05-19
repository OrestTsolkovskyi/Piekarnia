/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Commit } from 'vuex'
import { Admin } from 'src/store/types'
import axios from 'src/plugins/axios.config'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import _ from 'lodash'

export default {
  namespaced: true,
  state: {
    admin: {}
  },

  getters: {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    isLoggedIn: () => !!localStorage.getItem('user-token')
  },

  mutations: {
    SET_ADMIN (state: Record<string, Admin>, admin: Admin) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
      _.assign(state.admin, admin)
    },

    ADMIN_LOGOUT (state: Record<string, unknown>) {
      localStorage.removeItem('user-token')
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
      _.assign(state.user, null)
    }
  },

  actions: {
    setAdmin: ({ commit }: { commit: Commit }, admin: Admin) => {
      commit('SET_ADMIN', admin)
    },

    logout: ({ commit }: { commit: Commit }) => axios.post('api/admin_logout').then(() => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      delete axios.defaults.headers.common.Authorization
      commit('ADMIN_LOGOUT')
    })
  }
}
