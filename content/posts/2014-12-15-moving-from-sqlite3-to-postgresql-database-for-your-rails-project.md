---
author: Joseph Rex
comments: true
date: 2014-12-15T00:00:00Z
title: Moving from sqlite3 to postgresql database for your rails project
permalink: /moving-from-sqlite3-to-postgresql-database-for-your-rails-project/
tags:
  - databases
  - postgresql
  - rails
---

Rails uses sqlite3 by default on development. If you are not careful enough, you may get so comfortable with sqlite which I did. After a while, there will be a need to push the application to production and at this point, you wouldn't want sqlite on your web server. I'm using heroku for my app and they stated <a href="https://devcenter.heroku.com/articles/sqlite3" target="_blank">some good reasons not to use sqlite</a>. On heroku, you wouldn't be able to push your application to production if sqlite3 remains in your Gemfile.
<!--more-->

If you are starting a fresh project, you can just begin this way:

<pre class="lang:sh decode:true ">~$: rails new myproject -d postgresql</pre>

On an existing project you'll have to replace modify your Gemfile to replace

<pre class="lang:default decode:true ">gem 'sqlite3'</pre>

with

<pre class="lang:default decode:true ">gem 'pg'</pre>

run

<pre class="lang:default decode:true ">~$: bundle install</pre>

After which you should change your database.yml in config directory. It should look somewhat like this:

```yaml
default: &default
  adapter: postgresql
  pool: 5
  timeout: 5000

development:
  <<: *default
  database: development_db
  username: joe
  password: 'foobar'

# Warning: The database defined as "test" will be erased and
# re-generated from your development database when you run "rake".
# Do not set this db to the same as development or production.
test:
  <<: *default
  database: test_db
  username: joe
  password: 'foobar'

production:
  <<: *default
  database: production_db
  username: appname
  password:
```

The adapter has been changed from the default *sqlite3* to *postgresql*.

Next you should create this db in postgre with rake

<pre class="lang:default decode:true ">~$:bin/rake db:create</pre>

If you are like me, you should encounter an error at this point. You can't access psql. This is because the username (joe) is not set as a role in psql. To create one

<pre class="lang:default decode:true ">~$:sudo -u postgres createuser --interactive</pre>

If you're on psql < 9.3 you may encounter an error with the &#8211;interactive switch so it's best you <a href="https://wiki.postgresql.org/wiki/Apt" target="_blank">try to upgrade</a>.

Now you can create a password for the user that has been created. Log in to psql

<pre class="lang:default decode:true ">~$:sudo -u postgres psql</pre>

and alter the role of the user created with:

<pre class="lang:default decode:true">ALTER ROLE joe WITH PASSWORD 'secret';</pre>

If for any reasons this fails, you should modify your pg_hba.conf file to use md5.
