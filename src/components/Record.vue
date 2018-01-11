<template>
	<div id="liveList_id">

	  <div class="liveList">

	    <header>
		    <ul class="headerNav">
				<li class="floatLeft">
					
					<img @click="lade()" width="12px;" src="../assets/liveBroadcast/btn_back@2x.png"/>
					<router-link :to="{ name: 'liveList'}">
						<img class="headerClass" width="23px;" src="../assets/liveBroadcast/btnhomei6.png"/>
					</router-link>
				</li>
				<li style="display: inline-block;">
					<strong class="color_aimai">充值记录</strong>
				</li>
				<li class="floatRight">
					<router-link :to="{ name: 'Settlement'}">
						<img width="27px;" src="../assets/liveBroadcast/btn_cart@2x.png"/>
					</router-link>
				</li>
		    </ul>
	    </header>


		
		<div class="shoppingl_global">
			<ul>
				<li class="overflowRemove record" v-for="(val,key) in recordList">
					<p class="floatLeft">
						<img width="45px;" src="../assets/liveBroadcast/dc_icons@2x.png"/>
					</p>
					<div class="floatLeft recordText">
						
						<p class="color_aimai">
							+
							<img width="13px;" src="../assets/liveBroadcast/dc_icons@2x.png"/>
							{{val.deposit_amount}}
						</p>

						<p>{{val.payment_type}}</p>
						<p>Order# {{val.id}}</p>
						<p>Date Purchased：{{val.create_time}}</p>
						<p>
							Status：
							<span v-if="val.status" style="color: #1AF829">成功</span>
							<span v-else>失败</span>
						</p>
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
      recordList:[]
    }
  },
  mounted(){
  	var _this = this
  	axios.post(_this.$store.state.url_talk+'/customer/deposit-history',qs.stringify({cid:_this.$store.state.cid_talk}))
	.then(function(dataJson){
		console.log(JSON.stringify(dataJson.data.info))
		_this.recordList = dataJson.data.info;
	})
	.catch(function(err){
		alert(err);
	});

  },
  methods: {
  	lade(){
  		this.$router.push({ name: 'Recharge'})
  		window.location.reload();
  	},
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.shoppingl_global{
	padding: 0px 7px;
}

.record{
	display: flex;
	justify-content: flex-start;
    align-items: center;
    background-color: #fff;
    border-radius: 7px;
    padding: 9px;
}

.record div{
	margin-left: 23px;
}

.recordText p{
	font-size: 12px;
	margin-top: 5px;
}
.recordText .color_aimai{
	font-size: 14px;
}
</style>
