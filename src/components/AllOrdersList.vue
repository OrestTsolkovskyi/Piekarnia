<template>
  <q-scroll-area
    class="absolute-center text-center orders_list q-pa-md no-wrap"
  >
    <div style="position: center">
      <span class="text-brown-6 text-h4 q-pa-md">All Orders</span>
      <q-card-section class="no-wrap">
        <q-btn
          class="q-mb-md text-bold"
          color="brown-6"
          flat
          dense
          @click="expanded = !expanded"
        >{{ $t('admin_orders_list') }}
        </q-btn>
        <div v-show="expanded">
          <div v-for="user in filteredAllOrders"
               :key="user.user_uuid">
          <span class="text-brown-6 text-h6" @click="expandedInfo = !expandedInfo">
            <strong>{{ $t('admin_client_name') }}:</strong> {{ user.name }}</span>
            <q-slide-transition>
              <div v-show="expandedInfo" class="text-brown-6 person_uuid">
                {{ user.user_uuid }}
                <br/>
                <q-linear-progress
                  :indeterminate="progress.get(user.user_uuid) === undefined"
                  rounded size="25px"
                  :value="progress.get(user.user_uuid) || 0"
                  color="light-green-6"
                  track-color="deep-orange-12"
                >
                  <div class="absolute-full flex flex-center">
                    <q-badge v-if="progress.get(user.user_uuid) !== undefined" color="white" text-color="light-green-6" :label="userOrdersStat(user.user_uuid)"/>
                  </div>
                </q-linear-progress>
              </div>
            </q-slide-transition>
            <div class="q-pt-md" v-for="order in user.user_orders" :key="order.order_uuid">
              <q-card-section horizontal class="q-pt-md" v-for="product in order.products" :key="product.uuid">
                <q-img
                  class="rounded-borders image q-ml-md"
                  :src='product.image'
                  alt='img'
                  width="64px" height="64px"
                  style="border-radius: 50%"
                />
                <q-space/>
                <p class='product_name text-h5 text-brown-6 q-pa-md'>{{ product.name }}</p>
                <q-space/>
                <div class="q-pa-md">
                  <span class="cart-quantity text-brown-6 q-pa-md">{{ product.quantity }}</span>
                  <hr/>
                </div>
                <div class="q-pa-xs-xs q-ml-md">
                  <q-btn color="red" flat round class="q-pa-md" icon="cancel"
                         @click="openRemoveDialog(user.user_uuid, order.order_uuid, product.uuid)"></q-btn>
                </div>
              </q-card-section>

              <div class="q-pa-sm row" style="justify-content: space-between">
                <p class="text-brown-6"><strong>{{ $t('production_cost') }}:</strong> {{ order.order_production_cost }}</p>
                <p class="text-brown-6"><strong>{{ $t('payed') }}:</strong> {{ order.order_total }}</p>
                <p class="text-brown-6"><strong>{{ $t('pick_up_time') }}:</strong> {{ order.date }}</p>
              </div>
              <q-card-actions class="q-mb-md" style="justify-content: space-evenly">
                <q-checkbox
                  left-label
                  class="text-brown-6 text-bold"
                  :label="order.status"
                  rounded
                  false-value="Preparing"
                  true-value="Ready To Go"
                  :model-value="order.status"
                  :disable="order.status === 'Declined'"
                  checked-icon="task_alt"
                  unchecked-icon="highlight_off"
                  color="brown-6"
                  @update:model-value="setStatus(user, order, $event)"
                />
                <q-btn
                  class="text-brown-6 text-bold"
                  :label="$t('decline_btn')"
                  rounded
                  :disabled="order.status === 'Declined' || order.status === 'Ready To Go'"
                  @click="openDeclineDialog(user.user_uuid, order.order_uuid)"
                />
              </q-card-actions>
              <q-separator color="brown-6 q-mb-sm" style="height: 0.1rem"/>
            </div>
          </div>
          <q-dialog v-model="decline" persistent>
            <q-card style="background-color: #ebc09f">
              <q-card-section class="row items-center">
                <q-avatar icon="remove_shopping_cart" color="brown-6" text-color="white"/>
                <span class="q-ml-sm text-h6 text-brown-6">{{ $t('declined_confirmation') }}</span>
              </q-card-section>

              <q-card-actions align="right">
                <q-btn flat :label="$t('cancel_btn')" color="brown-6" v-close-popup/>
                <q-btn round color="red-5" flat icon="delete"
                       @click="declineOrder(declineDialogDataUserUuid, declineDialogDataOrderUuid)" v-close-popup/>
              </q-card-actions>
            </q-card>
          </q-dialog>

          <q-dialog v-model="remove" persistent>
            <q-card style="background-color: #ebc09f">
              <q-card-section class="row items-center">
                <q-avatar icon="remove_shopping_cart" color="brown-6" text-color="white"/>
                <span class="q-ml-sm text-h6 text-brown-6">{{ $t('removing_confirmation') }}</span>
              </q-card-section>

              <q-card-actions align="right">
                <q-btn flat :label="$t('cancel_btn')" color="brown-6" v-close-popup/>
                <q-btn round color="red-5" flat icon="delete"
                       @click="removeOrderItem(removeDialogDataUserUuid, removeDialogDataOrderUuid, removeDialogDataProductUuid)"
                       v-close-popup/>
              </q-card-actions>
            </q-card>
          </q-dialog>
        </div>
      </q-card-section>
      <div class="flex flex-center" style="text-align: center; flex-flow: column wrap">
        <q-img src="../assets/png/files.png" style="width: 50%"></q-img>
        <div class="mt-4">
          <h4 class="text-brown-6">{{ $t('admin_orders_list') }}</h4>
        </div>
      </div>
    </div>
  </q-scroll-area>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useStore } from 'src/store'
