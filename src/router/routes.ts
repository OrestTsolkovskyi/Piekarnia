import { RouteRecordRaw } from 'vue-router'
import Product from 'components/productComponents/Product.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue')
  },

  {
    path: '/products',
    component: () => import('pages/Products.vue')
  },

  {
    path: '/product/:uuid',
    component: Product,
    name: 'product-details',
    props: true
  },

  {
    path: '/login',
    component: () => import('pages/Login.vue')
  },

  {
    path: '/signup',
    component: () => import('pages/Signup.vue')
  },

  {
    path: '/adminPage',
    component: () => import('pages/AdminPage.vue')
  },

  {
    path: '/managerPage',
    component: () => import('pages/ManagerPage.vue')
  },

  {
    path: '/allOrders',
    component: () => import('pages/AllOrdersPage.vue')
  },

  {
    path: '/report_page',
    component: () => import('pages/ReportPage.vue')
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
