const express = require("express")
require("dotenv").config();
const app = express();
const path = require('path');
const dbConnection = require("./config/dbConfig"); // MongoDB connection
const port = process.env.PORT || 9000;
const staticpath = path.join(__dirname, './public'); // Public path
app.use(express.static(staticpath)); // Use public path
app.use(express.json());
app.use('/api/user', require('./routes/UserRouter')); // Api


app.listen(port, () => {
    console.log(`Server ruuning on port ${port}`);
    dbConnection
})