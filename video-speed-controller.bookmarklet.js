javascript:(function(){
var%20speed%3D1.5%3Bvar%20seek%3D0%3Bvar%20player%3Ddocument.getElementById(%22movie_player%22)%3Bif(document.activeElement){document.activeElement.blur()}function%20addEvent(element%2CeventName%2Ccallback){if(element.addEventListener){element.addEventListener(eventName%2Ccallback%2Cfalse)}else%20if(element.attachEvent){element.attachEvent(%22on%22%2BeventName%2Ccallback)}else{element%5B%22on%22%2BeventName%5D%3Dcallback}}function%20clamp(num%2Cmin%2Cmax){return%20num<%3Dmin%3Fmin%3Anum>%3Dmax%3Fmax%3Anum}function%20YTQuality(q){if(!player)return%20false%3Bswitch(q){case%22q%22%3Aplayer.setPlaybackQualityRange(%22tiny%22)%3Bbreak%3Bcase%22w%22%3Aplayer.setPlaybackQualityRange(%22small%22)%3Bbreak%3Bcase%22e%22%3Aplayer.setPlaybackQualityRange(%22medium%22)%3Bbreak%3Bcase%22r%22%3Aplayer.setPlaybackQualityRange(%22large%22)%3Bbreak%3Bcase%22u%22%3Aplayer.setPlaybackQualityRange(%22hd720%22)%3Bbreak%3Bcase%22i%22%3Aplayer.setPlaybackQualityRange(%22hd1080%22)%3Bbreak%3Bcase%22o%22%3Aplayer.setPlaybackQualityRange(%22auto%22)%3Bbreak}switch(player.getPlaybackQuality()){case%22auto%22%3Areturn%22auto%22%3Bcase%22tiny%22%3Areturn%22144p%22%3Bcase%22small%22%3Areturn%22240p%22%3Bcase%22medium%22%3Areturn%22360p%22%3Bcase%22large%22%3Areturn%22480p%22%3Bcase%22hd720%22%3Areturn%22720p%22%3Bcase%22hd1080%22%3Areturn%221080p%22}}addEvent(document%2C%22keypress%22%2Cfunction(e){var%20target%3De.target||e.srcElement%3Bif(/INPUT|TEXTAREA|SELECT|BUTTON/.test(target.nodeName))return%3Be%3De||window.event%3Bvar%20ytq%3DYTQuality(e.key)%3Bif(e.key%3D%3D%22a%22)speed%3D1%3Bif(e.key%3D%3D%22s%22){speed%3Dspeed<%3D.25%3F.05%3Aspeed-.25}if(e.key%3D%3D%22d%22){if(speed%3D%3D.05)speed%3D0%3Bspeed%2B%3D.25}speed%3Dclamp(speed%2C0%2C6)%3Bvar%20speedlabels%3Ddocument.getElementsByClassName(%22speedlabel%22)%3Bfor(var%20i%3D0%3Bi<speedlabels.length%3Bi%2B%2B){speedlabels%5Bi%5D.innerHTML%3Dspeed%2B%22x%22%2B(ytq%3F%22<br>%22%2Bytq%3A%22%22)}if(e.key%3D%3D%22g%22){seek%3D-30}if(e.key%3D%3D%22h%22){seek%3D30}if(e.key%3D%3D%22b%22){seek%3D-1e6}if(e.key%3D%3D%22n%22){seek%3D1e6}})%3BsetInterval(function(){videospeed()}%2C500)%3Bfunction%20videospeed(){var%20style%3D%22\t<style>\t\t.speedlabel{\t\t\tposition%3Aabsolute%3B\t\t\tz-index%3A999%3B\t\t\twidth%3A30px%3B\t\t\tleft%3A10px%3B\t\t\ttop%3A10px%3B\t\t\ttext-align%3A%20center%3B\t\t\tcolor%3A%23ccc%3B\t\t\tbackground-color%3Argba(0%2C0%2C0%2C0.3)%3B\t\t}\t</style>\t%22%3Bvideos%3Ddocument.querySelectorAll(%22video%22)%3Bfor(var%20i%3D0%3Bi<videos.length%3Bi%2B%2B){if(videos%5Bi%5D%26%26videos%5Bi%5D.readyState>%3D2){videos%5Bi%5D.playbackRate%3Dspeed%3Bvideos%5Bi%5D.mozPreservesPitch%3Dvideos%5Bi%5D.webkitPreservesPitch%3Dvideos%5Bi%5D.preservePitch%3Dtrue}if(seek!%3D0){videos%5Bi%5D.currentTime%2B%3Dseek%3Bseek%3D0}if(!videos%5Bi%5D.hasAttribute(%22speedlabel%22)){videos%5Bi%5D.setAttribute(%22speedlabel%22%2C%22true%22)%3Bvar%20ytq%3DYTQuality()%3Bvar%20speedlabel%3D'<div%20class%3D%22speedlabel%22>'%2Bspeed%2B%22x%22%2B(ytq%3F%22<br>%22%2Bytq%3A%22%22)%2B%22</div>%22%3Bvideos%5Bi%5D.insertAdjacentHTML(%22beforebegin%22%2Cspeedlabel%2Bstyle)}}}})()
