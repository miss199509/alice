<template>
	<div id="liveList_id">

	  <div class="liveList">

	    <header>
		    <ul class="headerNav">
				<li class="floatLeft">
					<router-link :to="{ name: 'Recharge'}">
						<img width="23px;" src="../assets/liveBroadcast/icon_arrow@2x.png"/>
					</router-link>
				</li>
				<li style="display: inline-block;">
					<strong class="color_aimai">{{parseInt($store.state.language)?'Peload History':'充值记录'}}</strong>
				</li>
				<li class="floatRight">
					<router-link :to="{ name: 'Settlement'}">
						<img width="27px;" src="../assets/liveBroadcast/btn_cart@2x.png"/>
					</router-link>
				</li>
		    </ul>
	    </header>


		
		<div class="shoppingl_global">
			<ul>
				<li class="record" v-for="(val,key) in recordList">
					<p class="record_title">
						<img width="70px;" src="../assets/liveBroadcast/dc_icons@2x.png"/>
						<strong>+￥{{val.post_balance}}</strong>
					</p>
					<div class="record_list">
						
						<!-- <p class="color_aimai">
							+
							<img width="13px;" src="../assets/liveBroadcast/dc_icons@2x.png"/>
							{{val.deposit_amount}}
						</p> -->

						<p>
							<span class="floatLeft">Paypal</span>
							<span class="floatRight">{{val.payment_type}}</span>
						</p>

						<p>
							<span class="floatLeft">Order：</span>
							<span class="floatRight">{{val.id}}</span>
						</p>
						<p>
							<span class="floatLeft">Date：</span>
							<span class="floatRight">{{val.create_time}}</span>
						</p>
						<p>
							<span class="floatLeft">Status：</span>
							<span class="floatRight" v-if="val.status" style="color: #1AF829">成功</span>
							<span class="floatRight" v-else>失败</span>
						</p>
					</div>
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
      recordList:[]
    }
  },
  mounted(){
  	var _this = this
  	axios.post(_this.$store.state.url_talk+'/customer/deposit-history',qs.stringify({cid:_this.$store.state.cid_talk}))
	.then(function(dataJson){
		console.log(JSON.stringify(dataJson.data.info))
		_this.recordList = dataJson.data.info;
	})
	.catch(function(err){
		alert(err);
	});

  },
  methods: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.shoppingl_global{
	padding: 0px 7px;
}

.record{
	/*display: flex;
	justify-content: flex-start;
    align-items: center;
    background-color: #fff;
    border-radius: 7px;
    padding: 7px;*/
    background-color: #fff;
    border-radius: 5px;
    margin: 7px 0px;
    padding: 7px 11px;
}
.record_title{
	display: flex;
	justify-content: center;
    align-items: center;
    margin: 13px 0px;
}
.record_title strong{
	font-size: 21px;
    padding: 8px 27px;
	background-image: url('../assets/loading/bg_reloadPrice@2x.png');
	background-position: center center;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    font-weight: 100;
    margin: 0px 24px;
    color: #555;
}

.record_list p{
	overflow: hidden;
	margin-bottom: 7px;
	color: #7f7f7f;
}
</style>
