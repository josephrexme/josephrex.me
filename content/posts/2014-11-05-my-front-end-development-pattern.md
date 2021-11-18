---
author: Joseph Rex
categories:
- web
comments: true
date: 2014-11-05T00:00:00Z
title: My Front-end development pattern
url: /my-front-end-development-pattern/
tags:
  - frontend
  - frameworks
  - web
---

I've seen different front-end developers start their projects. In most cases for intermediate designers, first steps are to write the basic HTML, download <a href="http://getbootstrap.com" target="_blank">bootstrap</a> or <a href="http://foundation.zurb.com/" target="_blank">foundation</a> framework for local use, download an icon-font set like <a href="http://fontawesome.io/" target="_blank">fontawesome</a>, and they start writing their mark-up to fit the styles defined by the framework.
<!--more-->

You speak of user experience? You've killed it even before starting your project at all. If you fall in that category I described above. Then you need a change henceforth if you are not allergic to advancements.

I think those frameworks are good but <a href="http://marketblog.envato.com/guest/thought-css-frameworks/" target="_blank">it shouldn't be your steps for every single project you do</a>. That's just lame! I also understand you find some of these things easier and faster to use but to be a good developer, you need to come out of your comfort zone.

I'm probably not doing it the best way it may be done but I have a conviction that I'm doing it right.

Sometimes I wait for inspirations for a whole week before I begin a front-end design. Thanks to sites like

  * <a href="http://culttt.com/design" target="_blank">http://culttt.com/design</a>
  * <a href="http://httpster.net/" target="_blank">http://httpster.net/</a>
  * <a href="http://designspiration.net/" target="_blank">http://designspiration.net/</a>
  * <a href="http://niice.co/" target="_blank">http://niice.co/</a>

They really help me defeat the process of seeking inspiration for so long. When I have an idea of what I want already, I just sketch it out on a paper and keep in my diary  throughout that design.

After this, I wear my developer suits :D and open sublime text editor, starting with a code as little as this

> html:5

Little but powerful. With <a href="http://emmet.io/" target="_blank">Emmet</a>, that produces the following HTML5 document for me:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Document</title>
</head>
<body>
  
</body>
</html>
```

really cool right! Emmet helps a long way more. You should <a href="http://emmet.io/" target="_blank">check it out</a>.

One thing emmet does in that start HTML:5 document I don't like is the upper case UTF-8 in the meta tag. Not like there's anything wrong with this but it's just one of the things that makes me feel uncomfortable. I prefer it in lower case.

I add my viewport meta tag

```html
<meta name="viewport" content="width=device-width, initial-scale=1">
```

I download [modernizr][1] or just pick a local copy I already have and add it to my vendor sub folder inside my js folder. At this point I have a file structure in this form
```
 ├── styles/
    │   └── vendor/
    │   └── style.css
    ├── fonts/
    ├── images/
    ├── _js/
    │   ├── vendor/
    │   └── script.js
    │   └── plugins.js
    └── index.html
```

The separate JS files get concatenated in the end to avoid multiple HTTP requests.

The<a href="http://html5boilerplate.com/" target="_blank"> HTML5 boilerplate</a> is not so spoken of like it was at 2011 but it's still very much useful. I start up my project by including it and it's awesome the way I have a prepared 404.html page, I include <a href="http://modernizr.com/" target="_blank">modernizr</a> in the head. I add up Google CDN jQuery with a local fallback, and a favicon.png file to my root directory. My HTML structure then becomes:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Document</title>
  <link href='//fonts.googleapis.com/css?family=Open+Sans:400,800,300' rel='stylesheet' type='text/css'>
  <link rel="stylesheet" href="styles/style.css">
  <link rel="shortcut icon" href="favicon.png">
  <script src="js/vendor/modernizr.min.js"></script>
</head>
<body>
  <!--[if lt IE 7]>
  <p class="browsehappy">You are using an <strong>outdated</strong> browser. 
  Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p> 
  <![endif]-->
  <script>
      (function(b,o,i,l,e,r){b.GoogleAnalyticsObject=l;b[l]||(b[l]=
      function(){(b[l].q=b[l].q||[]).push(arguments)});b[l].l=+new Date;
      e=o.createElement(i);r=o.getElementsByTagName(i)[0];
      e.src='//www.google-analytics.com/analytics.js';
      r.parentNode.insertBefore(e,r)}(window,document,'script','ga'));
      ga('create','UA-XXXXX-X');ga('send','pageview');
  </script>
  <script src="//ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
  <script>window.jQuery || document.write('<script src="js/vendor/jquery-2.1.1.min.js"><\/script>')</script>
  <script src="js/script.js"></script>
</body>
</html>
```

