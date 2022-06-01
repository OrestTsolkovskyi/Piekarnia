<template>
  <span v-if="userOrders.length > 0">
    <q-card-section>
      <div class="text-h4 text-bold flex flex-center">{{ $t('orders') }}</div>
    </q-card-section>
      <div
        v-for='order in userOrders'
        :key='order.uuid'
      >
            <q-badge
              :color="order.status === 'Preparing' ? 'red' : 'green' && order.status === 'Declined' ? 'grey' : 'green' || order.status === 'Ready to Go' ? 'green' : 'red'"
              rounded
              class="q-mr-md q-mb-sm"
            >{{ $t(order.status) }}
            </q-badge>
        <p>{{ order.date }}</p>
        <q-card-section
          horizontal
          v-for='product in order.products'
          :key='product.uuid'
        >
        <q-img
          class="rounded-borders image"
          :src='product.image'
          alt='img'
          width="64px" height="64px"
          style="border-radius: 50%; min-width: 64px; min-height: 64px"
        >
        </q-img>
        <p class='product_name text-h5 q-pa-md'>{{ product.name }}</p>
        <q-space/>
        <div class="q-pa-md">
          <span class="cart-quantity q-pa-md">{{ product.quantity }}</span>
          <hr/>
        </div>
          </q-card-section>
      </div>
    </span>
  <EmptyOrders v-else/>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { useStore } from 'src/store'
import EmptyOrders from 'components/ordersComponents/EmptyOrders.vue'

export default defineComponent({
  props: ['uuid', 'order'],
  name: 'Orders',
  components: {
    EmptyOrders
  },
  setup () {
    const store = useStore()

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    const userOrders = computed(() => store.state.orders)

    return {
      userOrders,
      confirm: ref(false)
    }
  }
})
</script>
