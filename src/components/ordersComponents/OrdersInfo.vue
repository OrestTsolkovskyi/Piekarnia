<template>
  <q-scroll-area
    class="absolute-center text-brown-6 q-pa-md orders_scroll"
    :visible="visible"
  >
    <q-card-section horizontal>
      <q-card-actions class="q-pa-md">
        <q-tabs
          vertical
          v-model="tab"
          dense
          align="center"
          class="text-brown-6 q-py-md"
        >
          <q-tab :ripple="{ color: 'orange' }" name="Orders" icon="receipt_long" label="Orders"/>
          <br>
          <q-tab :ripple="{ color: 'orange' }" name="History" icon="history" label="History"/>
        </q-tabs>
      </q-card-actions>

      <q-separator vertical></q-separator>

      <q-card-section>
          <q-tab-panels
            v-model="tab"
            animated
            swipeable
            vertical
            transition-prev="jump-up"
            transition-next="jump-up"
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
      // Orders: ref(false),
      // History: ref(false),
      // drawer: ref(false),
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
</style>

<!--        <q-btn-->
<!--          icon="receipt_long"-->
<!--          flat-->
<!--          rounded-->
<!--          @click="showOrders"-->
<!--          label="Orders"/>-->
<!--        <br>-->
<!--        <q-btn-->
<!--          icon="history"-->
<!--          flat-->
<!--          rounded-->
<!--          @click="showHistory"-->
<!--          label="History"-->
<!--        />-->
