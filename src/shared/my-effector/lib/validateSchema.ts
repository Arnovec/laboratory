import { IFormField, ISchema, TValidValueTypes } from "../interfaces";
import { validateByType } from "./validate";

export function validateSchema(
  schema: Partial<ISchema<TValidValueTypes>> | undefined,
  value: TValidValueTypes | undefined,
  touched: boolean = true
): IFormField<TValidValueTypes> {
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

    if (value != null) {
      const validationResult = validateByType(schema, value, touched);

      if (validationResult) {
        return validationResult;
      }
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
