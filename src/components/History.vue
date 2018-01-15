<template>
	<div id="liveList_id">

	  <div class="liveList">

	    <header>
		    <ul class="headerNav">
				<li class="floatLeft">
					<router-link :to="{ name: 'Personal'}">
						<img width="23px;" src="../assets/liveBroadcast/btn_back@2x.png"/>
					</router-link>
					<router-link :to="{ name: 'liveList'}">
						<img class="headerClass" width="23px;" src="../assets/liveBroadcast/icon_arrow@2x.png"/>
					</router-link>
				</li>
				<li style="display: inline-block;">
					<strong class="color_aimai">{{parseInt($store.state.language)?'History':'历史'}}</strong>
				</li>
				<li class="floatRight">
					<router-link :to="{ name: 'Settlement'}">
						<img width="27px;" src="../assets/liveBroadcast/btn_cart@2x.png"/>
					</router-link>
				</li>
		    </ul>
	    </header>


		
		<div class="shoppingl_global">
			<img height="200px;" width="100%" :src="$store.state.portrait"/>
			
			<div class="history_box">
				<ul class="history">
					<li>
						<strong>0</strong>
						<p>{{parseInt($store.state.language)?'3X WLNS':'3连胜'}}:</p>
					</li>
					<li>
						<strong>0</strong>
						<p>{{parseInt($store.state.language)?'Purchase':'购买'}}</p>
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
				<ul class="product_list" :style="{ height: product_height + 'px' }">
					<li v-for="(val,key) in historyList" class="history_list">
						<p class="floatLeft">
							<strong>{{val.en_name}}</strong>
							<img width="70px;" :src="val.image"/>
						</p>
						<p class="floatRight">
							<span>Color：{{val.color}}</span>
							<span>Date{{val.date}}</span>
							<span>Status{{val.status}}</span>
							<span>Size：{{val.size}}</span>
							<span>Qty：{{val.item_qty}}</span>
						</p>
					</li>
				</ul>
			</div>

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
      historyList:[],
      product_height:0
    }
  },
  created(){
  	
  	this.product_height = document.documentElement.clientHeight-360;

  	var _this = this;
  	_this.$store.state.portrait = 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1161209730,2018761545&fm=27&gp=0.jpg';

  	axios.post(_this.$store.state.url_talk+'/customer/get-orders',qs.stringify({
  		cid:_this.$route.query.cid,
  		sessionId:localStorage.getItem('session_id')
  	}))
	.then(function(dataJson){
		console.log(JSON.stringify(dataJson.data))
		// if((typeof dataJson.data.info=='string')&&dataJson.data.info.constructor==String){
		// 	return
		// }
		_this.historyList = dataJson.data.info
	})
	.catch(function(err){
		alert(err);
	});

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.history_box{
	background-color: #fff;
	padding: 0px 5px;
	margin: 0px 5px;
	padding-bottom: 9px
}
.history{
	display: flex;
	justify-content: space-around;
    align-items: center;
    padding: 11px 0px;
    border-bottom: 1px solid #DBDBDD;
    margin-bottom: 9px;
}
.history li{
	text-align: center;
}
.history p{
	color: #ccc;
	font-size: 11px;
}
.history strong{
	font-size: 20px;
	color: #E0B553;
}






.product_list{
	border:1px solid #DBDBDD;
	border-radius: 3px;
	padding: 7px;
	overflow: auto;
}
.history_list{
	text-align: center;
	overflow: hidden;
}
.history_list span,.history_list strong{
	display: block;
}
.history_list span{
	color: #818182;
	font-size: 13px;
	margin: 5px 0px;
	margin-left: 11px;
}
.history_list strong{
	font-size: 14px;
	width: 100%;
}
.history_list img{
	margin-top: 9px;
}
.product_list li{
	border-bottom: 1px solid #DBDBDD;
	padding-bottom: 5px;
}
.product_list p{
	width: 50%;
}
.product_list p.floatRight{
	text-align: -webkit-left;
}
</style>
