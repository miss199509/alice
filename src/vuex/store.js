import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

//lert(window.location.href)
var lan = 0;
let url = window.location.href;
if(url.indexOf('candy')>0){
  if(url.indexOf('language')>0){
    let valUrl = url.substring(url.indexOf('language')+9)
    parseInt(valUrl)?lan = 0:lan = 1;
  }else{
    lan = 1;
  }
}else{
  lan = parseInt(localStorage.getItem('language'));
}

const state = {
  count: 0,
  cid_talk:localStorage.getItem('cid'),
  url_talk:'http://red.alice.live',
  id_talk:0,
  //获取到当前商品的id
  personal_url:0,
  balance_talk:0,
  //获取名称
  nickname:localStorage.getItem('nickname'),
  //获取头像链接
  portrait:localStorage.getItem('portrait'),
  //语言
  language:lan
}

const mutations = {
  increment(state) {
    state.count = state.count + 5
  },
  decrement(state) {
    state.count = state.count - 3
  }
}

const actions = {
  increment: ({ commit }) => commit('increment'),
  decrement: ({ commit }) => commit('decrement')
}

const getters = {

}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})