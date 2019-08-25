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

// Initial speed
var speed = 1.5;

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

addEvent(document, "keypress", function (e) {

	var target = e.target || e.srcElement;
	if ( /INPUT|TEXTAREA|SELECT|BUTTON/.test(target.nodeName) ) return;

	e = e || window.event;

	//keys
	if(e.key == 'a') speed = 1;
	if(e.key == 's') {
		speed = speed <= 0.25 ? 0.05 : speed - 0.25;
	}
	if(e.key == 'd'){
		if(speed == 0.05) speed = 0;
		speed += 0.25;
	} 

	speed = clamp(speed, 0, 6);


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