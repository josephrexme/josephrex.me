---
title: Things that do not exist but exist in Ruby
author: Joseph Rex
layout: post
permalink: /things-that-do-not-exist-but-exist-in-ruby/
categories:
  - programming
  - ruby
tags:
  - missing
  - ruby
---
[<img class="aligncenter size-large wp-image-499" src="http://josephrex.me/wp-content/uploads/2014/12/rubydev-1024x576.png" alt="ruby code" width="634" height="357" />][1]

I&#8217;ve written object oriented programs in PHP and Python and one of the major things known about Object oriented programming is the existence of constructors and maybe destructors. We curse PHP for not being complete yet its OOP consist of this. In Python when building GUI programs, I call slots and signals from different methods that all share something in common which is specified in the \_\_init\_\_ method (our constructor). Python didn&#8217;t have to call it _constructor like PHP does but it exists anyway.

I&#8217;ve been working with rails lately and I&#8217;ve had to write ruby which I totally enjoy. However, there are some things in Ruby that exist just as patches not like a core feature provided by the language. I will only be talking about two things but I&#8217;ll update this article in the future when I find more.

### Constructors

I spoke of constructors in Python and PHP because I will like to point at the fact that there are really no such things as constructors in ruby. To achieve making a variable available to all methods in a class, you have to go through the following which is a bit hacky

<pre class="lang:ruby decode:true ">class FooBar
  before_filter :init
  
  def cool
    # dong variable now available here
    "My father said #{dong}"
  end
  private
  def init
    # This is sorta-like a constructor to drop vars for all methods
    dong = "Let's play a game"
  end
end</pre>

###  Hash Item Deletion

PHP doesn&#8217;t really distinguish index arrays from hash-type arrays. They are all called arrays. By index arrays, I mean arrays written this way

<pre class="lang:php decode:true">// Index Arrays
$arr = ['pub','pitbull','german-shepard'];

// Or if you like it this way
$arr = array('pub','pitbull','german-shepard');</pre>

And by Hash-Type Arrays, I mean this

<pre class="lang:default decode:true">$arr = ['a'=&gt;'astronaut','b'=&gt;'bank','c'=&gt;'cool','j'=&gt;'joe'];</pre>

For the index arrays, the indexes are the keys, and the Hash-type, the key as used is the key. To delete a specific item from an array in PHP, you will unset the key like so :

<pre class="lang:php decode:true ">unset($arr['j'])</pre>

In Python, Hashes are known as dictionaries and we can create one this way

<pre class="lang:python decode:true">dict = {'a':'astronaut','b':'bank','c':'cool','j':'joe'}</pre>

To remove an item from this dictionary

<pre class="lang:default decode:true ">del dict['j']</pre>

In Ruby, a simple Hash

<pre class="lang:default decode:true ">myHash = {'a'=&gt;'astronaut','b'=&gt;'bank','c'=&gt;'cool','j'=&gt;'joe'}</pre>

There&#8217;s a delete method to call on a hash that takes the key to be deleted

<pre class="lang:ruby decode:true">myHash.delete('j') # returns joe (the value of j)</pre>

it&#8217;s weird how it returns the value of j. If it was to return anything at all, it should be what&#8217;s left after &#8216;j&#8217; is removed. But then I must mention that myHash has changed and it no longer contains the &#8216;j&#8217; item. When considering convention in ruby with methods like upcase, capitalize, gsub, merge, we can have them to strictly keep the change by adding an exclamation (!) like

<pre class="lang:ruby decode:true ">string.upcase!

string.capitalize!</pre>

but this wouldn&#8217;t work with delete. If the delete method was returning what is expected then it must likely would. Conclusively the delete is unreliable for the job.

So how do we remove an item from Hash in ruby? You have to<a href="http://stackoverflow.com/questions/6227600/how-to-remove-a-key-from-hash-and-get-the-remaining-hash-in-ruby-rails" target="_blank"> build your way around it</a>. So we have to write our own class like:

<pre class="lang:ruby decode:true ">class Hash
  # Return a hash that includes everything but the given keys. This is useful for
  # limiting a set of parameters to everything but a few known toggles:
  #
  #   @person.update_attributes(params[:person].except(:admin))
  #
  # If the receiver responds to +convert_key+, the method is called on each of the
  # arguments. This allows +except+ to play nice with hashes with indifferent access
  # for instance:
  #
  #   {:a =&gt; 1}.with_indifferent_access.except(:a)  # =&gt; {}
  #   {:a =&gt; 1}.with_indifferent_access.except("a") # =&gt; {}
  #
  def except(*keys)
    dup.except!(*keys)
  end

  # Replaces the hash without the given keys.
  def except!(*keys)
    keys.each { |key| delete(key) }
    self
  end
end</pre>

Which now makes it possible to do the following on our Hash

<pre class="lang:default decode:true">myHash.except('j') # returns {'a'=&gt;'astronaut','b'=&gt;'bank','c'=&gt;'cool'}</pre>

&nbsp;

Now that took off our &#8216;j&#8217; item as expected. To keep the change to the myHash variable we can have it as most of the other methods with a bang

<pre class="lang:default decode:true ">myHash.except!('j')</pre>

When using rails, you don&#8217;t need to re-write this class as rails already provides this but I think it should be built into Ruby. To use this while debugging your app from the console, you can use it with pry. You can bind pry with rails by running within your application

<pre class="lang:sh decode:true ">~$pry -r ./config/environment</pre>

I find the most useful when updating many attributes from the update method and I have some attributes I don&#8217;t want to send to the database. Like:

<pre class="lang:ruby decode:true ">@article.update_attributes(article_params.except("id","some_field"))</pre>

&nbsp;

 [1]: http://josephrex.me/wp-content/uploads/2014/12/rubydev.png