// Load the MySQL pool connection
const pool = require('../../config/databaseConfig');
// Load the authentication service
let authentication = require('../../auth/authenticateToken');
// Load the endpoint variables
const endpoints = require('../../constants/endpoints');
// Load the hashing helper functions
const hashing = require('../../auth/hashing');

const itemRouter = app => {
    // Get all items
    app.get(endpoints.GET_ITEMS, (request, response) => {
        pool.query('SELECT * FROM items INNER JOIN item_images ON items.itemId = item_images.itemId', (error, result) => {
            if (error) throw error;
            response.send(result);
        });
    });

    // Get a single item by id
    app.get(endpoints.GET_ITEM_BY_ID, (request, response) => {
        const itemId = request.params.itemId;
    
        pool.query('SELECT * FROM items INNER JOIN item_images ON item_images.itemId = items.itemId WHERE items.itemId = ? ', itemId, (error, result) => {
            if (error) throw error;
            response.send(result);
        });
    });

    // Add a new item
    app.post(endpoints.CREATE_ITEM, authentication.checkToken, (request, response) => {
        pool.query('INSERT INTO ITEMS SET ?', request.body, (error, result) => {
            if (error) throw error;
            response.status(201).send('Item added.');
        });
    });

    // Update an existing item by id
    app.put(endpoints.UPDATE_USER_BY_USERNAME, authentication.checkToken, (request, response) => {
        const itemId = request.params.username;

        pool.query('UPDATE items SET ? WHERE itemId = ?', [request.body, itemId], (error, result) => {
            if (error) throw error;
            return response.status(200).json({
                success: true,
                message: "Item " + itemId + " updated successfully."
            });
        });
    });

    // Delete an item by id
    app.delete(endpoints.DELETE_ITEM_BY_ID, authentication.checkToken, (request, response) => {
        const itemId = request.params.itemId;
    
        pool.query('DELETE FROM items WHERE itemId = ?', itemId, (error, result) => {
            if (error) throw error;
            response.send('Item ' + itemId + ' deleted.');
        });
    });
}

// Export the router
module.exports = itemRouter;