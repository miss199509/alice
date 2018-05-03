<template>
	<div class="liveList">
		<div class="header_title">
			<strong class="color_aimai">{{parseInt($store.state.language)?'Order Confirmation':'订单确认'}}</strong>
		</div>
		<nav class="order_box">
			<div class="order_content">

				<div class="order_content_box">
					<h3 class="order_content_title">
						<img width="130px;" src="https://resource.bluecandy.io/wawaImg/liveBroadcast/icon_succeed@2x.png"/>
						<span class="color_aimai">{{parseInt($store.state.language)?'ORDERSUCCESS':'订单成功'}}</span>
					</h3>

					<div class="address">
						<p>
							<strong>{{parseInt($store.state.language)?'Ship to':'寄到'}}</strong>
							<span>{{delivery_nav.cnee}}</span>
						</p>
						<div>
							<p>{{delivery_nav.street}},{{delivery_nav.full_address}}</p>
							<p>{{delivery_nav.state}}{{delivery_nav.postcode}}</p>
						</div>
					</div>
				</div>

				<ul class="commodity" :style="{height:backgHeight+'px'}">
					<li v-for="(val,key) in shoppingCart">
						<img width="65px" :src="val.images"/>
						<div class="commodity_text">
							<h4>{{val.ch_name}}</h4>
							<p>
								<span>{{parseInt($store.state.language)?'QTY':'数量'}}：{{val.product_amount}}</span>
							</p>
							<p>
								<strong>${{val.product_price/100}}.00</strong>
							</p>
						</div>
					</li>
				</ul>
				<ul class="global_bill">
					<li class="overflowRemove">
						<span class="floatLeft">{{parseInt($store.state.language)?'Subtotal':'小计'}}</span>
						<span class="floatRight">${{total/100}}.00</span>
					</li>
					<li class="overflowRemove">
						<span class="floatLeft">{{parseInt($store.state.language)?'Tax':'税'}}</span>
						<span class="floatRight">0</span>
					</li>
					<li class="overflowRemove">
						<span class="floatLeft">{{parseInt($store.state.language)?'Shipping':'运费'}}</span>
						<span class="floatRight">0</span>
					</li>
					<li class="overflowRemove" style="border-top: 1px solid #fff;padding-top: 7px;">
						<h3>
							<span class="floatLeft" style="font-size: 17px;color: #333">{{parseInt($store.state.language)?'TOTAL':'合计'}}</span>
							<span class="floatRight" style="font-size: 17px;color: #333">${{total/100}}.00</span>
						</h3>
					</li>
				</ul>
			</div>
		</nav>
		<p class="checkout" @click="register()">{{parseInt($store.state.language)?'BACK TO GAME':'回到游戏'}}</p>
		<div class="boxPopup" style="z-index: 1111" v-show="recharge_login_boll">
			<img class="img_login" width="70px" src="https://resource.bluecandy.io/wawaImg/liveBroadcast/loading.png"/>
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
		shoppingCart:[],
		delivery_nav:{},
		cart_list:[],
		backgHeight:0,
		total:0,
		recharge_login_boll:true

    }
  },
  mounted(){//mounted
  	this.backgHeight = document.documentElement.clientHeight-393;

  	var _this = this;
  	//收货地址
  	axios.post(_this.$store.state.url_talk+'/customer/get-shipping-address',qs.stringify({cid:_this.$route.query.cid}))
	.then(function(dataJson){
		//console.log(JSON.stringify(dataJson))
		for(let key in dataJson.data.info){
			if(dataJson.data.info[key].is_default==1){
				_this.delivery_nav = dataJson.data.info[key];
				console.log(JSON.stringify(_this.delivery_nav))
			}
		}
		//console.log(JSON.stringify(_this.delivery_nav))
	})
	.catch(function(err){
		alert(err);
	});
	//购买的商品信息
	this.shoppingCart = JSON.parse(localStorage.getItem('shoppingCart'));
	for(let i in this.shoppingCart){
		this.total+=this.shoppingCart[i].product_price;
	};
	var j = setInterval(function(){
		axios.post(_this.$store.state.url_talk+'/cart/get-cart',qs.stringify({cid:_this.$route.query.cid}))
		.then(function(dataJson){
			console.log(JSON.stringify(dataJson.data))
			if(dataJson.data.length<=0){
				console.log(JSON.stringify(dataJson.data))
				_this.recharge_login_boll = false;
				clearInterval(j);
				return false;
			}
		})
		.catch(function(err){
			alert(err);
		});
	},5000)


  },
  methods: {
  	register(){
  		let _this = this;
  		this.$router.push({ name: 'liveList',query:{cid:_this.$route.query.cid,session_id:_this.$route.query.session_id,candy:_this.$route.query.candy}})
  	}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->


<style scoped>
.header_title{
	text-align: center;
	height: 40px;
	line-height: 40px;
	font-size: 17px;
}
.order_box{
	padding:0px 7px;
}
.order_content{
}

.order_content_title{
	display: flex;
	justify-content: space-around;
	align-items: center;
	padding: 17px 0px;
}
.order_content_title span{
	font-size: 17px;
}

.address{
	background-color: #fff;
	padding: 5px 17px;
}
.address strong{
	font-size: 13px;
	color: #333;
}
.address span{
	font-size: 14px;
	color: #999;
}
.address p{
	color: #999;
	font-size: 14px;
}
.address div p{
	text-indent: 30px;
}


.checkout{
	background:url('https://resource.bluecandy.io/wawaImg/loading/btn_GetCod@2x.png');
	background-position: center center;
	background-size: 100% 100%;
	background-repeat: no-repeat;
	width: 140px;
	height: 40px;
	line-height: 40px;
	text-align: center;
	margin: 0px auto;
	margin-top: 23px;
}
.commodity{
	padding: 0px 7px;
	margin: 7px 0px;
	background-color: #E6E6E6;
	overflow: auto;
}
.commodity li{
	display: flex;
	justify-content: end;
	align-items: center;
	padding: 13px 9px;
}
.commodity_text{
	margin-left: 9px;
	width: 100%;
}
.commodity_text p{
	margin: 5px 0px;
}
.commodity_text span{
	color: #ccc;
}
.commodity_text h4{
	font-size: 15px;
}
.commodity_text strong{
	float: right;
	background-color: #E0B553;
	border-radius: 13px;
	padding: 2px 13px;
	color: #fff;
}

.order_content_box{
	background-color: #E6E6E6;
	border-radius: 3px;
	padding-bottom: 2px;
}
.global_bill span{
	font-size: 14px;
	color: #7F7F7F;
}
.global_bill li{
	padding:0px 13px;
	margin: 5px 0px;
}
.img_login{
	position: absolute;
	top: 50%;
	left: 50%;
	transform : translate(-50%,-50%);
}
</style>
