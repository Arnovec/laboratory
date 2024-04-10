import { IValidateResult } from "../interfaces";

export function isString(value: unknown): value is string {
  if (typeof value === "string") {
    return true;
  }

  return false;
}

export function isNumber(value: unknown): value is number {
  if (typeof value === "number") {
    return true;
  }

  return false;
}

export function isFuncForString(
  func: Function
): func is (value: string) => IValidateResult {
  if (typeof func.arguments[0] === "string") {
    return true;
  }

  return false;
}

export function isFuncForNumber(
  func: Function
): func is (value: number) => IValidateResult {
  if (typeof func.arguments[0] === "number") {
    return true;
  }

  return false;
}
