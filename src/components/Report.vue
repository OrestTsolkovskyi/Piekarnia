<template>
    <q-card-section style="height: 95%">
      <span class="text-brown-6">2022</span>
      <q-btn
        color="brown-6"
        round
        flat
        dense
        :icon="expanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
        @click="expanded = !expanded"
      />
      <q-slide-transition>
        <div v-show="expanded">
          <q-separator />
          <Report_2022/>
          <q-separator color="brown-6" style="height: 0.1rem"/>
        </div>
      </q-slide-transition>
    </q-card-section>
  </template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
// eslint-disable-next-line camelcase
import Report_2022 from 'components/years/Report_2022.vue'

export default defineComponent({
  name: 'Report',
  components: { Report_2022 },
  setup () {
    const select = ref()

    return {
      select,
      expanded: ref(false),
      tab: ref(''),
      lorem: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
    }
  }
})

</script>

  <style lang="scss" scoped>
  </style>
