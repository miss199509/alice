<template>
  <div class="liveBroadcast">
	<header class="headerName">
		<b class="floatLeft" @click="liveListReturn()">
			<router-link :to="{ name: 'liveList'}">
				<img width="23px" src="../assets/liveBroadcast/icon_arrow@2x.png"/>
			</router-link>
		</b>

		<p class="vlewers">
			<b class="color_aimai">{{audience}} {{parseInt($store.state.language)?'viewers':'观看人数'}}</b>
			<!-- <span style="display: block;" class="color_aimai" v-if="$store.state.language">VLEWERS</span>
			<span style="display: block;" class="color_aimai" v-else>观众</span> -->
		</p>
		<router-link :to="{ name: 'Settlement'}">
			<span class="floatRight" id="shopping">
				<img width="30px" src="../assets/liveBroadcast/btn_cart@2x.png"/>
				<i class="tips" style="display: none;">
					2
				</i>
			</span>
		</router-link>
	</header>
	
	<!-- 视屏区 -->
	<div class="videoLocation" style="position: relative;">

		<div style="position: relative;">
	      <!-- <video :style="{ height: height + 'px' }" class="videoBox" width="100%" id="example_video_1" controls="controls" autoplay="autoplay" webkit-playsinline="true" preload="auto" x-webkit-airplay="true" playsinline>
	        <source src="http://push.alice.live/app/alice.m3u8" type="application/vnd.apple.mpegurl"/>
	        <source width="100%" src="http://www.zhangxinxu.com/study/media/cat.mp4" type='video/mp4'>
	        <p class="vjs-no-js">To view this video please enable JavaScript, and consider upgrading to a web browser that
	          <a href="http://videojs.com/html5-video-support/" target="_blank">supports HTML5 video</a>
	        </p>
	      </video> -->
	      <div :style="{ height: height_img + 'px' }" class="videoBox" width="100%" id="example_video_1">
			<img width="60px;" src="../assets/liveBroadcast/movie_star.png"/>
	      </div>
	    </div>
		<!-- <router-link :to="{ name: 'video'}"> -->
			<div @click="video_eve()" class="videoBox the_game" :style="{ height: height_img + 'px' }">
			</div>
		<!-- </router-link> -->

	</div>
	
	<!-- 交流区 -->
	<div class="">
	    <div class="">
			
			<ul id="follow">
				<li class="ues_portrait">
					<img ale="图片加载中" :src="dealer_portrait" width="40px" style="border-radius: 50px;" />
					<p>
						<label>{{dealer_name}}</label>
						<br/>
						<span @click="ues_portrait()" v-if="$store.state.language">{{new_portrait}}</span>
						<span @click="ues_portrait()" v-else>{{portrait}}</span>
					</p>
				</li>
				
				<li class="timerSetup">
					<span>{{timer}}</span>
					<p>
						<label class="color_aimai" v-if="$store.state.language">Bullet<br/>Screen</label>
						<label class="color_aimai" v-else>弹幕</label>
						<img width="33px;" src="../assets/liveBroadcast/btn_Bullet-Screen@2x.png"/>
					</p>
				</li>

			</ul>



			<div class="publish overflowRemove" style="padding:0px 7px;">
				<p class="">
					<img @click="giftPopup()" src="../assets/liveBroadcast/icon_gift@2x.png" width="33px" />
					<img @click="chatPopup()" src="../assets/liveBroadcast/icon_chat@2x.png" width="33px" />
				</p>
				<div>
					<h3 class="bet_tips">{{result}}</h3>
				</div>
			</div>


			<div class="" style="padding:0px 7px;">
			<ul class="commodityGive new_commodityGive">

				<li class="product_information">
					<div class="new_moneyGive">
						
						<div class="overflowRemove">
							<p class="moneyImg" @click="information()">
								
								<img class="this_money" :src='default_goods' width="80px" />
								<!-- <img class="this_money" src="../assets/liveBroadcast/iPhone-6+@2x.png" width="40px"/> -->

								<i>
									<img width="20px" src="../assets/liveBroadcast/btn_info@2x.png"/>
								</i>
							</p>

							<p class="product_priceBox">
								<em>￥{{parseFloat(gems/100).toFixed(2)}}</em>
								<strong>￥{{parseFloat(price/100).toFixed(2)}}</strong>
								<span>{{parseInt($store.state.language)?'PRICE NOW':'现在价格'}}</span>
							</p>
						</div>
					</div>
					

				</li>
				<li class="plus_money_box">
					<div class="plus_money">
						
						<div class="addMoney">
							<div>
								<p>
									<img @click="plus_money()" width="60px" src="../assets/liveBroadcast/icon_addbet.png" />
								</p>
								<input class="color_aimai" type='text' v-model="betVal"/>
								
								<h4>
									<span><img width="13px" src="../assets/liveBroadcast/dc_icons@2x.png"/>{{parseFloat(min_bet/100).toFixed(2)}}</span>
									<p>
										<span>{{parseInt($store.state.language)?'Min':'最低'}}</span>
									</p>
								</h4>

								<p>
									<img @click="reduce_money()" width="60px" src="../assets/liveBroadcast/icon_minusbet.png" />
								</p>
							</div>
						</div>
						
					</div>

					<div class="income">
						<p style="margin-bottom: 7px;">
							<strong class="color_aimai" style="font-size: 12px;">
								{{parseInt($store.state.language)?'INCOME':'总收入'}}
							</strong>
						</p>
						<p class="thisMoney_val" @click="pushMoney()">
							<img width="13px" src="../assets/liveBroadcast/dc_icons@2x.png"/>
							<strong>:{{parseFloat(bet/100).toFixed(2)}}</strong>
						</p>
						<p class="border"></p>
						<div class="recharge">
							<span class="color_aimai">{{parseInt($store.state.language)?'WALLET':'钱包'}}</span>
							<p class="">
								<img width="15px" src="../assets/liveBroadcast/dc_icons@2x.png"/>
								<strong>{{balance}}</strong><!-- {{parseFloat(balance/100).toFixed(2)}} -->
								<img @click="lade()" width="15px" src="../assets/liveBroadcast/icon_money@2x.png"/>
							</p>
						</div>
					</div>
					
				</li>
			</ul>
			</div>



	    </div>
	    <div class="">
			
			<div class="overflowRemove this_brand">

				<div class="contentCenter">
					<p class="ne_number_lamp">
						<label>{{parseInt($store.state.language)?'Hand':'牌'}}:</label>
						<strong>{{dealer_id}}</strong>
					</p>
					<span class="floatLeft">
						<img src="../assets/liveBroadcast/unknown_Card@2x.png" width="21px;" />
					</span>
					<div class="containerBox">
					    <div style="width:9999px;">
							<p class="floatLeft brandImage" v-for="(key,val) in brandData" :style="{backgroundImage: 'url(' + key.imgae + ')'}">
								<img :src='key.brandId' width="17px;"/>
								<img class="invalid" src="../assets/cards/missmask.png" width="20px;" v-show="key.boll"/>
							</p>
					    </div>
					</div>
				</div>

			</div>

	    </div>
    
		<div class="buttonPosition" v-show="popupJson.the_gamePopup">
			<ul class="this_state">
				<li class="this_stateA floatLeft" @click="bet_red()" :style="{backgroundImage: 'url(' + bet_red_type + ')'}">
					<span v-if="bet_red_values">
						<strong>{{parseInt($store.state.language)?'RED':'红'}}</strong>
					</span>
					<img v-else width="30px;" src="../assets/liveBroadcast/icon_confirmedcheckmark.png"/>
				</li>
				<li class="floatLeft bet_state">
					<img width="30px;" src="../assets/liveBroadcast/bg_red-loading@2x.png"/>
					<span :style="{backgroundImage: 'url(' + brandData_img.imgae + ')'}">
						<img width="50px;" :src="brandData_img.brandId"/>
					</span>
					<img width="33px;" src="../assets/liveBroadcast/bg_black-loading@2x.png"/>

				</li>
				<li class="this_stateB floatLeft" @click="bet_black()" :style="{backgroundImage: 'url(' + bet_black_type + ')'}">
					<span v-if="bet_black_values">
						<strong>{{parseInt($store.state.language)?'BLACK':'黑'}}</strong>
					</span>
					<img v-else width="30px;" src="../assets/liveBroadcast/icon_confirmedcheckmark.png"/>
				</li>
			</ul>
			
			<!-- 修改连胜提示 -->
			<ul class="the_gameStraight">
				<li :style="{backgroundImage: 'url(' + gameStraight_img + ')'}">
					<span class="color_aimai">1x</span>
					<span class="color_aimai">2x</span>
					<span class="color_aimai">3x</span>
				</li>
			</ul>
			
			<div id="prohibit" @click="prohibit_eve()" v-show="prohibit_boll"></div>
		</div>
	</div>

	<!-- 送礼选择框 -->
	<div id="boxPopup" v-show="popupJson.giftPopup" @click="gifts_box_eve()"></div>
	<div class="boxGifts gifts_box" v-show="popupJson.giftPopup">
		<!-- <div class="gifts_select">
			<ul class="">
				<li class="floatLeft" v-for="(val,key) in listGifts" @click="giftAdd(val,key)">
					<img :src="val.gifts_image" width="35px;" class="gifts_select_gift"/>
					<p>{{parseFloat(val.gifts_value/100).toFixed(2)}}<img width="15px;" src="../assets/liveBroadcast/dc_icons@2x.png"/></p>
				</li>
			</ul>
		</div>
		<p class="send_out overflowRemove">
			<span class="floatLeft">
				<img width="15px;" src="../assets/liveBroadcast/dc_icons@2x.png"/>{{balance}}
			</span>
			<span class="floatRight" @click="giftSend()">SEND</span>
		</p> 
		
		<li class="commodityCarousel">
				
				<div class="swiper-container" style="height: 200px">
					<div class="swiper-wrapper">
						<div class="swiper-slide" v-for="(val,key) in listImg"><img width="120px;" :src="val"/></div>
					</div>
					<div class="swiper-pagination"></div>
				</div>


			</li>

		-->
		<!-- <li class="commodityCarousel">
				
				<div class="swiper-container" style="height: 200px">
					<div class="swiper-wrapper">
						<div class="swiper-slide" v-for="(val,key) in listImg"><img width="120px;" :src="val"/></div>
					</div>
					<div class="swiper-pagination"></div>
				</div>


			</li> -->
		<div class="">
			<div class="swiper-container">
				<ul class="swiper-wrapper">
					<div class="swiper-slide">
						<li class="floatLeft swiper-slide gifts_content" v-for="(val,key) in aimai_gift" @click="gifts_content(val,key)">
							<p class="gifts_img">
								<span v-show="val.quantity > 0">{{val.quantity}}</span>
								<img width="45px;" height="45px;" :src="val.image" :class="{ giftsCss:val.boll}"/>
							</p>
							<p>
								<img width="13px;" src="../assets/liveBroadcast/dc_icons@2x.png"/>
								<span>{{parseFloat(val.price/100).toFixed(2)}}</span>
							</p>
						</li>
					</div>
				</ul>
				<div class="swiper-pagination"></div>
			</div>
		</div>
		<p style="border-top: 1px solid #fff;">
			<strong class="floatRight color_aimai" @click="give_eve()">{{parseInt($store.state.language)?'SEND':'发送'}}</strong>
		</p>
	</div>

	<!-- 聊天框 -->
	<div class="chatBox boxGifts" v-show="popupJson.chatPopup">
		<p>
			<input id="icon_chat" type="text" v-model="chatVal" @focus="chatBoxSubmit()"/>
			<!-- <label @click="chatBoxSubmit()">SEND</label> -->
		</p>
	</div>

	<!-- 购买礼物 -->
	<div id="boxPopup" v-show="gift_presentation"></div>
	<div class="explainPopup gift_presentation" v-show="gift_presentation">
		<h3>
			<strong class="color_aimai">{{parseInt($store.state.language)?'PRODUCT':'商品'}}</strong>
			<img width="20px" class="floatRight" @click="choice_class()" id="removePopup" src="../assets/liveBroadcast/btn_close.png"/>
		</h3>
		<ul>
			<li class="text_align product_purchase">
				<div>					
					<img width="70px" :src="give.image"/>
					<h4>{{give.en_name}}</h4>
				</div>
				<p>
					<img @click="addNumber()" width="55px" src="../assets/liveBroadcast/icon_addbet.png"/>
					<span class="color_aimai">{{number_int}}</span>
					<img @click="removeNumber()" width="55px" src="../assets/liveBroadcast/icon_minusbet.png"/>
				</p>
			</li>
			<li class="productNumber" v-show="gift_if_presentation">
				<span @click="productNumber_eve(val,key)" v-for="(val,key) in productNumber_list" :class="{ boll:val.boll}">{{val.text}}</span>
			</li>
			<li class="text_align choice_class" v-show="gift_if_presentation">
				<div class="overflowRemove" v-for="(val,key) in choice_list" @click="choice_eve(val,key)">
					<p class="piaochecked on_check" :class="{new_on_check:val.boll}">
						<input name="need_inv" type="checkbox" style="height:20px;width:20px;" class="radioclass input" value="1"/>
					</p>
					<label class="color_aimai">{{parseInt($store.state.language)?val.text_:val.text}}</label>
				</div>
			</li>
			<li>
			</li>
			<li class="product_purchase_button">
				<span class="productBet" @click="productBet_eve()">{{parseInt($store.state.language)?'BUY':'购买'}}</span>
			</li>
		</ul>
	</div>
	<!-- 购买礼物提示框 -->
	<div id="boxPopup" v-show="productPopup"></div>
	<div class="explainPopup productPopup" v-show="productPopup">
	  	<h3 class="tips_title">
	  		<span class="color_aimai">{{parseInt($store.state.language)?'Warning':'警告'}}</span>
	  	</h3>
	  	<div class="transaction_tips">
		  	<ul class="transaction">
				<li>
					<p class="productPopup_tips">
						<img width="17px;" src="../assets/liveBroadcast/dc_icons@2x.png"/>
						<strong class="color_aimai">{{parseFloat(give.price/100).toFixed(2)}}</strong>
						<span class="color_aimai">
							{{parseInt($store.state.language)?'will be deducted from your wallet right away. Please complete the process in the cart.':'将会在你的钱包中扣除。请完成购物车中的过程'}}
						</span>
					</p>
				</li>
				<li class="productPopup_list">
					<strong>{{parseInt($store.state.language)?'Wallet':'钱包'}}</strong>
					<p>
						<img width="17px;" src="../assets/liveBroadcast/dc_icons@2x.png"/>
						<span>{{parseFloat(gift_presentationJson.balance/100).toFixed(2)}}</span>
					</p>
				</li>
				<li class="productPopup_list">
					<strong>{{parseInt($store.state.language)?'Exchange':'交还'}}</strong>
					<p>
						<img width="17px;" src="../assets/liveBroadcast/dc_icons@2x.png"/>
						<span>{{parseFloat(gift_presentationJson.commodity_price/100).toFixed(2)}}</span>
					</p>
				</li>
				<li class="productPopup_list">
					<strong>{{parseInt($store.state.language)?'Wallet Balance':'钱包余额'}}</strong>
					<p>
						<img width="17px;" src="../assets/liveBroadcast/dc_icons@2x.png"/>
						<span>{{parseFloat(gift_presentationJson.surplus_price/100).toFixed(2)}}</span>
					</p>
				</li>
				<li class="operation">
					<p @click="cartSubmit()" class="productBet">
						{{parseInt($store.state.language)?'ACCEPT':'接受'}}
					</p>
					<p @click="remove_product_tips()" class="productBet">
						{{parseInt($store.state.language)?'CANCEL':'取消'}}
					</p>
				</li>
			</ul>
		</div>
	</div>

	<div id="boxPopup" v-show="recharge_boll" style="z-index: 11"></div>
	<div class="explainPopup productPopup" v-show="recharge_boll">
	  	<h3 class="tips_title">
	  		<span>{{parseInt($store.state.language)?'Prompt':'提示'}}</span>
	  		<img width="20px" @click="recharge_eve()" class="floatRight" id="removePopup" src="../assets/liveBroadcast/btn_close.png"/>
	  	</h3>
	  	<ul class="transaction">
			<li>
				<p class="text_align" style="margin: 33px 0px;">
					
					{{parseInt($store.state.language)?'Your wallet "s balance is not enough!':'您的余额不足！'}}
				</p>
			</li>
			<li class="operation">
				<router-link :to="{ name: 'Recharge'}">
					<p @click="cartSubmit()" class="productBet">
						<span>{{parseInt($store.state.language)?'Confirm':'充值'}}</span>
					</p>

				</router-link>
			</li>
		</ul>
	</div>
	
	<div id="boxPopup" v-show="straight_commodity_boll" style="z-index: 11"></div><!-- straight_commodity_boll -->
	<div class="explainPopup productPopup" v-show="straight_commodity_boll">
		<h3>
			<strong class="color_aimai">
				{{parseInt($store.state.language)?'Streak winning 3 innings':'连胜3局'}}！
			</strong>
			<img style="position: absolute;right: 7px;" class="floatRight" width="20px" src="../assets/liveBroadcast/btn_close.png" @click="remove_commodity_boll()"/>
			<p class="time_tips_img">
				<img width="20px;" src="../assets/liveBroadcast/icon_time@2x.png"/>
				<span>{{timer}}</span>
			</p>
		</h3>
		<div class="straight_commodity">
			<p>
				<img :src='default_goods' width="90px"/>
			</p>
			<div>
				<span>
					{{commodity_data_img.commodity_title}}
				</span>
				<p>
					<strong>
						${{parseFloat(commodity_data_img.commodity_price/100).toFixed(2)}}
					</strong>
				</p>
			</div>
		</div>
		<div class="straight_class">
			<h5 class="productBet" @click="straight_commodity_eve()">
				支付
			</h5>
		</div>
	</div>





	<!-- 详细商品信息 -->
	<div id="boxPopup" v-show="commodity_data_img.commodity_bull"></div>
	<div class="explainPopup product_back" v-show="commodity_data_img.commodity_bull">
		<h3 class="color_aimai">
			{{parseInt($store.state.language)?'PRODUCT INFO':'商品信息'}}
			<img width="20px" class="floatRight" @click="removePopup()" id="removePopup" src="../assets/liveBroadcast/btn_close.png"/>
		</h3>
		<ul>
			<li class="commodityCarousel">
				
				

				<swiper :options="swiperOption" style="height: 200px;">
				    <swiper-slide v-for="(val,key) in listImg">
						<img width="120px;" :src="val"/>
				    </swiper-slide>
				    <div class="swiper-pagination" slot="pagination"></div>
				</swiper>


			</li>
			<li>
				<h4>{{commodity_data_img.commodity_title}}</h4>
				<strong>零售：${{parseFloat(commodity_data_img.commodity_price/100).toFixed(2)}}</strong>
				<p :style="{ height: product_text_height + 'px' }">{{commodity_data_img.commodity_value}}</p>
			</li>
		</ul>
	</div>
	<div id="boxPopup" v-show="commodity_data_img.collect_splist"></div><!--commodity_bull-->
	<!-- 收集下注的钱 -->
	<div class="explainPopup collect" v-show="commodity_data_img.collect_splist">
		<h3>
			<strong class="color_aimai">{{parseInt($store.state.language)?'COLLECT':'收集'}}</strong>
			<img width="20px" class="floatRight" @click="collect_splist_eve()" id="removePopup" src="../assets/liveBroadcast/btn_close.png"/>
		</h3>
		
		<div class="">
			<p class="color_aimai">{{parseInt($store.state.language)?'Collect Winnings？':'收取赢得的钱？'}}</p>
			<p>
				<strong class="color_aimai">{{parseFloat(bet/100).toFixed(2)}}</strong>
			</p>
		</div>

		<p class="productBet collect_splist" @click="eve_splist()"><!--collect_splist-->
			<span>{{parseInt($store.state.language)?'CONFIRM':'确定'}}</span>
		</p>

	</div>


	<!-- 提示部分 -->
	<div class="training_room" v-show="training_boll">
		<img @click="tutorial_1()" v-show="training_list.tutorial_1" width="100%" src="../assets/liveBroadcast/tutorial_1.png"/>
		<img @click="tutorial_2()" v-show="training_list.tutorial_2" width="100%" src="../assets/liveBroadcast/tutorial_2.png"/>
		<img @click="tutorial_3()" v-show="training_list.tutorial_3" width="100%" src="../assets/liveBroadcast/tutorial_3.png"/>
	</div>

	
	







  </div>
