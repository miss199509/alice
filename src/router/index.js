import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import liveBroadcast from '@/components/liveBroadcast'
import liveList from '@/components/liveList'
import Personal from '@/components/Personal'
import Shoppingl from '@/components/Shoppingl'
import product from '@/components/product'
import information from '@/components/information'

import news from '@/components/news'

import newSettlement from '@/components/newSettlement'
import order from '@/components/order'

import Settlement from '@/components/Settlement'

import Recharge from '@/components/Recharge'
import follow from '@/components/follow'

import Delivery from '@/components/Delivery'
import newAddress from '@/components/newAddress'
import modifyRess from '@/components/modifyRess'
import History from '@/components/History'
import setUp from '@/components/setUp'
import Record from '@/components/Record'
import Help from '@/components/Help'

import talk from '@/components/talk'
import video from '@/components/video'



Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/liveBroadcast',
      name: 'liveBroadcast',
      component: liveBroadcast
    },
    {
      path: '/liveList',
      name: 'liveList',
      component: liveList
    },
    {
      path: '/Personal',
      name: 'Personal',
      component: Personal
    },
    {
      path: '/Shoppingl',
      name: 'Shoppingl',
      component: Shoppingl
    },
    {
      path: '/Shoppingl/product',
      name: 'product',
      component: product
    },
    {
      path: '/information',
      name: 'information',
      component: information
    },
    {
	  path: '/news',
	  name: 'news',
	  component: news

    },
    {
      path: '/newSettlement',
      name: 'newSettlement',
      component: newSettlement
    },
    {
      path: '/order',
      name: 'order',
      component: order
    },
    {
      path: '/Settlement',
      name: 'Settlement',
      component: Settlement
    },
    {
      path: '/Personal/Recharge',
      name: 'Recharge',
      component: Recharge
    },
    {
      path: '/Personal/Recharge/Record',
      name: 'Record',
      component: Record
    },
    {
      path: '/Personal/follow',
      name: 'follow',
      component: follow
    },
    {
      path: '/Personal/Delivery',
      name: 'Delivery',
      component: Delivery
    },
    {
      path: '/Personal/Delivery/newAddress',
      name: 'newAddress',
      component: newAddress
    },
    {
      path: '/Personal/Delivery/modifyRess',
      name: 'modifyRess',
      component: modifyRess
    },
    {
      path: '/Personal/History',
      name: 'History',
      component: History
    },
    {
      path: '/Personal/setUp',
      name: 'setUp',
      component: setUp
    },
    {
      path: '/Personal/setUp/Help',
      name: 'Help',
      component: Help
    },
    {
      path: '/talk',
      name: 'talk',
      component: talk
    },{
	  path: '/video',
      name: 'video',
      component: video
	}
  ]
})//Record