import { Document } from 'mongoose';

export default interface INumberDocument extends Document {
    value: number;
}