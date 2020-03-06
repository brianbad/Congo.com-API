const userRoutes = require('./routes/userRoutes/userRoutes');
const itemRoutes = require('./routes/itemRoutes/itemRoutes');
const reviewRoutes = require('./routes/reviewRoutes/reviewRoutes');
const authenticationRoutes = require('./routes/authenticationRoutes/authenticationRoutes');
const commonRoutes = require('./routes/commonRoutes/commonRoutes');
// In order to easily deal with POST and PUT requests to our API, we will 
// add body parsing middleware. This is where our body-parser module comes 
// in. body-parser will extract the entire body of an incoming request and 
// parse it into a JSON object that we can work with.
const bodyParser = require('body-parser');

const cors = require('cors');

// Require packages and set the port
const express = require('express');
const port = process.env.port || 3000;
const app = express();

app.use(cors());

// Use Node.js body parsing middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true,
}));

authenticationRoutes(app);
commonRoutes(app);
userRoutes(app);
itemRoutes(app);
reviewRoutes(app);

// Start the server
const server = app.listen(port, (error) => {
    if (error) return console.log(`Error: ${error}`);

    console.log(`Server listening on port ${server.address().port}`);
});