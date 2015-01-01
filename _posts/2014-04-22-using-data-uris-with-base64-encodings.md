---
title: Using Data URIs with Base64 encodings
author: Joseph Rex
layout: post
permalink: /using-data-uris-with-base64-encodings/
categories:
  - encodings
tags:
  - base64
  - data-uri
  - encoding
---
I&#8217;ve never been so conscious about how much data is being pulled from the server on web projects I&#8217;ve worked on since I have never worked on really large projects prior to the project I&#8217;m contributing to at the moment which is being built with CodeIgniter PHP Framework. I put into consideration how I can reduce the data being requested from the server by clients.

First thoughts was to minify the JavaScript and CSS files. After that has been covered, there&#8217;s still much HTTP request being made for each of the images loaded on the pages for ever <img> tags.

My Project members and I have ensured we made use of iconic web fonts to reduce the number of images. However, there are other images to be used on the pages.

Then I remembered base64 images which I once used on minor projects. After much study on them lately, I discovered they play a great role in reducing HTTP requests to server just like CSS Sprites and even better. I&#8217;ll leave the talk on CSS sprites for another article.

### HOW  BASE64 DATA URIs WORK

Images are converted into base64 code which is added to a data URI like so:

<div class="codepen" data-height="268" data-theme-id="0" data-slug-hash="oflmq" data-default-tab="html">
  <pre><code>&lt;img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAASCAYAAAC5DOVpAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBNYWNpbnRvc2giIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MzMyN0YwODE4RjI2MTFFMEE2QzhDNTUzOTVCREVFOEYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MzMyN0YwODI4RjI2MTFFMEE2QzhDNTUzOTVCREVFOEYiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDozMzI3RjA3RjhGMjYxMUUwQTZDOEM1NTM5NUJERUU4RiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDozMzI3RjA4MDhGMjYxMUUwQTZDOEM1NTM5NUJERUU4RiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PqWQO7IAAAOZSURBVHjabFRdbBRVFP7uzM7+tN3dbrc0sihaHlqwaixFfFFsYmtIbHgg+IAQSDQGE+ILGnGDkdDEkD6gL0TFxgcjPog+YGIkQVAjmKxgJSH8NARZrO1C3W23+zMznd2dGc65M9tg9e6e3Tvn57vn++6dK/DfIQ6c/6A/2d5xKKSF1iuqkmKnYzs5q279Mbcwf/D9Z/Zd0nV9QzgcPmbbthIMBp+nlGpgGZCanvjwpKIFRv6q3UGhUkSlbshAVGtJdYYSqVisbWR88uvzkUjkMdM0Z4aHh/dTeBXZbdFEWZ8eij6xZeOkUERq2phFVp9B3irCtBdlPKKGsSKUwK6Ht2Df2t2YLecb217c+tqlzESOwn+SzTQ7C7RtWvlVzsqn7poF3NZz0G0TjusstVx3quhpewRv9LyM7Pzf2Hs8HTA3RfYig50UZkCLOxNrPh58Ltrd8VPNqYO70hsmXPrcPwYSj+L04DiJ56Lv8BACqorWh+IwcuXNU+9mfmBZFe5qPm6OlupVFKwFGESru3UVBuLrAJsA6ZvQYvhk4D0kgjG88NEOzBoF6MkGzLiDcrd7gLXmBRksVLIrvQu1MqoNA/3ta3Fz5BQubj6BlxK0SYaNt3tfwUCyD+nvxzAxdRluZ0ACldwqSk6llzGaYBox7SrXdTDNibmrSGeOSGqHN76JochT2N/3Km4VpzB26ijQTjInNdQ0G+WGzip1eRgemMJ0XNuB45DgQmDsymeyeE1yNU5v/1wCv378HVqf0juprkWRm8M1UgoPx/vBopNHg/Uh4y2h5PHrJ5bEP3P1HM5c+0V2hBh1pgovl2u41h8M5qBq30LN5ZkUnJM/zX6zBDZ+9gugTfUoBhUvh3O5hmu9J7kLAdGhzeHB0DYJzasqAotuDWErgNGTR/Dd5FlgJWncoXG2PB4kMJ0sskzpLVzRJxla+OI9IA51f0nJz6JV9bQh7XgnMV/3qCcoLeKpIkF0GTvnHszuIM9dPteqT8zFdeOCeDK6lQRtlR55AgmlRfUoMj0WWyegis3/effo9E4CvcOqN2nysMlZw4/Fb0V/9HFSYDUsl72e1WluEkjZZo24o1/d0ex2qpmmaKWpmbjvjWG6cbIuDCY2iKdje6irHmii03s53QLRvuH+Vj6Gn4u/k+cfshJHlu6u5VcQHwwfNO7Pm5dBg8zwAUr+3P7XRfh/l6MPEPK79VWXVLgLywd2lxfeE2AAssWEtS7Y+v4AAAAASUVORK5CYII=" alt="Example"&gt;</code></pre>
  
  <p>
    See the Pen <a href="http://codepen.io/bl4ckdu5t/pen/oflmq/">oflmq</a> by Joseph Rex (<a href="http://codepen.io/bl4ckdu5t">@bl4ckdu5t</a>) on <a href="http://codepen.io">CodePen</a>.
  </p>
