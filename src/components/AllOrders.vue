<template>
  <div>
    <span class="text-brown-6 text-h4 q-pa-md">All Orders</span>
    <q-card-section class="wrap">
      <q-btn
        class="q-mb-md text-bold"
        color="brown-6"
        flat
        dense
        @click="expanded = !expanded"
      >{{ $t('admin_orders_list') }}
      </q-btn>
      <div>
        <div v-show="expanded" v-for="user in allOrders"
             :key="user.user_uuid">
          <span class="text-brown-6 text-h6" @click="expandedInfo = !expandedInfo"><strong>{{
              $t('admin_client_name')
            }}:</strong> {{ user.name }}</span>
          <q-slide-transition>
            <div v-show="expandedInfo" class="text-brown-6 person_uuid">
              {{ user.user_uuid }}
              <br/>
              <q-linear-progress
                rounded size="25px"
                :value="progress1"
                color="light-green-6"
                track-color="deep-orange-12">
                <div class="absolute-full flex flex-center">
                  <q-badge color="white" text-color="light-green-6" :label="progressLabel1"/>
                </div>
              </q-linear-progress>
            </div>
          </q-slide-transition>
          <div class="q-pt-md" v-for="product in user.user_orders" :key="product">
            <q-card-section horizontal class="q-pt-md" v-for="order in product.products" :key="order.uuid">
              <q-img
                class="rounded-borders image q-ml-md"
                :src='order.image'
                alt='img'
                width="64px" height="64px"
                style="border-radius: 50%"
              />
              <q-space/>
              <p class='product_name text-h5 text-brown-6 q-pa-md'>{{ order.name }}</p>
              <q-space/>
              <div class="q-pa-md">
                <span class="cart-quantity text-brown-6 q-pa-md">{{ order.quantity }}</span>
                <hr/>
              </div>
              <div class="q-pa-xs-xs q-ml-md">
                <q-btn color="red" flat round class="q-pa-md" icon="cancel" @click="confirm = true"></q-btn>
              </div>
              <q-dialog v-model="confirm" persistent>
                <q-card style="background-color: #ebc09f">
                  <q-card-section class="row items-center">
                    <q-avatar icon="remove_shopping_cart" color="brown-6" text-color="white"/>
                    <span class="q-ml-sm text-h6 text-brown-6">Are you sure, you want to remove this order?</span>
                  </q-card-section>

                  <q-card-actions align="right">
                    <q-btn flat label="Cancel" color="brown-6" v-close-popup/>
                    <q-btn round color="red-5" flat icon="delete" @click="removeOrder" v-close-popup/>
                  </q-card-actions>
                </q-card>
              </q-dialog>
            </q-card-section>

            <div class="q-pa-sm row" style="justify-content: space-between">
              <p class="text-brown-6"><strong>Production Cost:</strong> {{ product.order_production_cost }}</p>
              <p class="text-brown-6"><strong>Payed:</strong> {{ product.order_total }}</p>
              <p class="text-brown-6"><strong>Pick up time:</strong> {{ product.date }}</p>
            </div>
            <q-card-actions class="q-mb-md" style="justify-content: space-evenly">
              <q-checkbox
                left-label
                class="text-brown-6 text-bold"
                :label="readyToGoBtn"
                rounded
                false-value="Preparing"
                true-value="Ready To Go"
                v-model="readyToGoBtn"
                checked-icon="task_alt"
                unchecked-icon="highlight_off"
                color="brown-6"
                @click="setStatus"
              />
              <q-btn
                class="text-brown-6 text-bold"
                label="Decline Order"
                rounded
                @click="decline = true"
              />
              <q-dialog v-model="decline" persistent>
                <q-card style="background-color: #ebc09f">
                  <q-card-section class="row items-center">
                    <q-avatar icon="remove_shopping_cart" color="brown-6" text-color="white"/>
                    <span class="q-ml-sm text-h6 text-brown-6">Are you sure, you want to decline whole order?</span>
                  </q-card-section>

                  <q-card-actions align="right">
                    <q-btn flat label="Cancel" color="brown-6" v-close-popup/>
                    <q-btn round color="red-5" flat icon="delete" @click="declineOrder" v-close-popup/>
                  </q-card-actions>
                </q-card>
              </q-dialog>
            </q-card-actions>
            <q-separator color="brown-6 q-mb-sm" style="height: 0.1rem"/>
          </div>
        </div>
      </div>
    </q-card-section>
    <div class="flex flex-center" style="text-align: center; flex-flow: column wrap">
      <q-img src="../assets/png/files.png" style="width: 50%"></q-img>
      <div class="mt-4">
        <h4 class="text-brown-6">{{ $t('admin_orders_list') }}</h4>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { useStore } from 'src/store'

export default defineComponent({
  name: 'AllOrders',
  props: ['uuid'],

  setup () {
    const store = useStore()
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    const allOrders = computed(() => store.state.allOrders)

    const progress1 = ref(0.95)

    // eslint-disable-next-line
    const removeOrder = (order: any) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      void store.dispatch('removeOrder', { order: order })
    }

    // eslint-disable-next-line
    const declineOrder = (order: any) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      void store.dispatch('declineOrder', { order: order })
    }

    const setStatus = () => {
      void store.dispatch('setStatus', status)
    }

    return {
      progress1,
      progressLabel1: computed(() => (progress1.value * 100).toFixed(2) + '%'),
      allOrders,
      confirm: ref(false),
      expanded: ref(false),
      expandedInfo: ref(false),
      visible: ref(true),
      readyToGoBtn: ref('Preparing'),
      decline: ref(false),
      declineOrder,
      removeOrder,
      setStatus
    }
  }
})

</script>

<style lang="scss" scoped>
.person_uuid {
  font-family: "Roboto", "-apple-system", "Helvetica Neue", Helvetica, Arial, sans-serif;
}
</style>
