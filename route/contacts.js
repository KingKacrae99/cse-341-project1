const router = require('express').Router();

const contactController = require('../controllers/contacts')

router.get('/', contactController.getContacts)
router.get('/:id', contactController.getContact)
router.post('/', contactController.createUser)
router.put('/:id',contactController.updateUser)
router.delete('/:id', contactController.deleteUser)

module.exports = router