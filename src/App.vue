<template>
  <div id="app">
    <!--<img src="./assets/logo.png">-->
  <transition :name="transitionName">
    <router-view class="Router"></router-view>
  </transition>
  </div>
</template>

<script>
export default {
　　data() {
　　　　return {
　　　　　　transitionName: 'slide-right'  // 默认动态路由变化为slide-right
　　　　}
　　},
    created(){
      // alert(document.documentElement.clientWidth)
      // alert(document.documentElement.clientHeight)
    },
    watch: {
　　　'$route' (to, from) {
　　　　let isBack = this.$router.isBack  //  监听路由变化时的状态为前进还是后退
　　　　　　if(isBack) {
　　　　　　　　this.transitionName = 'slide-right'
　　　　　　} else {
　　　　　　    this.transitionName = 'slide-left'
　　　　　}
　　this.$router.isBack = false
　　}
　　}
　}
</script>

<style>
blockquote, body, button, dd, dl, dt, fieldset, form, h1, h2, h3, h4, h5, h6, hr, input, legend, li, ol, p, pre, td, textarea, th, ul {
    margin: 0;
    padding: 0;
    word-wrap: break-word;
}
html,body{
   height:100%;
}

body{
  font-family: Helvetica Neue,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,Noto Sans CJK SC,WenQuanYi Micro Hei,Arial,sans-serif;
  font-family: "Microsoft YaHei";
}
input{
  outline: none;
}
input::-webkit-input-placeholder, textarea::-webkit-input-placeholder { /* WebKit*/  
    color:    #999;  
}  
input:-moz-placeholder, textarea:-moz-placeholder { /* Mozilla Firefox 4 to 18 */  
    color:    #999;  
}  
input::-moz-placeholder, textarea::-moz-placeholder { /* Mozilla Firefox 19+ */  
    color:    #999;  
}  
input:-ms-input-placeholder, textarea:-ms-input-placeholder { /* IE 10+ */  
    color:    #999;  
}  
a{
  -webkit-tap-highlight-color: transparent;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  text-decoration: none;
  color: #000;
}
ul,li{
  list-style: none;
}
.cursor{
  cursor: pointer;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  max-width: 700px;
  height: 100%;
  margin: auto;
}
.color_aimai{
  color: #E0B553;
}
/*数据加载中*/
.loading{
  position: fixed;
  top: 50%;
  left: 50%;
  -webkit-transform: translateX(-50%) translateY(-50%);
  z-index: 11;
}
.floatLeft{
  float: left;
}
.floatRight{
  float: right;
}
.overflowRemove{
  overflow: hidden;
}
.text_align{
  text-align: center;
}

/*当前商品信息*/
#boxPopup{
  position:absolute; 
  left:0; 
  top:0; 
  width:100%;  
  height:100%;
  background-color:#000;
  z-index: 1;
  opacity: .6;
}
.boxPopup{
  position:absolute; 
  left:0; 
  top:0; 
  width:100%;  
  height:100%;
  background-color:#000;
  z-index: 1;
  opacity: .6;
}
.explainPopup{
  position: fixed;
  top: 50%;
  left: 50%;
  background-color: #fff;
  -webkit-transform: translateX(-50%) translateY(-50%);
  width: 90%;
  height: 90%;
  border-radius: 7px;
  z-index: 11;
  max-width:570px;
}

#removePopup{
  position: absolute;
  width: 20px;
  right: 11px;
  top: 13px;
}


.headerNav{
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 13px;
  height: 37px;
}



.liveList{
  background-image: url('assets/liveBroadcast/bg@2x.png');
  background-position: center center;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  max-width: 700px;
  min-height: 100%;
  width: 100%;
}

/*.shoppingl_global{
  margin-top: 40px;
}*/


/*.liveList header{
  position: fixed;
  top: 0px;
  width: 100%;
  height: 37px;
  border-bottom: 2px solid #DEB64D;
  z-index: 1;
}*/
.liveList header{
  border-bottom: 2px solid #DEB64D;
}

.headerClass{
  margin-left: 10px;
}



/**/
/*.Router {
width: 100%;
transition: all .8s ease;
}*/

.slide-left-enter,
.slide-right-leave-active {
/*opacity: 0;
-webkit-transform: translate(100%, 0);
transform: translate(100%, 0);*/
}

.slide-left-leave-active,
.slide-right-enter {
/*opacity: 0;
-webkit-transform: translate(-100%, 0);
transform: translate(-100% 0);*/
}
</style>