</template>

<script>


import axios from 'axios'
import qs from 'qs'

import $ from 'jquery';

import Swiper from 'swiper';
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'

export default {
  components: {
    swiper,
    swiperSlide
  },
  name: 'liveBroadcast',
  data () {
    return {
      //轮播，
      swiperOption: {
	      pagination: {
	        el: '.swiper-pagination'
	      }
	  },
      //主播名称
      dealer_name:'',
      //主播头像
      dealer_portrait:require('../assets/liveBroadcast/avatar@2x.png'),
	  CMD_POKER_RB:22,//Poker Red & Black
	  CMD_POKER_RB_CARD:221,//Poker Red & Black CARDS
	  CMD_POKER_RB_PRODUCT:222,//Poker Red & Black PRODUCT
	  CMD_POKER_RB_BETTING:223,//Poker Red & Black BETTING
      msg: 'Welcome to Your Vue.js App',
      brandAttr:[],
      brandData:[],
      brandData_img:'',
      //礼物列表
      listGifts:[],
      //默认商品图片路径
      default_goods:require('../assets/liveBroadcast/iPhone-6+@2x.png'),
      //当前商品图片和文字信息
      commodity_data_img:{
      	commodity_id:'',
      	commodity_title:'',
      	commodity_value:'',
      	commodity_img:'',
      	commodity_price:'',
      	commodity_bull:false,
      	//下注提取
      	collect_splist:false
      },
      //聊天数据组
      chatData:[],
      //在线人数
      audience:0,
      //当前商品价格
      price:0,
      gems:0,
      //主播id
      dealer_id:0,
      //最小押注
      min_bet:0,
      //添加值
      addMoney:0,
      //下注默认值
      betVal:100,
      //最大押注
      max_bet:0,
      //请求地址
      WS_SERVER:'ws://red.alice.live:9001',
      //牌
      CMD_ACTION_CMDS:3,
      //倒计时时间
      timer:0,
      bet_red_type:require('../assets/liveBroadcast/btn_red@2x.png'),
      bet_red_values:true,
      bet_black_type:require('../assets/liveBroadcast/btn_black@2x.png'),
      bet_black_values:true,
      giftsData:{
      	//房间id:
      	roomId:'',
      	//发送者客户ID
      	fid:'',
      	//接收者客户ID
      	tid:'',
      	//礼物
      	gift:'',
      	//
      	lastTick:''
      },
      //聊天默认值
      chatVal:'',
      //礼物,聊天床,牌局
      popupJson:{
      	giftPopup:false,
      	chatPopup:false,
      	the_gamePopup:true
      },
      //钱包
      balance:0,
      //输赢结果
      result:'',
      //赢的钱
      bet:0,
      //关注
      portrait:'关注',
      new_portrait:'Follow',
      //商品图片信息
      listImg:[],
      //新手引导
      training_boll:false,
      training_list:{
      	tutorial_1:false,
      	tutorial_2:false,
      	tutorial_3:false,
      },
      //实体礼物
      gift_presentation:false,
      gift_if_presentation:true,
      //结算购买的钱数
      gift_presentationJson:{
      	commodity_price:0,
      	price:0,
      	surplus_price:0
      },
      aimai_gift:[],
      //发送礼物当前商品详情
      give:'',
      number_int:1,
      //支付弹窗
      productPopup:false,
      //余额不足需要充值
      recharge_boll:false,
      //
      choice_list:[{text:'寄送给主播',text_:'Ship to host',boll:true},{text:'寄送至另一个地址',text_:'Ship to a different address',boll:false}],
      //牌局
      prohibit_boll:false,
      //购买
      straight_commodity_boll:false,
      height_img:0,
      product_text_height:0,
      //修改连胜提示
      gameStraight_img:require('../assets/liveBroadcast/bg_win@2x.png'),
      productNumber_list:[
      	{text:66,boll:false},
      	{text:188,boll:false},
      	{text:520,boll:false},
      	{text:999,boll:false},
      	{text:1314,boll:false}
      ]
    }
  },
  mounted(){
  	

  	//弹幕
  	this.height_img = document.documentElement.clientHeight-393;
  	this.product_text_height = document.documentElement.clientHeight-406
  	console.log(parseInt(localStorage.getItem('tutorials')))
  	if(parseInt(localStorage.getItem('tutorials'))){
  		this.training_list.tutorial_1 = true;
  		this.training_boll = true;
  	};
  	
  	let _this = this
  	document.onkeydown=function(event){
		var e = event || window.event || arguments.callee.caller.arguments[0];
		if(e && e.keyCode==13){
			//提交
			//要做的事情
	  		if ("WebSocket" in window){
	           var ws = new WebSocket(_this.WS_SERVER);
				
	           ws.onopen = function(){
	              //Web Socket 已连接上，使用 send() 方法发送数据
	              if(_this.chatVal!==''){
		              var json = {"cmd":4,"cid":_this.giftsData.fid,"roomid":_this.giftsData.roomId,"type":1,"content":_this.chatVal}
		              ws.send(JSON.stringify(json));
		              //弹幕发言调用函数
		              _this.barrage(_this.chatVal,false);
		              console.log("数据发送中...");
		              _this.chatVal = '';
	              }
	           };

	           ws.onmessage = function (evt){
	              //console.log(evt.data)
	              let received_msg = JSON.parse(evt.data);
	              for(let key in received_msg.cmds){
	              	for(let val in received_msg.cmds[key].content){
	              		
	              		//console.log(document.getElementById("coordinate").innerHTML)
	              		
	              		_this.chatData.push({"uesName":received_msg.cmds[key].content[val].name,"content":received_msg.cmds[key].content[val].content,"image":""})

	              	}
	              }
	              console.log("数据已接收...");
	           };

	           ws.onclose = function(){ 
	              // 关闭 websocket
	              console.log("连接已关闭..."); 
	           };
	           _this.popupJson.chatPopup = false;
	        }else{
	           // 浏览器不支持 WebSocket
	           alert("您的浏览器不支持 WebSocket!");
	        }


		}
	};


  	// alert(document.body.clientHeight)
  	// alert(document.body.clientWidth)
  	
  	new Swiper('.swiper-container', {
		pagination: '.swiper-pagination',
		paginationClickable: true,
		observer:true,//修改swiper自己或子元素时，自动初始化swiper
		observeParents:true//修改swiper的父元素时，自动初始化swiper
	});



	//请求地址
	//this.WS_SERVER = 'ws://'+this.$store.state.url_talk+':9001',


  	this.betVal = parseFloat(this.betVal/100).toFixed(2)

  	this.HAND_SHAKE = JSON.stringify({"cmd":2,"cid":this.$route.query.cid,"roomId":this.$route.query.roomid,"roomType":2,'sessionId':localStorage.getItem('session_id')})
  	//var _this = this
  	//礼物
 	 axios.post(_this.$store.state.url_talk+'/gift/fetch-gifts',qs.stringify({cid:_this.$route.query.cid}))
	.then(function(dataJson){
		console.log(JSON.stringify(dataJson.data))
		_this.aimai_gift = dataJson.data.info;
		for(let id in _this.aimai_gift){
			_this.aimai_gift[id]['boll'] = false;
		}
	})
	.catch(function(err){
		alert(err);
	});
	
	//------------------------------------------------------------------

  	axios.post(_this.$store.state.url_talk+'/gift/get-gift','')
	.then(function(dataJson){
		for(let key in dataJson.data.info){
			//当前商品价格
			// /^[1-9]+[0-9]*]*$/
			//console.log(JSON.stringify(dataJson.data.info[key]))
			var number_money = dataJson.data.info[key].value
			var re = /^[1-9]+[0-9]*]*$/
			var bull = re.test(number_money)
			if(bull){
				number_money = dataJson.data.info[key].value
			}
			//console.log(JSON.stringify(dataJson.data.info[key].id))
			_this.listGifts.push({'gifts_value':number_money,'gifts_image':dataJson.data.info[key].image,'giftsBull':false,'id':dataJson.data.info[key].id,'sessionId':localStorage.getItem('session_id')})

		}
	})
	.catch(function(err){
		alert(err);
	});
	//关注
	localStorage.getItem('is_follow')==0?this.portrait = '关注':this.portrait = '取消关注';
	localStorage.getItem('is_follow')==0?this.new_portrait = 'Follow':this.new_portrait = 'unfollow';
	//进入房间
	// axios.post(_this.$store.state.url_talk+'/pokerrb/enter-room',qs.stringify({
	// 	cid:_this.$route.query.cid,
	// 	roomid:_this.$route.query.dealerid,
	// 	mode:1
	// }))
	// .then(function(dataJson){
	// 	console.log(JSON.stringify(dataJson.data.result))
	// 	alert(dataJson.data.result)
	// })
	// .catch(function(err){
	// 	alert(err);
	// });
	// 获取主播头像，名称
	axios.post(_this.$store.state.url_talk+'/lobby/get-room-list',qs.stringify({
  		room_type:2,
  		cid:_this.$store.state.cid_talk,
  		sessionId:localStorage.getItem('session_id')
  	}))
	.then(function(dataJson){
		for(let key in dataJson.data.info){
			if(dataJson.data.info[key].room_id==_this.$route.query.roomid){
				_this.dealer_name = dataJson.data.info[key].dealer_name;
				_this.dealer_portrait = dataJson.data.info[key].dealer_portrait;
			}
		}
	})
	.catch(function(err){
		alert(err);
	});



  	function WebSocketTest(){
	    if ("WebSocket" in window){
	       // 打开一个 web socket
	       var ws = new WebSocket(_this.WS_SERVER);
	       ws.onopen = function(){
	          // Web Socket 已连接上，使用 send() 方法发送数据
	          var json = {"cmd":2,"cid":_this.$route.query.cid,"roomId":_this.$route.query.roomid,"roomType":2,"lastTick":1501501004.2753,'sessionId':localStorage.getItem('session_id')};
	          //console.log(JSON.stringify(json))
              ws.send(JSON.stringify(json));


	          ws.send(_this.HAND_SHAKE);
	          console.log("数据发送中...");
	       };
			
	       ws.onmessage = function (evt) {
	          //console.log(evt.data)
	          var received_msg = JSON.parse(evt.data);
	          //发牌部分
	          if(received_msg.cmd==_this.CMD_ACTION_CMDS){
	          	for(let key in received_msg.cmds){
	          		
	          		//console.log(JSON.stringify(received_msg))

	          		//获取当前商品信息
	          		if(received_msg.cmds[key].id==222){
	          			//数据请求请求当前商品
	          			let eveData = received_msg.cmds[key].content.product_set_list[0].products[0].id
	          			axios.post(_this.$store.state.url_talk+'/products/get-product',qs.stringify({id:eveData}))
						.then(function(dataJson){
							//当前显示图片信息
							//console.log(JSON.stringify(dataJson.data))
							_this.commodity_data_img.commodity_id = dataJson.data.id;
							_this.commodity_data_img.commodity_title = dataJson.data.en_name;
							_this.commodity_data_img.commodity_value = dataJson.data.en_description;
							_this.commodity_data_img.commodity_price = dataJson.data.price;
							//console.log(JSON.stringify(dataJson.data))
							//显示商品信息图片
							_this.listImg = dataJson.data.images;
							_this.default_goods = dataJson.data.images[0]
						})
						.catch(function(err){
							alert(err);
						})
	          			//当前金额商品金额
	          			
	          			console.log(JSON.stringify(received_msg.cmds[key].content.current))

	          			for(let i in received_msg.cmds[key].content.current){
	          				_this.price = received_msg.cmds[key].content.current[i].price
	          				_this.gems = received_msg.cmds[key].content.current[i].original_price
	          			}
	          		}

	          		//获取牌局
	          		if(received_msg.cmds[key].id==221){
	          			//console.log(JSON.stringify(received_msg.cmds[key].content.cards))
	          			//声明一个数组
						_this.brandAttr = []
						_this.brandData = []
	          			for(var valIndex in received_msg.cmds[key].content.cards){
							//声明当前牌的数据
							let card = received_msg.cmds[key].content.cards[valIndex]
							//牌的颜色
							let cardColor = 1
							//无效牌
							let mask = 0;
							//背景类型
							let type = 0;
							//什么牌
							let value = 0;
							if(card>1000){
								//无效牌
								card = card-1000;
								//是否加上无效排
								mask = 1;
							}
							if(card>400) {
								type = 2;  //红心
								value = card%400;
							}
							else if(card>300) {
								type = 1;  //黑桃
								value = card%300;
								cardColor = 2;
							}
							else if(card>200) {
								type = 4;  //方块
								value = card%200;
							}
							else if(card>100) {
								type = 3;  //草花
								value = card%100;
								cardColor = 2;
							}
							if(value==1){
								type = 5;
							}
							//console.log(value)
							_this.brandAttr.unshift({
								'brandId':require('../assets/cards/cardfont_'+value+'_'+cardColor+'.png'),
								'imgae':require('../assets/cards/cardground_'+type+'.png'),'boll':mask
							})
	          			}

						//console.log(JSON.stringify(_this.brandData))
						//alert(JSON.stringify(_this.brandAttr[0]))
						_this.brandData_img = _this.brandAttr[0]
						for(let i = 0;i<_this.brandAttr.length && i<12;i++){
							if(i==0){
								continue;
							}
							_this.brandData.push(_this.brandAttr[i])
						}
	          		}
      				
      				//判断当前牌局输赢
      				//console.log(received_msg.cmds[key].id)
      				if(received_msg.cmds[key].id==1){
      					for(let content_id in received_msg.cmds[key].content){
      						if(received_msg.cmds[key].content[content_id].id==11){
      							let tipsText = _this.$store.state.language?'Win':'赢了';
      							_this.result = tipsText+parseFloat(received_msg.cmds[key].content[content_id].income/100).toFixed(2);//parseFloat(this.min_bet/100).toFixed(2);

      						}
      						if(received_msg.cmds[key].content[content_id].id==12){
      							let tipsText = _this.$store.state.language?'Lost':'输了';
      							_this.result = tipsText+parseFloat(received_msg.cmds[key].content[content_id].lose/100).toFixed(2);
      							//如果牌局输了就恢复选项
      							_this.bet_red_type = require('../assets/liveBroadcast/btn_red@2x.png');
      							_this.bet_red_values = true;
      							_this.bet_red_type = require('../assets/liveBroadcast/btn_black@2x.png');
      							_this.bet_black_values = true;
      						}

      					}
      				}
      				//获取当前钱包的数据
      				if(received_msg.cmds[key].id==223){
      					//赢的钱数
      					_this.bet = received_msg.cmds[key].content.bet
				      	//钱包的钱数
				      	_this.balance = parseFloat(received_msg.cmds[key].content.balance/100).toFixed(2) 
				      	//判断是否三省服务器传值%3如果等于0就是三胜
				      	//修改连胜提示
      					if(received_msg.cmds[key].content.win!==0){
	      					switch(received_msg.cmds[key].content.win%3){
	      						case 1:
	      							_this.gameStraight_img = require('../assets/liveBroadcast/bg_1win@2x.png');
	      							console.log(received_msg.cmds[key].content.win)

								  break;
								case 2:
									console.log(received_msg.cmds[key].content.win)
									_this.gameStraight_img = require('../assets/liveBroadcast/bg_2win@2x.png')
								  break;
								  //等于0就是三胜
								case 0:
									console.log(received_msg.cmds[key].content.win)
									_this.straight_commodity_boll = true;
									_this.gameStraight_img = require('../assets/liveBroadcast/bg_3win@2x.png')
									//alert('三胜了')
								  break;
	      					}
      					}else{
      						_this.gameStraight_img = require('../assets/liveBroadcast/bg_win@2x.png')
      					}
      				}

	          		//获取牌局更新时间
	          		if(received_msg.cmds[key].id==22){
	          			//当前房间ID
	          			_this.giftsData.roomId = received_msg.cmds[key].content.roomId;
	          			//接收者ID
	          			_this.giftsData.tid = received_msg.cmds[key].content.dealer_id;
	          			//发送者ID
	          			_this.giftsData.fid = received_msg.cid;
	          			//
						_this.giftsData.lastTick = received_msg.cmds[key].content.lastTick;
						//alert(_this.giftsData.lastTick)
						//console.log(_this.giftsData.fid,_this.giftsData.lastTick,_this.giftsData.tid,_this.giftsData.roomId)
	          			//当前牌局时间
	          			_this.timer = received_msg.cmds[key].content.coolDown
          				

	          			if(received_msg.cmds[key].content.coolDown==0){
	          				_this.prohibit_boll = true;
	          				_this.straight_commodity_boll = false;
	          			}else{
	          				_this.prohibit_boll = false;
	          			}
	          			//在线人数online
	          			_this.audience = received_msg.cmds[key].content.online;
	          			//主播id
	          			_this.dealer_id = received_msg.cmds[key].content.dealer_id;
	          			//最小押注
	          			//console.log(parseInt(_this.betVal*100),_this.min_bet)

	          			if(parseInt(_this.betVal*100)<_this.min_bet){
	          				_this.betVal = parseFloat(_this.min_bet/100).toFixed(2);
	          			};

	          			_this.min_bet = received_msg.cmds[key].content.min_bet;


	          			// if(parseFloat(_this.min_bet/100).toFixed(2)>_this.betVal && _this.timer==0){
	          			// 	_this.betVal = parseFloat(_this.min_bet/100).toFixed(2)
		          		// 	//alert(0)
	          			// }

	          			_this.addMoney = parseFloat(received_msg.cmds[key].content.min_bet/100).toFixed(2);
	          			//最大押注
	          			_this.max_bet = received_msg.cmds[key].content.max_bet;
	          		}

	          		//接收当前聊天数据
	          		if(received_msg.cmds[key].id==11){
	          			for(let content_id in received_msg.cmds[key].content){
	          				 _this.barrage(received_msg.cmds[key].content[content_id].content,false);

	          				_this.chatData.push({'uesName':received_msg.cmds[key].content[content_id].name,'content':received_msg.cmds[key].content[content_id].content,'image':''});

	          			}
	          		};
	          		if(received_msg.cmds[key].id==12){

	          			//console.log(JSON.stringify(received_msg.cmds[key].content))

	          			for(let image_id in received_msg.cmds[key].content){

	          				for(let this_img_id in _this.aimai_gift){

	          					//console.log(JSON.stringify( _this.aimai_gift));

	          					if(_this.aimai_gift[this_img_id].id==received_msg.cmds[key].content[image_id].gift){
	          						
	          						console.log(JSON.stringify(received_msg.cmds[key].content));
	          						_this.giftJquery_eve(received_msg.cmds[key].content[image_id].num,_this.aimai_gift[this_img_id].image)

	          						_this.barrage(received_msg.cmds[key].content[image_id].fromName,true,_this.aimai_gift[this_img_id].image,'x'+received_msg.cmds[key].content[image_id].num);

	          						_this.chatData.push({
	          							'uesName':received_msg.cmds[key].content[image_id].fromName,
	          							'content':'',
	          							'image':_this.aimai_gift[this_img_id].image
	          						});
	          					}
	          				}

	          			}
	          		}


	          	}
	          }
	          console.log("数据已接收...");
	       };
			
	       ws.onclose = function(e){ 
	          // 关闭 websocket
	          console.log("连接已关闭...");
	       };
	    }
	    else{
	       // 浏览器不支持 WebSocket
	       alert("您的浏览器不支持 WebSocket!");
	    }
	}
	WebSocketTest();




  },
  methods: {
  	//聊天 popupJson:{giftPopup:true,chatPopup:false,the_gamePopup:false},
  	chatPopup(){
  		if(this.popupJson.chatPopup){
  			this.popupJson.chatPopup = false;
  			//this.popupJson.the_gamePopup = true;
  		}else{
  			this.popupJson.chatPopup = true;
  			//this.popupJson.the_gamePopup = true;
  			this.popupJson.giftPopup = false;
  			//document.getElementById('icon_chat').focus();
  		}
  		this.$nextTick(function(){
  			if(this.popupJson.chatPopup){
  				document.getElementById('icon_chat').focus();
  			}
        })

  	},
  	//礼物
  	giftPopup(){
  		let _this = this;
  		axios.post(_this.$store.state.url_talk+'/gift/fetch-gifts',qs.stringify({cid:_this.$route.query.cid}))
		.then(function(dataJson){
			console.log(JSON.stringify(dataJson.data))
			_this.aimai_gift = dataJson.data.info;
			for(let id in _this.aimai_gift){
				_this.aimai_gift[id]['boll'] = false;
			}


		})
		.catch(function(err){
			alert(err);
		});



  		if(this.popupJson.giftPopup){
  			this.popupJson.giftPopup = false;
  			//this.popupJson.the_gamePopup = true;
  		}else{
  			this.popupJson.chatPopup = false;
  			//this.popupJson.the_gamePopup = false;
  			this.popupJson.giftPopup = true;
  		}
  	},
  	gifts_content(val,key){
  		this.number_int = 1;
  		for(let index in this.aimai_gift){
  			this.aimai_gift[index].boll = false;
  		}
  		val.boll = true;

  	},
  	gifts_box_eve(){
  		this.popupJson.giftPopup = false;
  	},
  	//发送礼物
  	give_eve(){
  		for(let key in this.aimai_gift){
  			if(this.aimai_gift[key].boll){
  				this.give = this.aimai_gift[key]
  				this.gift_presentation = true;
  				this.gift_if_presentation = true;
  				if(this.give.quantity<=0){
  					return false;
  				};
  				this.gift_if_presentation = false;
  				//this.giftSend();
  				//this.popupJson.giftPopup = false;
  			}
  		}
  		//console.log(JSON.stringify(this.give))
  	},
  	removeNumber(){
  		if(this.number_int<=1){
  			return false
  		};
  		this.number_int-=1;
  	},
  	productNumber_eve(val,key){
  		for(let i in this.productNumber_list){
  			this.productNumber_list[i].boll = false;
  		}
  		val.boll = true;
  		this.number_int = val.text;
  	},
  	addNumber(){
  		if(!this.gift_if_presentation){
  			for(let i = 0;i<this.aimai_gift.length;i++){
  				if(this.aimai_gift[i].boll){
  					if(this.number_int>=this.aimai_gift[i].quantity){
  						return false;
  					}
  				}
  			}
  		}
  		this.number_int+=1;
  	},
  	collect_splist_eve(){
  		this.commodity_data_img.collect_splist = false;
  	},
  	recharge_eve(){
  		this.recharge_boll = false;
  	},
  	//去支付
  	productBet_eve(){
  		if(!this.gift_if_presentation){
  			let _this = this;
  			this.giftSend(_this.number_int);
  			return false;
  		}
  		this.productPopup = true;
  		this.gift_presentation = false;
  		//支付数据
	    this.gift_presentationJson.commodity_price = this.number_int*this.give.price;
	    this.gift_presentationJson.balance = parseInt(this.balance)*100;
	    this.gift_presentationJson.surplus_price = this.gift_presentationJson.balance-this.gift_presentationJson.commodity_price;
  	},
  	choice_eve(val,key){
  		for(let id in this.choice_list){
  			this.choice_list[id].boll = false;
  		}
  		val.boll = true;
  	},
  	//接受购买
  	cartSubmit(){
  		let _this = this;
  		//判断是否送给主播
  		if(this.choice_list[1].boll){
  			//console.log(JSON.stringify(_this.give))
  			axios.post(_this.$store.state.url_talk+'/cart/add-shop-cart',qs.stringify({
	  			cid:_this.$route.query.cid,
	  			product_id:_this.give.id,
	  			amount:_this.number_int,
	  			price:_this.give.price,
	  			size:'',
	  			sessionid:localStorage.getItem('session_id')
	  		}))
			.then(function(dataJson){
				console.log(JSON.stringify(dataJson.data))
				if(dataJson.data.result==1){
					_this.$router.push({ name: 'Settlement'})
				}
				if(dataJson.data.result==2){
					alert(dataJson.data.message)
				}
			})
			.catch(function(err){
				alert(err);
			});

  			return false;
  		};
  		if(this.gift_presentationJson.surplus_price<0){
  			this.recharge_boll = true;
  			return false;
  		};
  		///gift/gift-buy
  		axios.post(_this.$store.state.url_talk+'/gift/gift-buy',qs.stringify({
  			cid:_this.$route.query.cid,
  			gid:_this.give.id,
  			type:'gift',
  			quantity:_this.number_int,
  			sessionid:localStorage.getItem('session_id')
  		}))
		.then(function(dataJson){
			console.log(JSON.stringify(dataJson.data))
			if(dataJson.data.status){
				console.log(JSON.stringify(dataJson.data.status));
				_this.productPopup = false;
				_this.giftPopup();
				_this.popupJson.giftPopup = true;
			}
		})
		.catch(function(err){
			alert(err);
		});



  	},
  	remove_product_tips(){
  		 this.productPopup = false;
  	},
  	choice_class(){
  		 this.gift_presentation = false;
  	},
  	//下注加价
  	plus_money(){
  		//console.log(this.max_bet,this.betVal*100)
  		if(this.max_bet<=this.betVal*100){
  			return false
  		}
  		let int_betVal = parseInt(this.betVal);
  		let intResult = int_betVal+=1;
  		this.betVal = parseFloat(intResult).toFixed(2);

  	},
  	//下注减价
  	reduce_money(){
  		
  		console.log(this.min_bet,this.betVal*100)
  		if(this.min_bet>=this.betVal*100-100){
  			console.log('下注最低不能低于'+this.min_bet)
  			this.betVal = parseFloat(this.min_bet/100).toFixed(2);
  			return false
  		}

  		let int_betVal = parseInt(this.betVal);
  		let intResult = int_betVal-=1;
  		this.betVal = parseFloat(intResult).toFixed(2);

  	},
  	prohibit_eve(){

  	},
  	remove_commodity_boll(){
  		this.straight_commodity_boll = false;
  		this.gameStraight_img = require('../assets/liveBroadcast/bg_win@2x.png');
  		this.bet_red_values = true;
  		this.bet_black_values = true;
  		this.result = '';
  	},
  	//三连胜调用加入购物车接口
  	straight_commodity_eve(){
  		let _this = this;
  		axios.post(_this.$store.state.url_talk+'/pokerrb/add-to-cart',qs.stringify({
  			cid:_this.$route.query.cid,
  			roomid:_this.$route.query.roomid,
  			productid:_this.commodity_data_img.commodity_id,
  			sessionid:localStorage.getItem('session_id')
  		}))
		.then(function(dataJson){
			if(dataJson.data.result){
				_this.$router.push({ name: 'Settlement'})
				_this.straight_commodity_boll = false;
			}else{
				alert(JSON.stringify(dataJson.data.message))
			}
		})
		.catch(function(err){
			alert(err);
		});

  		
  	},
  	//下注押红
  	bet_red(){
  		if(this.balance<0){
  			this.result = '您的金额不足请去充值'
  			return false;
  		};
  		this.$store.state.language?this.result = this.result ="You've Guessed on Red":this.result = "您已选择红";

  		this.bet_red_values = false;
  		this.bet_black_values = true;
  		//选择牌局 红
  		/*
	  		cmd = 6
			roomid = 房间ID
			cid = 客户ID
			color = 下注颜色 0为黑 1为红
			bet = 下注数量
  		*/
  		let _this = this
  		if ("WebSocket" in window){
           var ws = new WebSocket(_this.WS_SERVER);
           ws.onopen = function(){
              //Web Socket 已连接上，使用 send() 方法发送数据
              var json = {"cmd":6,"roomid":_this.giftsData.roomId,"cid":_this.giftsData.fid,"color":0,"bet":Math.ceil(_this.betVal*100)}
              //console.log(JSON.stringify(json))
              ws.send(JSON.stringify(json));
              console.log("数据发送中...");
           };

           ws.onmessage = function (evt){
           		console.log(JSON.stringify(evt.data))
           		console.log("数据已接收...");

           };

           ws.onclose = function(){ 
              // 关闭 websocket
              console.log("连接已关闭..."); 
           };
        }else{
           // 浏览器不支持 WebSocket
           alert("您的浏览器不支持 WebSocket!");
        }



  	},
  	//下注押黑
  	bet_black(){
  		if(this.balance<0){
  			this.result = '您的金额不足请去充值'
  			return false;
  		};
  		this.$store.state.language?this.result = this.result ="You've Guessed on Black":this.result = "您已选择黑";

  		this.bet_black_values = false;
  		this.bet_red_values = true;

  		let _this = this
  		if ("WebSocket" in window){
           var ws = new WebSocket(_this.WS_SERVER);
           ws.onopen = function(){
              //Web Socket 已连接上，使用 send() 方法发送数据
              var json = {"cmd":6,"roomid":_this.giftsData.roomId,"cid":_this.giftsData.fid,"color":1,"bet":_this.betVal*100}
              console.log(JSON.stringify(json))
              ws.send(JSON.stringify(json));
              console.log("数据发送中...");
           };

           ws.onmessage = function (evt){
           		console.log(JSON.stringify(evt.data))
           		console.log(0)
           		console.log("数据已接收...");

           };

           ws.onclose = function(){ 
              // 关闭 websocket
              console.log("连接已关闭..."); 
           };
        }else{
           // 浏览器不支持 WebSocket
           alert("您的浏览器不支持 WebSocket!");
        }


  	},
  	//收集钱
  	pushMoney(){
  		//判断钱包里面是否有钱
  		if(this.bet==0){
  		 	return false
  		};
  		this.commodity_data_img.collect_splist = true;

  	},
  	//确认收款
  	eve_splist(){
  		let _this = this;
  		axios.post(_this.$store.state.url_talk+'/pokerrb/cash-out',qs.stringify({
	  		cid:_this.$route.query.cid,
	  		roomid:_this.$route.query.roomid,
	  		sessionId:localStorage.getItem('session_id')
	  	}))
		.then(function(dataJson){
			console.log(JSON.stringify(dataJson.data))
			if(dataJson.data.result){
				_this.result = ''
				_this.commodity_data_img.collect_splist = false;
				_this.bet_red_values = true;
  				_this.bet_black_values = true;
			}

		})
		.catch(function(err){
			alert(err);
		});
  	},
  	//详细商品信息
  	information(){
  		this.commodity_data_img.commodity_bull = true
  	},
  	//隐藏弹窗
  	removePopup:function(){
  		this.commodity_data_img.commodity_bull = false
  		this.commodity_data_img.collect_splist = false
  	},
  	//礼物选中
  	giftAdd(val,key){
  		for(let bull in this.listGifts){
  			this.listGifts[bull].giftsBull = false;
  		}
  		this.listGifts[key].giftsBull = true;
  	},
  	//提交礼物信息
  	giftSend(num){
  		var _this = this;
  		for(let key in this.listGifts){
  			if(this.listGifts[key].giftsBull){
  				this.gift = this.listGifts[key].id
  			}
  		}
  		
        if ("WebSocket" in window){
           var ws = new WebSocket(_this.WS_SERVER);
			
           ws.onopen = function(){
              //Web Socket 已连接上，使用 send() 方法发送数据
              var json = {"cmd":5,"roomid":_this.giftsData.roomId,"fid":_this.giftsData.fid,"tid":_this.giftsData.tid,"gift":_this.give.id,"num":num}
              console.log(JSON.stringify(json))
              ws.send(JSON.stringify(json));
              console.log("数据发送中...");
           };

           ws.onmessage = function (evt){
           	  //console.log(evt.data)
              var received_msg = JSON.parse(evt.data);
              if(received_msg.cmd==5){
              	for(let id in received_msg.cmds){
              		if(received_msg.cmds[id].id==12){
              			//console.log(JSON.stringify(received_msg.cmds[id].content))
              			for(let thisId in received_msg.cmds[id].content){
              				//console.log(received_msg.cmds[id].content[thisId].fromName)
              				//发送礼物成功
              				if(received_msg.result){
              					_this.gift_presentation = false;
              					_this.popupJson.giftPopup = false;

              					_this.barrage(received_msg.cmds[id].content[thisId].fromName,true,_this.give.image,'x'+num);
              					//礼物掉落
              					_this.giftJquery_eve(num,_this.give.image);

              					_this.chatData.push({
              						"uesName":received_msg.cmds[id].content[thisId].fromName,
              						"content":"",
              						"image":_this.give.image
              					})
              				}
              			}
              		}
              	}
              }
              console.log("数据已接收...");
           };

           ws.onclose = function(){ 
              // 关闭 websocket
              console.log("连接已关闭..."); 
           };
        }else{
           // 浏览器不支持 WebSocket
           alert("您的浏览器不支持 WebSocket!");
        }



  	},
  	//聊天框失去焦点
  	chatBoxSubmit(){
  		//this.popupJson.chatPopup = false;
  	},
  	//退出关闭
  	liveListReturn(){
		ws.onclose = function(){ 
			// 关闭 websocket
			console.log("连接已关闭...");
		};
  	},
  	//关注
  	ues_portrait(){

  		let _this = this
  		if(_this.portrait == '关注' || _this.new_portrait=='Follow'){
  			axios.post(_this.$store.state.url_talk+'/customer/follow-dealer',qs.stringify({cid:_this.$route.query.cid,dealerid:_this.$route.query.dealerid}))
			.then(function(dataJson){
				_this.portrait = '取消关注'
				_this.new_portrait = 'unfollow';
				localStorage.setItem('is_follow',1)
			})
			.catch(function(err){
				alert(err);
			});
  		}else{
  			axios.post(_this.$store.state.url_talk+'/customer/cancel-follow-dealer',qs.stringify({cid:_this.$route.query.cid,dealerid:_this.$route.query.dealerid}))
			.then(function(dataJson){
				_this.portrait = '关注'
				_this.new_portrait = 'Follow'
				localStorage.setItem('is_follow',0)
			})
			.catch(function(err){
				alert(err);
			});
  		}
 

  	},
  	//jquery
  	barrage(text,boll,image,image_num){
  		var $value=text;
		
		var $p=$("<p></p>");
		
		$p.text($value);
		if(boll){
			var $a = $("<img width='30px' src='"+image+"'/><span>"+image_num+"</span>")

			$p.append($a);
		}
		
		var _top=Math.floor(Math.random()*($(".the_game").innerHeight()-30));
		
		var _fontsize=9+Math.floor(Math.random()*10);
		
		var _rgb="rgb(" + Math.floor(Math.random()*255)+"," + Math.floor(Math.random()*255)+"," + Math.floor(Math.random()*255)+")"; 
		var _width = document.documentElement.clientWidth;
		$p.css({
			"top":_top+"px",
			"font-size":_fontsize+"px",
			"color":_rgb,
			"height":"30px",
			"line-height":"30px",
			"position":"absolute",
			"left":_width+"px",
			"white-space":"nowrap"
		});
	 
		
		$(".the_game").append($p);
		
		var _timer=Math.ceil(Math.random()*4000)+3000;
		$p.stop().animate({"left":"-500px"},_timer,function(){
			$(this).remove();
		}); 

  	},
  	//jquery
  	giftJquery_eve(num,image){
  		for(let i = 0;i<num;i++){
			var img_top=Math.floor(Math.random()*($("body").width()-30));
			let $img = $("<img width='30px' src="+image+">");
			$img.css({
				'position':'absolute',
				'top':'-'+i*30+'px',
				'left':img_top+'px'
			})
			$('body').append($img);
			$img.stop().animate({'top':$("body").height()+'px'},3000+i*30+30,function(){
				$(this).remove();
			})
		}
  	},
  	//跳转到视频页面
  	video_eve(){
  		this.$router.push({ name: 'video'});
  		window.location.reload();
  	},
  	//跳转充值
  	lade(){
  		this.$router.push({ name: 'Recharge'})
  		window.location.reload();
  	},
  	tutorial_1(){
  		this.training_list.tutorial_1 = false;
  		this.training_list.tutorial_2 = true;
  	},
  	tutorial_2(){
  		this.training_list.tutorial_2 = false;
  		this.training_list.tutorial_3 = true;
  	},
  	tutorial_3(){
  		this.training_list.tutorial_3 = false;
  		this.training_boll = false;
  		let _this = this;
		axios.post(_this.$store.state.url_talk+'/customer/finish-novice-guide',qs.stringify({
	  		cid:_this.$route.query.cid,
	  	}))
		.then(function(dataJson){
			if(dataJson.data.result){
  				localStorage.setItem('tutorials',0);
			}
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
/*新手房间*/
.training_room{
	position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 111;
    overflow: hidden;
}


.liveBroadcast{
    background-image: url('../assets/liveBroadcast/bg@2x.png');
    background-position: center center;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    max-width: 600px;
    min-height: 100%;
    width: 100%;




}
.headerName{
	text-align: center;
	color: #fff;
	padding: 0px 13px;
	height: 6.5%;
	display: flex;
    justify-content: space-between;
    align-items: center;
    max-height: 37px;
}
.headerName p{
	display: inline-block;
}
.vlewers b{
	font-size: 16px;
}
.vlewers span{
	font-size: 11px;
}
.tips{
	font-size: 12px;
    background-color: #F00508;
    display: inline-block;
    height: 17px;
    width: 17px;
    border-radius: 50px;
    line-height: 17px;
    position: absolute;
    top: 0px;
    right: -3px;
    font-style:normal
}
#shopping{
	position: relative;
}
#follow{
	display: flex;
    justify-content: space-between;
    align-items: center;
    background:url('../assets/liveBroadcast/bg_SeekBar_grayline@2x.png');
	background-position: center center;
	background-size: 100% 100%;
	background-repeat: no-repeat;
	padding: 2px 7px;

}
.portrait{
	margin:-5px 5px 0px 5px;
}
.ues_portrait{
	color:#fff;
	font-size: 12px;
}
.ues_portrait span{
	background-image: url('../assets/loading/btn_GetCod@2x.png');
	background-position: center center;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    display: inline-block;
    height: 18px;
    line-height: 18px;
    width: 70px;
    color: #000;
    font-size: 12px;
    margin: 4px 0px;
    border-radius: 5px;
}
/*视频部分*/
.videoBox{
	height: 160px;
	position: relative;
}
#example_video_1{
	background-image: url('../assets/liveBroadcast/movie.jpg');
    background-position: center center;
    background-size: 100% 100%;
    background-repeat: no-repeat;
}

#example_video_1 img{
	position: absolute;
	top: 50%;
	left: 50%;
	transform : translate(-50%,-50%);
}

