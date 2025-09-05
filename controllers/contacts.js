const mongodb = require('../database/database');
const ObjectId = require('mongodb').ObjectId;

const getContacts = async (req, res) => {
    const result = await mongodb.getDb().db('professional').collection('contacts').find();
    result.toArray().then((contacts) => {
        res.setHeader('content-type', 'application/json');
        res.status(200).json(contacts);
    }).catch((err) => {
        console.log(err)
    });
}

const getContact = async (req, res) => {
    const contactId = new ObjectId(req.params.id); 
    const result = await mongodb.getDb().db('professional').collection('contacts').find({ _id: contactId});
    result.toArray().then((contacts) => {
        res.setHeader('content-type', 'application/json');
        res.status(200).json(contacts[0]);
    }).catch((err) => {
        console.log(err)
    });
}

module.exports = {
    getContacts,
    getContact
}