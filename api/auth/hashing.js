// Load the bcrypt library
const bcrypt = require('bcrypt');

let generateHash = (password) => {
    // The second argument is the number of rounds to use when generating a salt.
    return bcrypt.hashSync(password, 10);
}

let compareHash = (password, hash) => {
    return bcrypt.compareSync(password, hash);
}

module.exports = {
    generateHash: generateHash,
    compareHash: compareHash
}