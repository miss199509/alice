<template>
	<div id="liveList_id">

	  <div class="liveList">

	    <header>
		    <ul class="headerNav">
				<li class="floatLeft">
					<router-link :to="{ name: 'liveList',query:{cid:$route.query.cid,session_id:$route.query.session_id,candy:$route.query.candy}}">
						<img width="23px;" src="https://resource.bluecandy.io/wawaImg/liveBroadcast/btn_back@2x.png"/>
					</router-link>
					<router-link :to="{ name: 'Personal',query:{cid:$route.query.cid,session_id:$route.query.session_id,candy:$route.query.candy}}" v-show="$route.query.candy==undefined">
						<img class="headerClass" width="23px;" src="https://resource.bluecandy.io/wawaImg/liveBroadcast/icon_arrow@2x.png"/>
					</router-link>
				</li>
				<li style="display: inline-block;">
					<strong class="color_aimai">{{parseInt($store.state.language)?'Ship to':'收货人'}}</strong>
				</li>
				<li class="floatRight">
					<router-link :to="{ name: 'Settlement',query:{cid:$route.query.cid,session_id:$route.query.session_id,candy:$route.query.candy}}">
						<img width="27px;" src="https://resource.bluecandy.io/wawaImg/liveBroadcast/btn_cart@2x.png"/>
					</router-link>
				</li>
		    </ul>
	    </header>

		
		<div class="shoppingl_global">
			<div class="delivery_val">
				<ul class="">
					<li v-for="(val,key) in delivery_nav" @click="choice(key)">
						
						<div class="delivery">
							<div class="delivery_head">
								<p><img width="43px;" src="https://resource.bluecandy.io/wawaImg/liveBroadcast/icon_address1@2x.png"/></p>
								<div>
									<p>{{val.cnee}}</p>
									<p>{{val.street}}</p>
									<p>{{val.state}}{{val.postcode}}</p>
								</div>
							</div>
							<p>
								<label>{{val.cell_phone_number}}</label>
							</p>
							<p class="" style="display: none;">
								<img src=""/>
								<router-link :to="{ name: 'modifyRess',query:{cid:$route.query.cid,session_id:$route.query.session_id,candy:$route.query.candy}}">
									<strong @click="this_eve(key)">></strong>
								</router-link>
							</p>
						</div>
						
						<p class="icon_img">

							<router-link :to="{ name: 'modifyRess',query:{cid:$route.query.cid,session_id:$route.query.session_id,candy:$route.query.candy}}">
								<img @click="this_eve(key)" width="20px;" src="https://resource.bluecandy.io/wawaImg/liveBroadcast/edit_btn.png"/>
							</router-link>

							<img @click="modify_ress(val)" width="20px;" src="https://resource.bluecandy.io/wawaImg/liveBroadcast/btn_delete@2x.png"/>

						</p>
						
						<img class="tipsImg" width="30px;" :src="val.imgae"/>
					</li>
				</ul>
			</div>
		</div>



		<router-link :to="{ name: 'newAddress',query:{cid:$route.query.cid,session_id:$route.query.session_id,candy:$route.query.candy}}">
			<p class="submit_delivery">
				{{parseInt($store.state.language)?'ADD A NEW ADDRESS':'添加新地址'}}
			</p>
		</router-link>


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
      msg: 'Welcome to Your Vue.js App',//对号 checkedi6
      delivery_nav:[]
    }
  },
  created(){
  	var _this = this
  	axios.post(_this.$store.state.url_talk+'/customer/get-shipping-address',qs.stringify({cid:_this.$route.query.cid}))
	.then(function(dataJson){
		//送礼游客名
		console.log(JSON.stringify(dataJson.data.info))

		for(let key in dataJson.data.info){
			if(dataJson.data.info[key].is_default==1){
				dataJson.data.info[key]['imgae'] = 'https://resource.bluecandy.io/wawaImg/liveBroadcast/icon_checked@2x.png'
			}else{
				dataJson.data.info[key]['imgae'] = 'https://resource.bluecandy.io/wawaImg/liveBroadcast/icon_unchecked@2x.png'
			}
		}
		_this.delivery_nav = dataJson.data.info;
	})
	.catch(function(err){
		alert(err);
	});



  },
  methods: {
  	choice(key){
  		let _this = this;
  		for(let index in this.delivery_nav){
  			this.delivery_nav[index].imgae = 'https://resource.bluecandy.io/wawaImg/liveBroadcast/icon_unchecked@2x.png'
  		}
  		this.delivery_nav[key].imgae = 'https://resource.bluecandy.io/wawaImg/liveBroadcast/icon_checked@2x.png'
  		
  		axios.post(_this.$store.state.url_talk+'/customer/edit-shipping-address',qs.stringify({
  			cid:_this.$route.query.cid,
  			phone:_this.delivery_nav[key].cell_phone_number,
  			cnee:_this.delivery_nav[key].cnee,
  			street:_this.delivery_nav[key].street,
  			fulladdress:_this.delivery_nav[key].full_address,
  			postcode:_this.delivery_nav[key].postcode,
  			location:_this.delivery_nav[key].location,
  			city:_this.delivery_nav[key].city,
  			state:'所在州',
  			email:_this.delivery_nav[key].email,
  			is_default:1,
  			id:_this.delivery_nav[key].id
  		}))
		.then(function(dataJson){
			console.log(JSON.stringify(dataJson.data))
		})
		.catch(function(err){
			alert(err);
		});

  	},
  	this_eve(key){
  		this.$store.state.id_talk = this.delivery_nav[key].id
  	},
  	modify_ress(val){
  		let _this = this
  		axios.post(_this.$store.state.url_talk+'/customer/del-shipping-address',qs.stringify({
  			cid:_this.$route.query.cid,
  			id:val.id
  		}))
		.then(function(dataJson){
			console.log(JSON.stringify(dataJson.data))
			if(dataJson.data.result){
				window.location.reload();
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
	padding: 0px 7px;
}



.delivery_val{
}
.delivery_val ul{

}
.delivery_val li{
	position: relative;
    background: #fff;
    margin: 5px 0px;
	border-radius: 3px;
	padding: 0px 13px;
}

.delivery{
	display: flex;
    justify-content: space-between;
    align-items: end;
    padding-top: 7px;
}
.delivery_head{
	display: flex;
    justify-content: space-between;
    align-items: center;
}
.delivery_head div{
	margin-left: 13px;
}
.delivery p{
	font-size: 12px;
	color: #666;
}
.icon_img{
	text-align: -webkit-right;
	border-top: 1px solid #ccc;
	margin-top: 7px;
	padding-top: 3px;
}
.icon_img img{
	margin-left: 7px;
}
.tipsImg{
	position: absolute;
	top: 0px;
	left: 0px;
}
</style>
