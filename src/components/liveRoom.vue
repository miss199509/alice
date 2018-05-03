<template>
  <div class="liveRoom">
    <div style="padding:0px 11px;" :style="{height:box_heigth+'px'}">
      <div class="">
        <header class="liveHeader">
          <!-- <router-link :to="{ name: 'liveList',query:{cid:$route.query.cid,session_id:$route.query.session_id,candy:$route.query.candy}}"> -->
            <img v-if="$route.query.candy==undefined" width="27px;" @click="signOut()" src="https://resource.bluecandy.io/wawaImg/icon_back@2x.png"/>
            <img v-else width="27px;" @click="signOut()" src="https://resource.bluecandy.io/wawaImg/icon_back1@2x@2x.png"/>
          <!-- </router-link> -->
          <div class="liveHeader_qty">
            <label>
             {{received_msg_box.online}}人
             <br/>{{parseInt($store.state.language)?'online':'在线'}}
            </label>
            <p>
              <!-- <span v-for="(val,key) in received_msg" >{{val}}</span> -->
              <img v-for="(val,key) in received_msg" width="33px;" :src="val.portrait"/>
              <router-link :to="{ name: 'Settlement',query:{cid:$route.query.cid,session_id:$route.query.session_id,candy:$route.query.candy,height:$route.query.height}}">
                <img v-if="$route.query.candy==undefined" class="cart" width="27px;" src="https://resource.bluecandy.io/wawaImg/liveBroadcast/icon_cart@2x.png"/>
                <img v-else class="cart" width="27px;" src="https://resource.bluecandy.io/wawaImg/icon_cart1@2x.png"/>
                <!-- <i>3</i> -->
              </router-link>
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

          <div class="videoSet_up" v-show="uesHideBoll">
            <div class="">
              <img width="33px;" :src="gamePlayer.portrait"/>
              <p>
                <label>{{nickname}}</label>
                <strong>{{parseInt($store.state.language)?'playing':'游戏中'}}</strong>
              </p>
            </div>
            <!-- <img src="https://resource.bluecandy.io/wawaImg/liveBroadcast/icon_countdown@2x.png"/> -->
            <p class="countdown">
              <span>{{received_msg_box.enjoy_time2}}</span>
            </p>
          </div>

          <!-- 切换视频 -->
          <img @click="switchCamera()" v-if="$route.query.candy==undefined" class="switch cursor" width="47px;" src="https://resource.bluecandy.io/wawaImg/btn_switch@2x.png"/>
          <img @click="switchCamera()" v-else class="switch cursor" width="47px;" src="https://resource.bluecandy.io/wawaImg/new_btn_switch@2x.png"/>


          <div @click="the_game_eve()" class="the_game" :style="{height:height_video+'px'}"></div>

        </div>
      </div>
    
      <div class="operation_box" v-show="operationBoll">
        <div class="operation_padding" v-show="wait">
          <ul class="livePrice">
            <li>
              <label>{{parseInt($store.state.language)?'Cost':'本次'}}:</label>
              <img v-if="$route.query.candy==undefined" width="23px;" height="23px;" src="https://resource.bluecandy.io/wawaImg/icon_dc@2x.png"/>
              <img v-else width="23px;" height="23px;" src="https://resource.bluecandy.io/wawaImg/new_icon_bluetoken@2x.png"/>
              <label>{{received_msg_box.play_pool}}.00/{{parseInt($store.state.language)?'Play':'次'}}</label>
            </li>
            <li>
              <label>{{parseInt($store.state.language)?'Balance':'余额'}}:</label>
              <img  v-if="$route.query.candy==undefined" width="23px;" src="https://resource.bluecandy.io/wawaImg/icon_dc@2x.png"/>
              <img v-else width="23px;" src="https://resource.bluecandy.io/wawaImg/new_icon_bluetoken@2x.png"/>
              <label v-if="candy!=undefined">{{received_msg_box.balance}}.00</label>
              <label v-else>{{received_msg_box.balance/100}}.00</label>
            </li>
          </ul>
          
          <div class="wait">
            <img @click="icon_chat_click()" class="cursor" id="btn" width="70px;" src="https://resource.bluecandy.io/wawaImg/icon_chat_click@2x.png"/>
            <div @click="lineUp()" :class="{lineUpBox:lineUpBoll}" class="cursor">
              <p v-if="lineUpBoll">
                <strong>
                  {{len}}{{parseInt($store.state.language)?'waiting':'排队中'}}...
                </strong>
                <!-- <span>
                  {{parseInt($store.state.language)?'Front':'前面'}} {{len}} {{parseInt($store.state.language)?'people':'人'}}
                </span> -->
              </p>
              <strong class="lineUp" v-else>{{parseInt($store.state.language)?'Start':'开始游戏'}}</strong>
            </div>
            <!-- <router-link :to="{ name: 'liveRoom',query:{
              cid:$route.query.cid,
              dealerid:$route.query.dealerid,
              roomid:$route.query.roomid,
              roomType:$route.query.roomType,
              session_id:$route.query.session_id,
              candy:$route.query.candy
            }}">
              <img width="70px;" src="https://resource.bluecandy.io/wawaImg/btn_Recharge_click@2x.png"/>
            </router-link> -->
            <a href="https://bluetoken.io/member/index">
              <img width="70px;" src="https://resource.bluecandy.io/wawaImg/btn_Recharge_click@2x.png"/>
            </a>
          </div>
        </div>

        <div class="operation" v-show="operation">
          <div>
            <span class="btn_up cursor" @click="btn_downEve()" v-on:mouseup="eve()"></span>
            <!-- <img class="btn_up" @click="btn_upEve()" v-on:mouseup="eve()" width="60px;" src="https://resource.bluecandy.io/wawaImg/btn_up@2x.png"/> -->
            <p>
              <!-- <img class="cursor" width="60px;" @click="btn_leftEve()" src="https://resource.bluecandy.io/wawaImg/btn_left@2x.png"/> -->
              <span class="cursor btn_left" @click="btn_leftEve()"></span>
              <!-- <img class="btn_right cursor" @click="btn_rightEve()" width="60px;" src="https://resource.bluecandy.io/wawaImg/btn_right@2x.png"/> -->
              <span class="cursor btn_right" @click="btn_rightEve()"></span>
            </p>
            <!-- <img class="btn_down cursor" @click="btn_upEve()" width="60px;" src="https://resource.bluecandy.io/wawaImg/btn_down@2x.png"/> -->
            <span class="cursor btn_down" @click="btn_upEve()"></span>
          </div>

          <p>
            <!-- <img class="cursor" @click="doEve()" width="130px;" src="https://resource.bluecandy.io/wawaImg/btn_Grab@2x.png"/> -->
            <span class="btn_Grab" @click="doEve()"></span>
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
              <img width="170px;" height="170px" :src="portraitImg"/>
            </li>
            <li class="continueBox_tips">
              <p>
              {{parseInt($store.state.language)?'You still have':'本局你还有'}}
              <img  v-if="$route.query.candy==undefined" height="23px" width="23px;" src="https://resource.bluecandy.io/wawaImg/icon_dc@2x.png"/>
              <img v-else width="23px;" height="23px" src="https://resource.bluecandy.io/wawaImg/new_icon_bluetoken@2x.png"/>
              
              <label v-if="candy!=undefined">{{received_msg_box.balance}}.00</label>
              <label v-else>{{received_msg_box.balance/100}}.00</label>

              {{parseInt($store.state.language)?'in this round':'个币'}}</p>
              {{parseInt($store.state.language)?'want to try again':'是否再来一局'}}？
            </li>
            <li>
              <p class="continueBox_btn_click continueBox_btn cursor" @click="continueEnd()">{{parseInt($store.state.language)?'TRY LATER':'稍后再试'}}</p>
              <p class="continueBox_btn_normal continueBox_btn cursor" @click="continueEve()">{{parseInt($store.state.language)?'TRY AGAIN':'再来一局'}}({{confirm_time}})</p>
              <!-- received_msg_box.enjoy_time2 -->
            </li>
          </ul>
        </div>
      </div>
      
      <audio id="music_mp3_0" src="https://resource.bluecandy.io/wawaImg/dj.mp3" controls="controls" autoplay="autoplay" loop="loop" style="display: none;">
        Your browser does not support the audio element.
      </audio>

      <!-- 聊天框 -->
      <div class="chatBox boxGifts" v-show="chatPopup"><!-- chatPopup -->
        <p>
          <input id="icon_chat" type="search" value="发送" placeholder="" v-model="chatVal" @focus="chatBoxSubmit()" @blur="eve()"/>
          <!-- <label @click="chatBoxSubmit()">SEND</label> -->
        </p>
      </div>
    </div>
    <img class="record_tipsImg" v-show="operationBoll" src="https://resource.bluecandy.io/wawaImg/btn_Pulldown@2x.png"/>
    <word :logo="$route.query.product_id"></word><!-- $route.query.product_schedule_id -->
    <img v-show="readyBoll" class="readyStart" src="https://resource.bluecandy.io/wawaImg/ready.png"/>
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
      gamePlayer:{'nickname':'二狗子','portrait':'https://resource.bluecandy.io/wawaImg/avatar@2x.png'},
      nickname:'',
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
      portraitImg:'https://resource.bluecandy.io/wawaImg/icon@2x.png',
      chatVal:'',
      chatPopup:false,
      box_heigth:0,
      //商品id
      product_schedule_id:0,
      continueBox_val:'差一点点就抓到了！',
      confirm_time:0,
      uesHideBoll:false,
      operationBoll:true,
      candy:'',
      len:0,
      readyBoll:false,
      wawaHeight:0
    }
  },
  components:{
    'word':word
  },
  mounted(){

    /*
    document.addEventListener('DOMContentLoaded', function () {
        function audioAutoPlay() {
            var musicEle0 = document.getElementById('music_mp3_0');
            musicEle0.play();
        }
        audioAutoPlay();
    });
    */



    let _this = this;
    this.candy = this.$route.query.candy;
    console.log(this.$route.query.session_id);
    console.log(this.$route.query.cid)
    console.log(this.$route.query.roomid)
    console.log(this.$route.query.roomType)
    console.log(this.$route.query.candy)

    //this.$store.state.language = 0;
    console.log(this.$route.query.cid)
    // document.getElementById('jsmpeg-player').style.width = "100%";
    let height_ = document.documentElement.clientHeight-220;
    if(this.$route.query.height==undefined){

      this.height_video = height_;
      this.box_heigth = document.documentElement.clientHeight;
    }else{
      this.height_video = this.$route.query.height-220;
      this.box_heigth = this.$route.query.height;
    }
    //console.log(height_)
    // document.getElementById('jsmpeg-player').style.height = height_+"px";
    // document.getElementById('jsmpeg-player2').style.height = height_+"px";

    var client = AgoraCMH5SDK.createClient();
    this.client = client;
    client.init('fa715ad316694ac8a88cbb05a878fb15',_this.$route.query.streaming, {
      //对应的动态key，如果没有请不需要传null，直接不带这个参数即可，可选 alicerm1 AliceRm1
      //key: key,
      //主摄像头uid，默认为1，可选
      uid1: _this.$route.query.uid1,
      //副摄像头uid，默认为2，可选
      uid2: _this.$route.query.uid2
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
        document.getElementById('jsmpeg-player').style.height = _this.height_video+80+'px';
        document.getElementById('jsmpeg-player2').style.height = _this.height_video+80+'px';

      });
    });

    document.onkeydown=function(event){
      var e = event || window.event || arguments.callee.caller.arguments[0];
      if(e && e.keyCode==13){
        //提交
        //要做的事情
          if ("WebSocket" in window){
               var ws = new WebSocket('wss://red.alice.live:10001');
          
               ws.onopen = function(){
                  //Web Socket 已连接上，使用 send() 方法发送数据
                  if(_this.chatVal!==''){
                    var json = {"cmd":4,"cid":_this.$route.query.cid,"roomid":_this.$route.query.roomid,"type":1,"content":_this.chatVal}
                    //console.log(JSON.stringify(json))
                    ws.send(JSON.stringify(json));
                    //弹幕发言调用函数
                    //_this.barrage(_this.chatVal,false);
                    console.log("数据发送中...");
                    _this.chatVal = '';
                  }
               };

               ws.onmessage = function (evt){
                  //console.log(evt.data+'开始')
                  let received_msg = JSON.parse(evt.data);
                  for(let i in received_msg.cmds){
                    if(received_msg.cmds[i].id==11){
                      for(let contentKey in received_msg.cmds[i].content){
                        //console.log(JSON.stringify(received_msg.cmds[i].content[contentKey].customerid)+'四十')
                        _this.barrage(received_msg.cmds[i].content[contentKey].name+received_msg.cmds[i].content[contentKey].customerid+'：'+received_msg.cmds[i].content[contentKey].content,false);
                      }
                    };
                  }

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
       var ws = new WebSocket("wss://red.alice.live:10001");
       _this.ws = ws;
      
       ws.onopen = function(){
        // Web Socket 已连接上，使用 send() 方法发送数据
        var json = {
          "cmd":2,
          "cid":_this.$route.query.cid,
          "roomId":_this.$route.query.roomid,
          "roomType":_this.$route.query.roomType,
          "lastTick":1501501004.2753,
          'sessionId':_this.$route.query.session_id
        };

        ws.send(JSON.stringify(json));
        //console.log("数据发送中...");
       };
      
       ws.onmessage = function (evt) {
        //console.log(evt.data+'开始')
        let received_msg = JSON.parse(evt.data);

        


        if(received_msg.cmd==66){
          for(let i in received_msg.cmds){
            //商品
            if(received_msg.cmds[i].id==224){
              // 获取到商品id
              //alert(received_msg.cmds[i].content[0].product_schedule_id)
              _this.product_schedule_id = received_msg.cmds[i].content[0].product_schedule_id;
              console.log(JSON.stringify(received_msg.cmds[i].content))

            };
            //弹幕
            if(received_msg.cmds[i].id==11){
              for(let contentKey in received_msg.cmds[i].content){
                //console.log(JSON.stringify(received_msg.cmds[i].content[contentKey]))
                _this.barrage(received_msg.cmds[i].content[contentKey].name+received_msg.cmds[i].content[contentKey].customerid+'：'+received_msg.cmds[i].content[contentKey].content,false);
              }
            };


            if(received_msg.cmds[i].id==66){
              //房间人数
              for(let w in received_msg.cmds[i].content){
                if(received_msg.cmds[i].content[w].id==_this.$route.query.cid){
                  _this.len=w;
                }
              }

              //console.log(JSON.stringify(received_msg.cmds[i].wallet.app_dc.king_token))
              _this.received_msg_box = received_msg.cmds[i];
              //console.log(JSON.stringify(_this.received_msg_box.wallet.app_dc.king_token))
              console.log(_this.received_msg_box.wallet.app_dc.king_token)
              if(_this.candy!=undefined){
                _this.received_msg_box.balance = _this.received_msg_box.wallet_candy;
              }



              //console.log(JSON.stringify(received_msg.cmds[i].content))
              //判断是否抓到娃娃
              console.log(received_msg.cmds[i].catch_result+'----------------------')
              if(received_msg.cmds[i].catch_result==0){
                _this.portraitImg = 'https://resource.bluecandy.io/wawaImg/icon@2x.png';
                console.log('没抓到');
                _this.continueBox_val = _this.$store.state.language?'Almost succeed!':'差一点点就抓到了！';
                _this.bollStart = true;
                _this.continueBoll = true;
                _this.uesBoll = false;
                console.log('***********************')
                var w = setInterval(function(){
                  _this.confirm_time-=1;
                  if(_this.confirm_time<=0){
                    clearInterval(w);
                    _this.confirm_time = 10;
                  };
                },1000);



              }
              if(received_msg.cmds[i].catch_result==1){
                console.log('抓到了');
                console.log(_this.product_schedule_id)
                axios.post(_this.$store.state.url_talk+'/products/get-product',qs.stringify({id:_this.product_schedule_id}))
                .then(function(dataJson){
                  console.log(JSON.stringify(dataJson.data))
                  _this.portraitImg = dataJson.data.images[0];
                  _this.continueBox_val = _this.$store.state.language?'Congratulations!You caught it！':'恭喜您！抓到了！';
                  _this.bollStart = true;
                  _this.continueBoll = true;
                  _this.uesBoll = false;
                  var w = setInterval(function(){
                    _this.confirm_time-=1;
                    if(_this.confirm_time<=0){
                      clearInterval(w);
                      _this.confirm_time = 10;
                    };
                  },1000);


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
                  console.log(0+'*********')
                }else{
                  _this.lineUpBoll = false;
                }
              }
              if(received_msg.cmds[i].content.length==0){
                _this.lineUpBoll = false;
              }



              if(received_msg.cmds[i].content.length>0){
                _this.gamePlayer = received_msg.cmds[i].content[0];
                console.log(JSON.stringify(_this.gamePlayer.id));
                console.log(_this.$route.query.cid);
                console.log(received_msg.cmds[i].enjoy_time2+'===================');
                //判断是否到当前玩家抓取的时间
                if(_this.gamePlayer.id==_this.$route.query.cid){
                  _this.uesHideBoll = true;
                }else{
                  _this.uesHideBoll = false;
                }
                if(_this.gamePlayer.id==_this.$route.query.cid && _this.bollStart && received_msg.cmds[i].enjoy_time2>0){
                  _this.start();
                }
                //console.log(JSON.stringify(JSON.stringify(received_msg.cmds[i].content)+'************'))
                _this.received_msg = received_msg.cmds[i].content;
              }else{
                _this.gamePlayer = {'nickname':'二狗子','portrait':'https://resource.bluecandy.io/wawaImg/avatar@2x.png'};
                _this.received_msg = [];
                _this.uesHideBoll = false;
              }
              //console.log(JSON.stringify(_this.gamePlayer))
            }
          }

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
      if(this.received_msg_box.balance<this.received_msg_box.play_pool || this.received_msg_box.balance==NaN || this.received_msg_box.balance==''){
        alert(this.$store.state.language?'Sorry, your credit is running low！':'余额不足！');
        return false;
      };
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
         var ws = new WebSocket("wss://red.alice.live:10001");
        
         ws.onopen = function(){
          // Web Socket 已连接上，使用 send() 方法发送数据
          var json = {"cmd":66,"cid":_this.$route.query.cid,"roomid":_this.$route.query.roomid,"join":1,'flag':1};

          ws.send(JSON.stringify(json));
          //console.log("数据发送中...");
         };
        
         ws.onmessage = function (evt) {
          console.log(evt.data)
          let received_msg = JSON.parse(evt.data);
          if(received_msg.cmd==66){
            //确认时间配置
            _this.confirm_time = received_msg.time_config.confirm_time;
            //当前玩家
            if(received_msg.current_user!={}){
              _this.gamePlayer = received_msg.current_user;

              //_this.nickname = _this.gamePlayer.nickname+_this.$route.query.cid;
              let str = _this.gamePlayer.nickname+_this.$route.query.cid;
              if(str.length>10){
                let strVal = str.substring(0,10);
                _this.nickname = strVal+'...';
              }



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
      //console.log(1+'*********')

    },
    //获取code
    start(){
      this.operation = true;
      this.wait = false;
      this.readyBoll = true;
      let _this = this;
      var j = setInterval(function(){  
        axios.post(_this.$store.state.url_talk+'/wawa/catch-start',qs.stringify({cid:_this.$route.query.cid,room_id:_this.$route.query.roomid}))
        .then(function(dataJson){
          
          console.log(JSON.stringify(dataJson.data+'++++++'))//{"result":1,"code":-1,"mess":"上次抓取未结束","data":""}
          
            if(dataJson.data.result){
                if(dataJson.data.data!=''){
                  _this.wawaCode = dataJson.data.data;
                  _this.bollStart = false;
                  _this.continueBoll = false;
                  _this.readyBoll = false;
                  clearInterval(j);
                  return false;
                }
            };
          

        })
        .catch(function(err){
          alert(err);
        });
      },2000);
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
      if(this.received_msg_box.balance<this.received_msg_box.play_pool){
        alert(this.$store.state.language?'Sorry, your credit is running low！':'余额不足！')
        return false
      }
      this.continueBoll = false;
      this.operation = false;
      this.wait = true;
      this.lineUpBoll = false;

      let _this = this
      //WebSocket推流操作
      if ("WebSocket" in window){
         //console.log("您的浏览器支持 WebSocket!");
         
         // 打开一个 web socket
         var ws = new WebSocket("wss://red.alice.live:10001");
        
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
      /*
      let _this = this;
      if ("WebSocket" in window){
         //console.log("您的浏览器支持 WebSocket!");
         
         // 打开一个 web socket
         var ws = new WebSocket("ws://red.alice.live:9001");
        
         ws.onopen = function(){
          // Web Socket 已连接上，使用 send() 方法发送数据
          console.log(_this.$route.query.cid+"用户")
          var json = {"cmd":66,"cid":_this.$route.query.cid,"roomid":_this.$route.query.roomid,"join":0,'flag':0};

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
      */


    },
    //聊天框失去焦点
    chatBoxSubmit(){
      // var input = document.getElementById("your-input-id");
      // input.blur();
      console.log(0)
      let icon_chat = document.getElementById('icon_chat');
      //icon_chat.removeAttribute("autofocus");
      icon_chat.setAttribute("autofocus", "autofocus");

      icon_chat.select();
      icon_chat.focus();
      //this.operationBoll = false;
    },
    eve(){
      this.chatPopup = false;
      let _this = this;
      // var j = setInterval(function(){
      //   _this.operationBoll = true;
      //   clearInterval(j);
      // },200);
      _this.operationBoll = true;

    },
    icon_chat_click(){
      let _this = this;
      /*
      var j = setInterval(function(){
        _this.chatPopup = true;
        clearInterval(j);
      },1000);

      this.$nextTick(function(){
        if(this.chatPopup){
          let icon_chat = document.getElementById('icon_chat');
          icon_chat.select();
          icon_chat.focus();

        }
      });
      */
      this.chatPopup = true;
      //this.operationBoll = false;
      var j = setInterval(function(){
        let icon_chat = document.getElementById('icon_chat');
        icon_chat.setAttribute("autofocus", "autofocus");
        icon_chat.select();
        icon_chat.focus();
        clearInterval(j);
      },300);

    },
    signOut(){
      this.ws.close();
      this.$router.push({ name: 'liveList',query: {
        cid:this.$route.query.cid,
        session_id:this.$route.query.session_id,
        candy:this.$route.query.candy,
        height:document.documentElement.clientHeight
      }})



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
      
      var _timer=Math.ceil(Math.random()*4000)+300;
      $p.stop().animate({"left":"-200px"},10000,function(){
        $(this).remove();
      }); 

    },
    the_game_eve(){
      //this.client.CLIENT_ROLE_BROADCASTERs = 1//主播
      //this.client.setClientRole(1);
      //CLIENT_ROLE_AUDIENCE = 2//观众
    }
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
#jsmpeg-player,#jsmpeg-player2{
  position: absolute;
  left: 50%;
  transform : translate(-50%,-50%);
  top: 50%;
  /*height: 100%;*/
}

.liveRoom{
  background-image: url('https://resource.bluecandy.io/wawaImg/bg_main1@2x.png');
  height: 100%;
  /*padding: 0px 11px;*/
  position: relative;
  overflow: auto;
}

.liveHeader{
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 7px 0px;
}
.liveHeader i{
  position: absolute;
  right: 5px;
  top: 0px;
  background: #f65e4e;
  border-radius: 50%;
  height: 23px;
  width: 23px;
  text-align: center;
  line-height: 23px;
  color: #fff;
}
.liveHeader label{
  color: #927242;
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
.videoSet_up img{
  border-radius: 50%;
}
.videoSet_up div{
  background-image: url('https://resource.bluecandy.io/wawaImg/bg_avatar@2x.png');
  background-position: center center;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  margin-left: 7px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4px 11px;
  -webkit-tap-highlight-color:rgba(0,0,0,0);
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
  background-image: url('https://resource.bluecandy.io/wawaImg/liveBroadcast/icon_countdown@2x.png');
  background-position: center center;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  width: 43px;
  height: 43px;
  line-height: 43px;
  -webkit-tap-highlight-color:rgba(0,0,0,0);
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
  font-size: 15px;
}



.operation_box{
  position: absolute;
  bottom: 13px;
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
  background-image: url('https://resource.bluecandy.io/wawaImg/btn_lineup@2x.png');
  background-position: center center;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  width: 160px;
  height: 90px;
  text-align: center;
  -webkit-tap-highlight-color:rgba(0,0,0,0);
}
.wait .lineUpBox{
  background-image: url('https://resource.bluecandy.io/wawaImg/btn_lineup_click@2x.png');
  -webkit-tap-highlight-color:rgba(0,0,0,0);
}
.wait strong{
  display: block;
  font-size: 20px;
  color: #F63630;
  margin-top: 27px;
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
  bottom: 5px;
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
  
  background-image: url('https://resource.bluecandy.io/wawaImg/btn_right@2x.png');
  background-position: center center;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  display: inline-block;
  width: 60px;
  height: 60px;
  -webkit-tap-highlight-color:rgba(0,0,0,0);
}
.operation .btn_left{
  background-image: url('https://resource.bluecandy.io/wawaImg/btn_left@2x.png');
  background-position: center center;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  display: inline-block;
  width: 60px;
  height: 60px;
  -webkit-tap-highlight-color:rgba(0,0,0,0);
}
.operation .btn_up{
  margin-bottom: -33px;
  background-image: url('https://resource.bluecandy.io/wawaImg/btn_up@2x.png');
  background-position: center center;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  display: inline-block;
  width: 60px;
  height: 60px;
  -webkit-tap-highlight-color:rgba(0,0,0,0);
}
.operation .btn_down{
  margin-top: -33px;
  background-image: url('https://resource.bluecandy.io/wawaImg/btn_down@2x.png');
  background-position: center center;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  display: inline-block;
  width: 60px;
  height: 60px;
  -webkit-tap-highlight-color:rgba(0,0,0,0);
}
.operation .btn_Grab{
  background-image: url('https://resource.bluecandy.io/wawaImg/btn_Grab@2x.png');
  background-position: center center;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  display: inline-block;
  width: 130px;
  height: 130px;
  -webkit-tap-highlight-color:rgba(0,0,0,0);
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
  background-image: url('https://resource.bluecandy.io/wawaImg/bg_popup@2x.png');
  background-position: center center;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  top: 0px;
  left: 0px;
  height: 100%;
  width: 100%;
  z-index: 111;
  -webkit-tap-highlight-color:rgba(0,0,0,0);
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
  width: 80%;
  margin: auto;
}
.continueBox_tips{
  font-size: 18px;
  color: #aeaeae;
  width: 100%;
  margin: auto;
}
.continueBox_tips p{
  display: flex;
  justify-content: center;
  align-items: end;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.continueBox_tips img{
  margin: 0px 11px;
}


.continueBox_btn{
  background-position: center center;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  width: 230px;
  height: 43px;
  line-height: 43px;
  text-align: center;
  color: #454545;
  font-size: 19px;
  margin: 9px auto;
}
.continueBox_btn_click{
  background-image: url('https://resource.bluecandy.io/wawaImg/btn_click@2x.png');
}
.continueBox_btn_normal{
  background-image: url('https://resource.bluecandy.io/wawaImg/btn_normal@2x.png');
}


/*聊天*/
.chatBox{
  position: fixed;
  bottom: 0px;
  width: 100%;
  left: 50%;
  z-index: 2;
  transform: translate(-50%,0%);
  max-width: 700px;
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

.liveHeader_qty .cart{
  border:none;
  margin-left: 9px;
}
.record_tipsImg{
  position: absolute;
  width: 100%;
  left: 0px;
  z-index: 1;
  bottom: 0px;
  height: 23px;
}



.readyStart{
  position: absolute;
  left: 50%;
  transform : translate(-50%,-50%);
  top: 50%;
  width: 100%;
}
</style>
