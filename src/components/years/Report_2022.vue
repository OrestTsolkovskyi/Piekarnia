<template>
  <q-card-section horizontal>
    <q-card-actions class="q-pa-md">
      <q-tabs
        vertical
        v-model="tab"
        dense
        class="text-brown-6 q-py-md"
      >
        <q-tab :ripple="{ color: 'orange' }" name="January" :label="$t('january')"/>
        <q-tab :ripple="{ color: 'orange' }" name="February" :label="$t('february')"/>
        <q-tab :ripple="{ color: 'orange' }" name="March" :label="$t('march')"/>
        <q-tab :ripple="{ color: 'orange' }" name="April" :label="$t('april')"/>
        <q-tab :ripple="{ color: 'orange' }" name="May" :label="$t('may')"/>
        <q-tab :ripple="{ color: 'orange' }" name="June" :label="$t('june')"/>
        <q-tab :ripple="{ color: 'orange' }" name="July" :label="$t('july')"/>
        <q-tab :ripple="{ color: 'orange' }" name="August" :label="$t('august')"/>
        <q-tab :ripple="{ color: 'orange' }" name="September" :label="$t('september')"/>
        <q-tab :ripple="{ color: 'orange' }" name="October" :label="$t('october')"/>
        <q-tab :ripple="{ color: 'orange' }" name="November" :label="$t('november')"/>
        <q-tab :ripple="{ color: 'orange' }" name="December" :label="$t('december')"/>
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
  name: 'Report_2022',
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
