<template>
  <footer elevated class="text-brown-6">
    <div class="flex justify-center q-gutter-xl" >
      <div class="text-h5" @click="privacy = true">{{ $t('f_privacy_policy') }}</div>
      <q-dialog v-model="privacy">
        <q-card class="bg-primary">
          <q-card-section>
          <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium, ad aspernatur autem delectus dolor eius hic inventore maiores minima odit perspiciatis porro quisquam quo rem, sed similique veniam, voluptates voluptatibus!</div>
          <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium, ad aspernatur autem delectus dolor eius hic inventore maiores minima odit perspiciatis porro quisquam quo rem, sed similique veniam, voluptates voluptatibus!</div>
          <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium, ad aspernatur autem delectus dolor eius hic inventore maiores minima odit perspiciatis porro quisquam quo rem, sed similique veniam, voluptates voluptatibus!</div>
          <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium, ad aspernatur autem delectus dolor eius hic inventore maiores minima odit perspiciatis porro quisquam quo rem, sed similique veniam, voluptates voluptatibus!</div>
          <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium, ad aspernatur autem delectus dolor eius hic inventore maiores minima odit perspiciatis porro quisquam quo rem, sed similique veniam, voluptates voluptatibus!</div>
          <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium, ad aspernatur autem delectus dolor eius hic inventore maiores minima odit perspiciatis porro quisquam quo rem, sed similique veniam, voluptates voluptatibus!</div>
          <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium, ad aspernatur autem delectus dolor eius hic inventore maiores minima odit perspiciatis porro quisquam quo rem, sed similique veniam, voluptates voluptatibus!</div>
          </q-card-section>
        </q-card>
      </q-dialog>
      <div class="text-h5" @click="contact = true">{{ $t('f_contact_us') }}</div>
      <q-dialog v-model="contact">
        <q-card class="bg-primary">
          <q-card-section>
        <div>{{ $t('f_contact_number') }}</div>
        <div>xxx-xxx-xxx</div>
          </q-card-section>
          <q-card-section>
        <div>E-mail</div>
        <div> xxxxxxxxxxxxxx@gmail.com</div>
          </q-card-section>
        </q-card>
      </q-dialog>
    </div>
  </footer>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'Footer',

  setup () {
    return {
      contact: ref(false),
      privacy: ref(false)
    }
  }
})
</script>
