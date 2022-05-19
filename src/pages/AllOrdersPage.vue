<template>
  <q-layout view="lHh Lpr lFf" class="window-width">
    <q-page-container>
      <q-page class="page-bg bg-image">
        <q-header elevated class="text-brown-6">
          <q-toolbar>

            <q-toolbar-title @click="main">
              Piekarnia
            </q-toolbar-title>

            <q-btn
              class='logout'
              @click='Logout'
              rounded
              push
            >{{ $t('logout_btn') }}
            </q-btn>
          </q-toolbar>
        </q-header>

        <q-card  class="absolute-center orders_list q-pa-xs">
          <span class="text-brown-6 text-h4 q-pa-md">{{ $t('all_orders') }}</span>
        <AllOrdersList
          v-for='orders in allOrders'
          :key='orders.uuid'
          :orders="orders"
        />
        </q-card>
        <q-footer/>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted } from 'vue'
import { useQuasar } from 'quasar'
import { useRouter } from 'vue-router'
import { useStore } from 'src/store'
import AllOrdersList from 'components/AllOrdersList.vue'

export default defineComponent({
  name: 'AllOrdersPage',
  props: ['orders'],

  components: { AllOrdersList },
  setup () {
    const $q = useQuasar()

    const router = useRouter()

    const store = useStore()

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    const allOrders = computed(() => store.state.allOrders)

    onMounted(() => {
      store.dispatch('getAllOrders', null, { root: true })
        .catch((err) => {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          if (err.response.status === 401) {
            void router.push('/login_admin')
          }
        })
    })

    const main = () => router.push('/')

    const Logout = () => {
      // void store.dispatch('user/logout').then(() => {
      void router.push('/login_admin')
      $q.notify({
        position: 'top',
        type: 'negative',
        message: 'You are logged out'
      })
      // })
    }

    return {
      main,
      allOrders,
      Logout
    }
  }
})

</script>

<style lang="scss" scoped>
.page-bg {
  background-color: #F4DFC5;
}

.bg-image {
  background-image: url("src/assets/walpaper-for-products.jpg");
  background-repeat: no-repeat;
  background-size: cover;
}

.orders {
  display: flex;
  justify-content: center;
  align-items: center;
}

.orders_list{
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #ebc09f;
    width: 50%;
  flex-flow: column;
}
</style>
