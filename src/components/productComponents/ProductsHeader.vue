<template>
  <q-toolbar style="min-width: fit-content">
    <q-toolbar-title @click="goTo" style="min-width: fit-content">
      Piekarnia
    </q-toolbar-title>

    <div class="q-pa-sm q-gutter-sm" style="min-width: fit-content">
      <q-btn
        flat
        round
        color="brown-6"
        icon='recent_actors'
        @click="ordersInfo = true"
        />
      <q-dialog v-model="ordersInfo">
        <OrdersInfo/>
      </q-dialog>

      <q-btn
        flat
        round
        color="brown-6"
        icon="local_grocery_store"
        @click="cart = true"
      >
        <q-badge text-color="brown-3" rounded color="brown-6" floating>{{ count }}</q-badge>
      </q-btn>
    </div>
    <q-dialog v-model="cart">
      <Cart
        :product="product"
      />
    </q-dialog>

    <span class='q-pr-md'>{{ $t('welcome') }} {{ getUser }}</span>

    <q-btn
      class='logout'
      @click='Logout'
      rounded
      push
    >{{ $t('logout_btn') }}
    </q-btn>
  </q-toolbar>

</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from 'vue'
import { useQuasar } from 'quasar'
import { useRouter } from 'vue-router'
import { useStore } from 'src/store'
import Cart from 'components/cartComponents/Cart.vue'
import OrdersInfo from 'components/ordersComponents/OrdersInfo.vue'

export default defineComponent({
  props: ['product', 'uuid'],
  name: 'Header',
  components: { OrdersInfo, Cart },
  setup () {
    const $q = useQuasar()

    const router = useRouter()

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-return
    const getUser = computed(() => store.state.user.user.name)

    const store = useStore()

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-return
    const count = computed(() => store.getters.cartItemCount)

    const goTo = () =>
      router.push('/products')

    onMounted(() => {
      store.dispatch('getOrders', null, { root: true })
        .catch((err) => {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          if (err.response.status === 401) {
            void router.push('/login')
          }
        })
    })

    const Logout = () => {
      void store.dispatch('user/logout').then(() => {
        void router.push('/')
        $q.notify({
          position: 'top',
          type: 'negative',
          message: 'You are logged out'
        })
      })
    }
    return {
      count,
      getUser,
      goTo,
      Logout,
      cart: ref(false),
      ordersInfo: ref(false)
    }
  }
})
</script>
