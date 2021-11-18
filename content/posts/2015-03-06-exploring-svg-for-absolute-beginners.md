---
author: Joseph Rex
comments: true
date: 2015-03-06T00:00:00Z
title: Exploring SVG for absolute beginners
url: /exploring-svg-for-absolute-beginners/
tags:
  - svg
---

SVG is one of the cool stuff of these HTML5 days and if you aren't already fiddling with them already, either by using ready SVG icons or writing your own SVG, then you are missing out on a lot.
<!--more-->

It's mostly known for its ability to scale across various pixel densities without pixelating. Regular raster images will do fine on 70 pixel per inch (ppi) and some densities slightly higher but we're in the future now and things are getting different. With displays of nearly up to 360ppi, raster will pixelate. Also, SVG survives zooming to any length and it retains its initial quality.

That's definitely a good point but what really got me using SVG was my hunger for less HTTP requests. Besides head images of posts, I'm almost not using any images on this blog. At some point I thought data-uri's were the good thing but in no time I realized they aren't what you should just use with a sole aim of achieving reduced HTTP requests. There are cases where data-uri can come to play but I'll still do without it where I can. Just for test, I ran my 764k header image on the home page through a data-uri converter and this was the outcome

As seen from the image, the 764k file had become 1.3M. This may save me from making an extra 764k request for an image but then it'll cost me to download a larger HTML file. I wouldn't sell my soul for a penny :D. SVG to rescue!!

For readers who hate long posts, I'll explain and discuss ways to use SVG early enough and keep the goodies (writing and understanding) for later.

Loading SVG in HTML can be done through SVG sprites or embedded. The SVG `use` elements allow the re-use of parts of a larger pre-defined SVG and this what I mean when I say SVG sprites in HTML. Having a bunch of SVG shapes in one SVG file that are separated with groups (`<g>` tags).

We could just embed this parent SVG file somewhere in our HTML file but sometimes when it is really large, we like to maintain a neat mark-up by including it with JavaScript like below

```js
var url ='fonts/icons.svg';
var c=new XMLHttpRequest(); c.open('GET', url, false); c.setRequestHeader('Content-Type', 'text/xml'); c.send();
document.body.insertBefore(c.responseXML.firstChild, document.body.firstChild);
```

Each group in the carrier SVG file looks like:

```html
<svg>
	<g id="coolIcon">
		<path d="M67, 18.0c ...." />
	</g>
</svg>
```

and they are used as shown:

```html
<svg viewBox="0 0 32 32">
	<use xlink:href="#coolIcon"></use>
</svg>
```

We can also achieve sprites the good o'l way with CSS by referencing the SVG file with url() and using `background-position`

```css
.icon{
	background: url(icon.svg);
	background-position: 0px -50px;
}
```

Both spriting techniques still require a HTTP request for the SVG carrier (just one). Embedding SVG will increase the size of the HTML file but it can't be as much as the impact of data-uri. It's always just a difference of few bytes so it seems like the best way for me. Mostly, I stick with embedded SVG.

If I'll need a circle then I'll just write

```html
<svg>
	<circle cx="60" cy="60" r="50" stroke="black" stroke-width="2" fill="white"></circle>
</svg>
```

<hr>

Now let's try to understand what was going on up there. When we remember art from grade school, the first thing we were made to understand was making a line (the distance between points). Similar to how we do it on the basketball court when making shots training, we say

> Let's go to school

and then we begin shooting from a very close distance to the rim till we go further beyond the 3-points line, and then the center court.

Ok enough of illustrations outside the topic. First thing you should know is understanding how a SVG line works and here you go

```html
<svg>
	<line x1="0" y1="0" x2="200" y2="0" stroke="black" stroke-width="1" />
</svg>
```

<figure>
	<svg>
		<line x1="0" y1="0" x2="200" y2="0" stroke="black" stroke-width="1" />
	</svg>
</figure>

You can inspect the demos on the art board to confirm their live operation. All I can think of with this is a quadratic graph. I don't mean to scare you off if you're not mathematically inclined because this is so easy to figure out. The x and y represent X and Y axis in a graph.

X represents the horizontal flow while Y represents the vertical flow like the image above. X1 is the horizontal starting point, X2 is the horizontal end point, Y1 is the vertical starting point, and Y2 is the vertical end point. Makes sense right? Stroke is just the color of the line as you may have guessed, and stroke-width is how thick the line should be.

