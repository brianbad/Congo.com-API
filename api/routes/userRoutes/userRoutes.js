// Load the MySQL pool connection
const pool = require('../../data/config');
// Load the bcrypt library
const bcrypt = require('bcrypt');
// Load the authentication service
let authentication = require('../../auth/authenticateToken');

const userRouter = app => {
    // Get all users
    app.get('/users', authentication.checkToken, (request, response) => {
        pool.query('SELECT * FROM users', (error, result) => {
            if (error) throw error;
            response.send(result);
        });
    });

    // Display a single user by ID
    app.get('/users/:id', authentication.checkToken, (request, response) => {
        const id = request.params.id;
    
        pool.query('SELECT * FROM users WHERE id = ?', id, (error, result) => {
            if (error) throw error;
            response.send(result);
        });
    });

    // Add a new user (Intentionally does not require JWT)
    app.post('/users', (request, response) => {
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

    // Update an existing user
    app.put('/users/:id', (request, response) => {
        const id = request.params.id;
    
        pool.query('UPDATE users SET ? WHERE id = ?', [request.body, id], (error, result) => {
            if (error) throw error;
    
            response.send('User updated successfully.');
        });
    });

    // Delete a user
    app.delete('/users/:id', authentication.checkToken, (request, response) => {
        const id = request.params.id;
    
        pool.query('DELETE FROM users WHERE id = ?', id, (error, result) => {
            if (error) throw error;
            response.send('User deleted.');
        });
    });
}

// Export the router
module.exports = userRouter;