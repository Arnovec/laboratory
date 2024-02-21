import {ISchema, IFormField} from "../../../my-effector";
import {booleanValidation} from "./boolean";
import {numberValidation} from "./number";
import {stringValidation} from "./string";

export type TValidValueTypes = string | number | boolean;

export function validateByType(
  schema: Partial<ISchema<TValidValueTypes>>,
  value: TValidValueTypes,
  touched: boolean
): IFormField<TValidValueTypes> | void {
  if (isString(value)) {
    return stringValidation(schema as Partial<ISchema<string>>, value, touched);
  }

  if (isNumber(value)) {
    return numberValidation(schema as Partial<ISchema<number>>, value, touched);
  }

  if (isBoolean(value)) {
    return booleanValidation(schema as Partial<ISchema<boolean>>, value, touched);
  }
}

function isString(obj: unknown): obj is string {
  if (typeof obj === 'string') {
    return true;
  }

  return false;
}

function isNumber(obj: unknown): obj is number {
  if (typeof obj === 'number') {
    return true;
  }

  return false;
}

function isBoolean(obj: unknown): obj is boolean {
  if (typeof obj === 'boolean') {
    return true;
  }

  return false;
}

