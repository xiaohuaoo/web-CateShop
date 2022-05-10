import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home'
import UserHome from '@/views/userHome/userHome'
import UserLogin from '@/views/UserLogin'
import UserRegister from '@/views/UserRegister'
import userSettings from '@/views/UserSettings'
import UserRecord from '@/views/UserRecord'
import ShowAboutGoodsInfo from '@/views/ShowAboutGoodsInfo'
import ShowProductInfo from '@/views/ShowProductInfo'
import ShowPictureGoods from '@/views/ShowPictureGoods'
import ShowCookInfo from '@/views/ShowCookInfo'
import Cart from '@/views/Cart'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: '',
    component: Home,
    children: [
      {
        path: '/',
        name: 'userHome',
        component: UserHome
      },
      {
        path: '/userLogin',
        name: 'userLogin',
        component: UserLogin
      },
      {
        path: '/userRegister',
        name: 'userRegister',
        component: UserRegister
      },
      {
        path: '/usersettings',
        name: 'usersettings',
        component: userSettings
      },
      {
        path: '/userecord',
        name: 'userecord',
        component: UserRecord
      },
      {
        path: '/showAboutGoodsInfo',
        name: 'ShowAboutGoodsInfo',
        component: ShowAboutGoodsInfo
      },
      {
        path: '/showProductInfo',
        name: 'ShowProductInfo',
        component: ShowProductInfo
      },
      {
        path: '/showPictureGoods',
        name: 'ShowPictureGoods',
        component: ShowPictureGoods
      },
      {
        path: '/showCookInfo',
        name: 'ShowCookInfo',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        // component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
        component: ShowCookInfo
      },
      {
        path: '/Cart',
        name: 'Cart',
        component: Cart
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
