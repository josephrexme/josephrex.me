---
title: Implementing dynamic drop down / dependent list in laravel4
author: Joseph Rex
layout: post
comments: true
permalink: /implementing-dynamic-drop-down-or-dependent-list-in-laravel4/
categories:
  - web
tags:
  - javascript
  - jquery
  - laravel
  - sql
---
{% image drop-down-menu.jpg class="head-image" alt="drop-down-menu" %}
When I used procedural PHP for most of my projects, I found myself needing what I referred to as a dependent list. These days I hear it being referred to as dynamic drop down more often. After looking around, a friend gave this solution to me.

All examples here will rely on the DDL database schema here:
<!--more-->

{% highlight mysql %}
CREATE TABLE IF NOT EXISTS `categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `category_name` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
);
INSERT INTO `categories` (`id`, `category_name`) VALUES
(1, 'Electronic'),
(2, 'Mobile Phones'),
(3, 'Clothing');
CREATE TABLE IF NOT EXISTS `subcategories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `categoryID` int(11) NOT NULL,
  `subcategory_name` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
);
INSERT INTO `subcategories` (`id`, `categoryID`, `subcategory_name`) VALUES
(1, 1, 'Televisions'),
(2, 1, 'Deep Freezers'),
(3, 1, 'Hifi Systems'),
(4, 2, 'Blackberry'),
(5, 2, 'Nokia'),
(6, 2, 'Samsung'),
(7, 3, 'Shirts'),
(8, 3, 'Trousers'),
(9, 3, 'Blouses');
{% endhighlight %}

For a clearer view, I have it here on SQL fiddle: <a title="SQL Fiddle DB Schema" href="http://sqlfiddle.com/#!2/58fcf/4/1" target="_blank">http://sqlfiddle.com/#!2/58fcf/4/1</a>

### Procedural code

{% highlight html %}
<form method="get">
	<label for="category">Parent Category</label>
    <select name="parent_cat" id="parent_cat">
        <?php while($row = mysql_fetch_array($query_parent)): ?>
        <option value="<?php echo $row['id']; ?>"><?php echo $row['category_name']; ?></option>
        <?php endwhile; ?>
    </select>
    <br/><br/>
    <label>Sub Category</label>
    <select name="sub_cat" id="sub_cat"></select>
</form>
{% endhighlight %}

The mark-up is a file named with the php extension with the body content as above. It uses the following jQuery snippet

{% highlight javascript %}
$(document).ready(function() {
	$("#parent_cat").change(function() {
		$(this).after('<div id="loader"><img src="img/loading.gif" alt="loading subcategory" /></div>');
		$.get('loadsubcat.php?parent_cat=' + $(this).val(), function(data) {
			$("#sub_cat").html(data);
			$('#loader').slideUp(200, function() {
				$(this).remove();
			});
		});	
    });
});
{% endhighlight %}

From the jQuery code above we try to send the present value of the category to a different PHP file that takes in GET parameters. It gets all the subcategories of the selected category and echo them to that page making it return those listed values to jQuery as sub categories

{% highlight php %}
<?php 
mysql_connect('localhost', 'root', '');
mysql_select_db('dependent_list');
$parent_cat = $_GET['parent_cat'];

$query = mysql_query("SELECT * FROM subcategories WHERE categoryID = {$parent_cat}");
while($row = mysql_fetch_array($query)) {
	echo "<option value='$row[id]'>$row[subcategory_name]</option>";
}

?>
{% endhighlight %}

Good solution right? Thanks to my friend but now I'm dealing with more advanced code.

By using laravel, we mostly use request URIs rather than $_GET requests. I could re-implement this by creating a seperate route that takes that extra request segment to fetch all the information.

I'll go through 3 ways we can achieve this in Laravel, starting with this.

### Method 1

Create your route to display your drop down list

{% highlight php %}
Route::get('myroute','myController@firstMethod');
{% endhighlight %}

Define the firstmethod in the myController (these names can be whatever you wish) controller.

{% highlight php %}
<?php
public function firstMethod(){
    $categories = DB::table('categories')->get();
    return View::make('myview',['categories' => $categories]);
}
?>
{% endhighlight %}

Next we'll create a route for our sub-categories feeder view

{% highlight php %}
Route::get('loadsubcat/{id}','myController@secondMethod');
{% endhighlight %}

and a method

