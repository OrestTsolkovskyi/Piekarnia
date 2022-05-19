<template>
  <q-card-section horizontal>
    <q-card-actions class="q-pa-md">
      <q-tabs
        vertical
        v-model="tab"
        dense
        class="text-brown-6 q-py-md"
      >
        <q-tab :ripple="{ color: 'orange' }" name="January" label="January"/>
        <q-tab :ripple="{ color: 'orange' }" name="February" label="February"/>
        <q-tab :ripple="{ color: 'orange' }" name="March" label="March"/>
        <q-tab :ripple="{ color: 'orange' }" name="April" label="April"/>
        <q-tab :ripple="{ color: 'orange' }" name="May" label="May"/>
        <q-tab :ripple="{ color: 'orange' }" name="June" label="June"/>
        <q-tab :ripple="{ color: 'orange' }" name="July" label="July"/>
        <q-tab :ripple="{ color: 'orange' }" name="August" label="August"/>
        <q-tab :ripple="{ color: 'orange' }" name="September" label="September"/>
        <q-tab :ripple="{ color: 'orange' }" name="October" label="October"/>
        <q-tab :ripple="{ color: 'orange' }" name="November" label="November"/>
        <q-tab :ripple="{ color: 'orange' }" name="December" label="December"/>
      </q-tabs>
    </q-card-actions>

    <q-separator vertical></q-separator>

    <q-card-section>
      <q-tab-panels
        v-model="tab"
        animated
        swipeable
        vertical
        transition-prev="jump-up"
        transition-next="jump-up"
      >
        <q-tab-panel name="January" style="background-color: #ebc09f">
          {{ lorem }}
        </q-tab-panel>
        <q-tab-panel name="February" style="background-color: #ebc09f">
          {{ lorem }}
        </q-tab-panel>
        <q-tab-panel name="March" style="background-color: #ebc09f">
          {{ lorem }}
        </q-tab-panel>
        <q-tab-panel name="April" style="background-color: #ebc09f">
          {{ lorem }}
        </q-tab-panel>
        <q-tab-panel name="May" style="background-color: #ebc09f">
          {{ lorem }}
        </q-tab-panel>
        <q-tab-panel name="June" style="background-color: #ebc09f">
          {{ lorem }}
        </q-tab-panel>
        <q-tab-panel name="July" style="background-color: #ebc09f">
          {{ lorem }}
        </q-tab-panel>
        <q-tab-panel name="August" style="background-color: #ebc09f">
          {{ lorem }}
        </q-tab-panel>
        <q-tab-panel name="September" style="background-color: #ebc09f">
          {{ lorem }}
        </q-tab-panel>
        <q-tab-panel name="October" style="background-color: #ebc09f">
          {{ lorem }}
        </q-tab-panel>
        <q-tab-panel name="November" style="background-color: #ebc09f">
          {{ lorem }}
        </q-tab-panel>
        <q-tab-panel name="December" style="background-color: #ebc09f">
          {{ lorem }}
        </q-tab-panel>
      </q-tab-panels>
    </q-card-section>
  </q-card-section>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'Report_2021',
  setup () {
    return {
      expanded: ref(false),
      tab: ref(''),
      lorem: '          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque numquam repudiandae voluptates!\n' +
        '            Asperiores autem dolorem dolores eum iste necessitatibus porro quam reprehenderit sapiente voluptas. A\n' +
        '            consectetur qui quibusdam vel voluptatibus?\n' +
        '          \n' +
        '          Est, laudantium mollitia nisi possimus quasi quidem tempora vitae voluptas. Alias asperiores corporis\n' +
        '            culpa, et, eveniet facere ipsa iusto necessitatibus non numquam officia perspiciatis quibusdam recusandae\n' +
        '            rerum sapiente suscipit unde!\n' +
        '         \n' +
        '          Aperiam at blanditiis doloribus eaque, error id magni, maxime necessitatibus obcaecati optio placeat quos\n' +
        '            sunt velit? Accusantium, alias blanditiis maxime nesciunt perspiciatis quas velit? Architecto dolores itaque\n' +
        '            maiores nesciunt quia!\n'
    }
  }
})
</script>
