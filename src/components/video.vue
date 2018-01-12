<template>
  <div id="app">
	<!--
	<video :style="{ height: height + 'px' }" class="videoBox" width="100%" id="example_video_1" controls="controls" autoplay="autoplay" webkit-playsinline="true" preload="auto" x-webkit-airplay="true" playsinline>
		<source width="100%" src="../router/fina.mp4" type='video/mp4'>
		<p class="vjs-no-js">To view this video please enable JavaScript, and consider upgrading to a web browser that
		<a href="http://videojs.com/html5-video-support/" target="_blank">supports HTML5 video</a>
		</p>
	</video> 
	-->
	<video width="320" height="240" controls autoplay>
	  <source src="../router/fina.mp4" type="video/ogg">
	  <source src="../router/fina.mp4" type="video/mp4">
	  <source src="fina.webm" type="video/webm">
	  <object data="../router/fina.mp4" width="320" height="240">
		<embed width="320" height="240" src="fina.swf">
	  </object>
	</video>
	
  </div>
</template>

<script>


  export default {
    data () {
      return {
      }
    },
  	mounted(){


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

  	}
  }
</script>

<style type="text/css">

</style>