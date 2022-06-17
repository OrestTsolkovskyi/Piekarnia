<template>
  <!--    <q-card-section class="text-brown-6 report_card" style="height: 100%">-->
  <q-scroll-area
    class="text-brown-6 q-pa-md shifts_scroll" style="width: 47vw; height: 100%"
    :visible="visible"
  >
    <q-card-section class="q-pa-md column info_card" style="justify-content: center">
      <div class="row date" style="justify-content: center">
        <q-date
          class="calendar justify-center"
          mask="YYYY-MM-DD"
          @change="getReport"
          v-model="date"
          minimal
        />
        <h6 class="q-ml-lg">{{ date }}</h6>
      </div>
      <div style="justify-content: center" v-if="isLoading">
        <q-spinner-tail
          color="brown-6"
          size="15em"
          class="q-pa-sm"
        /><q-spinner-tail
          color="brown-6"
          size="15em"
          class="q-pa-sm"
        /><q-spinner-tail
          color="brown-6"
          size="15em"
          class="q-pa-sm"
        />
      </div>
      <div v-else class="row shifts_info" style="justify-content: space-between; width: 90vh">
        <div v-for="(shift, key) in report" :key="shift">
          <h6>{{ $t(key) }}</h6>
          <p>Production cost: {{ shift.order_production_cost }}</p>
          <p>Income: {{ shift.order_total }}</p>
          <p>Profit: {{ shift.profit }}</p>
        </div>
      </div>
    </q-card-section>
  </q-scroll-area>
  <!--  </q-card-section>-->
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from 'vue'
import { useStore } from 'src/store'

export default defineComponent({
  name: 'Report',
  setup () {
    const select = ref()
    const store = useStore()
    const isLoading = ref(true)

    const date = ref('')

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    const report = computed(() => store.state.report)

    const getReport = (newDate: string) => {
      isLoading.value = true
      void store.dispatch('getReport', newDate).then(() => {
        isLoading.value = false
      })
    }

    watch(date, (newDate) => {
      getReport(newDate)
    })

    return {
      isLoading,
      getReport,
      report,
      date,
      visible: ref(true),
      select,
      lorem: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
    }
  }
})

</script>

<style lang="scss" scoped>
@media (max-width: 450px) {
  .report_card {
    width: 45vh;
    flex-flow: column wrap;
  }

  .date {
    min-width: 90%;
  }

  .shifts_info {
    height: 30vh;
    width: 40vh;
    flex-flow: column;
  }

  .shifts_scroll {
    min-width: 95%;
  }

  .date {
    flex-flow: column;
  }
}

@media (min-width: 500px) and (max-width: 1200px) {
  .shifts_scroll {
    min-width: 95%;
  }
}
</style>
