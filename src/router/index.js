import Vue from 'vue'
import Router from 'vue-router'
import VueResource from 'vue-resource'
// import Words from '../components/Words'
import HelloWorld from '@/content/HelloWorld'
import Test from '../content/Test'
import Main from "@/views/Main"

import JpDetail from '@/content/Jp/JpDetail'
import JpLite from '@/content/Jp/JpLite'
import JpSearch from '@/content/Jp/JpSearch'
import JpCard from '../content/Jp/JpCard.vue'

Vue.use(Router)
Vue.use(VueResource)

export default new Router({
  routes: [
    {
      path: '/',
      component: Main,
      redirect:'/home',
      children: [
        {path: '/home', component: HelloWorld},
        {path: '/JpSearch', component: JpSearch},
        {path: '/JpLite', component: JpLite},
        {path: '/JpDetail', component: JpDetail},
        {path: '/JpCard', component: JpCard},
        {path: '/test', component: Test}
      ]
    },
    {
      path: '/helloworld',
      name: 'HelloWorld',
      component: HelloWorld
    },
  ]
})
