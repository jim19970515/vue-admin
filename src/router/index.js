import VueRouter from 'vue-router'
import Vue from 'vue'

Vue.use(VueRouter)

import Login from '../views/Login.vue'
import Dashboard from '../views/Dashboard.vue'
import Admin from '../views/Admin.vue'
import Products from '../views/Products.vue'
import Orders from '../views/Orders.vue'
import Coupon from '../views/Coupon.vue'

const routes = [
    {
        path: '*',
        redirect: '/',
    },
    {
        path: '/',
        name: 'Login',
        component: Login,
    },
    {
        path: '/admin',
        name: 'Admin',
        component: Admin,
        children: [
            {
                path: 'dashboard',
                name: 'Dashboard',
                component: Dashboard,
            },
            {
                path: 'products',
                name: 'Products',
                component: Products,
            },
            {
                path: 'order',
                name: 'Order',
                component:Orders,
            },
            {
                path: 'coupon',
                name: 'Coupon',
                component: Coupon,
            },
        ],
    },
]
const router = new VueRouter({
    routes,
})
export default router
