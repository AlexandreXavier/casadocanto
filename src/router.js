import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import('./views/Home.vue')
        },
        {
            path: '/profile',
            name: 'Profile',
            component: () => import('./views/Profile.vue')
        },
        {
            path: '/fotos',
            name: 'fotos',
            component: () => import('./views/Fotos.vue')
        },
        {
            path: '/fotodetails/:id',
            name: 'fotodetails',
            props: true,
            component: () => import('./views/FotoDetails.vue')
        },
        {
            path: '/details/:id',
            name: 'details',
            props: true,
            component: () => import('./components/Details.vue')
        },
        {
            path: '/calendar',
            name: 'calendar',
            component: () => import('./components/Calendar.vue')
        },
        {
            path: '/regatas',
            name: 'regatas',
            component: () => import('./views/Regatas.vue')
        },
        {
            path: '/post',
            name: 'post',
            props: true,
            component: () => import('./components/Post.vue')
        },
        {
            path: '/camera',
            name: 'camera',
            component: () => import('./components/Camera.vue')
        },
        {
            path: '/ajuda',
            name: 'ajuda',
            component: () => import('./views/Ajuda.vue')
        },
        {
            path: "/signup",
            name: "signup",
            component: () => import('./views/Signup.vue')
        },
        {
            path: "/signin",
            name: "signin",
            component: () => import('./views/Signin.vue')
        },
    ]
})
