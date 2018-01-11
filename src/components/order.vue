<template>
	<div class="liveList">
		<div class="header_title">
			<strong>订单确认</strong>
		</div>
		<nav class="order_box">
			<div class="order_content">
				<h3 class="order_content_title">
					<img width="23px;" src="../assets/liveBroadcast/icon_confirmedcheckmark.png"/>
					订单成功
				</h3>
				<ul class="commodity" v-for="(val,key) in shoppingCart">
					<li>
						<img width="55px" :src="val.images"/>
					</li>
					<li class="commodity_text">
						<h4>{{val.ch_name}}</h4>
						<p>
							<span>数量：{{val.product_amount}}</span>
						</p>
						<p>
							<strong>${{parseFloat(val.product_price/100).toFixed(2)}}</strong>
						</p>
					</li>
				</ul>
				<div class="address">
					<p>
						<strong>寄到</strong>
					</p>
					<div>
						<p>{{delivery_nav.cnee}}</p>
						<p>{{delivery_nav.street}}</p>
						<p>{{delivery_nav.state}}{{delivery_nav.postcode}}</p>
					</div>
				</div>
				<ul class="global_bill">
					<li class="overflowRemove">
						<span class="floatLeft">小计</span>
						<span class="floatRight">$0.00</span>
					</li>
					<li class="overflowRemove">
						<span class="floatLeft">税</span>
						<span class="floatRight">0</span>
					</li>
					<li class="overflowRemove">
						<span class="floatLeft">运费</span>
						<span class="floatRight">0</span>
					</li>
					<li class="overflowRemove">
						<h3>
							<span class="floatLeft">合计</span>
							<span class="floatRight">$0.00</span>
						</h3>
					</li>
				</ul>
			</div>
		</nav>
		<p class="checkout" @click="register()">回到游戏</p>
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
		cart_list:[]

    }
  },
  mounted(){//mounted
  	var _this = this;
  	//收货地址
  	axios.post(_this.$store.state.url_talk+'/customer/get-shipping-address',qs.stringify({cid:_this.$store.state.cid_talk}))
	.then(function(dataJson){
		//console.log(JSON.stringify(dataJson))
		for(let key in dataJson.data.info){
			if(dataJson.data.info[key].is_default==1){
				_this.delivery_nav = dataJson.data.info[key];
			}
		}
		//console.log(JSON.stringify(_this.delivery_nav))
	})
	.catch(function(err){
		alert(err);
	});
	//购买的商品信息
	this.shoppingCart = JSON.parse(localStorage.getItem('shoppingCart'));
  },
  methods: {
  	register(){
  		this.$router.push({ name: 'liveList'})
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
	background-color: #FFFFFF;
	color: #44A7D6;
}
.order_box{
	padding: 0px 7px;
	margin-top: 7px;
}
.order_content{
	background-color: #fff;
	border-radius: 5px;
}
.order_content_title{
	text-align: center;
	background-color: #A9E0FF;
	color: #fff;
	height: 40px;
	line-height: 40px;
	font-size: 17px;
	border-top-left-radius: 5px;
	border-top-right-radius: 5px;
}









.global_bill{
	padding: 5px 23px;
	margin-top: 13px;
	font-size: 14px;
}

.global_bill li{
	margin-bottom: 7px;
}
.global_bill li h3{
	border-top: 1px solid #eee;
	padding-top: 7px;
	font-size: 15px;
}

.commodity{
	display: flex;
    justify-content: left;
    align-items: center;
    padding: 9px 0px;
    background: #EFEFEF;
}
.commodity_text h4{
	font-size: 14px;
}
.commodity_text{
	margin-left: 13px;
}
.commodity_text span{
	color: #ccc;
	font-size: 12px;

}
.commodity_text strong{
	font-size: 14px;
}
.address{
	display: flex;
    justify-content: left;
    align-items: center;
    margin: 2px 23px;
    padding: 7px 0px;
    border-top: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
}
.address strong{
	font-size: 13px;
}
.address div{
	margin-left: 13px;
	font-size: 13px;
	color: #ccc;
}
.checkout{
	background-color: #39E5FB;
	height: 35px;
	line-height: 35px;
	border-radius: 3px;
	text-align: center;
	color: #fff;
	font-size: 15px;
    box-shadow: 0px 5px 3px #0270C7;
    width: 60%;
    position: fixed;
    bottom: 13px;
   	-webkit-transform: translateX(-50%) translateY(0%);
   	left: 50%;
}
</style>
