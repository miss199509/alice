<template>
  <div class="liveRoom">
    <div style="padding:0px 11px;" :style="{height:box_heigth+'px'}">
      <header class="liveHeader">
        <router-link :to="{ name: 'liveList'}">
          <img width="27px;" @click="signOut()" src="../assets/icon_back@2x.png"/>
        </router-link>
        <div class="liveHeader_qty">
          <label>
           {{received_msg_box.online}}人
           <br/>在线
          </label>
          <p>
            <!-- <span v-for="(val,key) in received_msg" >{{val}}</span> -->
            <img v-for="(val,key) in received_msg" width="33px;" :src="val.portrait"/>
          </p>
        </div>
      </header>
      
      <div class="video_box">
        <canvas id="jsmpeg-player"></canvas>
        <canvas id="jsmpeg-player2"></canvas>
        
        <p class="canvasVideo" :style="{height:height_video+'px'}">
          <span class="borderLeft"></span>
          <span class="borderRight"></span>
        </p>

        <div class="videoSet_up">
          <div class="">
            <img width="33px;" :src="gamePlayer.portrait"/>
            <p>
              <label>{{gamePlayer.nickname}}</label>
              <strong>游戏中</strong>
            </p>
          </div>
          <!-- <img src="../assets/liveBroadcast/icon_countdown@2x.png"/> -->
          <p class="countdown">
            <span>{{received_msg_box.enjoy_time2}}</span>
          </p>
        </div>

        <!-- 切换视频 -->
        <img @click="switchCamera()" class="switch" width="47px;" src="../assets/btn_switch@2x.png"/>


        <div class="the_game" :style="{height:height_video+'px'}"></div>

      </div>
    
      <div class="operation_box">
        <div class="operation_padding" v-show="wait">
          <ul class="livePrice">
            <li>
              <label>本次:</label>
              <img width="23px;" src="../assets/icon_dc@2x.png"/>
              <label>{{received_msg_box.play_pool/100}}.00/次</label>
            </li>
            <li>
              <label>余额:</label>
              <img width="23px;" src="../assets/icon_dc@2x.png"/>
              <label>{{received_msg_box.balance/100}}.00</label>
            </li>
          </ul>
          
          <div class="wait">
            <img @click="icon_chat_click()" width="70px;" src="../assets/icon_chat_click@2x.png"/>
            <div @click="lineUp()" :class="{lineUpBox:lineUpBoll}">
              <strong class="lineUp" v-if="lineUpBoll">排队中...</strong>
              <p v-else>
                <strong>
                  预约排队
                </strong>
                <span>
                  前面{{received_msg.length}}人
                </span>
              </p>
            </div>
            <router-link :to="{ name: 'Recharge'}">
              <img width="70px;" src="../assets/btn_Recharge_click@2x.png"/>
            </router-link>
          </div>
        </div>

        <div class="operation" v-show="operation">
          <div>
            <span class="btn_up" @click="btn_upEve()" v-on:mouseup="eve()"></span>
            <!-- <img class="btn_up" @click="btn_upEve()" v-on:mouseup="eve()" width="60px;" src="../assets/btn_up@2x.png"/> -->
            <p>
              <img width="60px;" @click="btn_leftEve()" src="../assets/btn_left@2x.png"/>
              <img class="btn_right" @click="btn_rightEve()" width="60px;" src="../assets/btn_right@2x.png"/>
            </p>
            <img class="btn_down" @click="btn_downEve()" width="60px;" src="../assets/btn_down@2x.png"/>
          </div>

          <p>
            <img @click="doEve()" width="130px;" src="../assets/btn_Grab@2x.png"/>
          </p>
        </div>
      
      </div>

      <div class="continueBox" v-show="continueBoll"><!-- continueBoll -->
        <div class="">
          <ul>
            <li>
              <p class="continueBox_title">
                {{continueBox_val}}
              </p>
            </li>
            <li>
              <img width="230px;" height="156px;" :src="portraitImg"/>
            </li>
            <li class="continueBox_tips">
              <p>本局你还有<img width="23px;" src="../assets/liveBroadcast/dc_icons@2x.png"/>58个币</p>是否再来一局？
            </li>
            <li>
              <p class="continueBox_btn_click continueBox_btn" @click="continueEnd()">稍后在试</p>
              <p class="continueBox_btn_normal continueBox_btn" @click="continueEve()">再来一局({{received_msg_box.enjoy_time2}})</p>
            </li>
          </ul>
        </div>
      </div>


      <!-- 聊天框 -->
      <div class="chatBox boxGifts" v-show="chatPopup">
        <p>
          <input id="icon_chat" type="text" v-model="chatVal" @focus="chatBoxSubmit()"/>
          <!-- <label @click="chatBoxSubmit()">SEND</label> -->
        </p>
      </div>
    </div>
    <word></word>
  </div>
