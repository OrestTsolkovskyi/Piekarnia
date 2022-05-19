<template>
  <q-card
    style="background-color: #ebc09f; width: 35%; height: 60%; min-width: 35%; min-height: 60%"
    class="absolute-center flex flex-center">
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
</style>
