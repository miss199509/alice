<template>
	<div>
		<div class="liveList" :style="{height:$route.query.height+ 'px'}">
			<header>
			    <ul class="headerNav">
					<li class="">
						<router-link :to="{ name: 'Settlement',query:{cid:$route.query.cid,session_id:$route.query.session_id,candy:$route.query.candy}}">
							<img width="23px;" src="https://resource.bluecandy.io/wawaImg/liveBroadcast/icon_arrow@2x.png"/>
						</router-link>
						<router-link :to="{ name: 'Shoppingl',query:{cid:$route.query.cid,session_id:$route.query.session_id,candy:$route.query.candy}}" v-show="$route.query.candy==undefined">
							<img width="23px;" src="https://resource.bluecandy.io/wawaImg/liveBroadcast/icon_arrow@2x.png"/>
						</router-link>
					</li>
					<li style="display: inline-block;">
						<strong class="color_aimai">{{parseInt($store.state.language)?'checkout':'结算'}}</strong>
					</li>
					<li class="floatRight">
					</li>
			    </ul>
		    </header>

			<div class="checkoutBox">
				<ul>
					<li>
						<h3>{{parseInt($store.state.language)?'Currency':'币种'}}：<span>{{$route.query.name}}</span></h3>
					</li>
					<li>
						<h3>{{parseInt($store.state.language)?'Qty':'数量'}}：<span>{{$route.query.qty}}</span></h3>
					</li>
					<li>
						<h3>{{parseInt($store.state.language)?'Account':'账号'}}</h3>
						<input v-if="$store.state.language" v-model="account" type="" placeholder="Wallet address"/>
						<input v-else v-model="account" type="" placeholder="请输入电子钱包！"/>
					</li>
					<li>
						<h3>{{parseInt($store.state.language)?'E-Mail':'邮箱'}}</h3>
						<input v-if="$store.state.language" v-model="email" type="" placeholder="E-Mail"/>
						<input v-else v-model="email" type="" placeholder="请输入邮箱"/>
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
						{{parseInt($store.state.language)?'NOTE：':'提示：'}}
					</strong>
					<span v-if="$store.state.language">
						Please fill in the right email address to confirm your order,any question pls contact our customer service (support@bluetoken.io).
					</span>
					<span v-else>
						请正确填写有效的邮箱地址，用于您的订单确认，如有疑问请联系客服(support@bluetoken.io)
					</span>
				</p>
			</div>

			<div class="orderBox">
				<p>
					<strong>{{parseInt($store.state.language)?'TOTAL':'总价'}}:0.00</strong>
					<span @click="order()">{{parseInt($store.state.language)?'CONFIRM':'提交'}}</span>
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
  		if(this.account.length<3){
  			_this.tipsBoll = true;
	  		_this.tipsText = _this.$store.state.language?'Please fill in the Wallet address':'请输入电子钱包！';
	  		_this.thisBoll = true;
	  		window.setTimeout(function(){
	  			_this.tipsBoll = false;
	  			_this.thisBoll = false;
			},3000);
  			return false;
  		};
  		let reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
  		if(_this.thisBoll){
  			return false;
  		};
  		if(!reg.test(_this.email)){
			_this.tipsBoll = true;
	  		_this.tipsText = _this.$store.state.language?'Please fill in the right email address':'请输入正确的邮箱！';
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
  			type:_this.$route.query.name,
  			op:'wawa',
  			amount:_this.$route.query.qty
  		}))
		.then(function(dataJson){
			console.log(dataJson.data);
			_this.tipsBoll = true;
	  		_this.tipsText = _this.$store.state.language?'Success! Transactions can take up to 90 minutes to be confirmed. If your transaction is not confirmed after 90 minutes, please send us a note at support@bluetoken.io':'兑换成功！稍后工作人员将会联系您！';
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
