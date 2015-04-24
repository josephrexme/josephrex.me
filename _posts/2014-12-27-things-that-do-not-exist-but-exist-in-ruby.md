---
title: Things that do not exist but exist in Ruby
author: Joseph Rex
layout: post
comments: true
permalink: /things-that-do-not-exist-but-exist-in-ruby/
categories:
  - programming
  - ruby
tags:
  - missing
  - ruby
---
I've written object oriented programs in PHP and Python and one of the major things known about Object oriented programming is the existence of constructors and maybe destructors. We curse PHP for not being complete yet its OOP consist of this. In Python when building GUI programs, I call slots and signals from different methods that all share something in common which is specified in the \_\_init\_\_ method (our constructor). Python didn't have to call it _constructor like PHP does but it exists anyway.
<!--more-->
{% image rubydev.png class="head-image" alt="ruby code" %}

I've been working with rails lately and I've had to write ruby which I totally enjoy. However, there are some things in Ruby that exist just as patches not like a core feature provided by the language. I will only be talking about two things but I'll update this article in the future when I find more.

### Constructors

I spoke of constructors in Python and PHP because I will like to point at the fact that there are really no such things as constructors in ruby. To achieve making a variable available to all methods in a class, you have to go through the following which is a bit hacky

{% highlight ruby linenos %}
class FooBar
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
end
{% endhighlight %}

###  Hash Item Deletion

PHP doesn't really distinguish index arrays from hash-type arrays. They are all called arrays. By index arrays, I mean arrays written this way

{% highlight php %}
<?php
/* Index Arrays */
$arr = ['pub','pitbull','german-shepard'];

// Or if you like it this way
$arr = array('pub','pitbull','german-shepard');
{% endhighlight %}

And by Hash-Type Arrays, I mean this

{% highlight php %}
<?php
$arr = ['a'=>'astronaut','b'=>'bank','c'=>'cool','j'=>'joe'];
{% endhighlight %}

For the index arrays, the indexes are the keys, and the Hash-type, the key as used is the key. To delete a specific item from an array in PHP, you will unset the key like so :

{% highlight php %}
<?php
unset($arr['j']);
{% endhighlight %}

In Python, Hashes are known as dictionaries and we can create one this way

{% highlight python %}
dict = {'a':'astronaut','b':'bank','c':'cool','j':'joe'}
{% endhighlight %}

To remove an item from this dictionary

{% highlight python %}
del dict['j']
{% endhighlight %}

In Ruby, a simple Hash

{% highlight ruby %}
myHash = {'a'=>'astronaut','b'=>'bank','c'=>'cool','j'=>'joe'}
{% endhighlight %}

There's a delete method to call on a hash that takes the key to be deleted

{% highlight ruby %}
myHash.delete('j') #=> 'joe'
{% endhighlight %}

it's weird how it returns the value of j. If it was to return anything at all, it should be what's left after `j` is removed. But then I must mention that myHash has changed and it no longer contains the `j` item. When considering convention in ruby with methods like upcase, capitalize, gsub, merge, we can have them to strictly keep the change by adding an exclamation (!) like

{% highlight ruby %}
string.upcase!

string.capitalize!
{% endhighlight %}

but this wouldn't work with delete. If the delete method was returning what is expected then it must likely would. Conclusively the delete is unreliable for the job.

So how do we remove an item from Hash in ruby? You have to<a href="http://stackoverflow.com/questions/6227600/how-to-remove-a-key-from-hash-and-get-the-remaining-hash-in-ruby-rails" target="_blank"> build your way around it</a>. So we have to write our own class like:

{% highlight ruby linenos %}
class Hash
  # Return a hash that includes everything but the given keys. This is useful for
  # limiting a set of parameters to everything but a few known toggles:
  #
  #   @person.update_attributes(params[:person].except(:admin))
  #
  # If the receiver responds to +convert_key+, the method is called on each of the
  # arguments. This allows +except+ to play nice with hashes with indifferent access
  # for instance:
  #
  #   {:a => 1}.with_indifferent_access.except(:a)  # => {}
  #   {:a => 1}.with_indifferent_access.except("a") # => {}
  #
  def except(*keys)
    dup.except!(*keys)
  end

  # Replaces the hash without the given keys.
  def except!(*keys)
    keys.each { |key| delete(key) }
    self
  end
end
{% endhighlight %}

Which now makes it possible to do the following on our Hash

{% highlight ruby %}
myHash.except('j') #=> {'a'=>'astronaut','b'=>'bank','c'=>'cool'}
{% endhighlight %}


Now that took off our `j` item as expected. To keep the change to the myHash variable we can have it as most of the other methods with a bang

{% highlight ruby %} myHash.except!('j') {% endhighlight %}

When using rails, you don't need to re-write this class as rails already provides this but I think it should be built into Ruby. To use this while debugging your app from the console, you can use it with pry. You can bind pry with rails by running within your application

{% highlight sh %}
~$pry -r ./config/environment
{% endhighlight %}

I find the most useful when updating many attributes from the update method and I have some attributes I don't want to send to the database. Like:

{% highlight ruby %}
@article.update_attributes(article_params.except("id","some_field"))
{% endhighlight %}
