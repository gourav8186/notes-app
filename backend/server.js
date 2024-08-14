const mongoose = require("mongoose");
const config = require("./config/config");
const app = require("./app");

mongoose.connect(config.connectionString,)
    .then(() => {
        console.log("Connected to MongoDB");
        app.listen(4000, () => {
            console.log("Server is running on port 4000");
        });
    })
    .catch(err => {
        console.error("MongoDB connection error:", err);
    });
