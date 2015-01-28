---
title: Using Beanstalkd and Supervisor to handle queues in Laravel4
author: Joseph Rex
layout: post
comments: true
permalink: /using-beanstalkd-and-supervisor-to-handle-queues-in-laravel4/
categories:
  - web
tags:
  - beanstalkd
  - laravel
  - PHP
  - queues
  - supervisor
---
{% image security_lights.jpg class="head-image" alt="security lights" %}
When performing some tasks that take time with your web application, you usually don't want to keep your users waiting for a better user experience.

Taking email sending for an example, it takes about a minute to two for an email to be sent with your web app. Do you really want to keep your non geeky application users staring at a screen for that long, just watching an ajax image loader spin, or just waiting to get a response that the task has been completed. No, I don't think so.

The use of queues saves us by helping us provide a great user experience for our app users. I was never privy of this great feature till I started using Laravel. I'll discuss how to use the two tools which gives me a wonderful development experience with queues.

### [Beanstalkd][1]

Beanstalkd is the driver that handles the task queuing and processing. To use beanstalkd, first you should go to app/config/queue.php and change the default driver to beanstalkd

{% highlight php %}
'default' => 'beanstalkd'
{% endhighlight %}

Then you need to install beanstalkd. On debian based distributions, it can be installed with apt-get:

```
sudo apt-get install beanstalkd
```

After installing beanstalkd, it comes with a config at  /etc/default/beanstalkd .

Edit this file and change BEANSTALKD\_LISTEN\_ADDR=0.0.0.0 to BEANSTALKD\_LISTEN\_ADDR=127.0.0.1 . I chose to have it this way because I need beanstalkd to always run even after reboot. When the listen address is left as 0.0.0.0, then I have to always run

```
beanstalkd -l 127.0.0.1
```

in my console each time I need it to work. You may have your own separate preferences. After editing the /etc/default/beanstalkd file, you should restart the server

```
sudo service beanstalkd restart
```

Using the beanstalkd wrapper for PHP (pheanstalk) will require you to do:

```
composer require pda/pheanstalk
```

and if prompted for version, type `2.1.*`  
If you want to keep track of queues handled by beanstalkd, you can install <a href="https://github.com/ptrofimov/beanstalk_console" target="_blank">its console</a>.

We have to be able to track errors when queues fail. For this, we will create a table for failed jobs this way  
`php artisan queue:failed-table`  
and migrate  
`php artisan migrate`

To process your queued tasks, you can use:

```
php artisan queue:work
```

or

```
php artisan queue:listen
```

to keep it listening for and processing new tasks.

So far the solution is great but the problem is having to go to your server to run the queue:listen command. If you're familiar with screen or some other terminal multiplexer, you are thinking that'll be the best way to go about it right? Yea that's cool, but there something better. Supervisor!!!

### [Supervisor][2]

Supervisor is a process monitoring tool. We will use it to run or queue listener and keep logs. First we have to install:

```
sudo apt-get install supervisor
```

Now we will create a log file on our server for it to use:

```
mkdir /var/www/logs/
```

```
touch /var/www/logs/supervisor.log
```

Next is to configure supervisor to use the log and listen for our queues.

```
sudo vim /etc/supervisor/conf.d/queue.conf
```

and fill with the following

```
[program:queue]
command=php artisan queue:listen --tries=2 
directory=/var/www/{ $your_web_app }
stdout_logfile=/var/www/logs/supervisor.log 
redirect_stderr=true 
```

save and exit out of vim or whatever editor you have chosen to use and run the following:

```
sudo supervisorctl reread
```

```
sudo supervisorctl add queue
```

```
sudo supervisorctl start queue
```

The first command helps you reload the domains configuration files, while the others are self explanatory I think.

Now you can be at peace while your users have a great user experience. Thanks to <a href="http://twitter.com/BasicMario" target="_blank">Mario Bašić</a> for writing about some extra details I had added from <a href="http://blog.mario-basic.from.hr/using-beanstalkd-with-laravel/" target="_blank">his blog post</a>.

REFERENCE:

<a href="http://blog.mario-basic.from.hr/using-beanstalkd-with-laravel/" target="_blank">http://blog.mario-basic.from.hr/using-beanstalkd-with-laravel/</a>

<a href="http://laracast.com" target="_blank">http://laracast.com</a>

[1]: http://kr.github.io/beanstalkd/
[2]: http://supervisord.org/