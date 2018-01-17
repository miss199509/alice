<template>
	<div id="liveList_id">

	  <div class="liveList">

	    <header>
		    <ul class="headerNav">
				<li class="floatLeft">
					
					<router-link :to="{ name: 'Personal'}">
						<img width="23px;" src="../assets/liveBroadcast/icon_arrow@2x.png"/>
					</router-link>
				</li>
				<li style="display: inline-block;">
					<strong class="color_aimai">{{parseInt($store.state.language)?'Reload':'充值'}}</strong>
				</li>
				<li class="floatRight">
				</li>
		    </ul>
	    </header>


		
		<div class="shoppingl_global recharge">

			<div class="rechargeText">
				<p>
					<img width="20px;" src="../assets/liveBroadcast/dc_icons@2x.png"/>&nbsp;
					<strong class="color_aimai">{{balance}}.00</strong>
				</p>
				<p>
					<span>{{parseInt($store.state.language)?'as of 0 days':'距上次充值0天'}}</span>
					&nbsp;
					<img width="20px;" src="../assets/liveBroadcast/btnreload1i6.png"/>
				</p>
				<p class="">
					1&nbsp;
					<img width="17px;" src="../assets/liveBroadcast/dc_icons@2x.png"/>&nbsp;
					<strong>=￥1.00</strong>
				</p>
			</div>

			<div class="nav_recharge_box">
				<ul class="nav_recharge">
					
					<li>

						<span class="color_aimai">{{parseInt($store.state.language)?'Reload':'充值'}}</span>
						<input class="inputMye" type="text" v-model="num" placeholder="￥10" style="text-align:right" onkeyup="(this.v=function(){this.value=this.value.replace(/[^0-9-]+/,'');}).call(this)"/>
					
					</li>

					<router-link :to="{ name: 'Record'}">
						<li>
							<span>{{parseInt($store.state.language)?'Reload History':'充值记录'}}</span>
							<strong>
								<img width="23px" src="../assets/liveBroadcast/proceed_button.png"/>
							</strong>
						</li>
					</router-link>
				</ul>
			
				<div class="payment_select">
					<p>
						{{parseInt($store.state.language)?'Select Payment':'选择支付'}}
					</p>
					<div>
						<span>
							<img width="20px" src="../assets/liveBroadcast/btn_choose_click@2x.png"/>
							<img style="margin-left: 17px" width="35px" src="../assets/liveBroadcast/logo_wechat@2x_5.png"/>
						</span>
						<img width="23px" src="../assets/liveBroadcast/icon_arrow1.png"/>
					</div>

					<p id="paypal-button-container"></p>

				</div>
				
				<div id="reload">
					<div class="">
						<p class="email">
							<span>
								<label>{{parseInt($store.state.language)?'Email：':'邮箱：'}}</label>
								<input tyle="text" placeholder="Please enter your email address" v-model="email_val" v-if="$store.state.language"/>
								<input tyle="text" placeholder="请输入邮箱地址" v-model="email_val" v-else/>
							</span>
							<img @click="show_emailboll" width="23px;" src="../assets/liveBroadcast/btn_info@2x.png"/>
						</p>
						<p class="productBet" @click="payment()">{{parseInt($store.state.language)?'Reload':'充值'}}</p>
					</div>
				</div>
			</div>
			
			<!-- <div id="paypal-button-container"></div> -->
			<!-- <div id="paypal-button-container" @click="payment()"></div> -->
			<div id="boxPopup" style="z-index: 11" v-show="emailboll"></div>
			<div class="explainPopup productPopup" v-show="emailboll">
			  	<h3 class="tips_title color_aimai">
			  		<span></span>
			  		<strong>{{parseInt($store.state.language)?'Email':'邮箱'}}</strong>
			  		<img @click="hide_emailboll()" width="17px;" src="../assets/liveBroadcast/btn_close.png"/>
			  	</h3>
			  	<ul class="transaction">
					<li>
						<p class="recharge_tips color_aimai">
							
							{{parseInt($store.state.language)?'we need your email so we cansend you a confirmation of yourreload':'我们需要您的电子邮件，我们可以向您发送充值信息'}}
						</p>
					</li>
				</ul>
			</div>


		
		</div>



	  </div>
	
	</div>