{% highlight php %}
<?php
public function secondMethod($id){
    $subcategories = DB::table('subcategories')->where('categoryID', $id)->get();
    return View::make('thisview', ['subcategories' => $subcategories);
}
?>
{% endhighlight %}

for the view of this method we will add the following

{% highlight html %}
{% raw %}
@foreach($subcategories as $subcategory)
    <option value="{{ $subcategory->id }}">{{ $subcategory->subcategory_name }}</option>
@endforeach
{% endraw %}
{% endhighlight %}

Inside our first display view, we can add the following mark-up:

{% highlight html %}
{% raw %}
{{ Form::open(['action'=>'myController@secondMethod']) }}
	<label for="category">Parent Category</label>
    <select name="parent_cat" id="parent_cat">
        @foreach($categories as $category)
        <option value="{{ $category->id }}">{{ $category->category_name }}</option>
        @endforeach
    </select>
    <br/><br/>
    <label>Sub Category</label>
    <select name="sub_cat" id="sub_cat"></select>
{{ Form::close() }}
{% endraw %}
{% endhighlight %}

and finally the JS part

{% highlight javascript %}
$(document).ready(function() {
	$("#parent_cat").change(function() {
		$.get('loadsubcat/' + $(this).val(), function(data) {
			$("#sub_cat").html(data);
		});	
    });

});
{% endhighlight %}

So this is really similar to the former procedural version but I took away all the unnecessary loader part.

### Method 2

For this method, I already made a <a title="JS Fiddle direct link" href="http://jsfiddle.net/bl4ckdu5t/npkf9hn6/" target="_blank">JSfiddle</a> to implement with static HTML. This method is meant to use JSON data to feed DB contents to jQuery in order to dynamically change subcategories based on the selected categories.

<iframe width="100%" height="300" src="http://jsfiddle.net/bl4ckdu5t/npkf9hn6/embedded/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

Notice I put values of data-load in single quotes because it is expected to contain JSON data which has double quotes. To make our data more dynamic, let's make the data-load JSON get fetched from the database. Let's make a controller with this contents

{% highlight php %}
<?php
// Controller
$categories = DB::table('categories')->get();
$categories_pack = [];
foreach($categories as $category):
   $category_products = DB::table('subcategories')->where('categoryID',$category->id)->lists('subcategory_name');
   $categories_pack[$category->category_name] = $category_products;
endforeach;
$jsonified = json_encode($categories_pack);
$data = ['categories' => $jsonified];
return View::make('yourview',$data);
?>
{% endhighlight %}

Here's the part where we plug that into our view:

{% highlight html %}
{% raw %}
  <option selected disabled>- Categories -</option>
  <option>Bags</option>
  <option>Shoes</option>
  <option>T-Shirts</option>
</select>
<br>
<select class="subcat">
  <option>- select a category -</option>
</select>
<div id="load" data-load='{{ $categories }}'></div>
{% endraw %}
{% endhighlight %}

And with this we can get it to work like it did with the static HTML example above.

### Method 3

In this method, I will simplify <a href="https://twitter.com/msurguy" target="_blank">Maksim Surguy's</a> solution from this <a href="https://gist.github.com/msurguy/5138788" target="_blank">github gist</a>. Mak used two tables (makers and models) to describe car makers and models. Rather than twisting the flow, I'll keep to my categories and subcategories tables.

> Categories == Makers
> 
> Subcategories == Models

In order to use Eloquent with this. We will extend eloquent with a models for each of them.

categories.php (<a href="http://laravel.com/docs/4.2/eloquent#one-to-many" target="_blank">One to Many Eloquent Method</a>)

{% highlight php %}
<?php
class Category extends Eloquent {
   public function Categories(){
      return $this->hasMany('Subcategory');
   }
}
 
?>
{% endhighlight %}

subcategories.php (Inverse Relation Eloquent)

{% highlight php %}
<?php
class Subcategory extends Eloquent {
   public function subcategory(){
      return $this->belongsTo('Category');
   }
}
 
?>
{% endhighlight %}

Then a simple route with a callback function

{% highlight php %}
<?php
Route::get('api/dropdown', function(){
   $input = Input::get('option');
   $category = Category::find($input);
   $subcategory = $category->subcategory();
   return Response::make($subcategory->get(['id','subcategory_name']));
});
?>
{% endhighlight %}

The JS part

{% highlight javascript %}
$(document).ready(function($){
   $('#cat').change(function(){
     $.get($(this).data(url),
     { option: $(this).val() },
       function(data) {
         var subcat = $('#subcat');
         subcat.empty();
         $.each(data, function(index, element) {
         subcat.append("<option value='"+ element.id +"'>" + element.name + "</option>");
       });
     });
   });
});
{% endhighlight %}

and whew! The HTML

{% highlight html %}
{% raw %}
{{ Form::open() }}
<select id="cat" name="category" data-url="{{ url('api/dropdown')}}">
  <option>Select Car Make</option>
  <option value="1">Toyota</option>
  <option value="2">Honda</option>
  <option value="3">Mercedes</option>
</select>
<br>
<select id="subcat" name="subcategory">
  <option>Please choose car make first</option>
</select>
{{ Form::close();}}
{% endraw %}
{% endhighlight %}

I made some modifications to Mak's code and I believe it works better this way. Also, the Eloquent method are adjusted to fit the Laravel4.2 documentation.