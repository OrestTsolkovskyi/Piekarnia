<template>
  <q-layout view="lHh Lpr lFf" class="window-width">
    <q-page-container>
      <q-page class="page-bg bg-image">
        <q-header elevated class="text-brown-6">
          <q-toolbar>

            <q-toolbar-title style="min-width: fit-content">
              Piekarnia
            </q-toolbar-title>

            <q-space></q-space>

            <div class="q-pa-sm q-gutter-sm" style="min-width: fit-content">
              <q-btn
                style="min-width: 5%"
                text-color="brown-6"
                color="primary"
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

        <ChefOrders :filteredChefOrders="filteredChefOrders"/>
<!--        <ChefOrders :ChefAllOrders="ChefAllOrders"/>-->

        <q-footer/>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
/* eslint-disable */
import { computed, defineComponent, onMounted, ref } from 'vue'
import { useQuasar } from 'quasar'
import { useRouter } from 'vue-router'
import { useStore } from 'src/store'
import { useI18n } from 'vue-i18n'
import ChefOrders from 'components/ChefOrders.vue'

export default defineComponent({
  name: 'ChefPage',
  props: ['order', 'uuid'],

  components: { ChefOrders },
  setup () {
    const { t } = useI18n()
    const $q = useQuasar()
    const store = useStore()
    const router = useRouter()

    const search = ref('')

    const day = ref('')

    // eslint-disable-next-line
    const ChefAllOrders = computed(() => store.state.chefAllOrders)

    onMounted(() => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      store.dispatch('getChefAllOrders', null, { root: true })
        .catch((err) => {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          if (err.response.status === 401) {
            void router.push('/login')
          }
        })
    })

    const filteredChefOrders = computed(() => {
      function filteredByDay () {
        if (!day.value) {
          // eslint-disable-next-line
          return ChefAllOrders.value
        }
        // eslint-disable-next-line
        return ChefAllOrders.value[day.value] && {
          // eslint-disable-next-line
          [day.value]: ChefAllOrders.value[day.value]
        }
      }

      function filterBySearchInput () {
        // eslint-disable-next-line
        if (search.value && filteredByDay()) {
          // eslint-disable-next-line
          const result: {[key:string]: any} = {}
          // eslint-disable-next-line
          for (const [dayKey, dayValue] of Object.entries(filteredByDay())) {
            const filteredShifts: {[key:string]: string} = {}

            for (const [shiftKey, shiftValue] of Object.entries(dayValue as any)) {
              const filteredShift = (shiftValue as any).filter((product: { name: string }) => product.name.toLowerCase()?.includes(search.value.toLowerCase()))
              if (filteredShift.length) {
                filteredShifts[shiftKey] = filteredShift
              }
            }

            if (Object.keys(filteredShifts).length) {
              result[dayKey] = filteredShifts
            }
          }
          return result
        }
        // eslint-disable-next-line
        return filteredByDay()
      }
      // eslint-disable-next-line
      return filterBySearchInput()
    })

    const Logout = () => {
      void store.dispatch('chef/logout').then(() => {
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
      filteredChefOrders,
      search,
      ChefAllOrders,
      Logout,
      day
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
</style>
