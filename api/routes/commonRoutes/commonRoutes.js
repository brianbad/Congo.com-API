// Load the MySQL pool connection
const pool = require('../../config/databaseConfig');
// Load the authentication service
let authentication = require('../../auth/authenticateToken');
// Load the endpoint variables
const endpoints = require('../../constants/endpoints');
// Load the hashing helper functions
const hashing = require('../../auth/hashing');

const commonRouter = app => {
    // Get all items
    app.get(endpoints.GET_CATEGORIES, (request, response) => {
        pool.query('SELECT * FROM categories', (error, result) => {
            if (error) throw error;
            return response.status(200).send(result);
        });
    });
}

// Export the router
module.exports = commonRouter;