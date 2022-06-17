<template>
  <q-scroll-area
    class="absolute-center text-center orders_list q-pa-md no-wrap"
  >
    <div style="position: center">
      <span class="text-brown-6 text-h4 q-pa-md">All Orders</span>
      <q-card-section class="no-wrap">
        <div v-for="(orders, ordersDate) in ChefAllOrders"
             :key="ordersDate">
          <p class="text-brown-6 text-h6 text-bold q-pa-md">{{ ordersDate }}</p>
          <div class="q-pt-md" v-for="(shift, shiftKey) in orders" :key="shift">
            <span class='text-brown-6 text-h6 q-pa-md text-bold'>{{ $t(shiftKey) }}</span>
            <q-card-section class="q-pt-md product_info" v-for="products in shift" :key="products">
              <q-card-section horizontal>
              <div class="column">
              <q-btn
                class="q-pa-md text-bold"
                color="brown-6"
                flat
                dense
                @click="expanded = !expanded"
              >{{ products.name }}
              </q-btn>
              <q-slide-transition>
                <div v-show="expanded" class="text-brown-6 product_uuid">
                  {{ products.uuid }}
                </div>
              </q-slide-transition>
              </div>
              <q-space></q-space>
              <p class='text-brown-6 q-pa-md'>{{ products.quantity }}</p>
              <p class='text-brown-6 q-pa-md'>{{ products.product_status }}</p>
              </q-card-section>
              <q-card-section horizontal class="q-pl-sm justify-center">
                <div class="q-gutter-sm">
                  <q-radio v-model="shape" color="red" class="text-brown-6" checked-icon="task_alt" unchecked-icon="panorama_fish_eye" val="Ordered" label="Ordered" />
                  <q-radio v-model="shape" color="orange" class="text-brown-6" checked-icon="task_alt" unchecked-icon="panorama_fish_eye" val="Cooking" label="Cooking" />
                  <q-radio v-model="shape" color="green" class="text-brown-6" checked-icon="task_alt" unchecked-icon="panorama_fish_eye" val="Done" label="Done" />
                </div>
              </q-card-section>
            </q-card-section>
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
  </q-scroll-area>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
// import { useStore } from 'src/store'
// import axios from 'axios'

export default defineComponent({
  name: 'ChefOrders',
  props: ['uuid', 'filteredChefOrders', 'ChefAllOrders'],

  setup () {
    return {
      shape: ref('Ordered'),
      expanded: ref(false),
      // progress,
      // userOrdersStat,
      visible: ref(true)
      // readyToGoBtn,
      // setStatus
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

.product_info {
  justify-content: space-between;
}

.product_uuid {
  font-family: "Roboto", "-apple-system", "Helvetica Neue", Helvetica, Arial, sans-serif;
}

@media (max-width: 450px) {
  .orders_list {
    width: 98%;
  }
  .remove_btn {
    position: absolute;
    padding-top: 35px;
    padding-left: 25px;
  }
}

@media (min-width: 500px) and (max-width: 1200px) {
  .orders_list {
    min-width: 60vh;
    width: 70%;
  }
}
</style>