.brandImage{
	background-position: center center;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    margin-left: 5px;
    width: 23px;
    text-align: center;
    position: relative;
}
.shopping_buttom{
	position: absolute;
    width: 100%;
    bottom: 0px;
}
.race_lamp{
	color:#BB9E9C;
	font-size: 13px;
	background-color: #000;
	padding: 5px 0px;
	opacity: .2;
}
/*翻牌*/
.this_brand{
	padding: 0px 7px;
	color: #fff;
}
.number_lamp{
	margin: 3px 0px;
	text-shadow: #000 1px 1px 1px;
	font-size: 15px;
}
.this_brand b{
	font-size: 30px;
	position: absolute;
	right: 0px;
	text-shadow: #ada530 1px 1px 1px;
	z-index: 1;
	color: #FFEF02;
}
.containerBox{
	overflow-x:auto;
	overflow-y:hidden;
	width: 70%;
}
.contentCenter{
	display: flex;
    align-items: center;
    position: relative;
}
.contentCenter span{
	margin-top: 5px;
}
/*交流区*/
.communication ul{
	width: 50%;
}
.communication{
	position: relative;
	margin-bottom: 7px;
}
.publish{
	margin-top: 16px;
	display: flex;
    justify-content: space-between;
    align-items: center;

}
.publish p{
	display: flex;
    justify-content: space-between;
    align-items: center;
}


