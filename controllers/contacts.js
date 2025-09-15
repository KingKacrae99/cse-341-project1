const { response } = require('express');
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
const createUser = async (req, res) => {
    const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    }
    const response = await mongodb.getDb().db('professional').collection('contacts').insertOne(user);
    if (response.acknowledged) {
        console.log("User Created: ",response)
       res.status(200).send() 
    }
    console.log(response.error)
    res.status(500).json(response.error || 'An error occured while trying to create user')
}
 
const updateUser = async (req, res) => {
    const userId = new ObjectId(req.params.id)
    const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    }
    const response = await mongodb.getDb().db('professional').collection('contacts').replaceOne({ _id: userId }, user);
    if (response.modifiedCount > 0) {
       res.status(204).send() 
    }
    res.status(404).json({ message: 'No contact found with that id' });
}

const deleteUser = async (req, res) => {
    const userId = new ObjectId(req.params.id);
    const response = await mongodb.getDb().db('professional').collection('contacts').deleteOne({ _id: userId });
    if (response.deletedCount > 0) {
        res.status(200).send()
    }
    res.status(500).json(response.error || 'An error occurred while trying to delete contact')
}

module.exports = {
    getContacts,
    getContact,
    createUser,
    updateUser,
    deleteUser
}