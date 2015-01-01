---
title: Sending files over Ajax requests with jQuery
author: Joseph Rex
layout: post
permalink: /sending-files-over-ajax-requests-with-jquery/
categories:
  - web
tags:
  - ajax
  - javascript
  - jquery
  - PHP
  - XHR
---
If you&#8217;ve been writing [jQuery,][1] you&#8217;re probably fond of writing your code this way when submitting forms with ajax

<pre class="lang:js decode:true">$('form').on('submit',function(e){
    e.preventDefault();
    var data = $(this).serialize();
    $.ajax({
      type:"POST",
      data:data,
      url: yourUrl
    }).done(function(response){
      console.log(response);
    }).fail(function(){
      console.log("It failed");
      });

  });</pre>

and for those using older versions of jQuery, it should be something like this you have:

<pre class="lang:js decode:true">$('form').on('submit',function(e){
    e.preventDefault();
    var data = $(this).serialize();
    $.ajax({
      type:"POST",
      data:data,
      url: yourUrl
      success:function(response){
       console.log(response);
      },
     error:function(){
       console.log("It failed");
    });

  });</pre>

Either way you have it, a problem you will encounter when working with file inputs will be that your files do not get uploaded. This is because [XMLHttpRequests (XHR)][2]  was not supporting Form Data Objects with file inputs.

According to [the standards by mozilla][3] support has been added for XHR Level 2. This makes it easy to transfer files with Ajax requests. All you need is a little tweak in your code.

If you have the following HTML

<pre class="lang:xhtml decode:true ">&lt;form action=""&gt;
&lt;input type="text" name="title"&gt;
&lt;input type="file" name="file"&gt;
&lt;/form&gt;</pre>

You can handle the file upload in ajax as shown here:

<pre class="lang:default decode:true">$('form').on('submit',function(e){
    e.preventDefault();
    var data = new FormData($('#compform')[0]);
    $.ajax({
      type:"POST",
      data:data,
      url: yourURL,
      processData: false,
      contentType: false
    }).done(function(response){
      console.log(response.id);
    }).fail(function(){
      console.log("It failed");
      });

  });</pre>

This was stated by the Mozilla Developer Network [here][4]

 [1]: http://jquery.com
 [2]: https://developer.mozilla.org/en-US/docs/DOM/XMLHttpRequest
 [3]: https://developer.mozilla.org/en-US/docs/Web/API/FormData
 [4]: https://developer.mozilla.org/en-US/docs/Web/Guide/Using_FormData_Objects