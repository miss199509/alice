<template>
	<div id="liveList_id">

	  <div class="liveList">

	    <header>
		    <ul class="headerNav">
				<li class="floatLeft">
					<router-link :to="{ name: 'liveList',query:{cid:$route.query.cid,session_id:$route.query.session_id,candy:$route.query.candy}}">
						<img width="23px;" src="../assets/liveBroadcast/btn_back@2x.png"/>
					</router-link>
					<router-link :to="{ name: 'Delivery',query:{cid:$route.query.cid,session_id:$route.query.session_id,candy:$route.query.candy}}">
						<img class="headerClass" width="23px;" src="../assets/liveBroadcast/icon_arrow@2x.png"/>
					</router-link>
				</li>
				<li style="display: inline-block;">
					<strong class="color_aimai">{{parseInt($store.state.language)?'Modify address':'修改地址'}}</strong>
					<strong class="color_aimai"></strong>
				</li>
				<li class="floatRight">
					<router-link :to="{ name: 'Settlement',query:{cid:$route.query.cid,session_id:$route.query.session_id,candy:$route.query.candy}}">
						<img width="27px;" src="../assets/liveBroadcast/btn_cart@2x.png"/>
					</router-link>
				</li>
		    </ul>
	    </header>


		
		<div class="shoppingl_global">
			<ul class="adderss">
				<li v-for="(val,key) in adderss_list">
					<input v-if="parseInt($store.state.language)" v-model="val.text" :placeholder="val.newPla"/>
					<input v-else v-model="val.text" :placeholder="val.pla"/>
				</li>
			</ul>
		</div>
		
		<!-- <router-link :to="{ name: 'Delivery',query: {cid:$store.state.cid_talk}}"> -->
		<p class="modify_ress" @click="modify_ress()">
			{{parseInt($store.state.language)?'DELETE ADDRESS':'删除地址'}}
		</p>
		<!-- </router-link> -->
		
		<p class="submit_delivery" @click="submit_delivery()">
			{{parseInt($store.state.language)?'CONFLRM':'确认'}}
		</p>

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
      	{'text':'','pla':'收货人：','newPla':'Consignee','event':''},
      	{'text':'','pla':'街道','newPla':'Street','event':''},
      	{'text':'','pla':'建筑/单位/公寓','newPla':'Building / unit / apartment','event':''},
      	{'text':'','pla':'城市','newPla':'City','event':''},
      	{'text':'','pla':'邮编','newPla':'Zip code','event':''},
      	{'text':'','pla':'邮箱-给你发送更新您的订单','newPla':'mailbox','event':''},
      	{'text':'','pla':'手机号码-关于你的订单','newPla':'Phone number','event':''}
      ],
      tips_val:'',
      tipsBoll:false
    }
  },
  mounted(){
  	let _this = this
  	///customer/edit-shipping-address
	axios.post(_this.$store.state.url_talk+'/customer/get-address',qs.stringify({'id':_this.$route.query.cid}))
	.then(function(dataJson){
		console.log(JSON.stringify(dataJson.data.info))
		if(dataJson.data.info.result){
			for(let index in _this.adderss_list){
				switch(_this.adderss_list[index].pla){
					case '收货人：':
							_this.adderss_list[index].text = dataJson.data.info[0].cnee
					  break;
					case '街道':
							_this.adderss_list[index].text = dataJson.data.info[0].street
					  break;
					case '建筑/单位/公寓':
							_this.adderss_list[index].text = dataJson.data.info[0].full_address
					  break;
					case '城市':
							_this.adderss_list[index].text = dataJson.data.info[0].city
					  break;
					case '邮编':
							_this.adderss_list[index].text = dataJson.data.info[0].postcode
					  break;
					case '邮箱-给你发送更新您的订单':
							_this.adderss_list[index].text = dataJson.data.info[0].email
					  break;
					case '手机号码-关于你的订单':
							_this.adderss_list[index].text = dataJson.data.info[0].cell_phone_number
					  break;
				}
			}
		}

	})
	.catch(function(err){
		alert(err);
	});

  },
  methods: {
  	submit_delivery(){
  		if(this.tipsBoll){
  			return false
  		}
  		var _this = this
  		for(let key in this.adderss_list){
  			if(this.adderss_list[key].text==''){
  				this.tipsBoll = true;
  				this.tips_val = '请输入：'+this.adderss_list[key].pla;
				setTimeout(function(){_this.tipsBoll = false},3000);
  				return false;
  			}
  		}
	  	axios.post(_this.$store.state.url_talk+'/customer/edit-shipping-address',qs.stringify({
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
			cid:_this.$store.state.cid_talk,
			id:_this.$route.query.id
	  	}))
		.then(function(dataJson){
			console.log(JSON.stringify(dataJson.data))
			if(dataJson.data.result){
				_this.$router.push({ name: 'Delivery',query: {cid:_this.$store.state.cid_talk}})
			}
		})
		.catch(function(err){
			alert(err);
		});

  	},
  	//删除当前收货地址
  	modify_ress(){

  		//return false;
  		let _this = this
  		axios.post(_this.$store.state.url_talk+'/customer/del-shipping-address',qs.stringify({
  			cid:_this.$store.state.cid_talk,
  			id:_this.$store.state.id_talk
  		}))
		.then(function(dataJson){
			console.log(JSON.stringify(dataJson.data))
			_this.$router.push({ name: 'Delivery',query: {cid:_this.$store.state.cid_talk}})
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
}
.adderss{
	background-color: #fff;
	border-radius: 7px;
	padding: 3px 13px;
}
.adderss input{
	border:none;
	height: 30px;
	line-height: 30px;
	width: 100%;
	outline:none;
	font-size: 14px;
}
.adderss li{
	margin:7px 0px;
	border-bottom: 1px solid #eee;
}


.submit_delivery{
	position: fixed;
	width: 130px;
	text-align: center;
	left: 0;
	right: 0;
	bottom: 7px;
	margin: auto;
	background:url('../assets/loading/btn_GetCod@2x.png');
	background-position: center center;
	background-size: 100% 100%;
	background-repeat: no-repeat;
	height: 33px;
	line-height: 33px;
	font-size: 15px;
}
.modify_ress{
	position: fixed;
	color: #fff;
	text-align: center;
	left: 0;
	right: 0;
	bottom: 47px;
	margin: auto;
	background:url('../assets/loading/btn_exchange_click@2x.png');
	background-position: center center;
	background-size: 100% 100%;
	background-repeat: no-repeat;
	height: 33px;
	line-height: 33px;
	font-size: 15px;
	width: fit-content;
    padding: 0px 7px;
    min-width: 130px;
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
