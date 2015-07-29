---
title: 'Security threats introduced by IOT'
author: Joseph Rex
layout: post
comments: true
permalink: /security-threats-introduced-by-iot/
---

The emerging Internet of Things (IoT) raises security concerns. That's a quote from the introduction of a [paper][1] I recently got from [Techtarget][2]. In no doubt will the future go closer to implementing internet of things widely as it is not widely used enough in the present day. Having everything connected to the internet has a lot of great benefits that have introduced insecurity. The techtarget complete introduction is:
<!--more-->
{% image 'http://res.cloudinary.com/strich/image/upload/v1438157583/IoT_m71jhm.jpg' class="head-image" %}

> The emerging internet of things raises new security concerns and puts a spin on old ones

Once in 2011, all the IPv4 addresses in the world were exhausted and then we started realizing that hey everyone's using the new devices. As an average person without a lot of gadgets, I have my laptop and a phone but for some, it includes an iPad, a Kindle. Now the thought of how many IP addresses will be consumed by a single person on IPv4 leads me to concluding that such an IPv4 address overflow will occur very often considering that we have only 2<sup>32</sup> (4,294,967,296) IP addresses available for every internet user. This is why IPv6 has been introduced.

The number of internet connected devices is expected to reach 50 billion in 2015 based on a Cisco estimation and thank goodness not all devices are on IPv4 anymore. By then most networks will be on IPv6 which has a rather thinkably infinite number of IP addresses for lease.

The [recent car hack news][3] from [Wired.com][7] is a great example of risks exposed through IoT. The electronic control units (ECU) was manipulated after exploiting through a vulnerability in Uconnect which was used for the internet connectivity of the car. This made the hackers control the radio, the wipers and even the brakes. In the hands of malicious hackers, human lives are at risk with this.

Even though Chrysler has created a patch and fixed the flaw disallowing the possibility through the Sprint network based on this:

>  Looks like I can't get to [@0xcharlie][4]'s Jeep from my house via my phone. Good job FCA/Sprint!
>
>  — Chris Valasek (@nudehaberdasher) [July 24, 2015][5]

Is it just cars that are at risk? No. There was a case of an unknown hacker last year using a web connected baby monitor to spy on a 2 year old. Our refrigerators and kitchen devices will be connected to the internet some day and some hacker can [transmit heat from your oven to breach an air-gapped system][6] which may seem like an impossible hack. They could do more and even burn your whole house down.

Hospital devices can be manipulated to give fake diagnosis or cause harms to patients in hospitals. We've seen in the movies how people try to kill people from within the hospital. Unfortunately for those kind of criminals, strict policies in the hospitals may not get them any close to the patient but if they could attack that health monitoring machine to fry the brain of their targets, then the physical security is not of much use.

What we face is a future of less safety and privacy and while some organizations providing these technologies do their hard work in layering the security measures properly, there will always be those who don't.

> The more connectivity you have, the less security you have - Unless you layer it properly
>
>  — Shamus McGillicuddy

As a kid that liked computers I played around by messing with my friends computers using Trojans like ProRAT to flip their screens, make their mouse go crazy, watch them while they fap but that's all just within computers and when I tell them about it they are sometimes furious about how I could get in their privacy but for the ones who cared about security and didn't want someone sniffing around they got good AVs and Firewalls which kept me off as I wasn't skilled enough to evade the firewalls. That's privacy compromise but it's more privacy compromise if someone can remotely flip your switches and control your TV and you can't install a firewall against that. Even if no digital harm is caused, trust me this can lead to a panic attack.

From a more advanced security analysis on IoT, we will be exposing all our house gadgets to threats like Denial of Service. As you should know it, this is one of the threats that do not have an absolute mitigation technique. You can get a DDOS on your refrigerator till its pipes burst and fill the whole room with gas.

Considering the cost of usage as the end users, IoT will cause an increased demand of internet bandwidth and it means more expenses in a month. Tell your boss to pay you more cause why? We're in the damn future!

As the case of the car hack where Chrysler released a patch for Uconnect that users can download and fix the vulnerabilities that were exploited by hackers, not every company will respond to vulnerable holes very quickly and this will lead to patching delays providing more room for exploits. Do we blame the companies for the patching delay? No! You can't take all your time building software and have someone tell you he found a flaw and then suddenly find a way to fix the vulnerability.

As an argument to what I just said, on another note I think yea you should be ready to make patches because if you are making software for people to use, you should try to do it damn right and if you can't be sure of how good it is, you should hire testers. That's what big companies do.

Another problem with IoT that will be caused by the users of the services/technologies will be the same one we see with little technologies of today like routers and web applications. Users that do not change default configurations will always fall in the hands of hackers trying random defaults.

> Let's hack that car. Try username as admin and password as password. Yes, It works!!

As quoted before, more connectivity, less security. We will create more rooms for backdoors with devices all connected to networks and with IP addresses. Delivering malware payloads will be a lot easier than it used to be except the security really covers against them.

### Identity of Things (IDoT) against IoT attacks

Identity of things is simply assigning unique identifiers (UID) to devices/things that helps them connect to the internet. The idea is to use the ID to reference the device based on some metadata stored with the UID. If you are familiar with Amazon Web Services (AWS), you should have come accross the IAM (Identity Access Managment) users which is used to create users identifying them with the services they can access and the level of access they can have. 

With IAM control policy, access to IoT devices can be controlled but this doesn't solve the entire problem. IoT is already in existence and it will continue to grow. There will be companies that take the necessary security steps and companies who don't just like we have good and bad software developers. This is just an awareness on how much we should embrace the technologies thrown at us. Forget about the goodies they say you'll get from it and think more about how it preserves or compromise your privacy.


[1]: http://pro.techtarget.com/Global/FileLib/targeted_downloads/ISM_InsideEdition_final.pdf
[2]: http://techtarget.com
[3]: http://www.wired.com/2015/07/hackers-remotely-kill-jeep-highway/
[4]: https://twitter.com/0xcharlie
[5]: https://twitter.com/nudehaberdasher/status/624607774563962880
[6]: http://www.wired.com/2015/03/stealing-data-computers-using-heat/
[7]: http://www.wired.com