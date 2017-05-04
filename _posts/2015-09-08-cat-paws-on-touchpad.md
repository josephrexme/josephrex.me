---
title: Cat paws on toucpad
author: Joseph Rex
layout: post
comments: true
permalink: /cat-paws-on-touchpad/
---
One thing that really drives me to becoming a better developer is my curiosity to know how stuff works. I had some moments of tranquility to [think literally about nothing][1] which is something I do very often and it led me to thinking of a possibility which I will discuss here. Before I do, have you ever had your cat or dog hit some keys on your computer or put their paws on your touchpad? That's what the idea here is about.
<!--more-->
{% image 'pawtouchpad.jpg' alt="Paw on touchpad" class="head-image figure--fullwidth" %}
Think of this scenario with me:

> You write a resignation letter to your boss because you really are planning to quit your job but you can't afford to quit yet. Your resignation letter is so well constructed that you relish going through because it makes you feel like a good writer. You get what what I mean? :D. Suddenly your cat jumps over the table and hits the touchpad at a point where your cursor is right on the send button.

*My reaction:* FML what have this stupid cat done? Really! what have I stupidly done? I don't have a new job yet and I sent a resignation letter. How do I explain this mess? I head back to work the next day and pay a visit to the managers office and we have a conversation like:

> Me: Good morning Mr. Coolguy<br>
  Boss: Hey good morning Joseph<br>
  Me: Have you read the email I sent to you?<br>
  Boss: I don't have time for mails till this midnight<br>

Thank goodness I have a chance to explain myself. Should I lie that my girlfriend (which doesn't exist) got mad and decided to piss me off by using my computer to send a resignation letter? I could get away with that but then I'd feel unhappy with myself. So I have to say my cat clicked it right? but I actually wrote it. I could explain it all but who will believe the part that the cat clicked the send button. The girlfriend lie will even pay off than this silly truth.

> Me: You'll get a resignation letter from me in the mail sir. I composed it but didn't
  wanna send it till next month.<br>
  Boss: What? Why?<br>
  Me: I need to take a course which will require a lot of time out of the office and a short sabbatical wouldn't cut it.<br>
  Boss: ok that's fine. I'll just delete that email. I don't think I need to read it<br>
  Me: Yes that's good sir. Thank you

I love digital forensics. I could use an ALS (Alternate Light Source) shot to prove I am telling the truth. I also started thinking of scenarios where we need to start building programs that wouldn't accept instructions (clicks, taps) from animals but instead just obey humans. To do this, we need to be able to distinguish paws from our human palm/fingers. To demystify how this may come to existence we need to understand how our touchpad works.

Touchpads as well as touchscreens are of 2 types which are [resistive touchpads][2] and [capacitive sensing][3]. I'll start with resistive touchpads which are less complex.

Resistive touchscreens is made up two flexible sheets that make up a matrix. They are coated with resistive material and separated by an airgap. The two sheets are pressed against each other when the touchscreen is pressed. A grid of vertical and horizontal lines are used to track precise coordinates pressed for triggering actions. They have high resolution that provides accurate touch control.

Since the pressure is what causes the sheets to act upon each other and track user actions, the resistive touchscreen is precise and can accept inputs from stylus, finger, or any other pointing object. This is not limited to pressure from gloved fingers as it acts upon pressure not minding the surface of the pressure subject. For some devices that only take input from the stylus, active touchscreen is used but there are also multi-touch supported resistive touchscreens that will allow human skin touch. The image below shows the flexible sheets and how they apply:

{% image 'touchpad.jpg' alt="Resitive touchpad" %}

The resistive touchscreen is no longer in use for laptop touchpads.

The Capacitive sensing detects conductive materials. They take human body capacitance as input and can't just accept input from any pointing device like the resistive touchscreen does. There are capacitive stylus for sending input through capacitive sensors and what they do basically is to simulate the difference in dielectric offered by human input. Note however that regular stylus that works with resistive touchscreens wouldn't register on capacitive sensors.

{% image 'capacitive-touchscreen.jpg' alt="capacitive touchpad" %}

The capacitive sensor is used in touchpads, touchscreens, and flat buttons as seen in recent technologies. This has a grid of small pads of which one transmits and one receives unlike the resistive touchscreen with two flexible sheet layers. When an input is received from a finger or any other object with electric field, it creates a change in capacitance. The change is detected on pressure. Capacitive sensors are more reliable with because they only accept input from expected subjects like the human finger. Capacitive sensing has its various branches some of which provides more accuracy in sensing but I'll skip that part and get back to the point of this whole thing.

At this point I've been able to make your thinking inclined with the craziness going on here. From this gestures on MacBook displayed we see how much we can do with capacitive sensing tracking finger gestures and location.

{% image 'outsideswipe.gif' alt="MacBook Swipe" %}

Unwanted objects have been eliminated with the need for conductive input. But just as our fingers are conductive, cat and dog paws are as well. Now what happens if my cat paw goes on my touchpad to send an input I don't want. There's no way to avoid that. A regular sane person may think why let your cat on your laptop in the first place. Well, there's sometimes cats gets to where you don't want them to and you're not always there.

My desire now is a way to trace the pattern shape received on the capacitive sensor to tell if it is of human finger type size or animal type. If this feature is available then as developers we can build programs that disobey cat paw inputs and obey just human inputs. We could also go to a level of building programs for animals to play with their own input types only.

[1]: http://9gag.com/gag/a8j627Z?ref=fbp
[2]: https://en.wikipedia.org/wiki/Resistive_touchscreen
[3]: https://en.wikipedia.org/wiki/Capacitive_sensing
[4]: https://en.wikipedia.org/wiki/Stylus

