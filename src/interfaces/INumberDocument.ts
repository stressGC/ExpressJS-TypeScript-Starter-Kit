import { Document } from 'mongoose';

/**
 * Interface of a Mongoose Number document.
 * @interface INumberDocument
 * @extends {Document}
 */
export default interface INumberDocument extends Document {
    value: number;
}