</template>

<script>

import axios from 'axios'
import qs from 'qs'

import $ from 'jquery';

import word from '../components/wwjRecord'

export default {
  name: 'liveRoom',
  data () {
    return {
      //操作等待
      wait:true,
      lineUpBoll:false,
      operation:false,
      wawaCode:0,
      //用户数据
      received_msg:[],
      //当前玩家
      gamePlayer:{'nickname':'二狗子','portrait':require('../assets/avatar@2x.png')},
      //计时
      time_config:{},
      //层
      height_video:0,
      client:'',
      //最外层
      received_msg_box:0,
      bollStart:true,
      continueBoll:false,
      ws:'',
      uesBoll:false,
      portraitImg:require('../assets/icon@2x.png'),
      chatVal:'',
      chatPopup:false,
      box_heigth:0,
      //商品id
      product_schedule_id:0,
      continueBox_val:'差一点点就抓到了！'
    }
  },
  components:{
    'word':word
  },
  mounted(){
    console.log(this.$route.query.cid)
    // document.getElementById('jsmpeg-player').style.width = "100%";
    let height_ = document.documentElement.clientHeight-207;
    this.box_heigth = document.documentElement.clientHeight;
    this.height_video = height_
    //console.log(height_)
    // document.getElementById('jsmpeg-player').style.height = height_+"px";
    // document.getElementById('jsmpeg-player2').style.height = height_+"px";

    var client = AgoraCMH5SDK.createClient();
    this.client = client;
    client.init('fa715ad316694ac8a88cbb05a878fb15', 'alice', {
      //对应的动态key，如果没有请不需要传null，直接不带这个参数即可，可选 alicerm1 AliceRm1
      //key: key,
      //主摄像头uid，默认为1，可选
      uid1: 2587758,
      //副摄像头uid，默认为2，可选
      uid2: 2587759
    }, function(){
      //初始化成功
      client.play({
        //canvas 1 id
        canvas1: "jsmpeg-player",
        //canvas 2 id
        canvas2: "jsmpeg-player2"
      }, function(){
        //视频开始播放的回调
        console.log("started playing..");
        // document.getElementById('jsmpeg-player').style.width = "100%";
        let height_ = document.documentElement.clientHeight-207;
        // document.getElementById('jsmpeg-player').style.height = height_+"px";
        // document.getElementById('jsmpeg-player2').style.height = height_+"px";

      });
    });
    let _this = this;

    document.onkeydown=function(event){
      var e = event || window.event || arguments.callee.caller.arguments[0];
      if(e && e.keyCode==13){
        //提交
        //要做的事情
          if ("WebSocket" in window){
               var ws = new WebSocket('ws://dev.alice.live:9001');
          
               ws.onopen = function(){
                  //Web Socket 已连接上，使用 send() 方法发送数据
                  if(_this.chatVal!==''){
                    var json = {"cmd":4,"cid":_this.$route.query.cid,"roomid":_this.$route.query.roomid,"type":1,"content":_this.chatVal}
                    console.log(JSON.stringify(json))
                    ws.send(JSON.stringify(json));
                    //弹幕发言调用函数
                    _this.barrage(_this.chatVal,false);
                    console.log("数据发送中...");
                    _this.chatVal = '';
                  }
               };

               ws.onmessage = function (evt){
                  console.log(evt.data)
                  console.log("数据已接收...");
               };

               ws.onclose = function(){ 
                  // 关闭 websocket
                  console.log("连接已关闭..."); 
               };
               _this.chatPopup = false;
            }else{
               // 浏览器不支持 WebSocket
               alert("您的浏览器不支持 WebSocket!");
            }
      }
    };


    //WebSocket推流操作
    if ("WebSocket" in window){
       //console.log("您的浏览器支持 WebSocket!");
       
       // 打开一个 web socket
       var ws = new WebSocket("ws://dev.alice.live:9001");
       _this.ws = ws;
      
       ws.onopen = function(){
        // Web Socket 已连接上，使用 send() 方法发送数据
        var json = {
          "cmd":2,
          "cid":_this.$route.query.cid,
          "roomId":_this.$route.query.roomid,
          "roomType":_this.$route.query.roomType,
          "lastTick":1501501004.2753,
          'sessionId':localStorage.getItem('session_id')
        };

        ws.send(JSON.stringify(json));
        //console.log("数据发送中...");
       };
      
       ws.onmessage = function (evt) {
        //console.log(evt.data)
        let received_msg = JSON.parse(evt.data);
        if(received_msg.cmd==66){
          for(let i in received_msg.cmds){
            console.log(received_msg.cmds[i].id==11+'---')
            if(received_msg.cmds[i].id==224){
              //console.log(JSON.stringify(received_msg.cmds[i].content[0].product_schedule_id))
              _this.product_schedule_id = received_msg.cmds[i].content[0].product_schedule_id
              //娃娃商品
              /*
              axios.post(_this.$store.state.url_talk+'/products/get-product',qs.stringify({id:received_msg.cmds[i].content[0].product_schedule_id}))
              .then(function(dataJson){
                _this.portraitImg = dataJson.data.images[0]
              })
              .catch(function(err){
                alert(err);
              });
              */

            };
            //弹幕
            if(received_msg.cmds[i].id==11){
              for(let contentKey in received_msg.cmds[i].content){
                _this.barrage(received_msg.cmds[i].content[contentKey].content,false);
              }
            };


            if(received_msg.cmds[i].id==66){
              _this.received_msg_box = received_msg.cmds[i];
              //console.log(JSON.stringify(received_msg.cmds[i].content))
              //判断是否抓到娃娃
              if(received_msg.cmds[i].catch_result==0){
                _this.portraitImg = require('../assets/icon@2x.png');
                console.log('没抓到');
                _this.continueBox_val = '差一点点就抓到了！'
              }
              if(received_msg.cmds[i].catch_result==1){
                console.log('抓到了');
                axios.post(_this.$store.state.url_talk+'/products/get-product',qs.stringify({id:_this.product_schedule_id}))
                .then(function(dataJson){
                  _this.portraitImg = dataJson.data.images[0];
                  _this.continueBox_val = '恭喜您抓到了！'
                })
                .catch(function(err){
                  alert(err);
                });
              }

              if(received_msg.cmds[i].content.length==0 || _this.gamePlayer.id!=_this.$route.query.cid){
                console.log('出去')
                _this.continueBoll = false;
                _this.operation = false;
                _this.wait = true;
                if(_this.uesBoll){
                  _this.lineUpBoll = true;
                }else{
                  _this.lineUpBoll = false;
                }
              }


              if(received_msg.cmds[i].content.length>0){
                _this.gamePlayer = received_msg.cmds[i].content[0];
                
                console.log(JSON.stringify(_this.gamePlayer.id))
                console.log(_this.$route.query.cid)
                console.log(received_msg.cmds[i].enjoy_time2)

                //判断玩家抓取成功
                if(received_msg.cmds[i].enjoy_time2==0 && _this.gamePlayer.id==_this.$route.query.cid && !_this.bollStart){
                  _this.bollStart = true;
                  _this.continueBoll = true;
                  _this.uesBoll = false;
                }else{
                  //_this.continueBoll = false;
                }
                //判断是否到当前玩家抓取的时间
                if(_this.gamePlayer.id==_this.$route.query.cid && _this.bollStart && received_msg.cmds[i].enjoy_time2>0){
                  _this.start()
                }

                _this.received_msg = received_msg.cmds[i].content;
              }else{
                _this.gamePlayer = {'nickname':'二狗子','portrait':require('../assets/avatar@2x.png')};
              }
              //console.log(JSON.stringify(_this.gamePlayer))
            }
          }
          //_this.gamePlayer = received_msg.cmds[0].content[0];
          //console.log(JSON.stringify(_this.gamePlayer))
          /*
          //当前玩家
          if(received_msg.current_user.nickname!=undefined){
            _this.gamePlayer = received_msg.current_user;
          }
          //倒计时
          _this.time_config = received_msg.time_config;
          //console.log(JSON.stringify(received_msg.cmds))
          for(let inde in received_msg.cmds){
            //console.log(JSON.stringify(received_msg.cmds[inde].content))
            _this.received_msg = received_msg.cmds[inde].content
          }
          */
        }
        console.log("数据已接收...");
       };
      
       ws.onclose = function(){ 
        // 关闭 websocket
        console.log("连接已关闭..."); 
       };
    }else{
       // 浏览器不支持 WebSocket
       alert("您的浏览器不支持 WebSocket!");
    }


    


  },
  methods:{
    // 排队
    lineUp(){
      console.log('---------------------------------------------------')
      if(this.lineUpBoll){
        return false
      }
      let _this = this
      _this.uesBoll = true;
      //WebSocket推流操作
      if ("WebSocket" in window){
         //console.log("您的浏览器支持 WebSocket!");
         
         // 打开一个 web socket
         var ws = new WebSocket("ws://dev.alice.live:9001");
        
         ws.onopen = function(){
          // Web Socket 已连接上，使用 send() 方法发送数据
          var json = {"cmd":66,"cid":_this.$route.query.cid,"roomid":_this.$route.query.roomid,"join":1,'flag':0};

          ws.send(JSON.stringify(json));
          //console.log("数据发送中...");
         };
        
         ws.onmessage = function (evt) {
          console.log(evt.data)
          let received_msg = JSON.parse(evt.data);
          if(received_msg.cmd==66){
            //当前玩家
            //当前玩家
            if(received_msg.current_user!={}){
              _this.gamePlayer = received_msg.current_user;
            }
            //倒计时
            _this.time_config = received_msg.time_config;
            //console.log(JSON.stringify(received_msg.cmds))
            for(let inde in received_msg.cmds){
              //console.log(JSON.stringify(received_msg.cmds[inde].content))
              if(received_msg.cmds[inde].content.length>0){
                _this.received_msg = received_msg.cmds[inde].content
              }
            }
          }
          //console.log("数据已接收...");
         };
        
         ws.onclose = function(){ 
          // 关闭 websocket
          console.log("连接已关闭..."); 
         };
      }else{
         // 浏览器不支持 WebSocket
         alert("您的浏览器不支持 WebSocket!");
      }

      this.lineUpBoll = true;

    },
    //获取code
    start(){
      this.operation = true;
      this.wait = false;
      let _this = this;
      axios.post(_this.$store.state.url_talk+'/wawa/catch-start',qs.stringify({cid:_this.$route.query.cid,room_id:_this.$route.query.roomid}))
      .then(function(dataJson){
        console.log(JSON.stringify(dataJson.data))
        _this.wawaCode = dataJson.data.data;
        _this.bollStart = false;
        _this.continueBoll = false;
      })
      .catch(function(err){
        alert(err);
      });
    },
    //切换视频
    switchCamera(){
      this.client.switchCamera();
    },
    //按钮上
    btn_upEve(){
      let _this = this
      if(_this.wawaCode){
        axios.post(_this.$store.state.url_talk+'/wawa/catch-forward',qs.stringify({verify_code:_this.wawaCode,cid:_this.$route.query.cid,room_id:_this.$route.query.roomid}))
        .then(function(dataJson){
          console.log(dataJson.data)
        })
        .catch(function(err){
          alert(err);
        });
      }

    },
    //按钮左
    btn_leftEve(){
      let _this = this
      if(_this.wawaCode){
        axios.post(_this.$store.state.url_talk+'/wawa/catch-left',qs.stringify({verify_code:_this.wawaCode,cid:_this.$route.query.cid,room_id:_this.$route.query.roomid}))
        .then(function(dataJson){
          console.log(dataJson.data)
        })
        .catch(function(err){
          alert(err);
        });
      }

    },
    //按钮右
    btn_rightEve(){
      let _this = this
      if(_this.wawaCode){
        axios.post(_this.$store.state.url_talk+'/wawa/catch-right',qs.stringify({verify_code:_this.wawaCode,cid:_this.$route.query.cid,room_id:_this.$route.query.roomid}))
        .then(function(dataJson){
          console.log(dataJson.data)
        })
        .catch(function(err){
          alert(err);
        });
      }

    },
    //按钮下
    btn_downEve(){
      let _this = this
      if(_this.wawaCode){
        axios.post(_this.$store.state.url_talk+'/wawa/catch-back',qs.stringify({verify_code:_this.wawaCode,cid:_this.$route.query.cid,room_id:_this.$route.query.roomid}))
        .then(function(dataJson){
          console.log(dataJson.data)
        })
        .catch(function(err){
          alert(err);
        });
      }

    },
    //抓取
    doEve(){
      let _this = this
      if(_this.wawaCode){
        axios.post(_this.$store.state.url_talk+'/wawa/catch-do',qs.stringify({verify_code:_this.wawaCode,cid:_this.$route.query.cid,room_id:_this.$route.query.roomid}))
        .then(function(dataJson){
          console.log(dataJson.data)
        })
        .catch(function(err){
          alert(err);
        });
      }

    },
    eve(){
      // alert(0)
    },
    //继续玩
    continueEve(){
      let _this = this
      //WebSocket推流操作
      if ("WebSocket" in window){
         //console.log("您的浏览器支持 WebSocket!");
         
         // 打开一个 web socket
         var ws = new WebSocket("ws://dev.alice.live:9001");
        
         ws.onopen = function(){
          // Web Socket 已连接上，使用 send() 方法发送数据
          var json = {"cmd":66,"cid":_this.$route.query.cid,"roomid":_this.$route.query.roomid,"join":1,'flag':1};

          ws.send(JSON.stringify(json));
          //console.log("数据发送中...");
         };
        
         ws.onmessage = function (evt) {
          console.log(evt.data)
          //console.log("数据已接收...");
         };
        
         ws.onclose = function(){ 
          // 关闭 websocket
          console.log("连接已关闭..."); 
         };
      }else{
         // 浏览器不支持 WebSocket
         alert("您的浏览器不支持 WebSocket!");
      }


    },
    //结束游戏
    continueEnd(){
      this.continueBoll = false;
      this.operation = false;
      this.wait = true;
      this.lineUpBoll = false;
    },
    //聊天框失去焦点
    chatBoxSubmit(){

    },
    icon_chat_click(){
      this.chatPopup = true;
      this.$nextTick(function(){
        if(this.chatPopup){
          document.getElementById('icon_chat').focus();
        }
      })

    },
    signOut(){
      this.ws.close();
    },
    //jquery
    barrage(text,boll,image,image_num){
      var $value=text;
    
      var $p=$("<p></p>");
      
      $p.text($value);
      if(boll){
        var $a = $("<img width='30px' src='"+image+"'/><span>"+image_num+"</span>")

        $p.append($a);
      }
      
      var _top=Math.floor(Math.random()*($(".the_game").innerHeight()-30));
      
      var _fontsize=9+Math.floor(Math.random()*10);
      
      var _rgb="rgb(" + Math.floor(Math.random()*255)+"," + Math.floor(Math.random()*255)+"," + Math.floor(Math.random()*255)+")"; 
      var _width = document.documentElement.clientWidth;
      $p.css({
        "top":_top+"px",
        "font-size":_fontsize+"px",
        "color":_rgb,
        "height":"30px",
        "line-height":"30px",
        "position":"absolute",
        "left":_width+"px",
        "white-space":"nowrap"
      });
     
      
      $(".the_game").append($p);
      
      var _timer=Math.ceil(Math.random()*4000)+3000;
      $p.stop().animate({"left":"-500px"},_timer,function(){
        $(this).remove();
      }); 

    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
a {
  color: #42b983;
}
#jsmpeg-player{
  position: absolute;
  left: 50%;
  transform : translate(-50%,-50%);
  top: 50%;
}
#jsmpeg-player2{
  position: absolute;
  left: 50%;
  transform : translate(-50%,-50%);
  top: 50%;
}

.liveRoom{
  background-image: url('../assets/bg_main1@2x.png');
  background-position: center center;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  height: 100%;
  /*padding: 0px 11px;*/
}

.liveHeader{
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 7px 0px;
}
.liveHeader label{
  color: #fff;
  text-align: center;
  display: block;
  font-size: 16px;
  margin-right: 15px;
}
.liveHeader_qty{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.liveHeader_qty img{
    margin-left: -9px;
    border: 1px solid #fff;
    border-radius: 50%;
}

.video_box{
  position: relative;
  overflow: hidden;
}
.videoSet_up{
  position: absolute;
  top: 13px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

}

.videoSet_up div{
  background-image: url('../assets/bg_avatar@2x.png');
  background-position: center center;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  margin-left: 7px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4px 11px;
}
.videoSet_up p{
  margin: 0px 17px;
  text-align:center;
}
.videoSet_up label{
  color: #fff;
  display: block;
  font-size: 13px;
}
.videoSet_up strong{
  color: #fff;
  font-size: 13px;
}




.countdown{
  background-image: url('../assets/liveBroadcast/icon_countdown@2x.png');
  background-position: center center;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  width: 43px;
  height: 43px;
  line-height: 43px;
}
.countdown span{
  color: #2EE63A;
  font-size: 21px;
  font-weight: bold;
}

.livePrice li{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.livePrice{
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid #fff;
  padding-bottom: 7px;
}
.livePrice label{
  font-size: 17px;
}



.operation_box{
  position: absolute;
  bottom: 0px;
  width: 100%;
  left: 0px;
}
.operation_padding{
  padding: 0px 11px;
}

.wait{
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 7px;
  padding-bottom: 13px;
}

.wait div{
  background-image: url('../assets/btn_lineup@2x.png');
  background-position: center center;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  width: 160px;
  height: 90px;
  text-align: center;
}
.wait .lineUpBox{
  background-image: url('../assets/btn_lineup_click@2x.png');
}
.wait strong{
  display: block;
  font-size: 23px;
  color: #F63630;
  margin-top: 11px;
}
.wait span{
  color: #939292;
  font-size: 15px;
}
.wait .lineUp{
  color: #C8A95C;
  margin-top: 23px;
}

.switch{
  position: absolute;
  right: 0px;
  bottom: 33px;
  z-index: 111;
}
/*操作*/
.operation{
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 7px;
}
.operation div{
  text-align: center;
}
.operation .btn_right{
  margin-left: 50px;
}
.operation .btn_up{
  margin-bottom: -33px;
  background-image: url('../assets/btn_up@2x.png');
  background-position: center center;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  display: inline-block;
  width: 60px;
  height: 60px;
}
.operation .btn_down{
  margin-top: -33px;
}
.canvasVideo{
  position: relative;
  width: 100%;
}
.canvasVideo span{
  position: absolute;
  height: 100%;
  width: 11px;
  background-color: #DDB869;
}
.canvasVideo .borderLeft{
  left: -11px;
}
.canvasVideo .borderRight{
  right: -11px;
}


/*提示是否继续*/
.continueBox{
  background-image: url('../assets/bg_popup@2x.png');
  background-position: center center;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  top: 0px;
  left: 0px;
  height: 100%;
  width: 100%;
  z-index: 111;
}
.continueBox div{
  position: absolute;
  top: 50%;
  left: 50%;
  transform : translate(-50%,-50%);
}

.continueBox li{
  margin-bottom: 17px;
  text-align: center;
}
.continueBox_title{
  font-size: 21px;
  color: #aeaeae;
}
.continueBox_tips{
  font-size: 18px;
  color: #aeaeae;
}
.continueBox_tips p{
  display: flex;
  justify-content: center;
  align-items: center;
}
.continueBox_tips img{
  margin: 0px 11px;
}


.continueBox_btn{
  background-position: center center;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  width: 100%;
  height: 43px;
  line-height: 43px;
  text-align: center;
  color: #454545;
  font-size: 19px;
  margin: 9px 0px;
}
.continueBox_btn_click{
  background-image: url('../assets/btn_click@2x.png');
}
.continueBox_btn_normal{
  background-image: url('../assets/btn_normal@2x.png');
}


/*聊天*/
.chatBox{
    position: absolute;
    bottom: 0px;
    width: 100%;
    left: 0px;
}

.chatBox input{
  width: 100%;
  height: 27px; 
  line-height: 27px;
  border:none;
  text-indent: 7px;
}





.the_game{
  position: absolute;
  width: 100%;
  top: 0px;
}
.the_game span{
  color: #fff;
  position: absolute;
  right: 0px;
}
</style>
