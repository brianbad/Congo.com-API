const userRoutes = require('./routes/userRoutes/userRoutes');
const authenticationRoutes = require('./routes/authenticationRoutes/authenticationRoutes');
// In order to easily deal with POST and PUT requests to our API, we will 
// add body parsing middleware. This is where our body-parser module comes 
// in. body-parser will extract the entire body of an incoming request and 
// parse it into a JSON object that we can work with.
const bodyParser = require('body-parser');

// Require packages and set the port
const express = require('express');
const port = process.env.port || 3000;
const app = express();

// Use Node.js body parsing middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true,
}));

authenticationRoutes(app);
userRoutes(app);

// Start the server
const server = app.listen(port, (error) => {
    if (error) return console.log(`Error: ${error}`);

    console.log(`Server listening on port ${server.address().port}`);
});