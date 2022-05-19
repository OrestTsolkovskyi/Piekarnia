<template>
  <q-separator color="brown-6"/>
  <q-page class="row page-bg">
      <div style="max-width: 400px">
        <q-tabs
          v-model="tab"
          narrow-indicator
          dense
          align="justify"
          class="text-brown-6"
        >
          <q-tab :ripple="{ color: 'orange' }" name="Home" icon="home" label="Home" />
          <q-tab :ripple="{ color: 'orange' }" name="Gallery" icon="photo" label="Gallery" />
          <q-tab :ripple="{ color: 'orange' }" name="movies" icon="movie" label="Movies" />
        </q-tabs>
      </div>

  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'PageIndex',
  components: {},

  setup () {
    return {
      tab: ref('mails')
    }
  }
})
</script>

<style lang="scss">
.page-bg{
  background-color: $orange-2;
}
</style>
