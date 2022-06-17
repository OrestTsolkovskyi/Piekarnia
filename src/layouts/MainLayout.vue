<template>
  <q-layout view="lHh Lpr lFf" class="window-width">
    <q-page-container>
      <q-page class="page-bg bg-image">
        <q-header elevated class="text-brown-6">
          <q-toolbar class="text-brown-6" style="background: #e7b181">

            <q-toolbar-title>
              Piekarnia
            </q-toolbar-title>

            <q-select
              color="brown-6"
              v-model="locale"
              :options="localeOptions"
              dense
              borderless
              emit-value
              map-options
              options-dense
              style="min-width: 50px"
              behavior="menu"
            >

            <template v-slot:append>
              <q-icon color="brown-6" name='language'/>
            </template>
            </q-select>

            <q-btn
              class='login'
              @click='Login'
              rounded
              push
            >{{ $t('LogIn') }}
            </q-btn>
          </q-toolbar>

          <q-separator color="brown-6" style="height: 0.1rem"/>

          <q-tabs
            v-model="tab"
            dense
            align="center"
            class="text-brown-6 q-py-sm"
          >
            <q-tab :ripple="{ color: 'orange' }" name="Home" icon="home" :label="$t('home')"/>
            <q-tab :ripple="{ color: 'orange' }" name="Gallery" icon="photo" :label="$t('gallery')"/>
            <q-tab :ripple="{ color: 'orange' }" name="Movies" icon="movie" :label="$t('movies')"/>
          </q-tabs>
          <q-separator color="brown-6" style="height: 0.1rem"/>
        </q-header>
        <q-tab-panels v-model="tab" animated class="page-bg tab-bg-image">
          <q-tab-panel name="Home">
            <div class="q-pa-md carousel_div">
              <q-carousel
                animated
                v-model="slide"
                :autoplay="autoplay"
                transition-prev="slide-right"
                transition-next="slide-left"
                arrows
                navigation
                infinite
                swipeable
                control-color="brown-6"
                class="rounded-borders carousel"
                style="min-height: 30vh"
              >
                <q-carousel-slide :name="1" class="column no-wrap bg-primary">
                <div class="row fit justify-start items-center q-gutter-xs q-col-gutter no-wrap">
                  <q-img class="rounded-borders col-6 full-height" src="~assets/apple-pie.jpg" />
                  <q-img class="rounded-borders col-6 full-height" src="~assets/raspberry-cake.jpg" />
                </div>
                </q-carousel-slide>
                <q-carousel-slide :name="2" class="column no-wrap bg-primary">
                <div class="row fit justify-start items-center q-gutter-xs q-col-gutter no-wrap">
                  <q-img class="rounded-borders col-6 full-height" src="~assets/raspberry-cake.jpg" />
                  <q-img class="rounded-borders col-6 full-height" src="~assets/apple-pie.jpg" />
                </div>
                </q-carousel-slide>
                <q-carousel-slide :name="3" class="column no-wrap bg-primary">
                <div class="row fit justify-start items-center q-gutter-xs q-col-gutter no-wrap">
                  <q-img class="rounded-borders col-6 full-height" src="~assets/oreo-cake.jpg" />
                  <q-img class="rounded-borders col-6 full-height" src="~assets/tiramisu-cake.jpg" />
                </div>
                </q-carousel-slide>
                <q-carousel-slide :name="4" class="column no-wrap bg-primary">
                <div class="row fit justify-start items-center q-gutter-xs q-col-gutter no-wrap">
                  <q-img class="rounded-borders col-6 full-height" src="~assets/tiramisu-cake.jpg" />
                  <q-img class="rounded-borders col-6 full-height" src="~assets/oreo-cake.jpg" />
                </div>
                </q-carousel-slide>
              </q-carousel>
            </div>
            <div class="text-white">
              <h2 class="q-pa-md q-mt-md"> {{ $t('about') }}
                <h6>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque fuga, quam. Architecto corporis cum debitis, enim eveniet fuga inventore ipsum molestiae omnis pariatur porro quam quas reiciendis rem sequi vitae.</h6>
                <h6>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque fuga, quam. Architecto corporis cum debitis, enim eveniet fuga inventore ipsum molestiae omnis pariatur porro quam quas reiciendis rem sequi vitae.</h6>
                <h6>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque fuga, quam. Architecto corporis cum debitis, enim eveniet fuga inventore ipsum molestiae omnis pariatur porro quam quas reiciendis rem sequi vitae.</h6>
                <h6>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque fuga, quam. Architecto corporis cum debitis, enim eveniet fuga inventore ipsum molestiae omnis pariatur porro quam quas reiciendis rem sequi vitae.</h6>
                <h6>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque fuga, quam. Architecto corporis cum debitis, enim eveniet fuga inventore ipsum molestiae omnis pariatur porro quam quas reiciendis rem sequi vitae.</h6>
                <h6>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque fuga, quam. Architecto corporis cum debitis, enim eveniet fuga inventore ipsum molestiae omnis pariatur porro quam quas reiciendis rem sequi vitae.</h6>
                <h6>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque fuga, quam. Architecto corporis cum debitis, enim eveniet fuga inventore ipsum molestiae omnis pariatur porro quam quas reiciendis rem sequi vitae.</h6>
                <h6>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque fuga, quam. Architecto corporis cum debitis, enim eveniet fuga inventore ipsum molestiae omnis pariatur porro quam quas reiciendis rem sequi vitae.</h6>
              </h2>
            </div>
          </q-tab-panel>

          <q-tab-panel name="Gallery">
            <div class="photos_container">
            <div class="photos">
              <img src="~assets/apple-pie.jpg">
              <img src="~assets/blueberry-cake.jpg">
              <img src="~assets/brownie.jpg">
              <img src="~assets/carrot-cake.jpg">
              <img src="~assets/cherry-cake.jpg">
              <img src="~assets/chocolate-cake.jpg">
            </div>
              <div class="photos">
              <img src="~assets/chocolate-cookie.jpg">
              <img src="~assets/chocolate-donut.jpg">
              <img src="~assets/chocolate-muffin.jpg">
              <img src="~assets/lemon-cake.jpg">
              <img src="~assets/macarons.jpg">
              <img src="~assets/nut-donut.jpg">
              </div>
              <div class="photos">
              <img src="~assets/oreo-cake.jpg">
              <img src="~assets/raspberry-cake.jpg">
              <img src="~assets/strawberry-cake.jpg">
              <img src="~assets/tiramisu-cake.jpg">
              <img src="~assets/vanilla-muffin.jpg">
            </div>
            </div>
          </q-tab-panel>

          <q-tab-panel name="Movies">
            <div class="q-pa-md">
              <q-parallax :height="500">
                <template v-slot:media>
                  <video style="min-width: 90vh; min-height: 90vh" width="720" height="440" poster="https://cdn.quasar.dev/img/polina.jpg" autoplay loop muted>
                    <source type="video/webm" src="https://cdn.quasar.dev/img/polina.webm">
                    <source type="video/mp4" src="assets/videos/Baking_Cookies_Alt.mp4">
                  </video>
                </template>
              </q-parallax>
            </div>
          </q-tab-panel>
        </q-tab-panels>
        <q-footer>
          <Footer/>
        </q-footer>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import Footer from 'components/Footer.vue'
