// Load the MySQL pool connection
const pool = require('../../config/databaseConfig');
// Load the endpoint variables
const endpoints = require('../../constants/endpoints');
// Load the hashing helper functions
const hashing = require('../../auth/hashing');

let authentication = require('../../auth/authenticateToken');

const reviewRouter = app => {
    
    app.get(endpoints.GET_ITEM_REVIEWS, (request, response) => {
        let itemId = request.params.itemId;

        pool.query('SELECT * FROM item_reviews WHERE itemId = ' + itemId, (error, result) => {
            if (error) throw error;
            return response.status(200).send(result);
        })
    })

    app.post(endpoints.CREATE_REVIEW, authentication.checkToken, (request, response) => {
        // Insert the new review
        pool.query('INSERT INTO item_reviews SET ?', request.body, (error, result) => {
            if (error) throw error

            // Recalcualte the average rating for that item
            pool.query('SELECT AVG(rating) AS averageRating FROM item_reviews WHERE itemId = ' + request.body.itemId, (error, result) => {
                if (error) throw error;

                // Insert the new average rating into the item record
                pool.query('UPDATE items SET itemRating = ' + result[0].averageRating + ' WHERE itemId = ' + request.body.itemId, (error, result) => {
                    if (error) throw error;

                    return response.status(201).json({
                        success: true,
                        message: "Review added & item rating updated."
                    });
                })
            })
        })
    })
}

// Export the router
module.exports = reviewRouter;