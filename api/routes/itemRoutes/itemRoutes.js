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

    // Get a list of random items
    app.get(endpoints.GET_ITEMS_AT_RANDOM, (request, response) => {
        let quantity = request.params.quantity;

        pool.query('SELECT * FROM items INNER JOIN item_images ON items.itemId = item_images.itemId ORDER BY RAND() LIMIT ' + quantity, (error, result) => {
            if (error) throw error;
            response.send(result);
        })
    });

    // Get a single item by id
    app.get(endpoints.GET_ITEM_BY_ID, (request, response) => {
        const itemId = request.params.itemId;
    
        pool.query('SELECT * FROM items INNER JOIN item_images ON item_images.itemId = items.itemId WHERE items.itemId = ? ', itemId, (error, result) => {
            if (error) throw error;
            response.send(result);
        });
    });

    // Get items by seller
    app.get(endpoints.GET_ITEMS_BY_SELLER, (request, response) => {
        const seller = request.params.username;
    
        pool.query('SELECT * FROM items INNER JOIN item_images ON item_images.itemId = items.itemId WHERE items.seller = ? ', seller, (error, result) => {
            if (error) throw error;
            response.send(result);
        });
    });

    // Get a list of items by search term
    app.get(endpoints.SEARCH_ITEMS, (request, response) => {
        const searchTerm = request.query.query;
        const category = request.query.category

        let termArray = searchTerm.split(" ");
        let query = "";
        if (category) {
            query = "SELECT * FROM items INNER JOIN item_images ON item_images.itemId = items.itemId WHERE items.category = " + category + " AND";
        } else {
            query = "SELECT * FROM items INNER JOIN item_images ON item_images.itemId = items.itemId WHERE";
        }
        
        for (let i = 0; i < termArray.length; i++) {
            query += " items.keywords LIKE '%" + termArray[i] + "%'";
            if (i < termArray.length - 1) query += " AND";
        }

        pool.query(query, (error, result) => {
            if (error) throw error;
            response.send(result);
        });
    })

    // Add a new item
    app.post(endpoints.CREATE_ITEM, authentication.checkToken, (request, response) => {
        let imageFilename = request.body.imageFilename;
        delete request.body["imageFilename"];

        request.body["keywords"] = request.body["itemName"];

        pool.query('INSERT INTO items SET ?', request.body, (error, result) => {
            if (error) throw error;

            let imageFilenameMappingBody = {
                itemId: result.insertId,
                filename: imageFilename
            }
            pool.query('INSERT INTO item_images SET ?', imageFilenameMappingBody, (error, result) => {
                if (error) throw error;
                return response.status(200).json({
                    success: true,
                    message: 'Item added.'
                })
            })
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