/**
 * Video Speed Controller Bookmarklet
 *
 * Control any HTML5 video speed with your keyboard. Usage:
 * - Speed control: a, s, d
 * - Playback quality control (only on YouTube.com): q, w, e, r,  u, i, o
 *
 * @author Lorand Horvath <email at hlorand dot hu>
 * @version 0.2
 * @copyright 2019-2020 hlorand.hu
 */

// Initial speed
var speed = 1.5;
var seek = 0;
var player = document.getElementById('movie_player');

// Remove focus from inputs
if (document.activeElement) {
	document.activeElement.blur();
}

function addEvent(element, eventName, callback) {
	if (element.addEventListener) {
		element.addEventListener(eventName, callback, false);
	} else if (element.attachEvent) {
		element.attachEvent("on" + eventName, callback);
	} else {
		element["on" + eventName] = callback;
	}
}

function clamp(num, min, max) {
	return num <= min ? min : num >= max ? max : num;
}

function YTQuality(q){
	
	//var quality_list = player.getAvailableQualityLevels();
	
	if( !player ) return false;
	
	switch(q){
		case "q": player.setPlaybackQualityRange("tiny"); break;
		case "w": player.setPlaybackQualityRange("small"); break;
		case "e": player.setPlaybackQualityRange("medium"); break;
		case "r": player.setPlaybackQualityRange("large"); break;
		case "u": player.setPlaybackQualityRange("hd720"); break;
		case "i": player.setPlaybackQualityRange("hd1080"); break;
		case "o": player.setPlaybackQualityRange("auto"); break;
		//case "g": player.seekTo( player.getCurrentTime() - 30 ); break;
		//case "h": player.seekTo( player.getCurrentTime() + 30 ); break;
	}

	switch(player.getPlaybackQuality()){
		case "auto": 	return "auto";
		case "tiny": 	return "144p";
		case "small": 	return "240p";
		case "medium": return "360p";
		case "large": 	return "480p";
		case "hd720": 	return "720p";
		case "hd1080": return "1080p";
	}
}

addEvent(document, "keypress", function (e) {

	var target = e.target || e.srcElement;
	if ( /INPUT|TEXTAREA|SELECT|BUTTON/.test(target.nodeName) ) return;

	e = e || window.event;

	/*** YouTube Video Quality change keyboard shortcuts ***/
	var ytq = YTQuality(e.key);


	/*** HTML5 video speed change keyboard shortcuts ***/

	// reset speed
	if(e.key == 'a') speed = 1;

	// decrease
	if(e.key == 's') {
		speed = speed <= 0.25 ? 0.05 : speed - 0.25;
	}

	// increase
	if(e.key == 'd'){
		if(speed == 0.05) speed = 0;
		speed += 0.25;
	}

	//clamp speed
	speed = clamp(speed, 0, 6);

	// update speed labels
	var speedlabels = document.getElementsByClassName("speedlabel");

	for(var i = 0; i < speedlabels.length; i++) {
		speedlabels[i].innerHTML = speed + "x" + (ytq?"<br>"+ytq:"");
	}

	/*** HTML video time seek keyboard shortcuts ***/
	if(e.key == 'g'){
		seek = -30;
	}

        if(e.key == 'h'){
                seek = 30;
        }

	if(e.key == 'b'){
                seek = -1000000;
        }

        if(e.key == 'n'){
                seek = 1000000;
        }

});

// Detect new videos every 500ms
setInterval(function() { videospeed() }, 500);

function videospeed() {

	var style = '\
	<style>\
		.speedlabel{\
			position:absolute;\
			z-index:999;\
			width:30px;\
			left:10px;\
			top:10px;\
			text-align: center;\
			color:#ccc;\
			background-color:rgba(0,0,0,0.3);\
		}\
	</style>\
	';

	videos = document.querySelectorAll("video");

	for(var i = 0; i < videos.length; i++) {

		// Set video speed

		if(videos[i] && videos[i].readyState >= 2) {

			videos[i].playbackRate = speed;

			videos[i].mozPreservesPitch = videos[i].webkitPreservesPitch = videos[i].preservePitch = true;
		}

		// Seek video

		if(seek != 0) {

                        videos[i].currentTime += seek;

			seek = 0;
                }

		// Add speed label to video

		if( ! videos[i].hasAttribute("speedlabel") ){

			videos[i].setAttribute("speedlabel","true");

			var ytq = YTQuality();

			var speedlabel  = '<div class="speedlabel">' + speed + 'x' + (ytq?"<br>"+ytq:"") + '</div>';

			videos[i].insertAdjacentHTML('beforebegin', speedlabel + style);
		}
 	}
}
