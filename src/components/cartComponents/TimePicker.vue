<template>
  <div style="width: 45%">
    <div class="q-mb-sm">
      <q-badge style="background-color: #ebc09f" class="time_text">
        <q-btn
          flat
          icon="event"
          rounded
          class="text-brown-6 q-pa-md cursor-pointer"
        >
          <q-popup-proxy cover transition-show="scale" transition-hide="scale" class="bg-transparent">
            <div class="q-gutter-sm row bg-transparent items-center">
              <q-date class="text-brown-6" :model-value="modelValue" @update:model-value="onDateChange" mask="YYYY-MM-DD">
                <div class="row items-center justify-end">
                  <q-btn v-close-popup label="Close" color="primary" flat/>
                </div>
              </q-date>
              <q-time class="text-brown-6" :model-value="modelValue" @update:model-value="onTimeChange" mask="HH:mm" format24h>
                <div class="row items-center justify-end">
                  <q-btn v-close-popup label="Close" color="primary" flat/>
                </div>
              </q-time>
            </div>
          </q-popup-proxy>
        </q-btn>
        <span class="text-h6 text-brown-6 text-bold">{{ $t('pick_up_time') }}:</span>
        <span class="text-h6 text-brown-6 text-bold" >{{ modelValue }}</span>
      </q-badge>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: ['modelValue'],
  emits: ['update:modelValue'],
  name: 'TimePicker',

  setup (props, { emit }) {
    const onDateChange = (val: number) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-assignment
      const time = props.modelValue.split(',')[1]
      emit('update:modelValue', [val, time].join(' '))
    }

    const onTimeChange = (val: number) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-assignment
      const date = props.modelValue.split(',')[0]
      emit('update:modelValue', [date, val].join(''))
    }

    return {
      onDateChange,
      onTimeChange
    }
  }
})
</script>

<style lang="scss">
.time_picker {
  justify-content: center;
}

.time_text {
  width: fit-content;
  flex-wrap: wrap;
  justify-content: center;
}

@media (max-width: 450px) {
  .time_text {
    width: fit-content;
    flex-wrap: wrap;
    justify-content: center;
  }
}
</style>
