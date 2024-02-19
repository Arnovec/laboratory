import { IFormField, ISchema } from "../interfaces";
import { validateByType } from "./validate/indes";

export function validateSchema<TValue>(
  schema: Partial<ISchema<TValue>> | undefined,
  value: TValue
): IFormField<TValue> {
  if (schema) {
    if (schema.isNotEmpty && value == null) {
      // isEmpty()
      return {
        value,
        validation: {
          isValid: false,
          message: schema.isNotEmpty.message,
        },
      };
    }

    const validationResult = validateByType(schema, value);

    if (validationResult) {
      return validationResult;
    }
  }

  return {
    value,
    validation: {
      isValid: true,
      message: "",
    },
  };
}
