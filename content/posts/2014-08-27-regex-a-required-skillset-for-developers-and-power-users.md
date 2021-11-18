---
author: Joseph Rex
comments: true
date: 2014-08-27T00:00:00Z
title: 'Regex: A required skillset for developers and power users'
permalink: /regex-a-required-skillset-for-developers-and-power-users/
tags:
  - regex
---

I care about information and I believe everything we do wraps around trying to find information, protecting it, and making use of it. There is Google, DuckDuckGo, and other search engines, there is grep for Unix-like system users, there are search panes on applications and websites.
<!--more-->

Sometimes these media of information gathering may not be good/aggressive enough to find the exact outputs you expect especially when looking through files. This is why we learn how to do our searching and pattern matching **like a boss**.
<hr>

Regex (Regular expression) is a way to specify your search with deeper intensity. It is somewhat like wildcards. But, this is beyond very generic wildcards we use in simple instances. You may refer to this as wildcards on steroids.

Paint an instance where you have to find every occurrence of gray and grey in a large pile of text. Running (gray\|grey) through a regular expressions parser will find all the expected results which are "gray" and "grey". The pattern used to find them simply means I want to find every occurrence of gray or grey.

Being aware of how the \| (pipe) can be used as an OR operator, I can write a better pattern this way gr(a\|e)y and it will find the same results as the earlier used pattern.

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

My examples are probably not the best you will get to see and I can't mention all the token types here as I will be turning this blog post into a regex dictionary. If you need to find more of them, I think the bottom right pane at [regex101][1] is enough to feed you with all you want.

#### Summary:

Regular expressions are very necessary and I think every institution should consider it a as compulsory course for every computer science student and departments that do a lot of computing.  
If you will like to see a graphical illustration of what happens while you use regular expressions, try out [regexper][2]. It produces neat graphical illustration of what roles the patterns play.

[Regexr][3] also does something similar to what regex101 provides. It's your call to pick what's best for you.

#### References:

  * [regex101][1]
  * [regexper][2]
  * [regexr][3]
  * [regular-expressions.info][4]

 [1]: http://regex101.com "Regex101"
 [2]: http://www.regexper.com/
 [3]: http://www.regexr.com/
 [4]: http://www.regular-expressions.info/
