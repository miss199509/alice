<template>
  <div id="app">
	{{ $store.state.count }}
  {{$store.state.val}}
    <button @click="increment">+5</button>
    <button @click="decrement">-3</button>

    
    <div clas="" style="height:300px;">
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(val,key) in portrait_nav">{{val}}</div>
        </div>
        <!-- Add Pagination -->
        <div class="swiper-pagination"></div>
      </div>
    </div>


    <div class="">
      <video width="100%" id="example_video_1" poster="http://vjs.zencdn.net/v/oceans.png" controls="controls" autoplay="autoplay" webkit-playsinline="true" preload="auto" x-webkit-airplay="true" playsinline>
        <source src="http://push.alice.live/app/alice.m3u8" type="application/vnd.apple.mpegurl"/>
        <p class="vjs-no-js">To view this video please enable JavaScript, and consider upgrading to a web browser that 
          <a href="http://videojs.com/html5-video-support/" target="_blank">supports HTML5 video</a>
        </p>
      </video>
    </div>





  </div>
</template>

<script>
  import { mapGetters,mapActions } from 'vuex'

  import Swiper from 'swiper';
  import 'swiper/dist/css/swiper.min.css';


  export default {
    computed: mapGetters([]),
    methods: mapActions([
      'increment',
      'decrement'
      ]),
    data () {
      return {
        msg: 'Welcome to Your Vue.js App',
        portrait_nav:['text']
      }
    },
  	mounted(){

      console.log(this.$store.state.count = 20)
      new Swiper('.swiper-container', {
          pagination: '.swiper-pagination',
          paginationClickable: true
      });


  	}
  }
</script>

<style type="text/css">
.swiper-container {
        width: 100%;
        height: 100%;
    }
    .swiper-slide {
        text-align: center;
        font-size: 18px;
        background: #fff;

        /* Center slide text vertically */
        display: -webkit-box;
        display: -ms-flexbox;
        display: -webkit-flex;
        display: flex;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        -webkit-justify-content: center;
        justify-content: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        -webkit-align-items: center;
        align-items: center;
    }
</style>