require('dotenv').config();

const MongoClient = require('mongodb').MongoClient;

let db;

const InitDb = (callback) => {
    if (db) {
        console.log('Database already initialized')
        return callback(null,db)
    }
    MongoClient.connect(process.env.MONGODB_URL)
        .then((client) => {
            db = client;
            callback(null, db)
        })
        .catch((err) => {
        callback(err)
    })
}

const getDb = () => {
    if (!db) {
        throw Error("Database not initialized")
    }
    return db
}

module.exports = {InitDb, getDb}