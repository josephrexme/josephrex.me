---
author: Joseph Rex
comments: true
date: 2015-06-21T00:00:00Z
title: Using Rails assets pipeline with Cloudfront CDN
permalink: /rails-assets-pipeline-with-cloudfront-cdn/
---

Performance is an essential thing in every application that should be considered not only from the front-end but also the back-end. CDNs have been a great way to serve and deliver assets on web pages in this advent of HTTP1. It may not be the same with HTTP2.0 but at this, majority of the web is on HTTP1 and it will be that way for years to come. Cloudfront is an Amazon web service that delivers content from nearby locations and it works greatly when combined with the powers of the rails assets pipeline.
<!--more-->

I've come across websites serving assets with S3 and I only see it as a technology misuse. S3 is meant for storing files and I had initially only used it just for storing user uploads in applications. Serving static assets from S3 wouldn't make requests any faster than they will be if you weren't using a different subdomain for static assets.

## What makes cloudfront different from S3

Cloudfront fetches file from a origin like a S3 bucket where files are stored and distributes it to different edge locations. When users request for assets, the assets are served from the nearest edge location making request time a lot faster.

## Setting up Cloudfront

Just as **buckets** are to S3, **distributions** are to cloudfront. Each distribution has an origin which could be the S3 bucket as I prefer but it could also be some other assets server of yours. If you don't already have a distribution, set up a new one and configure it to suit your needs. Most of the default configurations are ok but you can make minor changes like setting a custom domain rather than using the subdomains with random characters provided by cloudfront. You should have a subdomain like this:

```
http://whatever.cloudfront.net
```

Create an `assets` folder in your S3 bucket if you've chosen S3 bucket as origin then go to your `config/environments/production.rb` and add this line:

```rb
config.action_controller.asset_host = "http://whatever.cloudfront.net"
```

If you choose to only use cloudfront CDN for images, you can do this instead:

```rb
config.action_controller.asset_host = Proc.new { |source|
  if source =~ /\b(.png|.jpg|.gif)\b/i
    "http://whatever.cloudfront.net"
  end
}
```

There's a big chance you already have that in your production config and you will only need to uncomment it. With that in place, calling ```image-url()```, ```asset_path```, ```image_path```, and ```asset_url``` will always append your cloudfront domain with your asset pipeline content hashed file like:

```
http://whatever.cloudfront.net/assets/logo-4c7b3d.png
```

If you're dropping files directly in your assets folder of the origin S3 bucket, you may encounter problems with the web page not finding the desired files. This is because the files in your bucket are without a hash suffix.

The solution to this is to precompile your assets in the production environment before pushing changes to server and then uploading contents of `public/assets` into your assets folder on S3 Bucket.

```
RAILS_ENV=production bundle exec rake:assets precompile
```

Following these steps carefully will get you up and running with CDNs plus assets cache that can be easily invalidated on file changes. Iterating this process of precompilation and uploading to S3 may be painful if you have to do it manually always. I suggest you write a custom script, maybe a Grunt plugin that makes the task a lot easier for you.
