'use strict';

import { Schema, Model, model } from 'mongoose';
import IUserDocument from './../interfaces/IUserDocument';
import * as Boom from '@hapi/boom';
import { INTERNAL_SERVER_ERROR, getStatusText } from 'http-status-codes';

export interface IUser extends IUserDocument {

}

export interface IUserModel extends Model<IUser> {
  fetchAll(): Promise<{}>;
  insert(newUser: IUserDocument): Promise<{}>;
}

export const userSchema: Schema = new Schema({
  name: String,
  email: {
    type: String,
    index: { unique: true, dropDups: true },
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

userSchema.statics.insert = function (newUser: any) {
  console.log('inserting user...');
  return new Promise((resolve, reject) => {
    this.create(newUser, (err: Error, user: IUserDocument) => {
      if (err) reject(Boom.internal(getStatusText(INTERNAL_SERVER_ERROR)));
      resolve(user);
    });
  });
};

const userModel: IUserModel = model<IUser, IUserModel>('User', userSchema);

export default userModel;
