import { ISchema, IFormField } from "../../../my-effector";

export function numberValidation(
  schema: Partial<ISchema<number>>,
  value: number,
  touched: boolean
): IFormField<number> | void {
  if (schema.min && value < schema.min.value) {
    return {
      value,
      touched,
      validation: {
        isValid: false,
        message: schema.min.message,
      },
    };
  }

  if (schema.max && value > schema.max.value) {
    return {
      value,
      touched,
      validation: {
        isValid: false,
        message: schema.max.message,
      },
    };
  }

  if (schema.match) {
    const isMatched = schema.match.check(value);

    if (!isMatched) {
      return {
        value,
        touched,
        validation: {
          isValid: false,
          message: schema.match.message,
        },
      };
    }
  }

  return;
}
