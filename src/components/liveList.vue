<template>
	<div class="" id="liveList_id">

	  <div class="liveList">
	  	<header>
		    <ul class="headerNav">
				<li class="floatLeft">
					
					<!-- <router-link :to="{ name: 'Personal'}">list_popup() -->
						<img v-if="$route.query.candy==undefined" @click="popup_box_boll = !popup_box_boll" width="23px;" src="../assets/liveBroadcast/btn_back@2x.png"/>
						<span v-else class="btn_back"></span>
					<!-- </router-link> -->

					<router-link :to="{ name: 'Shoppingl'}" v-show="$route.query.candy==undefined">
						<img class="headerClass" width="20px;" src="../assets/liveBroadcast/icon_shop@2x.png"/>
					</router-link>
				</li>
				<li class="dc_css">
					<img v-if="$route.query.candy==undefined" width="15px;" src="../assets/liveBroadcast/dc_icons@2x.png"/>
					<img v-else width="20px;" src="../assets/new_icon_bluetoken@2x.png"/>
					<strong class="color_aimai">{{$store.state.balance_talk}}</strong>
				</li>
				<li class="floatRight information_box">
					<router-link :to="{ name: 'Settlement',query:{cid:$route.query.cid,session_id:$route.query.session_id,candy:$route.query.candy}}">
						<img width="27px;" src="../assets/liveBroadcast/btn_cart@2x.png"/>
					</router-link>
				</li>
		    </ul>
	    </header>
	    <div class="shoppingl_global" @click="video_eve()">
			<img v-show="loginBoll" style="width: 45px;display: block;margin: auto;" src="../assets/liveBroadcast/loading.png"/>
			<img class="headerImg" id="img" width="100%" src='../assets/banner _1.jpg'/><!-- image -->
	    </div>
	    	
	    <!-- 视频 -->
	    <div class="" v-show="iframeBoll">
		    <div class="boxPopup"></div>
		    
		    <div class="explainPopup_iframe">
		    	<iframe id="my-video" width="100%" height="220px;" :src='iframeSrc' frameborder="0" allowfullscreen></iframe>

		    </div>

	    	<div class="tipsRemove" @click="removeIframe()">
				<img width="23px" src="../assets/loading/btn_close@2x.png"/>
	    	</div>

	    </div>
	    
	    <div class="broadcastBox" :style="{height:height_room+'px'}">
			<ul class="overflowRemove">
				<li class="broadcastList" v-for="(val,key) in broadcastList" @click="broadcastList_eve(key)">
					<div class="overflowRemove">
						<p class="floatLeft uesName">
							<img width="35px;" :src='val.dealer_portrait'/>
							<strong>{{val.dealer_name}}</strong>
						</p>
						<p class="floatRight uesNumber">
						 	<strong>{{val.watching}}</strong>
						 	<br/>
							<strong style="color:#A2A2A2;">{{parseInt($store.state.language)?'WATCHING':'观看'}}</strong>
						</p>
					</div>
					<p style="position: relative;">
						<img width="100%" style="min-height: 170px;" :src='val.r_image'/>
						<img style="position: absolute;top: 7px;right: 7px;" width="43px;" src="../assets/liveBroadcast/live.png"/>
					</p>
				</li>
			</ul>
	    </div>



	    <div class="boxPopup" style="z-index: 11" v-show="tutorials_boll"></div>
		<div class="explainPopup productPopup" v-show="tutorials_boll">
		  	<h3 class="tips_title color_aimai">
		  		{{parseInt($store.state.language)?'Welcome to Alice Live!':'欢迎来到Alice直播'}}
		  	</h3>
		  	<ul class="transaction">
				<li>
					<p class="recharge_tips color_aimai" v-if="$store.state.language">
						Learn how to play and shop and get $5.00 worth of Discount Coupon! You can also watch a tutorial video by tapping on the''How to Shop'' banner the top.
					</p>
					<p class="recharge_tips color_aimai" v-else>
						Alice ICO,Hi亲爱的。终于等到你来了。这里有你喜欢的主播，喜欢的商品，快来玩吧。和我们一起享受直播娱乐的快感。。。
					</p>
				</li>
				<li class="operation">
					<p class="productBet" @click="operation_href()">{{parseInt($store.state.language)?'GO':'观看'}}</p>
				</li>
			</ul>
		</div>



		<!-- 边框弹出 -->
		<transition name="slide-fade">
			<div class="popup_box" v-show="popup_box_boll" style="z-index: 13">
				<div class="popup_back" :style="{backgroundImage: 'url(' + $store.state.portrait + ')'}">
					<div class="">
						<p class="portrait_img">
							<img width="100px;" height="100px;" :src="$store.state.portrait"/>
							<label class="color_aimai">{{uesName}}</label>
						</p>
					</div>

					<nav class="navList">
						<ul>
							<router-link :to="{ name: 'Personal',query:{cid:$route.query.cid,session_id:$route.query.session_id,candy:$route.query.candy}}">
								<li>
									<img width="23px;" src="../assets/liveBroadcast/btn_profile@2x.png"/>
									<span class="color_aimai">{{parseInt($store.state.language)?'Profile':'个人信息'}}</span>
								</li>
							</router-link>
							<li @click="popup_box_boll = !popup_box_boll">
								<img width="23px;" src="../assets/liveBroadcast/btnhomei6.png"/>
								<span class="color_aimai">{{parseInt($store.state.language)?'Home':'大厅'}}</span>
							</li>
							
							<router-link :to="{ name: 'information',query:{cid:$route.query.cid,session_id:$route.query.session_id,candy:$route.query.candy}}">
								<li>
									<img width="23px;" src="../assets/liveBroadcast/btn_event@2x.png"/>
									<span class="color_aimai">{{parseInt($store.state.language)?'News':'新闻'}}</span>
								</li>
							</router-link>

							<li @click="video_eve()">
								<img width="23px;" src="../assets/liveBroadcast/icon_tutorial@2x.png"/>
								<span class="color_aimai">{{parseInt($store.state.language)?'Tutorial':'新手引导'}}</span>
							</li>
							<li @click="popup_tipsPlay = !popup_tipsPlay">
								<img width="23px;" src="../assets/liveBroadcast/icon_gameplay@2x.png"/>
								<span class="color_aimai">{{parseInt($store.state.language)?'GamePlay':'游戏玩法'}}</span>
							</li>
							<li @click="questions_boll = !questions_boll">
								<img width="23px;" src="../assets/liveBroadcast/icon_faq@2x.png"/>
								<span class="color_aimai">
									{{parseInt($store.state.language)?'FAQ':'帮助'}}
								</span>
							</li>
						</ul>
					</nav>

					<div class="sign_out_box">
						<p class="language_css" @click="language_select()">

							<span :class="{ hove:language_boll}">EN</span>
							<span :class="{ hove:!language_boll}">CN</span>
						</p>
						<p class="sign_out_click">
							<img width="23px;" src="../assets/liveBroadcast/icon_logout@2x.png"/>
							<span class="color_aimai" @click="sign_out()">
								{{parseInt($store.state.language)?'Logout':'退出'}}
							</span>
						</p>
						<p style="margin: 7px 0px;">
							{{parseInt($store.state.language)?'Version':'版本'}}0.0.1
						</p>
					</div>
				</div>
			</div>
		</transition>
		<div class="boxPopup" style="z-index: 13" v-show="popup_tipsPlay"></div>
		<div class="boxPopup" style="z-index: 13" v-show="questions_boll"></div>
		<div @click="popup_box_boll = !popup_box_boll" class="boxPopup" style="z-index: 1" v-show="popup_box_boll"></div>
		<!-- 弹窗popup_boll remove_popup_tipsPlay-->
		<div class="gamePlay" v-show="popup_tipsPlay" style="z-index: 13">
			<h3>
				<img @click="popup_tipsPlay = !popup_tipsPlay" width="23px;" src="../assets/liveBroadcast/icon_arrow@2x.png"/>
				<span class="color_aimai">游戏玩法</span>
				<i></i>
			</h3>
			<div class="gamePlay_text">
				<label>Game Play</label>
				<p>
					1.Alice Live is a live-game shopping app that players use to gain discounts on merchandise by participating in a color guessing game. Every time a player guesses correctly, they win bonuses (aka Discount Coupons), which can be used to further reduce the product price if given the chance to buy the item. When players win three (3) times in a row, they will be given a chance to buy the discounted product.
				</p>
				<p>
					2.The color guessing game consists of players choosing the color (either black or red) of the card drawn by the dealer. Players will have fifteen (15) seconds to choose the color and place their bet. After every fifteen (15) seconds, the dealer will draw a new card and show it to players. If the joker card is drawn, all players lose no matter what color they bet on. 
				</p>
				<p>
					3.Players place their bet with Discount Coupons that can be either purchased or won. Unfortunately, at this time the Discount Coupons cannot be exchanged for real world currency. Players can buy Discount Coupons with the ratio of 1 USD to 1 Discount Coupon.
				</p>
				<p>
					4.Players can only bet on one color for each round. When players guess correctly, they win twice the amount of Discount Coupons they bet. The following is an example the different actions a player can take in each round:
					a.First time win, player who bet 10 Discount Coupons will receive 20 Discount Coupons. Additionally, their win meter will be set to 1. 
					b.If the player does not collect the DC won and wins a second time in the next round, player will receive 40 Discount Coupons, double the amount of the 20 Discount Coupons won from the first round. Additionally, their win meter will be set to 2.
					c.If the player does not collect the DC won and wins a third time in the next round, player will receive 80 Discount Coupons, double the amount of the 40 Discount Coupons won from the second round. Additionally, their win meter will be set to 3.
					d.When the player wins 3 times in a row, they are given a chance to buy the merchandise. If they choose not to buy, their win meter is reset to zero (0) but their winnings remain as their bet amount.
					e.If the card is an Alice Live Joker card, all players lose no matter what color they bet.
					f.Players will be able to collect the DC won at any time. “Collecting” will move the player’s winnings to their wallet and reset their win meter to zero (0).
				</p>
				<p>
					5.When players win and choose to continue the bet, they cannot change the bet. For example if they bet 10 Discount Coupons and win, they win 20 Discount Coupons. If they want to continue, the bet amount should be exactly 20 Discount Coupons. Once you lose, your bet and winnings will not be refunded.
				</p>
				<p>
					6.For every first bet placed, the system will take extra “Game fee” directly from the wallet which is used to reduce the price of the current product for all players.
				</p>
				<p>
					7.Only one (1) user can buy the product in each round. In case of multiple users who win three (3) times in a row, the first one who clicks “buy” will get the product. Every player who wins three (3) times in a row will have twenty (20) seconds to decide whether to buy the product or not. 
				</p>
				<p>
					8.The actual price of the product will be the “Current Price” reduced by the Discount Coupons collected from three (3) consecutive wins. For example, if the current price of the product is 100 Discount Coupons and the player is able to collect winnings totaling to 80 Discount Coupons, the final price of the merchandise will be 20 Discount Coupons. Players will be able to pay the final price with the balance from their wallet, they can make the payment through the third party payment (i.e. paypal, apple pay, android pay) as well.
				</p>
				<p>
					9.The price of the product can be reduced to zero (0). When the price is zero (0), players are able to get the product for free. If the final price of the product is not zero (0), the player who has chosen to buy this product will need to complete the checkout process within one (1) hour. Otherwise, the player will forfeit their chance to buy the product and the product will be removed from their shopping cart. The Discount Coupons used to reduce the product price will not be returned to players.
				</p>
				<p>
					10.Any product that does not have players playing for twenty (20) minutes will be removed from the list and the next product will be sold. 
				</p>
				<p>
					11.During the game, the minimum bet will be increased by 10% of the current minimum bet  every 15 rounds. 
				</p>
			</div>
		</div>


		<div class="gamePlay" v-show="questions_boll" style="z-index: 13">
			<h3>
				<img @click="questions_boll = !questions_boll" width="23px;" src="../assets/liveBroadcast/icon_arrow@2x.png"/>
				<span class="color_aimai">帮助</span>
				<i></i>
			</h3>
			<ul class="gamePlay_text" id="questions">
				<li>
					<label>What is Alice Live?</label>
					<p>
						Alice Live is an exciting new mobile app that lets users have fun playing games with each other while shopping for discounted merchandise. The more users play, the deeper the discount they’ll receive on the items they want to buy.  
					</p>
				</li>
				<li>
					<label>How does Alice Live work?</label>
					<p>
						Alice Live users will need to use Discount Coupons to play for a chance to buy the discounted item the live stream host is showing. The more users who play the game, the faster an item is discounted. If a user wins three times in a row, they will have the chance to buy the item or continue playing and wait for a lower price. Whoever wins at least three times in a row and chooses to buy the item will have an hour to complete their purchase before forfeiting the item. Once the item is bought, the game will continue and the host will show a new item for users to buy and play for.
					</p>
				</li>
				<li>
					<label>How soon are the items shipped?</label>
					<p>
						Once the checkout process is completed, allow for 14 working days to process the order before shipping. We will send an email confirming when the item has been shipped as well as include tracking information if applicable.
					</p>
				</li>
				<li>
					<label>Can I return items I bought?</label>
					<p>
						Yes. You’ll have 7 days from when you receive the item to start the return process.
					</p>
				</li>
				<li>
					<label>Can I return items I bought?</label>
					<p>
						I purchased Discount Coupons and never received them. What do I do?
					</p>
				</li>
				<li>
					<label>Can I return items I bought?</label>
					<p>
						If you have purchased Discount Coupons on Alice Live but they have not showed up in your account, we’re here to help. First, check the internet connectivity on your device — switching to wifi or cellular. If that doesn’t resolve the issue, please e-mail us at support@Alice.live with the subject line Discount Coupon Purchase Incomplete [YourUserName] [YourUID] and provide us the receipt withdraw them from the app.
					</p>
				</li>
				<li>
					<label>I need to report a user immediately for harassment or misconduct. What’s the best way?</label>
					<p>
						We appreciate any and all moderation help from Alice Live shoppers. If someone has been acting inappropriately according to our community guidelines, you can send us an email at support@alice.live with the subject line ATTENTION: INAPPROPRIATE BEHAVIOR and sending ANY screenshots you have.
					</p>
				</li>
			</ul>
		</div>



		<!-- <div id="example-1">
		  <button @click="show = !show">
		    Toggle render
		  </button>
		  <transition name="slide-fade">
		    <p v-show="show">hello</p>
		  </transition>
		</div> -->




	  </div>

	</div>
