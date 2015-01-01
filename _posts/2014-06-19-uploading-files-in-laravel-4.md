---
title: Uploading files in Laravel 4
author: Joseph Rex
layout: post
permalink: /uploading-files-in-laravel-4/
categories:
  - web
tags:
  - frameworks
  - laravel
  - PHP
---
Below is an example of an HTML form written in blade template and laravel illuminate form builder

<pre class="lang:ruby decode:true">{{ Form::open(['action' =&gt; 'method@controller','file' =&gt; 'true']) }}
{{ Form::input('text','name') }}
{{ Form::input('file','file') }}
{{ Form::submit('Enter') }}

{{ Form::close() }}</pre>

It says I have a file with the name values as file. To handle this upload, you can use the controller method used for handling the entire form and have the following inside it

<pre class="lang:php decode:true">if(Input::hasFile('file')){
            $file = Input::file('file');
     
            $destinationPath = public_path().'/uploads';
            $filename = 'logo_'.str_random(12);
            //$filename = $file-&gt;getClientOriginalName();
            $extension = $file-&gt;getClientOriginalExtension();
            $destinationFilename = $filename.'.'.$extension;
            try{
                $upload_success = Input::file('file')-&gt;move($destinationPath, $destinationFilename);
            }catch(Exception $e){
                return Response::json(['message' =&gt; $e-&gt;getMessage()]);
            }

        }</pre>

Using the hasFile method on Input allows you check if the file was uploaded. If it was uploaded, a destination path should be set. You should note that you must include public_path() to make your path absolute and in your public folder where public files can be accessed.

&nbsp;