<template>
	<div>

	  <div class="liveList">

	    <header>
		    <ul class="headerNav">
				<li class="floatLeft">
					<router-link :to="{ name: 'information',query:{cid:$route.query.cid,session_id:$route.query.session_id,candy:$route.query.candy}}">
						<img width="23px;" src="../assets/liveBroadcast/icon_arrow@2x.png"/>
					</router-link>
				</li>
				<li style="display: inline-block;">
					<strong class="color_aimai">{{title_news}}</strong>
				</li>
				<li class="floatRight">
					<router-link :to="{ name: 'Settlement',query:{cid:$route.query.cid,session_id:$route.query.session_id,candy:$route.query.candy}}">
						<img width="27px;" src="../assets/liveBroadcast/btn_cart@2x.png"/>
					</router-link>
				</li>
		    </ul>
	    </header>
		
		<ul class="shoppingl_global information">
			<li>
				<img width="100%" :src='imgSec_news'/>
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
      title_news:'',
      imgSec_news:''
    }
  },
  mounted(){
  	this.title_news = localStorage.getItem('title_news');
  	this.imgSec_news = localStorage.getItem('imgSec_news');
  },
  methods: {

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
	border-radius: 3px;
}


.information li{
	margin-top: 3px;
}

</style>
