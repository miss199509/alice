<template>
	<div>

	  <div class="liveList">

	    <header>
		    <ul class="headerNav">
				<li class="floatLeft">
					<router-link :to="{ name: 'liveList',query:{cid:$route.query.cid,session_id:$route.query.session_id,candy:$route.query.candy}}">
						<img width="23px;" src="https://resource.bluecandy.io/wawaImg/liveBroadcast/icon_arrow@2x.png"/>
					</router-link>
				</li>
				<li style="display: inline-block;">
					<strong class="color_aimai">{{parseInt($store.state.language)?'Shop':'商店'}}</strong>
				</li>
				<li class="floatRight">
					<router-link :to="{ name: 'Settlement',query:{cid:$route.query.cid,session_id:$route.query.session_id,candy:$route.query.candy}}">
						<img width="27px;" src="https://resource.bluecandy.io/wawaImg/liveBroadcast/btn_cart@2x.png"/>
					</router-link>
				</li>
		    </ul>
	    </header>

		<div class="shoppingl_list shoppingl_global" :style="{ height: _height + 'px' }">
			<p style="text-align: center;" v-show="loadingBoll">
				<img width="60px;" src="https://resource.bluecandy.io/wawaImg/liveBroadcast/loading.png"/>
			</p>
		    <ul>
				<li class="listGoods overflowRemove" v-for="(val,key) in shopping_list" @click="shopping_eve(key)">

					<div class="listGoods_img">
						<img :src='val.image' onerror="this.src='https://cdn-resource.alice.live/TestPicture/products/1515659060.png'"/>
						<div class="">
							<h3 class="color_aimai">{{val.en_name}}</h3>
							<p>
								<img width="15px;" src="https://resource.bluecandy.io/wawaImg/liveBroadcast/dc_icons@2x.png"/>
								<strong class="color_aimai">{{val.price}}.00</strong>
							</p>
						</div>
					</div>


				</li>
		    </ul>
	    </div>


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
      shopping_list:[],
      _height:'',
      loadingBoll:true
    }
  },
  created(){
  	this._height = document.documentElement.clientHeight-40;
  	//https://red.aimai.live/products/mall-product
  	var _this = this
  	axios.post(_this.$store.state.url_talk+'/products/mall-product','')
	.then(function(dataJson){
		for(let id in dataJson.data.info){
			dataJson.data.info[id].price = dataJson.data.info[id].price/100;
		};
		_this.shopping_list = dataJson.data.info;
		_this.loadingBoll = false;
	})
	.catch(function(err){
		alert(err);
	});


  },
  methods: {
  	shopping_eve(key){
  		this.$store.state.personal_url = this.shopping_list[key].id
  		this.$router.push({ name: 'product',query: {id:this.$store.state.personal_url}})
  	}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


.listGoods_img img{
	border-radius: 13px;
	max-width: 247px;
	max-height: 247px;
}
.listGoods_img{
	text-align: center;
	position: relative;
	height: 250px;
}


.listGoods_img div{
	position: absolute;
	top: 50%;
	left: 50%;
	transform : translate(-50%,-50%);
	width: 100%;
}
.listGoods_img strong{
	font-size: 17px;
}
.listGoods_img p{
	margin-top: 13px;
}
.shoppingl_global{
	position: absolute;
    width: 100%;
    overflow: auto;
    height: 100%;
    margin: 0px;
    bottom: 0px;
}

</style>
