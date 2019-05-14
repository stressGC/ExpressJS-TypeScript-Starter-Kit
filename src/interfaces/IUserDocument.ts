import { Schema, Document } from 'mongoose';

/**
 * Interface of a User document.
 * @interface IUserDocument
 * @extends {Document}
 */
export default interface IUserDocument extends Document {
  name: string;
  email: string;
  createdAt?: Number;
  password: string;
}
