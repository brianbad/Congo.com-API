# express-server

express-server currently is a very basic REST API build with NodeJS, Express.js, and MySQL.

## Developer Setup Guide

1. Install NodeJS (should come packaged with NPM)
2. Install MySQL (I had this previously via XAMPP, but you can try whatever.)
    - Install some type of MySQL UI (XAMPP comes with this)
    - Using the MySQL UI, create a new database called 'api'
    - Run this script to create the table
        - CREATE TABLE `users` (
        `id`       int(11)     unsigned NOT NULL AUTO_INCREMENT,
        `name`     varchar(30) DEFAULT '',
        `email`    varchar(50) DEFAULT '',
        PRIMARY KEY (`id`)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
    - The API currently expects the database username & password to be 'root' & '' respectively (remove quotes).
    - When your table is created, run this SQL query to create some test data
        - INSERT INTO users (name, email) 
        VALUES ('Richard Hendricks', 'richard@piedpiper.com'), 
                ('Bertram Gilfoyle',  'gilfoyle@piedpiper.com');
            
## Using the API

1. Here are the current endpoints that exist
    - AUTHENTICATION
        - POST http://localhost:3000/login
            - The username and password can be passed in via the request body as JSON, raw data (ie. username=admin&password=password), or via Key/Value pairs (x-www-form-urlencoded)
            - Note: To generate a valid JWT, the only valid account is username: admin, password: password. These credentials are currently hard coded (TODO: Actually verify credentials through the DB).

    - USERS
        - GET http://localhost:3000/users (Get all users)
        - GET http://localhost:3000/users/:id (Get individual user by id)
        - DELETE http://localhost:3000/users/:id (Delete individual user by id)
        - POST http://localhost:3000/users (Create a new user)
            - The name and email can be passed in via the request body as JSON, raw data (ie. name=John Doe&email=jdoe@email.com), or via Key/Value pairs (x-www-form-urlencoded)
