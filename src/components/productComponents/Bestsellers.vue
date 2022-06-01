<template>
  <q-card
    style="width: 30%; height: 450px"
    class='products text-brown-6'
  >
        <q-img
          class="rounded-borders image"
          :src='product.image'
          alt='img'
          @click="product_details = true"
        />
    <q-card-section>
      <q-btn
        class="absolute add_btn"
        round
        @click="addItem()"
        icon="add_shopping_cart"
        style="top: -1.4rem; right: 0.05rem; transform: translateY(-50%);"
      />

      <q-dialog
        v-model="product_details"
      >
        <ProductDetails
          :product="product"
        />
      </q-dialog>

        <p class='product_name text-h5 text-bold q-mt-sm q-mb-xs'>{{ product.name }}</p>
        <p class='product_description'> <strong>{{ $t('description') }}</strong> {{ product.description }}</p>
      <q-btn
        class="q-pa-none text-bold"
        color="brown-6"
        flat
        dense
        @click="expanded = !expanded"
      >{{ $t('allergy_info') }}</q-btn>
      <q-slide-transition>
        <div v-show="expanded">
          <q-separator />
          {{ product.allergyInfo }}
        </div>
      </q-slide-transition>
      <p class='product_price q-pt-sm'> <strong>{{ $t('price') }}</strong> {{ product.price }}</p>
      </q-card-section>
  </q-card>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'src/store'
import ProductDetails from 'components/productComponents/ProductDetails.vue'

export default defineComponent({
  props: ['uuid', 'product'],
  name: 'Bestsellers',
  components: {
    ProductDetails
  },
  setup (props) {
    const route = useRoute()
    const store = useStore()

    const addItem = () => {
      void store.dispatch('addItem', {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        product: props.product,
        quantity: 1
      })
    }

    return {
      addItem,
      store,
      product_details: ref(false),
      details: route.params,
      expanded: ref(false)
    }
  }
})

</script>

<style lang="scss" scoped>

.page-bg {
  background-color: #F4DFC5;
}
.products {
  min-width: 300px;
  max-width: 23%;
  width: 23%;
  background-color: #ebc09fd6;
  margin-bottom: 20px;
}

.image {
    max-width: 100%;
    max-height: 50%;
    min-width: 100%;
    min-height: 50%;
}

.add_btn{
  background-color: #ebc09fa6;
}

.add_btn:hover{
  background-color: #A0CB82D8;
}

.add_btn:focus-within{
   background-color: #A0CB82D8;
 }
</style>
