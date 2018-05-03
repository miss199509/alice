<template>
	<div>
		<div class="liveList" :style="{height:$route.query.height+ 'px'}">
			<header>
			    <ul class="headerNav">
					<li class="">
						<router-link :to="{ name: 'liveList',query:{cid:$route.query.cid,session_id:$route.query.session_id,candy:$route.query.candy}}">
							<img width="23px;" src="https://resource.bluecandy.io/wawaImg/liveBroadcast/btn_back@2x.png"/>
						</router-link>
						<router-link :to="{ name: 'Shoppingl',query:{cid:$route.query.cid,session_id:$route.query.session_id,candy:$route.query.candy}}" v-show="$route.query.candy==undefined">
							<img width="23px;" src="https://resource.bluecandy.io/wawaImg/liveBroadcast/icon_arrow@2x.png"/>
						</router-link>
					</li>
					<li style="display: inline-block;">
						<strong class="color_aimai">{{parseInt($store.state.language)?'checkout':'checkout'}}</strong>
					</li>
					<li class="floatRight">
					</li>
			    </ul>
		    </header>

			<div class="checkoutBox">
				<ul>
					<li>
						<h3>Currency：<span>{{$route.query.name}}</span></h3>
					</li>
					<li>
						<h3>Account</h3>
						<input v-model="account" type="" placeholder="Electronic wallet"/>
					</li>
					<li>
						<h3>E-Mail<span class="optional">（Optional）</span></h3>
						<input v-model="email" type="" placeholder="E-Mail"/>
					</li>
					<!-- <li>
						<h3>Select Payment</h3>
						<div class="payment">
							<div v-for="(val,key) in checkout" @click="paymentEve(val)">
								<p>
									<img v-if="val.boll" width="27px;" src="https://resource.bluecandy.io/wawaImg/loading/btn_choose_click@2x.png"/>
									<img v-else width="27px;" src="https://resource.bluecandy.io/wawaImg/loading/btn_choose@2x.png"/>
									<span>{{val.title}}</span>
								</p>
							</div>
						</div>
					</li> -->
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
					<strong>TOTAL:0.00({{$route.query.name}})</strong>
					<span @click="order()">CONFIRM</span>
				</p>
			</div>

			<p class="tipsBox" v-show="tipsBoll">
				{{tipsText}}
			</p>

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
    	],
    	account:'',
    	email:'',
    	tipsText:'',
    	tipsBoll:false,
    	thisBoll:false
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
  	},
  	order(){
  		let _this = this;
  		let reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
  		if(_this.thisBoll){
  			return false;
  		};
  		if(!reg.test(_this.email)){
			_this.tipsBoll = true;
	  		_this.tipsText = '请输入正确的邮箱！';
	  		_this.thisBoll = true;
	  		window.setTimeout(function(){
	  			_this.tipsBoll = false;
	  			_this.thisBoll = false;
			},3000);
  			return false;
  		};


  		axios.post(_this.$store.state.url_talk+'/api/exchange',qs.stringify({
  			cid:_this.$route.query.cid,
  			product_id:_this.$route.query.product_id[0],
  			account:_this.account,
  			email:_this.email,
  			type:_this.$route.query.name
  		}))
		.then(function(dataJson){
			console.log(dataJson.data);
			_this.tipsBoll = true;
	  		_this.tipsText = '兑换成功！稍后工作人员将会联系您！';
	  		_this.thisBoll = true;
			window.setTimeout(function(){
	  			_this.tipsBoll = false;
	  			_this.thisBoll = false;
	  			
	  			_this.$router.push({ name: 'liveList',query: {
	  				cid:_this.$route.query.cid,
	  				candy:_this.$route.query.candy,
	  				session_id:_this.$route.query.session_id,
	  				height:_this.$route.query.height
	  			}});


			},5000);

		})
		.catch(function(err){
			alert(err);
		});
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
	font-weight: 100;
}
.checkoutBox h3 span{
	font-size: 18px;
	color: #ccc;
	font-weight: 100;
}
.checkoutBox li{
	background:url('https://resource.bluecandy.io/wawaImg/loading/bg_account@2x.png');
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
	color: #777;
}
.checkoutBox .optional{
	color: #E0B553;
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
	background:url('https://resource.bluecandy.io/wawaImg/loading/btn_Lfull@2x.png');
	background-position: center center;
	background-size: 100% 100%;
	background-repeat: no-repeat;
	height: 43px;
    line-height: 43px;
    width: 163px;
    text-align: center;
    color: #222;
}



.tipsBox{
	position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    background: #000;
    color: #fff;
    opacity: 0.7;
	padding: 7px 15px;
    border-radius: 9px;
    text-align: center;
    font-size: 13px;
}
</style>