.publish img{
}






.textRelease{
	height: 190px;
	padding: 0px 7px;
	font-size: 13px;
	font-weight: bold;
	/*position: relative;*/
	overflow: auto;

}
.textRelease p span{
	/*display: flex;
    justify-content: flex-start;
    align-items: center;
    height: 30px;
    line-height: 30px;*/
    color: #fff;
}
.textRelease p{
	display: flex;
    justify-content: flex-start;
    align-items: center;
}



.commodityGive{
	background-color: #fff;
	border-radius: 5px;
}
.moneyGive{
	background-color: #eee;
	padding: 1px 9px;
	position: relative;
}
.moneyGive em{
	color: #AFB0B4;
	font-size: 12px;
	text-decoration:line-through;
}
.moneyGive strong{
	color:#E9808E;
	font-size: 17px;
}
.moneyGive span{
	font-size: 13px;
}

.moneyImg{
	margin-right: 13px;
	position: relative;
}
.moneyImg i img{
	position: absolute;
	top: 5px;
    left: 0px;
}
.this_money{
	margin-top: 13px;
}

/*.plus_moneyA{
	background-image: url('../assets/liveBroadcast/btnbetn.png');
    background-position: center center;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    padding: 3px 5px;
}*/
.plus_money{
	display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 3px;
	background-color: #eee;
}
.plus_money input{
	width: 60px;
	outline:none;
	font-size: 17px;
	font-weight: bold;
    border: none;
    text-indent: 7px;
    text-align: center;
    background-color: #eee;
 }

 .border{
 	margin:5px 0px;
 	background-color: #E4E4E4;
 	height: 1px;
 }

 .addMoney{
    font-size: 12px;
    color: #ccc;
    text-align: center;
    width: 100%;
 }
 .addMoney div{
    background-color: #eee;
 }
 /*总收入*/
 .income{
 	padding: 1px 7px 0px 7px;
	background: #E6E6E6;
	border-radius: 3px;
 }
 .income p{
    text-align: center;
    font-size: 12px;
 }
 .thisMoney_val{
	background-image: url('../assets/loading/btn_GetCod@2x.png');
	background-position: center center;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    height: 25px;
    line-height: 25px;
    width: 68px;
    color: #000;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
 }
 .thisMoney_val strong{
 	font-size: 12px;
 	font-weight: 100;
 }