</template>

<script>

import axios from 'axios'
import qs from 'qs'

import aa from './talk'
import $ from 'jquery'

export default {
  name: 'liveList',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      explainPopup:false,
      broadcastList:[],
      iframeBoll:false,
      iframeSrc:'',
      tutorials_boll:false,
      image:'',
      uesName:'',
      popup_tipsPlay:false,
      questions_boll:false,
      popup_box_boll:false,
      show: true,
      loginBoll:true,
      language_boll:0,
      height_room:0,
    }
  },
  updated(){
  	let _this = this;
  	
  	_this.height_room = document.documentElement.clientHeight-45-$('#img').height();
  	if(_this.height_room==0){
		let showTimeInterval = setInterval(function(){
			_this.height_room = document.documentElement.clientHeight-45-$('#img').height();
			if(_this.height_room>0){
				clearInterval(showTimeInterval);
			}
		},1000);
  	}

  },
  mounted(){
  	//中英文状态初始化
  	this.language_boll = parseInt(localStorage.getItem('language'));
  	//判断当前用户是否是新手
  	this.uesName = localStorage.getItem('nickname')
  	if(parseInt(localStorage.getItem('tutorials'))){
  		this.tutorials_boll = true;
  	}
  	
  	var _this = this;
  	//_this.$store.state.portrait = 'https://scontent.xx.fbcdn.net/v/t1.0-1/p50x50/12552952_1531894053774497_102523970575294215_n.jpg?oh=5c8cbd96fef4e8c75cb10bd51cdf874c&oe=5ADCA0F4';
  	//_this.$store.state.portrait = 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1161209730,2018761545&fm=27&gp=0.jpg';
  	//http://red.aimai.live/lobby/get-room-list?room_type=2
  	console.log(this.$store.state.cid_talk)
  	axios.post(_this.$store.state.url_talk+'/lobby/get-room-list',qs.stringify({
  		cid:_this.$route.query.cid,
  		sessionid:localStorage.getItem('session_id')
  	}))
	.then(function(dataJson){
		for(let i in dataJson.data.info){
			if(dataJson.data.info[i].dealer_portrait==undefined){
				dataJson.data.info[i]['dealer_portrait'] = require('../assets/avatar@2x.png');
			};
			if(dataJson.data.info[i].dealer_name==undefined){
				dataJson.data.info[i]['dealer_name'] = '游客';
			};
			//console.log(JSON.stringify(dataJson.data.info[i].product_schedule_id))
		};
		if(_this.$route.query.candy!=undefined){
			for(let i in dataJson.data.info){
				if(dataJson.data.info[i].room_type!=3){
					dataJson.data.info.splice(i,1);
				}
			}
		}
		_this.broadcastList = dataJson.data.info;
	})
	.catch(function(err){
		alert(err);
	});
	if(this.$route.query.candy==undefined){

		axios.post(_this.$store.state.url_talk+'/wallet/get-balance',qs.stringify({
			cid:_this.$route.query.cid,
			sessionId:localStorage.getItem('session_id')
		}))
		.then(function(dataJson){
			console.log(JSON.stringify(dataJson.data))
			let balance = dataJson.data.balance/100
			_this.$store.state.balance_talk = balance.toFixed(2);

		})
		.catch(function(err){
			//alert(err);
		});

	}else{
		axios.post(_this.$store.state.url_talk+'/api/refresh-wallet',qs.stringify({
			cid:_this.$route.query.cid,
			sessionId:localStorage.getItem('session_id')
		}))
		.then(function(dataJson){
			let balance = dataJson.data.app_dc.king_token;
			_this.$store.state.balance_talk = balance.toFixed(2);

		})
		.catch(function(err){
			//alert(err);
		});
	}

	//视频
	axios.post(_this.$store.state.url_talk+'/news/banner','')
	.then(function(dataJson){
		_this.image = dataJson.data.picture;
		_this.iframeSrc = dataJson.data.url;
		_this.loginBoll = false;
	})
	.catch(function(err){
		//alert(err);
	});




  },
  methods: {
  	broadcastList_eve(key){
  		//红黑
  		/*
  		localStorage.setItem('is_follow',this.broadcastList[key].is_follow)
  		console.log(this.broadcastList[key].is_follow)
  		this.$router.push({ name: 'liveBroadcast',query: {cid:this.$store.state.cid_talk,dealerid:this.broadcastList[key].dealer_id,roomid:this.broadcastList[key].room_id}})
  		*/
  		if(this.broadcastList[key].room_type==2){
  			this.$router.push({ name: 'liveBroadcast',query: {
  				cid:this.$route.query.cid,
  				dealerid:this.broadcastList[key].dealer_id,
  				roomid:this.broadcastList[key].room_id,
  				roomType:this.broadcastList[key].room_type,
  				session_id:this.$route.query.session_id
  			}})
  		}
  		//抓娃娃
  		if(this.broadcastList[key].room_type==3){
	  		this.$router.push({ name: 'liveRoom',query: {
				cid:this.$route.query.cid,
				dealerid:this.broadcastList[key].dealer_id,
				roomid:this.broadcastList[key].room_id,
				roomType:this.broadcastList[key].room_type,
				session_id:this.$route.query.session_id,
				candy:this.$route.query.candy,
				product_schedule_id:this.broadcastList[key].product_id
			}})
  		}
  	},
  	operation_href(){
  		localStorage.setItem('is_follow',this.broadcastList[0].is_follow)
  		console.log(this.broadcastList[0].is_follow)
  		//localStorage.setItem('tutorials',0)
  		this.$router.push({
  			name: 'liveBroadcast',
  			query: {
  				cid:this.$route.query.cid,
  				dealerid:this.broadcastList[0].dealer_id,
  				roomid:this.broadcastList[0].room_id,
  				session_id:this.$route.query.session_id
  			}})
  	},
  	video_eve(){
  		this.iframeBoll = true;
  	},
  	removeIframe(){
  		window.location.reload();

  	},
  	sign_out(){
  		//退出删除所以存储数据
  		localStorage.clear();
		this.$router.push({ name: 'Hello'});
		window.location.reload();
  	},
  	language_select(){
  		if(parseInt(localStorage.getItem('language'))){
  			window.localStorage.setItem('language','0')
  		}else{
  			window.localStorage.setItem('language','1')
  		}
  		window.location.reload();
  	}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.btn_back{
	height: 34px;
	width: 34px;
	display: block;
}
.dc_css{
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}
.dc_css strong{
	margin: 0px 5px;
}
.headerImg{
	height: auto;
}

.broadcastBox{
	padding: 0px 3px;
	overflow: auto;
}
.broadcastList{
	background-color: #fff;
	margin:auto;
	margin-bottom: 5px;
}
.broadcastList div{
	padding:7px 0px;
}

.uesName{
	display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 13px;
}
.uesName img{
	border-radius: 50px;
    margin: 0px 5px;
}
.uesName strong{
	color:#E3B249;
}

.uesNumber strong{
	color:#BF9E67;
	font-size: 13px;
}
.uesNumber{
	text-align: center;
}
.uesNumber{
	font-size: 13px;
}


#my-video{
	width: 100%;
}
.explainPopup_iframe{
	width: 100%;
	height: auto;
	background: space;
	position: fixed;
    top: 50%;
    left: 50%;
    background-color: #fff;
    -webkit-transform: translateX(-50%) translateY(-50%);
    border-radius: 7px;
    z-index: 11;
    max-width: 570px;
    background: space;
}
.tipsRemove{
	position: absolute;
	top: 0px;
	right: 0px;
	z-index: 111;
}
.tipsRemove img{
	margin:13px;
}
.information_box a{
	margin-left: 7px;
}





