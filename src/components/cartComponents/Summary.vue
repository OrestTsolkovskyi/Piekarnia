<template>
  <div class="row summary">
    <div>
      <div class="text-h5 text-bold summary">{{ $t('summary') }}</div>
      <p class="total text-h6">Total: {{ totalPrice }}</p>
      <p class="shipping">{{ $t('shipping') }}: 10</p>
      <q-separator ></q-separator>
      <p class="subtotal text-bold">{{ $t('subtotal') }}: {{ totalPrice + 10 }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Summary',
  props: ['totalPrice']
})
</script>

<style lang="scss">
.summary {
  justify-content: center;
}
</style>
