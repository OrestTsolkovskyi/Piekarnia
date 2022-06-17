<template>
  <div v-if="totalPrice !==0" class="q-ma-md">
  <q-scroll-area
    class="absolute-center text-brown-6 q-pa-md cart_scroll"
    :visible="visible"
  >
    <q-card-section>
      <div class="text-h4 text-bold flex flex-center wrap">{{ $t('cart') }}</div>
    </q-card-section>

    <q-card-section horizontal v-for="item in cart" :key="item.uuid" class="info-section">
         <div class="row cart_name_img">
          <q-img  class="q-pa-md" :src='item.image' width="64px" height="64px" style="border-radius: 50%"/>
            <p class=" q-pa-md flex flex-center text-h5 text-bold">{{ item.name }}</p>
         </div>
           <div class="q-pa-sm">
            <q-btn class="q-pa-md-sm" rounded @click="addItem(item)" icon="add"></q-btn>
            <span class="cart-quantity q-pa-md">{{ item.quantity }}</span>
            <q-btn class="q-pa-md-sm" rounded @click="removeItem(item)" icon="remove"></q-btn>
            <q-btn round color="red-5" flat icon="delete" @click="confirm = true"></q-btn>
        <hr/>
      </div>

      <q-dialog v-model="confirm" persistent>
        <q-card style="background-color: #ebc09f">
          <q-card-section class="row items-center">
            <q-avatar icon="remove_shopping_cart" color="brown-6" text-color="white" />
            <span class="q-ml-sm text-h6">{{ $t('deleting_confirmation') }}</span>
          </q-card-section>

          <q-card-actions align="right">
            <q-btn flat :label="$t('cancel_btn')" color="brown-6" v-close-popup />
            <q-btn round color="red-5" flat icon="delete" @click="deleteItem(item)" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </q-card-section>

      <q-card-section class="q-pa-xs">
        <Summary :totalPrice="totalPrice"/>
      </q-card-section>

      <q-card-actions class="q-pa-none time_picker">
        <TimePicker v-model="modelValue"/>
      </q-card-actions>

      <q-card-actions class="q-pa-sm cart_actions" style="justify-content: space-between">
        <q-btn color="blue" rounded icon="receipt_long" @click="checkout">{{ $t('checkout_btn') }}</q-btn>
        <span class="subtotal flex flex-center text-h5 text-bold">{{ $t('subtotal') }}: {{ totalPrice + 10 }}</span>
        <q-btn color="red" rounded icon="delete_outline" @click="clearCart()">{{ $t('clear_cart_btn') }}</q-btn>
      </q-card-actions>
  </q-scroll-area>
    </div>
    <EmptyCart v-else/>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import Summary from 'components/cartComponents/Summary.vue'
import EmptyCart from 'components/cartComponents/EmptyCart.vue'
import { useStore } from 'src/store'
import swal from 'sweetalert'
import axios from 'src/plugins/axios.config'
import TimePicker from 'components/cartComponents/TimePicker.vue'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  props: ['product', 'uuid'],
  name: 'Cart',
  components: {
    Summary,
    EmptyCart,
    TimePicker
  },

  setup (props) {
    // eslint-disable-next-line
    const { t } = useI18n()
    const store = useStore()
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    const cart = computed(() => store.state.cart)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    const date = computed(() => store.state.date)

    const modelValue = computed({
      get () {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return store.state.date
      },
      set (newValue) {
        void store.dispatch('setDate', newValue)
      }
    })

    // eslint-disable-next-line
    const onDateChange = (date: any) => {
      void store.dispatch('setDate', date)
    }

    // eslint-disable-next-line
    const addItem = (item: any) => {
      void store.dispatch('addItem', {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        product: item || props.product,
        quantity: 1
      })
    }

    // eslint-disable-next-line
    const removeItem = (item: any) => {
      void store.dispatch('removeItem', {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        product: item || props.product,
        quantity: 1
      })
    }

    // eslint-disable-next-line
    const deleteItem = (item: any) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      void store.dispatch('deleteItem', { product: item || props.product })
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-return
    const totalPrice = computed(() => store.getters.totalPrice)

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-return
    const totalProductionCost = computed(() => store.getters.totalProductionCost)

    const clearCart = () => {
      void store.dispatch('clearCart')
    }

    const orderUuid = function uuid () {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8)
        return v.toString(16)
      })
    }

    const checkout = () => {
      void swal(t('Thank you, You order placed successfully')).then(
        clearCart
      )
      axios.post('api/addOrders', {
        product_status: 'Ordered',
        sell_status: 'Waiting',
        order_uuid: orderUuid(),
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        date: date.value,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        order_total: totalPrice.value,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        order_production_cost: totalProductionCost.value,
        status: 'Preparing',
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        products: cart.value
      }).then(() => {
        void store.dispatch('getOrders')
      }).catch((err) => {
        console.error(err)
      })
    }

    return {
      t,
      modelValue,
      onDateChange,
      confirm: ref(false),
      deleteItem,
      checkout,
      clearCart,
      addItem,
      removeItem,
      totalPrice,
      totalProductionCost,
      store,
      cart,
      date,
      visible: ref(true)
    }
  }
})
</script>

<style lang="scss" scoped>
.cart_scroll {
  background-color: #ebc09f;
  width: 40%;
  height: 60%;
  min-width: 40vh;
  min-height: 60vh;
  //max-height: 60%
}

.info-section {
  justify-content: space-between;
}

.time_picker {
  position: center;
}
@media (max-width: 450px) {
  .info-section {
    flex-flow: row wrap;
    justify-content: center;
    min-width: fit-content;
  }

  .cart_actions {
    flex-flow: column wrap;
  }
}

@media (min-width: 500px) and (max-width: 1200px) {
  .cart_scroll {
    min-width: 65vh;
    width: 70%;
    height: 45%;
    min-height: 40vh;
  }
}
</style>
