import Vue from 'vue'
import Router from 'vue-router'
import VueResource from 'vue-resource'
// import Words from '../components/Words'
import HelloWorld from '@/components/HelloWorld'
import Test from '../components/Test'
import Main from "@/views/Main"

Vue.use(Router)
Vue.use(VueResource)

export default new Router({
  routes: [
    {
      path:'/',
      redirect:'index'
    },
    {
      path: '/index',
      component: Main,
      // children: []
    },
    {
      path: '/helloworld',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path:'/test',
      component:Test
    }
  ]
})
