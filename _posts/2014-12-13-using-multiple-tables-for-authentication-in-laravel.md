---
title: Using Multiple tables for authentication in laravel
author: Joseph Rex
layout: post
comments: true
permalink: /using-multiple-tables-for-authentication-in-laravel/
categories:
  - web
tags:
  - authentication
  - laravel
---
Laravel provides a good authentication handler with the Auth class. To authenticate a user attempting to log in, we use the attempt method like so:

{% highlight php %}
<?php
if (Auth::attempt(array('email' => $email, 'password' => $password)))
{
    return Redirect::intended('dashboard');
}
?>
{% endhighlight %}

That's just as it is <a href="http://laravel.com/docs/4.2/security#authenticating-users" target="_blank">in the docs</a>. But this checks against the users table which is fine because most apps have a users table for authentication. I've never had a need to build something requiring more tables for authentication but I had someone requesting for a solution to this and I was really interested in getting this to work.

If you don't already have a <a title="Create a helpers file" href="http://laravel-recipes.com/recipes/50/creating-a-helpers-file" target="_blank">helpers file</a>, create one. I made this neat little facade-style function for you to replace with Auth::attempt.

{% highlight php %}
<?php
class Hack{
	/**
	* @author 	Joseph Rex
	* @since 	12/09/2014
	* @param 	array 	format: array('database'=>'database_for_query','username'=>'username_or_email','password'=>'password')
	* @return 	bool
	*/
	public static function verify(array $auth = array()){
		$fields = array_keys($auth);
		// Now we will use eloquent to immitate this DB::where(email, 'email')
		$model = ucfirst( strtolower( substr($auth[$fields[0]], 0, -1) ) );
		$fetch = $model::where( $fields[1], $auth[$fields[1]] )->first();
		if( ($fetch == NULL) || (count($auth) !== 3) ):
			return false;
		elseif( crypt($auth[$fields[2]], $fetch->password) == $fetch->password ):
			Session::put('id', $fetch->id);
			return true;
		else:
			return false;
		endif;
	}
}
?>
{% endhighlight %}

The function is self-explanatory. It checks if the user exists in the database using the fields you provide as key for the validation function. If the user exists, it fetches the user details which includes the password and id. This part requires that you should have a model for the table you are validating as it uses eloquent ORM.

The password is checked for validity and if it passes, the pooled id from the database is used to create a session id for the user. It is used like so:

{% highlight php %}
<?php
if (Hack::verify(array('database' => 'users' ,'email' => $email, 'password' => $password)))
{
    return Redirect::intended('dashboard');
}
?>
{% endhighlight %}

Did I forget to mention? The first argument is the name of the database you want to authenticate, making it more flexible.