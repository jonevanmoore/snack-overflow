# Welcome to SnackOverflow!

SnackOverflow is a spiritual clone of StackOverflow, with a theme of all things edible. It is built using:
- [Express](https://expressjs.com/)
- [Pug](https://pugjs.org/api/getting-started.html)
- [Sequelize](https://sequelize.org/v5/)
- [Postgres](https://www.postgresql.org/)
- [bcrypt](https://www.npmjs.com/package/bcryptjs) 
- vanilla CSS
- and a few other packages

# Link to Lur Site
Hosted on Heroku: [SnackOverflow](http://snackoverflowapp.herokuapp.com/)

# Main Features 
- Sign Up or use the Demo User!
- Read questions posted by other users, or post your own!
- Edit or delete your questions!
- Post answers to questions!
- Edit or delete your answers to questions!
- Vote on answers!  
- Check out user profiles to see a user's questions, answers, and score!

# Notable Features:
- `/questions` collective resource page truncates the body of the post for a preview to not more than 140 characters, and not in the middle of a word.
- `/questions/:id` single resource page shows the creation timestamp, and only displays the update timestamp if it's different.

# DB Schema
![dbdiagram](./docs/dbdiagram.JPG)
