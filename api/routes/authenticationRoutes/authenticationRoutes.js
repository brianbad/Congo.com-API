// Load the MySQL pool connection
const pool = require('../../data/config');

let jwt = require('jsonwebtoken');
let authConfig = require('../../auth/config');
let authenticateToken = require('../../auth/authenticateToken');

const authenticationRouter = app => {
    // Attempt to login the user and generate a JWT
    app.post('/login', (request, response) => {
        let username = request.body.username;
        let password = request.body.password;

        if (username && password) {
            pool.query('SELECT * FROM users WHERE username = ?', username, (error, result) => {
                if (error) throw error;

                if (password === result[0].password) {
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
                    response.status(403).json({
                        success: false,
                        message: 'Incorrect username or password'
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