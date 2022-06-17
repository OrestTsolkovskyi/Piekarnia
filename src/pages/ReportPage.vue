<template>
  <q-layout view="lHh Lpr lFf" class="window-width">
    <q-page-container>
      <q-page class="page-bg bg-image">
        <q-header elevated class="text-brown-6">
          <q-toolbar>

            <q-toolbar-title @click="main">
              Piekarnia
            </q-toolbar-title>

            <q-btn
              class='logout'
              @click='Logout'
              rounded
              push
            >{{ $t('logout_btn') }}
            </q-btn>
          </q-toolbar>
        </q-header>

        <q-card  class="absolute-center orders_list q-pa-xs">
          <span class="text-brown-6 text-h4 q-pa-md">{{ $t('admin_reports') }}</span>
          <Report/>
        </q-card>
        <q-footer/>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useQuasar } from 'quasar'
import { useRouter } from 'vue-router'
import { useStore } from 'src/store'
import { useI18n } from 'vue-i18n'
import Report from 'components/Report.vue'

export default defineComponent({
  name: 'ReportPage',

  components: { Report },
  setup () {
    // eslint-disable-next-line
    const { t } = useI18n()
    const $q = useQuasar()
    const store = useStore()

    const router = useRouter()

    const main = () => router.push('/adminPage')

    const Logout = () => {
      void store.dispatch('admin/logout').then(() => {
        void router.push('/')
        $q.notify({
          position: 'top',
          type: 'negative',
          message: t('You are logged out')
        })
      })
    }

    return {
      t,
      main,
      Logout
    }
  }
})

</script>

<style lang="scss" scoped>
.page-bg {
  background-color: #F4DFC5;
}

.bg-image {
  background-image: url("src/assets/walpaper-for-products.jpg");
  background-repeat: no-repeat;
  background-size: cover;
}

.orders {
  display: flex;
  justify-content: center;
  align-items: center;
}

.orders_list{
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ebc09f;
  width: 50%;
  height: 98%;
  flex-flow: column;
}

@media (max-width: 450px) {
  .orders_list {
    width: 95%;
  }
}

@media (min-width: 500px) and (max-width: 1200px){
  .orders_list {
    height: 80%;
    width: 80%;
  }
}
</style>
