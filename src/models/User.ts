'use strict';

import { Schema, Model, model } from 'mongoose';
import IUserDocument from './../interfaces/IUserDocument';
import * as Boom from '@hapi/boom';
import { INTERNAL_SERVER_ERROR, getStatusText } from 'http-status-codes';
import { RESSOURCE_NOT_FOUND } from '../utils/lang';

export interface IUser extends IUserDocument {

}

export interface IUserModel extends Model<IUser> {
  fetchAll(): Promise<{}>;
  fetchByID(userID: string): Promise<{}>;
  insertOne(newUser: any): Promise<{}>;
  deleteByID(userID: string): Promise<{}>;
  modifyByID(userID: string): Promise<{}>;
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
    this.find({}).exec((err: any, docs: any) => {
      if (err) reject(Boom.internal(getStatusText(INTERNAL_SERVER_ERROR)));
      resolve(docs);
    });
  });
};

userSchema.statics.fetchByID = function (userID: string) {
  return new Promise((resolve, reject) => {
    this.findOneById(userID, (err: any, user: IUserDocument) => {
      if (err) reject(Boom.internal(getStatusText(INTERNAL_SERVER_ERROR)));
      if (!user) reject(Boom.notFound(RESSOURCE_NOT_FOUND));
      resolve(user);
    });
  });
};

userSchema.statics.insertOne = function (newUser: any) {
  return new Promise((resolve, reject) => {
    this.create(newUser, (err: any, user: IUserDocument) => {
      if (err) {
        if (err.code === 11000) reject(Boom.badRequest('"Email is already taken'));
        reject(Boom.internal(getStatusText(INTERNAL_SERVER_ERROR)));
      }
      resolve(user);
    });
  });
};

userSchema.statics.modifyByID = function (userID: string, modifications: {}) {
  return new Promise((resolve, reject) => {
    this.findOneAndUpdate({ _id: userID}, modifications, { new: true }, (err: any, user: IUserDocument) => {
      if (err) reject(Boom.internal(getStatusText(INTERNAL_SERVER_ERROR)));
      if (!user) reject(Boom.notFound(RESSOURCE_NOT_FOUND));
      resolve(user);
    });
  });
};

userSchema.statics.deleteByID = function (userID: string) {
  return new Promise((resolve, reject) => {
    this.findOneAndRemove(userID, (err: any, user: IUserDocument) => {
      if (err) reject(Boom.internal(getStatusText(INTERNAL_SERVER_ERROR)));
      if (!user) reject(Boom.notFound(RESSOURCE_NOT_FOUND));
      resolve(user);
    });
  });
};

const userModel: IUserModel = model<IUser, IUserModel>('User', userSchema);

export default userModel;
