<template>
  <div class="hello" id="loading">
    <!--<h1>{{ msg }}</h1>-->
    <p class="loading_log">
      <img src="https://resource.bluecandy.io/wawaImg/loading/logo_luckyLive@2x.png" width="175px;"/>
    </P>
	<ul class="land_input" style="display: none;">
		<li>
			<input type="text" placeholder="请输入邮件"/>
		</li>
		<li>
			<input type="password" placeholder="请输入密码"/>
		</li>

		<li @click="land()" style="display: none;">
			<a href="javascript:;">
				<img src="https://resource.bluecandy.io/wawaImg/loading/btn_phone@2x.png" width="200px;" height="47px;"/>
			</a>
		</li>
	
	</ul>
	<ul class="land_bott" style="display: none;">
		<li>
			<a href="javascript:;">登陆</a>
		</li>
		<li>
			<a href="javascript:;" @click="mailbox_boll = !mailbox_boll">注册</a>
		</li>
	</ul>
	<!-- 底部文字说明 -->
	<div class="loadingExplain">
		<div class="">
			<p class="playing">Start playing with</p>
			<img v-show="language" @click="loginFacebook()" width="27px;" src="https://resource.bluecandy.io/wawaImg/loading/btn_Lfacebook@2x.png"/>
			<img @click="wechat()" width="27px;" src="https://resource.bluecandy.io/wawaImg/loading/btn_weixin1@2x.png" style="display: none;"/>
			<img @click="land()" width="27px;" src="https://resource.bluecandy.io/wawaImg/loading/btn_phone.png"/>
		</div>
		<div class="loading_tips">
			<p>login means you agree</p>
			<h3 @click="explainPopup = !explainPopup">Terms of Use, Privacy Policy</h3>
			<p>版本 0.0.1</p>
		</div>
	</div>
	
	<!-- 邮箱注册 -->
	<div class="mailbox_register" v-show="mailbox_boll">
		<div class="mailbox_box">
			<h4>
				<span></span>
				<span>注册</span>
				<img width="27px;" @click="mailbox_boll = !mailbox_boll" src="https://resource.bluecandy.io/wawaImg/loading/btn_close@2x.png"/>
			</h4>
			<ul class="register_list">
				<li>
					<label>昵称:</label>
					<input type="text">
				</li>
				<li>
					<label>邮箱:</label>
					<input type="text">
				</li>
				<li>
					<label>密码:</label>
					<input type="password" placeholder="密码必须由6-12位数字+字母组成">
				</li>
				<li style="border: none;">
					<label>确认密码:</label>
					<input type="password">
				</li>
			</ul>
		</div>
		<p class="mailbox_register_login" @click="email_register()">
			注册
		</p>
	</div>


	<!-- 显示定位图片 -->
	<div class="explainPopup" v-show="explainPopup">
		<h3>隐私协议</h3>
		<img @click="explainPopup = !explainPopup" id="removePopup" src="https://resource.bluecandy.io/wawaImg/loading/btn_close@2x.png"/>
		<div class="explainPopup_text">
			<p>Released on May 22, 2017.</p>
			<p>At Lucky Live we recognize that privacy is significant. This Privacy Policy ("Policy") applies to your use of the Lucky Live application and its services on all platforms (the "Product").</p>
			<p>
				Lucky Live ("us" or "we") has created this Policy to explain our privacy practices so you will understand what information about you is collected, and how it is used and disclosed. We collect information from you in order to provide corresponding service and better user experience. With your consent of this Privacy Policy, your usage, statistics, input while using Lucky Live also will be collected. By using our Product you understand and agree that we are providing a platform for you to post content, including photos, voices, comments and other materials ("User Content"), to the Product and to share User Content publicly.
			</p>
			<h4>A. WHAT KIND OF INFORMATION WE COLLECT?</h4>
			<p>
				Registration Information and Profiles. Lucky Live will allow the end user to use your mobile number or a third party platform account to register in the Product and create an account. When you create an account, we may collect the personal information you provide to Lucky Live, such as your name, gender, date of birth, username, password, email address, picture, or phone number and so on. We also collect the information from the third party account which can be used to identify you
			</p>
		</div>
	</div>
	
	<div class="boxPopup" v-show="explainPopup"></div>
	<div class="boxPopup" v-show="mailbox_boll"></div>

  </div>
</template>

<script>

import axios from 'axios'
import qs from 'qs'


//定义1是游客登陆2是facebook登陆3是谷歌登陆

