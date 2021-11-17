---
author: Joseph Rex
comments: true
date: 2015-12-21T00:00:00Z
title: Quality against speed in development
url: /quality-against-speed-in-development/
---

It is common for humans to expect things to arrive almost as soon as they find the need for them. It starts from kids wanting their parents to get them their favorite toy from a toy store. A parent that tells the child we'll have to come back next year for this toy will make the child unhappy at that moment.
<!--more-->

This follows through to adulthood and to professionalism and management. What makes grown-ups different is their ability to understand how to prioritize things and respect the flow of things in order to get an expected outcome.

In my last post I briefly spoke on the topic of taking your time to get good work done and not yielding to the clients demand for a rushed up work. No one in their right senses want to be anyone's puppet and in a way even if we haven't lived up to our talents, there's something unique about us. It's essential for your clients to know that there's a reason why they've hired you to get a job done for them. It's not because you have a label like *"I am a plumber"*, *"I make websites"* on your nerd shirt. They probably hired you because you're a professional at what you do and except you really aren't, you should be open to ideas and suggestions from them but you should make the rules about how the job gets done not them. If you leave them with critical decisions on project delivery and project flow then you may drive off a cliff with them.

[The Agile manifesto][1] includes that we may have frequent meetings with clients and take actions based on their suggestions but very often we are often made to set timelines. These timelines are good because they guide around how hard we work to achieve a certain set of tasks at an expected time. However, some say it's hard to put dates to projects in software development which is true. If you don't think deeply enough you'd feel it shouldn't be so hard to put a date to building this feature or that project. The case sometimes is more about how long the client think it should take against how long a good developer think it would take. There are different kind of clients that have existed in my world and they are:

* Clients that know nothing about how the technology works but want a product

* Clients that know about someone else who has achieved building a similar product

* Clients with a little technical background. They probably wrote code poorly at some point in their lives and feel they know every steps software development involves.

There may be different people within one client organization that fit each of those descriptions. A common thing to encounter from any of them especially the last two described will be that they expect the product at a particular time based on the fact that someone they know got a product in that exact timeline or because they think when they used to write noob code that's how long it took to get the job done. We may want to succumb to their timeline desire but if we think about the process in building great software. We think about [TDD][5], [BDD][6], [XP][7], we will definitely want to reconsider that.

It's a tough decision to make but we have to decide if we want a quality product or a rushed up product. If we choose the latter. The client will still get back to us to fix the problem.

Good software developers understand that most of the work we do lies in maintenance and not in manufacturing. And by developers in this context it covers but is not limited to building developers, automobile developers, content developers, and definitely software developers. It can also be said that it lies in the avoidance of maintenance.

About avoidance of maintenance, this is about building a product where the client does not have to call you to fix a bug every once in 2 weeks. On building good products by focusing on maintenance, the [TPM (Total Productive Maintenance) approach][2] which emerged in Japan from 1951 with a 5s philosophy comes handy. It comprises

* *Seiri - Organization:* Properly organizing your build steps
* *Seiton - Tidiness:* A place for everything and everything in its place
* *Seiso - Cleaning:* Avoid code litters and mess
* *Seiketsu - Standardization:* Following agreed-upon patterns and standards
* *Shatsuke - Self Discipline:* Willingly following all the above and having a constant desire to get better.

I wouldn't have to break this down further if the Wikipedia page covered all of this but I'll bring this more into the context of software development.

**Organization:** Organizing code we write is very important for us as the code authors and the unknown future contributors. Understanding the fact that the variable names must be well thought of to match their uses. This is the part where separation of concerns is also considered.

**Tidiness:** All these points are very similar but when closely looked at we can observe their differences and try to follow each of them by respecting them individually. Benjamin Franklin once quoted *"A place for everything and everything in its place"*. If you keep a cup in the closet the next you need it you may not think about looking into the closet but the kitchen which is its actual place and when it's not there it can't serve its purpose at the time.

**Cleaning:** As I often get to work with code written by others I have seen code comments I appreciate and code comments that irk me. Developers who randomly spray comments around their code to temporarily disable or undo a function, feature, or part of the design make the code look really messy. If you've been doing this then a better option is to have a detailed commit message in your version control and if it's something you think you want to remember for application somewhere else then take it out of the code and put it somewhere like a storage of snippets.

**Standardization:** The one major thing I love about the PHP community is the fact that they have [a set of standards][3] which every major framework and library developers follow. It's even gone beyond just that and a lot of developers follow these practices to make code readable and understandable. The design and front-end community have [styleguides and pattern libraries][4] which they follow to promote agreement in patterns.

**Self-Discipline:** Most importantly knowing all these and taking a stand to keep up with them is what defines a good coder.

<hr> 

What happens when you just have to deliver something to the client and there isn't enough time for quality code? Usually clients can be fine with prototypes when they just need to see an implementation of the product. In this cases it's preferred to write a mock-up code that is entirely different from the main application code that will be used in production because it will save you from making hasty conclusions that may end up being at the cost of the end product.

[1]: https://en.wikipedia.org/Agile_methodology
[2]: https://en.wikipedia.org/wiki/Total_productive_maintenance
[3]: http://www.php-fig.org/
[4]: http://alistapart.com/article/creating-style-guides
[5]: https://en.wikipedia.org/wiki/Test-driven_development
[6]: https://en.wikipedia.org/wiki/Behavior-driven_development
[7]: https://en.wikipedia.org/wiki/Extreme_programming
[8]: https://en.wikipedia.org/wiki/Jim_Coplien
