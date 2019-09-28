// Load the MySQL pool connection
const pool = require('../../data/config');
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

    // Add a new user
    app.post('/users', authentication.checkToken, (request, response) => {
        pool.query('INSERT INTO users SET ?', request.body, (error, result) => {
            if (error) throw error;
            response.status(201).send(`User added with ID: ${result.insertId}`);
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