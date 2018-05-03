<template>
	<div id="liveList_id">

	  <div class="liveList">

	    <header>
		    <ul class="headerNav">
				<li class="floatLeft">
					<router-link :to="{ name: 'setUp',query:{cid:$route.query.cid,session_id:$route.query.session_id,candy:$route.query.candy}}">
						<img width="12px;" src="https://resource.bluecandy.io/wawaImg/liveBroadcast/btn_back@2x.png"/>
					</router-link>
					<router-link :to="{ name: 'liveList',query:{cid:$route.query.cid,session_id:$route.query.session_id,candy:$route.query.candy}}">
						<img class="headerClass" width="23px;" src="https://resource.bluecandy.io/wawaImg/liveBroadcast/btnhomei6.png"/>
					</router-link>
				</li>
				<li style="display: inline-block;">
					<strong class="color_aimai">帮助</strong>
				</li>
				<li class="floatRight">
					<router-link :to="{ name: 'Settlement',query:{cid:$route.query.cid,session_id:$route.query.session_id,candy:$route.query.candy}}">
						<img width="27px;" src="https://resource.bluecandy.io/wawaImg/liveBroadcast/btn_cart@2x.png"/>
					</router-link>
				</li>
		    </ul>
	    </header>


		
		<div class="shoppingl_global">
			<ul>
				<li class="help">
					<h3>What is Lucky Live?</h3>
					<p>Lucky Live is an exciting new mobile app that lets users have fun playing games with each other while shopping for discounted merchandise. The more users play, the deeper the discount they’ll receive on the items they want to buy.</p>
				</li>
				<li class="help">
					<h3>How does Lucky Live work?</h3>
					<p>Lucky Live users will need to use tokens to play for a chance to buy the discounted item the live stream host is showing. The more users who play the game, the faster an item is discounted. If a user wins three times in a row, they will have the chance to buy the item or continue playing and wait for a lower price. Whoever wins at least three times in a row and chooses to buy the item will have an hour to complete their purchase before forfeiting the item. Once the item is bought, the game will continue and the host will show a new item for users to buy and play for.</p>
				</li>
				<li class="help">
					<h3>How soon are the items shipped?</h3>
					<p>Once the checkout process is completed, allow for 2-3 days to process the order before shipping. We will send an email confirming when the item has been shipped as well as include tracking information if applicable.</p>
				</li>
				<li class="help">
					<h3>Can I return items I bought?</h3>
					<p>Yes. You’ll have 7 days from when you receive the item to start the return process.</p>
				</li>
				<li class="help">
					<h3>I purchased tokens and never received them. What do I do?</h3>
					<p>If you have purchased tokens on Lucky Live but they have not showed up in your account, we’re here to help. First, check the internet connectivity on your device — switching to wifi or cellular. If that doesn’t resolve the issue, please e-mail us at support@goluckylive.com with the subject line Token Purchase Incomplete [YourUserName] and provide us the receipt from either the App Store or Google Play store as well as a screenshot of your profile page for us to track your order quickly.</p>
				</li>
				<li class="help">
					<h3>Can I withdraw my tokens?</h3>
					<p>Unfortunately, once you purchase tokens, you will not be able to withdraw them from the app.</p>
				</li>
				<li class="help">
					<h3>I need to report a user immediately for harassment or misconduct. What’s the best way?</h3>
					<p>We appreciate any and all moderation help from Lucky Live shoppers. If someone has been acting inappropriately according to our community guidelines, you can send us an email at support@goluckylive.com with the subject line ATTENTION: INAPPROPRIATE BEHAVIOR and sending ANY screenshots you have.</p>
				</li>
			</ul>
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
      portrait_nav:[{'navName':'RELOAD','imgae':'https://resource.bluecandy.io/wawaImg/personal/iconreloadi6.png'},{'navName':'RELOAD','imgae':'https://resource.bluecandy.io/wawaImg/personal/iconfollowingi6.png'},{'navName':'RELOAD','imgae':'https://resource.bluecandy.io/wawaImg/personal/iconaddressbooki6.png'},{'navName':'RELOAD','imgae':'https://resource.bluecandy.io/wawaImg/personal/iconhistoryi6.png'},{'navName':'RELOAD','imgae':'https://resource.bluecandy.io/wawaImg/personal/iconsettingsi6.png'}]
    }
  },
  methods: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.help{
	background-color: #fff;
	border-radius: 7px;
	font-size:13px;
	padding: 13px;
	margin-bottom: 9px;
}
.help h3{
	margin:7px;
}
</style>
