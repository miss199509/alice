<template>
	<div id="liveList_id">

	  <div class="liveList">

	    <header>
		    <ul class="headerNav">
				<li class="floatLeft">
					<router-link :to="{ name: 'Personal',query:{cid:$route.query.cid,session_id:$route.query.session_id,candy:$route.query.candy}}">
						<img width="12px;" src="https://resource.bluecandy.io/wawaImg/liveBroadcast/btn_back@2x.png"/>
					</router-link>
					<router-link :to="{ name: 'liveList',query:{cid:$route.query.cid,session_id:$route.query.session_id,candy:$route.query.candy}}">
						<img class="headerClass" width="23px;" src="https://resource.bluecandy.io/wawaImg/liveBroadcast/btnhomei6.png"/>
					</router-link>
				</li>
				<li style="display: inline-block;">
					<strong class="color_aimai" v-if="$store.state.language">Settings</strong>
					<strong class="color_aimai" v-else>设置</strong>
				</li>
				<li class="floatRight">
					<router-link :to="{ name: 'Settlement',query:{cid:$route.query.cid,session_id:$route.query.session_id,candy:$route.query.candy}}">
						<img width="27px;" src="https://resource.bluecandy.io/wawaImg/liveBroadcast/btn_cart@2x.png"/>
					</router-link>
				</li>
		    </ul>
	    </header>


		
		<div class="shoppingl_global setUp">
			<p v-if="$store.state.language">ALNGUAGE</p>
			<p v-else>语言</p>
			<router-link :to="{ name: 'Help',query:{cid:$route.query.cid,session_id:$route.query.session_id,candy:$route.query.candy}}" v-if="$store.state.language">
				<p>FAQ</p>
			</router-link>
			<router-link :to="{ name: 'Help',query:{cid:$route.query.cid,session_id:$route.query.session_id,candy:$route.query.candy}}" v-else>
				<p>帮助</p>
			</router-link>
			<p @click="sign_out()" v-if="$store.state.language">LOGOUT</p>
			<p @click="sign_out()" v-else>退出</p>
		</div>


	  </div>
	
	</div>
</template>

<script>



export default {
  name: 'liveList',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      portrait_nav:[],
      auth2:''
    }
  },
  mounted(){
  	let _this = this;
  	gapi.load('auth2', function(){
	  // Retrieve the singleton for the GoogleAuth library and set up the client.
	  _this.auth2 = gapi.auth2.init({
		client_id: '681087371892-tofhht6qc2enjt665rplgueik8pv3uvh.apps.googleusercontent.com',
		cookiepolicy: 'single_host_origin',
		scope: 'https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/userinfo.email',    //需要获取的用户信息领域
		ux_mode:'popup'
		
	  });
	});

	




  },
  methods: {
  	sign_out(){
  		//退出删除所以存储数据
  		// console.log(this.$store.state.fb)
  		// this.$store.state.fb.logout(function(response) {
		// 	console.log(response)
		// });
		let _this = this;
		(function(d, s, id) {
	      var js, fjs = d.getElementsByTagName(s)[0];
	      if (d.getElementById(id)) return;
	      js = d.createElement(s); js.id = id;
	      js.src = "//connect.facebook.net/en_US/sdk.js";
	      fjs.parentNode.insertBefore(js, fjs);
	    }(document, 'script', 'facebook-jssdk'));

		console.log(localStorage.getItem('platform_id'))
		if(localStorage.getItem('platform_id')=='2'){

			window.fbAsyncInit = function() {
				FB.init({
					appId      : '1475634259145456',
					cookie     : true,  // enable cookies to allow the server to access 
									// the session
					xfbml      : true,  // parse social plugins on this page
					version    : 'v2.8' // use graph api version 2.8
				});
			    FB.getLoginStatus(function(response) {
			        if (response && response.status === 'connected') {
			            FB.logout(function(response) {
			            	//清空本地存储数据
			            	localStorage.clear();
			            	_this.$router.push({ name: 'Hello'})
			            	window.location.reload();
			            });
			        }
			    });
			};
		}else if(localStorage.getItem('platform_id')=='3'){
			

			let id = _this.auth2.disconnect(function(eve){
				console.log(eve)
			});
			localStorage.clear();
			_this.$router.push({ name: 'Hello'})
			window.location.reload();


		}else{
			localStorage.clear();
			_this.$router.push({ name: 'Hello'})
			window.location.reload();
		}




  	}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.shoppingl_global{
	padding: 0px 7px;
}
.setUp p{
	padding: 13px;
	margin-bottom: 7px;
	border-radius: 7px;
	background-color: #fff;
	font-size: 13px;
}
</style>