</div>

The above example evinces its use within HTML documents. It can also be used within CSS:

<div class="codepen" data-height="268" data-theme-id="0" data-slug-hash="hFKlw" data-default-tab="css">
  <pre><code>div{
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAASCAYAAAC5DOVpAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBNYWNpbnRvc2giIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MzMyN0YwODE4RjI2MTFFMEE2QzhDNTUzOTVCREVFOEYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MzMyN0YwODI4RjI2MTFFMEE2QzhDNTUzOTVCREVFOEYiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDozMzI3RjA3RjhGMjYxMUUwQTZDOEM1NTM5NUJERUU4RiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDozMzI3RjA4MDhGMjYxMUUwQTZDOEM1NTM5NUJERUU4RiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PqWQO7IAAAOZSURBVHjabFRdbBRVFP7uzM7+tN3dbrc0sihaHlqwaixFfFFsYmtIbHgg+IAQSDQGE+ILGnGDkdDEkD6gL0TFxgcjPog+YGIkQVAjmKxgJSH8NARZrO1C3W23+zMznd2dGc65M9tg9e6e3Tvn57vn++6dK/DfIQ6c/6A/2d5xKKSF1iuqkmKnYzs5q279Mbcwf/D9Z/Zd0nV9QzgcPmbbthIMBp+nlGpgGZCanvjwpKIFRv6q3UGhUkSlbshAVGtJdYYSqVisbWR88uvzkUjkMdM0Z4aHh/dTeBXZbdFEWZ8eij6xZeOkUERq2phFVp9B3irCtBdlPKKGsSKUwK6Ht2Df2t2YLecb217c+tqlzESOwn+SzTQ7C7RtWvlVzsqn7poF3NZz0G0TjusstVx3quhpewRv9LyM7Pzf2Hs8HTA3RfYig50UZkCLOxNrPh58Ltrd8VPNqYO70hsmXPrcPwYSj+L04DiJ56Lv8BACqorWh+IwcuXNU+9mfmBZFe5qPm6OlupVFKwFGESru3UVBuLrAJsA6ZvQYvhk4D0kgjG88NEOzBoF6MkGzLiDcrd7gLXmBRksVLIrvQu1MqoNA/3ta3Fz5BQubj6BlxK0SYaNt3tfwUCyD+nvxzAxdRluZ0ACldwqSk6llzGaYBox7SrXdTDNibmrSGeOSGqHN76JochT2N/3Km4VpzB26ijQTjInNdQ0G+WGzip1eRgemMJ0XNuB45DgQmDsymeyeE1yNU5v/1wCv378HVqf0juprkWRm8M1UgoPx/vBopNHg/Uh4y2h5PHrJ5bEP3P1HM5c+0V2hBh1pgovl2u41h8M5qBq30LN5ZkUnJM/zX6zBDZ+9gugTfUoBhUvh3O5hmu9J7kLAdGhzeHB0DYJzasqAotuDWErgNGTR/Dd5FlgJWncoXG2PB4kMJ0sskzpLVzRJxla+OI9IA51f0nJz6JV9bQh7XgnMV/3qCcoLeKpIkF0GTvnHszuIM9dPteqT8zFdeOCeDK6lQRtlR55AgmlRfUoMj0WWyegis3/effo9E4CvcOqN2nysMlZw4/Fb0V/9HFSYDUsl72e1WluEkjZZo24o1/d0ex2qpmmaKWpmbjvjWG6cbIuDCY2iKdje6irHmii03s53QLRvuH+Vj6Gn4u/k+cfshJHlu6u5VcQHwwfNO7Pm5dBg8zwAUr+3P7XRfh/l6MPEPK79VWXVLgLywd2lxfeE2AAssWEtS7Y+v4AAAAASUVORK5CYII=);
  width: 20px;
  height: 18px;
}</code></pre>
  
  <p>
    See the Pen <a href="http://codepen.io/bl4ckdu5t/pen/hFKlw/">hFKlw</a> by Joseph Rex (<a href="http://codepen.io/bl4ckdu5t">@bl4ckdu5t</a>) on <a href="http://codepen.io">CodePen</a>. </div> 
    
    <p>
      <br /> To convert your images to this format with PHP, you can use the base64_encode function() along with the file_get_contents() function this way:
    </p>
    
    <pre lang="php"><?php base64_encode(file_get_contents('file.jpg')); ?></pre>
    
    <p>
      Here are some websites I found to convert my images to data URI
    </p>
    
    <ul>
      <li>
        <a href="http://webcodertools.com/imagetobase64converter">http://webcodertools.com/imagetobase64converter</a>
      </li>
      <li>
        <a href="http://websemantics.co.uk/online_tools/image_to_data_uri_convertor/">http://websemantics.co.uk/online_tools/image_to_data_uri_convertor/</a>
      </li>
      <li>
        <a href="http://jpillora.com/base64-encoder/">http://jpillora.com/base64-encoder/</a>  (Drag and Drop)
      </li>
    </ul>
    
    <p>
      Have fun with data URIs
    </p>