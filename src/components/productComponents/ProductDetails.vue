<template>
  <q-card
    class='products_details text-brown-6'
  >
    <q-card-section horizontal>
      <q-card-section class="col-5 flex flex-center" style="width: max-content">
        <q-img
          class="rounded-borders image"
          :src='product.image'
          alt='img'
        />
      </q-card-section>

      <q-card-section class="q-pt-xs" style="max-width: 50%">
        <p class='product_name text-h5 text-bold q-mt-sm q-mb-xs'>{{ product.name }}</p>
        <p class='product_description'> <strong>{{ $t('description') }}</strong> {{ product.description }}</p>
        <p class='product_allergy_info'> <strong>{{ $t('allergy_info') }}</strong> {{ product.allergyInfo }}</p>
        <p class='product_price'> <strong>{{ $t('price') }}</strong> {{ product.price }}</p>
      </q-card-section>
    </q-card-section>

    <q-separator/>

    <q-card-actions align="right" class="q-gutter-md">
      <q-btn rounded @click="addItem()" icon="add_shopping_cart"></q-btn>
    </q-card-actions>
  </q-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useStore } from 'src/store'

export default defineComponent({
  props: ['uuid', 'product'],
  name: 'Product',

  setup (props) {
    const store = useStore()

    // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-return
    // const product = computed(() => store.getters.getProduct(props.uuid))

    // onMounted(() => {
    //   store.dispatch('GET_PRODUCT', uuid).then(() => {
    //     isLoading = false
    //     // eslint-disable-next-line @typescript-eslint/no-empty-function
    //   }).catch(() => {
    //   })
    // })
    //
    const addItem = () => {
      void store.dispatch('addItem', {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        product: props.product,
        quantity: 1
      })
    }

    const removeItem = () => {
      void store.dispatch('removeItem', props.product)
    }

    return {
      removeItem,
      addItem,
      // product,
      store
    }
  }
})

</script>

<style lang="scss" scoped>
.products_details {
  background-color: #ebc09f;
  width: 55%;
  max-width: fit-content;
  min-width: 40vh;
  height: fit-content;
  //display: flex;
  //flex-flow: column wrap;
  //justify-content: space-around;
  /*align-items: center;*/
  padding: 20px;
  margin-bottom: 20px;
}

.image {
  width: 512px;
  height: 512px;
  min-width: 100px;
  min-height: 100px;
}
</style>