.recharge{
	font-size: 13px;
	text-align:center;
}

.recharge span{
	font-size: 12px;
}
.recharge p{
	display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 5px;
}
.recharge strong{
	margin:0px 5px;
	color: #777;
	font-size: 12px;
}

.buttonPosition{
	background-position: center center;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    width: 100%;
    padding: 3px 0px 1px 0px;
    position: relative;
    border-radius: 5px;
}
/*.buttonPosition p{
	background-position: center center;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-color: #D6D6D6;
    height: 27px;
    width: 95%;
    margin:6px auto;
    line-height: 27px;
    text-align: center;
	border-radius: 5px;
	margin-bottom: 9px;
	font-size: 13px;
	color: #9a8080;
}*/


.this_state{
	display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0px 9px;
}
.this_stateA{
	/*background-image: url('../assets/liveBroadcast/btn_red@2x.png');*/
	background-position: center center;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    height: 50px;
    width: 60px;
}
.this_stateB{
	/*background-image: url('../assets/liveBroadcast/btn_black@2x.png');*/
	background-position: center center;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    
    position: relative;
    
}
.this_stateA,.this_stateB{
	color: #fff;
	text-align: center;
	display: flex;
    justify-content: center;
    align-items: center;
    height: 80px;
    width: 80px;
}



