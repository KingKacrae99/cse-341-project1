const express = require('express')
const app = express();
const router = require('./route')



/**********************************************
* Routing
**********************************************/
app.use('/', router);

const port = process.env.port || 3000;

/*************************************************
* Track app activities with listen event
**************************************************/
app.listen(port, () => {
    console.log("Server running on port" + port)
});
