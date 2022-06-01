<template>
    <div class="flex flex-center" style="text-align: center">
      <q-img src="../../assets/png/no-results.png" style="width: 50%"></q-img>
      <div class="mt-4">
        <h4 class="text-red-13">{{ $t('empty_history') }}</h4>
      </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'EmptyHistory'
})
</script>

<style lang="scss">
</style>
