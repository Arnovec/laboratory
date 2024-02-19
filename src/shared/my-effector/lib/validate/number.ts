import { ISchema, IFormField } from "../../../my-effector";

export function numberValidation(
  schema: Partial<ISchema<number>>,
  value: number
): IFormField<number> | void {
  if (schema.min && value < schema.min.value) {
    return {
      value,
      validation: {
        isValid: false,
        message: schema.min.message,
      },
    };
  }

  if (schema.max && value > schema.max.value) {
    return {
      value,
      validation: {
        isValid: false,
        message: schema.max.message,
      },
    };
  }

  return;
}
