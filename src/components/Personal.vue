<template>
	<div id="liveList_id">

	  <div class="liveList">

	    <header>
		    <ul class="headerNav">
				<li class="floatLeft">
					
					<router-link :to="{ name: 'liveList'}">
						<img width="23px;" src="../assets/liveBroadcast/btn_back@2x.png"/>
					</router-link>
				</li>
				<li style="display: inline-block;">
					<strong class="color_aimai">{{parseInt($store.state.language)?'Account':'个人信息'}}</strong>
				</li>
				<li class="floatRight">
					<router-link :to="{ name: 'Settlement'}">
						<img width="27px;" src="../assets/liveBroadcast/btn_cart@2x.png"/>
					</router-link>
				</li>
		    </ul>
	    </header>

		<div class="ues_index">
			<div class="ues_index_box">
				<div class="head_portrait shoppingl_global" :style="{backgroundImage: 'url(' + $store.state.portrait + ')'}">
					<ul class="">
						<li class="">
							<img @click="change_avatar()" style="border-radius: 50px;" width="90px" height="90px;" :src='$store.state.portrait'/>
							<input type="file" id="file" name="uploadFile" style="display: none;" @change="preview()" />
						</li>
					</ul>
				</div>
				
				<div class="uesNav_box">
					<p class="uesName_box">
						<strong class="color_aimai">{{$store.state.nickname}}</strong>
						<img width="20px" src="../assets/liveBroadcast/edit_btn.png"/>
					</p>
					<p class="ues_price">
						<img width="23px" src="../assets/liveBroadcast/dc_icons@2x.png"/>
						<strong>{{$store.state.balance_talk}}</strong>
					</p>
					<nav class="portrait_nav">
						<ul>
							<router-link v-for="(val,key) in portrait_nav" :to="{name:val.url,query: {cid:$store.state.cid_talk}}">
							<!--query: {plan:666}}">{ name: 'history', params: { deviceId: 123, dataId:456 }}-->
								<li>
									<img width="25px" :src="val.imgae"/>
									<strong class="color_aimai">
										{{parseInt($store.state.language)?val.navName:val.navName_new}}
									</strong>
								</li>
							</router-link>
						</ul>
					</nav>
				</div>
			</div>
		</div>
		
		<div id="boxPopup" v-show="popup" @click="removePopup()"></div>
		<ul class="head_nav" v-show="popup">
			<li @click="choice()">				
				{{parseInt($store.state.language)?'USE PHOTO FROM CELL PHONE PHOTOS':'上传头像'}}
			</li>
			<li>
				{{parseInt($store.state.language)?'TAKE PICTURE WITH CAMERA':'拍照'}}
			</li>
			<li @click="determine()">
				{{parseInt($store.state.language)?'CANCEL':'确定'}}
			</li>
		</ul>

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
      portrait_nav:[
      	{'navName':'RELOAD','navName_new':'充值','imgae':require('../assets/personal/iconreloadi6.png'),'url':'Recharge'},
      	{'navName':'FOLLOWLNG','navName_new':'关注','imgae':require('../assets/personal/iconfollowingi6.png'),'url':'follow'},
      	{'navName':'ADDRESS BOOK','navName_new':'地址簿','imgae':require('../assets/personal/iconaddressbooki6.png'),'url':'Delivery'},
      	{'navName':'HLSTORY','navName_new':'购买记录','imgae':require('../assets/personal/iconhistoryi6.png'),'url':'History'},
      	//{'navName':'SETTLNG','navName_new':'设置','imgae':require('../assets/personal/iconsettingsi6.png'),'url':'setUp'}
      ],
      popup:false,
    }
  },
  mounted(){
  	let _this = this
  	//_this.$store.state.portrait = 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1161209730,2018761545&fm=27&gp=0.jpg';
  	axios.post(_this.$store.state.url_talk+'/wallet/get-balance',qs.stringify({cid:_this.$store.state.cid_talk}))
	.then(function(dataJson){
		let balance = dataJson.data.balance/100
		_this.$store.state.balance_talk = balance.toFixed(2);

	})
	.catch(function(err){
		alert(err);
	});

	//获取当前玩家的个人中心数据
	axios.post(_this.$store.state.url_talk+'/customer/get-shipping-address',qs.stringify({cid:_this.$store.state.cid_talk}))
	.then(function(dataJson){
		console.log(JSON.stringify(dataJson.data))

	})
	.catch(function(err){
		alert(err);
	});


  },
  methods: {
  	change_avatar(){
  		this.popup = true;
  	},
  	//上传头像
  	choice(){
  		document.getElementById("file").click();

  	},
  	preview(){
  		var _this = this;
  		var file = document.getElementById('file');
  		var prevDiv = document.getElementById('preview');
	    if (file.files && file.files[0]) {
	      var reader = new FileReader();
	      reader.onload = function(evt) {
	      	
	      	_this.$store.state.portrait = evt.target.result;

	        //prevDiv.innerHTML = '<img src="' + evt.target.result + '" />';
	      }
	      reader.readAsDataURL(file.files[0]);
	    } else {
	      prevDiv.innerHTML = '<div class="img" style="filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale,src=\'' + file.value + '\'"></div>';
	    }
  	
  	},
  	//确定提交
  	determine(){
  		var _this = this;
  		var fileObj = document.getElementById("file").files[0]; // js 获取文件对象
  		console.log(fileObj)
  		if(_this.fileObj==undefined){
  			_this.popup = false;
  			return false;
  		}
		var fd = new FormData();
		fd.append('id',_this.$store.state.cid_talk)
		fd.append('img',fileObj);//上传的文件： 键名，键值
		var url = _this.$store.state.url_talk+'/customer/upload-profile-picture';//接口
		var XHR = null;
		if (window.XMLHttpRequest) {
			// 非IE内核
			XHR = new XMLHttpRequest();
		} else if (window.ActiveXObject) {
			// IE内核，这里早期IE版本不同，具体可以查下
			XHR = new ActiveXObject("Microsoft.XMLHTTP");
		} else {
			XHR = null;
		}
		if (XHR) {
			XHR.open("POST", url);
			XHR.onreadystatechange = function() {
				if (XHR.readyState == 4 && XHR.status == 200) {
					var resultValue = XHR.responseText;
					var data = JSON.parse(resultValue);
					console.log(JSON.stringify(data))
					if(data.result){
						
						_this.$store.state.portrait = data.image;
						localStorage.setItem('portrait',data.image);
						_this.popup = false;
					}else{
						alert('上传失败请重新上传')
					}
					XHR = null;
				}
			}
			XHR.send(fd);
		}



  	},
  	removePopup(){
  		this.popup = false;
  	}

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.ues_index{
	padding: 0px 7px;
}
.head_portrait{
	height: 200px;
	display: flex;
    justify-content: center;
    align-items: center;
    background-position: center center;
	background-size: 100% 100%;
	background-repeat: no-repeat;
	box-shadow: 0px 8px 17px #514343;
}

.ues_index_box{
	background-color: #fff;
	padding-bottom: 66px;
}
.uesNav_box{
	padding: 0px 11px;
}

.portrait_nav li{
	border-top: 1px solid #EFEFEF;
	height: 47px;
	line-height: 47px;
	display: flex;
    justify-content: baseline;
    align-items: center;
}
.portrait_nav li strong{
	font-size: 13px;
	font-weight:100;
	margin-left: 20px;
}
.portrait_nav li img{
	margin-left: 13px;
}


.uesName_box{
	display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0px 13px;
    margin-bottom: 7px;
}
.uesName_box strong{
	font-size: 15px;

}
.ues_price{
	margin-left: 13px;
	display: flex;
    justify-content: baseline;
    align-items: center;
    margin-bottom: 3px;
}
.ues_price strong{
	font-size: 22px;
	color:#999;
}


.head_nav{
	position: absolute;
	bottom: 0px;
	width: 100%;
	z-index: 1;
}
.head_nav li{
	text-align: center;
    background-color: #ccc;
    padding: 7px 0px;
    margin: 7px 0px;
    font-size: 13px;
}
</style>
