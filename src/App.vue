<template>
  <router-view  class="window-width"/>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'App'
})
</script>

<style lang="scss">
#q-app {
  background-color: #ebc09f;
  //width: 100vw;
}
</style>
