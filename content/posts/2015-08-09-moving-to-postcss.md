---
author: Joseph Rex
comments: true
date: 2015-08-09T00:00:00Z
title: Moving to PostCSS
url: /moving-to-postcss/
---

At some point as a developer you've thought of leveling up by leaving spaghetti CSS to write in preprocessors. There are 3 popular CSS preprocessors LESS, Sass, Stylus, and there may be others I've never heard of. What makes CSS hard is its lack of logic. These preprocessors made our workflow easier by introducing logic to us like iterating things that regular CSS coders will spend ours rewriting, use of partials, use of mixins and variables.
<!--more-->

I never used any other preprocessor but Sass which I started by writing in indented format till I moved ahead with most industry experts to write in the SCSS syntax for clarity. It's a good thing some developers have chosen to take this step towards getting better at writing stylesheets but we're still coding for the web and the web changes very often.

[PostCSS][1] was introduced first in 2013 and it sounded pretty much like every other preprocessor we already had except for the fact that its Readme said it is a post-processor which is different from what I've always heard. A post processor? Really? How does that work? I ignored it with the thoughts that it was too much for me to start worrying about and went back to writing the good ol' Sass.

Some days ago I came across the article [Migration from Sass to PostCSS][2] by [Ben Frain][3] and I have a new project I'm working on where I'm willing to try out new technologies. The post was so convincing that it made me decide to take a leap into PostCSS. I have a contrary opinion to what he said in the summary

> For the majority of style sheet authors currently (and happily) using Sass, there is little benefit in jumping ship to PostCSS right now. I hope it’s clear from this post that I believe to do so would be for philosophical and/or personal reasons. My default advice to someone looking to pick a tool to help organise and maintain CSS would still be ‘use Sass’.

I think there is a huge benefit jumping ship to PostCSS right now and maybe it's just the difference between when he posted and when I'm posting but there's a lot of benefits switching over to PostCSS.

To use PostCSS, you have to integrate it to your build process to have it post-processing CSS files after they are saved. The two popular task runners that come to mind are [Grunt][4] and [Gulp][5] but there [are][6] [many][7] [more][8] [these][9] [days][10]. I always used Grunt but my new project is about trying new things besides I have heard of how Gulp smacks Grunt with code over configuration. If you're already using Gulp in your workflow it'll be very easy to get started but if you aren't I'll go through every detail.

[Install gulp][5] and set up your gulpfile like I have mine below:

```js
var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload;


var postcss = require('gulp-postcss');
var cssImport = require('postcss-import');
var mixins = require('postcss-mixins');
var simpleVars = require('postcss-simple-vars');
var nested = require('postcss-nested');
var autoprefixer = require('autoprefixer-core');
var cssnext = require('gulp-cssnext');
var mqpacker = require('css-mqpacker');
var cssnano = require('cssnano');
var sourcemaps = require('gulp-sourcemaps');
var pixrem = require('pixrem')

gulp.task('css', function(){
  var processors = [
    cssImport,
    mixins,
    simpleVars,
    nested,
    autoprefixer({browsers: ['last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4']}),
    mqpacker,
    pixrem,
    cssnano
  ];
  return gulp.src('./src/css/*.css')
    .pipe(cssnext({compress: true }))
    .pipe(postcss(processors))
    .pipe(gulp.dest('./dist/css'));

});

// Static server
gulp.task('browser-sync', function(){
  browserSync({
    server: {
      baseDir: "./"
    }
  });
});

// Concatenate & Minify
gulp.task('scripts', function(){
  return gulp.src('./src/js/*.js')
    .pipe(sourcemaps.init())
    .pipe(concat('app.js'))
    .pipe(gulp.dest('dist/js'))
    .pipe(uglify())
    .pipe(sourcemaps.write('../maps'))
    .pipe(gulp.dest('dist/js'))
    .pipe(reload({stream:true}));
});

// Watch
gulp.task('watch', function(){
  gulp.watch('./src/**/*.css', ['css', browserSync.reload]);
  
  gulp.watch(['./src/**/*.js', 'main.js'], ['scripts', browserSync.reload]);

  gulp.watch('*.html', browserSync.reload);
});


gulp.task('default', ['css', 'browser-sync', 'scripts', 'watch']);
```

You probably were using a task runner like this to use libsass for compiling your written Sass into CSS. Or you were using `compass watch` with the nice CSS3 features of compass and vendor prefix mixins. To emulate the watch feature in compass I have used the **watch** task and to make it even better I'm using **browser-sync** for live reload (no one wants to deal with reloading browsers anymore).

