
Time to work on a feature! 

## Step 1: create a branch from `main`

`git checkout main` OR `git switch main`

`git checkout -b [feature-name]` creates a new branch and switches to it

The above command combines: 
`git branch [new-branch]`
`git checkout [new-branch]`

Similarly, you can also use
`git switch -c [new-branch]` instead of `git checkout -b [new-branch]`

## Step 2: do stuff

`git status` -> make sure you're on the feature branch!

`git add [files]`

`git commit -m "[message]"`

`git push --set-upstream origin [feature-name]` -> this sends your branch to github. 

`git push` will work after that. Might as well push as often as you commit to backup code.

## Step 4: create a pull request on github

create PR and await approval. Contact the rest of the team!

## Step 5: ALL PARTIES UPDATE LOCAL MAIN

`git checkout main` OR `git switch main`

`git pull`

## Step 6: ALL OTHER PARTIES MERGE MAIN INTO CURRENT FEATURE BRANCHES

`git checkout [your-current-feature-branch]` OR `git switch [your-current-feature-branch]`

`git merge main` -> after pulling local main up-to-date

This will allow us to handle merge conflicts on a rolling basis

## Step 7: (Optional) Delete feature branch

`git branch -d [feature-name]` -> this only deletes locally
`git push origin --delete [feature-name]` -> ONLY AFTER PR APPROVED! 

## PS

`git switch` is a new alias for `git checkout` that is supposed to be easier for learning git. They are the same, as far as I am aware.
