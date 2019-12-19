#!/bin/bash

uglifyjs video-speed-controller.js > video-speed-controller.min.js

uriencode() {
  s="${1//'%'/%25}"
  s="${s//' '/%20}"
  s="${s//'"'/%22}"
  s="${s//'#'/%23}"
  s="${s//'$'/%24}"
  s="${s//'&'/%26}"
  s="${s//'+'/%2B}"
  s="${s//','/%2C}"
  s="${s//'/'/%2F}"
  s="${s//':'/%3A}"
  s="${s//';'/%3B}"
  s="${s//'='/%3D}"
  s="${s//'?'/%3F}"
  s="${s//'@'/%40}"
  s="${s//'['/%5B}"
  s="${s//']'/%5D}"
  printf %s "$s"
}

# Create bookmarklet JS file

echo "javascript:(function(){" > "video-speed-controller.bookmarklet.js"

uriencode "$(cat video-speed-controller.min.js)" >> "video-speed-controller.bookmarklet.js"

echo "})()" >> "video-speed-controller.bookmarklet.js"

rm video-speed-controller.min.js

# Insert bookmarklet link into index.html (github pages)

echo "<p>Drag this link into your bookmarks bar to install Video Speed Controller Bookmarklet</p>" > index.html

echo "<p><a href=\"" >> index.html

cat video-speed-controller.bookmarklet.js >> index.html

echo "\">VIDEO-SPEED</a></p>" >> index.html

echo "<img style='border:5px solid gray; margin-top:50px;' src='install.gif'>" >> index.html

open index.html
