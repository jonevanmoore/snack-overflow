
Time to work on a feature! 

## Step 1: create a branch from `main`

`git -b main`

`git checkout -b [feature-name]`

## Step 2: do stuff

`git status` -> make sure you're on the feature branch!

`git add [files]`

`git commit -m "[message]"`

`git push` -> this sends your branch to github. I do this at least at the start and at the end. Might as well do as often as you commit to backup code.

## Step 4: create a pull request on github

create PR and await approval

## Step 5: ALL PARTIES UPDATE LOCAL MAIN

`git -b main`

`git pull`

## Step 6: ALL OTHER PARTIES MERGE MAIN INTO CURRENT FEATURE BRANCHES

`git -b [your-current-feature-branch]`

`git merge main` -> after pulling local main up-to-date

This will allow us to handle merge conflicts on a rolling basis

## Step 7: (Optional) Delete feature branch

`git branch -d [feature-name]` -> this only deletes locally
`git push origin --delete [feature-name]` -> ONLY AFTER PR APPROVED! This will importantly not delete the history, however.

## PS

`git -b` is short for
`git branch` — both work
