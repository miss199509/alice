<template>
  <div class="record">
  
    <header class="record_nav">
      <strong v-for="(val,key) in record_navList" @click="select_record(val,key)" :class="{'recordMark':val.boll}">
        {{val.text}}
      </strong>
    </header>

    <div class="" v-show="record_navList[0].boll">
      <div class="products">
        <img width="100%" :src="productsImg"/>
      </div>
    </div>

    <div class="record_ranking" v-show="record_navList[1].boll">
      <ul class="recordList recordListRecord" :style="{height:height_box+'px'}">
          <li v-for="(val,key) in recordListRecord">
            <p>
              <img width="37px" :src="val.picture"/>
              <strong>{{val.nickname}}</strong>
            </p>
            <p>
              <span>{{val.create_time}}</span>
            </p>
          </li>
        </ul>
    </div>


    <div v-show="record_navList[2].boll">
      <div class="record_ranking">
        <p class="record_ranking_title">
          <span class="icon_two">
            <img :src="rankingBack_two.picture"/>
          </span>
          <span class="icon_one">
            <img :src="rankingBack_one.picture"/>
          </span>
          <span class="icon_three">
            <img :src="rankingBack_three.picture"/>
          </span>
        </p>
        
        <div class="rankingBack">
          <p class="name">
            <span>{{rankingBack_two.nickname}}</span>
            <span class="one">{{rankingBack_one.nickname}}</span>
            <span class="three">{{rankingBack_three.nickname}}</span>
          </p>
          <p class="num">
            <span>抓取<i>{{rankingBack_two.number}}</i>次</span>
            <span>抓取<i>{{rankingBack_one.number}}</i>次</span>
            <span>抓取<i>{{rankingBack_three.number}}</i>次</span>
          </p>
        </div>

        <ul class="recordList" :style="{height:recordList+'px'}">
          <li v-for="(val,key) in rankingBack">
            <p>
              <label>{{val.location}}</label>
              <img width="37px" src="../assets/avatar@2x.png"/>
              <strong>{{val.nickname}}</strong>
            </p>
            <p>
              <span>抓取</span>
              <b>{{val.number}}</b>
              <span>次</span>
            </p>
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
  name: 'record',
  data () {
    return {
      record_navList:[
        {text:'娃娃详情',boll:true},
        {text:'抓中记录',boll:false},
        {text:'抓取达人',boll:false}
      ],
      recordListRecord:[],
      height_box:0,
      rankingBack:[],
      rankingBack_one:{},
      rankingBack_two:{},
      rankingBack_three:{},
      recordList:0,
      productsImg:''
    }
  },
  mounted(){
    let _this = this;
    _this.height_box = document.documentElement.clientHeight-150;
    _this.recordList = document.documentElement.clientHeight-345;
    
    axios.post(_this.$store.state.url_talk+'/wawa/record',qs.stringify({
      room_id:59,
    }))
    .then(function(dataJson){
      //console.log(JSON.stringify(dataJson.data))
      _this.recordListRecord = dataJson.data

    })
    .catch(function(err){
      //alert(err);
    });
    //抓取达人
    axios.post(_this.$store.state.url_talk+'/wawa/win',qs.stringify({
      room_id:59,
    }))
    .then(function(dataJson){
      _this.rankingBack_one = dataJson.data[0];
      _this.rankingBack_two = dataJson.data[1];
      _this.rankingBack_three = dataJson.data[2];
      dataJson.data.splice(0,3)
      _this.rankingBack = dataJson.data;

    })
    .catch(function(err){
      //alert(err);
    });
    //娃娃详情
    axios.post(_this.$store.state.url_talk+'/products/get-product',qs.stringify({
      id:390,
    }))
    .then(function(dataJson){
      _this.productsImg = dataJson.data.images[0]

    })
    .catch(function(err){
      //alert(err);
    });


  },
  methods:{
    select_record(val,key){
      for(let i in this.record_navList){
        this.record_navList[i].boll = false;
      }
      val.boll = true;
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


.record{
  background-image: url('../assets/bg_info@2x.png');
  background-position: center center;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  height: 100%;
  padding: 0px 11px;
  position: relative;
}


.record_nav{
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 13px;
}
.record_nav strong{
  font-size: 21px;
  color: #AEAEAE;
  padding-bottom: 3px;
}


.record_nav .recordMark{
  color: #E3B249;
  border-bottom: 3px solid #E3B249;
}

.rankingBack{
  background-image: url('../assets/bg_1-3Rank@2x.png');
  background-position: center center;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  width: 100%;
  height: 100px;
  position: relative;
}
.rankingBack p{
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.rankingBack .num{
  position: absolute;
  bottom: 11px;
  width: 100%;
}
.rankingBack span{
  font-size: 15px;
  color: #7F7F7F;
}
.rankingBack i{
  font-size: 23px;
  color: #FFFAC8;
  margin: 0px 1px;
}

.rankingBack .name{
  height: 45px;
  position: absolute;
  width: 100%;
  top: -11px;
}
.rankingBack .name span{
  font-size: 19px;
}
.rankingBack .one{
  margin-top: -55px;
}
.rankingBack .three{
  margin-top: 11px;
}

.record_ranking{
  padding: 0px 20px;
}

.record_ranking_title{
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 23px;
  margin-bottom: -23px;
}
.record_ranking_title span{
  display: inline-block;
  background-position: center center;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  height: 60px;
  width: 60px;
}
.record_ranking_title .icon_one{
  margin-bottom: 70px;
  background-image: url('../assets/icon_one@2x.png');
}
.record_ranking_title img{
  width: 56px;
  margin-top: 6px;
  margin-left: 3px;
}
.record_ranking_title .icon_two{
  background-image: url('../assets/icon_two@2x.png');
}
.record_ranking_title .icon_three{
  background-image: url('../assets/icon_three@2x.png');
}

.recordList{
  overflow: auto;
}
.recordList li{
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 9px 0px;
  border-bottom: 1px solid #E7E7E7;
  padding-bottom: 13px;
}
.recordList p{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.recordList label{
  margin-right: 11px;
  color: #7F7F7F;
  font-size: 17px;
}
.recordList strong{
  margin-left: 9px;
  font-size: 17px;
  font-weight: 100;
}
.recordList span{
  color: #aeaeae;
  font-size: 15px;
}
.recordList b{
  font-size: 26px;
  color: #E3B249;
  margin: 0px 7px;
}


/**/
.recordListRecord{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  width: 80%;
  margin-top: 10px;
}
.recordListRecord li{
  margin: 13px 0px;
}

.products{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  width: 80%;
}
</style>
