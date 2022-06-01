<template>
  <q-card
    class="absolute-center flex flex-center empty-cart">
<div class="flex flex-center my-5" style="text-align: center">
  <q-img src="../../assets/png/shopping-cart.png" style="width: 50%"></q-img>
  <div class="mt-4">
    <h4 class="text-red-13">{{ $t('empty_cart') }}</h4>
  </div>
</div>
  </q-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'EmptyCart'
})
</script>

<style lang="scss">
.empty-cart{
  background-color: #ebc09f;
  width: 35%;
  height: 60%;
  min-width: 35%;
  min-height: 60%
}
@media (min-width: 500px) and (max-width: 1200px) {
  .empty-cart {
    width: 50%;
    min-width: 50%;
    height: 40%;
    min-height: 50%;
  }
}

@media (max-width: 450px) {
  .empty-cart {
    height: 50%;
    width: 90%;
    min-width: 90%;
    min-height: fit-content;
  }
}
</style>
