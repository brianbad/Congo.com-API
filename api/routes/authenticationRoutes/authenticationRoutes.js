// Load the MySQL pool connection
const pool = require('../../config/databaseConfig');
// Load the endpoint variables
const endpoints = require('../../constants/endpoints');
// Load the hashing helper functions
const hashing = require('../../auth/hashing');

let jwt = require('jsonwebtoken');
let authConfig = require('../../config/authenticationConfig');
let authenticateToken = require('../../auth/authenticateToken');

const authenticationRouter = app => {
    // Attempt to login the user and generate a JWT
    app.post(endpoints.LOGIN, (request, response) => {
        let username = request.body.username;
        let password = request.body.password;

        if (username && password) {
            pool.query('SELECT * FROM users WHERE username = ?', username, (error, result) => {
                if (error) throw error;

                // The user does not exist if the result set is empty
                if (result.length === 0) {
                    return response.status(403).json({
                        success: false,
                        message: 'User does not exist.'
                    });
                }

                if (hashing.compareHash(password, result[0].password)) {
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