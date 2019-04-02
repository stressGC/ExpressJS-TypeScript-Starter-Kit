"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const winston_1 = require("./../logger/winston");
require('dotenv').config();
const options = {
    useNewUrlParser: true,
    user: process.env.MONGO_USER,
    pass: process.env.MONGO_PASS,
};
/**
 * initialize mongoDB connection
 */
const initialize = () => {
    /* remove deprecated options */
    mongoose.set('useCreateIndex', true);
    mongoose.set('useFindAndModify', false);
    /* connect */
    mongoose.connect(`mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_HOST}/${process.env.MONGO_DB}`, options, err => {
        if (err) {
            winston_1.default.error(`Error while connecting to MongoDB: ${err}`);
            process.exit(1);
        }
        winston_1.default.debug(`Connected to MongoDB`);
        /* close mongo connection on SIGINT */
        mongoose.connection.on('error', err => winston_1.default.error(`MongoDB error: ${err}`));
        process.on('SIGINT', () => {
            mongoose.connection.close(() => {
                process.exit(0);
            });
        });
    });
};
exports.default = initialize;
//# sourceMappingURL=index.js.map