// Load the MySQL pool connection
const pool = require('../../data/config');
// Load the bcrypt library
const bcrypt = require('bcrypt');
// Load the endpoint variables
const endpoints = require('../../constants/endpoints');

let jwt = require('jsonwebtoken');
let authConfig = require('../../auth/config');
let authenticateToken = require('../../auth/authenticateToken');

const authenticationRouter = app => {
    // Attempt to login the user and generate a JWT
    app.post(endpoints.LOGIN, (request, response) => {
        let username = request.body.username;
        let password = request.body.password;

        if (username && password) {
            pool.query('SELECT * FROM users WHERE username = ?', username, (error, result) => {
                if (error) throw error;

                if (result.length === 0) {
                    return response.status(403).json({
                        success: false,
                        message: 'User does not exist.'
                    });
                }

                bcrypt.compare(password, result[0].password, function(err, res) {
                    if (res) {
                        // Passwords match
                        let token = jwt.sign(
                            {username: username},
                            authConfig.secret,
                            {expiresIn: '24h'} // expires in 24 hours
                        );
                        // return the JWT token for the future API calls
                        response.json({
                            success: true,
                            message: 'Authentication successful!',
                            token: token
                        });
                    } else {
                        // Passwords don't match
                        response.status(403).json({
                            success: false,
                            message: 'Incorrect password'
                        });
                    } 
                });
            });
        } else {
            response.status(400).json({
                success: false,
                message: 'Authentication failed! Please provide a username and password.'
            });
        }
    });
}

// Export the router
module.exports = authenticationRouter;