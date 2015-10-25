---
title: Migrating database password algorithm gracefully
author: Joseph Rex
layout: post
comments: true
permalink: /migrating-database-password-algorithm-gracefully/
---
If you are a developer that keeps up with the community and best practices you will often find bits of your code and process that needs improvement for security, scalibility, performance or whatsoever. Sometimes it's not code you wrote but code that had been used in a company you find yourself. The situation here is to change the application's users database encyption from that salted MD5 or SHA1 hash or even a non-salted integrity based hash to a hash that uses multiple rounds like bcrypt.
<!--more-->

You may be complacent that your salted hash can escape dictionary attacks but what if your code leaks? or the intruder discovers how your salts are generated with their access to the database? Bcrypt to the rescue. For the rails community, since version 3 when [has_secure_password][2] was introduced, passwords storage have been handled in bcrypt. If however you are writing something custom in ruby then this is how it works:

{% highlight ruby %}
require 'bcrypt'
BCrypt::Password.create("secret")
{% endhighlight %}

A really good part to it is that it already handles salting for you and wouldn't require you to go through that extra process. PHP also does this nicely from version 5.5 with the *password_hash* function.

{% highlight php %}
password_hash($clearText, PASSWORD_DEFAULT, array('cost'=>10));
{% endhighlight %}

This requires that you also check if the password needs a hash upgrade on every login
{% highlight php %}
if(password_verify($clearText, $hash)){
	if(password_needs_rehash($hash, $algo, $options)){
    $hash = password_hash($clearText, $algo, $options);
  }
}
{% endhighlight %}

On lesser PHP versions it's best you just upgrade but if you are constrained by server restrictions then you can use Anthony Ferrara's (ircmaxell) [password compat library][3] with php >= 5.3.7

#### The problem
After so much awareness on how you can improve your database password storage you realize your company already has a large userbase. Even if less, you don't want to make the users have to reset passwords they didn't forget.

After asking around and spending some time to think of best solutions I got to a conclusion that resulted in this:

{% image 'passwordmigrateschema1.png' alt="first password schema" %}

With *password_hash* containing bcrypt passwords (initially empty) and *password_hash2* containing old salted MD5. The intended flow is that after users are checked against password_hash and it is empty then it verifies their password_hash2 and creates a new bcrypt password for them in the password_hash column.

A great con to this is the additional unneccessary column. Why should I have a empty column from the start right? Then I read [*NeoThermic's* approach][4] to this on **/r/php** on reddit also contributed to by ircmaxell and the idea of a legacy column got me so pulled in. After then I restructured my schema to something I see as a better idea

{% image 'passwordmigrateschema2.png' alt="first password schema" %}

Legacy values appears as **True** and **False** boolean in the image but are stored as *1*s as *0*s. The password_hash column will contain all passwords (both the bcrypt and md5). A `DEFAULT 0` is required on the legacy table while all the existing users get updated with a legacy value of 1. If a user attempts log in with a legacy value 1, the program should store the plain text in a variable and check against the MD5 password. If it verifies, a password upgrade will happen by updating legacy value to 0 and storing plain text password in bcrypt.

The sample snippet below should make it clearer if you'd rather deal with less words

{% highlight php %}
<?php
try{
	$email = 'johndoe@gmail.com';
	$plainTextPassword = 'secret';
  $stmt = $db->prepare('SELECT id, email, password_hash, salt, legacy FROM users WHERE email = :id');
  $stmt->execute([':id' => $email]);
  if($stmt->rowCount() > 0){
  	// Checking if the user exists
	  $row = $stmt->fetchAll(PDO::FETCH_ASSOC);
	  if($row['legacy'] == 1){
	  	if($newPassword.$row['salt'] === md5($plainTextPassword).$row['salt']){
	      $newPassword = password_hash($plainTextPassword, PASSWORD_DEFAULT, ['cost' => 10]);
	      $legacy = 0;
	      $stmt = $db->prepare(sprintf('UPDATE users SET legacy = :legacy AND password_hash = :hash WHERE id = %d', $row['id']));
	      $stmt->execute([':legacy' => $legacy, ':hash' => $newPassword]);
	      // log the user in
	    }else{
	    	echo "Invalid username or password";
	    }
	  }else{
      if(password_verify($plainTextPassword, $row['password_hash'])){
      	if(password_needs_rehash($row['password_hash'], PASSWORD_DEFAULT, ['cost' => 10])){
      		$newPassword = password_hash($plainTextPassword, PASSWORD_DEFAULT, ['cost' => 10]);
      		// store new password
      	}
      	// log the user in
      }else{
      	echo "Invalid username or password";
      }
	  }
	}else{
		echo "User does not exist";
	}
}catch(PDOException $e){
	echo "The following error occurred: {$e}";
}
{% endhighlight %}

Or just use a framework helper and avoid the excess lines of PHP code. I see no reason to explain the ruby method for this because life is just a lot easier with rails and similar ruby frameworks.
<style>
img{ transform: scale(1.5); -webkit-transform: scale(1.5); -moz-transform: scale(1.5) }
</style>

[1]: http://www.hanselman.com/blog/DarkMatterDevelopersTheUnseen99.aspx
[2]: http://api.rubyonrails.org/classes/ActiveModel/SecurePassword/ClassMethods.html
[3]: https://github.com/ircmaxell/password_compat
[4]: https://www.reddit.com/r/PHP/comments/3lwxlw/hash_and_verify_passwords_in_php_the_right_way/cva6y6p