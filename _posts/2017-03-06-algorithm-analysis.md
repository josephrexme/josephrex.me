---
title: "Algorithm Analysis: Best, Worst and Average Case"
layout: post
comments: true
author: Joseph Rex
permalink: /algorithm-analysis/
tags: algorithms mathML
---

Algorithms are a sequence of decisions we make to solve a problem. Like every decision in life we can make great decisions and really terrible decisions. But it doesn't end there. Good decisions vary, they can come easy and can take a lot harder process to reach an expected outcome.
<!--more-->
There are 3 categories of efficiency an algorithm can fall under when analyzing its usage of resources. They are best case, worst case, and average case.

To give you a mind picture, my friend Jesse and I decided to go on a road trip. We were to travel 300 miles and Jesse assured me we had enough gas for each gas station stops through the journey. Jesse made a good calculation but ignored the possibility of errors which led to an unexpected outcome when we had traveled 160 miles and found that the next gas station wasn't functional. This was really unfortunate because the next gas station was 80 miles away and we were about to hit the E. We got it to 220 miles through our journey and the car stopped. We wanted to hitchhike through the rest of the journey but after waiting for 2 hours with no passerby we had to decide on walking down to the next gas station with some gallons we had in the car.

2 miles after the next gas station, there's another station, and another one 1 mile after that. That's a good reason to believe going to fetch some gas would be a better decision than waiting for hours for a chance to hitchhike. But another condition we were constrained by was that our car runs on diesel and while there's always petrol in all gas stations, they don't always have diesel.

So far we've chosen footslogging with gallons over hitchhiking. We think it's a good decision but we have another case here. If the gas station 20 miles away has diesel, that'd be the **best case**, if we have to try the first and second second gas stations to find that only the third has diesel or none of them have diesel, it would be the **worst case**. If the second gas station has diesel and the first didn't then we don't have to try the third. That's an **average case**.

With that understanding, when giving an array of length **n**, when **n = 5** and our array items are **23, 34, 13, 44, 18**, we are to write an algorithm to find a number in the list of array items. By performing a linear search, we will have our best case if 23 is the number to be searched as it is the first item on the array.

<math xmlns="http://www.w3.org/1998/Math/MathML">
  <semantics>
    <mrow>
      <mi>k</mi>
      <mo>=</mo>
      <mn>23</mn>
    </mrow>
  </semantics>
</math>

<p>
<math xmlns="http://www.w3.org/1998/Math/MathML">
  <semantics>
    <mrow>
      <msub>
        <mi>C</mi>
        <mi>best</mi>
      </msub>
      <mo>(</mo>
      <mi>n</mi>
      <mo>)</mo>
      <mo>=</mo>
      <mn>1</mn>
    </mrow>
  </semantics>
</math>
</p>

If we then have to search for 18 or any other number like 58 which doesn't exist in the list, it'd be a worst case efficiency.

<p>
<math xmlns="http://www.w3.org/1998/Math/MathML">
  <semantics>
    <mrow>
      <mi>k</mi>
      <mo>=</mo>
      <mn>18</mn>
    </mrow>
  </semantics>
</math>
</p>

<math>
  <semantics>
    <mrow>
      <msub>
        <mi>C</mi>
        <mi>worst</mi>
      </msub>
      <mo>(</mo>
      <mi>n</mi>
      <mo>)</mo>
      <mo>=</mo>
      <mi>n</mi>
    </mrow>
  </semantics>
</math>

For every possibility of worst case either the item is found in the last position or not found at all we go through the **n** number of elements.

34, 13, and 44 are the average cases of the search. To find any of those items at a position **i** of the array, we derive the probability of success and failure. Given that:

<math>
  <semantics>
    <mrow>
      <mtext>Probability of Successful Search</mtext>
      <mo>=</mo>
      <mi>p</mi>
    </mrow>
  </semantics>
</math>

<p>
<math>
  <semantics>
    <mrow>
      <mtext>where,</mtext>
      <mspace width="20px"></mspace>
      <mn>0</mn>
      <mo>&le;</mo>
      <mi>p</mi>
      <mo>&le;</mo>
      <mn>1</mn>
    </mrow>
  </semantics>
</math>
</p>

<p>
<math>
  <semantics>
    <mrow>
      <mtext>Probability of Unsucessful Search</mtext>
      <mo>=</mo>
      <mn>1</mn>
      <mo>-</mo>
      <mi>p</mi>
    </mrow>
  </semantics>
</math>
</p>

The probability to find an item that is neither the first nor last item of the array at a position **i** in the array then becomes:

<math>
  <semantics>
    <mrow>
      <mi>p</mi>
      <mo>/</mo>
      <mi>n</mi>
    </mrow>
  </semantics>
</math>

and the probability of reoccurence of the item in position **i** would be:

<math>
  <semantics>
    <mrow>
      <msub>
        <mi>C</mi>
        <mi>average</mi>
      </msub>
      <mo>(</mo>
      <mi>n</mi>
      <mo>)</mo>
      <mo>=</mo>
      <mrow>
        <mo>[</mo>
          <mrow>
            <mn>1</mn>
            <mo>x</mo>
            <mfrac>
              <mi>p</mi>
              <mi>n</mi>
            </mfrac>
            <mo>+</mo>
            <mn>2</mn>
            <mo>x</mo>
            <mfrac>
              <mi>p</mi>
              <mi>n</mi>
            </mfrac>
            <mo>+</mo>
            <mi>&hellip;</mi>
            <mo>+</mo>
            <mi>i</mi>
            <mo>x</mo>
            <mfrac>
              <mi>p</mi>
              <mi>n</mi>
            </mfrac>
            <mo>+</mo>
            <mi>&hellip;</mi>
            <mo>+</mo>
            <mi>n</mi>
            <mo>x</mo>
            <mfrac>
              <mi>p</mi>
              <mi>n</mi>
            </mfrac>
          </mrow>
        <mo>]</mo>
        <mo>+</mo>
        <mi>n</mi>
        <mo>(</mo>
        <mi>1</mi>
        <mo>-</mo>
        <mi>p</mi>
        <mo>)</mo>
      </mrow>
    </mrow>
  </semantics>