.tips_title{
	font-size: 23px;
	height: 55px;
	line-height: 55px;
}
.transaction{
	padding: 0px 17px;
}
.operation p{
	width: 88%;
	margin: 13px auto;
	background:url('../assets/loading/btn_GetCod@2x.png');
	background-position: center center;
	background-size: 100% 100%;
	background-repeat: no-repeat;
	width: 130px;
	color: #000;
}

.recharge_tips{
    text-align: center;
    font-size: 15px;
    padding: 45px 9px;
    border: 1px solid #ccc;
    border-radius: 3px;
    background-color: #fff;
}
.productPopup h3{
	text-align: center;
	font-size: 20px;
	border-top-left-radius: 5px;
    border-top-right-radius: 5px;
}
.productPopup_tips{
	font-size: 15px;
}
.productPopup li{
	font-size: 14px;
}
.productPopup{
	width: 95%;
    height: auto;
    border-radius: 5px;
    background:url('../assets/loading/bg_Lpopup@2x.png');
	background-position: center center;
	background-size: 100% 100%;
	background-repeat: no-repeat;
}
.productBet{
	text-align: center;
	background-color: #39E5FB;
	height: 35px;
	line-height: 35px;
	border-radius: 3px;
	text-align: center;
	color: #fff;
	font-size: 15px;
	display: flex;
    justify-content: center;
    align-items: center;
}
.productBet img{
	margin: 0px 7px;
}



