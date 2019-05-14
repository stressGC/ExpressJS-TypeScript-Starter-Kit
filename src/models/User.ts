'use strict';

import { Schema, Model, model } from 'mongoose';
import IUserDocument from './../interfaces/IUserDocument';
import * as Boom from '@hapi/boom';
import { INTERNAL_SERVER_ERROR, getStatusText } from 'http-status-codes';
import { RESSOURCE_NOT_FOUND, EMAIL_ALREADY_TAKEN } from '../utils/lang';

export interface IUser extends IUserDocument {}

export interface IUserModel extends Model<IUser> {
  fetchAll(): Promise<{}>;
  fetchByID(userID: string): Promise<{}>;
  insertOne(newUser: any): Promise<{}>;
  deleteByID(userID: string): Promise<{}>;
  modifyByID(userID: string, modifications: {}): Promise<{}>;
}

export const userSchema: Schema = new Schema({
  name: String,
  email: {
    type: String,
    index: { unique: true },
  },
  createdAt: Number,
  password: String,
});

userSchema.pre<IUserDocument>('save', function (next) {
  if (!this.createdAt) {
    this.createdAt = Date.now();
  }
  next();
});

userSchema.statics.fetchAll = function () {
  return new Promise((resolve, reject) => {
    this.find({}).select('-__v -password').exec((err: any, docs: any) => {
      if (err) return reject(Boom.internal(getStatusText(INTERNAL_SERVER_ERROR)));
      return resolve(docs);
    });
  });
};

userSchema.statics.fetchByID = function (userID: string) {
  return new Promise((resolve, reject) => {
    this.findById(userID).select('-__v -password').exec((err: any, user: IUserDocument) => {
      if (err) return reject(Boom.internal(getStatusText(INTERNAL_SERVER_ERROR)));
      if (!user) return reject(Boom.notFound(RESSOURCE_NOT_FOUND));
      return resolve(user);
    });
  });
};

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
