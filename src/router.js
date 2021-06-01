import Vue from 'vue';
import Router from 'vue-router';
import Home from './pages/home.vue';
import Index from './pages/index.vue';
// import Product from './pages/product.vue';
// import Detail from './pages/detail.vue';
// import Cart from './pages/cart.vue';
// import Order from './pages/order.vue';
// import OrderList from './pages/orderList.vue';
// import orderConfirm from './pages/orderConfirm.vue';
// import OrderPay from './pages/orderPay.vue';
// import Alipay from './pages/alipay.vue';
// import Login from './pages/login.vue';
// 按需加载
const Login = () => import('./pages/login.vue');
const Cart = () => import('./pages/cart.vue');
const Order = () => import('./pages/order.vue');
const OrderList = () => import('./pages/orderList.vue');
const orderConfirm = () => import('./pages/orderConfirm.vue');
const OrderPay = () => import('./pages/orderPay.vue');
const Alipay = () => import('./pages/alipay.vue');


Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      redirect: '/index',
      children: [
        {
          path: 'index',
          name: 'index',
          component: Index
        },
        {
          path: 'product/:id',
          name: 'product',
          component: resolve => require(['./pages/product.vue'], resolve) // 按需加载
        },
        {
          path: 'detail/:id',
          name: 'detail',
          component: resolve => require(['./pages/detail.vue'], resolve)
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: Login  // 按需加载
    },
    {
      path: '/cart',
      name: 'cart',
      component: Cart
    },
    {
      path: '/order',
      name: 'order',
      component: Order,
      children: [
        {
          path: 'list',
          name: 'order-list',
          component: OrderList
        },
        {
          path: 'confirm',
          name: 'order-confirm',
          component: orderConfirm
        },
        {
          path: 'pay',
          name: 'order-pay',
          component: OrderPay
        },
        {
          path: 'alipay',
          name: 'alipay',
          component: Alipay
        },
      ]
    },
    {
      path: '/*',
      redirect: '/index'
    }
  ]
})