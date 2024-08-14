const dotenv = require("dotenv");
dotenv.config();

const config = {
    connectionString: process.env.CONNECTION_STRING
};

module.exports = config;