/*弹出边框*/
.popup_box{
	position: fixed;
	background-color: #fff;
	height: 100%;
	width: 210px;
	top: 0px;
	z-index: 1;
}
.popup_back{
	background-position: center center;
	background-repeat: no-repeat;
	height: 210px;
	box-shadow: 0px 8px 17px #514343;
	background-size: 100% 100%;
	background-position: 100% 100%;
}

.portrait_img{
	text-align: center;
}
.portrait_img img{
	border-radius: 50%;
	margin-top: 23px;
}
.portrait_img label{
	display: block;
	font-size: 15px;
	margin: 7px 0px;
}

/*列表选项*/
.navList li{
	display: flex;
    justify-content: baseline;
    align-items: center;
}
.navList img{
	margin: 0px 13px;
}
.navList span{
	margin: 7px 0px;
}


/*弹窗开发*/
.gamePlay{
	position: fixed;
    top: 50%;
    left: 50%;
    background-color: #fff;
    -webkit-transform: translateX(-50%) translateY(-50%);
    width: 90%;
    height: 83%;
    border-radius: 7px;
    z-index: 11;
    max-width: 570px;
}
.gamePlay h3{
	text-align: center;
	display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 11px 13px;
}

.gamePlay_text{
	padding: 0px 13px;
    height: 86%;
    overflow: auto;
    background: url(/static/img/bg_Lpopup@2x.ce8de66.png);
    background-position: center center;
    background-size: 100% 100%;
    background-repeat: no-repeat;
}
.gamePlay_text p{
    font-size: 12px;
    color: #444;
    line-height: 17px;
    margin-top: 17px;
}
.gamePlay_text span{
	font-size: 17px;
}
.gamePlay_text label{
	font-size: 12px;
}

#questions p{
	margin-top: 11px;
}
#questions li{
	border-bottom: 1px solid #fff;
	padding-bottom: 7px;
	margin-top: 7px;
}

.sign_out_box{
	position: absolute;
	bottom: 33px;
	width: 100%;
	text-align: center;
}
.sign_out_click{
	text-align: -webkit-left;
	margin-left: 17px;
	display: flex;
    justify-content: baseline;
    align-items: center;
}
.sign_out_click span{
	font-size: 17px;
	margin-left: 7px;
}
.sign_out_box p{
	font-size: 12px;
	color: #444;
}
.language_css{
	background: url(../assets/liveBroadcast/btn_Bullet-Screen@2x.png);
    background-position: center center;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    height: 20px;
    width: 43px;
    margin: auto;
    line-height: 20px;
    color: #fff;
}
.language_css span{
	font-size: 12px;
}


.language_css .hove{
	 color: #fff;
}


.slide-fade-enter-active {
  transition: all .8s ease;
}
.slide-fade-leave-active {
  transition: all .3s cubic-bezier(1.0,0.8,0.5,0.3);
}
.slide-fade-leave-to,.slide-fade-enter
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(100px);
  opacity: 0;
}
</style>