I added a google font to that because most times I do the google fonts since I can't afford other webfonts. I also converted boilerplate's stylesheet to a partial (_h5bp.sass) and imported it in my styles.sass file.

Now the HTML is set up. The JS is fine as well. My main.js is where I write my javascript and plugins.js by HTML5 boilerplate has a nice fallback for browsers without console and also gives me space to initialize my third-party plugins.

```js
// Avoid `console` errors in browsers that lack a console.
(function() {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());

// Place any jQuery/helper plugins in here.
$(document).ready(function(){
    $('.flexslider').flexslider({
        animation: "fade",
        controlNav: false
    });
})
```

I just gave an example of flexslider being used in my project to show usage of plugins.

I'll say my whole javascript is fine but <a href="https://developers.google.com/speed/pagespeed/insights/" target="_blank">pagespeed</a> really matters to me and this makes me take minification very seriously. I minify my js with <a href="http://gruntjs.com" target="_blank">grunt</a> <a href="https://www.npmjs.org/package/grunt-contrib-uglify" target="_blank">uglify</a> after installing it with <a href="https://npmjs.org/" target="_blank">npm</a>.

```
npm install grunt-contrib-uglify --save-dev
```

After this step, all that needs to be done is to register the task in Gruntfile.js

```js
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'js/main.js',
        dest: 'js/main.min.js'
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Default task(s).
  grunt.registerTask('default', ['uglify']);

};
```

I had created a package.json file from the start of the project with `npm init`. Now everything seems fine with JS. I'll just have to change main.js to main.min.js at the end of my design.

### **The CSS**

I write Sass (indented). For those that agree with my steps from the beginning and got here to say :

> B.S! He uses indented Sass

I feel comfortable with indented sass maybe because I'm a python developer and I live by indenting :P. I've been thinking I'll change to Scss format soon enough. I really <a title="Sass and Compass: My Best Friends" href="http://josephrex.me/sass-and-compass-my-best-friends/" target="_blank">leverage Sass by using compass</a>. Consider all you want just getting done so easily.

First, I make use of <a href="http://compass-style.org/reference/compass/" target="_blank">compass extensions</a>, they help and provide me with a lot of useful mixins in addition with the ones I created myself. Here are some of mine

```scss
=three-d($shadowcolor)
	position: relative
	box-shadow: 1px 1px $shadowcolor, 2px 2px $shadowcolor, 3px 3px $shadowcolor
	transition: all 0.1s ease-in
	&:active
		box-shadow: none
		top: 3px
		left: 3px

=font-face($family, $path, $svg, $weight: normal, $style: normal)
	@font-face
		font-family: $family
		src: url('#{$path}.eot')
		src: url('#{$path}.eot?#iefix') format('embedded-opentype'), url('#{$path}.woff') format('woff'), url('#{$path}.ttf') format('truetype'), url('#{$path}.svg##{$svg}') format('svg')
		font-weight: $weight
		font-style: $style

// Makes Ellipsis on Single Line
=ellipsis-line($width)
	width: $width
	text-overflow: ellipsis
	overflow: hidden
	white-space: nowrap

// GrayScale Filter
=grayscale($level)
	-webkit-filter: grayscale($level)
	filter: grayscale($level)

=socle()
	position: relative
	z-index: 2
	&:after
		content: ""
		z-index: -1
		position: absolute
		border-radius: 6px
		box-shadow: inset 0 1px 0 rgba(0,0,0,0.1), inset 0 -1px 0 rgba(255,255,255,0.7)
		top: -6px
		bottom: -6px
		right: -6px
		left: -6px
		background: linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0))
// Gradients
=gradient-dark-linear
	background-image: -webkit-linear-gradient(rgba(0,0,0,.25), rgba(0,0,0,0))
	background-image: -o-linear-gradient(rgba(0,0,0,.25), rgba(0,0,0,0))
	background-image: linear-gradient(rgba(0,0,0,.25), rgba(0,0,0,0))
=gradient-light-linear
	background-image: -webkit-linear-gradient(rgba(255,255,255,.5), rgba(255,255,255,0))
	background-image: -o-linear-gradient(rgba(255,255,255,.5), rgba(255,255,255,0))
	background-image: linear-gradient(rgba(255,255,255,.5), rgba(255,255,255,0))
=gradient-dark-radial
	background-image: radial-gradient(center 0, circle farthest-corner, rgba(0,0,0,0.15), rgba(0,0,0,0))
=gradient-light-radial
	background-image: radial-gradient(center 0, circle farthest-corner, rgba(255,255,255,0.4), rgba(255,255,255,0))
```

