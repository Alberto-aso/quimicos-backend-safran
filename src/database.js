'use strict'

const mongoose = require('mongoose');

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.DB_CNN, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false
        });

        console.log("DB is connected");

    } catch (error) {
        console.log(error);
        throw new Error('Database ERROR conection');
    }
}

module.exports = { dbConnection };

