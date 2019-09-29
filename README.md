# express-server

express-server currently is a very basic REST API build with NodeJS, Express.js, and MySQL.

## Developer Setup Guide

1. Install NodeJS (should come packaged with NPM)
2. Install MySQL (I had this previously via XAMPP, but you can try whatever.)
    - Install some type of MySQL UI (XAMPP comes with this)
    - Using the MySQL UI, create a new database called 'api'
    - Run this script to create the table
        - CREATE TABLE users (  
          firstName varchar(50) NOT NULL,
          lastName varchar(50) NOT NULL,
          username varchar(30) NOT NULL UNIQUE,
          password varchar(100) NOT NULL,
          email varchar(100) NOT NULL UNIQUE, 
          KEY (username) ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
    - The API currently expects the database username & password to be 'root' & '' respectively (remove quotes).
3. Clone the repository and run 'npm install' in the root directory to install required dependencies.
            
## Using the API

1. Here are the current endpoints that exist
    - AUTHENTICATION
        - POST http://localhost:3000/login
            - The username and password can be passed in via the request body as JSON, raw data (ie. username=admin&password=password), or via Key/Value pairs (x-www-form-urlencoded)
            - Note: To generate a valid JWT, you first need to create a new account using the proper endpoint mentioned below. firstName, lastName, username, password, and email are all required fields. username and email must be unique to the DB.

    - USERS (Most endpoints require passing a JWT which can be generated using the /login endpoint referenced above. In Postman, this JWT can be passed via the Authorization tab, and selecting 'Bearer Token' as the type and pasting the JWT in the input box)
        - GET http://localhost:3000/users (Get all users)
        - GET http://localhost:3000/users/:id (Get individual user by id)
        - DELETE http://localhost:3000/users/:id (Delete individual user by id)
        - POST http://localhost:3000/users (Create a new user)
            - The data can be passed in via the request body as JSON, raw data (ie. name=John Doe&email=jdoe@email.com), or via Key/Value pairs (x-www-form-urlencoded)
        - PUT http://localhost:3000/users/:id (Update the individual user by id)
            - The data can be passed in via the request body as JSON, raw data (ie. name=John Doe&email=jdoe@email.com), or via Key/Value pairs (x-www-form-urlencoded)
