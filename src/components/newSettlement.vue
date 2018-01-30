<template>
	<div>

	  <div class="liveList">

	    <header>
		    <ul class="headerNav">
				<li class="floatLeft">
					<router-link :to="{ name: 'Settlement'}">
						<img width="23px;" src="../assets/liveBroadcast/icon_arrow@2x.png"/>
					</router-link>
				</li>
				<li style="display: inline-block;">
					<strong class="color_aimai">{{parseInt($store.state.language)?'Checkout':'支付'}}</strong>
				</li>
				<li class="floatRight">
				</li>
		    </ul>
	    </header>
		
		<div class="settlement">
			<div class="shoppingl_global  overflowRemove">
				<div class="is_default settlement_nav">
					<h4 class="floatLeft">
						<strong>{{parseInt($store.state.language)?'ship to':'寄到'}}</strong>
					</h4>
					<div class="is_default_val">
						<div class="floatLeft">
							<p>{{delivery_nav.cnee}}</p>
							<p>{{delivery_nav.street}}</p>
							<p>{{delivery_nav.state}}{{delivery_nav.postcode}}</p>
						</div>

						<router-link :to="{ name: 'Delivery',query:{cid:$store.state.cid_talk}}">
							<p class="floatRight">
								<img width="23px;" src="../assets/liveBroadcast/proceed_button.png"/>
							</p>
						</router-link>
					</div>

				</div>
			</div>

			<div class="payment_box">
				<div class="payment_tips">
					<p>{{parseInt($store.state.language)?'Select Payment':'支付方式'}}</p>
				</div>
				<p class="payment_select" @click="payment_select_eve()">
					{{parseInt($store.state.language)?'Use balance payment':'使用余额支付'}}:
					<span>{{parseFloat($store.state.balance_talk/100).toFixed(2)}}</span>
					<img v-if="payment_boll" width="23px;" src="../assets/liveBroadcast/icon_checked@2x.png"/>
					<img v-else width="23px;" src="../assets/liveBroadcast/icon_unchecked@2x.png"/>
				</p>
				<p class="payment_tips">
					<img width="20px;" src="../assets/liveBroadcast/btn_choose_click@2x.png"/>
					<img style="margin-left: 17px;" width="45px;" src="../assets/liveBroadcast/logo_paypal@2x.png"/>
				</p>
			</div>

			<nav class="">
				<div class="commodity_box">
					<h3 class="overflowRemove title_class">
						<span class="floatLeft">{{shoppingCart.length}} {{parseInt($store.state.language)?'item':'项'}}</span>
						<img  v-if="commodity_boll" @click="commodity_eve()" class="floatRight" width="20px;" src="../assets/liveBroadcast/btn_collapse.png"/>
						<img v-else="commodity_boll" @click="commodity_eve()" class="floatRight" width="20px;" src="../assets/liveBroadcast/btn_addWallet@2x.png"/>
					</h3>
					
					<div class="" style="display: none;">
						<img scr=""/>
						<div class="">
							<h4>
							</h4>
							<p></p>
							<p></p>
							<p>
								<span>
									
								</span>
							</p>
						</div>
					</div>


					<div class="commodity" v-show="commodity_boll" :style="{ height: height + 'px' }">
						<ul class="" v-for="(val,key) in shoppingCart">
							<li class="product_img">
								<img width="80px;" :src="val.images"/>
							</li>
							<li class="commodity_text">
								<h4>{{val.ch_name}}</h4>
								
								<p>
									<span>{{parseInt($store.state.language)?'QTY':'大小'}}：{{val.product_size}}</span>
								</p>

								<p>
									<span>{{parseInt($store.state.language)?'Size':'数量'}}：{{val.product_amount}}</span>
								</p>
								<p>
									<strong class="floatRight">￥{{parseFloat(val.product_price/100).toFixed(2)}}</strong>
								</p>
							</li>
						</ul>
					</div>


					

				</div>
				
			</nav>

			<div class="checkout">
				<ul>
					<li>
						<span>{{parseInt($store.state.language)?'Subtotal':'小计'}}</span>
						<span>￥{{parseFloat(product_price_val/100).toFixed(2)}}</span>
					</li>
					<li>
						<span>{{parseInt($store.state.language)?'Tax':'税'}}</span>
						<span>0</span>
					</li>
					<li>
						<span>{{parseInt($store.state.language)?'Shipping':'运费'}}</span>
						<span>0</span>
					</li>
					<li class="checkout_price">
						<strong>{{parseInt($store.state.language)?'Final Price':'最终价格'}}</strong>
						<strong>￥{{parseFloat(product_price_val/100).toFixed(2)}}</strong>
					</li>
				</ul>
				<p @click="register()">{{parseInt($store.state.language)?'PAY':'支付'}}</p>

				<!-- paypal沙盒支付测试地址 -->
				<form id="pay_form" name="pay_form" action="https://www.sandbox.paypal.com/cgi-bin/webscr" method="post">
					<!-- 支付金额-->
					<input type="hidden" name="amount" id="amount" :value="product_price_val/100">
					<!-- 表示立即支付-->
					<input type="hidden" name="cmd" id="cmd" value="_xclick">
					<!-- 自定义id -->
					<input type="hidden" name="custom" id="custom" :value="customer_id">
					<!-- 商户订单唯一id 不可重复 -->
					<input type="hidden" name="invoice" id="invoice" :value="id">
					 <!--支付成功后台通知地址-->
					<input type="hidden" name="notify_url" id="notify_url" value="http://red.alice.live/wallet/finish-paypal">
					<!--支付成功返回地址-->
					<input type="hidden" name="return" id="return" value="http://10.1.106.21:8087/#/order">
					<input type="hidden" name="lc" id="lc" value="China">
					<!--支付取消返回地址-->
					<input type="hidden" name="cancel_return" id="cancel_return" :value="cancel_return">
					<input type="hidden" name="currency_code" id="currency_code" value="USD">
					<!--商户邮件-->
					<input type="hidden" name="business" id="business" value="payment-facilitator@alice.live"><!-- payment@alice.live -->
				</form>


			</div>

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
      msg: 'Welcome to Your Vue.js App',
      shoppingCart:[],
      delivery_nav:{},
      commodity_boll:false,
      cart_list:[],
      height:0,
      product_price_val:0,
      cartData:'',
      shipping_id:'',
      customer_id:'',
      id:'',
      payment_boll:false,
      cancel_return:''
    }
  },
  mounted(){//mounted
  	let _this = this;



  	this.height = document.documentElement.clientHeight-416;
  	//console.log(location.href)
  	//获链接传过来用户筛选商品选择的商品id
  	let href_data = location.href.substr(location.href.indexOf('?')+1,location.href.length);
  	
  	this.cancel_return = location.href;

  	let href_dataVal = href_data.replace(/&product_id/g,',').replace(/=/g,'').replace(/product_id/g,'');
  	this.cartData = href_dataVal;
  	let href_dataAttr = href_dataVal.split(",");

  	//购买参数写入
  	axios.post(_this.$store.state.url_talk+'/order/register-paypal',qs.stringify({
 		cid:_this.$store.state.cid_talk,
		cart_id:_this.cartData,
		shippingaddressid:_this.shipping_id,
 	}))
	.then(function(dataJson){
		_this.customer_id = dataJson.data.customer_id;
		//orderid
		_this.id = dataJson.data.id;
		console.log(_this.customer_id,_this.id,_this.product_price_val)
	})
	.catch(function(err){
		alert(err);
	});


  	//收货地址
  	axios.post(_this.$store.state.url_talk+'/customer/get-shipping-address',qs.stringify({cid:_this.$store.state.cid_talk}))
	.then(function(dataJson){
		//console.log(JSON.stringify(dataJson.data))
		if(dataJson.data.info.length<=0){
			_this.$router.push({ name: 'newAddress',query:{id:'1'}})
		};
		for(let key in dataJson.data.info){
			if(dataJson.data.info[key].is_default==1){
				//发货地址id
				_this.shipping_id = dataJson.data.info[key].id;
				_this.delivery_nav = dataJson.data.info[key];
			}
		}
		//console.log(JSON.stringify(_this.delivery_nav))
	})
	.catch(function(err){
		alert(err);
	});

	//钱包金额请求	
	axios.post(_this.$store.state.url_talk+'/wallet/get-balance',qs.stringify({cid:_this.$store.state.cid_talk}))
	.then(function(dataJson){
		_this.$store.state.balance_talk = dataJson.data.balance;
	})
	.catch(function(err){
		alert(err);
	});


	//购买的商品信息
 	axios.post(_this.$store.state.url_talk+'/cart/get-cart',qs.stringify({cid:_this.$store.state.cid_talk}))
	.then(function(dataJson){
		//console.log(JSON.stringify(dataJson.data))
		for(let i in dataJson.data){
			for(let j in href_dataAttr){
				if(href_dataAttr[j]==dataJson.data[i].id){
					let val = dataJson.data.splice(i,1);
					_this.shoppingCart.push(val[0])
				}
			}
		}
		//console.log(JSON.stringify(_this.shoppingCart))
		for(let id in _this.shoppingCart){
			_this.product_price_val+=_this.shoppingCart[id].product_amount*_this.shoppingCart[id].origin_price;

			axios.post(_this.$store.state.url_talk+'/products/get-product',qs.stringify({id:_this.shoppingCart[id].product_id}))
			.then(function(dataJson){
				// /console.log(JSON.stringify(dataJson.data))
				//console.log(JSON.stringify(_this.shoppingCart[id]))
				_this.$set(_this.shoppingCart[id],'ch_name',dataJson.data.ch_name)
				_this.$set(_this.shoppingCart[id],'images',dataJson.data.images[0])
				_this.cart_list.push(_this.shoppingCart[id].id);

			})
			.catch(function(err){
				alert(err);
			});
		};
	})
	.catch(function(err){
		alert(err);
	});



	

		
  },
  methods: {
  	register(){
  		var _this = this;
  		localStorage.setItem('shoppingCart',JSON.stringify(_this.shoppingCart));

  		if(this.payment_boll){
  			
  			axios.post(_this.$store.state.url_talk+'/order/register-paypal',qs.stringify({
		 		cid:_this.$store.state.cid_talk,
				cart_id:_this.cartData,
				shippingaddressid:_this.shipping_id,
				'disccount':'all'
		 	}))
			.then(function(dataJson){
				console.log(dataJson)
				if(dataJson.data.status==2){
					_this.$router.push({ name: 'order'})
				}
			})
			.catch(function(err){
				alert(err);
			});

  		}else{
			document.pay_form.submit();
  		}

  		//支付
  		/*
  		return false;
	 	axios.post(_this.$store.state.url_talk+'/order/register-cloud-moolah',qs.stringify({
	 		cid:_this.$store.state.cid_talk,
	 		cart_id:_this.cart_list.join(','),
	 		shippingaddressid:_this.delivery_nav.id,
	 		sessionid:localStorage.getItem('session_id')
	 	}))
		.then(function(dataJson){
			console.log(JSON.stringify(dataJson.data))
			if(dataJson.data.status){
				_this.$router.push({ name: 'order'})
			}
		})
		.catch(function(err){
			alert(err);
		});
		*/
  	},
  	commodity_eve(){
  		this.commodity_boll?this.commodity_boll = false:this.commodity_boll = true;
  	},
  	payment_select_eve(){
  		// if(boll){
  		// 	this.img_unchecked = require('../assets/liveBroadcast/icon_unchecked@2x.png')
  		// }else{
  		// 	this.img_unchecked = require('../assets/liveBroadcast/icon_checked@2x.png')
  		// }
  		this.payment_boll?this.payment_boll = false:this.payment_boll = true
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
	padding: 0px 7px;
}
.information img{
	border-radius: 3px;
}


.information li{
	margin-top: 3px;
}


.settlement{
	padding: 0px 7px;
}

.settlement_nav{
	background-color: #fff;
	border-radius: 3px;
	padding: 13px;
	margin-top: 5px;
}







/*全局账单*/

.checkout{
    position: absolute;
    bottom: 7px;
    left: 50%;
    -webkit-transform: translateX(-50%) translateY(0%);
    width: 93%;
}
.checkout li{
	display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 3px 0px;
}
.checkout li span{
	font-size: 15px;
	color: #9F9F9F;
}
.checkout p{
	width: 130px;
	margin: auto;
	height: 33px;
	line-height: 33px;
	text-align: center;
	background:url('../assets/loading/btn_GetCod@2x.png');
	background-position: center center;
	background-size: 100% 100%;
	background-repeat: no-repeat;
	color: #fff;
	font-size: 15px;
	margin-top: 7px;
}
.checkout_price{
	border-top: 1px solid #fff;
	padding-top: 5px;
	margin-top: 5px;
}
.checkout_price strong{
	font-size: 16px;
}



.is_default{
    padding: 7px 13px;
}
.is_default_val{
	font-size: 12px;
	color: #ccc;
	display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 13px;
}
.is_default h4{
	font-size: 13px;
}



.commodity_box{
	background-color: #fff;
	border-radius: 5px;
}

.title_class{
	font-size: 17px;
	border-bottom: 1px solid #EEEEEE;
	padding: 7px 13px;
}
.title_class span{
	font-size: 16px;
}

.commodity{
	background-color: #eee;
	overflow: auto;
	padding:0px 13px;
}
.commodity ul{
	display: flex;
    justify-content: left;
    align-items: center;
    margin: 9px 0px;
}
.commodity_text h4{
	font-size: 17px;
}
.commodity_text{
	margin-left: 13px;
	width: 100%;
}
.commodity_text span{
	color: #ccc;
	font-size: 16px;

}
.commodity_text strong{
	background-color: #EBC676;
    color: #fff;
    border-radius: 50px;
    display: inline-block;
    font-size: 16px;
    padding: 0px 9px;
    font-weight:100;
}


/*支付方式*/
.payment_box{
	background-color: #fff;
	border-radius: 3px;
	margin: 7px 0px;
}
.payment_select{
	background-color: #EFEFEF;
    padding: 9px 0px;
    font-size: 14px;
    text-indent: 23px;
    position: relative;
}
.payment_select span{
	color: #888;
}
.payment_select img{
	display: block;
	position: absolute;
	top: 0px;
	left: 0px;
}
.payment_tips{
	padding: 5px 11px;
	font-size: 14px;
}
.payment_tips p{
	border-bottom: 1px solid #D1D1D1;
	padding: 3px 0px;
}

/*商品*/
.product_img{
	border: 2px solid #E8E8E8;
	border-radius: 3px;
	display: block;
}

</style>
