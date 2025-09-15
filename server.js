const express = require('express')
const app = express();
const router = require('./route')
const mongodb = require('./database/database')
const bodyParser = require('body-parser')
require('dotenv').config();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

app
  .use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
  .use(bodyParser.json())
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

