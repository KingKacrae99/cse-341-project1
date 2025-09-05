const router = require('express').Router();

const contactController = require('../controllers/contacts')

router.get('', contactController.getContacts)
router.get('/:id', contactController.getContact)

module.exports = router