</math>

with **1 - p** added as probability of unsuccesful search.

Simplifying the above equation we get:

<math>
  <semantics>
    <mrow>
      <mfrac>
        <mi>p</mi>
        <mi>n</mi>
      </mfrac>
      <mo>[</mo>
        <mi>1</mi>
        <mo>+</mo>
        <mi>2</mi>
        <mo>+</mo>
        <mi>&hellip;</mi>
        <mo>+</mo>
        <mi>i</mi>
        <mo>+</mo>
        <mi>&hellip;</mi>
        <mi>n</mi>
      <mo>]</mo>
      <mo>+</mo>
      <mi>n</mi>
      <mo>(</mo>
      <mn>1</mn>
      <mo>-</mo>
      <mi>p</mi>
      <mo>)</mo>
    </mrow>
  </semantics>
</math>

and substituting the series with <math display="inline"><mfrac><mrow><mi>n</mi><mo>(</mo><mi>n</mi><mo>+</mo><mn>1</mn><mo>)</mo></mrow><mn>2</mn></mfrac></math>, we have:

<math>
  <semantics>
    <mrow>
      <mfrac>
        <mi>p</mi>
        <mi>n</mi>
      </mfrac>
      <mo>[</mo>
      <mfrac>
        <mrow>
          <mi>n</mi>
          <mo>(</mo>
          <mi>n</mi>
          <mo>+</mo>
          <mn>1</mn>
          <mo>)</mo>
        </mrow>
        <mn>2</mn>
      </mfrac>
      <mo>]</mo>
      <mo>+</mo>
      <mi>n</mi>
      <mo>(</mo>
      <mn>1</mn>
      <mo>-</mo>
      <mi>p</mi>
      <mo>)</mo>
      <mspace linebreak="newline"></mspace>
      <mfrac>
        <mrow>
          <mi>p</mi>
          <mo>(</mo>
          <mi>n</mi>
          <mo>+</mo>
          <mn>1</mn>
          <mo>)</mo>
        </mrow>
        <mn>2</mn>
      </mfrac>
      <mo>+</mo>
      <mi>n</mi>
      <mo>(</mo>
      <mn>1</mn>
      <mo>-</mo>
      <mi>p</mi>
      <mo>)</mo>
    </mrow>
  </semantics>
</math>

we have a simplified addition of successful search and unsuccessful search for an average case. The probability *(p)* of a successful search (certainty) is **1** and unsuccessful search (impossibility) is **0**. To start with the successful search we substitute p for 1.

<math>
  <semantics>
    <mrow>
      <mtext>Successful Search</mtext>
      <mo>&rarr;</mo>
      <mfrac>
        <mrow>
          <mn>1</mn>
          <mo>(</mo>
          <mi>n</mi>
          <mo>+</mo>
          <mn>1</mn>
          <mo>)</mo>
        </mrow>
        <mn>2</mn>
      </mfrac>
      <mo>+</mo>
      <mi>n</mi>
      <mo>(</mo>
      <mn>1</mn>
      <mo>-</mo>
      <mn>1</mn>
      <mo>)</mo>
      <mspace linebreak="newline"></mspace>
      <msub>
        <mi>C</mi>
        <mi>average</mi>
      </msub>
      <mo>(</mo>
      <mi>n</mi>
      <mo>)</mo>
      <mo>=</mo>
      <mfrac>
        <mrow>
          <mo>(</mo>
          <mi>n</mi>
          <mo>+</mo>
          <mn>1</mn>
          <mo>)</mo>
        </mrow>
        <mn>2</mn>
      </mfrac>
    </mrow>
  </semantics>
</math>

For unsuccessful search, p is substituted for 0:

<math>
  <semantics>
    <mrow>
      <mtext>Unsuccessful Search</mtext>
      <mo>&rarr;</mo>
      <mfrac>
        <mrow>
          <mn>0</mn>
          <mo>(</mo>
          <mi>n</mi>
          <mo>+</mo>
          <mn>1</mn>
          <mo>)</mo>
        </mrow>
        <mn>2</mn>
      </mfrac>
      <mo>+</mo>
      <mi>n</mi>
      <mo>(</mo>
      <mn>1</mn>
      <mo>-</mo>
      <mn>0</mn>
      <mo>)</mo>
      <mspace linebreak="newline"></mspace>
      <msub>
        <mi>C</mi>
        <mi>average</mi>
      </msub>
      <mo>(</mo>
      <mi>n</mi>
      <mo>)</mo>
      <mo>=</mo>
      <mi>n</mi>
    </mrow>
  </semantics>
</math>

and the unsuccessful search of average case has led right back to being the same as worst case.

<math>
  <semantics>
    <mrow>
      <msub>
        <mi>C</mi>
        <mi>unsuccessful average</mi>
      </msub>
      <mo>(</mo>
      <mi>n</mi>
      <mo>)</mo>
      <mo>=</mo>
      <msub>
        <mi>C</mi>
        <mi>worst</mi>
      </msub>
      <mo>(</mo>
      <mi>n</mi>
      <mo>)</mo>
    </mrow>
  </semantics>
</math>

The best case from the examples is the optimum solution to the problems while every other solutions are feasible. Feasible solutions are the set of input values that satisfy all the constraints of an algorithm. Hence, going to the first and second gas stations before finding diesel at the third still makes the first and second feasible solutions while the third becomes the optimum solution.
