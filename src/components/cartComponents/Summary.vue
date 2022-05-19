<template>
  <div class="row">
    <div class="col-md-4"><div class="text-h5  text-bold">{{ $t('summary') }}</div>
      <p class="total text-h6">Total: {{ totalPrice }}</p>
      <p class="shipping">{{ $t('shipping') }}: 10</p>
      <q-separator></q-separator>
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