</template>


<script>
import axios from 'axios'
import qs from 'qs'
//1购买2充值
/*
String url = ConfigModel.getInstance().current.mAppPrefix +"/order/register-paypal?cid=" + CustomerModel.getInstance().getOwner().mId + "&shippingaddressid="+addressId+"&cart_id=" +cartId+"&paymentform="+paymentform+"&sessionid="+CustomerModel.getInstance().getOwner().mSessionId;

final String url = ConfigModel.getInstance().current.mAppPrefix +"/wallet/prepay-paypal?cid=" + id + "&item=1&num=" +coins;
 */

export default {
  name: 'liveList',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      payment_list:[{'img':require('../assets/liveBroadcast/checkedi6.png'),'imgae':require('../assets/liveBroadcast/logopaypali6.png'),'bull':true}],
      num:10,
      idOrder:0,
      email_val:'',
      emailboll:false,
      balance:0
    }
  },
  created(){


    var _this = this;

  	paypal.Button.render({

		env: 'production', // sandbox | production

		// PayPal Client IDs - replace with your own
		// Create a PayPal app: https://developer.paypal.com/developer/applications/create
		client: {
			sandbox:    'AZDxjDScFpQtjWTOUtWKbyN_bDt4OgqaF4eYXlewfBP4-8aqX3PiV8e1GWU6liB2CUXlkA59kJXE7M6R',
            production: 'AUOchrKasN7XRn6Ik72IuhhjMQDI7swS_QsAMrLpuAkcqJ1T2vzw7piSOHWgn4WBR2s4vddu8ElXE2KK'
		},

		// Show the buyer a 'Pay Now' button in the checkout flow
		commit: true,

		// payment() is called when the button is clicked
		payment: function(data, actions) {

			// Make a call to the REST api to create the payment
			return actions.payment.create({
				payment: {
					transactions: [
						{
							amount: { total: _this.num, currency: 'USD' }
						}
					]
				}
			});
		},

		// onAuthorize() is called when the buyer approves the payment
		onAuthorize: function(data, actions) {

			// Make a call to the REST api to execute the payment
			return actions.payment.execute().then(function() {
				window.alert('Payment Complete!');
			});
		}

	}, '#paypal-button-container');


    //钱
    axios.post(_this.$store.state.url_talk+'/wallet/get-balance',qs.stringify({cid:_this.$store.state.cid_talk}))
	.then(function(dataJson){
		console.log(JSON.stringify(dataJson.data))
		_this.balance = dataJson.data.balance/100
		_this.$store.state.balance_talk = _this.balance.toFixed(2);

	})
	.catch(function(err){
		alert(err);
	});


  },
  methods: {
  	payment(){

  		let _this = this;
  		if(_this.email_val==''){
  			return false
  		}
  		//https://red.alice.live/wallet/weixin-deposit?cid=573&amount=0.1&sessionid=c6896215-c9d8-11e7-9d06-00163e01c7d0
  		axios.post(_this.$store.state.url_talk+'/wallet/weixin-deposit',qs.stringify({
	  		cid:localStorage.getItem('cid'),
	  		amount:'0.1',
	  		sessionid:localStorage.getItem('session_id')
	  	}))
		.then(function(dataJson){
			console.log(JSON.stringify(dataJson.data.data))

			function onBridgeReady(){
			   WeixinJSBridge.invoke(
			       'getBrandWCPayRequest', {
			           "appId":dataJson.data.data.appid,     //公众号名称，由商户传入     
			           "timeStamp":dataJson.data.data.timestamp,         //时间戳，自1970年以来的秒数     
			           "nonceStr":dataJson.data.data.noncestr, //随机串     
			           "package":'prepay_id='+dataJson.data.data.prepayid,     
			           "signType":"MD5",         //微信签名方式：     
			           "paySign":dataJson.data.data.sign //微信签名 
			       },
			       function(res){
			       		alert(res.err_msg)
			           if(res.err_msg == "get_brand_wcpay_request:ok" ) {

			           }     // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。 
			       }
			   ); 
			}
			if (typeof WeixinJSBridge == "undefined"){
			   if( document.addEventListener ){
			       document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
			   }else if (document.attachEvent){
			       document.attachEvent('WeixinJSBridgeReady', onBridgeReady); 
			       document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
			   }
			}else{
			   onBridgeReady();
			}



		})
		.catch(function(err){
			alert(err);
		});

  		return false;
  		//发送邮件
  		axios.post(_this.$store.state.url_talk+'/wallet/prepay-cloud-moolah',qs.stringify({
	  		cid:localStorage.getItem('cid'),
	  		email:_this.email_val,
	  		sessionid:localStorage.getItem('session_id')
	  	}))
		.then(function(dataJson){
			console.log(JSON.stringify(dataJson.data))
		})
		.catch(function(err){
			alert(err);
		});
		//充值
  		axios.post(_this.$store.state.url_talk+'/wallet/prepay-cloud-moolah',qs.stringify({
	  		cid:localStorage.getItem('cid'),
	  		item:1,
	  		num:_this.num*100,
	  		sessionid:localStorage.getItem('session_id')
	  	}))
		.then(function(dataJson){
			console.log(JSON.stringify(dataJson.data.data.Payment_URL))
			window.location.href = dataJson.data.data.Payment_URL; 

		})
		.catch(function(err){
			alert(err);
		});

  	},
  	show_emailboll(){
  		this.emailboll = true;
  	},
  	hide_emailboll(){
  		this.emailboll = false;
  	}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.rechargeText{
	height: 90px;
	text-align:center;
	padding: 45px 0px;
	margin: 45px 7px 0px 7px;
	background-color: #EFEFEF;
	border-radius: 3px;
}
.rechargeText p{
	display: flex;
	justify-content: center;
    align-items: center;
    margin-top: 7px;
    color: #ccc;
}
.rechargeText span{
	font-size: 12px;
	color: #ccc;
}

.nav_recharge_box{
	padding: 0px 7px;
}
.nav_recharge{
	background-color: #fff;
	padding: 0px 11px;
}
.nav_recharge li{
	height: 47px;
	line-height: 47px;
	border-top: 1px solid #ccc;
	display: flex;
	justify-content: space-between;
    align-items: center;
}
.inputMye{
	border: none;
	font-size: 18px;
	color: #E0B553;
}
.nav_recharge span{
	font-size: 15px;
}
.nav_recharge a span{
	color: #888;
}


#reload{
	position: absolute;
    width: 100%;
    bottom: 7px;
}


