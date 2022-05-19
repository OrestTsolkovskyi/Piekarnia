<template>
  <q-scroll-area
    class="absolute-center text-center orders_list q-pa-md no-wrap"
    style="width: 45vh"
  >
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
                <p class="text-brown-6"><strong>Production Cost:</strong> {{ order.order_production_cost }}</p>
                <p class="text-brown-6"><strong>Payed:</strong> {{ order.order_total }}</p>
                <p class="text-brown-6"><strong>Pick up time:</strong> {{ order.date }}</p>
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
                  label="Decline Order"
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
                <span class="q-ml-sm text-h6 text-brown-6">Are you sure, you want to decline whole order?</span>
              </q-card-section>

              <q-card-actions align="right">
                <q-btn flat label="Cancel" color="brown-6" v-close-popup/>
                <q-btn round color="red-5" flat icon="delete"
                       @click="declineOrder(declineDialogDataUserUuid, declineDialogDataOrderUuid)" v-close-popup/>
              </q-card-actions>
            </q-card>
          </q-dialog>

          <q-dialog v-model="remove" persistent>
            <q-card style="background-color: #ebc09f">
              <q-card-section class="row items-center">
                <q-avatar icon="remove_shopping_cart" color="brown-6" text-color="white"/>
                <span class="q-ml-sm text-h6 text-brown-6">Are you sure, you want to remove this order?</span>
              </q-card-section>

              <q-card-actions align="right">
                <q-btn flat label="Cancel" color="brown-6" v-close-popup/>
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
import { computed, defineComponent, ref } from 'vue'
import { useStore } from 'src/store'

export default defineComponent({
  name: 'AllOrdersList',
  props: ['allOrders', 'uuid', 'filteredAllOrders'],

  setup () {
    const store = useStore()

    const progress1 = ref(0.95)

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
      progress1,
      progressLabel1: computed(() => (progress1.value * 100).toFixed(2) + '%'),
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
  width: 40%;
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
