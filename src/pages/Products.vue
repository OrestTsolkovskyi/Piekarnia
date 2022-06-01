<template>
  <q-layout view="lHh Lpr lFf" class="window-width">
    <q-page-container>
      <q-page class="page-bg bg-image">
        <q-header elevated class="text-brown-6">
          <ProductsHeader
          :product="product"
          />

          <q-separator color="brown-6" style="height: 0.1rem"/>

          <q-toolbar style="flex-flow: row wrap; justify-content: space-evenly"  class="q-py-none">
<!--          <div style='color: #ebc09f' class="q-py-sm">-->
            <q-card style="background: #ecbf98; height: 4rem; min-width: 40%" flat>
              <q-card-section horizontal>
                <q-card-section style="width: 300px">
              <q-select
                behavior='menu'
                class='q-mr-md'
                :label="$t('price_select')"
                dense
                flat
                v-model='select'
                :options='options'
                emit-value
                clear-icon='close'
              >
                <template v-slot:append>
                  <q-icon name='price_change'/>
                </template>
              </q-select>

              </q-card-section>
                <q-card-section style="width: 300px">
                <q-input
                  class='search'
                  dense
                  :label="$t('find_select')"
                  type='search'
                  v-model='search'
                >
                  <template v-slot:append>
                    <q-icon name='search'/>
                  </template>
                </q-input>
                </q-card-section>
              </q-card-section>
              </q-card>

          <q-tabs
            v-model="tab"
            dense
            align="center"
            class="text-brown-6 q-py-sm wrap"
            shrink
            stretch
          >
            <q-tab :ripple="{ color: 'brown-6' }" name="All" :label="$t('tab_ALL')"/>
            <q-tab :ripple="{ color: 'brown-6' }" name="Best sellers" :label="$t('tab_Bestsellers')"/>
            <q-tab :ripple="{ color: 'brown-6' }" name="Specials" :label="$t('tab_Specials')"/>
            <q-tab :ripple="{ color: 'brown-6' }" name="Recommended for You" :label="$t('tab_Recommended')"/>
          </q-tabs>
        </q-toolbar>
        </q-header>
        <q-tab-panels v-model="tab" animated class="page-bg">
          <q-tab-panel name="All" class="tab-bg-image">
        <template
          class="products_catalog q-pa-md row"
        >
          <Product
            v-for='product in filteredProducts'
            :key='product.uuid'
            :product="product"
          />
        </template>
          </q-tab-panel>

          <q-tab-panel name="Best sellers" class="tab-bg-image">
            <template
              class="products_catalog q-pa-md row"
            >
              <Bestsellers
                v-for='product in filteredBestsellers'
                :key='product.uuid'
                :product="product"
              />
            </template>
          </q-tab-panel>

          <q-tab-panel name="Specials" class="bg-image">
            <Specials/>
          </q-tab-panel>

          <q-tab-panel name="Recommended for You" class="bg-image">
            <Recommendations/>
          </q-tab-panel>
        </q-tab-panels>
        <q-footer>
        <Footer/>
        </q-footer>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script lang='ts'>
/* eslint-disable */
import { computed, onMounted, ref } from 'vue'
import { defineComponent } from 'vue'
import { useStore } from 'src/store'
import { useRouter } from 'vue-router'
import Footer from 'components/Footer.vue'
import Product from 'components/productComponents/Product.vue'
import ProductsHeader from 'components/productComponents/ProductsHeader.vue'
import Bestsellers from 'components/productComponents/Bestsellers.vue'
import Specials from 'components/productComponents/Specials.vue'
import Recommendations from 'components/productComponents/Recommendations.vue'

const optionsOf = [{
  label: 'All',
  value: 'All'
}, {
  label: '<10',
  value: '10'
}, {
  label: '<20',
  value: '20'
}, {
  label: '<30',
  value: '30'
}, {
  label: '<40',
  value: '40'
}, {
  label: '<50',
  value: '50'
}, {
  label: '<60',
  value: '60'
}, {
  label: '<70',
    value: '70'
}, {
  label: '<80',
  value: '80'
}, {
  label: '<90',
  value: '90'
}, {
  label: '<100',
  value: '100'
}
]

export default defineComponent({
  props: ['product', 'uuid'],
  name: 'products',
  components: {
    Recommendations,
    Specials,
    Bestsellers,
    ProductsHeader,
    Product,
    Footer },

  setup () {
    const select = ref()
    const options = ref(optionsOf)

    const router = useRouter()

    const search = ref('')

    const products = computed(() => store.state.products)

    const bestsellers = computed(() => store.state.bestsellers)

    const store = useStore()
    onMounted(() => {
      store.dispatch('GET_PRODUCTS', null, { root: true })
        .catch((err) => {
        if (err.response.status === 401) {
          router.push('/login')
        }
      })
    })

    onMounted(() => {
      store.dispatch('getBestsellers', null, { root: true })
        .catch((err) => {
          if (err.response.status === 401) {
            router.push('/login')
          }
        })
    })


    const filteredProducts = computed(() => {
        function filterByYears () {
          if (select.value === undefined) {
            return products.value
          }
          if (select.value === 'All') {
            return products.value
          } else {
            return products.value.filter((product: { price: number; }) => product.price < select.value)
          }
        }

        filterByYears()

        function filterBySearchInput () {
          return filterByYears().filter((product: { name: string; }) => product.name.toLowerCase().includes(search.value.toLowerCase()))
        }

        filterBySearchInput()
        return filterBySearchInput()
      }
    )

    const filteredBestsellers = computed(() => {
        function filterByYears () {
          if (select.value === undefined) {
            return bestsellers.value
          }
          if (select.value === 'All') {
            return bestsellers.value
          } else {
            return bestsellers.value.filter((product: { price: number; }) => product.price < select.value)
          }
        }

        filterByYears()

        function filterBySearchInput () {
          return filterByYears().filter((product: { name: string; }) => product.name.toLowerCase().includes(search.value.toLowerCase()))
        }

        filterBySearchInput()
        return filterBySearchInput()
      }
    )


    return {
      bestsellers,
      showProduct: ref(false),
      tab: ref('All'),
      cart: ref(false),
      select,
      search,
      filteredBestsellers,
      filteredProducts,
      options,
      store,
    }
  }
})
</script>

<style>
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

.products_catalog {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  margin: 0 auto;
  padding-left: 0;
}
</style>