/*当前详细商品信息*/
.explainPopup h3{
	text-align: center;
	padding: 13px 0px;
	border-top-left-radius: 7px;
    border-top-right-radius: 7px;
}

.explainPopup ul{
	padding: 13px 23px;
}
.explainPopup h4{
	font-size: 17px;
	margin-top: 23px;
}
.explainPopup p{
	font-size: 13px;
	margin-top: 11px;
	overflow: auto;
}
.commodityCarousel{
	border: 2px solid #E6E6E6;
    border-radius: 3px;
}
/**/
.product_purchase{
	border:1px solid #ccc;
	border-radius: 3px;
	display: flex;
    justify-content: center;
    align-items: center;
    padding: 7px 0px 7px 0px;
    background-color: #fff;
}
.product_purchase div{
   	padding: 0px 8px 0px 8px;
}
.product_purchase p img,.product_purchase p span{
	display: block;
}
.product_purchase p span{
	height: 70px;
	line-height: 70px;
	font-size: 23px;
}
.product_purchase h4{
	margin: 0px;
}
.product_purchase p{
	margin: 0px;
	text-align: center;
	overflow: visible;
	background-color: #eee;
}

.product_purchase_button span{
	display: block;
	width: 130px;
	margin: 13px auto 0px auto;
	text-align: center;
}

