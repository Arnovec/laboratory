import { IFormField, ISchema } from "../interfaces";
import { validateByType } from "./validate/indes";

export function validateSchema<TValue>(
  schema: Partial<ISchema<TValue>> | undefined,
  value: TValue | undefined,
  touched: boolean = true
): IFormField<TValue> {
  if (schema) {
    if (schema.isNotEmpty && value == null) {
      // isEmpty()
      return {
        value,
        touched,
        validation: {
          isValid: false,
          message: schema.isNotEmpty.message,
        },
      };
    }

    const validationResult = validateByType(schema, value, touched);

    if (validationResult) {
      return validationResult;
    }
  }

  return {
    value,
    touched,
    validation: {
      isValid: true,
      message: "",
    },
  };
}
