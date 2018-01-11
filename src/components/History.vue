<template>
	<div id="liveList_id">

	  <div class="liveList">

	    <header>
		    <ul class="headerNav">
				<li class="floatLeft">
					<router-link :to="{ name: 'Personal'}">
						<img width="12px;" src="../assets/liveBroadcast/btn_back@2x.png"/>
					</router-link>
					<router-link :to="{ name: 'liveList'}">
						<img class="headerClass" width="23px;" src="../assets/liveBroadcast/btnhomei6.png"/>
					</router-link>
				</li>
				<li style="display: inline-block;">
					<strong class="color_aimai" v-if="$store.state.language">History</strong>
					<strong class="color_aimai" v-else>历史</strong>
				</li>
				<li class="floatRight">
					<router-link :to="{ name: 'Settlement'}">
						<img width="27px;" src="../assets/liveBroadcast/btn_cart@2x.png"/>
					</router-link>
				</li>
		    </ul>
	    </header>


		
		<div class="shoppingl_global">
			<ul class="history">
				<li>
					<strong>0</strong>
					<p v-if="$store.state.language">3X WLNS:</p>
					<p v-else>3连胜:</p>
				</li>
				<li>
					<strong>0</strong>
					<p v-if="$store.state.language">Purchase</p>
					<p v-else>购买</p>
				</li>
				<li>
					<strong>0</strong>
					<p v-if="$store.state.language">Winning<br/>Streak</p>
					<p v-else>连胜</p>
				</li>
				<li>
					<img width="17px;" src="../assets/liveBroadcast/dc_icons@2x.png"/>
					<strong>0.00</strong>
					<p v-if="$store.state.language">Highest<br/>Winning</p>
					<p v-else>最高连胜</p>
				</li>
			</ul>
		</div>


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
    }
  },
  created(){
  	
  	var _this = this
  	axios.post(_this.$store.state.url_talk+'/customer/get-orders',qs.stringify({
  		cid:_this.$route.query.cid,
  		sessionId:localStorage.getItem('session_id')
  	}))
	.then(function(dataJson){
		console.log(JSON.stringify(dataJson.data))
		if((typeof dataJson.data.info=='string')&&dataJson.data.info.constructor==String){
			return
		}
		_this.followList = dataJson.data.info
	})
	.catch(function(err){
		alert(err);
	});

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.history{
	display: flex;
	justify-content: space-around;
    align-items: center;
	background-color: #fff;
	padding: 13px 0px;
}
.history li{
	text-align: center;
}
.history p{
	color: #ccc;
	font-size: 11px;
}
</style>
