---
author: Joseph Rex
comments: true
date: 2015-03-30T00:00:00Z
title: Understanding how ajax upload preview works
permalink: /understanding-how-ajax-upload-preview-works/
---

From a very early stage of my development, I've been fascinated by ajax upload previews and [dropzone][1] upload areas. For a long time I guess I was too scared to try any of them but after some time, I started using some jQuery plugins that did the job fine. I could have been contended with that and just have that in my every project but every project aren't the same. I may use a bunch of plugins on a static website but on web applications where I'm so conscious about performance I prefer taking my time to write code that will help me do away with plugins or gems where I can.
<!--more-->

There are some of these that are really important and one will only be re-inventing the wheel by trying to re-write them but a upload preview is just too small to be considered as re-inventing the wheel. On a recent rails project where I was using the twitter-style page edit, I needed such file upload and by gathering ideas I came up with the way to go about it.

To do this, there should be the user avatar image where they can click for upload when the page is in editable state. Also, we need a file upload form.

```html
<img src="profile.jpg" alt="My profile" class="avatar">
<input type="file" id="uploadAvatar" style="visibility: hidden">
```

These two elements will be communicating with each other and that requires adding some JS hooks in class and id. The actual file upload form also has to be visuall hidden. You can use any approach you find suitable to achieve this. I've had cases where I used text-indent and some times, I use the hidden visibility and place the element absolutely in a place where it doesn't disturb the actual page.

We want the user to click the avatar image for the file upload dialog to pop so we will have to trigger a click on the actual input form when the `.avatar` image is clicked.

```js
$('.avatar').click(function(){
    $('#uploadAvatar').trigger('click');
});
```

The next challenge will be to have a way to display the images selected on the web page. To do this, we will use the JavaScript FileReader object to get the data-URI of the selected image and set it as a background of the upload area. We have to listen to the change event of the file upload input to grab image data when uploaded.

```js
$('#uploadAvatar').change(function(){
  if(this.files && this.files[0]){
    var reader = new FileReader();
    reader.onload = function(e){
      $(".avatar::before").addRule({
        background: "url("+e.target.result+")",
        content: ""
      });
      $(".avatar::before").addRule("background-size: 100%");
    }
    reader.readAsDataURL(this.files[0]);
  }
});
```

Notice my use of addRule there. That's not a built-in JavaScript function. I had used it because my upload preview is shown on a pseudo element on top of the actual image rather than as a replacement of the image. This is useful when you are using an image tag to load the actual image and setting a background wouldn't overwrite the displayed image.

There's no regular way to add styles to pseudo elements with JavaScript so I used this [neat little function][2] by [Yannick Albert][3]. This is a working demo of this:

<p data-height="268" data-theme-id="0" data-slug-hash="yyWrxO" data-default-tab="result" data-user="bl4ckdu5t" class='codepen'>See the Pen <a href='http://codepen.io/bl4ckdu5t/pen/yyWrxO/'>yyWrxO</a> by Joseph Rex (<a href='http://codepen.io/bl4ckdu5t'>@bl4ckdu5t</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>


[1]: http://www.dropzonejs.com/
[2]: https://gist.github.com/yckart/5563717
[3]: http://yckart.com