.productNumber{
	display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 17px;
}
.productNumber span{
    border-radius: 50%;
    border: 2px solid #ccc;
    height: 35px;
    line-height: 35px;
    width: 35px;
    text-align: center;
    font-size: 15px;
    margin: 0px 7px;
    background-color: #fff;
}
.productNumber .boll{
	color: #fff;
	background-color: #E0B553;
}

.transaction_tips{
	padding: 5px 20px;
}
.transaction_tips .transaction{
	border-radius: 3px;
	border:1px solid #ccc;
	background-color: #fff;
}

.collect{
	height: auto;
	background-image: url('../assets/loading/bg_Lpopup@2x.png');
	background-position: center center;
    background-size: 100% 100%;
    background-repeat: no-repeat;
}
.collect div{
	width: 80%;
    margin: auto;
    border: 1px solid #ccc;
    border-radius: 3px;
    background: #fff;
}
.collect p{
	margin: 23px auto;
	text-align: center;
}
.collect strong{
	font-size: 23px;
}
/*收集钱包的按钮*/
.collect .collect_splist{
	width:130px;
}


/*送礼*/
.boxGifts{
	/*position: absolute;
	bottom: 0px;*/
	background-color: #eee;
	width: 100%;
}

.send_out{
	padding: 7px 13px;
    background: #ccc;
}
.gifts_select{
	overflow-x: auto;
    overflow-y: hidden;
    width: 100%;
    padding: 3px 0px;
}
.gifts_select ul{
	width: 9999px;
}
.gifts_select li{
	text-align: center;
	margin-left: 13px;
}
.gifts_select p{
	font-size: 12px;
	display: flex;
    justify-content: center;
    align-items: center;
}
/* 聊天 */
.chatBox{
    position: absolute;
    bottom: 0px;
}

