---
title: Implementing dynamic drop down / dependent list in laravel4
author: Joseph Rex
layout: post
permalink: /implementing-dynamic-drop-down-or-dependent-list-in-laravel4/
categories:
  - web
tags:
  - javascript
  - jquery
  - laravel
  - sql
---
[<img class="aligncenter size-full wp-image-328" src="http://josephrex.me/wp-content/uploads/2014/11/drop-down-menu.jpg" alt="drop-down-menu" width="600" height="338" />][1]When I used procedural PHP for most of my projects, I found myself needing what I referred to as a dependent list. These days I hear it being referred to as dynamic drop down more often. After looking around, a friend gave this solution to me.

All examples here will rely on the DDL database schema here:

<pre class="lang:mysql decode:true" title="SQL Fiddle">CREATE TABLE IF NOT EXISTS `categories` (
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
(9, 3, 'Blouses');</pre>

For a clearer view, I have it here on SQL fiddle: <a title="SQL Fiddle DB Schema" href="http://sqlfiddle.com/#!2/58fcf/4/1" target="_blank">http://sqlfiddle.com/#!2/58fcf/4/1</a>

### Procedural code

<pre class="lang:xhtml decode:true">&lt;form method="get"&gt;
	&lt;label for="category"&gt;Parent Category&lt;/label&gt;
    &lt;select name="parent_cat" id="parent_cat"&gt;
        &lt;?php while($row = mysql_fetch_array($query_parent)): ?&gt;
        &lt;option value="&lt;?php echo $row['id']; ?&gt;"&gt;&lt;?php echo $row['category_name']; ?&gt;&lt;/option&gt;
        &lt;?php endwhile; ?&gt;
    &lt;/select&gt;
    &lt;br/&gt;&lt;br/&gt;
  
    &lt;label&gt;Sub Category&lt;/label&gt;
    &lt;select name="sub_cat" id="sub_cat"&gt;&lt;/select&gt;
&lt;/form&gt;</pre>

The mark-up is a file named with the php extension with the body content as above. It uses the following jQuery snippet

<pre class="lang:js decode:true">$(document).ready(function() {
    
	$("#parent_cat").change(function() {
		$(this).after('&lt;div id="loader"&gt;&lt;img src="img/loading.gif" alt="loading subcategory" /&gt;&lt;/div&gt;');
		$.get('loadsubcat.php?parent_cat=' + $(this).val(), function(data) {
			$("#sub_cat").html(data);
			$('#loader').slideUp(200, function() {
				$(this).remove();
			});
		});	
    });

});</pre>

From the jQuery code above we try to send the present value of the category to a different PHP file that takes in GET parameters. It gets all the subcategories of the selected category and echo them to that page making it return those listed values to jQuery as sub categories

<pre class="lang:php decode:true ">&lt;?php 
mysql_connect('localhost', 'root', '');
mysql_select_db('dependent_list');
$parent_cat = $_GET['parent_cat'];

$query = mysql_query("SELECT * FROM subcategories WHERE categoryID = {$parent_cat}");
while($row = mysql_fetch_array($query)) {
	echo "&lt;option value='$row[id]'&gt;$row[subcategory_name]&lt;/option&gt;";
}

?&gt;</pre>

Good solution right? Thanks to my friend but now I&#8217;m dealing with more advanced code.

By using laravel, we mostly use request URIs rather than $_GET requests. I could re-implement this by creating a seperate route that takes that extra request segment to fetch all the information.

I&#8217;ll go through 3 ways we can achieve this in Laravel, starting with this.

### Method 1

Create your route to display your drop down list

<pre class="lang:default decode:true">Route::get('myroute','myController@firstMethod');</pre>

Define the firstmethod in the myController (these names can be whatever you wish) controller.

<pre class="lang:default decode:true">public function firstMethod(){
    $categories = DB::table('categories')-&gt;get();
    return View::make('myview',['categories' =&gt; $categories]);
}</pre>

Next we&#8217;ll create a route for our sub-categories feeder view

<pre class="lang:default decode:true">Route::get('loadsubcat/{id}','myController@secondMethod');</pre>

and a method

<pre class="lang:default decode:true ">public function secondMethod($id){
    $subcategories = DB::table('subcategories')-&gt;where('categoryID', $id)-&gt;get();
    return View::make('thisview', ['subcategories' =&gt; $subcategories);
}</pre>

for the view of this method we will add the following

<pre class="lang:default decode:true">@foreach($subcategories as $subcategory)
    &lt;option value="{{ $subcategory-&gt;id }}"&gt;{{ $subcategory-&gt;subcategory_name }}&lt;/option&gt;
@endforeach</pre>

Inside our first display view, we can add the following mark-up:

<pre class="lang:default decode:true">{{ Form::open(['action'=&gt;'myController@secondMethod']) }}
	&lt;label for="category"&gt;Parent Category&lt;/label&gt;
    &lt;select name="parent_cat" id="parent_cat"&gt;
        @foreach($categories as $category)
        &lt;option value="{{ $category-&gt;id }}"&gt;{{ $category-&gt;category_name }}&lt;/option&gt;
        @endforeach
    &lt;/select&gt;
    &lt;br/&gt;&lt;br/&gt;
  
    &lt;label&gt;Sub Category&lt;/label&gt;
    &lt;select name="sub_cat" id="sub_cat"&gt;&lt;/select&gt;
{{ Form::close() }}</pre>

and finally the JS part

<pre class="lang:default decode:true">$(document).ready(function() {
	$("#parent_cat").change(function() {
		$.get('loadsubcat/' + $(this).val(), function(data) {
			$("#sub_cat").html(data);
		});	
    });

});</pre>

So this is really similar to the former procedural version but I took away all the unnecessary loader part.

### Method 2

For this method, I already made a <a title="JS Fiddle direct link" href="http://jsfiddle.net/bl4ckdu5t/npkf9hn6/" target="_blank">JSfiddle</a> to implement with static HTML. This method is meant to use JSON data to feed DB contents to jQuery in order to dynamically change subcategories based on the selected categories.



Notice I put values of data-load in single quotes because it is expected to contain JSON data which has double quotes. To make our data more dynamic, let&#8217;s make the data-load JSON get fetched from the database. Let&#8217;s make a controller with this contents

<pre class="lang:default decode:true ">// Controller
$categories = DB::table('categories')-&gt;get();
$categories_pack = [];
foreach($categories as $category):
   $category_products = DB::table('subcategories')-&gt;where('categoryID',$category-&gt;id)-&gt;lists('subcategory_name');
   $categories_pack[$category-&gt;category_name] = $category_products;
endforeach;
$jsonified = json_encode($categories_pack);
$data = ['categories' =&gt; $jsonified];
return View::make('yourview',$data);</pre>

Here&#8217;s the part where we plug that into our view:

<pre class="lang:xhtml decode:true ">&lt;select class="cat"&gt;
  &lt;option selected disabled&gt;- Categories -&lt;/option&gt;
  &lt;option&gt;Bags&lt;/option&gt;
  &lt;option&gt;Shoes&lt;/option&gt;
  &lt;option&gt;T-Shirts&lt;/option&gt;
&lt;/select&gt;
&lt;br&gt;
&lt;select class="subcat"&gt;
  &lt;option&gt;- select a category -&lt;/option&gt;
&lt;/select&gt;
&lt;div id="load" data-load='{{ $categories }}'&gt;&lt;/div&gt;</pre>

And with this we can get it to work like it did with the static HTML example above.

### Method 3

In this method, I will simplify <a href="https://twitter.com/msurguy" target="_blank">Maksim Surguy&#8217;s</a> solution from this <a href="https://gist.github.com/msurguy/5138788" target="_blank">github gist</a>. Mak used two tables (makers and models) to describe car makers and models. Rather than twisting the flow, I&#8217;ll keep to my categories and subcategories tables.

> Categories == Makers
> 
> Subcategories == Models

In order to use Eloquent with this. We will extend eloquent with a models for each of them.

categories.php (<a href="http://laravel.com/docs/4.2/eloquent#one-to-many" target="_blank">One to Many Eloquent Method</a>)

<pre class="lang:php decode:true">&lt;?php
class Category extends Eloquent {
   public function Categories(){
      return $this-&gt;hasMany('Subcategory');
   }
}
 
?&gt;</pre>

subcategories.php (Inverse Relation Eloquent)

<pre class="lang:default decode:true">&lt;?php
class Subcategory extends Eloquent {
   public function subcategory(){
      return $this-&gt;belongsTo('Category');
   }
}
 
?&gt;</pre>

Then a simple route with a callback function

<pre class="lang:default decode:true">Route::get('api/dropdown', function(){
   $input = Input::get('option');
   $category = Category::find($input);
   $subcategory = $category-&gt;subcategory();
   return Response::make($subcategory-&gt;get(['id','subcategory_name']));
});</pre>

The JS part

<pre class="lang:js decode:true ">$(document).ready(function($){
   $('#cat').change(function(){
     $.get($(this).data(url),
     { option: $(this).val() },
       function(data) {
         var subcat = $('#subcat');
         subcat.empty();
         $.each(data, function(index, element) {
         subcat.append("&lt;option value='"+ element.id +"'&gt;" + element.name + "&lt;/option&gt;");
       });
     });
   });
});</pre>

and the whew! The HTML

<pre class="lang:default decode:true">{{ Form::open() }}
&lt;select id="cat" name="category" data-url="{{ url('api/dropdown')}}"&gt;
  &lt;option&gt;Select Car Make&lt;/option&gt;
  &lt;option value="1"&gt;Toyota&lt;/option&gt;
  &lt;option value="2"&gt;Honda&lt;/option&gt;
  &lt;option value="3"&gt;Mercedes&lt;/option&gt;
&lt;/select&gt;
&lt;br&gt;
&lt;select id="subcat" name="subcategory"&gt;
  &lt;option&gt;Please choose car make first&lt;/option&gt;
&lt;/select&gt;
{{ Form::close();}}</pre>

I made some modifications to Mak&#8217;s code and I believe it works better this way. Also, the Eloquent method are adjusted to fit the Laravel4.2 documentation. I hope this helps

 [1]: http://josephrex.me/wp-content/uploads/2014/11/drop-down-menu.jpg