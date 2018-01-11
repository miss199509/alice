<template>
	<div>

	  <div class="liveList">

	    <header>
		    <ul class="headerNav">
				<li class="floatLeft">
					<router-link :to="{ name: 'liveList'}">
						<img width="23px;" src="../assets/liveBroadcast/btn_back@2x.png"/>
					</router-link>
				</li>
				<li style="display: inline-block;">
					<strong class="color_aimai" v-if="$store.state.language">News</strong>
					<strong class="color_aimai" v-else>新闻</strong>
				</li>
				<li class="floatRight">
					<router-link :to="{ name: 'Settlement'}">
						<img width="27px;" src="../assets/liveBroadcast/btn_cart@2x.png"/>
					</router-link>
				</li>
		    </ul>
	    </header>
		
		<ul class="shoppingl_global information">
			<li v-for="(val,key) in news_nav" @click="news_eve(val,key)">
				<img width="100%" :src='val.imgFir'/>
			</li>
		</ul>
		


	  </div>
	
	</div>
</template>

<script>

import axios from 'axios'
import qs from 'qs'

export default {
  name: 'liveList',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      news_nav:[]
    }
  },
  mounted(){
  	let _this = this;
  	axios.post(_this.$store.state.url_talk+'/news/news','')
	.then(function(dataJson){
		_this.news_nav = dataJson.data;
	})
	.catch(function(err){
		alert(err);
	});
  
  },
  methods: {
  	news_eve(val,key){
  		console.log(JSON.stringify(val))
  		let title_news = localStorage.getItem('title_news');
  		localStorage.setItem('title_news',val.title);
  		let imgSec_news = localStorage.getItem('imgSec_news');
  		localStorage.setItem('imgSec_news',val.imgSec);
  		this.$router.push({ name: 'news'})
  	}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.liveList header{
	position: fixed;
	top: 0px;
	width: 100%;
	height: 37px;
}

.information{
	width: 97%;
	margin:auto;
	margin-top: 40px;

}
.information img{
	border-radius: 7px;
	width: 270px;
    height: 200px;
}


.information li{
	margin-top: 5px;
	text-align: center;
}

</style>