Let's make something out of that. A **triangle**

```html
<svg>
	<line x1="100" y1="0" x2="0" y2="100" stroke="black" />
	<line x1="200" y1="100" x2="100" y2="0" stroke="black" />
	<line x1="0" y1="100" x2="200" y2="100" stroke="black" />
</svg>
```

<figure>
	<svg>
		<line x1="100" y1="0" x2="0" y2="100" stroke="black" />
		<line x1="200" y1="100" x2="100" y2="0" stroke="black" />
		<line x1="0" y1="100" x2="200" y2="100" stroke="black" />
	</svg>
</figure>

Circles are similar to lines. Since we can only advance from Triangles to Rectangles, and to other Polygons, I think here's the best place for cicles and ellipsis to fit in

```html
<svg>
	<circle cx="70" cy="70" r="50" stroke="skyblue" fill="crimson" stroke-width="4" />
</svg>
```

<figure>
	<svg>
		<circle cx="70" cy="70" r="50" stroke="skyblue" fill="crimson" stroke-width="4" />
	</svg>
</figure>

We can also create circles with the ellipse tag

```html
<svg>
	<ellipse cx="70" cy="70" rx="50" ry="50" fill="crimson" stroke-width="4" />
</svg>
```

Creating an ellipse will only require having two different `rx` and `ry` values

```html
<svg>
	<ellipse cx="70" cy="70" rx="40" ry="60" fill="crimson" />
</svg>
```

<figure>
	<svg>
		<ellipse cx="70" cy="70" rx="40" ry="60" fill="crimson" />
	</svg>
</figure>

So far, I introduced some more attributes for circles and ellipsis. The *cx* and *cy* is for the circular X and circular Y co-ordinates. For perfect circles, we only need a radius and that's what *r* stands for. In the case for ellipsis, we need double radius for the X and Y circle co-ordinates which are *rx* and *ry*.

Getting on with shapes, rectangle is a 4-angled shape and here's how to go about it

```html
<svg>
	<rect width="400" height="200" fill="royalblue" />
</svg>
```

<figure>
	<svg>
		<rect width="400" height="200" fill="royalblue" />
	</svg>
</figure>

The rectangle `rect` uses height and width attributes to define its shape like regular HTML elements. If you haven't known the use of `fill` all along, it's used to fill the vector graphic with a color.

To produce a curvy rectangle the *x*, *y*, *rx* and *ry* values should also be set

```html
<svg>
	<rect x="10" y="10" rx="40" ry="20" width="200" height="100" fill="salmon" />
</svg>
```

<figure>
	<svg>
		<rect x="10" y="10" rx="40" ry="20" width="200" height="100" fill="salmon" />
	</svg>
</figure>

With a little transform, we could make a **kite**

```html
<svg>
	<rect x="50" y="10" width="100" height="100" fill="tomato" transform="rotate(-45,100,100)" />
</svg>
```

<figure>
	<svg>
		<rect x="50" y="10" width="100" height="100" fill="tomato" transform="rotate(-45,100,100)" />
	</svg>
</figure>

SVG also allows search engines index text in its graphics. To write such texts, we use the `text` element.

```html
<svg>
	<text x="0" y="20" fill="black" style="font-weight:bold;font-size:15px;">Little Caesars have the best pizzas</text>
</svg>
```

<figure>
	<svg>
		<text x="0" y="20" fill="black" style="font-weight:bold;font-size:15px;">Little Caesars have the best pizzas</text>
	</svg>
</figure>

And right there, I introduced something seemingly new which was the use of CSS on `style` attributes. You can also use *classes* or *id* like you'll do with other HTML elements. An example of a style made for SVG may be as shown:

```css
.icon{
	width: 32px;
	height: 32px;
	fill: #000;
	stroke: #aaa;
	stroke-width: 2;
}
```

You can also create Polygons and more complex shapes with SVG. The *polygon* element is really an interesting one to explore. For other complex shapes, we need to use `path` element to draw their co-ordinates. This will be done in the next article of my SVG series. If SVG is incapable of handling the kind of pixel based image you want, then you may also give HTML5 canvas a try.

The [SVG pocket guide][1] is very handy when learning SVG:

[1]: http://svgpocketguide.com/book
