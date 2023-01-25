import Vue from "vue";
import VueRouter from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import ModalClient from './components/ModalClient.vue'
const TestComponent = () => import('./components/TestComponents.vue')
import TheWelcome from './components/TheWelcome.vue'


Vue.use(VueRouter)

const routes = [
    {
        path: "/",
        name: "home",
        component: HelloWorld
    },
    {
        path: "/ModalClient",
        name: "modal_client",
        component: ModalClient
    },
    {
        path: "/TheWelcome",
        name: "the_welcome",
        component: TheWelcome,
        redirect: {
            name: "test-component-general",
        },
        children: [
            {
                path: "/testComponent/general",
                name: "test-component-general",
                component: TestComponent
            },
            {
                path: "/testComponent/no-pays",
                name: "test-component-sin-datos",
                component: TestComponent
            },
            {
                path: "/testComponent/with-pays",
                name: "test-component-con-datos",
                component: TestComponent
            },
        ]
    }
];

const router = new VueRouter({
    mode: "history",
    routes
});

export default router;