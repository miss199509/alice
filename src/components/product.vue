<template>
	<div>

	  <div class="liveList">

	    <header>
		    <ul class="headerNav">
				<li class="floatLeft">
					<router-link :to="{ name: 'Shoppingl'}">
						<img width="23px;" src="../assets/liveBroadcast/btn_back@2x.png"/>
					</router-link>
				</li>
				<li style="display: inline-block;">
					<strong class="color_aimai">{{parseInt($store.state.language)?'Shop':'商店'}}</strong>
				</li>
				<li class="floatRight">
					<router-link :to="{ name: 'Settlement'}">
						<img width="27px;" src="../assets/liveBroadcast/btn_cart@2x.png"/>
					</router-link>
				</li>
		    </ul>
	    </header>

		<div class="shoppingl_list product shoppingl_global">
			<div class="product_center">

				<div class="swiper-container" style="height: 200px">
					<div class="swiper-wrapper">
						<div class="swiper-slide" v-for="(val,key) in listImg"><img width="120px;" :src="val"/></div>
					</div>
					<!-- Add Pagination -->
					<div class="swiper-pagination"></div>
				</div>


			    <div class="">

					<h3 class="product_title">
						<strong>{{product.en_name}}</strong>
						<span>{{parseFloat(product.price).toFixed(2)}}</span>
					</h3>
					<p class="product_text">{{product.en_description}}</p>

					<ul class="product_select">
						<li>
							<span>{{parseInt($store.state.language)?'Choose Color':'选择颜色'}}</span>
							<p>
							</p>
						</li>
						<li>
							<span>{{parseInt($store.state.language)?'Choose Size':'选择大小'}}</span>
							<p class="product_size">
								<label v-for="(val,key) in listSize" @click="selectCss(key)" :class='{"labelCss":val.boll}'>{{val.size}}</label>
							</p>

						</li>
						<li>
							<span>{{parseInt($store.state.language)?'Choose Qty':'选择数量'}}</span>
							
							<p class="addPrice">
								<img @click="removeNumber()" width="22px" src="../assets/liveBroadcast/btn_-qty@2x.png"/>
								<strong class="color_aimai">{{number_int}}</strong>
								<img @click="addNumber()" width="22px" src="../assets/liveBroadcast/btn_+qty@2x.png"/>
							</p>

						</li>
					</ul>
			    

			    </div>
			    
		    </div>
	    </div>

	    <p class="product_bottom" @click="productBet()">
			<span>{{parseInt($store.state.language)?'EXCHAMGE FOR':'购买'}}</span>
			<img width="22px" src="../assets/liveBroadcast/dc_icons@2x.png"/>
			<strong>{{parseFloat(price).toFixed(2)}}</strong>
	    </p>

	  </div>

	  <div id="boxPopup" v-show="product_tips"></div>
		<div class="explainPopup productPopup" v-show="product_tips">
		  	<h3 class="tips_title color_aimai">
		  		<strong>{{parseInt($store.state.language)?'Prompt':'警告'}}</strong>
		  	</h3>
		  	<ul class="transaction">
				<li>
					<p class="productPopup_tips">
						<img class="floatRigth" width="17px;" src="../assets/liveBroadcast/dc_icons@2x.png"/>
						<strong style="margin-right: 10px;">{{parseFloat(price).toFixed(2)}}</strong>
						<strong>
							{{parseInt($store.state.language)?'will be deducted from your wallet right away. Please complete the process in the cart.':'将会在你的钱包中扣除。请完成购物车中的过程'}}
						</strong>
					</p>
				</li>
				<li style="height: 13px;"></li>
				<li class="overflowRemove productPopup_nve">
					<strong class="floatLeft">{{parseInt($store.state.language)?'Wallet':'钱包'}}</strong>
					<p class="floatRight">
						<img width="17px;" src="../assets/liveBroadcast/dc_icons@2x.png"/>
						<span>{{parseFloat($store.state.balance_talk).toFixed(2)}}</span>
					</p>
				</li>
				<li class="overflowRemove productPopup_nve">
					<strong class="floatLeft">{{parseInt($store.state.language)?'Exchange':'交还'}}</strong>
					<p class="floatRight">
						<img width="17px;" src="../assets/liveBroadcast/dc_icons@2x.png"/>
						<span>{{parseFloat(price).toFixed(2)}}</span>
					</p>
				</li>
				<li class="overflowRemove">
					<strong class="floatLeft">{{parseInt($store.state.language)?'Wallet Balance':'钱包余额'}}</strong>
					<p class="floatRight">
						<img width="17px;" src="../assets/liveBroadcast/dc_icons@2x.png"/>
						<span>{{parseFloat($store.state.balance_talk-price).toFixed(2)}}</span>
					</p>
				</li>
				<li class="operation">
					<p @click="cartSubmit()" class="productBet">{{parseInt($store.state.language)?'ACCEPT':'接受'}}</p>
					<p @click="remove_product_tips()" class="productBet">{{parseInt($store.state.language)?'CANCEL':'取消'}}</p>
				</li>
			</ul>
		</div>

		<div id="boxPopup" v-show="recharge_popup" style="z-index: 11;"></div>
		<div class="explainPopup productPopup" v-show="recharge_popup">
		  	<h3 class="tips_title">
		  		<strong class="color_aimai">{{parseInt($store.state.language)?'Prompt':'提示'}}</strong>
		  		<img @click="balance_eve()" class="floatRight" width="21px;" src="../assets/loading/btn_close@2x.png"/>
		  	</h3>
		  	<ul class="transaction transaction_box">
				<li>
					<p class="recharge_tips color_aimai">
						{{tips_text}}
					</p>
				</li>
			</ul>
			<div class="operation">
				<p @click="lade()" class="productBet">{{parseInt($store.state.language)?'Confirm':'确定'}}</p>
			</div>
		</div>

		<div class="loading" v-show="loading">
			<img width="50px;" src="../assets/liveBroadcast/loading.png"/>
		</div>







	</div>
