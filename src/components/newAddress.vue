<template>
	<div id="liveList_id">

	  <div class="liveList">

	    <header>
		    <ul class="headerNav">
				<li class="floatLeft">
					<router-link :to="{ name: 'liveList',query:{cid:$route.query.cid,session_id:$route.query.session_id,candy:$route.query.candy}}" v-show="$route.query.candy==undefined">
						<img width="23px;" src="https://resource.bluecandy.io/wawaImg/liveBroadcast/btn_back@2x.png"/>
					</router-link>
					<router-link :to="{ name: 'Delivery',query:{cid:$route.query.cid,session_id:$route.query.session_id,candy:$route.query.candy}}" v-show="$route.query.candy==undefined">
						<img class="headerClass" width="23px;" src="https://resource.bluecandy.io/wawaImg/liveBroadcast/icon_arrow@2x.png"/>
					</router-link>
				</li>
				<li style="display: inline-block;">
					<strong class="color_aimai">{{parseInt($store.state.language)?'Add address':'添加新地址'}}</strong>
				</li>
				<li class="floatRight">
				</li>
		    </ul>
	    </header>


		
		<div class="shoppingl_global">
			<ul class="adderss">
				<li v-for="(val,key) in adderss_list">
					<input v-model="val.text" :placeholder="val.pla" />
				</li>
			</ul>
		</div>

		<!-- <router-link :to="{ name: 'Delivery',query: {cid:$store.state.cid_talk}}"> -->
			<p class="submit_delivery" @click="submit_delivery()">
				CONFIRM
			</p>
		<!-- </router-link> -->

		<transition name="fade">
			<div class="tips" v-if="tipsBoll">
				{{tips_val}}
			</div>
		</transition>


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
      adderss_list:[
      	{'text':'','pla':'收货人：','event':''},
      	{'text':'','pla':'街道','event':''},
      	{'text':'','pla':'建筑/单位/公寓','event':''},
      	{'text':'','pla':'城市','event':''},
      	{'text':'','pla':'邮编','event':''},
      	{'text':'','pla':'邮箱-给你发送更新您的订单','event':''},
      	{'text':'','pla':'手机号码-关于你的订单','event':''}
      ],
      tips_val:'',
      tipsBoll:false
    }
  },
  created(){
  	//console.log(this.$route.query.id)
  	if(this.$store.state.language){
  		this.adderss_list = [
	      	{'text':'','pla':'Full Name','event':''},
	      	{'text':'','pla':'Steet Address','event':''},
	      	{'text':'','pla':'Building/Unit/Apartment(optional)','event':''},
	      	{'text':'','pla':'City','event':''},
	      	{'text':'','pla':'Zipcode','event':''},
	      	{'text':'','pla':'Email - To send you updates about your order','event':''},
	      	{'text':'','pla':'Phone - To reach you about your order','event':''}
	    ]
  	}
  },
  methods: {
  	submit_delivery(){
  		if(this.tipsBoll){
  			return false
  		}


  		let _this = this
  		for(let key in this.adderss_list){
  			if(this.adderss_list[key].text==''){
  				this.tipsBoll = true;
  				this.tips_val = '请输入：'+this.adderss_list[key].pla;
				setTimeout(function(){_this.tipsBoll = false},3000);
  				return false;
  			}
  		}
	  	axios.post(_this.$store.state.url_talk+'/customer/add-shipping-address',qs.stringify({
  			email:_this.adderss_list[5].text,
			state:'州',
			city:_this.adderss_list[3].text,
			is_default:0,
			postcode:_this.adderss_list[4].text,
			location:_this.adderss_list[1].text,
			fulladdress:_this.adderss_list[2].text,
			street:_this.adderss_list[1].text,
			cnee:_this.adderss_list[0].text,
			phone:_this.adderss_list[6].text,
			cid:_this.$route.query.cid,
	  	}))
		.then(function(dataJson){
			//console.log(dataJson.data)
			if(dataJson.data.result){
				//console.log(_this.$router.query.id)
				if(parseInt(_this.$route.query.id)){
					window.history.go(-1);
				}else{
					_this.$router.push({ name: 'Delivery',query: {cid:_this.$route.query.cid}})
				}
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
.shoppingl_global{
	padding: 0px 7px;
	margin-top: 5px;
}
.adderss{
	background-color: #fff;
	border-radius: 3px;
	padding: 3px 13px;
    padding-bottom: 50px;
}
.adderss input{
	border:none;
	height: 30px;
	line-height: 30px;
	width: 100%;
	outline:none;
	font-size: 15px;
}
.adderss li{
	margin:7px 0px;
	border-bottom: 1px solid #eee;
}


.submit_delivery{
	position: fixed;
	left: 0;
	right: 0;
	bottom: 7px;
	background:url('https://resource.bluecandy.io/wawaImg/loading/btn_GetCod@2x.png');
	background-position: center center;
	background-size: 100% 100%;
	background-repeat: no-repeat;
	width: 150px;
	height: 37px;
	line-height: 37px;
	text-align: center;
	margin: 17px auto 0px auto;
	font-size: 13px;
}

.tips{
	background-color: #000;
	opacity: .5;
	color: #fff;
	position: fixed;
	padding: 7px 13px;
	font-size: 13px;
	position: fixed;
    bottom: 10%;
    left: 50%;
    -webkit-transform: translateX(-50%) translateY(-50%);
    border-radius: 7px;
}
.fade-enter-active, .fade-leave-active {
	transition: opacity 1.5s
}
.fade-enter, .fade-leave-to /* .fade-leave-active in below version 2.1.8 */ {
	opacity: 0;
}
</style>
