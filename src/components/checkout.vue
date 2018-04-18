<template>
	<div>
		<div class="liveList">
			<header>
			    <ul class="headerNav">
					<li class="">
						<router-link :to="{ name: 'liveList',query:{cid:$route.query.cid,session_id:$route.query.session_id,candy:$route.query.candy}}">
							<img width="23px;" src="https://original-resource.bluecandy.io/wawaImg/liveBroadcast/btn_back@2x.png"/>
						</router-link>
						<router-link :to="{ name: 'Shoppingl',query:{cid:$route.query.cid,session_id:$route.query.session_id,candy:$route.query.candy}}" v-show="$route.query.candy==undefined">
							<img width="23px;" src="https://original-resource.bluecandy.io/wawaImg/liveBroadcast/icon_arrow@2x.png"/>
						</router-link>
					</li>
					<li style="display: inline-block;">
						<strong class="color_aimai">{{parseInt($store.state.language)?'电子钱包':'电子钱包'}}</strong>
					</li>
					<li class="floatRight">
					</li>
			    </ul>
		    </header>

			<div class="checkoutBox">
				<ul>
					<li>
						<h3>Account</h3>
						<input type="" placeholder="点击输入"/>
					</li>
					<li>
						<h3>E-Mail</h3>
						<input type="" placeholder="点击输入"/>
					</li>
					<li>
						<h3>Select Payment</h3>
						<div class="payment">
							<div v-for="(val,key) in checkout" @click="paymentEve(val)">
								<p>
									<img v-if="val.boll" width="27px;" src="https://original-resource.bluecandy.io/wawaImg/loading/btn_choose_click@2x.png"/>
									<img v-else width="27px;" src="https://original-resource.bluecandy.io/wawaImg/loading/btn_choose@2x.png"/>
									<span>{{val.title}}</span>
								</p>
							</div>
						</div>
					</li>
				</ul>
				<p class="tipsNote">
					<strong>
						<img src=""/>
						NOTE：
					</strong>
					Please fill in the right email address to confirm your order,any question pls contact our customer service (support@bluetoken.io).
				</p>
			</div>

			<div class="orderBox">
				<p>
					<strong>TOTAL：$30.00</strong>
					<span>CONFIRM ORDER</span>
				</p>
			</div>

	    </div>
	</div>
</template>

<script>

import axios from 'axios'
import qs from 'qs'


import paypal from 'paypal-checkout';

export default {
  name: 'liveList',
  data () {
    return {
    	checkout:[
    		{title:'BTC',boll:true},
    		{title:'ETH',boll:false},
    		{title:'ETH',boll:false}
    	]
    }
  },
  mounted(){//mounted
  	let _this = this;

		
  },
  methods: {
  	paymentEve(val){
  		for(let i in this.checkout){
  			this.checkout[i].boll = false;
  		};
  		val.boll = true;
  	}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.checkoutBox ul{
	padding: 7px 13px;
}
.checkoutBox h3{
	color: #919191;
	font-size: 20px;
	border-bottom: 1px solid #ddd;
	padding: 3px 0px;
}
.checkoutBox li{
	background:url('https://original-resource.bluecandy.io/wawaImg/loading/bg_account@2x.png');
	background-position: center center;
	background-size: 100% 100%;
	background-repeat: no-repeat;
	padding: 7px 13px;
}
.checkoutBox input{
	width: 100%;
	border:none;
	height: 32px;
	font-size: 15px;
	line-height: 32px;
}
.payment p{
	display: flex;
    justify-content: end;
    align-items: center;
}
.payment{
    padding: 3px 0px;
    overflow: hidden;
}
.payment div{
	float: left;
	width: 50%;
	margin: 3px 0px;
}
.payment span{
	color: #bfbfbf;
	margin-left: 9px;
}
.tipsNote strong{
	display: block;
	font-size: 19px;
	margin: 7px 0px;
}
.tipsNote{
	padding: 0px 20px;
	color: #f6322e;
	font-size: 16px;
}

.orderBox{
	position: absolute;
	bottom: 0px;
	width: 100%;
}
.orderBox p{
	display: flex;
    justify-content: space-between;
    align-items: center;
	padding: 13px 7px;
	background: #fff;
}
.orderBox strong{
	font-size: 18px;
	color: #555;

}
.orderBox span{
	background:url('https://original-resource.bluecandy.io/wawaImg/loading/btn_Lfull@2x.png');
	background-position: center center;
	background-size: 100% 100%;
	background-repeat: no-repeat;
	height: 43px;
    line-height: 43px;
    width: 163px;
    text-align: center;
    color: #222;
}
</style>
