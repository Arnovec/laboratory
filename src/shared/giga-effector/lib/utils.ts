import { IValidateResult } from "../interfaces";

export function getIsValid(): IValidateResult {
  return {
    isValid: true,
    message: "",
  };
}

export function getNotValid(message: string): IValidateResult {
  return {
    isValid: false,
    message,
  };
}
