import { store } from 'quasar/wrappers'
import { InjectionKey } from 'vue'
import {
  createStore,
  Store as VuexStore,
  useStore as vuexUseStore
} from 'vuex'

import { AllOrders, Bestsellers, Order, Products } from './types'
import axios from 'src/plugins/axios.config'
import user from 'src/store/modules/user'
import admin from 'src/store/modules/admin'
import manager from 'src/store/modules/manager'

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export interface StateInterface {
  // Define your own store structure, using submodules if needed
  // example: ExampleStateInterface;
  // Declared as unknown to avoid linting issue. Best to strongly type as per the line above.
  // example: unknown
  products: Array<Products>,

  // eslint-disable-next-line
  [x: string]: any
}

// provide typings for `this.$store`
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $store: VuexStore<StateInterface>
  }
}

// provide typings for `useStore` helper
export const storeKey: InjectionKey<VuexStore<StateInterface>> = Symbol('vuex-key')

export default store(function (/* { ssrContext } */) {
  const Store = createStore<StateInterface>({
    modules: {
      // example
      user,
      admin,
      manager
    },

    state: {
      products: [] as Array<Products>,
      bestsellers: [] as Array<Bestsellers>,
      orders: [] as Array<Order>,
      cart: [],
      allOrders: [] as Array<AllOrders>,
      date: ''
    },

    getters: {
      cartItemCount: (state) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-return
        return state.cart.length
      },

      totalPrice: (state) => {
        // eslint-disable-next-line no-unused-vars
        let total = 0
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access,no-return-assign
        state.cart.forEach(item => {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          total += item.price * item.quantity
        })
        return total
      },

      totalProductionCost: (state) => {
        // eslint-disable-next-line no-unused-vars
        let pCost = 0
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access,no-return-assign
        state.cart.forEach(item => {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-argument
          pCost += item.productionCost * item.quantity
        })
        return pCost.toFixed(2)
      }
    },

    actions: {
      GET_PRODUCTS: async function ({ commit }) {
        const products = await axios.get('api/products')
        commit('SET_PRODUCTS', products.data)
      },

      getBestsellers: async function ({ commit }) {
        const bestsellers = await axios.get('api/bestsellers')
        commit('SET_BESTSELLERS', bestsellers.data)
      },

      addItem ({ commit }, product) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        commit('ADD_ITEM', product)
      },

      removeItem ({ commit }, product) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        commit('REMOVE_ITEM', product)
      },

      deleteItem ({ commit }, product) {
        commit('DELETE_ITEM', product)
      },

      clearCart ({ commit }) {
        commit('CLEAR_CART')
      },

      removeOrderItem ({ commit }, { userUuid, orderUuid, productUuid }) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        axios.post('api/removeOrderItem', { userUuid, orderUuid, productUuid }).then(() => {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          commit('REMOVE_ORDER_ITEM', { userUuid, orderUuid, productUuid })
        }).catch((err) => {
          console.error(err)
        })
      },

      declineOrder ({ commit }, { userUuid, orderUuid }) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        axios.post('api/declineOrder', { userUuid, orderUuid }).then(() => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          commit('DECLINE_ORDER', { userUuid, orderUuid })
        }).catch((err) => {
          console.error(err)
        })
      },

      async getOrders ({ commit }) {
        const orders = await axios.get('api/orders')
        commit('SET_ORDERS', orders.data)
      },

      getAllOrders: async function ({ commit }) {
        const allOrders = await axios.get('api/allOrders')
        commit('SET_ALL_ORDERS', allOrders.data)
      },

      setDate ({ commit }, date) {
        commit('SET_DATE', date)
      },

      setStatus ({ commit }, { user, order, status }) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        commit('SET_STATUS', { user, order, status })
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        void axios.post('api/changeStatus', { user, order, status })
      }
    },

    mutations: {
      SET_PRODUCTS (state, products) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        state.products = products
      },

      SET_ORDERS (state, orders) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        state.orders = orders
      },

      SET_BESTSELLERS (state, bestsellers) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        state.bestsellers = bestsellers
      },

      ADD_ITEM  (state, { product, quantity }) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
        const productInCart = state.cart.find(i => {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          return i.uuid === product.uuid
        })
        if (productInCart) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
          const itemIndex = state.cart.findIndex(el => el.uuid === product.uuid)
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          state.cart[itemIndex].quantity += 1
        } else {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-assignment
          state.cart.push({ ...product, quantity })
        }
      },

      REMOVE_ITEM (state, product) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        if (state.cart.length > 0) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-assignment
          const productInCart = state.cart.some(i => i.uuid === product.product.uuid)
          if (productInCart) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-assignment
            const index = state.cart.findIndex(el => el.uuid === product.product.uuid)
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            if (state.cart[index].quantity !== 0) {
              // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
              state.cart[index].quantity -= 1
            }
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            if (state.cart[index].quantity === 0) {
              // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
              state.cart.splice(index, 1)
            }
          }
        }
      },

      DELETE_ITEM (state, product) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-assignment
        state.cart = state.cart.filter(item => {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,no-self-compare
          return item.uuid !== product.product.uuid
        })
      },

      CLEAR_CART (state) {
        state.cart = []
      },

      REMOVE_ORDER_ITEM (state, { userUuid, orderUuid, productUuid }) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
        const userIndex = state.allOrders.findIndex((user) => user.user_uuid === userUuid)
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
        const orderIndex = state.allOrders[userIndex].user_orders.findIndex((order) => order.order_uuid === orderUuid)
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
        const productIndex = state.allOrders[userIndex].user_orders[orderIndex].products.findIndex((product) => product.uuid === productUuid)
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
        state.allOrders[userIndex].user_orders[orderIndex].products.splice(productIndex, 1)
      },

      DECLINE_ORDER (state, { userUuid, orderUuid }) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
        const userIndex = state.allOrders.findIndex((user) => user.user_uuid === userUuid)
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
        const orderIndex = state.allOrders[userIndex].user_orders.findIndex((order) => order.order_uuid === orderUuid)
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
        state.allOrders[userIndex].user_orders[orderIndex].status = 'Declined'
      },

      SET_ALL_ORDERS (state, allOrders) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        state.allOrders = allOrders
      },

      SET_DATE (state, date) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        state.date = date
      },

      SET_STATUS (state, { user, order, status }) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
        const item = state.allOrders
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          .find((_user) => _user === user).user_orders
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          .find((item) => order === item)

        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access
        item.status = status
      }
    },

    // enable strict mode (adds overhead!)
    // for dev mode and --debug builds only
    strict: !!process.env.DEBUGGING
  })

  return Store
})

export function useStore () {
  return vuexUseStore(storeKey)
}
