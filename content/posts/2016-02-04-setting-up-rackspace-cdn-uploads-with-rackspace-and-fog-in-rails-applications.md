---
author: Joseph Rex
comments: true
date: 2016-02-04T00:00:00Z
title: Setting up uploads with paperclip and fog in rails applications
permalink: /setting-up-uploads-with-paperclip-and-fog-in-rails-applications/
tags:
  - rails
---

Paperclip is a great gem and one of the most used gem for handling file attachment in rails applications. [Carrierwave][6] is another good choice. This article describes how to use it with the fog gem (a gem that helps you connect with almost any cloud service).
This article will use a Car model to handle scenarios of car image uploads.
Start by adding the necessary gems to your Gemfile
<!--more-->

```
gem 'fog', '~> 1.37'
gem 'paperclip', '~> 4.3'
```

The versions placed with the gems are the current stable versions and may be dated at the time you're reading this. Be sure to check for the [latest][1] [releases][2]. Bundle install and you can set up your model for use with paperclip

```
rails g model car
```
modify the migrations file as needed

```rb
class CreateCars < ActiveRecord::Migration
  def change
    create_table :brands do |t|
      t.string :name
      t.reference :brand
      t.attachment :image

      t.timestamps null: false
    end
  end
end
```

Paperclip allows you store upload images in different dimensions. This is possible with the use of [imagemagick][3] and it's essential that you have it installed on your computer. For Mac OS X users it's as easy as:

```
brew install imagemagick
```

and for debian-based Linux (e.g Ubuntu)

```
$sudo apt-get install imagemagick -y
```

Imagemagick comes with binaries like `convert`, `compare`, `composite` that are handy. Convert calls are made on the image for scaling:

```
$convert dragon.gif  -resize 64x64\> shrink_dragon.gif
```

but this doesn't have to be done by you. You only need to set the dimensions you want from your model

```rb
class Upload < ActiveRecord::Base
  # Associations
  has_many :brands

  # Paperclip
  has_attached_file :image, :styles => { :medium => "300x300>", :thumb => "100x100>" }, :default_url => "/images/:style/missing.png"
  validates_attachment_content_type :image, :content_type => /\Aimage\/.*\Z/
end
```

Notice the line with `has_attached_file`? That's where the action is initiated. You can create more dimensions (:style) depending on your custom need. This simple set up makes your application ready to receive files and store them in the file system but we need to set up a form interface for users. In your view file you should have your form written as below:

```php
<%= form_for @car, url: {action: create}, html: {multipart: true} do |f| %>
<%= f.file_field :image %>
<% end %>
```

With the set up so far paperclip will default to saving uploaded files to your files system. For production you wouldn't want this and that's why you've installed fog to act as an interface to any cloud service we may be using. Fog has a very easy setup. All that's required is to set paperclip defaults with fog and the gem will handle the rest:

```rb
config.paperclip_defaults = {
  storage: :fog,
  fog_credentials: {
    provider: "Rackspace",
    rackspace_username: ENV['FOG_USERNAME'],
    rackspace_api_key: ENV['FOG_API_KEY'],
    rackspace_region: ENV['FOG_REGION']
  },
  fog_directory: ENV['FOG_CONTAINER']
}
```

you should have your environment variables defined somewhere. [Figaro][4] is a good option to manage env vars on development and heroku production server.

In my config I'm using a Rackspace server to handle file uploads and CDN delivery. You can do the same with Amazon S3 and Cloudfront CDN.

If you're uploading files within the same table of your form object then that's all it takes but I'll go further by explaining how to handle this for using a separate database to handle uploads.

### Using a separate model for uploads
This becomes useful when you have multiple models making the same kind of uploads. To keep a DRY code you'd only want to do this once. For my example I'd use a uploads model to handle uploads for cars. Since we aren't uploading to our cars table the migration would be somewhat like this (without the attachment type):

```rb
class CreateCars < ActiveRecord::Migration
  def change
    create_table :brands do |t|
      t.string :name
      t.reference :brand

      t.timestamps null: false
    end
  end
end
```

and we can create a uploads migration with the image attachment

```rb
class CreateUploads < ActiveRecord::Migration
  def change
    create_table :uploads do |t|
      t.string :role
      t.integer :parent_id
      t.attachment :image
      t.timestamps null: false
    end
  end
end
```

The two migrations we've created requires a one-to-many (1:N) relationship between the cars and uploads models where car `has_many uploads` and uploads `bleong_to car`. We have to state the associations in the models

```rb
class Upload < ActiveRecord::Base
  # Associations
  belongs_to :car

  # Paperclip
  has_attached_file :image, :styles => { :medium => "300x300>", :thumb => "100x100>" }, :default_url => "/images/:style/missing.png"
  validates_attachment_content_type :image, :content_type => /\Aimage\/.*\Z/
 end
 ```

```rb
class Car < ActiveRecord::Base
  has_many :brands
  has_many :uploads, foreign_key: :parent_id, dependent: :destroy

  accepts_nested_attributes_for :uploads
end
```

The `accepts_nested_attributes_for` allows you to include a field for uploads in your car form object within the view. Rails automagically knows that the upload associated with car should go to the uploads table and be referenced by the car with a foreign key I've specified in the association `parent_id`. You could use `car_id` but that'll defeat the ambiguity we are trying to achieve with the uploads model.
To make the uploads file field available for use in the view you have to build it from the `new` controller method or whichever method you are creating your form from.

```rb
def new
  @car = Car.new
  @car.uploads.build
end
```

and you can create a file upload field in the view with this:

```php
<%= form_for(@car, url: {action: 'create'}, html: { multipart: true }) do |f| %>
  <% f.text_field :name %>
  <%= f.fields_for :uploads do |upload_field| %>
    <%= upload_field.hidden_field :role, value: 'car' %>
    <%= upload_field.file_field :image %>
  <% end %>
<% end %>
```

The role field for the uploads records takes `car` as a value as specified in the hidden field of the form. This is optional but I like to know what each upload is meant for when using a single model for various kind of uploads.
You may also consider [fineuploader][5] for advanced and better uploads.

[1]: https://rubygems.org/gems/paperclip
[2]: https://rubygems.org/gems/fog
[3]: http://www.imagemagick.org/
[4]: https://github.com/laserlemon/figaro
[5]: http://fineuploader.com/
[6]: https://github.com/carrierwaveuploader/carrierwave
