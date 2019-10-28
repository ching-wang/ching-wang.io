---
layout: post
title: Notes on Git Workflow
date: 2019-10-28 12:26:16 +0100
---

Today I've learnt a few things about Github and git workflows, which is
exciting.

Here are some notes on some of the things I've learnt so far.

### Setup a new repository 

Go to Github, click create, click "repositories", then click the green button
on the top right corner. Give it a name and click "Create repository". 

### Git clone

Start to work on the repository you've just created. You can clone it to your
local machine. Here are the steps:

1. On your repository, click the green button - 'clone and download',
   and copy the SSH address.
2. Go to your terminal and direct to where you would like to save the work.
3. `git clone <SSH address>`


### Create a branch

You can work on a new branch to avoid conflicts when you collaborate with
others.

```bash
git checkout -b <your-branch-name>
```

### Add and commit changes

This is called the 'staging area'. Git allows you to add changes to your project to
the local repo in two steps:

```bash
git add <your-file-name>
# File is now staged.
git commit -m 'message'
# File is now committed locally.
```

### Push branches

```bash
git push origin <your-branch-name>
```
  
### Identify local and remote branches

You can check which branch you are on with:

```bash
git branch
```

The one marked with a with `*` is the your current branch.

### Switch between branches

```bash
$ git checkout <your-branch-name>
````

### Pull branches for latest changes

```bash
$ git pull origin master
```

### Merge branches

If you have a branch called 'a-branch' and one called 'b-branch', and you
would like to merge the 'a-branch' to 'b-branch', you need to make sure that
you are on the 'b-branch' before you merging them.

```bash
git checkout b-branch
git merge a-branch
```

### Delete branches

```bash
git branch -d <your-branch-name>
```

### Review a repository’s history with git log

```bash
git log
```

### Unstage changes with git reset

```bash
git reset
```

#### If you would like to read more, checkout these links
 
 - [https://git-scm.com/book/en/v1/Getting-Started-Git-Basics](https://git-scm.com/book/en/v1/Getting-Started-Git-Basics)
 - [https://rogerdudler.github.io/git-guide/](https://rogerdudler.github.io/git-guide/)
 - [https://ohshitgit.com](https://ohshitgit.com)
 - [https://nvie.com/posts/a-successful-git-branching-model/](https://nvie.com/posts/a-successful-git-branching-model/)