.chatBox input{
	width: 100%;
    height: 27px;
    line-height: 27px;
    border:none;
    text-indent: 7px;
}

/*无效牌*/
.invalid{
	position: absolute;
	left: 0px;
}







/*轮播*/
.swiper-container {
    width: 100%;
    height: 100%;
}
.swiper-slide {
    text-align: center;
    font-size: 18px;

    /* Center slide text vertically */
    display: -webkit-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    -webkit-align-items: center;
    align-items: center;
}

/*房间*/
#tutorial_1{
	height: 55px;
    width: 55px;
    border: 2px solid #FF7737;
    position: absolute;
    right: -7px;
    bottom: 0px;
    border-radius: 3px;
    z-index: 1111;
}

/*送礼*/
.gifts_box{
	
	background-image: url('../assets/loading/bg@2x.png');
	background-position: center center;
    background-size: 100% 100%;
    background-repeat: no-repeat;

	width: 90%;
	padding: 7px 13px;
	margin:auto;
	border-radius: 5px;
	position: fixed;
    bottom: 9px;
    left: 50%;
    background-color: #fff;
    -webkit-transform: translateX(-50%) translateY(0%);
    z-index: 1;
}
.gifts_content{
	width: 70px;
	height: 80px;
}
.gifts_box ul{
	height: 170px;
}
.gifts_box .swiper-slide{
	display: block;
	background:content-box;
	/*background-color: #fff;*/
}
/*{
	background: aquamarine;
    height: auto;
}*/
.gifts_content span{
	font-size: 12px;
}
.gifts_box strong{
	height: 25px;
	line-height: 25px;
	width: 90px;
	text-align: center;
	margin-top: 7px;
	font-size: 12px;
	font-weight: 100;
	border-radius: 3px;
	background-image: url('../assets/loading/btn_GetCod@2x.png');
	background-position: center center;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    color: #000;
}
.gifts_img{
	position: relative;
}
.gifts_img img{
	padding: 2px;
}
.gifts_img span{
	width: 23px;
    height: 23px;
    line-height: 23px;
	border-radius: 50%;
	background-color: #ef7c2a;
	color: #fff;
	position: absolute;
	font-size: 12px;
}
.giftsCss{
	
	border-radius: 5px;
	box-shadow: 2px 3px 1px #777;
}
/*购买礼物*/
.gift_presentation{
	height: auto;
	background-image: url('../assets/loading/bg_Lpopup@2x.png');
	background-position: center center;
    background-size: 100% 100%;
    background-repeat: no-repeat;
}

.addPrice{
	display: flex;
    justify-content: center;
    align-items: center;
    margin: 13px 0px;
}
.addPrice strong{
    font-size: 18px;
    margin: 0px 13px;
    background: #eee;
    padding: 0px 33px;
}

.productBet{
	/*text-align: center;
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
    box-shadow: 0px 5px 3px #0270C7;*/
    background-image: url('../assets/loading/btn_GetCod@2x.png');
	background-position: center center;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    height: 37px;
    line-height: 37px;
}
/*购买付钱*/
.productPopup{
	height: auto;
	background-image: url('../assets/loading/bg_Lpopup@2x.png');
	background-position: center center;
    background-size: 100% 100%;
    background-repeat: no-repeat;
}
.productPopup h3{
	text-align: center;
	font-size: 17px;
	border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    position: relative;
    background-color: #eee;
}
.productPopup_tips{
	font-size: 15px;
}
.productPopup .productPopup_list{
	margin: 0px;
	display: flex;
    justify-content: space-between;
    align-items: baseline;
}
.productPopup li{
	font-size: 14px;
	margin: 13px 0px;
}
.operation p{
    width: 130px;
    margin: 13px auto;
    text-align: center;
    color: #fff;
    font-size: 15px;
}
/*礼物选择样式*/
.piaochecked {
	width: 20px;
	height: 20px;
	float: left;
	cursor: pointer;
	margin-left: 10px;
	text-align: center;
	background-image: url('http://www.haorooms.com/uploads/images/checkbox_01.gif');
	background-repeat: no-repeat;
	background-position: 0px -21px;
}

.on_check {
	background-position: 0px 0px;
}
.new_on_check{
	background-position: 0px -21px;
}
.radioclass {
	opacity: 0;
	cursor: pointer;
	-ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
	filter: alpha(opacity=0);
}
.choice_class{
	margin: 17px 0px;
}
.choice_class div{
	display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    margin:7px auto;
}
.choice_class label{
	margin-left: 13px;
	font-size: 13px;
}
.choice_class p{
	margin: 0px;
	overflow: visible;
}
#prohibit{
	position: absolute;
	width: 100%;
	background: #000;
	top: 0px;
	height: 100%;
	overflow: 0.6;
	opacity: .1;
	border-radius: 5px;
}
/*三连胜*/
.straight_commodity{
	display: flex;
    justify-content: center;
    align-items: center;
    padding: 23px 0px;
    background-color: #F2F3EE;
	border-top: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
}
.straight_commodity span{
	font-size: 20px;
}
.straight_commodity p{
	margin:13px 0px;
	overflow: visible;
}
.straight_commodity div{
	margin-left: 7px;
}
.straight_commodity strong{
    font-size: 17px;
    color: #fff;
    background: #E0B553;
    padding: 1px 11px;
    border-radius: 20px;
}
.straight_class{
	text-align: center;
	margin: 23px;
}
.straight_class p{
	color: #ccc;
	font-size: 13px;
}
.straight_class strong{
	font-size: 23px;
	color:#CC3A2E;
	display: block;
	margin:7px;
}
.the_game{
	position: absolute;
	width: 100%;
	top: 0px;
}
.the_game span{
	color: #fff;
	position: absolute;
	right: 0px;
}


/**/
.product_back{
	background:url('../assets/loading/bg_Lpopup@2x.png');
	background-position: center center;
	background-size: 100% 100%;
	background-repeat: no-repeat;
}
/*修改连胜提示*/
.the_gameStraight{
	background:url('../assets/liveBroadcast/bg_win@2x.png');
	background-position: center center;
	background-size: 100% 100%;
	background-repeat: no-repeat;
	height: 25px;
	width: 100%;
}
.the_gameStraight li{
	
	background:url('../assets/liveBroadcast/bg_win@2x.png');
	background-position: center center;
	background-size: 100% 100%;
	background-repeat: no-repeat;

	display: flex;
    justify-content: space-around;
    align-items: center;
    font-size: 12px;
    height: 100%;
}


.bet_state{
	display: flex;
    justify-content: space-around;
    align-items: center;
}
.bet_state span{
	background-position: center center;
	background-size: 100% 100%;
	background-repeat: no-repeat;
	width: 50px;
	display: inline-block;
	margin: 0px 15px;
}
.this_stateA{
	color: #FD2F29;
}
.this_stateB{
	color: #636363;
}
/*牌的排列*/
.ne_number_lamp{
	margin-right: 5px;
}
.ne_number_lamp label{
	font-size: 15px;
	color: #A08947;
}
.ne_number_lamp strong{
	color: #1C1305;
	font-size: 15px;
}
.new_commodityGive{
	display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0px 2px;
    margin: 5px 0px;
}
.product_information{
	display: flex;
    justify-content: space-around;
    align-items: center;
}
.new_moneyGive div{
	display: flex;
    justify-content: space-around;
    align-items: center;
}
.addMoney h4 span{
	font-size: 12px;
}
.product_priceBox em{
	font-size: 13px;
	color: #C9C9C9;
}
.product_priceBox strong{
	background-color: #E4C77B;
	color: #E73537;
	font-size: 13px;
	padding: 1px 7px;
	border-radius: 20px;
	margin: 7px 0px;
	display: block;
}
.product_priceBox span{
	font-size: 13px;
}
.plus_money_box{
	display: flex;
    justify-content: space-around;
    align-items: center;
}
.bet_tips{
	width: 100%;
	text-align: center;
	font-weight: 100;
	font-size: 15px;
	
	background: #000;
    opacity: 0.3;
    color: #fff;

	background:url('../assets/liveBroadcast/bg_SeekBar_grayline@2x.png');
	background-position: center center;
	background-size: 100% 100%;
	background-repeat: no-repeat;

	height: 25px;
    line-height: 25px;
    border-radius: 3px;
    font-size: 13px;
}
.publish div{
	width: 100%;
}

.timerSetup span{
	background:url('../assets/liveBroadcast/icon_countdown@2x.png');
	background-position: center center;
	background-size: 100% 100%;
	background-repeat: no-repeat;

	width: 35px;
    height: 40px;
    text-align: center;
    line-height: 40px;
    margin-right: 7px;
    color: #30E23B;
    font-weight: bold;
    font-size: 21px;
}
.timerSetup{
	display: flex;
    justify-content: space-around;
    align-items: center;
}
.timerSetup p{
	text-align: center;
}
.timerSetup label{
	font-size: 12px;
	display: block;
}
.ues_portrait{
	display: flex;
    justify-content: space-around;
    align-items: center;
}
.ues_portrait p{
	text-align: center;
	margin-left: 7px;
}
.ues_portrait label{
	font-size: 14px;
	color: #E0B553;
}


/*三胜礼物*/
.time_tips_img{
	display: flex;
    justify-content: center;
    align-items: center;
}
.time_tips_img span{
	color:#DC414C;
	font-size: 21px;
	margin: 0px 5px;
}
</style>
