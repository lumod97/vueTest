import Vue from "vue";
import VueRouter from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import ModalClient from './components/ModalClient.vue'
import TestComponent from './components/TestComponents.vue'
import TheWelcome from './components/TheWelcome.vue'


Vue.use(VueRouter)

const routes = [
    {
        path: "/",
        name: "home",
        component: HelloWorld
    },
    {
        path: "ModalClient",
        name: "modal_client",
        component: ModalClient
    },
    {
        path: "TheWelcome",
        name: "the_welcome",
        component: TheWelcome,
        children:[
            {
            path: "/testComponent",
            name: "test_component",
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