</template>

<script>

import axios from 'axios'
import qs from 'qs'

import Swiper from 'swiper';
import 'swiper/dist/css/swiper.min.css';

export default {
  name: 'liveList',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      product_tips:false,
      product:'',
      number_int:1,
      listSize:[],
      listImg:[],
      portrait_nav:['text'],
      price:'',
      recharge_popup:false,
      loading:true,
      tips_text:''

    }
  },
  mounted(){
  	console.log(this.$store.state.cid_talk)
  	//https://red.aimai.live/products/mall-product
	new Swiper('.swiper-container', {
		pagination: '.swiper-pagination',
		paginationClickable: true,
		observer:true,//修改swiper自己或子元素时，自动初始化swiper
		observeParents:true//修改swiper的父元素时，自动初始化swiper
	});


  	var _this = this
  	axios.post(_this.$store.state.url_talk+'/products/get-product?id='+_this.$route.query.id,'')
	.then(function(dataJson){
		
		//console.log(JSON.stringify(dataJson))
		_this.listImg = dataJson.data.images
		let listSize = dataJson.data.size.split(",")

		dataJson.data.price = dataJson.data.price/100;
		_this.product = dataJson.data;
		console.log(JSON.stringify(_this.product))
  		_this.price = _this.product.price;

		if(listSize!==''){
			for(let key in listSize){
				if(listSize[key]!==''){
					_this.listSize.push({'size':listSize[key],'boll':false})

				}
			}
			_this.listSize[0].boll = true;
		}
	})
	.catch(function(err){
		//alert(err);
	});

	axios.post(_this.$store.state.url_talk+'/wallet/get-balance',qs.stringify({cid:_this.$store.state.cid_talk}))
	.then(function(dataJson){
		let balance = dataJson.data.balance/100
		_this.$store.state.balance_talk = balance.toFixed(2);
		_this.$nextTick(function(){
  			_this.loading = false
        })


	})
	.catch(function(err){
		//alert(err);
	});



  },
  methods: {
  	addNumber(){
  		this.number_int+=1;
  		this.price = this.product.price;
  		this.price = this.price*this.number_int;
  	},
  	removeNumber(){
  		if(this.number_int<=1){
  			return
  		}
  		this.number_int-=1;
  		this.price = this.product.price;
  		this.price = this.price*this.number_int;
  		//this.product.price = this.product.price*this.number_int;
  	},
  	selectCss(key){
  		for(let id in this.listSize){
  			this.listSize[id].boll = false
  		}
  		this.listSize[key].boll = true
  	},
  	productBet(){
  		this.product_tips = true
  	},
  	remove_product_tips(){
  		this.product_tips = false
  	},
  	//提交到购物车
  	cartSubmit(){
  		let sizeVal
  		if(parseFloat(this.$store.state.balance_talk-this.price).toFixed(2)<0){
  			this.recharge_popup = true;
  			this.tips_text = '充钱去'
  			return false
  		}
	  	for(let id in this.listSize){
	  		if(this.listSize[id].boll){
	  			sizeVal = this.listSize[id].size
	  		}
	  	}

  		let _this = this;
  		//console.log(_this.$store.state.cid_talk,_this.$route.query.id,_this.number_int,parseFloat(_this.product.price).toFixed(2),sizeVal)
  		axios.post(_this.$store.state.url_talk+'/cart/add-shop-cart',qs.stringify({
  			cid:_this.$store.state.cid_talk,
  			product_id:_this.$route.query.id,
  			amount:_this.number_int,
  			price:parseFloat(_this.product.price).toFixed(2),
  			size:sizeVal,
  			sessionid:localStorage.getItem('session_id')
  		}))
		.then(function(dataJson){
			_this.tips_text = dataJson.data.message;
			_this.recharge_popup = true;
			if(dataJson.data.result==1){
				_this.$router.push({ name: 'Settlement'})
			}
		})
		.catch(function(err){
			alert(err);
		});
  	},
  	lade(){
  		if(this.recharge_popup){
	  		this.$router.push({ name: 'Recharge'})
	  		//window.location.reload();
  		}
  	},
  	balance_eve(){
  		this.recharge_popup = false;
  	}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.shoppingl_list{
	padding: 10px 9px;
}

.product_center .swiper-container{
	text-align: center;
}
.product_center .swiper-container img{
	width: 150px;
}

.product_center{
	background-color: #fff;
	padding: 0px 11px;
	border-radius: 5px;
}

.product_title{
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.product_title strong{
	font-size: 15px;
}
.product_title span{
    padding: 1px 9px;
    border-radius: 13px;
    background-color: #E9BB53;
    color: #fff;
    font-weight: 100;
    font-size: 16px;
}
.product_text{
	padding: 0px 15px;
	font-size: 13px;
	margin: 15px 0px;
	max-height: 75px;
    overflow: auto;
}
.product_select li{
	border-top: 1px solid #000;
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: 49px;
	line-height: 49px;
}
.addPrice{
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.addPrice strong{
    padding: 0px 23px;
    background-color: #eee;
    height: 22px;
    line-height: 22px;
}
.product_select span{
	color: #868686;
}
.product_size label{
	border: 2px solid #D6D6D6;
	border-radius: 50%;
	display: inline-block;
	height: 30px;
	width: 30px;
	line-height: 30px;
	text-align: center;
	font-size: 13px;
	margin-left: 3px;
}
.labelCss{
	background-color: #E9BB53;
	color: #fff;
}
.product_bottom{
	position: absolute;
	bottom: 13px;
	left: 50%;
	transform : translate(-50%,0%);

	background-color: #464646;
	background:url('../assets/loading/btn_GetCod@2x.png');
	background-position: center center;
	background-size: 100% 100%;
	background-repeat: no-repeat;
	padding: 7px 33px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: fit-content;
}
.product_bottom span{
	font-size: 12px;
	margin-right: 5px;
}
.product_bottom strong{
	font-size: 15px;

}


/*确认购买*/
.explainPopup{
	padding: 7px 10px;
	height: auto;
	width: 87%;
	border-radius: 5px;
}
.tips_title{
	text-align: center;
	margin-bottom: 11px;
	font-size: 17px;
}
.transaction{
	padding: 13px;
	background:url('../assets/liveBroadcast/bgw_avatar@2x.png');
	background-position: center center;
	background-size: 100% 100%;
	background-repeat: no-repeat;
}

.productPopup_tips strong{
	color: #bf9f6e;
	font-size: 15px;
	font-weight: 100;
}
.transaction strong{
	font-size: 15px;
	font-weight: 100;
}
.transaction li{
	margin: 5px 0px;
}
.productPopup_nve strong{
	color:#909090;
}
.productPopup_nve span{
	color:#444;
}
.productPopup_nve{

}

.productBet:active{
	background:url('../assets/loading/btn_exchange_click@2x.png');
	background-position: center center;
	background-size: 100% 100%;
	background-repeat: no-repeat;
	width: 120px;
	height: 33px;
	line-height: 33px;
	text-align: center;
	color: #fff;
	margin: 5px auto;
}
.productBet{
	background:url('../assets/loading/btn_GetCod@2x.png');
	background-position: center center;
	background-size: 100% 100%;
	background-repeat: no-repeat;
	width: 120px;
	height: 33px;
	line-height: 33px;
	text-align: center;
	color: #fff;
	margin: 5px auto;
}
.tips_title strong{
	
}
.recharge_tips{
	font-size: 14px;
	text-align: center;
	padding: 33px 0px;
}
.transaction{

}
.transaction_box{

}
</style>
