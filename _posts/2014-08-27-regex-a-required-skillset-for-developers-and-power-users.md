---
title: 'Regex: A required skillset for developers and power users'
author: Joseph Rex
layout: post
permalink: /regex-a-required-skillset-for-developers-and-power-users/
categories:
  - programming
tags:
  - information
  - regex
---
[<img class="aligncenter size-full wp-image-212" src="http://josephrex.me/wp-content/uploads/2014/08/national_regular_expression_day_xkcd_shirt.gif" alt="national_regular_expression_day_xkcd_shirt" width="300" height="193" />][1]

I care about information and I believe everything we do wraps around trying to find information, protecting it, and making use of it. There is Google, DuckDuckGo, and other search engines, there is grep for Unix-like system users, there are search panes on applications and websites. Sometimes these media of information gathering may not be good/aggressive enough to find the exact outputs you expect. This is why we learn how to do our searching and pattern matching &#8220;like a boss&#8221;.

&nbsp;

Regex (Regular expression) is a way to specify your search with deeper intensity. It is somewhat like wildcards. But, this is beyond very generic wildcards we use in simple instances. You may refer to this as wildcards on steroids.

> This post is intended to be really long, containing most of what you need on regex. Since my work takes a lot of my time and I have less time to blog, I will start with the basics and update the article each time I get the opportunity to write.

I don&#8217;t think I have to explain why regex is necessary but I have this XKCD image to help with a little illustration

[<img class="aligncenter size-full wp-image-215" src="http://josephrex.me/wp-content/uploads/2014/08/regular_expressions.png" alt="regular_expressions" width="600" height="607" />][2]

That PERL hero saved the day with his super powers (knowledge of regex).

Paint an instance where you have to find every occurrence of gray and grey in a large pile of text. Running (gray|grey) through a regular expressions parser will find all the expected results which are &#8220;gray&#8221; and &#8220;grey&#8221;. The pattern used to find them simple meant I want to find every occurrence of gray or grey.

Being aware of how the | (pipe) can be used as an OR operator, I can write a better pattern this way gr(a|e)y and it will find the same results as the earlier used pattern.

There are tokens to be passed into regulation expressions parser to get outputs and some of them are listed in the table below:

| Tokens | Category            | Meaning            | Example Matches |
| ------ | ------------------- | ------------------ | --------------- |
| \w     | Meta sequence       | word characters    | Emma, Wattson   |
| \d     | Meta sequence       | digits             | 12345           |
| \D     | Meta Sequence       | non-digits         | Andrew&@#c      |
| \W     | Meta Sequence       | non-word           | 47585^#@        |
| \s     | Meta Sequence       | white space        |                 |
| \S     | Meta Sequence       | non white space    | ABC123          |
| a{3}   | Quantifier          | Exactly three of a | aaa             |
| a+     | Quantifier          | One or more of a   | aaaaaa OR a     |
| a*     | Quantifier (Greedy) | Zero or more of a  | aaaa            |
| a?     | Quantifier          | Zero or one of a   | cat OR cup      |

My examples are probably not the best you will get to see and I can&#8217;t mention all the token types here as I will be turning this blog post into a regex dictionary. If you need to find more of them, I think the bottom right pane at [regex101][3] is enough to feed you with all you want.

### Using the tokens to find matches

[<img class="aligncenter size-full wp-image-228" src="http://josephrex.me/wp-content/uploads/2014/08/regular-expression-introduction.png" alt="regular-expression-introduction" width="500" height="336" />][4]

#### Summary:

Regular expressions are very necessary and I think every institution should consider it a as compulsory course for every computer science student and departments that do a lot of computing.  
If you will like to see a graphical illustration of what happens while you use regular expressions, try out <a href="http://www.regexper.com/" target="_blank">regexper</a>. It produces neat graphical illustration of what roles the patterns play like in the image below

[<img class="aligncenter size-full wp-image-221" src="http://josephrex.me/wp-content/uploads/2014/08/regexper.jpg" alt="regexper" width="600" height="198" />][5]

<a href="http://www.regexr.com/" target="_blank">Regexr</a> also does something similar to what regex101 provides. It&#8217;s your call to pick what&#8217;s best for you.

#### References:

  * <a style="font-family: sans-serif; font-size: medium; font-style: normal;" title="regex101" href="http://regex101.com" target="_blank">regex101</a>
  * <a style="font-family: sans-serif; font-size: medium; font-style: normal;" href="http://www.regexper.com/" target="_blank">regexper</a>
  * <a style="font-family: sans-serif; font-size: medium; font-style: normal;" href="http://www.regexr.com/" target="_blank">regexr</a>
  * <a style="font-family: sans-serif; font-size: medium; font-style: normal;" href="http://www.regular-expressions.info/" target="_blank">regular-expressions.info/</a>

 [1]: http://josephrex.me/wp-content/uploads/2014/08/national_regular_expression_day_xkcd_shirt.gif
 [2]: http://josephrex.me/wp-content/uploads/2014/08/regular_expressions.png
 [3]: http://regex101.com "Regex101"
 [4]: http://josephrex.me/wp-content/uploads/2014/08/regular-expression-introduction.png
 [5]: http://josephrex.me/wp-content/uploads/2014/08/regexper.jpg