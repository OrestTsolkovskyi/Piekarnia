<template>
  <q-scroll-area
    class="absolute-center text-brown-6 q-pa-md orders_scroll"
    :visible="visible"
  >
    <q-card-section class="q-pa-none">
      <q-toolbar class="q-pa-none">
        <q-tabs
          v-model="tab"
          dense
          align="center"
          class="text-brown-6 q-py-md"
        >
          <q-tab :ripple="{ color: 'orange' }" name="Orders" icon="receipt_long" :label="$t('orders')"/>
          <br>
          <q-tab :ripple="{ color: 'orange' }" name="History" icon="history" :label="$t('history')"/>
        </q-tabs>
      </q-toolbar>

      <q-separator></q-separator>

      <q-card-section class="orders_tabs">
          <q-tab-panels
            v-model="tab"
            animated
            swipeable
          >
            <q-tab-panel name="Orders" style="background-color: #ebc09f; min-width: 40vh">
                <Orders
                  :order="order"
                />
            </q-tab-panel>

            <q-tab-panel name="History" style="background-color: #ebc09f">
              <History/>
            </q-tab-panel>
          </q-tab-panels>
      </q-card-section>
    </q-card-section>
  </q-scroll-area>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import Orders from 'components/ordersComponents/Orders.vue'
import History from 'components/ordersComponents/History.vue'

export default defineComponent({
  props: ['order', 'uuid'],
  name: 'OrdersInfo',
  components: {
    History,
    Orders
  },
  setup () {
    return {
      tab: ref('Orders'),
      visible: ref(true)
    }
  }
})
</script>

<style lang="scss">
.q-item {
  border-radius: 1rem;
}

.orders_scroll{
  background-color: #ebc09f;
  width: 40%;
  height: 60%;
  min-width: 40vh;
  min-height: 60vh;
  //max-height: 60vh
}

@media (min-width: 500px) and (max-width: 1200px) {
  .orders_scroll {
    min-width: 70%;
    width: 70%;
  }
}

@media (max-width: 450px) {
  .orders_scroll {
    width: 99%;
    min-width: 90%;
  }

  .orders_tabs {
    flex-flow: row wrap;
  }
}
</style>
