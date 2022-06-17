<template>
  <q-layout view="lHh Lpr lFf" class="window-width">
    <q-page-container>
      <q-page class="page-bg bg-image">
        <q-header elevated class="text-brown-6">
          <q-toolbar style="background: #e7b181">

            <q-toolbar-title style="min-width: fit-content">
              Piekarnia
            </q-toolbar-title>

            <q-space></q-space>

            <div class="q-pa-sm q-gutter-sm" style="min-width: fit-content">
              <q-btn
                style="min-width: 5%; color: #e7b181"
                rounded
                text-color="brown-6"
                @click="report"
              >{{ $t('admin_reports') }}
              </q-btn>

              <q-btn
                style="min-width: 5%; color: #e7b181"
                text-color="brown-6"
                class='logout'
                @click='Logout'
                rounded
                push
              >{{ $t('logout_btn') }}
              </q-btn>
            </div>
          </q-toolbar>
          <q-separator color="brown-6" style="height: 0.1rem"/>
          <q-toolbar style="justify-content: center">
            <q-select
              hide-dropdown-icon
              label="Order Status"
              behavior='menu'
              class='q-mr-md text-brown-6'
              dense
              flat
              v-model='statusSelect'
              :options='statusOptions'
              emit-value
              hide-selected
            >
              <template v-slot:append>
                <q-icon name='view_list'/>
              </template>
            </q-select>
            <q-select
              hide-dropdown-icon
              behavior='menu'
              class='q-mr-md text-brown-6'
              dense
              flat
              v-model='select'
              :options='options'
              emit-value
            >
              <template v-slot:append>
                <q-icon name='av_timer'/>
              </template>
            </q-select>

            <div>
              <q-badge color="brown-6" class="q-mr-sm">
                {{ $t('orders_on') }}: {{ day }}
              </q-badge>
            </div>
            <div class="q-pa-sm q-pr-md">
              <q-btn icon="event" round>
                <q-popup-proxy class=" bg-transparent" cover transition-show="scale" transition-hide="scale">
                  <div class="q-gutter-xs row items-start">
                    <q-date v-model="day" mask="YYYY-MM-DD" color="primary"/>
                  </div>
                </q-popup-proxy>
              </q-btn>
            </div>

            <q-input
              class='search'
              dense
              :label="$t('find_select') "
              type='search'
              v-model='search'
            >
              <template v-slot:append>
                <q-icon name='search'/>
              </template>
            </q-input>
          </q-toolbar>
        </q-header>

        <AllOrdersList :filteredAllOrders="filteredALLOrders"/>

        <q-footer/>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from 'vue'
import { useQuasar } from 'quasar'
import { useRouter } from 'vue-router'
import { useStore } from 'src/store'
import AllOrdersList from 'components/AllOrdersList.vue'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'AdminPage',
  props: ['order', 'uuid'],

  components: { AllOrdersList },
  setup () {
    // eslint-disable-next-line
    const { t } = useI18n()
    const $q = useQuasar()
    const store = useStore()
    const router = useRouter()

    const search = ref('')

    const optionsOf = [{
      label: ref(t('All Shifts')),
      value: 'All Shifts'
    }, {
      label: ref(t('1 shift')),
      value: '1'
    }, {
      label: ref(t('2 shift')),
      value: '2'
    }, {
      label: ref(t('3 shift')),
      value: '3'
    }
    ]
    const select = ref()
    const options = ref(optionsOf)

    const selectOptionsOf = [{
      label: ref(t('All')),
      value: 'All'
    }, {
      label: ref(t('Preparing')),
      value: 'Preparing'
    }, {
      label: ref(t('Ready To Go')),
      value: 'Ready To Go'
    }, {
      label: ref(t('Declined')),
      value: 'Declined'
    }]
    const statusSelect = ref()
    const statusOptions = ref(selectOptionsOf)

    const day = ref('')

    const report = () => {
      void router.push('/report_page')
    }

    // eslint-disable-next-line
    const allOrders = computed(() => store.state.allOrders)

    onMounted(() => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      store.dispatch('getAllOrders', null, { root: true })
        .catch((err) => {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          if (err.response.status === 401) {
            void router.push('/login')
          }
        })
    })

    const filteredALLOrders = computed(() => {
      function filteredByShift () {
        if (select.value === undefined || select.value === 'All Shifts') {
          // eslint-disable-next-line
            return allOrders.value
        } else {
          // eslint-disable-next-line
            const ordersShiftFilter = allOrders.value.reduce((memo: any[], order: any) => {
            // eslint-disable-next-line
            const filteredOrders = order.user_orders.filter(({ date }: { date: string }) => {
              // eslint-disable-next-line
              const dateObj = new Date(date)
              return Math.ceil((dateObj.getHours() + 1) / 8) === +select.value
            })
            // eslint-disable-next-line
            filteredOrders.length && memo.push({ ...order, ...{ user_orders: filteredOrders } })
            // eslint-disable-next-line
            return memo
          }, [])
          // eslint-disable-next-line
          return ordersShiftFilter
        }
      }

      function filteredByDay () {
        if (!day.value) {
          // eslint-disable-next-line
          return filteredByShift()
        } else {
          debugger
          // eslint-disable-next-line
          const ordersDayFilter = filteredByShift().reduce((memory: any[], order: any) => {
            // eslint-disable-next-line
            const filteredByDayOrders = order.user_orders.filter(({ date }: { date: string }) => {
              // eslint-disable-next-line
              const dateObject = new Date(date)
              // eslint-disable-next-line
              const result = dateObject.getFullYear() + '-' + String(dateObject.getMonth() + 1).padStart(2, '0') + '-' + dateObject.getDate()
              return result === day.value
            })
            // eslint-disable-next-line
            filteredByDayOrders.length && memory.push({ ...order, ...{ user_orders: filteredByDayOrders } })
            // eslint-disable-next-line
            return memory
          }, [])
          // eslint-disable-next-line
          return ordersDayFilter
        }
      }

      function filterBySearchInput () {
        // eslint-disable-next-line
        if (search.value) {
          // eslint-disable-next-line
          return filteredByDay().filter((user: { name: string }) => user?.name?.toLowerCase()?.includes(search.value.toLowerCase()))
        }
        // eslint-disable-next-line
        return filteredByDay()
      }

      function filteredByStatus () {
        if (statusSelect.value === undefined || statusSelect.value === 'All') {
          // eslint-disable-next-line
          return filterBySearchInput()
        } else {
          // eslint-disable-next-line
          return filterBySearchInput().reduce((memo: any[], order: any) => {
            // eslint-disable-next-line
            const filtered = order.user_orders.filter(({ status }: { status: string }) => status === statusSelect.value)
            // eslint-disable-next-line
            filtered.length && memo.push({ ...order, ...{ user_orders: filtered } })
            // eslint-disable-next-line
            return memo
          }, [])
        }
      }
      // eslint-disable-next-line
        return filteredByStatus()
    })

    const Logout = () => {
      void store.dispatch('admin/logout').then(() => {
        void router.push('/')
        $q.notify({
          position: 'top',
          type: 'negative',
          message: t('You are logged out')
        })
      })
    }

    return {
      t,
      filteredALLOrders,
      search,
      select,
      options,
      allOrders,
      report,
      Logout,
      day,
      statusSelect,
      statusOptions
    }
  }
})

</script>

<style lang="scss">
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
  justify-content: space-evenly;
  padding-top: 10rem;
  align-items: center;
}

.orders_list {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ebc09f;
  width: 50%;
  flex-flow: column;
}
</style>
