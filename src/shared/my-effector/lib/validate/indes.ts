import { ISchema, IFormField } from "../../../my-effector";
import { booleanValidation } from "./boolean";
import { numberValidation } from "./number";
import { stringValidation } from "./string";

export type validatedTypeNames = "string" | "number" | "boolean";

type TypesMap = {
  ["string"]: string;
  ["number"]: number;
  ["boolean"]: boolean;
};

type TValidateByTypeFXs = {
  [TypeName in keyof TypesMap]: (
    schema: Partial<ISchema<TypesMap[TypeName]>>,
    value: TypesMap[TypeName]
  ) => IFormField<TypesMap[TypeName]> | void;
};

const validateByTypeFXs: TValidateByTypeFXs = {
  ["string"]: stringValidation,
  ["number"]: numberValidation,
  ["boolean"]: booleanValidation,
};

export function validateByType<T extends string | number | boolean>(
  schema: Partial<ISchema<T>>,
  value: T
): IFormField<T> | void {
  const valueType = typeof value;

  if (
    valueType === "string" ||
    valueType === "number" ||
    valueType === "boolean"
  ) {
    return validateByTypeFXs[valueType](schema, value);
  }

  return;
}