export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      explainPopup:false,
      auth2:'',
      mailbox_boll:false,
      language:0
    }
  },
  mounted(){
  	let _this = this;
  	this.language = parseInt(this.$route.query.language);
  	if(_this.language){
		window.fbAsyncInit = function() {
		    FB.init({
		      appId      : '1475634259145456',
		      cookie     : true,  // enable cookies to allow the server to access 
		                          // the session
		      xfbml      : true,  // parse social plugins on this page
		      version    : 'v2.8' // use graph api version 2.8
		    });
		};

		// Load the SDK asynchronously
		(function(d, s, id) {
		    var js, fjs = d.getElementsByTagName(s)[0];
		    if (d.getElementById(id)) return;
		    js = d.createElement(s); js.id = id;
		    js.src = "https://connect.facebook.net/en_US/sdk.js";
		    fjs.parentNode.insertBefore(js, fjs);
		}(document, 'script', 'facebook-jssdk'));
	}



  },
  methods:{
    land(){
    	//清空本地数据
    	//localStorage.clear();

    	let access_token = localStorage.getItem('access_token');
    	let session_id = localStorage.getItem('session_id');
    	let id = localStorage.getItem('cid');
    	let portrait = localStorage.getItem('portrait');
    	let nickname = localStorage.getItem('nickname');
    	let tutorials = localStorage.getItem('tutorials');
    	let training_room = localStorage.getItem('training_room');
    	localStorage.setItem('language',1)
    	
    	
	    let _this = this;
	    //判断是否有本地存储数据
    	if(access_token==null || session_id==null || id==null || portrait==null || nickname==null || tutorials==null || training_room==null){
	  		axios.post(_this.$store.state.url_talk+'/customer/login-guest','')
			.then(function(dataJson){
				console.log('无')
				//console.log(JSON.stringify(dataJson.data))
				//_this.$store.state.cid_talk = dataJson.data.id;
				//如果没有本地存储的值，就写本地存储
				localStorage.setItem('access_token',dataJson.data.access_token)
				localStorage.setItem('session_id',dataJson.data.session_id)
				localStorage.setItem('cid',dataJson.data.id)
				localStorage.setItem('portrait',dataJson.data.portrait)
				localStorage.setItem('nickname',dataJson.data.nickname)
				localStorage.setItem('tutorials',dataJson.data.tutorials)
				localStorage.setItem('training_room',dataJson.data.training_room)
				_this.$router.push({ name: 'liveList',query:{cid:dataJson.data.id,session_id:dataJson.data.session_id}})
				window.location.reload();
			})
			.catch(function(err){
				alert(err);
			});
    	}else{
	    	//如果有本地存储的值就取本地存储的值去请求
	    	axios.post(_this.$store.state.url_talk+'/customer/login-guest',qs.stringify({accesstoken:access_token,sessionId:session_id}))
			.then(function(dataJson){
				console.log('有')
				console.log(JSON.stringify(dataJson.data))
				//_this.$store.state.cid_talk = dataJson.data.id;
				// localStorage.setItem('access_token',dataJson.data.access_token)
				// localStorage.setItem('session_id',dataJson.data.session_id)
				// localStorage.setItem('cid',dataJson.data.id)
				// localStorage.setItem('portrait',dataJson.data.portrait)
				// localStorage.setItem('nickname',dataJson.data.nickname)
				_this.$router.push({ name: 'liveList',query:{cid:dataJson.data.id,session_id:dataJson.data.session_id}})
				window.location.reload();
			})
			.catch(function(err){
				alert(err);
			});
			
		}

    },
    //邮箱注册
    email_register(){

    	let _this = this;
    	axios.post(_this.$store.state.url_talk+'/customer/email-register',qs.stringify({
    		nickname:'talk',
			email:'915666241@qq.com',
			password:'talk199509.',
			confirm:'talk199509.',
    	}))
		.then(function(dataJson){
			console.log(dataJson.data)
		})
		.catch(function(err){
			alert(err);
		});
    },
    //微信登陆
    wechat(){
    	let _this = this;
    	axios.post(_this.$store.state.url_talk+'/customer/login-wechat',qs.stringify({
    		uuid:''
    	}))
		.then(function(dataJson){
			console.log(dataJson.data)
		})
		.catch(function(err){
			alert(err);
		});
    },


    //facebook登陆
    statusChangeCallback(response){
    	let _this = this;
    	//console.log('statusChangeCallback');
    	console.log(0)
	    console.log(JSON.stringify(response));
	    if (typeof(response)=='string') {
		    _this.loginFacebook_eve(response);
        }



	    // The response object is returned with a status field that lets the
	    // app know the current login status of the person.
	    // Full docs on the response object can be found in the documentation
	    // for FB.getLoginStatus().
	    if (response.status === 'connected') {
	      // Logged into your app and Facebook.
	      _this.testAPI(response.authResponse.accessToken);
	    } else {
	      // The person is not logged into your app or we are unable to tell.
	      //document.getElementById('status').innerHTML = 'Please log ' +
	        //'into this app.';
	    }
    },
    checkLoginState() {
    	let _this = this;
	    FB.getLoginStatus(function(response) {
	      _this.statusChangeCallback(response.authResponse.accessToken);
	    });
	},
	testAPI(accessToken) {
		let _this = this;
	    //console.log('Welcome!  Fetching your information.... ');
	    FB.api('/me', function(response) {
	      //console.log('Successful login for: ' + response);
	      console.log(1)
	      console.log(accessToken)
	      console.log(JSON.stringify(response))
	      _this.loginFacebook_eve(accessToken);

	      //document.getElementById('status').innerHTML =
	        //'Thanks for logging in, ' + response.name + '!';
	    });
	},
	loginFacebook(){
		let _this = this;
		FB.login(function(response) {
			_this.checkLoginState()
		}, {scope: 'public_profile,email'});
	},
	loginFacebook_eve(accesstoken){
		let _this = this;
		axios.post(_this.$store.state.url_talk+'/customer/login-facebook',qs.stringify({accesstoken:accesstoken}))
        .then(function(dataJson){
          console.log(JSON.stringify(dataJson.data))

          localStorage.setItem('access_token',dataJson.data.open_access_token)
          localStorage.setItem('session_id',dataJson.data.session_id)
          localStorage.setItem('cid',dataJson.data.cid)
          //用户头像
          localStorage.setItem('portrait',dataJson.data.portrait)
          //用户名称
          localStorage.setItem('nickname',dataJson.data.nickname)
          localStorage.setItem('platform_id',2)
          localStorage.setItem('tutorials',dataJson.data.tutorials)
          //跳转
          _this.$router.push({ name: 'liveList'})
          window.location.reload();
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
#loading{
	background-color: #464646;
	background:url('https://resource.bluecandy.io/wawaImg/loading/bg@2x.png');
	background-position: center center;
	background-size: 100% 100%;
	background-repeat: no-repeat;
	height: 100%;
    position: absolute;
    max-width: 600px;
    width: 100%;
}
.loading_log{
	text-align: center;
	margin:0px auto;
	padding: 47px 0px;
}

.land_bott{
	margin-top: 23px;
}
.land_bott li{
	text-align: center;
	margin: 11px 0px;
}
.land_bott a{
	color:#454545;
	display: inline-block;
	background-color: #E9C97D;
	width: 137px;
	height: 33px;
	line-height: 33px;
	font-size: 15px;
	border-radius: 5px;
}


.land_input li{
	text-align: center;
	margin: 11px 0px;
}
.land_input input{
	border: none;
	width:75%;
	margin: auto;
	background-color: #000;
	opacity: 0.3;
	font-size: 15px;
	padding: 7px 15px;
	border-radius: 3px;
	color:#ccc;
	font-weight: bold;
}
.loading_tips{
	background-color: #000;
	color:#d1d1d1;
	opacity: 0.3;
	height: 100%;
	padding: 3px 0px;
}


.loadingExplain{
	text-align: center;
	position: absolute;
	width: 100%;
	bottom: 0px;
	font-size: 13px;
}
.loadingExplain .playing{
	color:#a0a0a0;
	margin: 7px 0px;
}
.loadingExplain p{
	color:#d1d1d1;
}
.loadingExplain h3{
	margin: 5px 0px;
	color:#d1d1d1;
}




/**/

.explainPopup h3{
	text-align: center;
    color: #fff;
    font-size: 19px;
    padding: 11px 0px;
    position: relative;
    color:#e3b249;
    font-weight: 100;
}


.explainPopup_text{    
	padding: 0px 13px;
	height: 86%;
    overflow: auto;
    background:url('https://resource.bluecandy.io/wawaImg/loading/bg_Lpopup@2x.png');
	background-position: center center;
	background-size: 100% 100%;
	background-repeat: no-repeat;

}
.explainPopup_text h4{
	color:#1D1D28;
}
.explainPopup_text p{
	margin: 10px 0px;
	font-size: 14px;
	color:#1D1D26;
}
.explainPopup_text h4{
	font-size: 14px;
}
/*弹窗口*/


/*邮箱注册*/
.mailbox_register{
	background:url('https://resource.bluecandy.io/wawaImg/loading/bg_Lpopup@2x.png');
	background-position: center center;
	background-size: 100% 100%;
	background-repeat: no-repeat;

	position: fixed;
    top: 50%;
    left: 50%;
    -webkit-transform: translateX(-50%) translateY(-50%);
    border-radius: 3px;
    width: 97%;
    max-width: 570px;
    z-index: 2
}
.mailbox_box{
    padding: 0px 11px;
    border-radius: 3px;
}
.mailbox_register h4{
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 7px 0px;
}
.mailbox_register span{
	color:#E3B249;
	font-size: 20px;
	font-weight: 100;
}

.register_list{
	background-color: #fff;
    border: 1px solid #E3E3E6;
    border-radius: 5px;
    padding: 3px 11px;
}

.register_list li{
	border-bottom: 1px solid #ccc;
	padding: 7px 0px;
	text-align: right;

}
.register_list label{
	color:#BFBFBF;
	font-size: 14px;
}
.register_list input{
	border:none;
	color:#999;
	font-size: 14px;
	width: 76%;
}
.mailbox_register_login{
	background:url('https://resource.bluecandy.io/wawaImg/loading/btn_GetCod@2x.png');
	background-position: center center;
	background-size: 100% 100%;
	background-repeat: no-repeat;

	width: 130px;
    text-align: center;
    height: 35px;
    line-height: 35px;
    margin: 100px auto 13px auto;
    font-size: 14px;
}
</style>
