
export interface IValidateResult {
  isValid: boolean;
  message: string;
}

export type TAllowedTypes = string | number;

export type TRuleFunctionByType<T> = (value: T) => IValidateResult;
