import { ISchema, IFormField } from "../../../my-effector";

export function booleanValidation(
  schema: Partial<ISchema<boolean>>,
  value: boolean
): IFormField<boolean> | void {
  if (schema.isNotEmpty && value === false) {
    return {
      value,
      validation: {
        isValid: false,
        message: schema.isNotEmpty.message,
      },
    };
  }

  return;
}
