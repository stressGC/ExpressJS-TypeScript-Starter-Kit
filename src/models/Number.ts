"use strict";
import { Schema, Model, model } from "mongoose"; 
import INumberDocument from '../interfaces/INumberDocument';

export interface INumber extends INumberDocument {
  /**
   * Prints the provided argument in the console
   *
   * @param {string} word
   * @memberof INumber
   * @example printArg("words to be printed")
   */
  printArg(word: string): void; 
};

export interface INumberModel extends Model<INumber> {
  /**
  * Returns a random Number in a provided range.
  *
  * @param {number} min
  * @param {number} max
  * @returns {number} random number between min & max
  * @example getRandom(0, 8)
  */
  getRandom(min: number, max: number): number;
};

export const numberSchema: Schema = new Schema({
  value: { type: String },
});

numberSchema.methods.printArg = (word: string): void => console.log(word);

numberSchema.statics.getRandom = (min: number, max: number): number => 
  Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min) + 1)) + Math.ceil(min);

export const Number: INumberModel = model<INumber, INumberModel>('Number', numberSchema);
export default Number;