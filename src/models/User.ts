'use strict';

import { Schema, Model, model } from 'mongoose';
import IUserDocument from './../interfaces/IUserDocument';
import * as Boom from '@hapi/boom';
import { INTERNAL_SERVER_ERROR, getStatusText } from 'http-status-codes';
import { RESSOURCE_NOT_FOUND, EMAIL_ALREADY_TAKEN } from '../utils/lang';

/* user document extended */
export interface IUser extends IUserDocument {}

/* user model extended */
export interface IUserModel extends Model<IUser> {
  fetchAll(): Promise<{}>;
  fetchByID(userID: string): Promise<{}>;
  insertOne(newUser: any): Promise<{}>;
  deleteByID(userID: string): Promise<{}>;
  modifyByID(userID: string, modifications: {}): Promise<{}>;
}

/** Mongoose User Schema */
export const userSchema: Schema = new Schema({
  name: String,
  email: {
    type: String,
    index: { unique: true },
  },
  createdAt: Number,
  password: String,
});

// we want to up automatically add the createdAt if not present
userSchema.pre<IUserDocument>('save', function (next) {
  if (!this.createdAt) {
    this.createdAt = Date.now();
  }
  next();
});

/**
 * Fetches all users on DB
 *
 * @returns {Promise<{}>} Promise Object to be called by the controller
 */
userSchema.statics.fetchAll = function (): Promise<{}> {
  return new Promise((resolve, reject) => {
    this.find({}).select('-__v -password').exec((err: any, docs: any) => {
      if (err) return reject(Boom.internal(getStatusText(INTERNAL_SERVER_ERROR)));
      return resolve(docs);
    });
  });
};

/**
 * Fetches a User based on its ID
 *
 * @param {String} userID user ID (MongoID format) to be fetched
 * @returns {Promise<{}>} Promise Object to be called by the controller
 */
userSchema.statics.fetchByID = function (userID: string) {
  return new Promise((resolve, reject) => {
    this.findById(userID).select('-__v -password').exec((err: any, user: IUserDocument) => {
      if (err) return reject(Boom.internal(getStatusText(INTERNAL_SERVER_ERROR)));
      if (!user) return reject(Boom.notFound(RESSOURCE_NOT_FOUND));
      return resolve(user);
    });
  });
};

/**
 * Inserts a new User
 *
 * @param {any} newUser JSON containing the new user infos
 * @returns {Promise<{}>} Promise Object to be called by the controller
 */
userSchema.statics.insertOne = function (newUser: any) {
  return new Promise((resolve, reject) => {
    this.create(newUser, (err: any, user: IUserDocument) => {
      if (err) {
        if (err.code === 11000) return reject(Boom.badRequest(EMAIL_ALREADY_TAKEN));
        return reject(Boom.internal(getStatusText(INTERNAL_SERVER_ERROR)));
      }
      const { __v, password, ...formatedUser } = user.toObject();
      return resolve(formatedUser);
    });
  });
};

/**
 * Fetches a User based on its ID
 *
 * @param {String} userID user ID (MongoID format) to be fetched
 * @param {any} midifications JSON containing the updated user infos
 * @returns {Promise<{}>} Promise Object to be called by the controller
 */
userSchema.statics.modifyByID = function (userID: string, modifications: {}) {
  return new Promise((resolve, reject) => {
    this.findOneAndUpdate(
      { _id: userID }, modifications,
      { new: true },
      (err: any, user: IUserDocument) => {
        if (err) return reject(Boom.internal(getStatusText(INTERNAL_SERVER_ERROR)));
        if (!user) return reject(Boom.notFound(RESSOURCE_NOT_FOUND));

        const { __v, password, ...formatedUser } = user.toObject();
        return resolve(formatedUser);
      });
  });
};

/**
 * Deletes a user based on its ID
 *
 * @param {any} userID user ID (MongoID format) to be deleted
 * @returns {Promise<{}>} Promise Object to be called by the controller
 */
userSchema.statics.deleteByID = function (userID: string) {
  return new Promise((resolve, reject) => {
    this.findOneAndRemove(userID, (err: any, user: IUserDocument) => {
      if (err) return reject(Boom.internal(getStatusText(INTERNAL_SERVER_ERROR)));
      if (!user) return reject(Boom.notFound(RESSOURCE_NOT_FOUND));

      const { __v, password, ...formatedUser } = user.toObject();
      return resolve(formatedUser);
    });
  });
};

const userModel: IUserModel = model<IUser, IUserModel>('User', userSchema);

export default userModel;