import axios from 'src/plugins/axios.config'

export default defineComponent({
  name: 'MainLayout',

  components: { Footer },
  setup () {
    const { locale } = useI18n({ useScope: 'global' })
    watch(locale, (lang) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      axios.defaults.headers['Content-Language'] = lang
      localStorage.setItem('lang', lang)
    })
    const router = useRouter()

    const Login = () => {
      void router.push('/login')
    }

    return {
      Login,
      tab: ref('Home'),
      slide: ref(1),
      autoplay: ref(true),
      locale,
      localeOptions: [
        {
          value: 'en-US',
          label: 'English'
        },
        {
          value: 'pl',
          label: 'Polish'
        }
      ]
    }
  }
})

</script>

<style lang="scss">
.page-bg {
  background-color: #F4DFC5;
}

.bg-image {
  background-image: url("src/assets/walpaper-for-products.jpg");
  background-repeat: no-repeat;
  background-size: cover;
}

.tab-bg-image {
  background-image: url("src/assets/ricetta-cookies-cookie.jpg");
  background-repeat: repeat;
  background-size: contain;
}

.photos_container {
  display: flex;
  flex-wrap: wrap;
  padding: 0 4px;
}

.photos {
  flex: 33%;
  max-width: 33%;
  padding: 0 4px;
}

.photos img {
  margin-top: 8px;
  vertical-align: middle;
  width: 100%;
  border-radius: 5%;
}

.carousel{
  max-height: 40%;
}

@media (max-width: 450px) {
  .carousel_div{
    height: 20% ;
  }

  .carousel{
    height: 20vh;
  }
}
</style>