.payment_select{
	background-color: #fff;
	border-radius: 3px;
	margin: 9px 0px;
	padding: 5px 11px;
}
.payment_select p{
	border-bottom: 1px solid #ccc;
	padding: 7px 0px;
	font-size: 15px;
	color: #888;
}


.payment_select span{
	display: flex;
	justify-content: space-between;
    align-items: center;
}
.payment_select div{
	padding: 7px 0px;
	display: flex;
	justify-content: space-between;
    align-items: center;
}

.email{
	display: flex;
	justify-content: space-between;
    align-items: center;
    padding: 7px 7px;
    border-radius: 3px;
    background-color: #fff;
}
.email label{
	color: #888;
}
.email input{
	border: none;
	font-size: 15px;
}
.productBet{
	background:url('../assets/loading/btn_GetCod@2x.png');
	background-position: center center;
	background-size: 100% 100%;
	background-repeat: no-repeat;
	width: 130px;
	height: 37px;
	line-height: 37px;
	text-align: center;
	color: #fff;
	margin: 17px auto 0px auto;
}


.productPopup{
	height: auto;
    width: 85%;
    border-radius: 3px;
    padding: 10px 13px;
    background:url('../assets/liveBroadcast/bg_Spopup@2x@2x.png');
	background-position: center center;
	background-size: 100% 100%;
	background-repeat: no-repeat;
	padding-bottom: 31px;
}
.productPopup h3{
	display: flex;
	justify-content: space-between;
    align-items: center;
    padding-bottom: 11px;
    font-size: 17px;
    font-weight: 100;
}
.transaction li{
	border: 1px solid #ccc;
	border-radius: 3px;
	padding: 11px;
	background-color: #fff;
	padding-bottom: 88px;
}
</style>
