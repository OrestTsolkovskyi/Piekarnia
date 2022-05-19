<template>
  <q-layout view="lHh Lpr lFf" class="window-width">
    <q-page-container>
      <q-page class="page-bg bg-image">
        <div v-bind:class="{'justify-center': $q.screen.md || $q.screen.sm ||$q.screen.xs}"
             class='col-12 col-md-6 flex flex-center' style='justify-content: center; align-items: center'>
          <q-card class="absolute-center" style='width: 35%; min-width: 35vh; background-color: #ebc09f'>
            <q-card-section>
              <div class='q-pt-lg'>
                <div class='col text-h6 ellipsis flex justify-center'>
                  <h3 class='text-h3 text-uppercase q-my-none text-weight-regular text-brown-6'>{{ $t('login_text') }}</h3>
                </div>
              </div>
            </q-card-section>
            <q-card-section>
              <q-form class='q-gutter-md' @submit.prevent='submitForm'>
                <q-input :label="$t('username_login')" v-model='username'></q-input>
                <q-input :label="$t('password_login')" v-model='password' type='password'></q-input>
                <div>
                  <q-btn class='full-width text-brown-2' color='brown-6' :label="$t('login_btn')" rounded type='submit'></q-btn>
                  <div class='text-center q-mt-sm q-gutter-lg'>
                    <router-link class='text-brown-6' to='/'>{{ $t('go_to_homepage') }}</router-link>
                    <router-link class='text-brown-6' to='/signup'>{{ $t('SignUp') }}</router-link>
                  </div>
                </div>
              </q-form>
            </q-card-section>
          </q-card>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script lang='ts'>
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { defineComponent, ref } from 'vue'
import { useQuasar } from 'quasar'
import { useRouter } from 'vue-router'
import { useStore } from 'src/store'
import axios from 'src/plugins/axios.config'
import user from '../store/modules/user'

export default defineComponent({
  name: 'Login',
  setup () {
    const $q = useQuasar()
    const router = useRouter()

    const store = useStore()

    const username = ref('')
    const password = ref('')

    const submitForm = function submitForm () {
      if (username.value === '') {
        $q.notify({
          type: 'negative',
          message: 'Incorrect data'
        })
      }
      if (password.value.length < 1) {
        $q.notify({
          type: 'negative',
          message: 'Not enough symbols. Must be at least 8'
        })
      } else {
        void axios.post('api/login', {
          username: username.value,
          password: password.value
        }).then(({ data }) => {
          if (data.isAdmin) {
            void store.dispatch('admin/setAdmin', data)
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            axios.defaults.headers.common.Authorization = data.token
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            localStorage.setItem('user-token', data.token)
            void router.push('/adminPage')
            $q.notify({
              position: 'top',
              type: 'positive',
              message: ' You are logged '
            })
          } else {
            if (data.isManager) {
              void store.dispatch('manager/setManager', data)
              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
              axios.defaults.headers.common.Authorization = data.token
              // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
              localStorage.setItem('user-token', data.token)
              void router.push('/managerPage')
              $q.notify({
                position: 'top',
                type: 'positive',
                message: ' You are logged '
              })
            } else {
              void store.dispatch('user/setUser', data)
              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
              axios.defaults.headers.common.Authorization = data.token
              // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
              localStorage.setItem('user-token', data.token)
              void router.push('/products')
              $q.notify({
                position: 'top',
                type: 'positive',
                message: ' You are logged '
              })
            }
          }
        }).catch(() => {
          $q.notify({
            type: 'negative',
            message: '! User not found !' +
              ' Need to be logged '
          })
        })
      }
    }

    return {
      user,
      username,
      password,
      submitForm
    }
  }
})
</script>

<style scoped>
.page-bg {
  background-color: #F4DFC5;
}

.bg-image {
  background-image: url("src/assets/cookies-wallpapers.jpg");
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
