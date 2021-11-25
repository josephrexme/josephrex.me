---
author: Joseph Rex
comments: true
date: 2017-03-17T00:00:00Z
tags:
  - rails
  - frontend
title: Frontend asset management in rails applications
permalink: /frontend-asset-management-in-rails-applications/
---

In rails planet it's easy to assume that asset management is at its best with the assets pipeline it provides which includes sprockets for simple requires. Sprockets is great but could be better with a properly structured application.
<!--more-->

[Bundler][1] makes it easy to install and manage ruby gems and with its most used source/registry being [rubygems.org][2]; a platform that homes a lot of ruby libraries you can be sure to find almost any ruby library you need or publish one that doesn't already exist.

If you're picking up rails for the first time you'd find it easy to add just about anything you need to your Gemfile and bundle it up but the problem with this is many frontend libraries aren't made for just ruby developers so they are kept on frontend targeted registries like npm or bower. Because of npm's nested dependency tree which only works well in node environments, bower becomes the best source for frontend assets. [Check difference between npm and bower][3].

At this point you'd think you could just add bower as a source in your Gemfile and name whatever library you want from its registry but that wouldn't work because bower wasn't made to work with bundler. To solve this problem [rails-assets][4] was created. From version 1.8.4 of [bundler][1] you can include multiple sources to your Gemfile and wrap them in a block. rails assets builds upon this by proxying between bundler and bower to provide bower assets through the Gemfile. If all you need is a little app with no further maintainance (they always grow into a maintainance hell), this is all you need.

For a properly maintained project, you consider seperation of concern; something rails as a framework does a fair amount of itself. When you install ruby libraries through bundler you usually don't want to modify them or anything. You are fine with having them install freshly on your development machine and the rest of your team's as well as on the production machine. This is not always the same with a frontend library. Sometimes there are little tweaks you want to make to the library to behave better with your application and modifying just what you have in your locally installed shims directory wouldn't keep the change for the rest of the team on in production. Also, your Gemfile can grow really quick with frontend assets and you don't want that if you want easier debugging in your app.

To solve this, you use bower directly and save yourself the extra layer rails-assets offers.

## Configuring rails for bower sprocket requires
First you specify where bower should install its components. By default it installs them in the

`bower_components` directory within the root of your project but rails already make it possible to make a sprocket require of assets in `vendor/assets/javascripts` and `vendor/assets/stylesheets`. You may or may not be using these already but it's easier to think of the vendor directory as where vendor scripts/libraries go hence we'd tell bower to store components in there by creating a `.bowerrc` file in the root folder and adding this:

```json
{"directory": "vendor/assets/components"}
```

In my opinion, bower also has the best cli search of all registries so if you're not sure of a library name you can run a search to see what it's called by the most legitimate maintainer `bower search bootstrap`.

Once found `bower install bootstrap` and your component would be stored at `vendor/assets/components/bootstrap`. Because of bower's flat dependency and also for the reason I mentioned earlier on easily debugging and making changes to frontend assets, you don't gitignore your bower components (this is just my opinion. If you have better reasons to gitignore it then do that). For rails to find these newly installed components and make them available as sprocket requires modify your application.rb located at `config/application.rb` with this assets path modification:

```rb
module YourApp
  class Application < Rails::Application
    ...
    config.assets.paths << Rails.root.join('vendor', 'assets', 'components')
  end>
end
```

Now you can go into your stylesheets manifest file (application.css) and do this:

```css
/*
 * Applicaiton.css
 *= require bootstrap/dist/css/bootstrap
 *
 */
```

for Javascript it'd be

```js
// Application.js
//= require bootstrap/dist/js/bootstrap
//
```

The final names here do not need their extensions .css and .js like every other sprocket require is always smart to determine the filetype by the parent filetype. To derive the path given to sprockets you simply have to look at the path from inside `vendor/assets/components` and your component name till its required asset file name.

If you've chosen to ignore your bower components directory earlier you should make sure you have a bower.json file to save your installed component names. This can be generated with `bower init` and add `--save` to your installs e.g `bower install --save bootstrap`.

This way you can look at all the frontend assets easily in the bower.json file and they'd look like this:

```json
{
  "dependencies": {
    "bootstrap": "^3.3.7",
    "lodash": "^4.17.3",
    "Snap.svg" "snap.svg#^0.4.1"
  }
}
```

leaving your Gemfile free of frontend mess. This is espcially useful if you work with frontend developers that you would rather not have messing with things that affect/influence the backend process.



[1]:http://bundler.io
[2]:https://rubygems.org
[3]:http://stackoverflow.com/a/18652918/2649933
[4]:https://rails-assets.org

