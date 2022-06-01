<template>
  <q-layout view="lHh Lpr lFf" class="window-width">
    <q-page-container>
      <q-page class="page-bg bg-image">
        <div v-bind:class="{'justify-center': $q.screen.md || $q.screen.sm ||$q.screen.xs}"
             class='col-12 col-md-6 flex flex-center' style='justify-content: center; align-items: center'>
          <q-card class="absolute-center signup_card">
            <q-card-section>
              <div class='q-pt-lg'>
                <div class='col text-h6 ellipsis flex justify-center'>
                  <h3 class='text-h3 text-uppercase q-my-none text-weight-regular text-brown-6'>{{ $t('signup_text') }}</h3>
                </div>
              </div>
            </q-card-section>
            <q-card-section>
              <q-form class='q-gutter-md' @submit.prevent='signUp'>
                <q-input :label="$t('name_signup')" v-model='data.name'></q-input>
                <q-input :label="$t('username_signup')" v-model='data.username'></q-input>
                <q-input :label="$t('password_signup')" v-model='data.password' type='password'></q-input>
                <q-input :label="$t('repeat_password_signup')" v-model='data.repeatPassword' type='password'></q-input>
                <div>
                  <q-btn class='full-width text-brown-2' color='brown-6' :label="$t('signup_btn')" rounded type='submit'></q-btn>
                  <div class='text-center q-mt-sm q-gutter-lg'>
                    <router-link class='text-brown-6' to='/login'>{{ $t('already_have_an_account') }}</router-link>
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
import { ref, reactive, defineComponent } from 'vue'
import { useQuasar } from 'quasar'
import { useRouter } from 'vue-router'
import axios from 'src/plugins/axios.config'

export default defineComponent({
  setup () {
    const data = reactive({
      name: ref(''),
      username: ref(''),
      password: ref(''),
      repeatPassword: ref('')
    })

    const $q = useQuasar()
    const router = useRouter()

    const signUp =
      async function signUp () {
        if (data.name === '') {
          $q.notify({
            type: 'negative',
            message: 'Please write your full name'
          })
        }
        if (data.username === '') {
          $q.notify({
            type: 'negative',
            message: 'Incorrect data (nickname)'
          })
        }
        if (data.password.length < 8) {
          $q.notify({
            type: 'negative',
            message: 'Not enough symbols. Must be at least 8'
          })
        }
        if (data.repeatPassword.length < 8 || data.repeatPassword !== data.password) {
          $q.notify({
            type: 'negative',
            message: 'Passwords are different'
          })
        } else {
          await axios.post('api/signup', {
            name: data.name,
            username: data.username,
            password: data.password
          })
          $q.notify({
            type: 'positive',
            message: ' User created successfully '
          })
          await router.push('/login')
        }
      }

    return {
      data,
      signUp
    }
  }
})
</script>

<style lang="scss">
.signup_card {
  width: 30%;
  min-width: 30vh;
  background-color: #ebc09f
}

.page-bg {
  background-color: #F4DFC5;
}

.bg-image {
  background-image: url("src/assets/oreo-wallpaper.jpg");
  background-repeat: no-repeat;
  background-size: cover;
}

@media (max-width: 450px) {
  .signup_card {
    width: 97%;
  }
}

@media (min-width: 500px) and (max-width: 1200px) {
  .signup_card {
    width: 70%;
    height: fit-content;
  }
}
</style>
