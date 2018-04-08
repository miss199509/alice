<template>
  <div id="app">
	<!-- <video width="320" height="240" controls autoplay>
	  <source src="../router/fina.mp4" type="video/ogg">
	  <source src="../router/fina.mp4" type="video/mp4">
	  <source src="fina.webm" type="video/webm">
	  <object data="../router/fina.mp4" width="320" height="240">
		<embed width="320" height="240" src="fina.swf">
	  </object>
	</video> -->
	<span>暂无视频</span>
	
  </div>
</template>

<script>


  export default {
    data () {
      return {
      }
    },
  	mounted(){

  		/*
  		window.addEventListener("load",getVideoEvent);
		function getVideoEvent(){
			var videoes=document.getElementsByTagName("video");
			for (var i = 0; i < videoes.length; i++) {
				showEventLog("video"+(i+1),videoes[i]);
			}
		}

		function showEventLog(videoNum,Media){
			 function eventTester(e){Media.addEventListener(e,function(){
			 		console.log(0)
					history.go(-1);
				});
			}

			eventTester("pause");    //pause()触发
		}
		*/

  	}
  }
</script>

<style type="text/css">

</style>