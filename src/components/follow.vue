<template>
	<div id="liveList_id">

	  <div class="liveList">

	    <header>
		    <ul class="headerNav">
				<li class="floatLeft">
					<router-link :to="{ name: 'liveList',query:{cid:$route.query.cid,session_id:$route.query.session_id,candy:$route.query.candy}}">
						<img width="23px;" src="../assets/liveBroadcast/btn_back@2x.png"/>
					</router-link>
					<router-link :to="{ name: 'Personal',query:{cid:$route.query.cid,session_id:$route.query.session_id,candy:$route.query.candy}}">
						<img class="headerClass" width="23px;" src="../assets/liveBroadcast/icon_arrow@2x.png"/>
					</router-link>
				</li>
				<li style="display: inline-block;">
					<strong class="color_aimai">{{parseInt($store.state.language)?'Following':'关注'}}</strong>
				</li>
				<li class="floatRight">
					<router-link :to="{ name: 'Settlement',query:{cid:$route.query.cid,session_id:$route.query.session_id,candy:$route.query.candy}}">
						<img width="27px;" src="../assets/liveBroadcast/btn_cart@2x.png"/>
					</router-link>
				</li>
		    </ul>
	    </header>


		<div class="shoppingl_global"></div>
		<div>
			<ul>
				<li class="shoppingl_nav" v-for="(val,key) in followList">
					<div class="followName">
						<img width="40px;" :src='val.head_image' style="border-radius: 50%;" />
						<span class="color_aimai">{{val.nickname}}</span>
					</div>
					<div class="operation">
						<img style="display: block;" width="100%;" :src="val.image"/>
						<div class="operation_layer">
							<img v-show="val.is_line" width="50px;" style="margin-top: 5px;" src="../assets/liveBroadcast/live.png"/>
							<h4>{{val.nickname}}</h4>
							<hr/>
							<p>{{val.description}}</p>
							<div class="video_box">
								<span class="video_buttom" @click="video_href(val,key)">
									{{parseInt($store.state.language)?'VIEW STREAM':'视屏'}}
								</span>
								<img @click="followEve(val,key)" width="37px;" height="30px" src="../assets/liveBroadcast/btn_follow@2x.png"/>
							</div>
						</div>
					</div>
				</li>
			</ul>
		</div>


	  </div>
	
	</div>
</template>

<script>

//http://us-alice.alice.top/customer/get-follow?cid=211
import axios from 'axios'
import qs from 'qs'

export default {
  name: 'liveList',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      followList:[]
    }
  },
  created(){
  	
  	var _this = this
  	axios.post(_this.$store.state.url_talk+'/customer/get-follow',qs.stringify({cid:_this.$route.query.cid}))
	.then(function(dataJson){
		console.log(JSON.stringify(dataJson.data))
		if((typeof dataJson.data.info=='string')&&dataJson.data.info.constructor==String){
			return
		}
		_this.followList = dataJson.data.info
	})
	.catch(function(err){
		alert(err);
	});


  },
  methods: {
  	followEve(val,key){
  		let _this = this;
  		axios.post(_this.$store.state.url_talk+'/customer/cancel-follow-dealer',qs.stringify({
  			cid:_this.$route.query.cid,
  			dealerid:val.dealer_id
  		}))
		.then(function(dataJson){
			if(dataJson.data.result){
				window.location.reload();
			}else{
				alert('取消关注失败！');
			}
		})
		.catch(function(err){
			alert(err);
		});
  	},
  	//视频跳转
  	video_href(val,key){
  		this.$router.push({ 
  			name: 'liveBroadcast',query: {
  				cid:this.$store.state.cid_talk,
  				dealerid:val.dealer_id,
  				roomid:val.room_id
  			}
  		})
  	}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.shoppingl_nav{
    width: 270px;
    margin: auto;
    border-radius: 3px;
    margin-top: 5px;
}
.followName{
	background-color: #fff;
	padding: 7px 5px;
	display: flex;
	justify-content: baseline;
    align-items: center;
}
.followName span{
	margin-left: 11px;
	font-size: 12px;
}
.operation{
	position: relative;
}
.operation_layer{
	position: absolute;
    top: 0px;
    height: 100%;
    background: #000;
    opacity: 0.5;
    padding: 0px 13px;
	color: #fff;
}
.operation_layer h4{
	font-size: 14px;
	text-align: center;
	margin-top: 43px;
}
.operation_layer p{
	font-size: 13px;
    height: 77px;
    overflow: auto;
}
.operation_layer hr{
	width: 170px;
	margin: 9px auto;

}
.operation_layer img{
	float: right;
}
.video_box{
	margin-top: 12px;
}
.video_buttom{
	background: url('../assets/loading/btn_GetCod@2x.png');
    background-position: center center;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    font-size: 12px;
    text-align: center;
    width: 130px;
    display: inline-block;
    height: 30px;
    line-height: 30px;
}
</style>
