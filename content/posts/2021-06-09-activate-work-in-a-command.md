---
author: Joseph Rex
title: Activate work in a single command
date: 2021-06-09T09:04:19-05:00
lastmod: 2021-06-09T09:04:19-05:00
permalink: /activate-work-in-a-single-command/
tags:
  - automation
  - code
---
For a long time of working with tmux (terminal multiplexer),
I've found it very helpful in separating all the consoles I
need to run servers and REPLs for my workspace. Rather than
opening multiple terminal tabs and windows, I can delegate a
single tab to all tasks for one job.
<!--more-->

Here is what my tmux tab usually look like:

![Tmux pane structure](https://res.cloudinary.com/strich/image/upload/v1623250087/tmux-structure_cct6yw.jpg)

Until a few days ago, I would start my week after a weekend away
from work with the following actions: Run tmux, split vertically 50/50,
go to upper half (child), split vertically by 2, go to lower half (child) and split by 2,
then go to lower half of second child (grandchild) and split horizontally by 2.

After all the splitting is done, I start navigating to necessary directories and running
commands needed to start all needed servers.

It was easy to neglect how tedious that was to do because I could just leave all servers
running all week even when I'm not working. Sometimes they go for weeks and encourage
my reluctance to ever shut down my computer.

I recently started spending my evenings on activities that consume a lot of computer processing
power where I need to kill my work servers and I just couldn't go on punishing myself shutting
down each of all those servers and starting them over each morning. That's when I came up with
the script below:

```sh
if [ "$TERM_PROGRAM" = tmux ]; then
  echo "Exiting ck tmux session"
  # Stop rails servers (ck and fk) and put down docker
  cat $CK_PATH/tmp/pids/server.pid | xargs -n1 -I pid kill -9 pid
  cat $FILEKIT_PATH/tmp/pids/server.pid | xargs -n1 -I pid kill -9 pid
  # Stop functions JS server
  kill $(lsof -wni tcp:3031 | awk 'NR == 2 {print $2}')
  # Put down docker
  docker-compose --file $CK_PATH/dev/docker-compose-dependencies.yml down
  tmux kill-session
else
  tmux new-session \; \
    send-keys 'cd $CK_PATH/packages/functions && npm start' C-m \; \
    split-window -v -p 50 \; \
    send-keys 'cd $CK_PATH && ckdev' C-m \; \
    split-window -v -p 50 \; \
    send-keys '(sleep 30 && cd $FILEKIT_PATH && rails s)' C-m \; \
    split-window -h -p 50 \; \
    send-keys 'docker-compose --file $CK_PATH/dev/docker-compose-dependencies.yml up' C-m \; \
    select-pane -t 0 \; \
    split-window -v -p 50 \; \
    send-keys '(sleep 30 && cd $CK_PATH && rails s)' C-m \;
fi
```

This script begins a new tmux session, splits all the panes I need and start all
necessary servers. I saved it as `ck-tmux` where `ck` there means **convertkit**
where I work. It is included with [my dotfiles](https://github.com/josephrexme/dotfiles)
and aliased to run from any directory I call it.

```sh
alias cktmux='~/ck-tmux.sh'
```

Now all I have to do at the beginning of every work day is type `ck-tmux`. Typing the same
command from inside the tmux session when I'm done with work closes all the servers running
and exits the tmux session.

See it in action

<figure>
<img src="https://res.cloudinary.com/strich/image/upload/v1623251273/a5fc204c1029b94c8fd8b5aec0fa0145_hsfyfb.gif" alt="starting ck tmux" class="image">
<figcaption>Starting work</figcaption>
</figure>

<figure>
<img src="https://res.cloudinary.com/strich/image/upload/v1623251292/5a2e75c590ad9c25a1a00af4fdb72872_yxh4mr.gif" alt="stopping ck tmux" class="image">
<figcaption>Stopping work</figcaption>
</figure>