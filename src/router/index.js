import { createRouter, createWebHistory } from "vue-router"
import EventList from "@/views/EventList.vue"
import EventDetails from "@/views/event/Details.vue"
import EventRegister from "@/views/event/Register.vue"
import EventEdit from "@/views/event/Edit.vue"
import EventLayout from "@/views/event/Layout.vue"
import About from "@/views/About.vue"
import NotFound from "@/views/NotFound.vue"
import NetworkError from "@/views/NetworkError.vue"


const routes = [
    {
        path: "/",
        name: "EventList",
        component: EventList,
        props: route => ({ page: parseInt(route.query.page) || 1 })
    },
    {
        path: '/event/:id',
        props: true,
        name: 'EventLayout',
        component: EventLayout,
        children: [
            {
                path: '',        
                name: 'EventDetails',
                component: EventDetails
            },
            {
                path: 'register',        
                name: 'EventRegister',
                component: EventRegister
            },
            {
                path: 'edit',        
                name: 'EventEdit',
                component: EventEdit
            },
        ]
    },
    /* { // REDIRECT CASE. #1
        path: '/events/:id',
        redirect: () => {
            return { name: 'EventDetails' }
        }
    }, */
    { // REDIRECT CASE. #2
        path: '/events/:afterEvent(.*)',
        redirect: to => {
            return { path: '/event/' + to.params.afterEvent }
        }
    },
    {
        path: "/about",
        name: "About",
        component: About,
        // alias: "/about-us" // ALIAS CASE

        /* route level code-splitting
        this generates a separate chunk (about.[hash].js) for this route
        which is lazy-loaded when the route is visited.
        component: () => */
        //  import(/* webpackChunkName: "about" */ "../views/About.vue"),
    },
    {
        path: "/:catchAll(.*)",
        name: 'NotFound',
        component: NotFound
    },
    {
        path: "/404/:resource",
        name: "404Resource",
        props: true,
        component: NotFound
    },
    {
        path: "/network-error",
        name: "NetworkError",
        component: NetworkError
    }

];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
