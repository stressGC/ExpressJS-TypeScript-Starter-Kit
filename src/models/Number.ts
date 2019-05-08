"use strict";
import { Schema, Model, model } from "mongoose"; 
import INumberDocument from '../interfaces/INumberDocument';

export interface INumber extends INumberDocument {
  printArg(word: string): void; 
}

export interface INumberModel extends Model<INumber> {
  getRandom(min: number, max: number): number;
}

export const numberSchema: Schema = new Schema({
  value: { type: String   },
});

numberSchema.methods.printArg = (word: string): void => {
  console.log(word);
};

numberSchema.statics.getRandom = (min: number, max: number): number => 
  Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min) + 1)) + Math.ceil(min);

export const Number: INumberModel = model<INumber, INumberModel>('Number', numberSchema);
export default Number;