import axios from 'axios'

export default defineComponent({
  name: 'AllOrdersList',
  props: ['allOrders', 'uuid', 'filteredAllOrders'],

  setup () {
    const store = useStore()

    const progress = ref<Map<string, number>>(new Map())

    // eslint-disable-next-line
    axios.get('api/progressStatus').then(pValue => {
      // eslint-disable-next-line
      for (let i = 0; i < pValue.data.length; i++) {
        // eslint-disable-next-line
        progress.value.set(pValue.data[i].user_uuid, pValue.data[i].declinedCount)
      }
    }).catch(err => {
      return Promise.reject(err)
    })
    console.log(progress.value)
    // eslint-disable-next-line
    const userOrdersStat = (user_uuid: string) => {
      const stat = progress.value.get(user_uuid)
      return stat !== undefined ? stat.toFixed(2) + '%' : ''
    }

    const readyToGoBtn = ref('Preparing')

    const remove = ref(false)

    const removeDialogDataUserUuid = ref<string>('')
    const removeDialogDataOrderUuid = ref<string>('')
    const removeDialogDataProductUuid = ref<string>('')

    const openRemoveDialog = (userUuid: string, orderUuid: string, productUuid: string) => {
      removeDialogDataUserUuid.value = userUuid
      removeDialogDataOrderUuid.value = orderUuid
      removeDialogDataProductUuid.value = productUuid
      remove.value = true
    }

    const removeOrderItem = (userUuid: string, orderUuid: string, productUuid: string) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      void store.dispatch('removeOrderItem', {
        userUuid,
        orderUuid,
        productUuid
      })
    }

    const decline = ref(false)

    const declineDialogDataUserUuid = ref<string>('')
    const declineDialogDataOrderUuid = ref<string>('')

    const openDeclineDialog = (userUuid: string, orderUuid: string) => {
      declineDialogDataUserUuid.value = userUuid
      declineDialogDataOrderUuid.value = orderUuid
      decline.value = true
    }

    const declineOrder = (userUuid: string, orderUuid: string) => {
      void store.dispatch('declineOrder', {
        userUuid,
        orderUuid
      })
    }

    const setStatus = (user: object, order: object, status: string) => {
      void store.dispatch('setStatus', {
        user,
        order,
        status
      })
    }
    return {
      // progressData,
      progress,
      userOrdersStat,
      remove,
      expanded: ref(false),
      expandedInfo: ref(false),
      visible: ref(true),
      readyToGoBtn,
      decline,
      openDeclineDialog,
      declineDialogDataUserUuid,
      declineDialogDataOrderUuid,
      declineOrder,
      removeDialogDataUserUuid,
      removeDialogDataOrderUuid,
      removeDialogDataProductUuid,
      openRemoveDialog,
      removeOrderItem,
      setStatus
    }
  }
})

</script>

<style lang="scss" scoped>
.orders_list {
  background-color: #ebc09f;
  width: 45vh;
  height: 90%;
  min-width: 40%;
  min-height: 90%;
  max-height: 90%;
  border-radius: 1%;
}

.person_uuid {
  font-family: "Roboto", "-apple-system", "Helvetica Neue", Helvetica, Arial, sans-serif;
}
</style>
