<template>
	<div>

	  <div class="liveList">

	    <header>
		    <ul class="headerNav">
				<li class="">
					<router-link :to="{ name: 'liveList',query:{cid:$route.query.cid,session_id:$route.query.session_id,candy:$route.query.candy}}">
						<img width="23px;" src="../assets/liveBroadcast/btn_back@2x.png"/>
					</router-link>
					<router-link :to="{ name: 'Shoppingl',query:{cid:$route.query.cid,session_id:$route.query.session_id,candy:$route.query.candy}}" v-show="$route.query.candy==undefined">
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
		
		<nav class="shoppingl_global settlement">
			<p class="settlement_global">
				<img v-if="globalImg_tips_boll" @click="global_product()" width="20px;" src="../assets/liveBroadcast/btn_choose_click@2x.png"/>
				<img v-else @click="global_product()" width="20px;" src="../assets/liveBroadcast/btn_choose@2x.png"/>
				<span>{{parseInt($store.state.language)?'Check All':'全选'}}</span>
			</p>
			<ul class="product_list" :style="{ height: height + 'px' }">
				<li class="settlement_nav" v-for="(val,key) in shoppingCart" @click="shoppingCart_eve(key)">
					
					<div class="administration">

						<p class="product_class">
							<img width="93px;" :src="val.images"/>
						</p>

						<div class=" introduce_val">
							<h4>{{val.ch_name}}</h4>
							<p>
								<span>{{parseInt($store.state.language)?'SIZE：':'大小：'}}</span>
								<strong>{{val.product_size}}</strong>
							</p>
							<p>
								<span>{{parseInt($store.state.language)?'QTY：':'数量：'}}</span>
								<strong>{{val.product_amount}}</strong>
							</p>
							<h3 class="color_aimai">
								￥{{parseFloat(val.product_price/100).toFixed(2)}}
							</h3>
						</div>

					</div>

					<img v-if="val.boll" @click="img_selectEve(val,key)" class="product_log" width="30px;" src="../assets/liveBroadcast/icon_checked@2x.png"/>
					<img v-else @click="img_selectEve(val,key)" class="product_log" width="30px;" src="../assets/liveBroadcast/icon_unchecked@2x.png"/>

				</li>
			</ul>

			
			<div class="product_payment">
				<div>
					<ul>
						<li>
							<label>{{parseInt($store.state.language)?'TOTAL':'合计'}}:</label>
							<strong>￥{{parseFloat(priceVal/100).toFixed(2)}}</strong>
						</li>
					</ul>
					<p class="checkout" @click="register()">{{parseInt($store.state.language)?'Checkout':'支付'}}</p>
				</div>
			</div>

		</nav>
		


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
      shoppingCart:[],
      priceVal:0,
      globalImg_tips_boll:true,
      height:20
    }
  },
  mounted(){//mounted
  	
  	this.height = document.documentElement.clientHeight-143;
  	var len = 0;
    if(this.$store.state.language==0){
      len = 1;
    }else{
      len = 2
    };
  	var _this = this;
 	axios.post(_this.$store.state.url_talk+'/cart/get-cart',qs.stringify({cid:_this.$route.query.cid}))
	.then(function(dataJson){
		_this.shoppingCart = dataJson.data
		
		//console.log(JSON.stringify(dataJson.data))
		for(let id in dataJson.data){
			_this.priceVal+=dataJson.data[id].product_price*dataJson.data[id].product_amount;
			// function getLocalTime(nS) {     
			//     return new Date(parseInt(nS) * 1000).toLocaleString().substr(0,17)
			// }     
			// console.log(getLocalTime(dataJson.data[id].result_time));
			axios.post(_this.$store.state.url_talk+'/products/get-product',qs.stringify({id:dataJson.data[id].product_id,lang:len}))
			.then(function(dataJson){
				_this.$set(_this.shoppingCart[id],'ch_name',dataJson.data.name)
				_this.$set(_this.shoppingCart[id],'images',dataJson.data.images[0])
				console.log(JSON.stringify(dataJson.data))
				_this.$set(_this.shoppingCart[id],'boll',true);
			})
			.catch(function(err){
				alert(err);
			});
		}
	})
	.catch(function(err){
		alert(err);
	});

  },
  methods: {
  	register(){
  		let _this = this;
  		if(this.shoppingCart.length<=0){
  			return false;
  		};
  		let attr = []
  		if(this.shoppingCart.length>0){
	  		for(let i in this.shoppingCart){
	  			if(this.shoppingCart[i].boll){
	  				attr.push(this.shoppingCart[i].id)
	  			}
	  		}
  			this.$router.push({ name: 'newSettlement',query:{cid:_this.$route.query.cid,session_id:_this.$route.query.session_id,candy:_this.$route.query.candy,product_id:attr}})
	  	}
  	},
  	shoppingCart_eve(key){
  		 //console.log(key)
  	},
  	img_selectEve(val,key){
  		if(val.boll){
  			val.boll = false;
  		}else{
  			val.boll = true;
  		}

  		//price
  		this.priceVal = 0;
  		for(let i in this.shoppingCart){
  			if(this.shoppingCart[i].boll){
  				this.priceVal+=this.shoppingCart[i].product_price*this.shoppingCart[i].product_amount;
  			}
  		}
  		//循环所有数据判断是否全选
  		for(let i in this.shoppingCart){
  			if(!this.shoppingCart[i].boll){
  				this.globalImg_tips_boll = false
  				return false;
  			}
  		}
  		this.globalImg_tips_boll = true;

  	},
  	global_product(){
  		this.priceVal = 0;
  		if(this.globalImg_tips_boll){
  			this.globalImg_tips_boll = false;
  			for(let i in this.shoppingCart){
  				this.shoppingCart[i].boll = false;
  			}
  		}else{
  			var result = 0;
  			this.globalImg_tips_boll = true;
  			for(let i in this.shoppingCart){
  				this.shoppingCart[i].boll = true;
  				this.priceVal+=parseInt(this.shoppingCart[i].product_price) 
  			}
  		}
  	}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.settlement{
	padding: 0px 7px;
}

.settlement_global{
	display: flex;
	justify-content: flex-start;
	align-items: center;
	margin: 11px 0px 11px 0px;
}
.settlement_global span{
	margin-left: 9px;
	color: #959595;
}
.settlement_nav{
	border: 1px solid #E9E9E9;
	border-radius: 3px;
	background-color: #fff;
	position: relative;
}

.administration{
	display: flex;
	justify-content: stretch;
	align-items: center;
	padding: 13px 0px;
}
.product_class{
	margin: 0px 17px;
}
.product_class img{
	border: 2px solid #E0E0E0;
	border-radius: 3px;
}

.introduce_val h4{
	font-size: 17px;
}
.introduce_val span{
	color: #949494;
	font-size: 14px;
}
.introduce_val strong{
	color: #949494;
	font-size: 15px;
}
.introduce_val h3{
	background-color: #EBC676;
	color: #fff;
	border-radius: 50px;
	display: inline-block;
	font-size: 16px;
	padding: 0px 9px;

}

.product_log{
	position: absolute;
	top: 0px;
	left: 0px;
}

.product_payment{
	position: fixed;
	bottom: 0px;
	width: 100%;
	left: 50%;
	transform : translate(-50%,0%);
	background-color: #fff;
	border-top: 1px solid #EBC676;
	max-width: 600px;
}
.product_payment div{
	width: 93%;
    margin: auto;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 11px 0px;
}
.checkout{
	background:url('../assets/loading/btn_GetCod@2x.png');
	background-position: center center;
	background-size: 100% 100%;
	background-repeat: no-repeat;
	width: 130px;
	height: 37px;
	line-height: 37px;
	text-align: center;
}
.product_list{
	overflow: auto;
}
</style>
