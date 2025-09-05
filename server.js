const express = require('express')
const app = express();
const router = require('./route')
const mongodb = require('./database/database')
require('dotenv').config();

/**********************************************
* Routing
**********************************************/
app.use('/', router);

const port = process.env.port || 3000;

/*************************************************
* Track app activities with listen event
**************************************************/
mongodb.InitDb((err) => {
    if (err) {
        console.log(err)
    }
    else {
        app.listen(port, () => {
            console.log("Database listening and Server running on port" + port)
        });
    }
});