### I'm not convinced. Why should I leave Sass?
If you like holy wars you'll try to start throwing points on why PostCSS can't do what CSS does and your points will include the use of mixins, partials, variables, compass plugins, Sass nested statements, loops,

About compass plugins, there's way more plugins available for use with gulp and they are what will be used to fill in for those expected Sassy features.

<hr>

**Variables:** On the [PostCSS readme][11] you are given an option to use [cssnext][12] or [PreCSS][13]. PreCSS is a pack of plugins that makes you write sassy code with all the Sass features you left. While I can reason that you need some time to adopt to the new PostCSS you may want to do this but on deeper thoughts it's just like you never left Sass. CSSnext on the other hand encourages you to write [future friendly][17] CSS. The [CSS4 specs allows us declare variables in CSS][14] and you don't need to be afraid of whether this feature is supported yet or not as it will be post-processed into browser-compatible CSS. More features like custom properties are made possible with cssnext. If you still like to have it the good ol' way then you can use the [postcss-simple-vars][15] plugin to define variables just like you did in Sass. With this and other plugins that will be discussed you'll get the possible benefits of PreCSS while using cssnext.

**Partials:** If you were thinking of having underscore prefixed mixins, that's a ruby thing and we had to do that because Sass was born out of Ruby. The `@import` statement can be used to import files but it doesn't suppport [globbing imports][18]. To make the *@import* available the [postcss-import][16] plugin is needed and FYI it should be called before the other postcss dependent plugins (e.g postcss-simple-vars, postcss-mixins). Here's what my app.css look like as I import other modules into it

```scss
@import "partials/variables.css";
@import "partials/mixins.css";
@import "partials/h5bp.css";
@import "partials/animations.css";
@import "partials/layout.css";
@import "partials/print.css";
@import "partials/helpers.css";
```

I like to separate variables, mixins, html5 boilerplate CSS, and others as shown above. The downside to this is that there's no syntax coloring for the variables and mixins as they aren't regular CSS. The Sass and Scss formats have syntax coloring on editors like Sublime Text and Atom when necessary packages are installed.

**Mixins:** The mixin syntax with postcss is different from what you've been used to with Sass. It uses [postcss-mixins][19] and it's syntax is also pretty clear and easy:

```scss
@define-mixin icon $name {
  padding-left: 16px;
  &::after {
      content: "";
      background-url: url(/icons/$(name).png);
  }
}

.search {
  @mixin icon search;
}
```

Also note that when using postcss-nested and postcss-simple-vars it must be set before them.

**Minifying CSS:** From using compass I used to set an option to have compiled(minified) CSS output and I could also include Autoprefixer for postprocessing CSS to handle vendor prefixes within my *config.rb*. Autoprefixer is a derivative of the PostCSS project and now we can watch it do it's work with its mother project. To really handle css minification there are two options I consider which are [csswring][20] and [cssnano][21]. Csswring does its work properly but not as good as cssnano. Cssnano performs advanced compression to shrink CSS files and that makes it a [better option for optimisation][22].

If you need to handle data structures like iterating through a JSON file, you can go with [Ben Frain's technique][2]. Other important plugins I've used in my gulpfile.js that are not mentioned are *mqpacker*, *gulp-sourcemaps*, and *pixrem*. mqpacker for grouping similar media queries, gulp-sourcemaps for sourcemaps which I also used to handle in *config.rb* for compass, and finally *pixrem* something I had to write a mixin for on previous Sass projects. Pixrem finds all your rem values and create a px fallback for legacy browsers.

I'm excited about this transitioning and I think anyone taking this step will also enjoy the better workflow with PostCSS.

[1]: https://github.com/postcss/postcss
[2]: http://benfrain.com/breaking-up-with-sass-postcss/
[3]: http://twitter.com/benfrain
[4]: http://gruntjs.com
[5]: http://gulpjs.com
[6]: http://webpack.github.io/
[7]: http://broccolijs.com/
[8]: http://brunch.io/
[9]: http://mimosa.io/
[10]: http://jakejs.com/
[11]: https://github.com/postcss/postcss/blob/master/README.md#what-is-postcss
[12]: http://cssnext.io/
[13]: https://github.com/jonathantneal/precss
[14]: https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_variables
[15]: https://github.com/postcss/postcss-simple-vars
[16]: https://github.com/postcss/postcss-import
[17]: http://futurefriend.ly
[18]: https://github.com/chriseppstein/sass-globbing
[19]: https://github.com/postcss/postcss-mixins
[20]: https://www.npmjs.com/package/csswring
[21]: http://cssnano.co/
[22]: http://cssnano.co/optimisations/
