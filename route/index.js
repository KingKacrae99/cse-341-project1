const router = require('express').Router();
const contactsRoute = require('./contacts');

router.get('', (req, res) => {
    res.send("Hello World")
})

router.use('/contacts', contactsRoute);


module.exports = router