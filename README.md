# Capstone Project Front-End Readme

- Deployed Back-end: https://quiet-woodland-25772.herokuapp.com
- Deployed Front-end: https://treep78.github.io/jmwwvt-v2-front-end/
- Back-end Repo: https://github.com/treep78/jmwwvt-v2-back-end
- Front-end Repo: https://github.com/treep78/jmwwvt-v2-front-end

# Front-end Summary

This front-end application is designed as a web-site for a small company to have a hom/about page, a portfolio of work that can be edited from the front end.

# Technologies Utilized:

- Node.js
- Express
- MongoDB
- Mongoose
- Javascript
- Json
- Curl
- Heroku
- Git
- mLab

# Database Collections:

- /portfolio_images

# Routes

// standards RESTful routes
.resources('portfolio_images')
.resources('categories')

// users of the app have special requirements
.post('/sign-up', 'users#signup')
.post('/sign-in', 'users#signin')
.delete('/sign-out/:id', 'users#signout')
.patch('/change-password/:id', 'users#changepw')
.resources('users', { only: ['index', 'show'] })

# User Stories

- A user can sign-up
- A user can sign-in
- A user can change-password
- A user can sign-out
- Anyone can view products
- A user can add a database entry called a portfolio_image with a category, title, description, image link
- A user can view portfolio_images
- A user can change portfolio_images
- A user can remove portfolio_image
