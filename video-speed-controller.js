/**
 * Video Speed Controller Bookmarklet
 *
 * Control HTML5 video speed with your keyboard. Usage:
 * - Speed up: a,s,d,A,S,D keys
 * - Slow down: q,w,e keys
 *
 * @author Lorand Horvath <email at hlorand dot hu>
 * @version 0.1
 * @copyright 2019 hlorand.hu
 */

//Initial speed
var speed = 1.5;

function addEvent(element, eventName, callback) {
	if (element.addEventListener) {
		element.addEventListener(eventName, callback, false);
	} else if (element.attachEvent) {
		element.attachEvent("on" + eventName, callback);
	} else {
		element["on" + eventName] = callback;
	}
}

addEvent(document, "keypress", function (e) {

	e = e || window.event;

	//speed up keys
	if(e.key == 'a') speed = 1;
	if(e.key == 's') speed = 1.25;
	if(e.key == 'd') speed = 1.5;
	if(e.key == 'A') speed = 1.75;
	if(e.key == 'S') speed = 2;
	if(e.key == 'D') speed = 2.25;

	//slow down keys
	if(e.key == 'q') speed = 0.25;
	if(e.key == 'w') speed = 0.5;
	if(e.key == 'e') speed = 0.75;

	var speedlabels = document.getElementsByClassName("speedlabel");

	for(var i = 0; i < speedlabels.length; i++) {
		speedlabels[i].innerHTML = speed + "x";
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

		// Add speed label to video

		if( ! videos[i].hasAttribute("speedlabel") ){

			videos[i].setAttribute("speedlabel","true");

			var speedlabel  = '<div class="speedlabel">' + speed + 'x</div>';

			videos[i].insertAdjacentHTML('beforebegin', speedlabel + style);
		}
 	}
}