Kitty Giraudel gave <a href="http://www.sitepoint.com/sass-mixins-kickstart-project/" target="_blank">some kick-start mixins here</a>. I also use <a href="http://breakpoint-sass.com/" target="_blank">breakpoints</a> for my responsive styling.

<pre class="lang:default decode:true ">sudo gem install breakpoint</pre>

with it you can write media queries like this

```scss
.fancy
   width: 500px
   +breakpoint(max-width 1200px)
        width: 200px
```

which is an equivalent of the following CSS

```scss
.fancy{
   width: 500px;
}
@media only screen and (max-width: 1200px){
   .fancy{
      width: 200px;
    }
}
```

The force is with me on this one.

When there is need for grids, I call for <a href="http://susydocs.oddbird.net/en/latest/install/" target="_blank">susy</a>. Susy is way better than bootstrap grids in that I don't have to load some unnecessary classes I don't need. I call for grids just when I need them this way

```scss
.container
   +container(100%)
   >div
      +span(25%)
```

with a mark-up of this sort

```html
<div class="container">
  <div></div>
  <div></div>
  <div></div>
  <div></div>
</div>
```

That's just 4 grids but we can go 12 just like bootstrap too. I like the idea that we can just call grids on demand rather than loading excess mark-up as with bootstrap.

Finally, I will like my websites to have browser compatibility when using properties by some vendor browsers. <a href="http://css-tricks.com/autoprefixer/" target="_blank">Autoprefixer</a> comes to my rescue at this point. I just need to add it to require it in my config.rb with my breakpoints and susy. But I also have to do some things to make it work after CSS file is generated, since it is a post processor.

```rb
require 'compass/import-once/activate'
require 'autoprefixer-rails'
on_stylesheet_saved do |file|
  css = File.read(file)
  File.open(file, 'w') do |io|
    io < AutoprefixerRails.process(css)
  end
end
require 'breakpoint'
require 'susy'

http_path = "/"
css_dir = "stylesheets"
sass_dir = "sass"
images_dir = "images"
javascripts_dir = "js"

output_style = :compressed
```

I also set output_style to compressed in my config.rb to get a resulting minified CSS. Finally, I  had put a snippet of <a href="http://google.com/analytics" target="_blank">google analytics</a> at the bottom to help me monitor and maintain the website.

Now I'm all set. I don't have to do all this every time I start a new project as I've made a default directory where I have it all set up. In cases where I have to use bootstrap, I also have a default-bootstrap directory where bootstrap is included in my config.rb.

These are good practices and I really do hope it helps anyone that stumbles upon them.

<div class="update">
  <h4>
    Update
  </h4>
  
  <p>
    12/13/2014 - I use Scss now. See <a title="Moving from Indented Sass to Scss" href="http://josephrex.me/moving-from-indented-sass-to-scss/">this post</a>
  </p>
</div>

 [1]: http://modernizr.com/
