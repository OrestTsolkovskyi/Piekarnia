<template>
<!--  <q-card-->
<!--    style="background-color: #ebc09f"-->
<!--    class="absolute-center flex flex-center">-->
    <div class="flex flex-center" style="text-align: center">
      <q-img src="../../assets/png/no-task.png" style="width: 50%"></q-img>
      <div class="mt-4">
        <h4 class="text-red-13">You don't have any orders yet</h4>
      </div>
    </div>
<!--  </q-card>-->
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'EmptyCart'
})
</script>
