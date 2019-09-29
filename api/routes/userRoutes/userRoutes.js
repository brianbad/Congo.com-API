// Load the MySQL pool connection
const pool = require('../../config/databaseConfig');
// Load the bcrypt library
const bcrypt = require('bcrypt');
// Load the authentication service
let authentication = require('../../auth/authenticateToken');
// Load the endpoint variables
const endpoints = require('../../constants/endpoints');

const userRouter = app => {
    // Get all users
    app.get(endpoints.GET_USERS, authentication.checkToken, (request, response) => {
        pool.query('SELECT * FROM users', (error, result) => {
            if (error) throw error;
            response.send(result);
        });
    });

    // Display a single user by username
    app.get(endpoints.GET_USER_BY_USERNAME, authentication.checkToken, (request, response) => {
        const username = request.params.username;
    
        pool.query('SELECT * FROM users WHERE username = ?', username, (error, result) => {
            if (error) throw error;
            response.send(result);
        });
    });

    // Add a new user (Intentionally does not require JWT)
    app.post(endpoints.CREATE_USER, (request, response) => {
        let username = request.body.username;
        let password = request.body.password;

        if (username && password) {
            if (username.length === 0 || password.length === 0) {
                response.status(400).json({
                    success: false,
                    message: "Username and Password must have length greater than 0."
                });
            } else {
                // The second argument is the number of rounds to use when generating a salt.
                bcrypt.hash(password, 10, (err, hash) => {
                    if (err) {
                        return response.status(500).json({
                            error: err
                        });
                    } else {
                        request.body.password = hash;
                        pool.query('INSERT INTO users SET ?', request.body, (error, result) => {
                            if (error) throw error;
                            response.status(201).send(`User added.`);
                        });
                    }
                });
            }
        } else {
            response.status(400).json({
                success: false,
                message: "Username and Password must be supplied."
            });
        }
    });

    // Update an existing user by username
    app.put(endpoints.UPDATE_USER_BY_USERNAME, authentication.checkToken, (request, response) => {
        const username = request.params.username;
    
        pool.query('UPDATE users SET ? WHERE username = ?', [request.body, username], (error, result) => {
            if (error) throw error;
    
            response.send('User ' + username + ' updated successfully.');
        });
    });

    // Delete a user by username
    app.delete(endpoints.DELETE_USER_BY_USERNAME, authentication.checkToken, (request, response) => {
        const username = request.params.username;
    
        pool.query('DELETE FROM users WHERE username= ?', username, (error, result) => {
            if (error) throw error;
            response.send('User ' + username + ' deleted.');
        });
    });
}

// Export the router
module.exports = userRouter;